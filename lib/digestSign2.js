const fs = require('fs');
const path = require('path');
const ursa = require('ursa');
const common = require('./common');
const zhangsan_keyfile = path.join(__dirname, '../certificate/zhangsan/zhangsan.key');
const zhangsan_crtfile = path.join(__dirname, '../certificate/zhangsan/zhangsan.crt');
const lisi_keyfile = path.join(__dirname, '../certificate/lisi/lisi.key');
const lisi_crtfile = path.join(__dirname, '../certificate/lisi/lisi.crt');
const wangwu_keyfile = path.join(__dirname, '../certificate/wangwu/wangwu.key');
const wangwu_crtfile = path.join(__dirname, '../certificate/wangwu/wangwu.crt');

let zhangsan_key = ursa.createPrivateKey(fs.readFileSync(zhangsan_keyfile));
let zhangsan_crt = ursa.createPublicKey(fs.readFileSync(zhangsan_crtfile));
let lisi_key = ursa.createPrivateKey(fs.readFileSync(lisi_keyfile));
let lisi_crt = ursa.createPublicKey(fs.readFileSync(lisi_crtfile));
let wangwu_key = ursa.createPrivateKey(fs.readFileSync(wangwu_keyfile));
let wangwu_crt = ursa.createPublicKey(fs.readFileSync(wangwu_crtfile));


/* 
 * 王五欺骗张三，在李四给张三分发公钥时，王五用自己的公钥替换为李四的公钥。（李四公钥被盗）
 * 王五期票李四，在张三给李四分发公钥时，王五用自己的公钥替换为张三的公钥。（张三公钥被盗）
*/

/* 
 * 张三给李四发消息
 */
let message = 'zhangsan: 李四，我爱你！';

let encryptedMsg = wangwu_crt.encrypt(message, 'utf8', 'hex');//张三被欺骗，本应该使用李四的公钥，却使用的是王五的公钥
let signer = ursa.createSigner('sha256').update(encryptedMsg, 'hex');
let signature = signer.sign(zhangsan_key, 'hex'); //张三用自己的私钥签名

// =============王五截获信息 开始==============
let verifier_wangwu = ursa.createVerifier('sha256').update(encryptedMsg,'hex');
let isVerified_wangwu = verifier_wangwu.verify(zhangsan_crt, signature ,'hex');
if(isVerified_wangwu){
    let decryptedMsg = wangwu_key.decrypt(encryptedMsg, 'hex', 'utf8'); //王五截获张三发给李四的消息
    console.log('wangwu截获张三的信息：' + decryptedMsg);

    decryptedMsg = 'zhangsan: 李四，我恨你！'; //如果王五同时欺骗李四，王五即可篡改信息，并用自己的私钥签名信息。
    encryptedMsg = lisi_crt.encrypt(decryptedMsg, 'utf8', 'hex');
    signer = ursa.createSigner('sha256').update(encryptedMsg, 'hex');
    signature = signer.sign(wangwu_key, 'hex'); 
}
// =============王五截获信息 结束==============

//李四 1、encryptedMsg 2、signature 3、zhangsan.crt
let verifier = ursa.createVerifier('sha256').update(encryptedMsg, 'hex');
let isVerified = verifier.verify(wangwu_crt, signature, 'hex');//用张三的公钥验证签名；如果王五同时欺骗李四，这里使用的是王五的公钥
if (isVerified) {
    let decryptedMsg = lisi_key.decrypt(encryptedMsg, 'hex', 'utf8'); //用自己的私钥解密消息内容
    console.log(decryptedMsg);
}


/* 
 * 李四给张三发消息
 */
message = 'lisi: 咱们恋爱吧！';

encryptedMsg = wangwu_crt.encrypt(message, 'utf8', 'hex');
signer = ursa.createSigner('sha256').update(encryptedMsg, 'hex');
signature = signer.sign(lisi_key, 'hex');

// =============王五截获信息 开始==============
verifier_wangwu = ursa.createVerifier('sha256').update(encryptedMsg,'hex');
isVerified_wangwu = verifier_wangwu.verify(lisi_crt, signature ,'hex');
if(isVerified_wangwu){
    let decryptedMsg = wangwu_key.decrypt(encryptedMsg, 'hex', 'utf8'); 
    console.log('wangwu截获李四的信息：' + decryptedMsg);

    decryptedMsg = 'lisi: 咱们绝交吧！';
    encryptedMsg = zhangsan_crt.encrypt(decryptedMsg, 'utf8', 'hex');
    signer = ursa.createSigner('sha256').update(encryptedMsg, 'hex');
    signature = signer.sign(wangwu_key, 'hex'); 
}
// =============王五截获信息 结束==============

verifier = ursa.createVerifier('sha256').update(encryptedMsg, 'hex');
isVerified = verifier.verify(wangwu_crt, signature, 'hex');
if(isVerified){
    let decryptedMsg = zhangsan_key.decrypt(encryptedMsg, 'hex','utf8');
    console.log(decryptedMsg);
}
