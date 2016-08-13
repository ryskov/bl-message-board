'use strict'

const express = require('express');
const config = require('config');
const mysql = require('mysql');
const bodyParser = require('body-parser');

let app = new express();
const mysqlConf = config.get('mysql');

let dbConn = mysql.createConnection({
    host: mysqlConf.host,
    user: mysqlConf.user,
    password: mysqlConf.password,
    database: 'messageboard'
});

app.use(bodyParser.json());
app.use(express.static('build'));

app.get('/messages', (req, res) => {
    dbConn.query("SELECT * FROM messages", (err, rows) => {
        if (err) {
            res.statusCode = 500;
            res.send(err);
        }

        res.send({data: rows});
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

        res.send({data: rows});
    });
});

app.listen(3001);