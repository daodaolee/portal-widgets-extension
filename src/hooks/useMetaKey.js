/**
 * 判断系统类型
 * @returns 系统型号 win / mac
 */
function systemInfo() {
  var agent = navigator.userAgent.toLowerCase()
  var isMac = /macintosh|mac os x/i.test(navigator.userAgent)
  if (agent.indexOf('win') >= 0 || agent.indexOf('wow32') >= 0) {
    return 'win'
  }
  if (isMac) {
    return 'mac'
  }
}

export default function (e) {
  const info = systemInfo()
  if (info === 'win') {
    return e.ctrlKey ? '_blank' : '_self'
  } else if (info === 'mac') {
    return e.metaKey ? '_blank' : '_self'
  }
}
