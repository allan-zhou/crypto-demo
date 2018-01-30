const crypto = require("crypto");
const fs = require("fs");
const common = require("./Common");

const RSA_KEY_SIZE = 2048;
const ENCRYPT_BLOCK_LENGTH = RSA_KEY_SIZE / 8 - 42;
const DECRYPT_BLOCK_LENGTH = RSA_KEY_SIZE / 8 ;

function RSACryptoLib(privateKey, platformCert, hashAlgorithm) {
    this.privateKey = common.loadPemKey(privateKey);
    this.platformCert = common.loadPemKey(platformCert);
    this.hashAlgorithm = hashAlgorithm || "sha256";
    this.signatureFormat = "base64";    
}

RSACryptoLib.prototype.Encrypt = function (rawData) {
    var rawDataBuffer = Buffer.from(rawData,"utf8");    
    var encryptBlockCount = Math.ceil(rawDataBuffer.length / ENCRYPT_BLOCK_LENGTH);

    var arrayBuffer = [];
    for (let i = 0; i < encryptBlockCount; i++) {
        var blockBuffer = rawDataBuffer.slice(ENCRYPT_BLOCK_LENGTH * i, ENCRYPT_BLOCK_LENGTH * (i+1))
        var encryptedBuffer =  crypto.publicEncrypt({ key: this.platformCert, padding: crypto.RSA_PKCS1_OAEP_PADDING }, blockBuffer);
        arrayBuffer.push(encryptedBuffer);
    }
    
    return Buffer.concat(arrayBuffer).toString("base64");
}

RSACryptoLib.prototype.Decrypt = function (rawData) {
    var rawDataBuffer = new Buffer(rawData, "base64");
    var decryptBlockCount = rawDataBuffer.length / DECRYPT_BLOCK_LENGTH;
    
    var arrayBuffer = [];
    for (let i = 0; i < decryptBlockCount; i++) {
        var blockBuffer = rawDataBuffer.slice(DECRYPT_BLOCK_LENGTH * i, DECRYPT_BLOCK_LENGTH * (i+1))
        var decryptedBuffer = crypto.privateDecrypt({ key: this.privateKey, padding: crypto.RSA_PKCS1_OAEP_PADDING }, blockBuffer);
        arrayBuffer.push(decryptedBuffer);
    }

    return Buffer.concat(arrayBuffer).toString("utf8");
}

RSACryptoLib.prototype.Sign = function (rawData) {
    var signer = crypto.createSign(this.hashAlgorithm);
    signer.update(rawData);
    return signer.sign(this.privateKey, this.signatureFormat)
}

RSACryptoLib.prototype.Verify = function (rawData, signature) {
    var verifier = crypto.createVerify(this.hashAlgorithm);
    verifier.update(rawData);
    return verifier.verify(this.platformCert, signature, this.signatureFormat)
}

module.exports = RSACryptoLib;

