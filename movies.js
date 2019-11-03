class DisplayMovies {
    constructor(data){
        this.moviesList = document.querySelector('.list-results');
        this.data = data;
        this.totalResults = 0;
        this.numOfPages = 0;
        this.currentPage = 1;
        this.helperList = [];
        this.detailData = [];
    }

    sliceListOfMovies(list){
        console.log(list);
        console.log(this.numOfPages);
        console.log(this.currentPage);
        this.addListItems(list);
        this.addListItems(list);
        console.log(this.helperList);
        
        if(this.currentPage < this.numOfPages){
            if(this.helperList.length >= 12){
                this.listMovies(this.helperList.splice(0, 12));
            } else {
                this.currentPage += 1;
                this.clearList(this.detailData);
                return 0;
            }
        } else if(this.currentPage === this.numOfPages){
            this.addListItems(list);
            // console.log(list)
            // this.listMovies(list);
            this.displayError('No more results to display', 'no-more-results');
        }

        this.currentPage += 1;
        this.clearList(this.detailData);
        return 1;
    }

    addListItems(list){
        list.forEach(movie => {
            console.log('add');
            this.helperList.push(movie);
        });
    }
    clearList(list){
        while(list.length){
            list.pop();
        }
    }

    listMovies(list){
        list.forEach(movie => {         
            const movieItem = new Movie(movie);
            movieItem.defautImage();
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
        this.helperList = [];
        this.detailData = [];
    }


}


