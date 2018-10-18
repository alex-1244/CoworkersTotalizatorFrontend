<template>
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
                    <label for="coeficient">Coeficient</label>
                    <input
                        required="required"
                        pattern="^[0-1]{1}\.[0-9]{1,3}"
                        v-model="coeficient" type="number" class="form-control"
                        id="coeficient" placeholder="Coeficient" step=".001">
                    <div class="invalid-feedback">Coeficient should be in format '0.999'</div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" v-on:click="$emit('close', false)"
                    class="btn btn-outline-secondary" data-dismiss="modal">
                    Close
                </button>
                <button type="buton" v-on:click="create()" class="btn btn-outline-primary">
                    Create
                </button>
            </div>
        </form>
        </div>
    </div>
</div>
</template>

<script>
import api from '@/services/api';

export default {
  name: 'CtCreateCoworkerModal',
  props: {
  },
  data: function CreateCoworkerModalData() {
    return {
      name: null,
      coeficient: null,
      customError: null,
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

      api.post('/api/coworkers', {
        Name: this.name,
        PresenceCoeficient: this.coeficient,
      }).then(() => {
        this.$emit('close', true);
      }, (err) => {
        this.customError = err;
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

 .form-group label {
     float: left;
 }

 .form-group .invalid-feedback {
     text-align: left;
 }
</style>
