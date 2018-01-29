const path = require("path");
const RSACryptoLib = require("./RSACryptoLib");

const zhangsan_keyfile = path.join(__dirname, '../certs/zhangsan/zhangsan_key.pem');
const zhangsan_certfile = path.join(__dirname, '../certs/zhangsan/zhangsan_cert.pem');

var rsa = new RSACryptoLib(zhangsan_keyfile, zhangsan_certfile);
// var data = "hello zhangsan";

var data =  `{
    "chaincode_id": "sacc",
    "version": "1.0",
    "args": ["get","a"]
  }`;

var enData =rsa.Encrypt(data)
console.log(enData);
var deData = rsa.Decrypt(enData);
console.log(deData);


var signature = rsa.Sign(enData);
console.log(signature);
var verified = rsa.Verify(enData, signature);
console.log(verified);
