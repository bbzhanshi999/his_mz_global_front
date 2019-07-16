import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'


Vue.config.productionTip = false

var app = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

/*配置axios的响应拦截器，用于判断项目是否登陆，如果没有登录，就弹窗提示”请先登录“，并且跳转到登录页面*/

app.axios.interceptors.response.use(res => res, err => {
    //处理错误请求
    if(err.response.status===403 && err.response.data==='access denied'){
        //如果状态码是403，内容是accessdeiend，我们就按照没有登录处理
        app.$alert('您没有登录权限，请重新登录！','警告',{
            callback:function(){
                //将路由跳转到登录页
                app.$router.push({path:'/'})
            }
        })
    }
});
