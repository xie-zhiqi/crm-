import Vue from "vue";
import Vuex from "vuex";
import permission from "./permission"
import users from "./users"
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { permission, users },
});
