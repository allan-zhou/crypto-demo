var https = require('https');
var fs = require('fs');
var path = require('path');
var express = require('express');
var app = express();

var serverKeyFile = path.join(__dirname, '../../certificate/server/server-key.pem');
var serverCertFile = path.join(__dirname, '../../certificate/server/server-cert.pem');
var caCertFile = path.join(__dirname, '../../certificate/ca/ca-cert.pem');

var options = {
    key: fs.readFileSync(serverKeyFile),
    cert: fs.readFileSync(serverCertFile),
    ca: [fs.readFileSync(caCertFile)]
};

var server =https.createServer(options, app);
server.listen(3000,'192.168.1.217');
app.get('/',(req, res, next) => {
    res.end('hello world!!\n');
})
