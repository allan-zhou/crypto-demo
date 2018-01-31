const fs = require("fs");

exports.loadPemKey = function(filepath) {
    return fs.readFileSync(filepath).toString();  
}