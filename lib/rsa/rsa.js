const crypto = require("crypto")

function RSACryptoLib(privateKey, platformCert, hashAlgorithm) {
    this.privateKey = privateKey;
    this.platformCert = platformCert;
    this.hashAlgorithm = hashAlgorithm || "sha256";
    this.signatureFormat = "hex";
}

RSACryptoLib.prototype.Encrypt = function (bufferData) {
    return crypto.publicEncrypt({ key: this.platformCert, padding: crypto.RSA_PKCS1_PADDING }, bufferData);
}

RSACryptoLib.prototype.Decrypt = function (bufferData) {
    return crypto.privateDecrypt({ key: this.privateKey, padding: crypto.RSA_PKCS1_PADDING }, bufferData);
}

RSACryptoLib.prototype.Sign = function (data) {
    var signer = crypto.createSign(this.hashAlgorithm);
    signer.update(data);
    return signer.sign(this.privateKey, this.signatureFormat)
}

RSACryptoLib.prototype.Verify = function (data, signature) {
    var verifier = crypto.createVerify(this.hashAlgorithm);
    verifier.update(data);
    return verifier.verify(this.platformCert, signature, this.signatureFormat)
}

module.exports = RSACryptoLib;

// var aa = new RSACryptoLib("","","");
