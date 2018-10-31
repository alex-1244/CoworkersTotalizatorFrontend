<template>
<div>
  <div class="container">
    <div class="home row">
      <div class="col-md-12">
        <CtGrid v-if="bidsGridData != null" v-bind:data="bidsGridData" />
      </div>
    </div>
  </div>
</div>
</template>

<script>
import CtGrid from '@/components/Grid.vue';
import api from '@/services/api';

export default {
  name: 'UsersBidsAdmin',
  props: ['lotteryId'],
  components: {
    CtGrid,
  },
  data: function data() {
    this.getUsersBids();

    return {
      bidsGridData: null,
    };
  },
  methods: {
    getUsersBids: function getUsersBids() {
      return api.get(`/api/lottery/${this.lotteryId}/bids`).then((data) => {
        if (!data || data.length === 0) {
          this.bidsGridData = null;
          return;
        }

        this.bidsGridData = {
          data,
          props: ['coworkerId', 'bidAmmount'],
        };
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
