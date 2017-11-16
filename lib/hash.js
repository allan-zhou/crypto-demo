const crypto = require('crypto');
const hash = crypto.createHash('sha256');// sha256, sha512, [md5,sha1]

let data = 'hello';
// let data = 'hello world';
hash.update(data);
// hash.update(data);
console.log(hash.update(data));

let result = hash.digest('hex'); //digest(),默认返回 Buffer
console.log(result);
console.log(result.length);
//sha256,length=64,  2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824
//sha512,length=128, 9b71d224bd62f3785d96d46ad3ea3d73319bfbc2890caadae2dff72519673ca72323c3d99ba5c11d7c7acc6e14b8c5da0c4663475c2e5c3adef46f73bcdec043
//md5,   length=32,  5d41402abc4b2a76b9719d911017c592

// let result = hash.digest('base64');
// console.log(result);
// console.log(result.length);
//sha256,length=44,  LPJNul+wow4m6DsqxbninhsWHlwfp0JecwQzYpOLmCQ=
//sha512,length=88,  m3HSJL1i83hdltRq0+o9czGb+8KJDKra4t/3JRlnPKcjI8PZm6XBHXx6zG4UuMXaDEZjR1wuXDre9G9zvN7AQw==
//md5,   length=24,  XUFAKrxLKna5cZ2REBfFkg==

// let result = hash.digest('latin1');
// console.log(result);
// console.log(result.length);
//sha256,length=32, ,òMº_°£&è;*Å¹â\§B^s3b$
//sha512,length=64, qÒ$½bóx]ÔjÓê=s1ûÂ
//                   ªÚâß÷%g<§##ÃÙ¥Á|zÌn¸ÅÚ
//                   FcG\.\:Þôos¼ÞÀC

//md5,   length=16, ]A@*¼K*v¹qÅ




