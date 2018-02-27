/* eslint-disable no-unused-vars */
// 欢迎页
const Welcome = resolve => {
    require.ensure([], () => {
        resolve(require('../pages/welcome/index.vue'))
    }, 'welcome')
}

// 车队信息
const TeamInfo = resolve => {
    require.ensure([], () => {
        resolve(require('../pages/func/teamInfo/index.vue'))
    }, 'team-info')
}

// 车辆信息
const VehicleInfo = resolve => {
    require.ensure([], () => {
        resolve(require('../pages/func/vehicleInfo/index.vue'))
    }, 'vehicle-info')
}

// 培训资料管理
const TrainManage = resolve => {
    require.ensure([], () => {
        resolve(require('../pages/func/trainManage/index.vue'))
    }, 'train-manage')
}

// 会议资料管理
const MeetingManage = resolve => {
    require.ensure([], () => {
        resolve(require('../pages/func/meetingManage/index.vue'))
    }, 'meeting-manage')
}

// 恶劣天气通知
const WeatherNotice = resolve => {
    require.ensure([], () => {
        resolve(require('../pages/func/weatherNotice/index.vue'))
    }, 'weather-notice')
}

// 学习记录查询
const StudyQuery = resolve => {
    require.ensure([], () => {
        resolve(require('../pages/func/studyQuery/index.vue'))
    }, 'study-query')
}

// 检查规则维护
const RulesCheck = resolve => {
    require.ensure([], () => {
        resolve(require('../pages/func/rulesCheck/index.vue'))
    }, 'rules-check')
}

// 出车收车情况查询
const SituationQuery = resolve => {
    require.ensure([], () => {
        resolve(require('../pages/func/situationQuery/index.vue'))
    }, 'situation-query')
}

// 责任状维护
const OrderMaintain = resolve => {
    require.ensure([], () => {
        resolve(require('../pages/func/orderMaintain/index.vue'))
    }, 'order-maintain')
}

// 签订状况查询
const SignQuery = resolve => {
    require.ensure([], () => {
        resolve(require('../pages/func/signQuery/index.vue'))
    }, 'sign-query')
}

//恶劣天气通知查询

const WeatherQuery = resolve => {
    require.ensure([],() => {
        resolve(require('../pages/func/weatherQuery/index.vue'))
    }, 'weather-query')
}

const truckDepartCheckRecordStatistic = resolve => {
    require.ensure([],() => {
        resolve(require('../pages/func/truckDepart/index.vue'))
    }, 'truckcheck-query')
}
const truckcheckQueryDetail = resolve => {
    require.ensure([],() => {
        resolve(require('../pages/func/truckDepartDetail/index.vue'))
    }, 'truckcheck-queryDetail')
}

// 用户管理
const UserManage = resolve => {
    require.ensure([], () => {
        resolve(require('../pages/func/userManage/index.vue'))
    }, 'user-manage')
}

// 登录
const UserLogin = resolve => {
    require.ensure([], () => {
        resolve(require('../pages/login/index.vue'))
    }, 'login')
}

// 注册
const UserRegister = resolve => {
    require.ensure([], () => {
        resolve(require('../pages/register/index.vue'))
    }, 'register')
}

// 官方认证
const OfficalCertification = resolve => {
    require.ensure([], () => {
        resolve(require('../pages/func/officalCertification/index.vue'))
    }, 'offical-certification')
}

// 功能权限维护
const FuncMaintain = resolve => {
    require.ensure([], () => {
        resolve(require('../pages/func/funcMaintain/index.vue'))
    }, 'func-maintain')
}

// 登录日志查询
const LogQuery = resolve => {
    require.ensure([], () => {
        resolve(require('../pages/func/logQuery/index.vue'))
    }, 'log-query')
}

// 学习情况查询
const LearnQuery = resolve => {
    require.ensure([], () => {
        resolve(require('../pages/func/learnQuery/index.vue'))
    }, 'learn-query')
}

const govermentcorpList = resolve => {
    require.ensure([], () => {
        resolve(require('../pages/func/govermentcorpList/index.vue'))
    }, 'learn-query')
}
const govermentMeeting = resolve => {
    require.ensure([], () => {
        resolve(require('../pages/func/govermentMeeting/index.vue'))
    }, 'learn-query')
}
const govermentTraining = resolve => {
    require.ensure([], () => {
        resolve(require('../pages/func/govermentTraining/index.vue'))
    }, 'learn-query')
}

