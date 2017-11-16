const crypto = require('crypto');
const key = 'mykey';
const message = 'I love you';

// 加密
const cipher = crypto.createCipher('aes192',key);
let encrypted = '';
encrypted += cipher.update(message,'utf8','hex');
// console.log(encrypted);
encrypted += cipher.final('hex');
console.log(encrypted);

// 解密
const decipher = crypto.createDecipher('aes192',key);
let decrypted = '';
decrypted += decipher.update(encrypted,'hex','utf8');
// console.log(decrypted);
decrypted += decipher.final('utf8');
console.log(decrypted);


// console.log(crypto.getCiphers());
