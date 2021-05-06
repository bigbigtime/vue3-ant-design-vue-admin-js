import CryptoJS from 'crypto-js';
/**
 * CryptoJS加密
 */
export function getAES(data){ //加密
    const key = CryptoJS.enc.Utf8.parse("12345678900000001234567890000000");
    const iv = CryptoJS.enc.Utf8.parse("1234567890000000");
    let encrypted = '';
    const srcs = CryptoJS.enc.Utf8.parse(data);
    encrypted = CryptoJS.AES.encrypt(srcs, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.ciphertext.toString();
}
/**
 * CryptoJS解密
 */
export function getDAes(data){//解密
    const key = CryptoJS.enc.Utf8.parse("12345678900000001234567890000000");
    const iv = CryptoJS.enc.Utf8.parse("1234567890000000");
    const encryptedHexStr = CryptoJS.enc.Hex.parse(data);
    const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    const decrypt = CryptoJS.AES.decrypt(srcs, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}
