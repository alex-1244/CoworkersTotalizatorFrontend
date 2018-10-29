<template>
<div>
    <div class="modal fade show bd-example-modal-lg" tabindex="-1" role="dialog"
    aria-labelledby="myLargeModalLabel" aria-hidden="true" id="createCoworkerModal">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title">Create lottery</h5>
            <button v-on:click="$emit('close', false)" type="button" class="close"
                data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <form class="needs-validation" ref="cc.form">
            <div class="modal-body">
                <div class="form-group">
                    <label for="nameInput">Name</label>
                    <input
                        v-on:input="customError=null"
                        v-bind:class="{ 'is-invalid': customError }"
                        required="required"
                        pattern="[a-zA-Z]{3,}\s*[a-zA-Z]*"
                        v-model="name" type="text" class="form-control" id="nameInput"
                        aria-describedby="emailHelp" placeholder="Enter name">
                    <div class="invalid-feedback" v-if="!customError">
                        Name should be minmum three symbol and can only contain letters
                    </div>
                    <div class="invalid-feedback" v-if="customError">
                        {{customError}}
                    </div>
                </div>
                <div class="form-group">
                    <label for="coeficient">Date</label>
                    <input
                        required="required"
                        v-model="date" type="date" class="form-control"
                        id="coeficient" placeholder="Coeficient" step=".001">
                    <div class="invalid-feedback">Date is invalid</div>
                </div>
                <div class="form-group">
                    <div>
                        <label for="assignCoworkers">Coworkers</label>
                    </div>
                    <div
                        class="assignedCoworker"
                        v-for="coworker in this.coworkers"
                        v-bind:key="coworker.id"
                        v-if="coworker.isAssigned">
                        <div class="row">
                            <div class="col-md-4">{{coworker.name}}</div>
                            <div class="col-md-4">{{coworker.presenceCoeficient}}</div>
                            <div class="col-md-4" v-if="!readonly">
                                <div
                                    class="btn btn-outline-danger float-right"
                                    @click="coworker.isAssigned=false">
                                    Delete
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class="btn btn-outline-primary" id="assignCoworkers"
                        type="button"
                        v-if="!readonly"
                        @click="showAssignPopup = true">
                        Assign
                    </button>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" @click="$emit('close', false)"
                    class="btn btn-outline-secondary" data-dismiss="modal">
                    Close
                </button>
                <button
                    v-if="!readonly"
                    @click="create()"
                    type="buton"
                    class="btn btn-outline-primary">
                        Create
                </button>
            </div>
        </form>
        </div>
    </div>
</div>
<AssignCoworkersToLottery
    v-bind:coworkersData="coworkers"
    v-if="showAssignPopup"
    @close="showAssignPopup=false"
    @assigned="assignCoworkers($event)"/>
</div>
</template>

<script>
import api from '@/services/api';
import AssignCoworkersToLottery from '@/components/Lotteries/AssignCoworkersToLottery.vue';

export default {
  name: 'CtCreateLotteryModal',
  components: {
    AssignCoworkersToLottery,
  },
  props: {
    data: Object,
  },
  data: function CreateCoworkerModalData() {
    if (this.data) {
      return this.getViewModel();
    }

    this.getCoworkers();

    return {
      name: null,
      date: null,
      coworkers: [],
      customError: null,
      showAssignPopup: false,
      readonly: false,
    };
  },
  methods: {
    create: function createLottery() {
      // form element
      const e = this.$refs['cc.form'];

      if (e.checkValidity() === false) {
        e.classList.add('was-validated');
        return;
      }

      api.post('/api/lottery', {
        Name: this.name,
        Date: this.date,
        coworkerIds: this.coworkers.filter(el => el.isAssigned).map(el => el.id),
      }).then(() => this.$emit('close', true));
    },
    assignCoworkers: function assignCoworkers(coworkerIds) {
      this.showAssignPopup = false;
      return coworkerIds;
    },
    getCoworkers: function getCoworkers() {
      return api.get('/api/coworkers').then((data) => {
        this.coworkers = data.map((el) => {
          const newEl = el;
          newEl.isAssigned = false;
          return newEl;
        });
      });
    },
    getViewModel: function getViewModel() {
      this.getCoworkers().then(() => {
        this.coworkers = this.coworkers.map((el) => {
          const newEl = el;
          newEl.isAssigned = this.data.coworkerIds.indexOf(el.id) > -1;
          return newEl;
        });
      });

      return {
        name: this.data.name,
        date: this.data.date,
        coworkers: [],
        customError: null,
        showAssignPopup: false,
        readonly: true,
      };
    },
  },
};
</script>

<style scoped lang="less">
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
</style>
