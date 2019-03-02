var winston = require('winston');
var express = require('express');
var app = express();

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'example-service' },
    transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log` 
        // - Write all logs error (and below) to `error.log`.
        //
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' })
    ]
});

app.get('/', function(req, res) {
    logger.log('info', 'we have a vistor!');
    res.send(`
        <a href="/">Welcome</a>
        <a href="/info">Info</a>
        <a href="/verbose">Verbose</a>
        <a href="/error">Error</a>
        <br>
        Welcome to logger example
    `);
});

app.get('/info', function(req, res) {
    logger.log('info', 'info is logged');
    res.send(`
        <a href="/">Welcome</a>
        <a href="/info">Info</a>
        <a href="/verbose">Verbose</a>
        <a href="/error">Error</a>
        <br>
        Logger will add an info
    `);
});

app.get('/verbose', function(req, res) {
    logger.log('verbose', 'verbose is logged');
    res.send(`
        <a href="/">Welcome</a>
        <a href="/info">Info</a>
        <a href="/verbose">Verbose</a>
        <a href="/error">Error</a>
        <br>
        Logger will add a verbose
    `);
});

app.get('/error', function(req, res) {
    logger.log('error', 'error is logged');
    res.send(`
        <a href="/">Welcome</a>
        <a href="/info">Info</a>
        <a href="/verbose">Verbose</a>
        <a href="/error">Error</a>
        <br>
        Logger will add an error
    `);
});

var server = app.listen(process.PORT || 3000, function() {
    console.log('Listening on port ' + server.address().port)
});