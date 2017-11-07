import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import routes from './route/router';
import 'Utils/adaptive';

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

[VueRouter].forEach(plugin => Vue.use(plugin));

const router = new VueRouter({
    // mode: 'history',
    routes
});

router.beforeEach((to, from, next) => {
    document.body.scrollTop = 0;
    next();
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
