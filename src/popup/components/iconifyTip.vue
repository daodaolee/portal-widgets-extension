<template>
  <p class="w100 iconifyTip">
    powered by <a href="https://iconify.design/" target="_blank">Iconify</a>
  </p>
</template>
<style lang="less" scoped>
.iconifyTip {
  position: fixed;
  bottom: 6px;
  color: var(--font-color);
  font-size: 10px;
  text-align: center;
  opacity: 0.7;

  a {
    color: var(--font-color);
    opacity: 0.7;

    &:hover {
      opacity: 1;
    }
  }
}
</style>