<template>
    <div class="settle-account">
        <div class="fot-1">
            <div class="kkx">
                <!-- <el-checkbox v-model="checked"></el-checkbox> -->
                <el-button type="dangetr" @click="DeleteChooise">删除选中商品</el-button>
                <el-button type="dangetr" @click="DeleteAll">清空购物车</el-button>
            </div>
        </div>
        <div class="fot-2">
            <div>已选择<span class="total-amount" style="color: red; font-size: 16px;padding: 0 5px;">{{chooiseLength}}</span>件商品
                总价：
            </div>
            <div>
                <span class="account-price">{{allPrice+'.00'}}</span>
            </div>
            <div class="skip">
                <span @click="FsetOrder" href="" style="font-size: 22px; color: white;">生成订单</span>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
export default {
    name: 'Footer',
    data() {
        return {
            checked:false,
        };
    },
    methods: {
        DeleteChooise(){
            this.allDelete('delete')
        },
        DeleteAll(){
            this.allDelete('all')
        },
        FsetOrder(){
            this.setOrder()
        }
    },    
    props:{
        chooiseLength:{
            type:Number,
            default:0
        },
        allPrice:{
            type:Number,
            default:0
        },
        allDelete:{
            type: Function,
        },
        setOrder:{
            type: Function,
        }
    }
};
</script>

<style lang="css" scoped>
a{
    text-decoration: none;
    color: black;
}
.settle-account {
    width: 1200px;
    height: 70px;
    display: flex;
    justify-content: space-between;
    border: 1px solid #cfcfcf;
    box-sizing: border-box;
    padding: 20px 0;
    margin: 30px 0px 160px 0px;
    margin-left: 145px;
    background-color: #fff;
}
.fot-1,.fot-2{
    display: flex;
}
.kkx{
    width: 320px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}
.account-price {
    font-size: 20px;
    font-weight: 600;
    color: red;
}
.settle-account .skip {
    width: 120px;
    height: 70px;
    margin-left: 20px;
    background-color: #c60000;
    color: white;
    position: relative;
    top: -20px;
    font-size: 20px;
    text-align: center;
    line-height: 70px;
    cursor: pointer;
}
.shopC{
    background-color: #ffff;
}
</style>