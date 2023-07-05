<template>
  <div>
    <div class="header">
      <div class="logo">
        <h1>
          <a href="index.html" title="品优购商城"
            ><img src="../static/pinyou.jpg" alt=""
          /></a>
        </h1>
      </div>
      <div class="buycar">购物车</div>
    </div>

    <div class="tit">
        <div class="tit-top">
            <span class="red">全部商品
        </span></div>
      <div class="tit-con">
        <div class="con-1">
          <div>
            <input
              type="checkbox"
              name="allChecked"
              class="con-inp"
              @click="ChooiseAll"
              v-model="allcheck"
            />全选
          </div>
          <div class="con-good">商品</div>
        </div>
        <div class="con-2">
          <div>单价</div>
          <div>数量</div>
          <div>小计</div>
          <div>操作</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Header",

  computed: {
    allcheck: {
      get() {
        return this.$store.state.allchecked;
      },
      set(newvalue) {
        this.$store.commit("Allchecked", newvalue);
      },
    },
    ...mapGetters(["price"]),
  },

  methods: {
    ChooiseAll() {
      var status = event.target.checked;
      var id = -1;
      this.$store.dispatch("AllChangeChooiseStatus", { status, id });
    },
  },
};
</script>

<style lang="scss" scoped>
.tit {
  height: 70px;
}
.header {
  height: 82px;
  width: 1200px;
  margin: 0 136px;
  position: relative;
}
.logo img {
  margin-left: 0px;
}
.header .buycar {
  position: absolute;
  top: 35px;
  left: 250px;
  font-size: 19px;
  color: #333;
}
.tit-top {
  color: red;
  width: 1200px;
  height: 24px;
  margin: 25px 136px 5px 136px;
  position: relative;
}
.tit-top:after {
  content: "";
  position: absolute;
  height: 2px;
  bottom: -5px;
  left: 0;
  width: 65px;
  height: 3px;
  background-color: red;
}
.tit-con {
  background-color: #f5f5f5;
  width: 1200px;
  height: 38px;
  display: flex;
  margin: 10px 136px 10px 136px;
  line-height: 38px;
  text-align: center;
  font-size: 10px;
}
.con-1,
.con-2 {
  display: flex;
  width: 600px;
  height: 38px;
}
.tit-con .con-2 {
  justify-content: space-around;
}
.con-good {
  width: 555px;
}
a{
  text-decoration: none;
  color: black;
}
</style>
