const crypto = require('crypto');

let password = 'password';
let salt = '1234';

crypto.pbkdf2(password, salt, 100000, 50, 'sha256', (err, derivedKey) => {
  if (err) throw err;
  console.log(derivedKey.length);
  console.log(derivedKey.toString('hex'));
});
