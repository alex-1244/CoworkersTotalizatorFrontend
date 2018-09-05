import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
  },
  mutations: {
    loginSuccess(state, token) {
      this.state.token = token;
    },
  },
  actions: {
  },
});
