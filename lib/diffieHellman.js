const crypto = require('crypto');

// Generate Alice's keys...
const alice = crypto.createDiffieHellman(2048);
const aliceKey = alice.generateKeys();
// console.log(alice.getPrime());
// console.log(alice.getGenerator());
// console.log(aliceKey);
