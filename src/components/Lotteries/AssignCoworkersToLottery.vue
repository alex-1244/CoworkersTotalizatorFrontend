<template>
<div class="modal fade show bd-example-modal-lg" tabindex="-1" role="dialog"
    aria-labelledby="myLargeModalLabel" aria-hidden="true" id="assignCoworkerToLotteryModal">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title">Assign Coworker</h5>
            <button v-on:click="$emit('close', false)" type="button" class="close"
                data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <form class="needs-validation" ref="cc.form">
            <div class="modal-body">
                <div v-for="coworker in coworkers" v-bind:key="coworker.id">
                    <div class="row">
                        <div class="col-md-4 coworker-info">{{coworker.name}}</div>
                        <div class="col-md-2 coworker-info">{{coworker.presenceCoeficient}}</div>
                        <div class="col-md-6">
                            <div class="btn btn-outline-primary float-right"
                                v-if="!coworker.isAssigned"
                                @click="coworker.isAssigned=true">
                                    Assign
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
                <button type="buton" v-on:click="assign()" class="btn btn-outline-primary">
                    Ok
                </button>
            </div>
        </form>
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'AssignCoworkersToLottery',
  props: {
    coworkersData: [],
  },
  data: function data() {
    return {
      coworkers: this.coworkersData,
      assignedCoworkers: [],
    };
  },
  methods: {
    assign: function assign() {
      const assignedCoworkers = this.coworkers
        .filter(c => c.isAssigned)
        .map(c => c.id);

      this.$emit('assigned', assignedCoworkers);
    },
  },
};
</script>

<style lang="less" scoped>
.coworker-info {
    font-weight: bold;
    text-transform: capitalize;
    font-size: 1.2rem;
}

.modal-body .row {
    margin-top: 5px;
}
</style>
