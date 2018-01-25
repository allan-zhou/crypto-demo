var crypto = require('crypto');
var ed25519 = require('ed25519');

var myPassword = 'This is my password, you don`t guess it!';
var hash = crypto.createHash('sha256').update(myPassword).digest();
console.log(hash);
console.log(hash.toString('hex'));
console.log(hash.toString('hex').length);
var myKeypair = ed25519.MakeKeypair(hash);
console.log(myKeypair);

/* 
 * 给信息加密和签名
*/
var message = 'Hi node, I love you!';
message += 'Public key cryptography, or asymmetrical cryptography, is any cryptographic system that uses pairs of keys: public keys which may be disseminated widely, and private keys which are known only to the owner. This accomplishes two functions: authentication, which is when the public key is used to verify that a holder of the paired private key sent the message, and encryption, whereby only the holder of the paired private key can decrypt the message encrypted with the public key.'
var msgCiphered = cipher('aes192', myKeypair.publicKey, message); //公钥进行消息加密，如果是Natrium，这里就是私钥加密
console.log('========my ciphered message==========');
console.log(msgCiphered);
var signature = ed25519.Sign(new Buffer(msgCiphered, 'utf8'), myKeypair.privateKey); //私钥进行签名
console.log('========my signature==========');
console.log(signature);
console.log(signature.toString('hex'));
console.log(signature.length);

/* 
 * 验证并解密
*/
if (ed25519.Verify(new Buffer(msgCiphered, 'utf8'), signature, myKeypair.publicKey)) {
    // 验证函数返回了true，通过验证
    var msg = decipher('aes192', myKeypair.publicKey, msgCiphered);  //使用我的公钥解密

    console.log('========my deciphered message==========');
    console.log('签名合法，信息来自zhoujl！');
    console.log('zhoujl said: ', msg); //显示信息
} else {
    // 验证函数返回了false，肯定不是Bob的信息.
    console.log('签名不合法！');
}


//加密
function cipher(algorithm, key, buffer) {
    var encrypted = "";
    var cip = crypto.createCipher(algorithm, key);
    encrypted += cip.update(buffer, 'utf8', 'hex');
    encrypted += cip.final('hex');
    return encrypted;
}

//解密
function decipher(algorithm, key, encrypted) {
    var decrypted = "";
    var decipher = crypto.createDecipher(algorithm, key);
    decrypted += decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}