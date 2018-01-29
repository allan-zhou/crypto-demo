const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

const zhangsan_keyfile = path.join(__dirname, '../certificate/zhangsan/zhangsan_key.pem');
const zhangsan_certfile = path.join(__dirname, '../certificate/zhangsan/zhangsan_cert.pem');

var pripem = fs.readFileSync(zhangsan_keyfile);
var prikey = pripem.toString();

var pubpem = fs.readFileSync(zhangsan_certfile);
var pubkey = pubpem.toString();

var rawMessage = `
down vote
accepted
RSA works by doing modular exponentiation. This means that anything that is encrypted will usually have as many bits as the modulus (which is the product of the two primes).

RSA needs a padding scheme to be secure. The default is RSA_PKCS1_OAEP_PADDING in node.js. This padding scheme adds 42 bytes to the plaintext before encryption, but now the new plaintext (first_result) is larger than the modulus and it will not be able to encrypt it in a recoverable manner.`;

console.log(crypto.getHashes());

// sign
function Sign(data) {
    var hash = crypto.createHash("sha256").update(data).digest("base64");

    var signer = crypto.createSign("sha256");
    signer.update(data);
    return signer.sign(prikey)
}

function Verify(data, signature) {
    var verifier = crypto.createVerify("sha256");
    verifier.update(data);
    return verifier.verify(pubkey, signature, "base64")
}

function SignAndVerify(params) {
    var signature = Sign(rawMessage)
    console.log(signature);
    console.log(signature.length);

    var ret = Verify(rawMessage, signature);
    console.log(ret);
}

SignAndVerify();



