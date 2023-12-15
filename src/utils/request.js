import { ElMessage } from 'element-plus'
import router from '../router'
import config from "/configs.js";
import axios from "axios";
import { useUserStore } from "@/stores/user";

const request = axios.create({
    baseURL: `http://${config.serverUrl}`,
    timeout: 5000  // 后台接口超时时间设置
})

// request 拦截器
request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
    return config
}, error => {
    return Promise.reject(error)
});

// response 拦截器
// 可以在接口响应后统一处理结果，对请求进行拦截
request.interceptors.response.use(
    response => {
        let res = response.data;
        // 如果是返回的文件
        if (response.config.responseType === 'blob') {
            return res
        }
        // 兼容服务端返回的字符串数据
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }
        return res;
    },
    error => {
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)
export default request
