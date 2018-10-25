<template>
<div>
    <div class="modal fade show bd-example-modal-lg" tabindex="-1" role="dialog"
    aria-labelledby="myLargeModalLabel" aria-hidden="true" id="createCoworkerModal">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title">Modal title</h5>
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
                    <div v-for="coworker in this.coworkers" v-bind:key="coworker.id">
                        <div v-if="coworker.isAssigned">
                            <span>{{coworker.name}}</span> -
                            <span>{{coworker.coeficient}}</span>
                            <span
                                class="btn btn-outline-danger"
                                @click="coworker.isAssigned=false">
                                Delete
                            </span>
                        </div>
                    </div>
                    <button class="btn btn-outline-primary" id="assignCoworkers"
                        type="button" @click="showAssignPopup = true">
                        Assign
                    </button>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" @click="$emit('close', false)"
                    class="btn btn-outline-secondary" data-dismiss="modal">
                    Close
                </button>
                <button type="buton" @click="create()" class="btn btn-outline-primary">
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
  },
  data: function CreateCoworkerModalData() {
    this.getCoworkers();

    return {
      name: null,
      date: null,
      coworkers: [],
      customError: null,
      showAssignPopup: false,
    };
  },
  methods: {
    create: function createCoworker() {
      // form element
      const e = this.$refs['cc.form'];

      if (e.checkValidity() === false) {
        e.classList.add('was-validated');
        return;
      }

      api.post();
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
  },
};
</script>

<style scoped lang="less">
 .modal.show {
     display: block;
     background-color: rgba(100, 100, 100, 0.8);
 }
</style>
