const search_value = document.getElementById('search-input');
const search_submit = document.getElementById('search-btn');
const movies = new DisplayMovies();
const omdb = new OMDb();

search_submit.addEventListener('click', sendRequestNew);

window.onscroll = () => {
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
        sendRequestMore();
    }
}

function sendRequestNew() {  
    omdb.changeTitle(`${search_value.value}`);   
    getMovies();
}

function sendRequestMore() {
    omdb.nextPage();
    getMoreMovies();
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
                if(movies.sliceListOfMovies(results.Search) === 0){
                    this.sendRequestMore();
                };  
            }
        
    })
        .catch(err => {
            console.log(err);
        });
}

function getMoreMovies(){
    omdb.getMovies()
        .then(results => {
            movies.data = results;
            if(results.Search === undefined){
                movies.displayError(results.Error, 'error', 1);
            } else {
                if(movies.sliceListOfMovies(results.Search) === 0){
                    console.log('yes')
                    this.sendRequestMore();
                };      
            }
            
        })
        .catch(err => {
            console.log(err);
        });
}


