import service from "@/utils/request.js";


export function GetCode(data){
    return service.request({
        url: '/user',
        method: 'post',
        data,
    })
}




// post请求
// service.request({
//     url: '/user',
//     method: 'post', // default
//     data: {  // get 请求
//         ID: 12345
//     },
// })