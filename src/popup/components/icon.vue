<template>
  <svg class="svg-icon">
    <use :xlink:href="iconName" :fill="color" />
  </svg>
</template>
 
<script setup>
import { defineProps, computed } from 'vue';
import { useDark } from '@vueuse/core'

let isDark = useDark()
const props = defineProps({
  name: {
    type: String,
    required: true
  }
})
let color = computed(() => {
  return isDark.value ? '#c6ccd5' : '#374151'
})
const iconName = computed(() => {
  return `#icon-${props.name}`;
});

</script>
 
<style lang="less">
svg {
  color: var(--svg-color);
}

.svg-icon {
  width: 1.7em;
  height: 1.7em;
  fill: currentColor;
  vertical-align: middle;
  cursor: pointer;


}
</style>