import http from 'Utils/request'

// 重置密码
export const resetPass = (userId) => {
    return http.get(`fdstp/user/resetPass?id=${userId}`)
}
