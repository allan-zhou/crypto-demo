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
// console.log(keys);

// console.log(lisi_cert);
console.log(lisi_cert.publicKey);
console.log(lisi_cert.subject);
console.log(lisi_cert.issuer);




