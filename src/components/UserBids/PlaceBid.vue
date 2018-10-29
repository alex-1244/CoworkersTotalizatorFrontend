<template>
<div>
    <div class="modal fade show bd-example-modal-lg" tabindex="-1" role="dialog"
        aria-labelledby="myLargeModalLabel" aria-hidden="true" id="assignCoworkerToLotteryModal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Place bid</h5>
                <button v-on:click="$emit('close', false)" type="button" class="close"
                    data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form class="needs-validation" ref="cc.form">
                <div class="modal-body">
                    <div v-for="coworker in coworkers" v-bind:key="coworker.id">
                        <div class="row">
                            <div class="col-md-4 coworker-info">
                                {{coworker.name}}
                            </div>
                            <div class="col-md-2 coworker-info">
                                {{coworker.presenceCoeficient}}
                            </div>
                            <div class="col-md-4">
                                <input class="form-control" placeholder="bid ammount" type="text"
                                    v-model="coworker.bidAmmount">
                            </div>
                            <div class="col-md-2">
                                <div class="btn btn-outline-primary float-right"
                                    v-if="!coworker.isAssigned"
                                    @click="placeBid(coworker)">
                                        Bid
                                </div>
                                <div class="btn btn-outline-danger float-right"
                                    v-if="coworker.isAssigned"
                                    @click="coworker.isAssigned = false">
                                        Unassign
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" v-on:click="$emit('close', false)"
                        class="btn btn-outline-secondary" data-dismiss="modal">
                        Close
                    </button>
                    <button type="buton" v-on:click="placeBids()" class="btn btn-outline-primary">
                        Ok
                    </button>
                </div>
            </form>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import api from '@/services/api';

export default {
  name: 'PlaceBid',
  props: {
    lotteryId: null,
  },
  data: function data() {
    this.getAssigneCoworkers(this.lotteryId);

    return {
      coworkers: null,
    };
  },
  methods: {
    getMyBidsForLottery: function getMyBidsForLottery() {
      // get my bids for this lottery via API
    },
    getAssigneCoworkers: function getAssigneCoworkers(lotteryId) {
      return api.get(`/api/lottery/assignedCoworkers/${lotteryId}`)
        .then((data) => {
          this.coworkers = data;
        });
    },
    placeBids: function placeBids() {
      const coworkersPostModel = this.coworkers.map(el => ({
        coworkerId: el.id,
        bidAmmount: el.bidAmmount,
      }));

      api.post(`/api/lottery/placeBids/${this.lotteryId}`, coworkersPostModel)
        .then(() => {
          this.$emit('close', true);
        });
    },
  },
};
</script>

<style lang="less" scoped>
 .modal.show {
     display: block;
     background-color: rgba(100, 100, 100, 0.8);
 }

 .modal-body .row {
    margin-top: 5px;
}

.assignedCoworker {
    font-weight: bold;
}

.coworker-info {
    font-weight: bold;
    text-transform: capitalize;
    font-size: 1.2rem;
}

.modal-body .row {
    margin-top: 5px;
}
</style>
