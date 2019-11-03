class DisplayMovies {
    constructor(data){
        this.moviesList = document.querySelector('.list-results');
        this.totalResults = 0;
        this.numOfPages = 0;
        this.currentPage = 1;
        this.detailData = [];
        this.moviesStore = [];
        this.moviesShown = [];
    }

    sliceListOfMovies(movieDetail){
        this.detailData.push(movieDetail);
        this.moviesStore.push(movieDetail);
        if(this.currentPage < this.numOfPages){
            if(this.detailData.length >= 12){
                this.listMovies(this.detailData.splice(0, 12), true);
            }
        } else if(this.currentPage === this.numOfPages){
            if(this.totalResults == this.moviesStore.length){
                this.listMovies(this.detailData, true);
                this.displayError('No more results to display', 'no-more-results');
            }           
        }
    }


    clearList(list) {
        while(list.length){
            list.pop();
        }
    }

    listMovies(list, search){
        list.forEach(movie => {
            if(search){
                this.moviesShown.push(movie);
            }
                     
            const movieItem = new Movie(movie);
            movieItem.attributesDefaults();
            const li = document.createElement('li');
            li.className = 'movie';
            li.innerHTML = `
            <div class="img-div">
                <img src="${movieItem.coverImage}">
            </div>
            <div class="data-div">
                <p class="title">Title: ${movieItem.title}</p>
                <p class="relase-date">Relase date: ${movieItem.realaseDate}</p>
                <p class="runtime">Runtime: ${movieItem.runtime}</p>
                <p class="rating">Rating: ${movieItem.rating}</p>
                <p class="${movieItem.checkAwards()}">Awards: ${movieItem.awards}</p>
                <p class="description">Description: ${movieItem.description}</p>
            </div>
            `;

            this.moviesList.appendChild(li);
        });
    }

    calculateNumPages(){
        this.numOfPages = Math.ceil(this.totalResults / 10);
    }

    clearMovies(){
        while(this.moviesList.firstChild) {
            this.moviesList.firstChild.remove();
        }
    }

    displayError(msg, className, timeout){
        this.clearError(className);
        const p = document.createElement('p');
        p.className = `${className}`;
        p.appendChild(document.createTextNode(msg));
        const body = document.querySelector('body');
        const results = document.querySelector('.results');
        body.insertBefore(p, results.nextSibling);
        
        if(timeout){
            setTimeout(() => {
                this.clearError(className);
            }, 3000);
        }
    }

    clearError(className){
        const error = document.querySelector(`.${className}`);

        if(error){
            error.remove();
        }
    }

    resetValues(){
        this.totalResults = 0;
        this.numOfPages = 0;
        this.currentPage = 1;
        this.moviesStore = [];
        this.detailData = [];
        this.moviesShown = [];
    }

    sortResults(sortBy){
        if(this.moviesShown.length > 0){
            if(sortBy === 'name'){
                this.moviesShown.sort((movieA, movieB) => (movieA.Title > movieB.Title) ? 1 : -1);
                this.clearMovies();
                this.listMovies(this.moviesShown, false);
            } else if(sortBy === 'rating'){
                this.moviesShown.sort((movieA, movieB) => (movieA.imdbRating < movieB.imdbRating) ? 1 : -1);
                this.clearMovies();
                this.listMovies(this.moviesShown, false);
            } else if(sortBy === 'release-date'){
                this.moviesShown.sort((movieA, movieB) => (new Date(movieA.Released) < new Date(movieB.Released)) ? 1 : -1);
                this.clearMovies();
                this.listMovies(this.moviesShown, false);
            }
        } else {
            alert('no data to sort');
        }
    }

    filterResultsByYear(year){
        if(this.moviesShown.length > 0){
            const filtered = this.moviesShown.filter( movie => {
                return new Date(movie.Released).getFullYear() == year;
            });
            if(filtered.length > 0){
                this.clearMovies();
                this.listMovies(filtered, false);
            } else {
                this.clearMovies();
                this.displayError('No results to display', 'no-more-results');
            }
        } else {
            alert('no data to sort');
        }
    }

    filterResultsByRating(rating){
        this.clearError('No results to display');
        if(this.moviesShown.length > 0){
                const filtered = this.moviesShown.filter( movie => {
                return parseInt(movie.imdbRating) == rating;
            });
            if(filtered.length > 0){
                this.clearMovies();
                this.listMovies(filtered);
            } else {
                this.clearMovies();
                this.displayError('No results to display', 'no-more-results');
            }
        } else {
            alert('no data to filter');
        }
    }

}


