//  此文件存放接口请求
import http from 'Utils/request'

// 获取题目
export const queryTopic = (id) => {
    return http.get(`a/corp/training/selectTrainingQuestions?trainingId=${id}`)
}