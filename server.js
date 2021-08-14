const getMovies =require('./myMovies');
const getWeather = require('./myWeather');


const express = require ('express');
const server = express();

const cors = require('cors'); // connect between backend and front end.
server.use(cors());

require('dotenv').config();
const PORT = process.env.PORT;


server.get('/', (req,res)=>{
    res.send('this is my main route')
} )

server.get('/weather', getWeather)

server.get('/movies', getMovies)

server.get('*',(req,res) => {
    res.status(404).send('route not found');
})


server.listen (PORT, () => {
    console.log(`Im listening to ${PORT}`)
})

