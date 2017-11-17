const crypto = require('crypto');

//加密
exports.cipher = function (algorithm, key, message) {
    let encrypted = '';
    const cipher = crypto.createCipher(algorithm, key);
    encrypted += cipher.update(message, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

//解密
exports.decipher = function (algorithm, key, encryptedMessage) {
    let decrypted = '';
    const decipher = crypto.createDecipher(algorithm, key);
    decrypted += decipher.update(encryptedMessage, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;

}

