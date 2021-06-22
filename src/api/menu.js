import service from "@/utils/request.js";

/** 菜单新增 */
export function MenuCreate(data){
    return service.request({
        url: process.env.VUE_APP_APIURL_USER + '/v1/menu/create',
        method: 'post',
        data,
    })
}

/** 菜单列表 */
export function MenuList(data){
    return service.request({
        url: process.env.VUE_APP_APIURL_USER + '/v1/menu/listsTree',
        method: 'post',
        data,
    })
}

/** 菜单删除 */
export function MenuRemove(data){
    return service.request({
        url: process.env.VUE_APP_APIURL_USER + '/v1/menu/remove',
        method: 'post',
        data,
    })
}

/** 菜单详情 */
export function MenuInfo(data){
    return service.request({
        url: process.env.VUE_APP_APIURL_USER + '/v1/menu/detailed',
        method: 'post',
        data,
    })
}

/** 菜单编辑 */
export function MenuUpdate(data){
    return service.request({
        url: process.env.VUE_APP_APIURL_USER + '/v1/menu/update ',
        method: 'post',
        data,
    })
}

