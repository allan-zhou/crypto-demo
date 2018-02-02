const crypto = require("crypto");
const path = require("path");
const common = require("./common");
const ECKey = require('ec-key');

const alice_priv_pem = common.loadPemKey(path.join(__dirname, "../certificate/ecc/secp256k1/alice-priv.pem"));
const alice_pub_pem = common.loadPemKey(path.join(__dirname, "../certificate/ecc/secp256k1/alice-pub.pem"));
const bob_priv_pem = common.loadPemKey(path.join(__dirname, "../certificate/ecc/secp256k1/bob-priv.pem"));
const bob_pub_pem = common.loadPemKey(path.join(__dirname, "../certificate/ecc/secp256k1/bob-pub.pem"));
const server_key_pem = common.loadPemKey(path.join(__dirname, "../certificate/ecc/prime256v1/server.key"));
const server_crt_pem = common.loadPemKey(path.join(__dirname, "../certificate/ecc/prime256v1/server.crt"));


// console.log("================ alice ==============================");
// const alice = crypto.createECDH('secp256k1');
// alice.setPrivateKey(crypto.createHash('sha256').update(alice_priv, 'utf8').digest());
// console.log(alice.getPrivateKey().toString("hex"));
// console.log(alice.getPublicKey().toString("hex"));

// console.log("\n================ bob ==============================");
// const bob = crypto.createECDH('secp256k1');
// bob.setPrivateKey(crypto.createHash('sha256').update(bob_priv, 'utf8').digest());
// console.log(bob.getPrivateKey().toString("hex"));
// console.log(bob.getPublicKey().toString("hex"));

// console.log("\n================ computeSecret ==============================");
// const aliceSecret = alice.computeSecret(bob.getPublicKey());
// console.log(aliceSecret);
// const bobSecret = bob.computeSecret(alice.getPublicKey());
// console.log(bobSecret);

// priv:
//     0e:9c:16:1b:47:8d:64:99:9d:9c:40:cb:60:35:30:
//     68:df:6a:cf:47:f2:0b:00:2b:cd:4d:3e:d4:60:ff:
//     60:6e
// pub:
//     04:
//     ee:be:7f:10:e5:42:33:49:c5:68:be:7a:ae:b5:eb:23:
//     0c:81:ad:f0:e1:e9:2a:c6:eb:3f:4d:87:f9:8f:80:81:
//     
//     46:77:8a:48:fc:1d:5d:a8:1c:c8:1d:47:4a:1c:cb:fc:
//     4a:dc:3c:c5:e6:72:54:cf:5a:1d:ac:b6:e5:cc:ed:51
//     

function AliceComputeSecret() {
    console.log("\n================ alice ComputeSecret ==============================");
    const alice = new ECKey(alice_priv_pem, 'pem');
    const bob = new ECKey(bob_pub_pem, 'pem');

    const aliceSecret = alice.computeSecret(bob.publicCodePoint);
    console.log(aliceSecret.toString("hex"));
}

function BobComputeSecret() {
    console.log("\n================ bob ComputeSecret ==============================");
    const bob = new ECKey(bob_priv_pem, 'pem');
    const alice = new ECKey(alice_pub_pem, 'pem');

    const bobSecret = bob.computeSecret(alice.publicCodePoint);
    console.log(bobSecret.toString("hex"));
}

// AliceComputeSecret();
// BobComputeSecret();

function Sign(data, privatekey) {
    var signer = crypto.createSign("SHA256");
    signer.update(data);
    return signer.sign(privatekey)
}

function Verify(data, signature, publicKey) {
    var verifier = crypto.createVerify("SHA256");
    verifier.update(data);
    return verifier.verify(publicKey, signature)
}

function SignAndVerify() {
    console.log("\n================ Sign and Verify ==============================");
    var mydata = "hello";
    var signed = Sign(mydata, alice_priv_pem);
    console.log(signed.toString("hex"));

    if (Verify(mydata, signed, alice_pub_pem)) {
        console.log("verify: true");
    }
}

function Encrypt(data) {
    const alice = crypto.createECDH('secp256k1');
    alice.setPrivateKey(crypto.createHash('sha256').update(bob_pub_pem, 'utf8').digest());

    const aliceSecret = alice.computeSecret(alice.getPublicKey());
    console.log(aliceSecret.toString("hex"));

    // crypto.publicEncrypt(alice_pub, data)
    // crypto.publicEncrypt()
}

function Decrypt(data) {
    
}

SignAndVerify();

var toEncryptData = Buffer.from("hello", "utf8");
// Encrypt(toEncryptData);

// console.log(crypto.getCurves());
// console.log(crypto.getCiphers().toString());
// console.log(crypto.getHashes());