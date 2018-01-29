const crypto = require("crypto");
const fs = require("fs");

function EccCryptoLib(privateKey, platformCert) {
    this.privateKey = loadPemKey(privateKey);
    this.platformCert = loadPemKey(platformCert);
    this.hashAlgorithm = "ECDSA";
    this.signatureFormat = "base64";    
}

EccCryptoLib.prototype.Encrypt = function (rawData) {
    var buffer = new Buffer(rawData,"utf8");
    var encrypted =  crypto.publicEncrypt({ key: this.platformCert, padding: crypto.RSA_PKCS1_PADDING }, buffer);
    return encrypted.toString("base64");
}

EccCryptoLib.prototype.Decrypt = function (rawData) {
    var buffer = new Buffer(rawData, "base64");
    var decrypted = crypto.privateDecrypt({ key: this.privateKey, padding: crypto.RSA_PKCS1_PADDING }, buffer);
    return decrypted.toString("utf8");
}

EccCryptoLib.prototype.Sign = function (rawData) {
    var signer = crypto.createSign(this.hashAlgorithm);
    signer.update(rawData);
    return signer.sign(this.privateKey, this.signatureFormat)
}

EccCryptoLib.prototype.Verify = function (rawData, signature) {
    var verifier = crypto.createVerify(this.hashAlgorithm);
    verifier.update(rawData);
    return verifier.verify(this.platformCert, signature, this.signatureFormat)
}

function loadPemKey(filepath) {
    var pem = fs.readFileSync(filepath);
    return pem.toString();
}

module.exports = EccCryptoLib;
