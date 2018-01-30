const path = require("path");
const RSACryptoLib = require("./RSACryptoLib")
const { SignedData } = require("./Entities");

function CryptoLib(enrollmentID) {
    this.cryptolib = getRSACryptoLib(enrollmentID);
}

CryptoLib.prototype.SignAndEncrypt = function (rawData) {
    // sign
    var signatrue = this.cryptolib.Sign(rawData);  

    // create signedData
    var signedData = new SignedData();
    signedData.data = new Buffer(rawData).toString("base64");
    signedData.signature = signatrue;    
    
    // encrypt
    return this.cryptolib.Encrypt(JSON.stringify(signedData));        
}

CryptoLib.prototype.DecryptAndVerify = function (rawData) {
    // decrypt
    var decryptedData = this.cryptolib.Decrypt(rawData);    

    // create signedData
    var signedData = JSON.parse(decryptedData)

    // base64 decode data
    var decodedRawData = Buffer.from(signedData.data, "base64").toString("utf8");

    // verify
    if (this.cryptolib.Verify(decodedRawData, signedData.signature)) {
        return decodedRawData;
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