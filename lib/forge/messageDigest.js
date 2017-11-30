const forge = require('node-forge');

let message = 'Message Digests';
let md;
let hash;

//MD5
md = forge.md.md5.create();
md.update(message);
hash = md.digest().toHex();
console.log(hash);