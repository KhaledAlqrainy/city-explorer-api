'use strict';

const axios=require('axios')


async function getMovies(req, res) {
    let returnArr = [];
    let { cityName } = req.query;
    const URL = `https://api.themoviedb.org/3/search/movie?api_key=mSjXydZRVkSuJXcfMURFNgfcSKMmSEANpAKgBdcJgvc&query=${cityName}`;

    try {
        let axiosMovies = await axios.get(URL)
        console.log(axiosMovies.data.results);
        axiosMovies.data.results.map(item => returnArr.push(new Movie(item)));
        res.status(200).send(returnArr);
    }
    catch (error) {
        res.status(400)
        if (error.status) res.status(error.status).send(error.message)
    }
}


class Movie {
    constructor(movie) {
        this.title = movie.title
        this.overview = movie.overview
        this.vote_average = movie.vote_average
        this.vote_count = movie.vote_count
        this.poster_path = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        this.popularity = movie.popularity
        this.release_date = movie.release_date
    }
}

module.exports = getMovies;

