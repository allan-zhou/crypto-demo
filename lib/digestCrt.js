const fs = require('fs');
const path = require('path');
const ursa = require('ursa');
const forge = require('node-forge');
const pki = forge.pki;

const ca_crtfile = path.join(__dirname, '../certificate/ca/ca.crt');
const zhangsan_keyfile = path.join(__dirname, '../certificate/zhangsan/zhangsan.key');
const zhangsan_crtfile = path.join(__dirname, '../certificate/zhangsan/zhangsan-ca.crt');
const lisi_keyfile = path.join(__dirname, '../certificate/lisi/lisi.key');
const lisi_crtfile = path.join(__dirname, '../certificate/lisi/lisi-ca.crt');
const wangwu_crtfile = path.join(__dirname, '../certificate/wangwu/wangwu.crt');

let ca_cert = pki.certificateFromPem(fs.readFileSync(ca_crtfile));
let zhangsan_cert = pki.certificateFromPem(fs.readFileSync(zhangsan_crtfile));
let lisi_cert = pki.certificateFromPem(fs.readFileSync(lisi_crtfile));
let wangwu_cert = pki.certificateFromPem(fs.readFileSync(lisi_crtfile)); 
let zhangsan_key = ursa.createPrivateKey(fs.readFileSync(zhangsan_keyfile));
let lisi_key = ursa.createPrivateKey(fs.readFileSync(lisi_keyfile));

// let publicKeyFingerprint = pki.getPublicKeyFingerprint(wangwu_cert.publicKey, {encoding: 'hex'});
// console.log(publicKeyFingerprint);

// let caStore = pki.createCaStore();
// caStore.addCertificate(ca_cert);
// let issuer = caStore.getIssuer(lisi_cert);
// console.log(issuer);
// let verified = issuer.verify(wangwu_cert);
// console.log(verified);

var keys = pki.rsa.generateKeyPair(1024);
var s = ca_cert.sign(keys.privateKey, forge.md.sha256.create());
console.log(s);

// var s = ca_cert.sign(fs.readFileSync(zhangsan_keyfile));
// console.log(s);



// //张三给李四发消息
// let message = 'zhangsan: 李四，我爱你！';

// let encryptedMsg = lisi_crt.encrypt(message, 'utf8', 'hex');//用对方的公钥加密消息内容

// let signer = ursa.createSigner('sha256').update(encryptedMsg, 'hex');
// let signature = signer.sign(zhangsan_key, 'hex'); //用自己的私钥签名
// console.log(signature);


// //李四 1、encryptedMsg 2、signature 3、zhangsan.crt
// let verifier = ursa.createVerifier('sha256').update(encryptedMsg, 'hex');//验证消息内容完整性（不可抵赖）
// let isVerified = verifier.verify(zhangsan_crt, signature, 'hex');//用对方的公钥验证签名
// if (isVerified) {
//     let decryptedMsg = lisi_key.decrypt(encryptedMsg, 'hex', 'utf8'); //用自己的私钥解密消息内容
//     console.log(decryptedMsg);
// }


