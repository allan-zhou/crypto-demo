const crypto = require("crypto");
const path = require("path");
const common = require("./common");

const alice_priv = common.loadPemKey(path.join(__dirname, "../certificate/ecc/secp256k1/alice-priv.pem"));
const alice_pub = common.loadPemKey(path.join(__dirname, "../certificate/ecc/secp256k1/alice-pub.pem"));
const bob_priv = common.loadPemKey(path.join(__dirname, "../certificate/ecc/secp256k1/bob-priv.pem"));
const bob_pub = common.loadPemKey(path.join(__dirname, "../certificate/ecc/secp256k1/bob-pub.pem"));

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

// 04:6d:0a:66:95:5a:a2:10:e4:e1:e7:94:7f:50:7e:
// 61:d2:d4:55:0a:8b:e6:82:fb:14:2e:9b:d5:57:74:
// ef:31:db:6c:e6:e4:4e:af:40:78:93:09:f5:75:1f:
// 8d:ca:b9:92:50:09:98:e3:eb:8b:dc:c8:5d:5c:e4:
// 67:27:b3:67:19

function ComputeSecret() {
    console.log("\n================ aliceComputeSecret ==============================");
    const alice = crypto.createECDH('secp256k1');
    alice.setPrivateKey(crypto.createHash('sha256').update(alice_priv, 'utf8').digest());

    const bob = crypto.createECDH('secp256k1');
    bob.setPrivateKey(crypto.createHash('sha256').update(bob_pub, 'utf8').digest()); 
    
    console.log(bob.getPublicKey());
    const aliceSecret = alice.computeSecret(bob.getPublicKey());
    console.log(aliceSecret.toString("hex"));
    const bobSecret = bob.computeSecret(alice.getPublicKey());
    console.log(bobSecret.toString("hex"));
}

ComputeSecret();

function Sign(data, privatekey) {
    var signer = crypto.createSign("ecdsa-with-SHA1");
    signer.update(data);
    return signer.sign(privatekey)
}

function Verify(data, signature, publicKey) {
    var verifier = crypto.createVerify("ecdsa-with-SHA1");
    verifier.update(data);
    return verifier.verify(publicKey, signature)
}

function SignAndVerify() {
    console.log("\n================ Sign and Verify ==============================");
    var mydata = "hello";
    var signed = Sign(mydata, alice_priv);
    console.log(signed.toString("hex"));

    if (Verify(mydata, signed, alice_pub)) {
        console.log("verify: true");
    }
}

function Encrypt(data) {
    const alice = crypto.createECDH('secp256k1');
    alice.setPrivateKey(crypto.createHash('sha256').update(bob_pub, 'utf8').digest());

    const aliceSecret = alice.computeSecret(alice.getPublicKey());
    console.log(aliceSecret.toString("hex"));

    // crypto.publicEncrypt(alice_pub, data)
    // crypto.publicEncrypt()
}

function Decrypt(data) {
    
}

// SignAndVerify();

var toEncryptData = Buffer.from("hello", "utf8");
// Encrypt(toEncryptData);

// console.log(crypto.getCurves());
// console.log(crypto.getCiphers().toString());
// console.log(crypto.getHashes());