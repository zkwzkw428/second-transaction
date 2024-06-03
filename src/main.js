// 引入Vue
import Vue from 'vue';
// 引入App组件
import App from './App.vue';
// 引入Router
import router from './router';
// 引入ElementUI组件库
import ElementUI from 'element-ui';
// 引入Jquery
import $ from 'jquery'
// 引入element所有组件的样式
import 'element-ui/lib/theme-chalk/index.css';
// 引入babel转换的一些扩展
import 'babel-polyfill';
// 引入所有api请求接口
import api from './api/index.js';
// 将所有请求注入到Vue原型
Vue.prototype.$api = api;
// 保存登录用户信息
let globalData={
    userInfo:{
        // 用户信息
        nickname:''
    }
};
let sta={
    // 是否登录
    isLogin:false,
    // 管理员信息
    adminName:''
};
Vue.prototype.$sta = sta;

Vue.prototype.$globalData=globalData;

Vue.config.productionTip = false;

Vue.use(ElementUI, {
    size: 'medium'
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title}`;
    const nickname = Vue.prototype.$globalData.userInfo.nickname;
    console.log(nickname);
    if (!nickname
        &&(to.path === '/me'
        || to.path === '/message'
        || to.path === '/release'
        || to.path === '/order')) {
        api.getUserInfo().then(res=>{
           console.log('getUserInfo:',res);
           if(res.status_code!==1){
               next('/login');
           }else {
               res.data.signInTime=res.data.signInTime.substring(0,10);
               Vue.prototype.$globalData.userInfo=res.data;
               next();
           }
        }).catch(e=>{
            next('/login');
        });

    }else{
        next();
    }
});

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
