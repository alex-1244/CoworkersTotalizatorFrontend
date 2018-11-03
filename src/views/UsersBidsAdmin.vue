<template>
<div>
  <div class="container">
    <div class="row mb-3">
      <div class="col-md-12">
        <button class="btn-nav btn btn-outline-primary" @click="$router.go(-1)">
          <i class="fas fa-chevron-left"></i>
          Back
        </button>
      </div>
    </div>
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
          props: ['userId', 'coworkerId', 'bidAmmount'],
        };
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.btn-nav i {
  margin-left: -5px;
}
</style>
