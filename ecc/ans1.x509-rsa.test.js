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
                    '1 2 840 113549 1 1 1': 'a',
                }),
                // this.key('parameters').int()
                // this.key('algorithm').seq().obj(
                //     this.key('algorithm').objid({})
                // ),
                // this.key('subjectPublicKey').bitstr()
            )
        ),
        this.key('signatureAlgorithm').seq().obj(
            this.key('algorithm').objid({
                '1 2 840 113549 1 1 11': 'sha256WithRSAEncryption',
            })
        ),
        this.key('signatureValue').bitstr()
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
    console.log(key.tbsCertificate.subjectPublicKeyInfo.algorithm);
}

readX509Cert(path.join(__dirname, "../certificate/zhangsan/zhangsan_cert.pem"));