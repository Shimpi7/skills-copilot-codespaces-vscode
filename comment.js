// Create web server
const express = require('express');
const app = express();

// Create port
const port = 3000;

// Create middleware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }