//  此文件存放接口请求
import http from 'Utils/request'

// 某个接口请求地址方法
export const login = (param) => {
    return http.post(`a/login${param}`);
}

export const register = (option) => {
    return http.post('/fdstp/user/register', option);
}

// 修改密码
export const modifyPwdRequest = (param) => {
    return http.get(`fdstp/user/modifyPwd${param}`)
}

// 退出登录
export const logoutRequest = (param) => {
    return http.get('a/logout');
}

// 地区级联选择
export const areaOpts = (param) => {
    return http.get('fdstp/user/area');
}