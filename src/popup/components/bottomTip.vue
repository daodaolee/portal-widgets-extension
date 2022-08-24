<template>
  <div class="bottomTip">
    <svg-icon name="question" class="question" />
    <div class="modal">
      command / ctrl + 链接：新标签页打开
    </div>
  </div>
</template>
<style lang="less" scoped>
.bottomTip {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 10;

  .question {
    width: 1.2em;
    opacity: 0.7;

    &:hover+.modal {
      opacity: .7;
    }
  }

  .modal {
    position: absolute;
    top: -50px;
    right: 2px;
    padding: 10px 6px;
    width: max-content;
    font-size: 12px;
    border-radius: 6px;
    color: var(--font-color);
    border: 1px solid var(--font-color);
    transition: all 0.3s;
    opacity: 0
  }
}
</style>