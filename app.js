const {PubgAPI, PubgAPIErrors, REGION, SEASON, MATCH} = require('pubg-api-redis');
const apiKey = require('./config/apiKey.json');
const testData = require('./test/test-data.json');

console.log("APIKEY: ", apiKey.apiKey); 

const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("Got your response...");
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});

if(apiKey.apiKey !== "") {
    // If no Redis configuration it wont be cached
    const api = new PubgAPI({
        apikey: apiKey.apiKey, //store in config...
        redisConfig: {
            host: '127.0.0.1',
            port: 6379,
            expiration: 300, // Optional - defaults to 300.
        },
    });
} 

function getProfileByNickname(nickname) {
    api.getProfileByNickname(nickname)
        .then((profile) => {
            const data = profile.content;
            const stats = profile.getStats({
                region: REGION.ALL, // defaults to profile.content.selectedRegion
                season: SEASON.EA2017pre3, // defaults to profile.content.defaultSeason
                match: MATCH.SOLO // defaults to SOLO
            });
            return stats;
        },(error) => {
            return error;
        }
    );
}

function getAccountBySteamID(steam_id) {
    api.getAccountBySteamID(steam_id)
        .then((account) => {
            return account;
        },(error) => {
            return error;
        }
    );
}

function getTestData() {
    return testData;
}

 