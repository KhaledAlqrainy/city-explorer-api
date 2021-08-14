'use strict'

const express = require('express');
const server = express();

require('dotenv').config();
const PORT = process.env.PORT

const cors = require('cors');
server.use(cors());

const axios = require('axios');

class Forecast {
    constructor(day) {
        this.date = day.datetime;
        this.description = `Low of ${day.low_temp}, high of ${day.high_temp} with ${day.weather.description}}`;
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

server.get('/', (req, res) => { res.send('Hello from main route'); });

server.get('/weather', getWeather)
server.get('/movies', getMovies)

async function getWeather(req, res) {

    try {
        let { searchQuery, lat, lon } = req.query;
        if (!searchQuery) searchQuery = "doesn't match any city"
        const URL = `https://api.weatherbit.io/v2.0//forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`
        let axiosWeather = await axios.get(URL)
        let forecastArr = axiosWeather.data.data.map(info => new Forecast(info));
        // console.log(forecastArr);
        res.send(forecastArr);
    }
    catch (e) {
        res.status(e.status).send({ status: e.status, description: `Unable to Process Request.  Query String Correct? ${e.message}` });
    }
};

async function getMovies(req, res) {
    let returnArr = [];
    let { cityName } = req.query;
    const URL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityName}`;

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
server.listen(PORT, () => console.log(`listening on ${PORT}`));