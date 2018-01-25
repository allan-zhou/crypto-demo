const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

const zhangsan_keyfile = path.join(__dirname, '../certificate/zhangsan/zhangsan_key.pem');
const zhangsan_certfile = path.join(__dirname, '../certificate/zhangsan/zhangsan_cert.pem');

var pripem = fs.readFileSync(zhangsan_keyfile);
var prikey = pripem.toString();

var pubpem = fs.readFileSync(zhangsan_certfile);
var pubkey = pubpem.toString();

// sign
function Sign(data) {
    var signer = crypto.createSign("sha256");
    signer.update(data);
    return signer.sign(prikey, "base64")
}


function Verify(data, signature) {
    var verifier = crypto.createVerify("sha256");
    verifier.update(data);
    return verifier.verify(pubkey, signature)
}

function Encrypt(bufdata) {
    return crypto.privateEncrypt({ key: prikey, padding: crypto.RSA_NO_PADDING }, bufdata)
}

function Decrypt(bufdata) {
    return crypto.publicDecrypt({ key: pubkey, padding: crypto.RSA_NO_PADDING }, bufdata)
}


var message = "hello"
function EncryptAndDecrypt() {
    var encryptedData = Encrypt(new Buffer(message));
    console.log(encryptedData.toString("base64"));
    var decryptedData = Decrypt(encryptedData)
    console.log(decryptedData.toString());
}

// EncryptAndDecrypt()

function SignAndEncrypt() {
    var encryptedData = Encrypt(new Buffer(message));
    console.log(encryptedData);

    var signature = Sign(encryptedData);
    console.log(signature);
    console.log(signature.length);

    // var decryptedData = Decrypt(encryptedData)
    var result = Verify(encryptedData, signature);
    console.log(result);
}

