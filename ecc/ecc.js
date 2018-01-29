const crypto = require("crypto");
const assert = require('assert');
// console.log(crypto.getCurves());


// Generate Alice's keys...
const alice = crypto.createDiffieHellman(2048);
const aliceKey = alice.generateKeys();
console.log(aliceKey);