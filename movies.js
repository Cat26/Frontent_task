class DisplayMovies {
    constructor(data){
        this.moviesList = document.querySelector('.list-results');
        this.data = data;
    }

    listMovies(list){
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

    displayError(msg){
        this.clearError();
        const div = document.createElement('div');
        div.className = 'error';
        div.appendChild(document.createTextNode(msg));
        const body = document.querySelector('body');
        const results = document.querySelector('.results');
        body.insertBefore(div, this.results);

        setTimeout(() => {
            this.clearError();
        }, 3000);
    }

    clearError(){
        const error = document.querySelector('.error');

        if(error){
            error.remove();
        }
    }


}


