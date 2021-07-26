const init_data = {
    status: {
        0: false,
        1: true
    }
}

// josn key match
export function matchKey(field, value){
    // 获取初始化的数据
    const data = init_data[field];
    // 不存在时，返回false
    if(!data) { return false; }
    // 否则
    return data[value];
}

/**
 * 
 * @param { Object } data  响应报文数据
 * @param { Object } form  表单的key
 * @param { Object } match  表单的key
 */
export function requestDataFormat(params){
    const request_data = params.data;
    const keys = Object.keys(request_data);
    // form
    const formState = params.form;
    // 匹配字段赋值
    for(let key in formState) {
        if(keys.includes(key)) { // 匹配响应报文和表单字段
            if(params.match && params.match.includes(key)) { // 匹配是否转换数据的字段
                formState[key] = matchKey(key, request_data[key]);
            }else{
                formState[key] = request_data[key];
            }
        }
    }
}

