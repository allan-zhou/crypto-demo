var https = require('https');
var fs = require('fs');
var path = require('path');

var serverP12File = path.join(__dirname, '../../certificate/server/server.p12');

var options = {
	hostname:'127.0.0.1',
	port:3000,
	path:'/',
	method:'GET',
	pfx:fs.readFileSync(serverP12File),
	passphrase:'your password',
	agent:false
};

options.agent = new https.Agent(options);
var req = https.request(options,function(res){
console.log("statusCode: ", res.statusCode);
  console.log("headers: ", res.headers);
	res.setEncoding('utf-8');
	res.on('data',function(d){
		console.log(d);
	})
});

req.end();

req.on('error',function(e){
	console.log(e);
})