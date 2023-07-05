<template>
    <div class="navigation" >
        <el-menu :default-active="$route.path" router class="el-menu-demo" mode="horizontal">
            <el-menu-item index="/order"><el-avatar :src="heada_Image"></el-avatar></el-menu-item>
            <el-menu-item index="/login">退出登录</el-menu-item>
            <el-menu-item index="/commodity">商品列表</el-menu-item>
            <el-menu-item index="/shoppingcar">购物车</el-menu-item>
            <el-menu-item index="/order">全部订单</el-menu-item>
          </el-menu>
    </div>
</template>

<script>
    
import heada_Image from"../pages/Login/ikun1.0.jpg"
export default {
    name: 'Navigation',
    data() {
        return {
            heada_Image: heada_Image,
        };
    },
};
</script>

<style lang="css" scoped>
.navigation{
    width: 1200px;
    margin: 0 auto;
}
.el-menu{
    height: 68px;
    border-radius: 5px;
}
</style>