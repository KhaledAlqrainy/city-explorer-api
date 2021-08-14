'use strict';
const axios = require('axios')


class Forecast {
    constructor(day) {
        this.date = day.datetime;
        this.description = day.weather.description;
    }
}

async function getWeather(req, res) {

    try {
        let { searchQuery, lat, lon } = req.query;
        if (!searchQuery) searchQuery = "doesn't match any city"
        const URL = `https://api.weatherbit.io/v2.0//forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`
        let axiosWeather = await axios.get(URL)
        let forecastArr = axiosWeather.data.data.map(info => new Forecast(info));
        res.send(forecastArr);
    }
    catch (e) {
        res.status(e.status).send({ status: e.status, description: `Error ${e.message}` });
    }
};


module.exports=getWeather;