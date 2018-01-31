# RSA

跟DES，AES一样，RSA也是一个块加密算法（ block cipher algorithm），总是在一个固定长度的块上进行操作。  
但跟AES等不同的是，block length是跟key length有关的。  
每次RSA加密的明文的长度是受RSA填充模式限制的，但是RSA每次加密的块长度就是key length。

## PKCS

The Public-Key Cryptography Standards (PKCS)是由美国RSA数据安全公司及其合作伙伴制定的一组公钥密码学标准，其中包括证书申请、证书更新、证书作废表发布、扩展证书内容以及数字签名、数字信封的格式等方面的一系列相关协议

PKCS#1：定义RSA公开密钥算法加密和签名机制，主要用于组织PKCS#7中所描述的数字签名和数字信封[22]。

PKCS#7：定义一种通用的消息语法，包括数字签名和加密等用于增强的加密机制，PKCS#7与PEM兼容，所以不需其他密码操作，就可以将加密的消息转换成PEM消息[26]。

## RSA_PKCS1_PADDING

- RSA_PKCS1_PADDING 填充模式，最常用的模式

要求:  
输入：必须 比 RSA 钥模长(modulus) 短至少11个字节, 也就是　RSA_size(rsa) – 11  
如果输入的明文过长，必须切割，然后填充  
输出：和modulus一样长

根据这个要求，对于512bit的密钥，　block length = 512/8 – 11 = 53 字节

- RSA_PKCS1_OAEP_PADDING

输入：RSA_size(rsa) – 41  
输出：和modulus一样长

- RSA_NO_PADDING　不填充

输入：可以和RSA钥模长一样长，如果输入的明文过长，必须切割，　然后填充  
输出：和modulus一样长

需要注意：  
在BouncyCastle实现RSA的PKCS1V1.5模式中，如果是公钥加密信息（forEncryption=true)，密钥长度为1024位，那么输出的密文块长度为128个字节，输入的明文块长度为127-10,即输入的明文块最大是117位，如果输入的明文块小于117位，比如输入的明文块长度为64位，那么会对这个明文块进行补位，在明文块前添加一位的0x02字节（代表公钥加密）然后后面的52位为随机的字节，在补位的最后一位，{即52（117-64-1），从零开始的},添加一位的字节0x00,在补位的后面添加实际的明文块。

这样做的目的就是使得明文块转化成与module差不多的大整数。

## reference

- [PKCS](https://baike.baidu.com/item/PKCS/1042350)
- [RSA_PKCS1_PADDING](https://www.douban.com/note/338531480/)
