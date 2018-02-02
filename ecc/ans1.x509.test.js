const fs = require('fs');
const path = require("path");
var asn = require('asn1.js');
var forge = require('node-forge');

// EC privatekey
const ASN1X509Rfc5280Cert = asn.define('Rfc5915Key', function () {
    this.seq().obj(
        this.key('tbsCertificate').seq().obj(
            this.key('version').explicit(0).int(),
            this.key('serialNumber').int(),
            this.key('subjectPublicKeyInfo').seq().obj(
                this.key('algorithm').objid({
                    '1 2 840 10045 4 3 2': 'ecdsa-with-SHA256',
                    '1 2 840 10045 2 1': 'id-ecPublicKey'
                }),
                this.key('subjectPublicKey').optional().explicit(1).octstr()
                // this.key('algorithm').seq().obj(
                //     this.key('algorithm').objid({
                //         // iso(1) member-body(2) us(840) ansi-X9-62(10045) keyType(2) 1 
                //         '1 2 840 10045 2 1': 'id-ecPublicKey'
                //     }),
                //     this.key('parameters').enum({0:"namedCurve"})
                // ),
                // this.key('subjectPublicKey').bitstr()
            )
            // this.key('issuer').enum({0:"rdnSequence"}).seqof(issuerAttr)
        ),
        this.key('signatureAlgorithm').seq().obj(
            this.key('algorithm').objid({
                '1 2 840 10045 4 3 2': 'ecdsa-with-SHA256',
                '1 2 840 10045 2 1': 'id-ecPublicKey'
            }),
            this.key('parameters').optional().enum({ 0: 'namedCurve' ,1 :'implicitCurve', 2:'specifiedCurve'}),
        ),
        this.key('signatureValue').bitstr()
    );
});

// id-ecPublicKey OBJECT IDENTIFIER ::= {
//     iso(1) member-body(2) us(840) ansi-X9-62(10045) keyType(2) 1 }

var issuerAttr = asn.define('issuerAttr', function () {
    this.seq().obj(
        this.key('type').obj(),
        this.key('value').obj()
    );
});

const pemRfc5280RE = /-+BEGIN CERTIFICATE-+([\s\S]+)-+END CERTIFICATE-+/m;
function readX509Cert(pemFilePath) {
    var pem = fs.readFileSync(pemFilePath).toString();
    var match = pem.match(pemRfc5280RE);
    // var buffer = Buffer.from(match[1].replace(/[\s-]/mg,""), "base64");
    var buffer = Buffer.from(match[1], "base64");
    // var key = ASN1ECRfc5915Key.decode(buffer, "der");

    var key = ASN1X509Rfc5280Cert.decode(buffer, "der");
    console.log(key);

    // console.log(key.privateKey.toString("hex"));
    // console.log(key.privateKey.length);
    // console.log(key.publicKey.data.toString("hex"));
    // console.log(key.publicKey.data.length);
}

// readX509Cert(path.join(__dirname, "../certificate/ecc/prime256v1/server.crt"));
readX509Cert(path.join(__dirname, "../arxan/certs/server.crt"));