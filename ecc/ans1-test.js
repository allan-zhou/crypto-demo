const fs = require('fs');
const path = require("path");
var asn = require('asn1.js');
const crypto = require('crypto');

// priv:
//     0e:9c:16:1b:47:8d:64:99:9d:9c:40:cb:60:35:30:
//     68:df:6a:cf:47:f2:0b:00:2b:cd:4d:3e:d4:60:ff:
//     60:6e
// pub:
//     04:ee:be:7f:10:e5:42:33:49:c5:68:be:7a:ae:b5:
//     eb:23:0c:81:ad:f0:e1:e9:2a:c6:eb:3f:4d:87:f9:
//     8f:80:81:46:77:8a:48:fc:1d:5d:a8:1c:c8:1d:47:
//     4a:1c:cb:fc:4a:dc:3c:c5:e6:72:54:cf:5a:1d:ac:
//     b6:e5:cc:ed:51

const secp256k1_keylengths = Math.ceil(256 / 8);

const ASN1ECRfc5915Key = asn.define('Rfc5915Key', function () {
    this.seq().obj(
        this.key('version').int(),
        this.key('privateKey').octstr(),
        this.key('parameters').optional().explicit(0).objid({
            '1 2 840 10045 3 1 7': 'prime256v1',
            '1 3 132 0 10': 'secp256k1',
            '1 3 132 0 34': 'secp384r1',
            '1 3 132 0 35': 'secp521r1'
        }),
        this.key('publicKey').optional().explicit(1).bitstr()
    );
});

const pem = fs.readFileSync(path.join(__dirname, "../certificate/ecc/secp256k1/alice-priv.pem")).toString();

const pemRfc5915RE = /-+BEGIN EC PRIVATE KEY-+([\s\S]+)-+END EC PRIVATE KEY-+/m;

var match = pem.match(pemRfc5915RE);
var buffer = new Buffer(match[1].replace(/[\s-]/mg, ''), 'base64');

var key = ASN1ECRfc5915Key.decode(buffer, "der");
console.log(key);

console.log(key.privateKey.toString("hex"));
console.log(key.privateKey.length);
console.log(key.publicKey.data.toString("hex"));


var alice = crypto.createECDH(key.parameters);
alice.setPrivateKey(key.privateKey);
// alice.generateKeys();

console.log(alice.getPublicKey().toString("hex")); 

var secret = alice.computeSecret(alice.getPublicKey());
console.log(secret.toString("hex"));
