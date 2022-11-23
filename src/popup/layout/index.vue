<template>
  <div class="w100 h100 layout">

    <div class="container flex flex-column">
      <div class="container-time flex flex-center">
        <!-- <p>{{ time }}</p> -->
        <weather class="container-time-weather" />
      </div>
      <div class="container-search flex flex-column  flex-center">
        <div
          :class="['container-search-box', 'flex', 'flex-center', result.length ? 'noBorderBottoRadius' : '', !isDark && result.length ? 'lightBorder' : '']">
          <div class="prefix flex flex-center">
            <svg-icon class="search" name="search" title="搜索"/>
          </div>
          <input class="h100" type="text" autofocus v-model="keyword" @input.stop="e => search(e)">

          <div class="container-search-panel flex flex-center normal  flex-column" v-show="result.length">
            <p :class="[isResultActive === index ? 'active' : '']" v-for="(item, index) in result" :key="index"
              @click.stop="e => toSearchBookmark(item, e)">
              {{ item.title }}
            </p>
          </div>
        </div>
      </div>
      <div class="container-widget flex">
        <Widget />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, nextTick } from 'vue'
import { engines, bookmark } from '../../global'
import { useMetaKey, useChineseToPinyin } from '../../hooks'
import { arrowUpDownChange, flatData } from '../../utils/tools'
import weather from '../components/weather.vue'
import Widget from '../components/widget.vue'
import { useDark } from '@vueuse/core'

let isDark = useDark()

// 搜索引擎
const enginesList = ref(engines)

// 当前选中的条目
let isResultActive = ref(0)

let currentBookmark = ref({})
let result = ref([])
// 搜索结果
let resultBookmark = ref([])

let keyword = ref('')

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

// 获取所有书签
async function getResultBookmark() {
  let temp = flatData(await bookmark())
  let filterData = temp.filter((item) => item.url && item.title)
  let bookmarkData = filterData

  resultBookmark.value = bookmarkData.map((item) => {
    return {
      ...item,
      pinyin: useChineseToPinyin(item.title)
    }
  })
}
getResultBookmark()

// 点击书签面板跳转
function toSearchBookmark(bookmark, e) {
  currentBookmark.value = bookmark
  window.open(bookmark.url, useMetaKey(e))
}
function clearArrowUpDown() {
  isResultActive.value = 0
}

// 搜索
function search(e) {
  clearArrowUpDown()
  arrowUpDownChange(isResultActive, result.value.length ? result : enginesList, e, () => {
    currentBookmark.value = result.value[isResultActive.value]
  })

  if (!keyword.value) {
    result.value.length = 0
    // showEngines.value = false
    return
  }
  const includesStr = (data) => {
    return (
      data.title.includes(keyword.value) ||
      data.pinyin.includes(keyword.value)
      // data.url.includes(keyword.value)
    )
  }
  const data = resultBookmark.value.filter((data) => includesStr(data))
  nextTick(() => {
    if (data.length) {
      // showEngines.value = false
      result.value = data.slice(0, 12)
    } else {
      // showEngines.value = true
      result.value = []
    }
  })
}
window.addEventListener('keydown', (e) => {
  // command + k 或者 esc 快捷键
  // const info = systemInfo()
  // const key1 = info === 'win' ? e.ctrlKey : e.metaKey
  // const key2 = e.key === 'k'
  // if (key1 && key2) {
  //   showSearchPanel.value = !showSearchPanel.value
  //   return
  // }
  const key3 = e.key === 'Escape'
  if (key3) {
    result.value = []
    return
  }

  // 上下按键更换选中条目
  arrowUpDownChange(isResultActive, result.value.length ? result : enginesList, e, () => {
    currentBookmark.value = result.value[isResultActive.value]
  })

  // 回车跳转
  if (e.key === 'Enter') {
    if (result.value.length){
      window.open(currentBookmark.value.url, useMetaKey(e))
    } else {
      console.log(123)
      window.open(`https://www.baidu.com/s?tn=68018901_2_oem_dg&ie=utf-8&wd=${keyword.value}`, useMetaKey(e))
    }
    
  }
})

</script>
<style lang="less" scoped>
@import '../../assets/css/common.less';

.layout {
  background: var(--bg-color);
  transition: background 0.2s ease-in-out;
  display: flex;
  justify-content: center;

  .container {
    padding-top: 16vh;
    align-items: center;
    position: relative;

    &-time {
      width: 550px;
      // padding: 50px 0px 0px;
      color: var(--font-color);
      position: relative;

      p {
        letter-spacing: 5px;
        font-size: 30px;
        font-family: system-ui;
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
        width: 570px;
        height: 45px;
        border-radius: 10px;
        background: var(--bookmark-bg-color);
        padding-right: 10px;
        border: 2px solid var(--bookmark-border-color);

        &.lightBorder {
          border: 2px solid var(--bookmark-border-color);
          // border-bottom: none;

          .container-search-panel {
            border: 2px solid var(--bookmark-border-color);
            border-top: none;
          }
        }

        &.noBorderBottoRadius {
          border-bottom-left-radius: 0px;
          border-bottom-right-radius: 0px;
          border-bottom: none;
        }

        input {
          width: 520px;
          border: none;
          padding: 0;
          background: var(--bookmark-bg-color);
          color: var(--font-color);
          // transition: background 0.2s ease-in-out;
        }

        .prefix {
          padding-left: 3px;
          position: relative;

          svg {
            width: 1.2em;
            height: 1.2em;
            color: var(--svg-color);
          }

          padding-right: 10px;
        }

        .suffix {
          width: 40px;
          padding-right: 8px;

          &:hover {
            animation: floatX 1s infinite ease-in-out alternate;
          }

          svg {
            width: 1.4em;
            height: 1.4em;
          }
        }
      }

      &-panel {
        position: absolute;
        top: 146px;
        left: 0;
        transition: height 0.35s ease-in-out;
        padding: 10px;
        color: var(--font-color);
        font-size: 14px;
        height: max-content;
        // max-height: 445px;
        overflow: auto;
        .scrollbar-hide();
        z-index: 10;
        border-top: 1.6px solid var(--bookmark-border-color);
        background: var(--bookmark-bg-color);
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        border: 2px solid var(--bookmark-border-color);

        p {
          cursor: pointer;
          transition: all 0.1s;
          border-radius: 6px;
          padding: 7px;
          align-items: center;
          width: 546px;
          .text-ellipsis();

          &:not(:last-child) {
            margin-bottom: 5px;
          }

          &.active,
          &:hover {
            background: var(--bookmark-hover-color)
          }
        }

        &.engines {
          svg {
            width: 1.2em;
            height: 1.2em;
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
  }
}

@keyframes floatY {

  50% {
    transform: translateY(-5px)
  }

  100% {
    transform: translateY(5px)
  }
}

@keyframes floatX {
  50% {
    transform: translateX(-5px);
  }

  100% {
    transform: translateX(5px)
  }
}
</style>
