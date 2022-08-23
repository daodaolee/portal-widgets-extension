<template>
  <div class="w100 h100 home">
    <Mode />
    <Layout />

  </div>
</template>

<script  setup>
import Layout from '../layout/index.vue'
import Mode from '../components/mode.vue'
</script>
<style lang="less">
.home {
  position: relative;
}
</style>