<template>
<div>
  <div class="container">
    <div class="home row">
      <div class="col-md-12">
        <CtGrid v-if="lotteriesGridData != null" v-bind:data="lotteriesGridData" />
      </div>
    </div>
  </div>
  <PlaceBid
          v-if="currentLottery"
          v-bind:lotteryId="currentLottery.id"
          v-bind:bids="currentLottery.coworkerBids"
          v-on:close="currentLottery = null;getLotteries()" />
</div>
</template>

<script>
import CtGrid from '@/components/Grid.vue';
import PlaceBid from '@/components/UserBids/PlaceBid.vue';
import api from '@/services/api';

export default {
  name: 'UserBids',
  components: {
    CtGrid,
    PlaceBid,
  },
  data: function data() {
    this.getLotteries();

    return {
      lotteriesGridData: null,
      currentLottery: null,
    };
  },
  methods: {
    placeBid: function placeBid(data) {
      this.currentLottery = data;
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
            placeBidBtn: {
              title: 'Place bid',
              func: this.placeBid,
            },
          },
        };

        if (this.$store.state.role === 'Admin') {
          this.lotteriesGridData.actions.viewUsersBids = {
            title: 'View users bids',
            func: this.viewUsersBids,
          };
        }
      });
    },
    viewUsersBids: function viewUsersBids(data) {
      this.$router.push({ name: 'usersBidsAdmin', params: { lotteryId: data.id } });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
