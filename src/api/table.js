//  此文件存放接口请求
import http from 'Utils/request';
import querystring from 'querystring';
const USER_MANAGE = 'userManage';
const OFFICAL_MANAGE = 'officalManage';
// 查询表格数据
export const tableSelect = (params) => {
    if (params.table === USER_MANAGE) {
        return http.get('fdstp/user/userManage')
    }
    if (params.table === OFFICAL_MANAGE) {
        return http.get('fdstp/user/authenticationList');
    }
    return http.post(`a/corp/base/selectTableContent?${querystring.encode(params)}`);
}

// 新增表格行记录
export const insertTableRow = (map, tableName) => {
    return http.post(`a/corp/base/insertTableRow/${tableName}`, map)
}

// 删除表格行记录
export const deleteTableRow = (id, tableName) => {
    return http.post(`a/corp/base/deleteTableRow/${tableName}?id=${id}`)
}

// 更新表格
export const updateTableRow = (map, tableName) => {
    if (tableName === USER_MANAGE) {
        return http.post('fdstp/user/changeUser', map)
    }
    return http.post(`a/corp/base/updateTableRow/${tableName}`, map)
}

// 图片上传(规则校验模块)
export const upload = (params) => {
    return http.post('a/corp/check/addCheckPoint', params)
}

// 获取车队列表
export const queryRacingTeam = () => {
    return http.post('a/corp/base/selectTableContent?table=motorcade');
}

// 下发车队
export const dispatch = (id, list) => {
    return http.post(`a/corp/training/sendWeatherNotice/${id}`, list);
}

// 查询签到表
export const querySign = (id) => {
    return http.get(`a/corp/base/linkDetailContent?id=${id}`);
}

// 查询责任状
export const queryletter = (id) => {
    return http.get(`a/corp/base/letterDetailContent?id=${id}`);
}