<template>
  <div class="widget flex flex-start">
    <div
      class="widget-item flex flex-center"
      v-for="(widget, index) in widgets"
      :key="index"
    >
      <div class="widget-item-svg" @click.stop="e => toWidget(widget.url, e)">
        <svg-icon :name="widget.svg" :title="widget.svg" />
      </div>
      <div class="widget-item-extra flex flex-column">
        <div v-for="(extraId, extra) in widget.relate" :key="extraId">
          <span @click.stop="e => toWidget(extraId, e)"> {{ extra }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { widgetList } from '../../global'
import { useMetaKey } from '../../hooks'
// 书签组件
const widgets = widgetList.map(item => {
  return { ...item, isShow: false }
})

const toWidget = (url, e) => {
  window.open(url, useMetaKey(e))
}
</script>
<style lang="less" scoped>
.widget {
  width: 645px;
  padding-top: 40px;
  flex-wrap: wrap;

  &-item {
    position: relative;

    &-svg {
      padding: 20px 40px;
    }

    &:hover svg {
      transition: all 0.7s ease-in-out;
      transform: rotateY(360deg);
    }

    &-extra {
      position: absolute;
      height: auto;
      top: 60px;
      left: 50%;
      background: var(--widget-bg-color);
      box-shadow: 0 0 14px var(--widget-shadow-color);
      transform: translate(-50%, -4px);
      transition: all 0.3s;
      border-radius: 6px;
      opacity: 0;
      visibility: hidden;
      font-size: 14px;
      color: var(--widget-font-color);

      & > div {
        width: 100px;
        padding: 9px;
        text-align: center;

        &:hover {
          transition: all 0.23s ease-out;

          color: var(--widget-hover-font-color);
          letter-spacing: 0.3px;
          font-weight: 400;
        }
      }
    }
  }
}

.widget-item:hover {
  cursor: pointer;
}

.widget-item:hover .widget-item-extra {
  z-index: 1;
  opacity: 1;
  visibility: visible;
  transform: translate(-50%, 0px);
}

html.dark {
  .widget-item-extra {
    box-shadow: 0 1px var(--widget-shadow-color);
  }
}
</style>
