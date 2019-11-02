class Movie {
    constructor(movie){
        this.coverImage = movie.Poster;
        this.title = movie.Title;
        this.realaseDate = movie.Released;
        this.runtime = movie.Runtime;
        this.rating = movie.imdbRating;
        this.awards = movie.Awards;
        this.description = movie.Plot;
    }

    defautImage(){
        if(this.coverImage === 'N/A'){
            this.coverImage = 'img/default-cover.jpg';
        }
    }

}