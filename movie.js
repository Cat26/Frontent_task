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

    attributesDefaults(){
        if(this.coverImage === 'N/A'){
            this.coverImage = 'img/default-cover.jpg';
        }
        if(this.realaseDate === 'N/A'){
            this.realaseDate = 'no data'
        }
        if(this.runtime === 'N/A'){
            this.runtime = 'no data'
        }
        if(this.rating === 'N/A'){
            this.rating = 'no data'
        }
        if(this.description === 'N/A'){
            this.description = 'no data'
        }
        this.shortenDesciption();
    }

    checkAwards(){
        if(this.awards === 'N/A'){
            return 'no-award';
        } else {
            return 'award';
        }
    }

    shortenDesciption(){
        if(this.description.length > 100){
            this.description = this.description.substring(0, 101) + '...';
        }
    }



}