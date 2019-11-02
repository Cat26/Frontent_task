class OMDb {
    constructor(){
        this.apiKey = 'e1eef85c';
        this.title = '';
        this.page = 1;
    }

    async getMovies(){
        const response = await fetch(`http://www.omdbapi.com/?s=${this.title}&apikey=${this.apiKey}&page=${this.page}`);
        const data = await response.json();
        console.log(data);
        return data;
    }

    async getMoviedetail(id){
        const response = await fetch(`http://www.omdbapi.com/?s=${this.title}&apikey=${this.apiKey}&page=${this.page}`);
        const data = await response.json();
        console.log(data);
        return data;
    }

    changeTitle(newtitle){
        this.title = newtitle;
    }

    nextPage(){
        this.page += 1;
    }
}