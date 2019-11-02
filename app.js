const search_value = document.getElementById('search-input');
const search_submit = document.getElementById('search-btn');
const movies = new DisplayMovies();
const omdb = new OMDb();
let pagesNum = 0;
let scrollTimeout;

search_submit.addEventListener('click', sendRequestNew);

window.onscroll = () => {
    clearTimeout(scrollTimeout);
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
        scrollTimeout = setTimeout(sendRequestMore, 100);
    }
}

function sendRequestNew() {  
    omdb.changeTitle(`${search_value.value}`);   
    getMovies();
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
            movies.data = results;
            if(results.Search === undefined){
                movies.displayError(results.Error, 'error', 1);
            } else {
                movies.totalResults = results.totalResults;
                movies.calculateNumPages();
                pagesNum = movies.numOfPages;
                this.getMoviesDetail(results.Search);
                console.log(movies.detailData);
                if(movies.sliceListOfMovies(movies.detailData) === 0){
                    this.sendRequestMore();
                };  
            }
        
    })
        .catch(err => {
            console.log(err);
        });
}

function getMoreMovies() {
    omdb.getMovies()
        .then(results => {
            movies.data = results;
            if(results.Search === undefined){
                movies.displayError(results.Error, 'error', 1);
            } else {               
                this.getMoviesDetail(results.Search);
                if(movies.sliceListOfMovies(movies.detailData) === 0){
                    this.sendRequestMore();
                };  
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
                movies.detailData.push(results);
            })
            .catch(err => {
                console.log(err);
            })
    });
}




