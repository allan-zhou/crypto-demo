const path = require("path");
const RSACryptoLib = require("./RSACryptoLib")
const SignedData = require("./SignedData");

function CryptoLib(enrollmentID) {
    this.cryptolib = getRSACryptoLib(enrollmentID);
}

function splitToArray(inputString,len) {
    var arr = [];
    var number = Math.ceil(inputString.length / 100);
    // console.log(number);
    for (let i = 0; i < number; i++) {
        // console.log(inputString.substr(len*i, len));
        arr.push(inputString.substr(len*i, len))
    }
    return arr;
}

CryptoLib.prototype.SignAndEncrypt = function (rawDataStr) {
    // sign
    var signatrue = this.cryptolib.Sign(rawDataStr);  

    // create signedData
    var signedData = new SignedData();
    signedData.data = new Buffer(rawDataStr).toString("base64");
    signedData.signature = signatrue;

    console.log(signedData);
    
    // encrypt
    // console.log(JSON.stringify(signedData));
    // console.log(JSON.stringify(signedData).length);
    var toEncryptedData = JSON.stringify(signedData);
    console.log(toEncryptedData.length);


    var encryptedData = this.cryptolib.Encrypt(toEncryptedData.substr(0,256-42));    
    return encryptedData;
}

CryptoLib.prototype.DecryptAndVerify = function (rawDataStr) {
    // decrypt
    var decryptedData = this.cryptolib.Decrypt(rawDataStr);
    // console.log(decryptedData);

    // create signedData
    var signedData = JSON.parse(decryptedData)
    console.log(signedData);

    // verify
    var rawData = new Buffer(signedData.data, "base64");
    var rawSignature = new Buffer(signedData.signatrue, "base64");

    if (this.cryptolib.Verify(rawData, rawSignature)) {
        return rawData;
    }

    return null;
}

function getRSACryptoLib(enrollmentID) {
    var privateKey = "";
    var platformCert = "";
    if (enrollmentID == "test") {
        privateKey = path.join(__dirname, `../certs/zhangsan/zhangsan_key.pem`)
        platformCert = path.join(__dirname, `../certs/zhangsan/zhangsan_cert.pem`);
    } else {
        privateKey = path.join(__dirname, `../certs/${enrollmentID}.key`)
        platformCert = path.join(__dirname, `../certs/server.crt`);
    }
    return new RSACryptoLib(privateKey, platformCert)
}


module.exports = CryptoLib;