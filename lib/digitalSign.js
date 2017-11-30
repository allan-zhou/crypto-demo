const fs = require('fs');
const path = require('path');
const ursa = require('ursa');
const common = require('./common');
const zhangsan_keyfile = path.join(__dirname, '../certificate/zhangsan/zhangsan.key');
const zhangsan_crtfile = path.join(__dirname, '../certificate/zhangsan/zhangsan.crt');
const lisi_keyfile = path.join(__dirname, '../certificate/lisi/lisi.key');
const lisi_crtfile = path.join(__dirname, '../certificate/lisi/lisi.crt');

let zhangsan_key = ursa.createPrivateKey(fs.readFileSync(zhangsan_keyfile));
let zhangsan_crt = ursa.createPublicKey(fs.readFileSync(zhangsan_crtfile));
let lisi_key = ursa.createPrivateKey(fs.readFileSync(lisi_keyfile));
let lisi_crt = ursa.createPublicKey(fs.readFileSync(lisi_crtfile));

/* 
 * 数字签名解决两个问题：1、身份认证 2、发送的消息完整性 
*/

//张三给李四发消息
let message = 'zhangsan: 李四，我爱你！';

let encryptedMsg = lisi_crt.encrypt(message, 'utf8', 'hex');//用对方的公钥加密消息内容
let signer = ursa.createSigner('sha256').update(encryptedMsg, 'hex');
let signature = signer.sign(zhangsan_key, 'hex'); //用自己的私钥签名
console.log(signature);

//李四 1、encryptedMsg 2、signature 3、zhangsan.crt
let verifier = ursa.createVerifier('sha256').update(encryptedMsg, 'hex');//验证消息内容完整性（不可抵赖）
let isVerified = verifier.verify(zhangsan_crt, signature, 'hex');//用对方的公钥验证签名
if (isVerified) {
    let decryptedMsg = lisi_key.decrypt(encryptedMsg, 'hex', 'utf8'); //用自己的私钥解密消息内容
    console.log(decryptedMsg);
}

//李四给张三发消息
message = 'lisi: 咱们恋爱吧！';

encryptedMsg = zhangsan_crt.encrypt(message, 'utf8', 'hex');
signer = ursa.createSigner('sha256').update(encryptedMsg, 'hex');
signature = signer.sign(lisi_key, 'hex');

verifier = ursa.createVerifier('sha256').update(encryptedMsg, 'hex');
isVerified = verifier.verify(lisi_crt, signature, 'hex');
if(isVerified){
    let decryptedMsg = zhangsan_key.decrypt(encryptedMsg, 'hex','utf8');
    console.log(decryptedMsg);
}
