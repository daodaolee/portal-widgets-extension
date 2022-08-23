<template>
  <div class="mode">
    <svg-icon :name="isDark ? 'moon' : 'sun'" title="切换主题" @click="toggleDark()" />
  </div>
</template>
<script setup>
import { useDark, useToggle } from '@vueuse/core'

let isDark = useDark()
const toggleDark = useToggle(isDark)

</script>
<style lang="less" scoped>
.mode {
  position: absolute;
  right: 20px;
  top: 20px;

  svg {
    width: 1.4em;
    height: 1.4em;
  }
}
</style>