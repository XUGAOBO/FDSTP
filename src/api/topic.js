//  此文件存放接口请求
import http from 'Utils/request'

// 获取题目
export const queryTopic = (id) => {
    return http.get(`a/corp/training/selectTrainingQuestions?trainingId=${id}`)
}

// 添加题目
export const addTopic = (id, params) => {
    return http.post(`a/corp/training/addTrainingQuestion?trainingtId=${id}`, params);
}