const {PubgAPI, PubgAPIErrors, REGION, SEASON, MATCH} = require('pubg-api-redis');
const apiKey = require('./config/apiKey.js'); 

const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))

// If no Redis configuration it wont be cached
const api = new PubgAPI({
    apikey: apiKey, //store in config...
    redisConfig: {
        host: '127.0.0.1',
        port: 6379,
        expiration: 300, // Optional - defaults to 300.
    },
});
 
api.getProfileByNickname('shroud')
    .then((profile) => {
        const data = profile.content;
        const stats = profile.getStats({
        region: REGION.ALL, // defaults to profile.content.selectedRegion
        season: SEASON.EA2017pre3, // defaults to profile.content.defaultSeason
        match: MATCH.SOLO // defaults to SOLO
        });
        console.log(stats);
});
 
api.getAccountBySteamID('76561198084956266')
    .then((account) => {
        console.log(account);
});


 