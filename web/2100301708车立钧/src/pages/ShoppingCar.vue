<template>
  <div>
    <Navigation/>
    <Header/>
    <el-table v-loading="loading"
              ref="elTable" border stripe
              :data="shoppingList"
              style="width: 80%;margin: auto;"
              @selection-change="ChooiseStatus"
              >  

      <el-table-column align="center"
        label="全选" type="selection"
        width="60">
      </el-table-column>

      <el-table-column label="图片" width="160" align="center">
        <template slot="header">
          <i class="el-icon-picture-outline"></i>图片
        </template> 
        <template slot-scope="scope">
            <el-image slot="reference" 
              style="width: 100px;" 
              :preview-src-list="[scope.row.thumbnail]"
              :src="scope.row.thumbnail"
              />
        </template>
      </el-table-column>

      <el-table-column label="商品名称" prop="title">
        <template slot-scope="scope">
          <div>{{scope.row.name}}</div>
        </template>
      </el-table-column>

      <el-table-column label="单价" 
        sortable prop="price" width="100" 
        header-align="center" align="center">
          <template slot-scope="scope">
            <div>￥{{ scope.row.price }}</div>
          </template>
      </el-table-column>

      <el-table-column label="数量" 
        sortable prop="title" 
        header-align="center" align="center">
          <template slot-scope="scope">
              <el-input-number
                v-model.number="scope.row.num"
                :min="1"
                :max="10"
                size="small"
                @blur="Numnull($event,scope.$index)">
              </el-input-number>
          </template>
      </el-table-column>

      <el-table-column label="小计" 
        header-align="center" align="center" 
        width="120">
          <template slot-scope="scope">
            <div>￥{{scope.row.price * scope.row.num}}</div>
          </template>
      </el-table-column>

      <el-table-column
        fixed="right" label="操作"
        width="100" header-align="center" 
        align="center">
          <template slot-scope="scope">
            <el-button type="dangetr" @click.native.prevent="deletegoods(scope.$index,shoppingList)" size="small">删除</el-button>
          </template>
      </el-table-column>
    </el-table>

    <Footer 
    :chooiseLength="chooiseLength" 
    :allPrice="allPrice" 
    :allDelete="allDelete" 
    :setOrder="setOrder"/>

  </div>
</template>

<script>
    
    import Header from "../components/Header.vue"
    import Footer from "../components/Footer.vue"
    import Navigation from "../components/Navigation.vue"
    import { requestData } from "../http/api.js";
    var token = window.sessionStorage.getItem('token')
    // import pubsub from 'pubsub-js'
    var token = window.sessionStorage.getItem("token")
    // pubsub.subscribe('token',(name,value)=>{token = value})
export default {
    name: 'ShoppingCar',
    data() {
        return {
          shoppingList:[],
          chooiseLength:0,
          allPrice:0,
          loading:true,
          numarr:[],
          arr:[]
        };
    },
    components:{Header, Footer,Navigation},
    methods:{
        Numnull(event,idx){
          if (!event.target.value) {
            this.shoppingList[idx].num = this.numarr[idx];
          }
        },

        getshoppingList(){
            requestData("/cart/listByUser?",{
                userId:token
            }).then(res=>{
                var arr=res.data
                this.numarr=new Array(arr.length)
                if(arr){
                  arr.forEach((item, idx) => {
                    item.thumbnail="http://web118.vipgz6.91tunnel.com/"+item.thumbnail
                    this.numarr[idx]=item.num
                  })
                }
                this.arr=res.data
                this.shoppingList=res.data
                this.loading=false
            }).catch(err => {            
              this.$message.error("获取购物车数据失败")      
            })  
        },

        ChooiseStatus(event){
          this.chooiseLength=event.length
          this.allPrice=event.reduce((total,item)=>
          {
            return total+parseInt(item.num)*parseFloat(item.price)
          },0)
        },

        allDelete(str){
          if(str=='all'){
            if(this.shoppingList.length==0){
              this.$message.warning("购物车已经为空!");
            }
            else{
                this.shoppingList.forEach(item=>{
                requestData("/cart/deleteById?",{
                userId:token,
                cartId:item.cardid
                }).catch((err) => {
                this.$message.error("清空购物车失败")
            });
              })
            }
            this.shoppingList=[]
          }
          else if(str=='delete'){
            if(this.$refs.elTable.selection.length==0){
              this.$message.warning("您未选择商品");
            }
            else{
              this.$refs.elTable.selection.forEach((item,index)=>{
                requestData("/cart/deleteById?",{
                  userId:token,
                  cartId:item.cardid
                }).catch((err) => {
                this.$message.error("删除商品失败")
                })
                this.shoppingList.splice(this.shoppingList.indexOf(item),1)
              })
            }
          }
        },
        
        deletegoods(index,rows){
          var token=window.sessionStorage.getItem("token")
          requestData("/cart/deleteById?",{
            userId:token,
            cartId:rows[index].cardid
          }).then(res=>{
            rows.splice(index,1)
            this.numarr.splice(index,1)
            this.$message.success("删除商品成功!");
          }).catch((err) => {
            this.$message.error("删除商品失败")
          })
          
        },

        changeNum(){
            this.shoppingList.forEach((item,idx)=>{
              if(!item.num) return
              if(item.num!=this.numarr[idx])
              {
                requestData("/cart/deleteById?",{
                  userId:token,
                  cartId:this.arr[idx].cardid
                }).then((res)=>{
                    requestData("/cart/add?",{
                    userId:token,
                    goodsId:item.goodsId,
                    num:item.num,
                    price:parseInt(item.price),
                  }).then(res=>{
                    item.cardid=res.data[0].cardid
                  }).catch((err) => {
                  this.$message.error("商品数量改变失败")
                  })
                }).catch((err) => {
                this.$message.error("商品数量改变失败")
                })
              }
              this.numarr[idx]=item.num
            })
          },

        setOrder(){
          if(this.$refs.elTable.selection.length==0) 
          {
            return this.$message.error("您未选择商品!")
          }
          this.changeNum()
          var cartList=[]
          this.shoppingList.forEach(item=>{
            cartList.push(item.cardid)
          })
          requestData("/order/addCastOrder?",{
                userId:token,
                cartList:cartList.join(",")
          }).then(res=>{
            this.shoppingList.forEach(item=>{
              requestData("/cart/deleteById?",{
              userId:token,
              cartId:item.cardid
              })
            })
            this.$message.success("订单生成成功!")
            this.$router.push('/order')
            this.shoppingList=[]
          })
          
        }
    },  
    watch:{
      shoppingList:{
        deep:true,
        handler(){
          this.changeNum();
          this.allPrice=this.$refs.elTable.selection.reduce((total,item)=>
          {
            return total+parseInt(item.num)*parseFloat(item.price)
          },0)
        }
      }
    },
    beforeMount() {
      this.getshoppingList()
    },
};
</script>

<style lang="css" scoped>

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
.cart-option {
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  color: #999999;
}
.cart-option .delete {
  margin-left: 20px;
  cursor: pointer;
}
.cart-option .common {
  margin-right: 30px;
}
.cart-option .common .total-num {
  margin: 0 5px;
}
.cart-option .common .total-price {
  font-size: 24px;
  font-weight: 700;
  vertical-align: bottom;
}
</style>