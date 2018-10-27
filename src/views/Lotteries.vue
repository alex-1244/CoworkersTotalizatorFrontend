<template>
  <div class="container">
    <div class="home row">
      <div class="col-md-12">
        <LotteriesGrid></LotteriesGrid>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import LotteriesGrid from '@/components/Lotteries/LotteriesGrid.vue';

export default {
  name: 'Lotteries',
  components: {
    LotteriesGrid,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
