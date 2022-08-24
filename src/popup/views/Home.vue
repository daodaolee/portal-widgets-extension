<template>
  <div class="w100 h100 home">
    <Mode />
    <Layout />
    <IconifyTip />
    <BottomTip />
  </div>
</template>

<script setup>
import Layout from '../layout/index.vue'
import Mode from '../components/mode.vue'
import IconifyTip from '../components/iconifyTip.vue';
import BottomTip from '../components/bottomTip.vue';

</script>
<style lang="less">
.home {
  position: relative;
}
</style>