// 企业列表
const EnterpriseList = resolve => {
    require.ensure([], () => {
        resolve(require('../pages/func/enterpriseList/index.vue'))
    }, 'enterprise-list')
}

// 安全会议学习
const StudyQuerySave = resolve => {
    require.ensure([], () => {
        resolve(require('../pages/func/studyQuerySave/index.vue'))
    }, 'study-query-save')
}

const Index = resolve => {
    require.ensure([], () => {
        resolve(require('../pages/index/index.vue'))
    }, 'index')
}

const GovermentNotice = resolve => {
    require.ensure([], () => {
        resolve(require('../pages/header/notice.vue'))
    }, 'goverment-notice')
}

const routerList = [{
    title: '通知信息',
    routeName: 'goverment-notice',
    component: GovermentNotice
},{
    title: '首页',
    routeName: 'welcome',
    component: Welcome
},{
    title: '车队信息',
    routeName: 'team-info',
    component: TeamInfo
},{
    title: '车辆信息',
    routeName: 'vehicle-info',
    component: VehicleInfo
}, {
    title: '培训资料管理',
    routeName: 'train-manage',
    component: TrainManage
}, {
    title: '会议资料管理',
    routeName: 'meeting-manage',
    component: MeetingManage
}, {
    title: '恶劣天气通知',
    routeName: 'weather-notice',
    component: WeatherNotice
}, {
    title: '安全会议',
    routeName: 'study-query-save',
    component: StudyQuerySave
},{
    title: '教育培训',
    routeName: 'study-query',
    component: StudyQuery
}, {
    title: '检查规则维护',
    routeName: 'rules-check',
    component: RulesCheck
}, {
    title: '出车收车情况查询',
    routeName: 'situation-query',
    component: SituationQuery
}, {
    title: '责任状维护',
    routeName: 'order-maintain',
    component: OrderMaintain
}, {
    title: '签订状况查询',
    routeName: 'sign-query',
    component: SignQuery
}, {
    title: '恶劣天气',
    routeName: 'weather-query',
    component: WeatherQuery
}, {
    title: '车辆检查',
    routeName: 'truckcheck-query',
    component: truckDepartCheckRecordStatistic
}, {
    title: '出车记录',
    routeName: 'truckcheck-queryDetail',
    component: truckcheckQueryDetail
}, {
    title: '用户管理',
    routeName: 'user-manage',
    component: UserManage
}, {
    title: '官方认证',
    routeName: 'offical-certification',
    component: OfficalCertification
}, {
    title: '功能权限维护',
    routeName: 'func-maintain',
    component: FuncMaintain
}, {
    title: '登录日志查询',
    routeName: 'log-query',
    component: LogQuery
}, {
    title: '学习情况查询',
    routeName: 'learn-query',
    component: LearnQuery
}, {
    title: '企业列表',
    routeName: 'enterprise-list',
    component: EnterpriseList
}, {
    title: '政府企业列表',
    routeName: 'govermentcorpList',
    component: govermentcorpList
}, {
    title: '政府-安全会议',
    routeName: 'govermentMeeting',
    component: govermentMeeting
}, {
    title: '政府-教育培训',
    routeName: 'govermentTraining',
    component: govermentTraining
}];


function getRouter(data) {
    let tempData = [],
    children = [];
    children = data.map((item) => {
        return {
            name: item.routeName,
            meta: {
                title: item.title
            },
            path: `/${item.routeName}`,
            component: item.component
        }
    })
    tempData.unshift({
        name: 'index',
        meta: {
            title: 'index'
        },
        path: '/',
        component: Index,
        children: children
    })
    tempData.unshift({
        name: 'login',
        meta: {
            title: 'login'
        },
        path: '/login',
        component: UserLogin
    })
    tempData.unshift({
        name: 'register',
        meta: {
            title: 'index'
        },
        path: '/register',
        component: UserRegister
    })
    tempData.push({
        path: '*',
        redirect: '/'
    })
    return tempData
}

export default getRouter(routerList)
