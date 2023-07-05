import VueRouter from "vue-router"
import ShoppingCart from "../pages/ShoppingCart"

const router = new VueRouter({
    mode:'history',
    routes:[{
            path:'/',
            redirect:'/shoppingCart'
        },
        {
            path:'/shoppingCart',
            component:ShoppingCart,
            meta:{title:'物品'},
        }
    ]
})

export default router