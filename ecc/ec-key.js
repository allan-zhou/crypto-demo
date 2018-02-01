const crypto = require('crypto');
const path = require("path");
const common = require("../lib/common");
const ECKey = require('ec-key');

const alice_priv_pem = common.loadPemKey(path.join(__dirname, "../certificate/ecc/secp256k1/alice-priv.pem"));
const alice_pub_pem = common.loadPemKey(path.join(__dirname, "../certificate/ecc/secp256k1/alice-pub.pem"));
const bob_priv_pem = common.loadPemKey(path.join(__dirname, "../certificate/ecc/secp256k1/bob-priv.pem"));
const bob_pub_pem = common.loadPemKey(path.join(__dirname, "../certificate/ecc/secp256k1/bob-pub.pem"));

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
    var signer = crypto.createSign("ecdsa-with-SHA1");
    signer.update(dataBuffer);
    return signer.sign(privatekey_pem)
}

function Verify(dataBuffer, signature, publicKey_pem) {
    var verifier = crypto.createVerify("ecdsa-with-SHA1");
    verifier.update(dataBuffer);
    return verifier.verify(publicKey_pem, signature)
}

function Encrypt(dataBuffer, publicKey_pem){
    var aliceECKey = new ECKey(alice_priv_pem,"pem")
    var publicECKey = new ECKey(publicKey_pem, "pem");

    var secret = aliceECKey.computeSecret(publicECKey.publicCodePoint)
    console.log(secret.toString("hex"));

    return doCipher("aes192", secret, dataBuffer)
}

function Decrypt(dataBuffer, publicKey_pem){
    var bobECkey = new ECKey(bob_priv_pem, "pem");
    var publicECKey = new ECKey(publicKey_pem,"pem");

    var secret = bobECkey.computeSecret(publicECKey.publicCodePoint)
    console.log(secret.toString("hex"));

    return doDecipher("aes192", secret, dataBuffer)
}

function SignAndVerify(params) {
    var signature = Sign(mydataBuffer, alice_priv_pem);
    console.log(signature);

    if(Verify(mydataBuffer, signature, alice_pub_pem)){
        console.log("verify true");
    }
}

function EncryptAndDecrypt() {
    // alice send msg to bob

    //alice
    var enData = Encrypt(mydataBuffer, bob_pub_pem);
    console.log(enData.toString("base64"));

    //bob
    var deData = Decrypt(enData, alice_pub_pem);
    console.log(deData.toString("utf8"));
}

EncryptAndDecrypt();