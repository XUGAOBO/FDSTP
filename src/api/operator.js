//  此文件存放接口请求
import http from 'Utils/request'

// 查询公司操作员
export const queryOperator = () => {
    return http.get('a/corp/base/queryOperator');
}

// 新增公司操作员
export const insertOperator = (operator) => {
    return http.post('a/corp/base/saveOperator', {operator: operator})
}