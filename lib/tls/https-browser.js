var https = require('https');
var fs = require('fs');
var path = require('path');
var express = require('express');
var app = express();

var serverP12File = path.join(__dirname, '../../certificate/server/server.pfx');

var options = {
    pfx: fs.readFileSync(serverP12File),
    passphrase: 'your password'
};

var server = https.createServer(options, app);
server.listen(3000, '192.168.1.217');
app.get('/', (req, res, next) => {
    res.end('hello world!!\n');
})
