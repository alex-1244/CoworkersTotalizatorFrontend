<template>
  <div class="container">
    <div class="home row">
      <div class="col-md-12">
        <CtGrid v-if="coworkers != null" v-bind:data="coworkers" />
        <button v-on:click="createCoworker"
          type="button" class="btn btn-outline-primary float-right">Create Coworker</button>
        <CtCreateCoworkerModal
          v-if="showCreateModal"
          v-on:close="createCoworkerModalClosed($event)" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CtCreateCoworkerModal from '@/components/CreateCoworkerModal.vue';
import CtGrid from '@/components/Grid.vue';
import api from '@/services/api';

export default {
  name: 'home',
  components: {
    CtCreateCoworkerModal,
    CtGrid,
  },
  data: function homeData() {
    this.getCoworkers().then((data) => {
      this.coworkers = data;
    });

    return {
      coworkers: null,
      showCreateModal: false,
    };
  },
  methods: {
    createCoworkerModalClosed: function createCoworkerModalClosed(success) {
      if (success) {
        this.getCoworkers().then((data) => {
          this.coworkers = data;
        });
      }

      this.showCreateModal = false;
    },
    createCoworker: function createCoworker() {
      this.showCreateModal = true;
    },
    getCoworkers: function getCoworkers() {
      return api.get('/api/coworkers');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
