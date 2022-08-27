// 天气白天和夜间
export function weatherMode() {
  const now = new Date()
  const hour = now.getHours()
  return hour < 19 ? 'day' : 'night'
}

/**
 * 上下按键控制选中的条目
 * @param item 当前条目，默认值 -1
 * @param array 所有条目
 * @param e 按键
 */
export function arrowUpDownChange(item, array, e, cb) {
  const up = e.key === 'ArrowUp'
  const down = e.key === 'ArrowDown'
  const length = array.value.length

  if (up) {
    if (item.value === -1 || item.value === 0) {
      // 默认 或者 第一个
      item.value = length - 1
    } else {
      item.value -= 1
    }
  }
  if (down) {
    if (item.value === -1 || item.value === length - 1) {
      // 默认 或者 最后一个
      item.value = 0
    } else {
      item.value += 1
    }
  }
  cb && cb()
}

// 拍平
export function flatData(arr) {
  return [].concat(
    ...arr.map(item => {
      if (item.children) {
        let arr = [].concat(item, ...flatData(item.children))
        delete item.children
        return arr
      }
      return [].concat(item)
    })
  )
}

/**
 * 判断系统类型
 * @returns 系统型号 win / mac
 */
export function systemInfo() {
  var agent = navigator.userAgent.toLowerCase()
  var isMac = /macintosh|mac os x/i.test(navigator.userAgent)
  if (agent.indexOf('win') >= 0 || agent.indexOf('wow32') >= 0) {
    return 'win'
  }
  if (isMac) {
    return 'mac'
  }
}
