const express = require('express');
const path = require('path');
const https = require("https");

const app = express();

const url =
  "https://www.heytaco.chat/api/v1/json/leaderboard/T03624T4P?days=365";

// Slytherin 0
// Ravenclaw 1
// Gryffindor 2
// Hufflepuff 3
let HOUSES = {
    "stefano": 1,
    "rachel-dorn": 1,
    "katdroke": 2,
    "hollymyles": 1,
    "kateelane": 3,
    "molly": 0,
    "molly.underwood": 0
}

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/api/leaderboard', (req, res) => {
    let data;

    https.get(url, resp => {
        resp.setEncoding("utf8");
        let body = "";
        resp.on("data", data => {
            body += data;
        });
        resp.on("end", () => {
            data = JSON.parse(body);
            res.json(data);
            console.log(`Sent data`);
        });
    });
});

app.get('/api/usernames', (req, res) => {
    let data;

    https.get(url, resp => {
        resp.setEncoding("utf8");
        let body = "";
        resp.on("data", data => {
            body += data;
        });
        resp.on("end", () => {
            data = JSON.parse(body);
            let users = [];
            data.leaderboard.map((entry) => {
                users.push(entry.username);
            });
            res.json(users);
            console.log(`Sent users`);
        });
    });
});

app.get('/api/sorting', (req, res) => {
    res.json(HOUSES);
    console.log(`Sent sorting data`);
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Authentic House Cup listening on ${port}`);