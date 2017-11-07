//  此文件存放接口请求
import http from 'Utils/request'

// 某个接口请求地址方法
export const getOneAjaxFun = (journeyId) => {
    return http.get('journey/queryBaggageByJourneyId', {
        params: {
            journeyId
        }
    })
}
