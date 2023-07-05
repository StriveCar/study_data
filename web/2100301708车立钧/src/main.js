import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
Vue.use(ElementUI)
import "./static/iconfont.css"
import "./static/index.css"//elementui自定义主题

import VueRouter from 'vue-router'
import router from './router'
import VueResource from 'vue-resource'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.config.productionTip=false
new Vue({
    el:'#app',
    render:h=>h(App),
    router,
})