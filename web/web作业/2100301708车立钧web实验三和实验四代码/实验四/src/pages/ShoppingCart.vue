<template>
  <div>
    <div
      v-for="(shopping, id) in shoppingList"
      :key="id"
      v-show="!shopping.deleteStatus"
    >
      <div class="shop-content">
        <div class="commod-1">
          <div>
            <input
              type="checkbox"
              ref="shopB"
              @click="ChooiseStatus($event, id)"
              v-model="shopping.chooiseStatus"
              class="shopB"
            />
            <img :src="shopping.imgurl" />
          </div>
          <div class="shop-brief">
            <p class="long-tit">{{ shopping.title }}</p>
            <p>{{ shopping.description }}</p>
          </div>
        </div>
        <div class="commod-2">
          <div class="shop-price">{{ shopping.price }}</div>
          <div class="shop-number">
            <div class="btn-box">
              <div class="reduce">
                <a href="javaScript:;" @click="ChangeCount(id, -1)">-</a>
              </div>
              <div class="number">
                <input type="text" :value="shopping.count" class="shopC" />
              </div>
              <div class="add style-red">
                <a href="javaScript:;" @click="ChangeCount(id, 1)">+</a>
              </div>
            </div>
          </div>
          <div class="shop-account">
            {{ shopping.price * shopping.count + ".00" }}
          </div>
          <div class="shop-oper">
            <p class="shopDel">
              删除<input
                type="checkbox"
                @click="DeleteStatus(id)"
                value="shopping.deleteStatus"
                class="shopB"
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "ShoppingCart",
  data() {
    return {};
  },
  computed: {
    ...mapState(["shoppingList"]),
    ...mapGetters(["price"]),
  },
  methods: {
    ChooiseStatus(el, id) {
      var status = el.target.checked;
      this.$store.dispatch("ChangeChooiseStatus", { status, id });
    },
    DeleteStatus(id) {
      this.$store.commit("ChangeDeleteStatus", id);
    },
    ChangeCount(id, add) {
      this.$store.commit("ChangeCount", { id, add });
    },
  },
  created() {
    this.$store.dispatch("getshoppingList");
  },
};
</script>

<style lang="scss" scoped>
img {
  height: 130px;
}
.shop {
  font-size: 10px;
  width: 1200px;
}
.shop img {
  width: 100px;
  margin-left: 20px;
}
.shop-content {
  width: 1200px;
  height: 130px;
  display: flex;
  justify-content: space-between;
  border-top: 3px solid #d1d1d1;
  box-sizing: border-box;
  padding: 10px 0;
  margin: 25px 136px 10px 136px;
}
.commod-1,
.commod-2 {
  display: flex;
  width: 600px;
  height: 38px;
}
.commod-1 input {
  position: absolute;
  margin-top: 12px;
}
.commod-2 {
  justify-content: space-around;
}
input {
  cursor: default;
  box-sizing: border-box;
  margin: 3px 3px 3px 4px;
}
.shop-number {
  text-align: center;
  padding-left: 15px;
  box-sizing: border-box;
}
.btn-box {
  width: 100px;
  height: 30px;
}
.btn-box div {
  font-size: 16px;
  float: left;
  width: 30%;
  text-align: center;
  box-sizing: border-box;
  border: 1px solid #b3b0a8;
}
.btn-box .number {
  width: 40%;
  border-left: none;
  border-right: none;
}
.btn-box .number input {
  width: 100%;
  font-size: 16px;
  margin: 0;
  border: none;
  text-align: center;
  padding: 0px;
}
a{
  text-decoration: none;
  color: black;
}
.shopDel{
  margin-top: 0px;
}
</style>