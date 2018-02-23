import http from 'Utils/request';

// 重置密码
export const resetPass = userId => {
  return http.get(`fdstp/user/resetPass?id=${userId}`);
};

// 官方认证状态
export const officalConfirmStatus = () => {
  return http.get('fdstp/user/isAuthentication');
};

// 官方认证
export const officalConfirm = params => {
  return http.post('fdstp/user/authentication', params, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

// 认证
export const authOffical = id => {
  return http.get(`fdstp/user/authenticationCheck?id=${id}`);
};

// 系统支持
export const systemSupport = () => {
    return http.get('a/corp/base/queryWelcomeContent');
}

// 获取权限列表
export const getAuth = () => {
    return http.get('fdstp/user/queryCurrentUser');
}

// 删除用户
export const deleteUser = (user) => {
    return http.get(`a/corp/base/deleteOperator?operator=${user}`)
}

// 查询通知列表
export const queryNoticeList = () => {
    return http.get('a/government/queryCorpNoticeList');
}

// 更改通知状态
export const changeNoticeStatus = (id) => {
    return http.get(`a/government/updateCorpNoticeReadRecord?id=${id}`)
}

// 查看更多
export const queryMoreNotice = () => {
    return http.get('a/corp/base/selectTableContent?table=queryCorpNoticeList');
}