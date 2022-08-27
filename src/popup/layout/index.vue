<template>
  <div class="w100 h100 layout">

    <div class="container flex flex-column">
      <div class="container-time flex flex-center">
        <!-- <p>{{ time }}</p> -->
        <weather class="container-time-weather" />
      </div>
      <div class="container-search flex flex-center">
        <div class="container-search-box flex flex-center">
          <div class="prefix flex-1 flex flex-center">
            <svg-icon class="currentEngine" :name="currentEngine.svg" :title="currentEngine.title"
              @click.stop="checkEngineStatus" />
            <div class="container-search-engine">
              <div :class="['container-search-engine-item', showEngineList ? 'active' : '']"
                v-for="engine in enginesList" :key="engine.title"
                @click.stop="currentEngine = engine; showEngineList = false">
                <svg-icon :name="engine.svg" :title="engine.title" />
              </div>
            </div>
          </div>
          <input class="h100" type="text" autofocus v-model="keyword">
          <div class="suffix flex-1 flex flex-center">
            <svg-icon class="search" name="search" title="搜索" @click.stop="(e) => toSearch(e)" />
          </div>
        </div>
      </div>
      <div class="container-widget flex">
        <div class="container-widget-item flex flex-center flex-1" v-for="(widget, index) in widgets" :key="index">
          <svg-icon :name="widget.svg" :title="widget.title" @click.stop="(e) => toWidget(widget, e)" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { icons, engines } from '../../global'
import { useMetaKey } from '../../hooks'
import weather from '../components/weather.vue'

// 书签组件
const widgets = ref(icons)
// 搜索引擎
const enginesList = ref(engines)
// 搜索引擎显示隐藏
let showEngineList = ref(false)
const checkEngineStatus = () => {
  showEngineList.value = !showEngineList.value
}

// 切换引擎
let currentEngine = ref({
  title: '谷歌',
  svg: 'google',
  url: 'https://www.google.com/search?q='
})

const toWidget = (widget, e) => {
  window.open(widget.url, useMetaKey(e))
}

let keyword = ref('')


const toSearch = (e) => {
  window.open(currentEngine.value.url + keyword.value, useMetaKey(e))
}

// let time = ref('')
// const getTime = () => {
//   var date = new Date();//如果date为13位不需要乘1000
//   var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
//   var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
//   var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
//   time.value = h + m + s
// }

// getTime()
// setInterval(() => {
//   getTime()
// }, 1000)

window.addEventListener('keyup', (e) => {
  if (e.key === 'Enter' && keyword.value) {
    toSearch(e)
  }
})
window.addEventListener('click', () => {
  showEngineList.value = false
})



</script>
<style lang="less" scoped>
.layout {
  background: var(--bg-color);
  transition: background 0.2s ease-in-out;
  display: flex;
  justify-content: center;

  .container {
    padding-top: 200px;
    align-items: center;

    &-time {
      width: 560px;
      padding: 50px 0px 0px;
      color: var(--font-color);
      position: relative;

      p {
        letter-spacing: 5px;
        font-size: 30px;
      }

      &-weather {
        position: absolute;
        right: 0;
        // top: 0;
      }
    }

    &-search {
      position: relative;
      padding-top: 100px;

      &-box {
        width: 560px;
        height: 44px;
        border: 2px solid var(--svg-color);
        border-radius: 20px;

        input {
          width: 480px;
          border: none;
          padding: 0;
          background: var(--bg-color);
          color: var(--font-color);
          transition: background 0.2s ease-in-out;
        }

        .prefix {
          padding-left: 3px;
          position: relative;

          svg {
            width: 1.3em;
            height: 1.3em;
            z-index: 1;
          }
        }

        .suffix {
          padding-right: 8px;

          svg {
            width: 1.4em;
            height: 1.4em;
          }
        }
      }

      &-engine {
        position: absolute;
        left: 10px;
        top: 0px;

        svg {
          width: 1.45em;
          height: 1.45em;

          &:hover {
            transition: all 0.7s ease-in-out;
            transform: rotateY(360deg);
          }
        }

        &-item {
          cursor: pointer;
          transform-origin: 100px 100px;
          transition: all 0.3s;
          position: absolute;
          transform: translate(0, 0);
          opacity: 0;

          &:nth-child(1).active {
            transform: translate(-45px, -60px);
            transition-delay: 0.01s;
            opacity: 1;
          }

          &:nth-child(2).active {
            transition-delay: 0.04s;
            transform: translate(-70px, 0px);
            opacity: 1;

          }

          &:nth-child(3).active {
            transition-delay: 0.08s;
            transform: translate(-45px, 60px);
            opacity: 1;

          }
        }
      }
    }

    &-widget {
      width: 1000px;
      padding-top: 80px;
      // height: 300px;
      flex-wrap: wrap;

      &-item {
        width: var(--widget-width);
        height: var(--widget-height);
        padding: 0 15px 15px;

        svg:hover {
          transition: all 0.7s ease-in-out;
          transform: rotateY(360deg);
        }
      }
    }
  }
}
</style>
