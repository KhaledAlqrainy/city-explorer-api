'use strict';
const axios = require('axios')

let myMemory={};

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
        const lon = req.query.lon;
        const lat = req.query.lat;
        const city_name = req.query.city_name;

        if (myMemory[city_name] !== undefined) 
        {
            
            res.send(myMemory[city_name]);
        }

        else {
        let getweather = weatherdata.find(i => i.city_name.toLowerCase() === city_name.toLowerCase() || (i.lat === lat && i.lon === lon) 
        )
        
        if (!getweather) res.status(404).send('no data found');

    
        let myweather = getweather.data.map(i => new Forecast(i));
    
        res.send(myweather);
        }
    }

    catch {}


    


}


class Forecast {
    constructor (day) {
        this.datetime = day.datetime;
        this.description = day.weather.description
    }
};


module.exports=getWeather;