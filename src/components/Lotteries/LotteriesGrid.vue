<template>
  <div>
    <CtGrid v-if="lotteriesGridData != null" v-bind:data="lotteriesGridData" />
    <button v-on:click="createLottery"
        type="button" class="btn btn-outline-primary float-right">Create Lottery</button>
    <CtCreateLotteryModal
        v-if="showCreateModal"
        v-bind:data="this.currentlottery"
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
    this.getLotteries();

    return {
      lotteries: null,
      lotteriesGridData: null,
      showCreateModal: false,
      currentlottery: null,
    };
  },
  methods: {
    deleteLottery: function deleteLottery(elem) {
      api.deleteApi(`/api/lottery/${elem.id}`).then(this.getLotteries);
    },
    createCoworkerModalClosed: function createCoworkerModalClosed(success) {
      if (success) {
        this.getLotteries();
      }

      this.showCreateModal = false;
      this.currentlottery = null;
    },
    createLottery: function createLottery() {
      this.showCreateModal = true;
    },
    viewLottery: function viewLottery(lotteryData) {
      this.showCreateModal = true;
      this.currentlottery = lotteryData;
    },
    getLotteries: function getLotteries() {
      return api.get('/api/lottery').then((data) => {
        if (!data || data.length === 0) {
          this.lotteries = null;
          this.lotteriesGridData = null;
          return;
        }

        this.lotteries = data;

        this.lotteriesGridData = {
          data: this.lotteries,
          props: ['name', 'date'],
          actions: {
            viewItem: this.viewLottery,
          },
        };

        if (this.$store.state.role === 'Admin') {
          this.lotteriesGridData.actions.deleteItem = this.deleteLottery;
        }
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
