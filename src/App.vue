<template>
  <div id="app">
  <ul class="nav">
  <li class="nav-item">
    <div class="nav-link">
      <router-link to="/">Coworkers</router-link>
    </div>
  </li>
  <li class="nav-item">
    <div class="nav-link">
      <router-link to="/lotteries">Lotteries</router-link>
    </div>
  </li>
  <li class="nav-item">
    <div class="nav-link">
      <router-link to="/userbids">User bids</router-link>
    </div>
  </li>
  <li class="nav-item ml-auto">
    <a class="nav-link disabled" href="#">
      <button
        class="btn btn-outline-primary"
        @click="logout">
        Logout
      </button>
    </a>
  </li>
</ul>
    <router-view/>
  </div>
</template>

<script>
import store from '@/store';

export default {
  name: 'App',
  methods: {
    logout: function logout() {
      store.commit('logout');
      this.$router.push({ name: 'login' });
    },
  },
};
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  text-align: center;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
