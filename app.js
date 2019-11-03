const search_value = document.getElementById('search-input');
const search_submit = document.getElementById('search-btn');
const sort_submit = document.querySelector('#sort-btn');
const sort_radios = document.getElementsByName('sort');


const movies = new DisplayMovies();
const omdb = new OMDb();
let pagesNum = 0;
let scrollTimeout;
let scrollActive = 0;

search_submit.addEventListener('click', sendRequestNew);
sort_submit.addEventListener('click', sortResults);

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
}

function sendRequestMore() {
    omdb.nextPage();
    if(omdb.page <= pagesNum){
        console.log(omdb.page);
        console.log(pagesNum);
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




