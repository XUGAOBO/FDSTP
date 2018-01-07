<template>
  <article class="login">
    <section class="login-main">
      <h1>登录</h1>
      <section>
        <div class="login-input">
          <img src="../../assets/images/user.png"/>
          <input type="text" v-model="username" placeholder="请输入用户名"/>
        </div>
        <div class="login-input">
          <img src="../../assets/images/password.png"/>
          <input type="password" v-model="password" placeholder="请输入密码"/>
        </div>
      </section>
      <section  class="login-opt clearfix">
        <div class="login-opt-left">
          <a class="login-btn" @click="login">登录</a>
        </div>
        <div class="login-opt-right">
          <a @click="gotoRegister">马上注册</a>
          <!-- <a @click="() => {this.changepassword=true}">修改密码</a> -->
        </div>
      </section>
    </section>
  </article>
</template>
<script>
import cache from 'Utils/cache';
import {
    login as loginAPI
  } from '../../api/login';
import { getQueryString } from 'Utils/qs';
export default {
  data () {
    const username = cache.get('username')
    const password = cache.get('password')
    return {
      username: username,
      password: password
    };
  },
  methods: {
    check () {
      cache.set('username', this.username)
      cache.set('password', this.password)
    },
    login () {
      if (!this.username) {
        this.$message.error('请输入用户名')
        return;
      } else if (!this.password) {
        this.$message.error('请输入密码')
        return;
      }
      const param = `?username=${this.username}&password=${this.password}&mobileLogin=true`
      loginAPI(param).then(data => {
        if (data.id) {
          const qs = getQueryString();
          const callbackUrl = qs.callback || location.href.replace('login', '');
          location.href = callbackUrl;
        } else {
          this.$message.error(data.message)
        }
      });
    },
    gotoRegister () {
      this.$router.push('/register')
    }
  }
}
</script>
<style scoped>
  .login {
    width: 100%;
    height: 100%;
    background-color: rgba(34, 43, 56);
    position: relative;
  }
  .login-main {
    background-color: white;
    height: 346px;
    width: 460px;
    position: absolute;
    left: 50%;
    margin-left: -480px;
    top: 50%;
    margin-top: -173px;
    padding: 30px 50px;
  }
  .login-main h1 {
    font-size: 30px;
    margin-bottom: 30px;
    font-weight: 100;
  }
  .login-input {
    height: 31px;
    padding: 10px;
    position: relative;
    width: 430px;
    margin-bottom: 20px;
  }
  .login-input img{
    height: 31px;
    position: absolute;
    z-index: 10;
  }
  .login-input input {
    width: 100%;
    height: 100%;
    padding: 0;
    border: none;
    -webkit-tap-highlight-color: rgba(255, 0, 0, 0);
    font-weight: lighter;
    font-size: 20px;
    color: #066666;
    padding-left: 70px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 4;
    background-color: #ebeaf0;
    box-sizing: border-box;
    border: 1px #ebeaf0 solid;
    outline: none;
    -webkit-tap-highlight-color: transparent;
    transition: all 0.3s linear;
    -webkit-transition: all 0.3s linear;
  }
  .login-opt {
    margin-top: 27px;
  }
  .login-btn {
    width: 120px;
    font-size: 24px;
    display: inline-block;
    color: #ffffff;
    text-align: center;
    background-color: #3a97e5;
    transition: all 0.3s ease-in-out;
    -webkit-transition: all 0.3s ease-in-out;
    height: 52px;
    line-height: 52px;
    font-weight: lighter;
    position: relative;
    z-index: 4;
    cursor: pointer;
  }
  .login-opt-left {
    float: left;
  }
  .login-opt-right {
    float: right;
    margin-right: 30px;
    font-size: 15px;
    line-height: 52px;
    color: #4099e6;
    cursor: pointer;
  }
  .login-opt-right a {
    margin-left: 10px;
  }
</style>
