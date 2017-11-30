var https = require('https');
var fs = require('fs');
var path = require('path');

var clientKeyFile = path.join(__dirname, '../../certificate/client/client-key.pem');
var clientCertFile = path.join(__dirname, '../../certificate/client/client-cert.pem');
var caCertFile = path.join(__dirname, '../../certificate/ca/ca-cert.pem');

var options = {
    hostname: '127.0.0.1',
    port: 443,
    path: '/',
    method: 'GET',
    // key: fs.readFileSync(clientKeyFile),
    // cert: fs.readFileSync(clientCertFile),
    // ca: [fs.readFileSync(caCertFile)],
    agent: false
};

// options.agent = new https.Agent(options);
var req = https.request(options, function (res) {
    console.log("statusCode: ", res.statusCode);
    console.log("headers: ", res.headers);
    res.setEncoding('utf-8');
    res.on('data', function (d) {
        console.log(d);
    })
});

req.end();

req.on('error', function (e) {
    console.log(e);
})