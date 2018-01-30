const path = require("path");
const RSACryptoLib = require("./RSACryptoLib");

const zhangsan_keyfile = path.join(__dirname, '../certs/zhangsan/zhangsan_key.pem');
const zhangsan_certfile = path.join(__dirname, '../certs/zhangsan/zhangsan_cert.pem');

const rsa = new RSACryptoLib(zhangsan_keyfile, zhangsan_certfile);

var data = `Also including: Linux Mint,Linux Mint Debian Edition (LMDE),elementaryOS,bash on Windows and others.Also including: Linux Mint,Linux Mint Debian Edition (LMDE),elementaryOS,bash on Windows and others.那么会对这个明文块进行补位`;

function EncryptAndDecrypt() {
  
  var enData = rsa.Encrypt(data)
  console.log(enData);

  var deData = rsa.Decrypt(enData);
  console.log(deData);
}

function SignAndVerify() {
  
  var signature = rsa.Sign(data);
  console.log(signature);

  var verified = rsa.Verify(data, signature);
  console.log(verified);
}

EncryptAndDecrypt();
SignAndVerify();

