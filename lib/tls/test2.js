const https = require('https');
const { URL } = require('url');

const options = {
  hostname: 'www.baidu.com',
  port: 443,
  path: '/',
  method: 'GET',
  // key: fs.readFileSync('test/fixtures/keys/agent2-key.pem'),
  // cert: fs.readFileSync('test/fixtures/keys/agent2-cert.pem'),
  agent: false
};

https.get(options, (res) => {
  console.log('状态码：', res.statusCode);
  console.log('请求头：', res.headers);

  res.on('data', (d) => {
    process.stdout.write(d);
  });

}).on('error', (e) => {
  console.error(e);
});