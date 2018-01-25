const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

const zhangsan_keyfile = path.join(__dirname, '../certificate/zhangsan/zhangsan_key.pem');
const zhangsan_certfile = path.join(__dirname, '../certificate/zhangsan/zhangsan_cert.pem');

/* 
 * 公钥加密，私钥解密
*/

var pubpem = fs.readFileSync(zhangsan_certfile);
///< 公钥加密  
// console.log(pem);
var pubkey = pubpem.toString();
// console.log(key);
var buf = new Buffer("我爱你!")
var endata = crypto.publicEncrypt({ key: pubkey, padding: crypto.RSA_PKCS1_PADDING }, buf);

console.log(endata.toString('base64'));

///< 私钥解密  
var pripem = fs.readFileSync(zhangsan_keyfile);
var prikey = pripem.toString();
var dedata = crypto.privateDecrypt({ key: prikey, padding: crypto.RSA_PKCS1_PADDING }, endata);
console.log('decrypted data=' + dedata);  

