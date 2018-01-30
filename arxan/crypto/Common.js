const fs = require("fs");

exports.loadPemKey = function(filepath) {
    var pem = fs.readFileSync(filepath);
    return pem.toString();
}