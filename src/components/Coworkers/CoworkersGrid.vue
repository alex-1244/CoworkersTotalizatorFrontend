<template>
  <div>
    <CtGrid v-if="coworkersGridData != null" v-bind:data="coworkersGridData" />
    <button v-on:click="createCoworker"
        type="button" class="btn btn-outline-primary float-right">Create Coworker</button>
    <CtCreateCoworkerModal
        v-if="showCreateModal"
        v-on:close="createCoworkerModalClosed($event)" />
  </div>
</template>

<script>
// @ is an alias to /src
import CtCreateCoworkerModal from '@/components/Coworkers/CreateCoworkerModal.vue';
import CtGrid from '@/components/Grid.vue';
import api from '@/services/api';

export default {
  name: 'CoworkersGrid',
  components: {
    CtCreateCoworkerModal,
    CtGrid,
  },
  data: function homeData() {
    this.getCoworkers();

    return {
      coworkers: null,
      coworkersGridData: null,
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
        if (!data || data.length === 0) {
          this.coworkers = null;
          this.coworkersGridData = null;
          return;
        }

        this.coworkers = data;

        this.coworkersGridData = {
          data: this.coworkers,
          props: ['id', 'name', 'presenceCoeficient'],
        };

        if (this.$store.state.role === 'Admin') {
          this.coworkersGridData.actions = {
            deleteItem: this.deleteCoworker
          };
        }
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
