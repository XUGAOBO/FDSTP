//  此文件存放业务中的常量
export const API_BASE_URL = process.env.NODE_ENV === 'development' ? 'fdstp' : '/fdstp';
 // target: 'http://47.92.112.44:8080',
 export const SESSION_KEY = {
    OPERATOR: 'operator' // 操作员
 };

 export const COMMON_EUM = { // 通用字段
    ID: 'id', // 编号
    OPERATOR: 'operator',  // 操作字段
    CREATEDATE: 'createDate' // 创建时间
 }