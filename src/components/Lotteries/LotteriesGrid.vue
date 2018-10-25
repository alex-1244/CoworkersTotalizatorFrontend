<template>
  <div>
    <CtGrid v-if="lotteriesGridData != null" v-bind:data="lotteriesGridData" />
    <button v-on:click="createCoworker"
        type="button" class="btn btn-outline-primary float-right">Create Lottery</button>
    <CtCreateLotteryModal
        v-if="showCreateModal"
        v-on:close="createCoworkerModalClosed($event)" />
  </div>
</template>

<script>
// @ is an alias to /src
import CtCreateLotteryModal from '@/components/Lotteries/CreateLotteryModal.vue';
import CtGrid from '@/components/Grid.vue';
import api from '@/services/api';

export default {
  name: 'LotteriesGrid',
  components: {
    CtCreateLotteryModal,
    CtGrid,
  },
  data: function homeData() {
    this.getCoworkers();

    return {
      coworkers: null,
      lotteriesGridData: null,
      showCreateModal: false,
    };
  },
  methods: {
    deleteCoworker: function deleteCoworker(elem) {
      api.deleteApi(`/api/lottery/${elem.id}`).then(this.getCoworkers);
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
      return api.get('/api/lottery').then((data) => {
        if (!data || data.length === 0) {
          this.coworkers = null;
          this.lotteriesGridData = null;
          return;
        }

        this.coworkers = data;

        this.lotteriesGridData = {
          data: this.coworkers,
          props: ['name', 'date'],
          actions: {
            deleteItem: this.deleteCoworker,
          },
        };
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
