//  此文件存放接口请求
import http from 'Utils/request'

// 查询表格数据
export const tableSelect = (params) => {
    return http.post(`a/corp/base/selectTableContent?table=${params}`)
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
    return http.post(`a/corp/base/updateTableRow/${tableName}`, map)
}

// 图片上传(规则校验模块)
export const upload = (params) => {
    return http.post('a/corp/check/addCheckPoint', params)
}