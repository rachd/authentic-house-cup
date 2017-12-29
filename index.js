const express = require('express');
const path = require('path');
const https = require("https");
const bodyParser = require('body-parser');
const { Client } = require('pg');

const app = express();

const url =
  "https://www.heytaco.chat/api/v1/json/leaderboard/T03624T4P?days=";

// Slytherin 0
// Ravenclaw 1
// Gryffindor 2
// Hufflepuff 3

app.use(bodyParser.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/api/leaderboard', (req, res) => {
    let data;
    let days = req.query.days;
    https.get(url+days, resp => {
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

app.get('/api/sorting', (req, res) => {
    const client = new Client({
        connectionString: 'postgres://fucexfiydghvkb:92d5b1b2c32939084b0737cda20c02c94b378c46230ef7fbe3f4316106721bbf@ec2-50-17-234-234.compute-1.amazonaws.com:5432/dieiegd1b5cqe',
        ssl: true,
    });
    client.connect().catch((e)=>console.log("error connecting to database"));
    client.query('SELECT (username, house) FROM USERS;', (err, resp) => {
        if (err) throw err;
        let userdata = {};
        for (let row of resp.rows) {
            const data = row.row;
            const dataArray = data.substring(1, data.length - 1).split(',');
            userdata[dataArray[0]] = dataArray[1];
        }
        res.json(userdata);
        client.end();
        console.log(`Sent sorting data`);
    });
});

app.post('/api/sorting', (req, res) => {
    const client = new Client({
        connectionString: 'postgres://fucexfiydghvkb:92d5b1b2c32939084b0737cda20c02c94b378c46230ef7fbe3f4316106721bbf@ec2-50-17-234-234.compute-1.amazonaws.com:5432/dieiegd1b5cqe',
        ssl: true,
    });
    client.connect().catch((e)=>console.log("error connecting to database"));
    client.query(`WITH upsert AS (UPDATE USERS SET house=${req.body.house} WHERE username='${req.body.username}' RETURNING *) INSERT INTO USERS (username, house) SELECT '${req.body.username}', ${req.body.house} WHERE NOT EXISTS (SELECT * FROM upsert);`, (err, resp) => {
        if(err) throw err;
        res.json(resp);
        client.end();
        console.log(`updated sorting data`);
    });
});
// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Authentic House Cup listening on ${port}`);