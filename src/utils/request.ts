import axios from "axios";
import { type AxiosInstance } from 'axios'
import { ElMessage } from "element-plus";

const request: AxiosInstance = axios.create({
    // 基础 url，复制 easymock 创建的服务接口基础路径，发送每个接口，都会带上这个 url
    // baseURL: 'https://mock.mengxuegu.com/mock/65dabf3b351bbd02cf339fc8/mxg-vue3-elementplus',
    // baseURL: '/dev-api',
    baseURL: import.meta.env.VITE_APP_BASE_API as string,
    timeout: 20000
})


/**
 * 请求拦截器
 */
request.interceptors.request.use(config => {
    // 发送请求前在请求头加上token令牌
    return config
}, error => {
    // 出现异常，则捕获处理（下面是交给调用处的catch
    return Promise.reject(error)
})

/**
 * 响应拦截器
 */
request.interceptors.response.use(response => {
    const { data } = response
    // 正常响应给调用方
    if (data.code === 20000) {
        return data
    }
    // 非正常弹出错误信息
    ElMessage.error(data.message)
    return Promise.reject(response) // 这样写 目的是为了进入 调用方catch部分

}, error => {
    const { message, response } = error
    if (message.indexOf('timeout') != -1) {
        ElMessage.error('网络超时！')
    } else if (message == 'Network Error') {
        ElMessage.error('网络连接错误！')
    } else {
        if (response.data) ElMessage.error(response.statusText);
        else ElMessage.error('接口路径找不到')
    }
    // 出现异常，则捕获处理（下面是交给调用处的catch）
    return Promise.reject(error)
})

export default request // 导出 axios 实例

