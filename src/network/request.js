// 导入axios
import axios from 'axios'

export function request(config){
    // 创建axios实例
    const intstance = axios.create({
        baseURL:'http://106.54.54.237:8000/api/hy',
        // baseURL:'http://123.207.32.32:8000/api/hy',
        timeout:5000   
    })
    // 请求拦截
    intstance.interceptors.request.use(config=>{
        // console.log(config);
        return config
    },err=>{
        console.log(err);
        
    })

    // 响应拦截
    intstance.interceptors.response.use(res=>{
        // console.log(res);
        return res
    },err=>{
        console.log(err);
        
    })

    return intstance(config)   
}