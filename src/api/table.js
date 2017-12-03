//  此文件存放接口请求
import http from 'Utils/request'

// 查询表格数据
export const tableSelect = (params) => {
    return http.post(`a/corp/base/selectTableContent?table=${params}`)
}

// 删除表格行记录
export const deleteTableRow = (id, tableName) => {
    return http.post(`/a/corp/base/deleteTableRow/${tableName}?id=${id}`)
}
