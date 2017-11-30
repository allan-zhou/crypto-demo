var https = require('https');
var fs = require('fs');
var path = require('path');

var serverKeyFile = path.join(__dirname, '../../certificate/server/server-key.pem');
var serverCertFile = path.join(__dirname, '../../certificate/server/server-cert.pem');
var caCertFile = path.join(__dirname, '../../certificate/ca/ca-cert.pem');

var options = {
    key: fs.readFileSync(serverKeyFile),
    cert: fs.readFileSync(serverCertFile),
    ca: [fs.readFileSync(caCertFile)]
};

https.createServer(options, function (req, res) {
    res.writeHead(200);
    res.end('hello world\n');
}).listen(3000,'127.0.0.1');