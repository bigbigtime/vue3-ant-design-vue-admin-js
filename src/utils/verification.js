/**
 * 手机号验证
 * @param {*} value 手机号
 */
export function checkPhone(value){
    let regPhong = /^1[3456789]\d{9}$/;
    return regPhong.test(value);
}

export function checkPassword(){
    
}