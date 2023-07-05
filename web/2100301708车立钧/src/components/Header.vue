<template>
    <div>
        <div class="header">
            <div class="logo">
                <h1><img src="../static/pinyou.jpg" alt=""></h1>
            </div>
            <div class="buycar">购物车</div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
export default {
    name: 'Header',

    computed:{
        allcheck:{
            get()
            {
                return this.$store.state.allchecked
            },
            set(newvalue){
                console.log(newvalue);
            }  
        },
        ...mapGetters(['price']),
    },

    methods: {
        ChooiseAll(){
            var status=event.target.checked
            var id=-1
            this.$store.dispatch('AllChangeChooiseStatus',{status,id});
        }
    },
};
</script>

<style lang="css" scoped>
.tit{
    height: 70px;
}
.header{
    height: 82px;
    width: 1200px;
    margin: 20px 136px;
    margin-left: 150px;
    position: relative;
}
.logo img{
    margin-left: 0px;
}
.header .buycar {
    position: absolute;
    top: 35px;
    left: 250px;
    font-size: 19px;
    color: #333;
}
</style>