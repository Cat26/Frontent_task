class OMDb {
    constructor(title){
        this.apiKey = 'e1eef85c';
        this.title = title;
    }

    async getMovies(){
        const response = await fetch(`http://www.omdbapi.com/?s=${this.title}&apikey=${this.apiKey}`);
        const data = await response.json();

        return data;
    }
}