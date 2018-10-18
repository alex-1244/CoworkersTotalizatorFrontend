<template>
  <div class="container">
    <div class="home row">
      <div class="col-md-12">
        <label>Coworkers:</label>
        <CoworkersGrid></CoworkersGrid>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CoworkersGrid from '@/components/Coworkers/CoworkersGrid.vue';

export default {
  name: 'home',
  components: {
    CoworkersGrid,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
