const crypto = require('crypto');

var mykey = "mykey"
var mydata = "DES算法把64位的明文输入块变为64位的密文输出块，它所使用的密钥也是64位。";

function doCipher(alg, key, bufferData) {
    var cipher = crypto.createCipher(alg, key);

    var arrayBuffer = [];
    var encrypted = encrypted = cipher.update(bufferData);
    arrayBuffer.push(encrypted);
    arrayBuffer.push(cipher.final());

    return Buffer.concat(arrayBuffer);
}

function doDecipher(alg, key, bufferData) {
    var decipher = crypto.createDecipher(alg, key);

    var arrayBuffer = [];
    var decrypted = decipher.update(bufferData);
    arrayBuffer.push(decrypted);
    arrayBuffer.push(decipher.final());

    return Buffer.concat(arrayBuffer);
}

function test(alg) {
    var mydataBuffer = Buffer.from(mydata, "utf8");
    // console.log(mydataBuffer.length);
    var encryptedData = doCipher(alg, mykey, mydataBuffer);
    // console.log(encryptedData.length);
    console.log(encryptedData.toString("base64"));

    var decryptedData = doDecipher(alg, mykey, encryptedData);
    // console.log(decryptedData.length);
    console.log(decryptedData.toString("utf8"));
}

test("des");
test("des3");
test("aes192");

// console.log(crypto.getCiphers());