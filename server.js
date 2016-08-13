'use strict'

const express = require('express');
const config = require('config');
const mysql = require('mysql');

let app = new express();

app.use(express.static('build'));

app.listen(3001);