<template>
    <div id="app">
        <keep-alive include="Commodity">
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
    export default {
        name: "App",
    }
</script>

<style>
body{
    background: #E3E4E5;  
}
#app{
    background: #E3E4E5;  
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */
    overflow-x: hidden;
    overflow-y: auto;
}
</style>