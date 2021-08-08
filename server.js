const getMovies =require('./myMovies');


const express = require ('express');
const server = express();

const weatherdata = require('./weather.json')
const cors = require('cors'); // connect between backend and front end.
server.use(cors());

require('dotenv').config();
const PORT = process.env.PORT;

// class Movie {
//     constructor(movie) {
//         this.title = movie.title
//         this.overview = movie.overview
//         this.vote_average = movie.vote_average
//         this.vote_count = movie.vote_count
//         this.poster_path = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
//         this.popularity = movie.popularity
//         this.release_date = movie.release_date
//     }
// }

class Forecast {
    constructor (day) {
        this.datetime = day.datetime;
        this.description = day.weather.description
    }

    
}

server.get('/', (req,res)=>{
    res.send('this is my main route')
} )


// http://localhost:3001/weather?lon=31.95&lat=35.91&city_name=Amman
// http://localhost:3001/weather?
server.get('./weather', (req,res) =>{

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


    

});

server.get('/movies', getMovies)

// async function getMovies(req, res) {
//     let returnArr = [];
//     let { cityName } = req.query;
//     const URL = `https://api.themoviedb.org/3/search/movie?api_key=mSjXydZRVkSuJXcfMURFNgfcSKMmSEANpAKgBdcJgvc&query=${cityName}`;

//     try {
//         let axiosMovies = await axios.get(URL)
//         console.log(axiosMovies.data.results);
//         axiosMovies.data.results.map(item => returnArr.push(new Movie(item)));
//         res.status(200).send(returnArr);
//     }
//     catch (error) {
//         res.status(400)
//         if (error.status) res.status(error.status).send(error.message)
//     }
// }

// console.log(getweather);

server.get('*',(req,res) => {
    res.status(404).send('route not found');
})

server.listen (PORT, () => {
    console.log(`Im listening to ${PORT}`)
})

