<template>
  <div class="news">
    「 &nbsp;<span id="typewrite" @click.stop="(e) => toNews(e)"></span>&nbsp;」
  </div>

</template>
<script setup>
import { ref, onMounted } from 'vue'
import { getWeibo } from '../../axios/api'
import Typed from 'typed.js'
import { useMetaKey } from '../../hooks'

let link = ref('')
const toNews = (e) => {
  window.open(link.value, useMetaKey(e))
}
onMounted(() => {
  getWeibo().then((res) => {
    const { success: status, data } = res.data
    if (status) {

      let titleArr = data.map((item) => item.title)
      const options = {
        strings: titleArr,
        typeSpeed: 80,
        startDelay: 300, //开始之前的延迟300毫秒
        loop: true,
        backDelay: 4000, // 每条的延迟
        onStringTyped(position) {
          link.value = data[position].url
        }
      };
      new Typed(document.querySelector("#typewrite"), options)
    }
  })

});
</script>
<style lang="less" scoped>
.news {
  position: absolute;
  left: 50%;
  bottom: 100px;
  transform: translateX(-50%);
  color: var(--font-color);
  opacity: 0.85;

  &:hover {
    opacity: 1;
  }

  &:hover {
    opacity: 1;
  }

  #typewrite {
    cursor: pointer;
    opacity: 0.85;
    color: var(--font-color);
    transition: all 0.15s ease-in-out;

    &:hover {
      opacity: 1;
    }

  }
}
</style>