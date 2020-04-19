var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

const app = express()

/* Node does not implement the fetch API. */
const fetch = require("node-fetch");
const bodyParser = require('body-parser');
app.use(bodyParser.json());

/* Provides Express middleware that can be used to enable CORS with
 * various options. Allows the browser/server to communicate without 
 * security interruptions. */
const cors = require('cors');
app.use(cors());

// configures the server to look for asset files in the dist folder
app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html', { root: __dirname + '/..' })
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function (req, res) {
    console.log("Return mockAPIResponse: ", mockAPIResponse);
    res.send(mockAPIResponse)
})

app.get('/pokemon/:pokemon', async function (req, res) {
    console.log("Requested Pokemon: ", req.params.pokemon);

    const pokemonData = await fetch(`https://api.pokemontcg.io/v1/cards?name=${req.params.pokemon}`);
    try {
        console.log("Successfully retrieved Pokemon!")
        const pokemonJSON = await pokemonData.json();
        res.send(pokemonJSON)
    } catch(error) {
        res.send({})
    }
})