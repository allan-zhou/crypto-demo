const crypto = require('crypto');
const hmac = crypto.createHmac('sha256','secret');// sha256, sha512, [md5,sha1]

let data = 'hello worldasdfsfdasfdsf';
hmac.update(data);
// hash.update(data);
// console.log(typeof hash.update(data));

let result = hmac.digest('hex');
console.log(result);
console.log(result.length);
//sha256,length=64,  key=secret,  88aab3ede8d3adf94d26ab90d3bafd4a2083070c3bcce9c014ee04a443847c0b
//sha256,length=64,  key=mykey,   1b1cae65399ee1064e57646393f7bb035f4fe60b5413509d73ffce40cd79a535
//sha512,length=128, key=secret,  db1595ae88a62fd151ec1cba81b98c39df82daae7b4cb9820f446d5bf02f1dcfca6683d88cab3e273f5963ab8ec469a746b5b19086371239f67d1e5f99a79440
//md5,   length=32,  key=secret,  bade63863c61ed0b3165806ecd6acefc

// let result = hmac.digest('base64');
// console.log(result);
// console.log(result.length);
//sha256,length=44, key=secret, iKqz7ejTrflNJquQ07r9SiCDBww7zOnAFO4EpEOEfAs=
//sha512,length=88, key=secret, 2xWVroimL9FR7By6gbmMOd+C2q57TLmCD0RtW/AvHc/KZoPYjKs+Jz9ZY6uOxGmnRrWxkIY3Ejn2fR5fmaeUQA==
//md5,   length=24, key=secret, ut5jhjxh7QsxZYBuzWrO/A==

// let result = hmac.digest('latin1');
// console.log(result);
// console.log(result.length);




