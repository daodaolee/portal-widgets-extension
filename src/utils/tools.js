// 天气白天和夜间
export function weatherMode() {
  const now = new Date()
  const hour = now.getHours()
  return hour < 19 ? 'day' : 'night'
}
