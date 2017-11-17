const fs = require('fs');
const path = require('path');
const ursa = require('ursa');
const zhangsan_keyfile = path.join(__dirname, '../certificate/zhangsan/zhangsan.key');
const zhangsan_crtfile = path.join(__dirname, '../certificate/zhangsan/zhangsan.crt');
const lisi_keyfile = path.join(__dirname, '../certificate/lisi/lisi.key');
const lisi_crtfile = path.join(__dirname, '../certificate/lisi/lisi.crt');

let zhangsan_key = ursa.createPrivateKey(fs.readFileSync(zhangsan_keyfile));
let zhangsan_crt = ursa.createPublicKey(fs.readFileSync(zhangsan_crtfile));
let lisi_key = ursa.createPrivateKey(fs.readFileSync(lisi_keyfile));
let lisi_crt = ursa.createPublicKey(fs.readFileSync(lisi_crtfile));

/* 
 * 公钥加密，私钥解密
*/

//张三给李四发消息
let message = 'zhangsan: 李四，我爱你！';
message = lisi_crt.encrypt(message,'utf8','hex');
console.log('encrypted message:', message, '\n');

message = lisi_key.decrypt(message,'hex','utf8');
console.log('dencrypted message:', message, '\n');

//李四给张三发消息
message = 'lisi: 咱们恋爱吧！';
message = zhangsan_crt.encrypt(message,'utf8','hex');
console.log('encrypted message:', message, '\n');

message = zhangsan_key.decrypt(message,'hex','utf8');
console.log('dencrypted message:', message, '\n');