# ECC 椭圆曲线密码学

椭圆曲线密码学:Elliptic Curve Cryptography，是利用椭圆曲线来实现的密码技术，与RSA相比，密钥可以更短，但强度更高。  
特别blockchain技术中，加密是重要的一环，比特币中便是使用了椭圆曲线密码技术，以太坊中也是使用的椭圆曲线DSA， 更为一般的HTTPS中使用的TLS也是基于椭圆曲线实现的密码交换。

## 加密算法

在椭圆曲线加密（ECC）中，利用了某种特殊形式的椭圆曲线，即定义在有限域上的椭圆曲线。其方程如下：
y²=x³+ax+b(mod p)

这里p是素数，a和b为两个小于p的非负整数，它们满足：  
4a³+27b²(mod p)≠0 其中，x,y,a,b ∈F(p)，则满足式（2）的点（x,y）和一个无穷点O就组成了椭圆曲线E。  

椭圆曲线离散对数问题ECDLP定义如下：给定素数p和椭圆曲线E，对 Q=kP,在已知P,Q的情况下求出小于p的正整数k。可以证明，已知k和P计算Q比较容易，而由Q和P计算k则比较困难，至今没有有效的方法来解决这个问题，这就是椭圆曲线加密算法原理之所在。

## 优点

公钥密码体制根据其所依据的难题一般分为三类：大整数分解问题类、离散对数问题类、椭圆曲线类。有时也把椭圆曲线类归为离散对数类。

- 安全性能更高 如160位ECC与1024位RSA、DSA有相同的安全强度。
- 计算量小，处理速度快 在私钥的处理速度上（解密和签名），ECC远 比RSA、DSA快得多。
- 存储空间占用小 ECC的密钥尺寸和系统参数与RSA、DSA相比要小得多， 所以占用的存储空间小得多。
- 带宽要求低使得ECC具有广泛的应用前景。

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

## openssl 生成ECC证书

```bash
# Generating an ECDSA Key
openssl ecparam -name prime256v1 -genkey -out ca.key
# Self-Signed Certificate
openssl req -new -x509 -key ca.key -out ca.crt -days 3600

# create server key and use ca's certificate sign server's certificate
openssl ecparam -name prime256v1 -genkey -out server.key
openssl req -new -sha256 -key server.key -out server.csr
openssl x509 -req -CA ca.crt -CAkey ca.key -CAcreateserial -in server.csr -out server.crt -extensions v3_req -extfile openssl.cnf

openssl ecparam -name prime256v1 -genkey -out client.key
openssl req -new -sha256 -key client.key -out client.csr
openssl x509 -req -CA ca.crt -CAkey ca.key -CAcreateserial -in server.csr -out client.crt -extensions v3_req -extfile openssl.cnf
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

- [wiki ECC](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography)
- [wiki.openssl.org ECC](https://wiki.openssl.org/index.php/Elliptic_Curve_Cryptography)
- [elliptic curve keys](http://davidederosa.com/basic-blockchain-programming/elliptic-curve-keys/)
- [wiki ASN.1](https://en.wikipedia.org/wiki/Abstract_Syntax_Notation_One)
- [wiki ECDSA](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm)
- [Secp256k1](https://en.bitcoin.it/wiki/Secp256k1)
- [sec2 v2](http://www.secg.org/sec2-v2.pdf)
- [IES (Integrated Encryption Scheme)](https://en.wikipedia.org/wiki/Integrated_Encryption_Scheme)
- [Elliptic Curve Private Key Structure (rfc5915)](https://tools.ietf.org/html/rfc5915)
- [X.509 Public Key Infrastructure Certificate(rfc5280)](https://tools.ietf.org/html/rfc5280)
- [Elliptic Curve Cryptography Subject Public Key Information(rfc5480)](https://tools.ietf.org/html/rfc5480)
- [Use of ECC Algorithms in Cryptographic Message Syntax (CMS)](https://tools.ietf.org/html/rfc5753)
- [creating ssl certificates](https://zonena.me/2016/02/creating-ssl-certificates-in-3-easy-steps/)
- [x690 DER](https://en.wikipedia.org/wiki/X.690#DER_encoding)
- [Algorithms and Identifiers for the X.509](https://tools.ietf.org/html/rfc3279)
- [有限域 galois field](https://baike.baidu.com/item/%E6%9C%89%E9%99%90%E5%9F%9F)
- [离散对数](https://baike.baidu.com/item/%E7%A6%BB%E6%95%A3%E5%AF%B9%E6%95%B0)
- http://www.heguangnan.com/post/understanding_ecc/
- https://www.jianshu.com/p/2e6031ac3d50
- https://www.chinassl.net/ecc/n641.html
