import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

let storedToken;
let role;
const tokenSetTime = new Date(localStorage.getItem('token_set_time')) || 0;

if (new Date() - tokenSetTime < 1000 * 20 * 60) {
  storedToken = localStorage.getItem('token');
  role = localStorage.getItem('role');
}

const store = new Vuex.Store({
  state: {
    token: storedToken,
    role,
  },
  mutations: {
    loginSuccess(state, token) {
      localStorage.setItem('token', token);
      localStorage.setItem('token_set_time', new Date());
      this.state.token = token;
    },
    userRoleSet(state, userRole) {
      localStorage.setItem('role', userRole);
      this.state.role = userRole;
    },
  },
  actions: {
  },
});

export default store;
