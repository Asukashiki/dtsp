/**
 * RSA 加密工具
 * 用于前端加密密码后发送给后端
 */
import JSEncrypt from 'jsencrypt'

// RSA 公钥（需要与后端 rsa.private-key 配对）
// 此公钥需要从后端配置或接口获取
const PUBLIC_KEY = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCr+Ym8XMc+4kHUpLstH1JjJB5nk92PNDPckoKnEVj7lLv4HYemwlF6go62eoeXnK6Yl0tWlrEP9YeCszx0heKBsj6w6uYg7gUE14pa2wXzAipi/m/YsFacPlKZDB8COVQu3v2NVfq42pDm3Ofe6sYs+3YJ5cHsyDFl52XrXEMktwIDAQAB`

/**
 * RSA 加密
 * @param {string} text - 要加密的文本
 * @returns {string} - 加密后的 Base64 字符串
 */
export function rsaEncrypt(text) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(PUBLIC_KEY)
  return encryptor.encrypt(text) || ''
}

/**
 * 获取公钥
 * @returns {string} - 公钥字符串
 */
export function getPublicKey() {
  return PUBLIC_KEY
}
