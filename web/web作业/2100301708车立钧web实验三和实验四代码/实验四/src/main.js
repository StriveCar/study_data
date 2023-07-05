import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import store from './store/shopping.js'

import './mock/index.js'//商品数据
Vue.use(VueRouter)
Vue.config.productionTip=false
new Vue({
    el:'#app',
    render:h=>h(App),
    router,
    store,
})