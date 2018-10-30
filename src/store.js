import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

let storedToken;
const tokenSetTime = new Date(localStorage.getItem('token_set_time')) || 0;

if (new Date() - tokenSetTime < 1000 * 20 * 60) {
  storedToken = localStorage.getItem('token');
}

export default new Vuex.Store({
  state: {
    token: storedToken,
  },
  mutations: {
    loginSuccess(state, token) {
      localStorage.setItem('token', token);
      localStorage.setItem('token_set_time', new Date());
      this.state.token = token;
    },
  },
  actions: {
  },
});
