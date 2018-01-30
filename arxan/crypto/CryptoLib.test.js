const path = require("path");
const CryptoLib = require("./CryptoLib")

var enrollmentID = "test";
// var enrollmentID = "F8pxCN1Mp1516701344";
var cryptolib = new CryptoLib(enrollmentID);

var data = `{
  "chaincode_id": "sacc",
  "version": "1.0",
  "args": ["get","a"]
}`;


var endata = cryptolib.SignAndEncrypt(data);
console.log("======== encrypt ==========");
console.log(endata);

var dedata = cryptolib.DecryptAndVerify(endata);
console.log("======== decrypt ==========");
console.log(dedata);

