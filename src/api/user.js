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
