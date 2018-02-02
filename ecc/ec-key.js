const crypto = require('crypto');
const fs = require('fs');
const path = require("path");
const common = require("../lib/common");
const ECKey = require('ec-key');
const forge = require('node-forge')

const server_crt_path = path.join(__dirname, "../certificate/ecc/prime256v1/server.crt");
const server_key_pem = common.loadPemKey(path.join(__dirname, "../certificate/ecc/prime256v1/server.key"));
const server_crt_pem = common.loadPemKey(path.join(__dirname, "../certificate/ecc/prime256v1/server.crt"));
const client_key_pem = common.loadPemKey(path.join(__dirname, "../certificate/ecc/prime256v1/client.key"));
const client_crt_pem = common.loadPemKey(path.join(__dirname, "../certificate/ecc/prime256v1/client.crt"));
const HASH_ALG = "SHA256";
const CiPHER_ALG = "AES192";

var mydata = "椭圆曲线密码学:Elliptic Curve Cryptography，是利用椭圆曲线来实现的密码技术，与RSA相比，密钥可以更短，但强度更高。";
var mydataBuffer = Buffer.from(mydata, "utf8");

function doCipher(alg, key, bufferData) {
    var cipher = crypto.createCipher(alg, key);

    var arrayBuffer = [];
    var encrypted = encrypted = cipher.update(bufferData);
    arrayBuffer.push(encrypted);
    arrayBuffer.push(cipher.final());

    return Buffer.concat(arrayBuffer);
}

function doDecipher(alg, key, bufferData) {
    var decipher = crypto.createDecipher(alg, key);

    var arrayBuffer = [];
    var decrypted = decipher.update(bufferData);
    arrayBuffer.push(decrypted);
    arrayBuffer.push(decipher.final());

    return Buffer.concat(arrayBuffer);
}


function Sign(dataBuffer, privatekey_pem) {
    var signer = crypto.createSign(HASH_ALG);
    signer.update(dataBuffer);
    return signer.sign(privatekey_pem)
}

function Verify(dataBuffer, signature, publicKey_pem) {
    var verifier = crypto.createVerify(HASH_ALG);
    verifier.update(dataBuffer);
    return verifier.verify(publicKey_pem, signature)
}

function Encrypt(dataBuffer, privateKey_pem, publicKey_pem) {
    var myECKey = new ECKey(privateKey_pem, "pem");

    var cert = forge.pki.certificateFromPem(publicKey_pem); 
    console.log(cert);
    // Public Key to PEM: 
    var pem = forge.pki.publicKeyToPem(cert.publicKey) 

    // var parsedData = x509.parseCert(server_crt_path);
    // console.log(parsedData);
    // console.log(parsedData.publicKey);
    // var publicECKey = new ECKey(publicKey_pem, "pem");

    // var secret = myECKey.computeSecret(publicECKey.publicCodePoint)
    // console.log(secret.toString("hex"));

    // return doCipher(CiPHER_ALG, secret, dataBuffer)
}

function Decrypt(dataBuffer, privateKey_pem, publicKey_pem) {
    var myECkey = new ECKey(privateKey_pem, "pem");
    var publicECKey = new ECKey(publicKey_pem, "pem");

    var secret = myECkey.computeSecret(publicECKey.publicCodePoint)
    console.log(secret.toString("hex"));

    return doDecipher(CiPHER_ALG, secret, dataBuffer)
}

function SignAndVerify(params) {
    var signature = Sign(mydataBuffer, server_key_pem);
    console.log(signature);

    if (Verify(mydataBuffer, signature, server_crt_pem)) {
        console.log("verify true");
    }
}

// SignAndVerify();

function EncryptAndDecrypt() {
    // client send msg to server

    // client
    var enData = Encrypt(mydataBuffer, client_key_pem, server_crt_pem);
    // console.log(enData.toString("base64"));

    // server
    // var deData = Decrypt(enData, server_key_pem ,client_crt_pem);
    // console.log(deData.toString("utf8"));
}

EncryptAndDecrypt();