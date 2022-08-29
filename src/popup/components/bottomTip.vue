<template>
  <div class="bottomTip">
    <svg-icon name="question" class="question" />
    <div class="modal">
      <p>command / ctrl + 链接：新标签页打开</p>
      <p>command / ctrl + k：搜索书签</p>
      <p>上下方向键：选择书签</p>
    </div>
  </div>
</template>

<style lang="less" scoped>
.bottomTip {
  position: fixed;
  bottom: 20px;
  right: 20px;

  svg {
    &:hover {
      animation: pulse 0.5s ease-in-out;
    }
  }

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
    bottom: 30px;
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

@keyframes pulse {
  0% {
    transform: scaleX(1)
  }

  50% {
    transform: scale3d(1.2, 1.2, 1.2)
  }

  to {
    transform: scaleX(1)
  }
}
</style>