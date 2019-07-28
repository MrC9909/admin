/*
* 包含应用中所有请求接口的函数：接口请求函数
* */

import ajax from './ajax';


//请求登陆
const BASE ='http://localhost:5888';

export function reqLogin(username,password) {
    return ajax({
        method:"POST",
        url:'/login',
        data:{//默认使用JOSN格式的请求体携带参数数据
            username,
            password
        }
    });
}
