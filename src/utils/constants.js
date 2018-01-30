//  此文件存放业务中的常量
export const API_BASE_URL = process.env.NODE_ENV === 'development' ? 'fdstp' : '/fdstp';
// target: 'http://47.92.112.44:8080',
export const SESSION_KEY = {
    OPERATOR: 'operator' // 操作员
};

export const COMMON_EUM = { // 通用字段
    ID: 'id', // 编号
    OPERATOR: 'operator', // 操作字段
    CREATEDATE: 'createDate' // 创建时间
}

export const EDITOR_TYPE = { // 编辑格式
    text: 'input', // 单行文本
    select: 'select', // 下拉框
    photo: 'photo', // 图片
    textArea: 'textArea', // 富文本
    showDate: 'showDate', // 时间选择框
    number: 'number' // 数量
}

// 初始时不执行mounted方法
export const NOT_INIT = ['truck', 'truckDepartCheckRecord', 'truckDepartCheckRecordDetail', 'truckDepartCheckRecordStatistic', 'truckDepartCheckRecordDetail', 'govermentcorpList', 'govermentMeeting', 'govermentTraining', 'meetingRecord', 'trainingRecord', 'letterRecord', 'weatherQuery'];
