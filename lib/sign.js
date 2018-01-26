const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

const zhangsan_keyfile = path.join(__dirname, '../certificate/zhangsan/zhangsan_key.pem');
const zhangsan_certfile = path.join(__dirname, '../certificate/zhangsan/zhangsan_cert.pem');

var pripem = fs.readFileSync(zhangsan_keyfile);
var prikey = pripem.toString();

var pubpem = fs.readFileSync(zhangsan_certfile);
var pubkey = pubpem.toString();

var rawMessage = "hello"

function Encrypt(bufdata) {
    return crypto.privateEncrypt({ key: prikey, padding: crypto.RSA_NO_PADDING }, bufdata)
}

function Decrypt(bufdata) {
    return crypto.publicDecrypt({ key: pubkey, padding: crypto.RSA_NO_PADDING }, bufdata)
}

function EncryptAndDecrypt() {
    var encryptedData = Encrypt(new Buffer(rawMessage));
    console.log(encryptedData.toString("base64"));
    var decryptedData = Decrypt(encryptedData)
    console.log(decryptedData.toString());
}

// sign
function Sign(data) {
    var signer = crypto.createSign("sha256");
    signer.update(data);
    return signer.sign(prikey, "hex")
}

function Verify(data, signature) {
    var verifier = crypto.createVerify("sha256");
    verifier.update(data);
    return verifier.verify(pubkey, signature, "hex")
}

function SignAndVerify(params) {
    var signature = Sign(rawMessage)
    console.log(signature);

    var ret = Verify(rawMessage, signature);
    console.log(ret);
}

// SignAndVerify();



