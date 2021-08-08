'use strict';
const axios = require('axios')



async function getWeather(req, res) {
    try{

        const lon = req.query.lon;
        const lat = req.query.lat;
        const city_name = req.query.city_name;
    
        let getweather = weatherdata.find(i => i.city_name.toLowerCase() === city_name.toLowerCase() || (i.lat === lat && i.lon === lon) 
        )
        
        if (!getweather) res.status(404).send('no data found');

    
        let myweather = getweather.data.map(i => new Forecast(i));
    
        res.send(myweather);
    }

    catch {}

    
    

}

class Forecast {
    constructor (day) {
        this.datetime = day.datetime;
        this.description = day.weather.description
    }

    
}

module.exports=getWeather;