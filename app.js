const search_value = document.getElementById('search-input');
const search_submit = document.getElementById('search-btn');
const sort_submit = document.querySelector('#sort-btn');
const sort_radios = document.getElementsByName('sort');
const filter_date = document.querySelector('#filter-year-btn');
const filter_rating = document.querySelector('#filter-rating-btn');

const movies = new DisplayMovies();
const omdb = new OMDb();
let pagesNum = 0;
let scrollTimeout;
let scrollActive = 0;

search_submit.addEventListener('click', sendRequestNew);
sort_submit.addEventListener('click', sortResults);

filter_date.addEventListener('click', filterResultsYear);
filter_rating.addEventListener('click', filterResultsRating);


window.onscroll = () => {
    if(scrollActive === 1){
        clearTimeout(scrollTimeout);
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
            scrollTimeout = setTimeout(sendRequestMore, 100);
        }
    }
}

function sendRequestNew() {  
    scrollActive = 1;
    omdb.changeTitle(`${search_value.value}`);   
    getMovies();
    search_value.value = '';
}

function sendRequestMore() {
    omdb.nextPage();
    if(omdb.page <= pagesNum){
        getMoreMovies();
    }  
}

function getMovies() {
    omdb.getMovies()
        .then(results => {
            movies.clearMovies();
            movies.resetValues();
            movies.clearError('no-more-results');
            if(results.Search === undefined){
                movies.displayError(results.Error, 'error', 1);
            } else {
                movies.totalResults = results.totalResults;
                movies.calculateNumPages();
                pagesNum = movies.numOfPages;
                this.getMoviesDetail(results.Search);
                if(results.Search.length < 12){
                    sendRequestMore();
                } 
            }
        
    })
        .catch(err => {
            console.log(err);
        });
}

function getMoreMovies() {
    omdb.getMovies()
        .then(results => {
            if(results.Search === undefined){
                movies.displayError(results.Error, 'error', 1);
            } else {
                movies.currentPage += 1;
                if(movies.totalResults > movies.moviesStore.length){
                    this.getMoviesDetail(results.Search);
                    if(movies.detailData.length < 2){
                        sendRequestMore();
                    }
                }               
            }
    })
        .catch(err => {
            console.log(err);
        });
}


function getMoviesDetail(list){
    list.forEach(movie => {
        omdb.getMovieDetail(movie.imdbID)
            .then(results => {
                movies.sliceListOfMovies(results);
            })
            .catch(err => {
                console.log(err);
            })
    });
}

function sortResults(e){
    let checked = 0;
    for(let i = 0; i < sort_radios.length; i++){
        if(sort_radios[i].checked){
            checked = 1;
            scrollActive = 0;
            movies.sortResults(sort_radios[i].value);
            break;
        }
    }
    if(checked === 0){
        alert("please select Radio");
    }
    e.preventDefault();
}

function filterResultsYear(e){
    const year = document.querySelector('#filter-date').value;
    document.querySelector('#filter-date').value = '';
    const minYear = 1895;
    const maxYear = new Date().getFullYear();

    if(year === ''){
        alert('Please provide year to filter!');
    } else if(isNaN(parseInt(year))){
        alert('Please provide correct format of year!');
    } else if(year < minYear || year > maxYear){
        alert(`Please provide year between ${minYear} and ${maxYear}`);
    } else if(!Number.isInteger(Number(year))) {
        alert('Please provide correct format of year!');
    } else {
        scrollActive = 0;
        movies.filterResultsByYear(year);
    }
    e.preventDefault();
}

function filterResultsRating(e){
    console.log('filter rating');
    const rating = document.querySelector('#filter-rating').value;
    document.querySelector('#filter-rating').value = '';
    const minRating = 0;
    const maxRating = 10;

    if(rating === ''){
        alert('Please provide rating to filter!');
    } else if(isNaN(parseInt(rating))){
        alert('Please provide correct format of rating!');
    } else if(rating < minRating || rating > maxRating){
        alert(`Please provide rating between ${minRating} and ${maxRating}`);
    } else if(!Number.isInteger(Number(rating))) {
        alert('Please provide an integer!');
    } else {
        scrollActive = 0;
        movies.filterResultsByRating(rating);
    }

    e.preventDefault();
}




