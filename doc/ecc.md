# ECC 椭圆曲线密码学

椭圆曲线密码学:Elliptic Curve Cryptography，是利用椭圆曲线来实现的密码技术，与RSA相比，密钥可以更短，但强度更高。  
特别blockchain技术中，加密是重要的一环，比特币中便是使用了椭圆曲线密码技术，以太坊中也是使用的椭圆曲线DSA， 更为一般的HTTPS中使用的TLS也是基于椭圆曲线实现的密码交换。

- 与RSA相比，密钥可以更短，但强度更高。RSA是利用了大数质数分解难题。

## DH（Diffie-Hellman）

共享密钥就会有密钥配送问题，Diffie-Hellman是解决这一问题的重要算法。

## 椭圆曲线难题

K=kG，其中K,G为Ep（a,b）上的点，k为小于n的整数，n是点G的阶，给定k和G，计算K容易，但是给定K和G，求k就很难了！因此，设K为公钥，k为私钥，G为基点。

## 加密过程

A选定一条椭圆曲线Ep（a,b），并取曲线上一点作为基点G  
A选择一个私钥k，并生成公钥K=kG  
A将Ep（a,b）和k，G发送给B  
B收到后将明文编码到Ep（a,b）上一点M，并产生一个随机数r  
B计算点C1=M+rK，C2=rG B将C1，C2传给A  
A计算C1-kC2=M+rkG-krG=M A对M解码得到明文  
攻击者只能得到Ep（a,b），G，K，C1，C2，没有k就无法得到M。

## 签名验签流程

A选定一条椭圆曲线Ep（a，b），并取曲线上一点作为基点G  
A选择一个私钥k，并生成公钥K=kG  
A产生一个随机数r，计算R(x,y)=rG  
A计算Hash=SHA(M)，M‘=M(modp)  
A计算S=（Hash+M'k）/r(modp)  
B获得S和M'，Ep(a,b)，K，R(x,y)  
B计算Hash=SHA(M)，M'=M(modp)  
B计算R'=（Hash*G+M'*K）/S=(Hash*G+M'*kG)*r/(Hash+M'k)=rG=R（x,y），若R'=R，则验签成功。  
以上加解密和签名验签流程只是一个例子，具体应用时可以利用K=kG这一特性变幻出多种加解密方式。

## OpenSSL 生成ECC公钥私钥

```bash
# gen private key
openssl ecparam -name secp256k1 -genkey -out ec-priv.pem
# view private key
openssl ec -in ec-priv.pem -text -noout

# gen public key
openssl ec -in ec-priv.pem -pubout -out ec-pub.pem
# view public key
openssl ec -in ec-pub.pem -pubin -text -noout
```

## bitcoin elliptic curve keys

- private key: 32 bytes
- public key: 64 bytes(uncompressed form) or 32 bytes(compressed form), 1 byte prefix
- elliptic curve: [secp256k1](https://en.bitcoin.it/wiki/Secp256k1)
- [modular arithmetic](https://en.wikipedia.org/wiki/Modular_arithmetic): the EC crypto is based on

## 术语

- PKCS: 公钥密码学标准（Public Key Cryptography Standards, 缩写为 PKCS）
- ECC: 椭圆曲线密码学（Elliptic curve cryptography，缩写为 ECC），一种建立公开密钥加密的算法，基于椭圆曲线数学。
- ECDH: 椭圆曲线密钥交换算法（Elliptic Curve Diffie–Hellman key Exchange，缩写为ECDH），椭圆曲线迪菲-赫尔曼秘钥交换
- ECDSA: 椭圆曲线数字签名算法（Elliptic Curve Digital Signature Algorithm，缩写为ECDSA）
- ASN.1: 抽象语法标记（Abstract Syntax Notation.One， 缩写为 ASN.1)，是一个接口描述语言定义的数据结构,可以用标准的、跨平台的方式被序列化和反序列化,。它广泛应用于电信和计算机网络,特别是在密码学。
- X.509: 在密码学中,X.509是一个标准,定义了公钥证书的格式。X.509由ITU-T（国际电信联盟的标准化部门）定义，基于另一个ITU-T标准ASN.1。

## reference

- [elliptic curve keys](http://davidederosa.com/basic-blockchain-programming/elliptic-curve-keys/)
- [wiki ASN.1](https://en.wikipedia.org/wiki/Abstract_Syntax_Notation_One)
- [wiki ECDSA](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm)
- [Secp256k1](https://en.bitcoin.it/wiki/Secp256k1)
- [sec2 v2](http://www.secg.org/sec2-v2.pdf)
- [IES (Integrated Encryption Scheme)](https://en.wikipedia.org/wiki/Integrated_Encryption_Scheme)
- [rfc5915](https://tools.ietf.org/html/rfc5915)
- [asn1 oids](http://www.umich.edu/~x509/ssleay/asn1-oids.html)
- http://www.heguangnan.com/post/understanding_ecc/
- https://www.jianshu.com/p/2e6031ac3d50
- http://blog.csdn.net/sqzhao/article/details/49124169
- https://www.chinassl.net/ecc/n641.html