<template>
  <div class="commodity">
    <Navigation/>
    <div id="productList" v-loading="loading">
      <transition-group name="list">
          <ul v-for="(item, index) in shoppingList" :key="item.id">
            <li class="item">
              <div class="img_box">
                <img :src="item.pthumbnail" alt="" />
              </div>
              <p v-html="item.name"></p>
              <span :style="{ color: 'red' }">&yen;{{item.price1}}</span>
              <span class="iconfont icon-gouwuche" @click="addshopping(item,$event)"></span>
            </li>
          </ul>
      </transition-group>
    </div>
    <div class="shop animate__animated animate__backInUp" v-if="count">
      <el-badge :value="count">
        <i class="iconfont icon-gouwucheman" @click="goshop"></i>
      </el-badge>
    </div>

    <div class="ball-box">
      <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
        <div class="ball" v-if="ball.show">
          <div class="inner">
            <i class="iconfont icon-gouwucheman" @click="goshop"></i>
          </div>
        </div>
      </transition>
    </div>

  </div>
</template>

<script>
    import "animate.css";
    import { requestData } from "../http/api";
    import Navigation from "../components/Navigation.vue"
    import Vue from "vue";
export default {
  name: "Commodity",

  data() {
    return { 
      shoppingList: [],
      count:0,
      loading:true,
      ball: {
        show: false,
        el: "",
        x:0,
        y:0
      },
    };
  },
  components:{Navigation},
  beforeMount() {
    requestData("/goods/list")
      .then((res) => {
        if (res.status == 200) {
          res.data.forEach((item) => {
            Vue.set(item,"count",1)
            item.pthumbnail = "http://web118.vipgz6.91tunnel.com/" + item.pthumbnail;
          });
          this.shoppingList = res.data;
        }
      })
      .catch((err) => {
        this.$message.error("获取商品数据失败")
      });
  },

  mounted() {
      this.loading=false
  },
  methods: {
    beforeEnter(el) {
      let dom = this.ball.el;
      let rect = dom.getBoundingClientRect();
      this.ball.x = rect.left - innerWidth * 0.62;
      this.ball.y = -(innerHeight - rect.top);
      el.style.display = "block";
      el.style.transform = `translate3d(0,${this.ball.y}px,0)`;
      let inner = el.querySelector(".inner");
      inner.style.transform = `translate3d(${this.ball.x}px,0,0)`;
    },
    enter(el, done) {
      document.body.offsetHeight;
      console.log(this.ball.x,this.ball.y);
      el.style.transform = `translate3d(0,${600-this.ball.y}px,0)`;
      let inner = el.querySelector(".inner");
      inner.style.transform = `translate3d(${700-this.ball.x}px,0,0)`;
      el.addEventListener("transitionend", done);
    },
    afterEnter(el) {
      this.ball.show = false;
      el.style.display = "none";
      this.count++;
    },
    goshop(){
      this.$router.push("/shoppingcar")
    },
    addshopping(item,event){
      this.ball.el = event.target;
      var useid=window.sessionStorage.getItem("token")
      requestData('/cart/add?',{
        userId:useid,
        goodsId:item.id,
        num:item.count,
        price:parseInt(item.price1),
      }).then(()=>{
        this.ball.show = true;
      }).catch((err) => {
        this.$message.error("添加商品失败")
      });
    }
  },
};
</script>

<style lang="css" scoped>
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to{
  opacity: 0;
  transform: translatez(30px);
}
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
#productList {
  position: relative;
  width: 1000px;
  padding-bottom: 50px;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
}

.item {
  float: left;
  width: 190px;
  height: 235px;
  margin: 8px 5px 0px;
  text-align: center;
  background: #fff;
  border-radius: 5px;
}

.item .img_box {
  width: 120px;
  height: 120px;
  margin: 15px auto;
}

.img_box img {
  width: 100%;
  height: 100%;
}

.item p {
  font-size: 12px;
  line-height: 20px;
  height: 30px;
}

.more2_info_self {
  background-color: #e1251b;
  border-radius: 2px;
  color: #fff;
  padding: 0 5px;
  margin-right: 4px;
  line-height: 16px;
  height: 16px;
  font-size: 12px;
  font-style: normal;
}
li {
  position: relative;
}
.icon-gouwuche {
  padding-top: 2px;
  width: 30px;
  font-size: 20px;
  border-radius: 20px;
  background-color: #e3e3e3;
  position: absolute;
  bottom: 5px;
  right: 12px;
}
.icon-gouwuche:hover {
  background-color: #b5b5b5;
  cursor: pointer;
}
.shop {
  position: fixed;
  bottom: 200px;
  right: 150px;
}
.icon-gouwucheman {
  padding: 10px;
  padding-top: 12px;
  font-size: 30px;
  border-radius: 30px;
  background-color: #b0abab;
}
.count {
  position: absolute;
  top:-7px;
  right: 3px;
  margin-left: -10px;
  font-size: 12px;
  padding: 0px 6px;
  border-radius: 10px;
  color: #fff;
  background-color: #e1251b;
}
.shop{
  cursor: pointer;
}
.ball{
    position: fixed;
    bottom: 0;
    left: 62%;
    z-index: 2;
    transition: all 1s cubic-bezier(0.49, -0.29, 0.75, 0.41);
}
.inner {
    transition: all 1s linear;
}
</style>