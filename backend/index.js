'use strict';

var path = require('path');
var http = require('http');
// var cors = require('cors');

// const express = require("express");

var oas3Tools = require('oas3-tools');
var serverPort = 8080;

var options = {
    routing: {
        controllers: path.join(__dirname, './controllers')
    },
};

var expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
var app = expressAppConfig.getApp();

// app.use(express.json());

// app.use(cors());

// app.options('*', cors())

// app.use(cors());
// app.options('*', cors());

http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
});

