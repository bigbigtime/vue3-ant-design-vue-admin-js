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
