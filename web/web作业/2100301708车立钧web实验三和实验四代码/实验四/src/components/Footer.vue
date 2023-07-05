<template>
  <div>
    <div class="settle-account">
      <div class="fot-1">
        <div>
          <input
            type="checkbox"
            class="con-inp"
            @click="ChooiseAll"
            v-model="allcheck"
          />全选
        </div>
        <div class="kkx">
          <a href="javaScript:;" class="delChoose" 
          @click="DeleteChooise"
            >删除选中的商品</a
          >
          <a href="javaScript:;" 
          @click="DeleteAll">清空购物车</a>
        </div>
      </div>
      <div class="fot-2">
        <div>
          已选择<span
            class="total-amount"
            style="color: red; 
            font-size: 16px; padding: 0 5px"
            >{{ count.length }}</span
          >件商品 总价：
        </div>
        <div>
          <span class="account-price">
            {{ price + ".00" }}</span>
        </div>
        <div class="skip">
          <a href="javascript:;" style="font-size: 
          22px; color: white">去结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Footer",
  computed: {
    allcheck: {
      get() {
        return this.$store.state.allchecked;
      },
      set(newvalue) {
        this.$store.commit("Allchecked", newvalue);
      },
    },
    ...mapGetters(["price", "count"]),
  },
  methods: {
    changeAllChooiseStatus() {
      this.$store.dispatch(
        "AllChangeChooiseStatus", !this.footchecked);
      console.log(this.shoppingList);
    },
    DeleteChooise() {
      var id = -1;
      this.$store.commit("ChangeDeleteStatus", id);
    },
    DeleteAll() {
      var id = -2;
      this.$store.commit("ChangeDeleteStatus", id);
    },
    ChooiseAll() {
      var status = event.target.checked;
      var id = -1;
      this.$store.dispatch(
        "AllChangeChooiseStatus", { status, id });
    },
  },
};
</script>

<style lang="scss" scoped>
.settle-account {
  width: 1200px;
  height: 70px;
  display: flex;
  justify-content: space-between;
  border: 1px solid #cfcfcf;
  box-sizing: border-box;
  padding: 20px 0;
  margin: 30px 136px 160px 0px;
  margin-left: 136px;
  margin-bottom: 160px;
}
.fot-1,
.fot-2 {
  display: flex;
}
.kkx {
  width: 300px;
  display: flex;
  justify-content: center;
}
.kkx a {
  display: block;
  margin-left: 10px;
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
.shopC {
  background-color: #ffff;
}
a{
  text-decoration: none;
  color: black;
}
</style>