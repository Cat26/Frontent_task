const search_value = document.getElementById('search-input');
const search_submit = document.getElementById('search-btn');
const movies = new DisplayMovies();

search_submit.addEventListener('click', sendRequest);

function sendRequest() {
    const omdb = new OMDb(`${search_value.value}`);
    getMovies(omdb);
}

function getMovies(omdb) {
    omdb.getMovies()
        .then(results => {
            movies.data = results;
            if(results.Search === undefined){
                movies.displayError(results.Error);
            } else {
                movies.listMovies(results.Search);
            }
            
        })
        .catch(err => {
            console.log(err);
        });
}

