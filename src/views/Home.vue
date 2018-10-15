<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <CtGrid v-if="coworkers != null" v-bind:data="coworkers" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import CtGrid from '@/components/Grid.vue';
import api from '@/services/api';

export default {
  name: 'home',
  components: {
    HelloWorld,
    CtGrid,
  },
  data: function homeData() {
    this.getCoworkers().then((data) => {
      this.coworkers = data;
    });

    return {
      coworkers: null,
    };
  },
  methods: {
    getCoworkers: function getCoworkers() {
      return api.get('/api/coworkers');
    },
  },
};
</script>
