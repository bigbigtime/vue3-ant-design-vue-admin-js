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

export function GetCode(data){
    return service.request({
        url: '/error/',
        method: 'post',
        data,
    })
}

/**
 * 帐户体系 - 登录
 */
export function AccountLogin(data){
    return service.request({
        url: process.env.VUE_APP_ACCOUNT_APIURL + 'http://account-test.web-jshtml.cn/login/',
        method: 'post',
        data,
    })
}

/**
 * 用户体系 - 登录
 */
export function UserList(data){
    return service.request({
        url: process.env.VUE_APP_USER_APIURL + '/list/',
        method: 'post',
        data,
    })
}



