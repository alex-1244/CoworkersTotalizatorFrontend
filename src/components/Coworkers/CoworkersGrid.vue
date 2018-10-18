<template>
  <div>
    <CtGrid v-if="coworkers != null" v-bind:data="coworkers" />
    <button v-on:click="createCoworker"
        type="button" class="btn btn-outline-primary float-right">Create Coworker</button>
    <CtCreateCoworkerModal
        v-if="showCreateModal"
        v-on:close="createCoworkerModalClosed($event)" />
  </div>
</template>

<script>
// @ is an alias to /src
import CtCreateCoworkerModal from '@/components/CreateCoworkerModal.vue';
import CtGrid from '@/components/Grid.vue';
import api from '@/services/api';

export default {
  name: 'coworkersGrid',
  components: {
    CtCreateCoworkerModal,
    CtGrid,
  },
  data: function homeData() {
    this.getCoworkers();

    return {
      coworkers: null,
      showCreateModal: false,
    };
  },
  methods: {
    deleteCoworker: function deleteCoworker(elem) {
      api.deleteApi(`/api/coworkers/${elem.id}`).then(this.getCoworkers);
    },
    createCoworkerModalClosed: function createCoworkerModalClosed(success) {
      if (success) {
        this.getCoworkers();
      }

      this.showCreateModal = false;
    },
    createCoworker: function createCoworker() {
      this.showCreateModal = true;
    },
    getCoworkers: function getCoworkers() {
      return api.get('/api/coworkers').then((data) => {
        this.coworkers = data.map((element) => {
          const elem = element;
          elem.deleteItem = () => this.deleteCoworker(elem);
          return elem;
        });
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
