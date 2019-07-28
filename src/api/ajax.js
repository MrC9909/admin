/*
* 封装AJAX请求的函数
* */

import {message} from 'antd';
import axios from 'axios';
import qs from 'qs';

//添加请求拦截器:让post请求的请求格式为urlencoded格式 name=gugui&age=100
//在真正在发请求执行
axios.interceptors.request.use(config=>{
    //得到请求方式和请求数据
    const {method,data} = config;
    //处理请求方式
    if (method.toLowerCase() === 'post' && typeof data === 'object'){
         config.data = qs.stringify(data);
    }
    return config;
});

//添加响应拦截器
    //让请求成功的结果不再是response，而不再是response.data值
//在请求返回之后且在我们指定的请求回调函数之前
axios.interceptors.response.use(response=>{
    return response.data;
},error => {
    message.error('请求出错' + error.message);
    return Promise.reject(error);
});

export default axios;