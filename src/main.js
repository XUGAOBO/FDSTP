import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import routes from './route/router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'Utils/adaptive';
import cache from 'Utils/cache';

// 样式入口
import './styles/index';
import FastClick from 'fastclick';

if ('addEventListener' in document) {
  document.addEventListener(
    'DOMContentLoaded',
    function() {
      FastClick.attach(document.body);
    },
    false
  );
}

Vue.use(ElementUI);

[VueRouter].forEach(plugin => Vue.use(plugin));

const router = new VueRouter({
  // mode: 'history',
  routes
});

router.beforeEach((to, from, next) => {
  document.body.scrollTop = 0;
  next();
});

function setSize() {
  cache.session.set('width', document.body.clientWidth);
  cache.session.set('height', document.body.clientHeight);
}

setSize();

window.addEventListener('resize', function() {
  setSize();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
});
