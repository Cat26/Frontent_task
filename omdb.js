class OMDb {
    constructor(){
        // this.apiKey = 'e1eef85c';
        this.apiKey = '630f32c7';
        this.title = '';
        this.page = 1;
    }

    async getMovies(){
        const response = await fetch(`http://www.omdbapi.com/?s=${this.title}&apikey=${this.apiKey}&page=${this.page}`);
        const data = await response.json();
        console.log(data);
        console.log(this.page);
        return data;
    }

    async getMovieDetail(id){
        const response = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=${this.apiKey}`);
        const data = await response.json();
        return data;
    }

    async getMoviePoster(){
        
    }

    changeTitle(newtitle){
        this.title = newtitle;
    }

    nextPage(){
        this.page += 1;
    }
}