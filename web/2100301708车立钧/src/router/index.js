import VueRouter from "vue-router"
import Login from "../pages/Login/Login.vue"
import Register from "../pages/Login/Register.vue"
import ShoppingCar from "../pages/ShoppingCar.vue"
import Commodity from "../pages/Commodity.vue"
import Order from "../pages/Order.vue"

const router = new VueRouter({
    mode:'hash',
    routes:[{
            path:'/',
            redirect:'/login'
        },
        {
            path:'/login',
            component:Login,
            meta:{
                title:"登录"
            }
        },
        {
            path:'/register',
            component:Register,
            meta:{
                title:"注册"
            }
        },
        {
            path:'/shoppingcar',
            component:ShoppingCar,
            meta:{
                title:"购物车"
            }
        },
        {
            path:'/commodity',
            component:Commodity,
            meta:{
                title:"商品列表"
            }
        },
        {
            path:'/order',
            component:Order,
            meta:{
                title:"订单列表"
            }
        }
    ]
})

router.beforeEach((to,from,next)=>{
    console.log(from);
    if(to.path==='/login') return next();
    const tokenStr=window.sessionStorage.getItem('token')
    if(!tokenStr) return next('/login')
    next()
  })

router.afterEach((to,from)=>{
    console.log(from);
    document.title = to.meta.title || "车立钧"
  })

export default router