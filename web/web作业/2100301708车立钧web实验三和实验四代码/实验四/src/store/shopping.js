// 该文件用于创建vuex的核心store

// 导入vuex模块
import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
//准备actions--用于响应组件的动作
export default new Vuex.Store({
  //准备state--用于存储数据
  strict: true,
  state: {
    shoppingList: [],
    allchecked: false,
  },
  actions: {
    getshoppingList(context) {
      //获取商品数据
      const instance = axios.create({
        baseURL: "",
        timeout: 200,
      });
      instance
        .get("/shoppingList")
        .then((res) => {
          if (res.data.code == 200) {
            context.commit("setShoppingList", res.data.data.data.list);
          }
        })
        .catch((err) => {
          console.warn(err);
        });
    },
    ChangeChooiseStatus(context, value) {
      context.commit("setChangeChooiseStatus", value);
    },
    AllChangeChooiseStatus(context, value) {
      context.commit("setChangeChooiseStatus", value);
    },
  },
  //准备mutations--用于操作数据
  mutations: {
    setShoppingList(state, value) {
      state.shoppingList = value;
      state.shoppingList.map((item) => {
        Vue.set(item, "chooiseStatus", false);
        Vue.set(item, "deleteStatus", false);
      });
    },

    setChangeChooiseStatus(state, value) {
      state.shoppingList.forEach((item) => {
        if (value.id == -1) {
          state.allchecked = value.status;
          item.chooiseStatus = value.status;
        } else if (item.id - 1 == value.id) item.chooiseStatus = value.status;
        if (!item.chooiseStatus) state.allchecked = false;
      });
    },

    Allchecked(state, value) {
      state.allchecked = value;
      state.shoppingList.forEach((item) => {
        item.chooiseStatus = value;
      });
    },

    ChangeDeleteStatus(state, value) {
      state.shoppingList.forEach((item) => {
        if (value == -2) {
          item.deleteStatus = true;
          item.chooiseStatus = false;
          state.allchecked = false;
        } else if (value == -1 && item.chooiseStatus) {
          item.deleteStatus = true;
          item.chooiseStatus = false;
        } else if (item.id - 1 == value) {
          item.deleteStatus = true;
          item.chooiseStatus = false;
        }
      });
    },
    ChangeCount(state, value) {
      state.shoppingList.forEach((item) => {
        if (value.id == item.id - 1) {
          if (item.count <= 1 && value.add == -1) return;
          item.count += value.add;
        }
      });
    },
  },

  //准备getter对state的数据进行加工
  getters: {
    //计算商品价格
    price(state) {
      return state.shoppingList.reduce(
        (total, item) =>
          total +
          (!item.deleteStatus && item.chooiseStatus
            ? item.price * item.count
            : 0),
        0
      );
    },
    count(state) {
      return state.shoppingList.filter(
        (item) => item.chooiseStatus && !item.deleteStatus
      );
    },
  },
});
