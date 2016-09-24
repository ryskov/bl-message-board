'use strict'

const express = require('express');
const config = require('config');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

let app = new express();
const mysqlConf = config.get('mysql');

let dbConn = mysql.createConnection({
    host: mysqlConf.host,
    user: mysqlConf.user,
    password: mysqlConf.password,
    database: 'messageboard'
});

app.use(cors());

app.use(bodyParser.json());
app.use(express.static('build'));

app.disable('etag');

app.get('/messages', (req, res) => {
    dbConn.query("SELECT * FROM messages ORDER BY id DESC", (err, rows) => {
        if (err) {
            res.statusCode = 500;
            res.send(err);
        }

        res.status(200).send({data: rows});
    });
});

app.post('/messages', (req, res) => {
    
    let message = req.body;

    if (message.author && message.message_text) {
        dbConn.query("INSERT INTO messages SET ?", message, (err, results) => {
            res.statusCode = 201;
            res.sendStatus(201);
        });
    }
    else {
        res.statusCode = 400;
        res.sendStatus(400);
    }
});

app.get('/users', (req, res) => {
    dbConn.query("SELECT * FROM users", (err, rows) => {
        if (err) {
            res.statusCode = 500;
            res.send(err);        
        }

        res.status(200).send({data: rows});
    });
});

app.listen(3001);