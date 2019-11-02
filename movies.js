class DisplayMovies {
    constructor(data){
        this.moviesList = document.querySelector('.list-results');
        this.data = data;
        this.totalResults = 0;
        this.numOfPages = 0;
        this.currentPage = 1;
        this.moviesStore = [];
        this.helperList = [];
        this.detailData = [];
    }

    sliceListOfMovies(list){
        console.log(this.numOfPages);
        console.log(this.currentPage);
        this.addListItems(list, this.moviesStore);
        this.addListItems(list, this.helperList);
        
        if(this.currentPage < this.numOfPages){
            if(this.helperList.length >= 12){
                this.listMovies(this.helperList.splice(0, 11));
            } else {
                this.currentPage += 1;
                this.clearList(this.detailData);
                return 0;
            }
        } else if(this.currentPage === this.numOfPages){
            this.listMovies(this.helperList);
            this.displayError('No more results to display', 'no-more-results');
        }

        this.currentPage += 1;
        this.clearList(this.detailData);
        return 1;
    }

    addListItems(fromlist, tolist){
        fromlist.forEach(movie => {
            tolist.push(movie);
        });
    }
    clearList(list){
        while(list.length){
            list.pop();
        }
    }

    listMovies(list){
        console.log('list movies');
        list.forEach(movie => {
            
            const li = document.createElement('li');
            li.className = 'movie';
            li.innerHTML = `
            <img src="${movie.Poster}">
            <p>Title: ${movie.Title}</p>
            <p>Relase date: ${movie.Year}</p>
            <p>Runtime: ${movie.Title}</p>

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
        const div = document.createElement('div');
        div.className = `${className}`;
        div.appendChild(document.createTextNode(msg));
        const body = document.querySelector('body');
        const results = document.querySelector('.results');
        body.insertBefore(div, results.nextSibling);
        
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
        this.helperList = [];
        this.detailData = [];
    }


}


