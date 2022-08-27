<template>
  <div class="w100 h100 home">
    <Mode />
    <Layout />
    <IconifyTip />
    <BottomTip />
    <Typewrite />
    <SearchPanel />
  </div>
</template>

<script setup>
import Layout from '../layout/index.vue'
import Mode from '../components/mode.vue'
import IconifyTip from '../components/iconifyTip.vue';
import BottomTip from '../components/bottomTip.vue';
import Typewrite from '../components/typewrite.vue'
import SearchPanel from '../components/searchPanel.vue';
</script>
<style lang="less">
.home {
  position: relative;
}
</style>