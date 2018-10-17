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
        <form>
            <div class="modal-body">
                <div class="form-group">
                    <label for="nameInput">Name</label>
                    <input v-model="name" type="text" class="form-control" id="nameInput"
                        aria-describedby="emailHelp" placeholder="Enter name">
                </div>
                <div class="form-group">
                    <label for="coeficient">Coeficient</label>
                    <input v-model="coeficient" type="text" class="form-control"
                        id="coeficient" placeholder="Coeficient">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" v-on:click="$emit('close', false)"
                    class="btn btn-outline-secondary" data-dismiss="modal">
                    Close
                </button>
                <button type="button" v-on:click="create()"
                    class="btn btn-outline-primary">
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
    };
  },
  methods: {
    create: function createCoworker() {
      api.post
        
      this.$emit('close', true);
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
</style>
