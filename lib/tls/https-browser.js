var https = require('https');
var fs = require('fs');
var path = require('path');

var serverP12File = path.join(__dirname, '../../certificate/server/server.p12');

var options = {
	pfx:fs.readFileSync(serverP12File),
	passphrase:'your password'
};

https.createServer(options,function(req,res){
	res.writeHead(200);
	res.end('hello world\n');
}).listen(3000,'127.0.0.1');