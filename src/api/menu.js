import service from "@/utils/request.js";

/** 菜单新增 */
export function MenuCreate(data){
    return service.request({
        url: process.env.VUE_APP_APIURL_USER + '/v1/menu/create',
        method: 'post',
        data,
    })
}