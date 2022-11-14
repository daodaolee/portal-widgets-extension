// api.ts
import { Request } from './request'

export function getCityInfo() {
  return Request.get(
    'https://restapi.amap.com/v3/ip?key=${高德Key}&output=json'
  )
}

export function getWeatherAll(city) {
  return Request.get(
    `https://restapi.amap.com/v3/weather/weatherInfo?key=${高德Key}&city=${city}&extensions=all`
  )
}
export function getWeatherNow(city) {
  return Request.get(
    `https://restapi.amap.com/v3/weather/weatherInfo?key=${高德Key}&city=${city}&extensions=base`
  )
}
export function getWeibo() {
  return Request.get('https://api.vvhan.com/api/wbhot')
}

// export default class api {
//   /* api接口模块 */
//   cityInfo {
//     get: () =>
//       Request.get(
//         'https://restapi.amap.com/v3/ip?key=78b177c7430f35b6d38c1739dd6895fc&output=json'
//       )
//   }

//   weather = {
//     getAll: city =>
//       Request.get(
//         `https://restapi.amap.com/v3/weather/weatherInfo?key=78b177c7430f35b6d38c1739dd6895fc&city=${city}&extensions=all`
//       ),
//     getNow: city =>
//       Request.get(
//         `https://restapi.amap.com/v3/weather/weatherInfo?key=78b177c7430f35b6d38c1739dd6895fc&city=${city}&extensions=base`
//       )
//   }

//   weibo = {
//     get: () => Request.get(`https://api.vvhan.com/api/wbhot`)
//   }
// }
