<template>
    <div class="order">
        <Navigation/>
        <template v-loading="loading">
            <el-collapse v-for="(item,index) in orderList" accordion :key="index">
                <el-collapse-item :title="'订单号: '+item.id" :name="item.id" >
                    <el-descriptions :column="3" border>
                        <template v-for="i in item.orderDetail">
                            <el-descriptions-item>
                                <template slot="label">
                                    <i class="el-icon-goods"></i>商品名称
                                </template>
                                {{i.goodsName}}
                            </el-descriptions-item>

                            <el-descriptions-item>
                                <template slot="label">
                                    <i class="el-icon-s-order"></i>商品数量
                                </template>
                                {{i.nums[0]}}
                            </el-descriptions-item>

                            <el-descriptions-item>
                                <template slot="label">
                                    <i class="el-icon-present"></i>商品单价
                                </template>
                                {{i.nums[1]}}
                            </el-descriptions-item>
                        </template>

                        <el-descriptions-item> 
                            <template slot="label">
                                <i class="el-icon-tickets"></i>加入时间
                            </template>
                            {{item.orderTime}}
                        </el-descriptions-item>

                        <el-descriptions-item :contentStyle="{'text-align': 'center', 
                        'background': 'rgb(141, 164, 212)','color':'#fff'}">
                            <template slot="label">
                                <i class="el-icon-s-claim"></i>订单总价
                            </template>
                            {{item.allPrice}}
                        </el-descriptions-item>

                    </el-descriptions>
                </el-collapse-item>
            </el-collapse>
        </template>
    </div>
</template>

<script>
    import moment from 'moment'
    import { requestData } from "../http/api.js";
    import Navigation from "../components/Navigation.vue"
export default {
    name: 'Order',

    data() {
        return {
            orderList:[],
            loading:true
        };
    },
    components:{Navigation},
    beforeMount() {
        var userId=window.sessionStorage.getItem("token")
        requestData("/order/listByUser?",{
            userId
        }).then(res=>{
            this.orderList=res.data
            this.orderList.forEach(element => {            
                element.orderTime = moment(element.orderTime).utcOffset(8).format('YYYY.MM.DD HH:mm:ss')
                var allPrice=0
                element.orderDetail.forEach(item=>{
                    item.nums=item.nums.replace("dealPrice=","")
                    item.nums=item.nums.split(",")
                    allPrice+=parseInt(item.nums[0])*parseInt(item.nums[1])
                })
                element.allPrice=allPrice
            });
        }).catch((err) => {
        this.$message.error("获取订单数据失败")
        });
    },

    mounted(){
        this.loading=false
    }
};
</script>

<style lang="css" scoped>
.el-collapse{
    width: 1000px;
    margin: 0 auto;
}
.order{
    align-content: center;
}
.el-collapse-item{
    padding: 20px;
    background-color: #fff;
}
.el-descriptions_table{
    height: 300px;
}
.el-collapse-item{
    padding-bottom: 15px !important;
}
a{
    background-color: rgb(141, 164, 212);
}
</style>