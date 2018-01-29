const path = require("path");
const EccCryptoLib = require("./EccCryptoLib");

const keyfile = path.join(__dirname, '../certs/F8pxCN1Mp1516701344.key');
const certfile = path.join(__dirname, '../certs/server.crt');

var ecc = new EccCryptoLib(keyfile, certfile);
// var data = "hello zhangsan";

var data =  `{
    "chaincode_id": "sacc",
    "version": "1.0",
    "args": ["get","a"]
  }`;

var enData =ecc.Encrypt(data)
console.log(enData);


var signature = ecc.Sign(enData);
console.log(signature);

