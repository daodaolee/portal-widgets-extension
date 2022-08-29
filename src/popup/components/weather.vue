<template>
  <div class="weather">
    <div class="weather-now flex flex-center flex-column" @click="toWeather">
      <svg-icon :name="currentWeatherMode[nowData.weather]" />
      <span>{{ nowData.temperature || "-" }}℃</span>
    </div>
    <div class="weather-future">
      <div class="weather-future-item flex flex-between-center" v-for="(day, index) in futureData" :key="index">
        <p class="flex flex-between-center flex-column">
          <svg-icon :name="weatherRange['day'][day.dayweather]" />
          <span>{{ day.daytemp }}</span>
        </p>
        <p class="flex flex-between-center  flex-column">
          <svg-icon :name="weatherRange['night'][day.nightweather]" />
          <span>{{ day.nighttemp }}</span>
        </p>

      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { getCityInfo, getWeatherAll, getWeatherNow } from '../../axios/api'
import { weatherMode } from '../../utils/tools'
import { weatherRange } from '../../global'
const currentWeatherMode = weatherRange[weatherMode()]

let futureData = ref([])
let nowData = ref({})
async function getAdcode() {
  const { status: cityStatus, data: cityResp } = await getCityInfo()
  if (cityStatus === 200) {
    return cityResp.adcode
  } else {
    alert('城市获取失败')
    return false
  }
}
async function getWeatherRange(adcode) {
  const { status: weatherStatus, data: weatherResp } =
    await getWeatherAll(adcode)
  if (weatherStatus === 200) {
    futureData.value = weatherResp.forecasts[0].casts.slice(1)
  }
}

async function getWeaterNow(adcode) {
  const { status: weatherStatus, data: weatherResp } =
    await getWeatherNow(adcode)
  if (weatherStatus === 200) {
    nowData.value = weatherResp.lives[0]
  }
}

getAdcode().then(adcode => {
  if (adcode) {
    getWeatherRange(adcode)
    getWeaterNow(adcode)
  }
})

function toWeather() {
  window.open("https://www.baidu.com/s?tn=68018901_2_oem_dg&ie=utf-8&wd=天气", '_blank')
}



</script>
<style lang="less" scoped>
.weather {
  position: relative;

  &-now {
    z-index: 2;
    position: relative;
    cursor: pointer;

    svg {
      width: 2.2em;
      height: 2.2em;
    }

    span {
      font-size: 12px;
    }
  }

  &-future {
    position: absolute;
    top: 5px;
    left: 5px;
    z-index: 0;

    &-item {
      width: 46px;
      padding: 5px;
      cursor: pointer;
      transform-origin: 100px 100px;
      transition: all 0.3s;
      position: absolute;
      transform: translate(0, 0);
      opacity: 0;
      font-size: 12px;
    }
  }
}


@keyframes rubberBand {
  0% {
    -webkit-transform: scaleX(1);
    transform: scaleX(1)
  }

  30% {
    -webkit-transform: scale3d(1.25, .75, 1);
    transform: scale3d(1.25, .75, 1)
  }

  40% {
    -webkit-transform: scale3d(.75, 1.25, 1);
    transform: scale3d(.75, 1.25, 1)
  }

  50% {
    -webkit-transform: scale3d(1.15, .85, 1);
    transform: scale3d(1.15, .85, 1)
  }

  65% {
    -webkit-transform: scale3d(.95, 1.05, 1);
    transform: scale3d(.95, 1.05, 1)
  }

  75% {
    -webkit-transform: scale3d(1.05, .95, 1);
    transform: scale3d(1.05, .95, 1)
  }

  to {
    -webkit-transform: scaleX(1);
    transform: scaleX(1)
  }
}

.weather-now:hover {
  animation: rubberBand 1s ease-in-out forwards;
}

.weather-now:hover+.weather-future {
  .weather-future-item {

    &:nth-child(1) {
      transform: translate(40px, -60px);
      transition-delay: 0.41s;
      opacity: 1;
    }

    &:nth-child(2) {
      transition-delay: 0.44s;
      transform: translate(70px, 0px);
      opacity: 1;
    }

    &:nth-child(3) {
      transition-delay: 0.48s;
      transform: translate(40px, 60px);
      opacity: 1;
    }
  }
}
</style>
