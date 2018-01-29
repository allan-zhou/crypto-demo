# 证书

## OpenSSL生成公钥私钥

```shell
# 生成 RSA 私钥
openssl genrsa -out ./zhangsan/zhangsan_key.pem 2048

# 生成 RSA 公钥
openssl rsa -in ./zhangsan/zhangsan_key.pem -pubout -out ./zhangsan/zhangsan_cert.pem

openssl req -new -x509 -key ./zhangsan/zhangsan_key.pem -out ./zhangsan/zhangsan_cert.pem
```


# 生成数字证书
[IBM知识库-数字证书](https://www.ibm.com/support/knowledgecenter/zh/SSBLQQ_9.1.0/com.ibm.rational.test.lt.doc/topics/ccertcreate.html)

在密码术中，公用密钥证书是使用数字签名将公用密钥与物理身份绑定在一起的文档。 这些证书通常称为**数字证书**或**客户机数字证书**。数字证书最常用的标准为 X.509 标准。

在公用密钥密码术中，每个证书都有两个关联的密钥：公用密钥和专用密钥。公用密钥合并到 X.509 证书中，并且始终随证书本身一起提供。专用密钥始终由私人保管（这意味着它从不进行传输）。为了便于移植，这两个密钥（和证书）可包含在一个已加密并受口令保护的格式中，该格式称为 PKCS#12。

为了验证证书的真实性，它由另一个证书（称为认证中心 (CA)）进行数字签名。 该 CA 证书可以是由托管安全应用程序的公司创建（并确保安全）的证书，或者可由某个公司（例如 Verision）创建。
当 Web 应用程序需要数字证书时，管理员通常为每个授权用户创建数字证书。管理员使用系统 CA 证书以数字方式签署每个证书。这些证书以及公用密钥和专用密钥都将分发给用户。通常，这些密钥将以 PKCS#12 格式进行分发。然后，用户将这些证书导入到其 Web 浏览器中。当服务器质询浏览器时，浏览器将生成其证书。
为 Web 应用程序导入证书时，选择指示密钥应当可导出的复选框。通过该指示，可将证书导出为 PKCS#12 格式的文件，以便将来由其他程序使用。
请勿将分配给实际用户的证书用于执行性能测试。请使用不对应于实际用户的测试证书。

有四种类型的证书可在测试中使用：
自签名证书
签名证书
认证中心 (CA) 证书
未签名证书（很少使用）

当不需要任何实体为证书的真实性进行担保时，将使用自签名证书。这些是可创建和使用的最简单证书。但是，通常会使用签名证书来代表特定用户。
当需要为恰好一个用户创建证书并向其发放该证书时，将使用签名证书。签名证书由认证中心 (CA) 签署。

认证中心 (CA) 证书是用于签署（认证）证书的自签名证书。未签名证书是既未由 CA 签署也不是自签署的证书。大多数 Web 应用程序都不使用未签名证书。

创建自签名或签名证书（包括 CA 证书）时，可指定**主题**。
证书的主题是证书中编码的 X.500 专有名称的属性集合。该主题使证书的接收方能够查看关于证书所有者的信息。 主题描述了证书所有者，但不一定是唯一的。可将主题视为电话簿中的条目；

## 生成CA证书
openssl genrsa -out ca/ca-key.pem 2048

openssl req -new -key ca/ca-key.pem -out ca/ca-csr.pem 

openssl x509 -req -in ca/ca-csr.pem -signkey ca/ca-key.pem -out ca/ca-cert.pem
> subject=/C=cn/ST=beijing/L=beijing/O=17shanyuan/OU=devp/CN=root/emailAddress=root@17shanyuan.com

## 生成server证书
openssl genrsa -out server/server-key.pem 2048

openssl req -new -key server/server-key.pem -config server/openssl.cnf -out server/server-csr.pem

openssl x509 -req -CA ca/ca-cert.pem -CAkey ca/ca-key.pem -CAcreateserial -in server/server-csr.pem -out server-cert.pem -extensions v3_req -extfile server/openssl.cnf
- -extensions——按照openssl.cnf文件中配置的v3_ca项添加扩展

openssl pkcs12 -export -in server/server-cert.pem -inkey server/server-key.pem -certfile ca/ca-cert.pem -out server/server.pfx

## 生成client证书
openssl genrsa -out client/client-key.pem 2048

openssl req -new -key client/client-key.pem -out client/client-csr.pem

openssl x509 -req -CA ca/ca-cert.pem -CAkey ca/ca-key.pem -CAcreateserial -in client/client-csr.pem -out client/client-cert.pem
> subject=/C=cn/ST=beijing/L=beijing/O=17shanyuan.com/OU=devp/CN=client/emailAddress=client@17shanyuan.com

# 证书文件后缀名
证书文件（.crt .cer）
私钥文件（.key）
证书请求文件（.csr）
有时候，统一使用.pem后缀


# 参考链接
- [cnNode](http://cnodejs.org/topic/54745ac22804a0997d38b32d)
- [IBM知识库-数字证书](https://www.ibm.com/support/knowledgecenter/zh/SSBLQQ_9.1.0/com.ibm.rational.test.lt.doc/topics/ccertcreate.html)
- [http://blog.csdn.net/oldmtn/article/details/52208747](http://blog.csdn.net/oldmtn/article/details/52208747)