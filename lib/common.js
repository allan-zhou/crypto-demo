const fs = require("fs");

exports.loadPemKey = function(filepath) {
    return fs.readFileSync(filepath).toString();  
}

/* Parse a public key buffer, split X and Y */
exports.parsePublicKeyBuffer = function(curve, buffer) {
    var bytes = lengths[curve];
    if (buffer[0] == 4) {
      if (buffer.length != ((bytes * 2) + 1)) throw new TypeError('Invalid uncompressed key size');
      return {
        c: curve,
        x: buffer.slice(1, bytes + 1),
        y: buffer.slice(bytes + 1),
      }
    } else {
      throw new TypeError("Compressed key unsupported");
    }
  }