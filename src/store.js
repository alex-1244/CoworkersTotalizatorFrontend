import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
  },
  mutations: {
    login_succeeded(state, token) {
      this.state.token = token;
    },
  },
  actions: {
  },
});
