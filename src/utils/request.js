/**
 * http配置
 */
import axios from 'axios'
import {
    API_BASE_URL
} from 'Utils/constants'


// 超时时间
axios.defaults.timeout = 5 * 60 * 1000;
axios.defaults.baseURL = API_BASE_URL;
// 请求携带cookie
axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// http请求拦截器
//添加时间戳 防止缓存
axios.interceptors.request.use(function (config) {
    if (config.method.toLowerCase() === 'get') {
        const url = config.url
        const t = new Date().getTime()
        config.url = `${url}${url.indexOf('?') === -1 ? '?' : '&'}t=${t}`

    }
    console.log('axios config: ', config)
    return config
}, function (error) {
    return Promise.reject(error);
});

//统一处理结果
axios.interceptors.response.use(function (response) {
    const data = response.data;
    return data;
}, function (error) {
    console.log('axios error', error)
    // TODO 跳转到报错页
    return Promise.reject(error);
});

export {
    axios as http
}
export default axios
