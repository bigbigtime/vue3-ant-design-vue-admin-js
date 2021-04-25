import service from "@/utils/request.js";

/** 获取验证码 */
export function Send(data){
    return service.request({
        url: process.env.VUE_APP_APIURL + '/v1/send',
        method: 'post',
        data,
    })
}

/** 用户名检测 */
export function ChekcUsername(data){
    return service.request({
        url: process.env.VUE_APP_APIURL + '/v1/account/check',
        method: 'post',
        data,
    })
}


/** 用户注册 */
export function Register(data){
    return service.request({
        url: process.env.VUE_APP_APIURL + '/v1/account/register',
        method: 'post',
        data,
    })
}

