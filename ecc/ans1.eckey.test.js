const fs = require('fs');
const path = require("path");
var asn = require('asn1.js');

// EC privatekey
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

const pemRfc5915RE = /-+BEGIN EC PRIVATE KEY-+([\s\S]+)-+END EC PRIVATE KEY-+/m;
function readECKey(pemFilePath) {
    var pem = fs.readFileSync(pemFilePath).toString();
    var match = pem.match(pemRfc5915RE);
    // var buffer = new Buffer(match[1].replace(/[\s-]/mg, ''), 'base64');
    var buffer = Buffer.from(match[1], "base64");
    
    var key = ASN1ECRfc5915Key.decode(buffer, "der");
    console.log(key);

    console.log(key.privateKey.toString("hex"));
    console.log(key.privateKey.length);
    console.log(key.publicKey.data.toString("hex"));
    console.log(key.publicKey.data.length);
}

readECKey(path.join(__dirname, "../certificate/ecc/secp256k1/alice-priv.pem"));
readECKey(path.join(__dirname, "../certificate/ecc/prime256v1/client.key"));

// readkey(path.join(__dirname, "../certificate/ecc/secp256k1/alice-pub.pem"));
