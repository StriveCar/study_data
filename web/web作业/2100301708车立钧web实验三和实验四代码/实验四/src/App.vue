<template>
    <div>
        <Header/>
        <router-view></router-view>
        <Footer/>
    </div>
</template>

<script>
    import axios from 'axios'
    import Header from './components/Header'
    import Footer from './components/Footer'
    import "./static/bootstrap.css"//去除标签默认样式
    export default {
        name: "App",
        components:{Header,Footer}
    }
</script>
