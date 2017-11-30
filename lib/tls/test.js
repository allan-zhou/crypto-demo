var path = require('path');
var fs = require('fs');
var http = require('http');
var https = require('https');
var express = require('express');
var app = express();
var port = process.PORT || 3000;
var tls = true;

var server;
if (tls) {
    var key = fs.readFileSync(path.join(__dirname, '../../certificate/server/server-key.pem'));
    var cert = fs.readFileSync(path.join(__dirname, '../../certificate/server/server-cert.pem'));
    server = https.createServer({ cert, key }, app);
}
else {
    server = http.createServer(app);
}
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

app.get('/',(req, res, next) => {
    res.end('hello world\n');
})



function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;

    console.log('****************** SERVER STARTED ************************');
    console.log(bind)
}
