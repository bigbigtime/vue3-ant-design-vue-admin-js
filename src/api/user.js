import service from "@/utils/request.js";

/** 用户新增 */
export function UserCreate(data){
    return service.request({
        url: process.env.VUE_APP_APIURL_USER + '/v1/user/create',
        method: 'post',
        data,
    })
}

/** 用户列表 */
export function UserList(data){
    return service.request({
        url: process.env.VUE_APP_APIURL_USER + '/v1/user/lists',
        method: 'post',
        data,
    })
}

/** 用户删除 */
export function UserRemove(data){
    return service.request({
        url: process.env.VUE_APP_APIURL_USER + '/v1/user/remove',
        method: 'post',
        data,
    })
}

/** 用户状态 */
export function UserStatus(data){
    return service.request({
        url: process.env.VUE_APP_APIURL_USER + '/v1/user/status',
        method: 'post',
        data,
    })
}


/** 用户详情 */
export function UserInfo(data){
    return service.request({
        url: process.env.VUE_APP_APIURL_USER + '/v1/user/info',
        method: 'post',
        data,
    })
}

/** 用户编辑 */
export function UserUpdate(data){
    return service.request({
        url: process.env.VUE_APP_APIURL_USER + '/v1/user/update ',
        method: 'post',
        data,
    })
}

