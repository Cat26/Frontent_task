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
                    console.log('less');
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




