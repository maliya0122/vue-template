/*
 * @Descripttion: 时间选择快捷键
 * @Date: 2020-06-02 14:33:23
 * @LastEditTime: 2020-06-09 14:12:54
 */
const getTime = (gapTime) => {
  const end = new Date()
  const start = new Date()
  start.setTime(start.getTime() - gapTime)
  return [start, end]
}

// 一天到目前时间
const getDateStamp = () => {
  const curTime = new Date()
  const excessTime = curTime.getHours() * 3600 * 1000 +
      curTime.getMinutes() * 60 * 1000 +
      curTime.getSeconds() * 1000
  return excessTime
}

// 获取当年某个月有多少天
export const curMonthDays = (month) => {
  const monthdaysMap = [
    31, 28, 31, 30, 31, 30,
    31, 31, 30, 31, 30, 31
  ]
  if (new Date().getFullYear() % 4 === 0) {
    monthdaysMap[1] = 29
  }
  if (month >= 1) {
    return monthdaysMap[month - 1]
  }
  return monthdaysMap[11 - month]
}

export default [
  {
    text: '今天',
    onClick (picker) {
      const gapTime = getDateStamp()
      picker.$emit('pick', getTime(gapTime))
    }
  },
  {
    text: '最近一周',
    onClick (picker) {
      const gapTime = 3600 * 1000 * 24 * 7 + getDateStamp()
      picker.$emit('pick', getTime(gapTime))
    }
  },
  {
    text: '最近一个月',
    onClick (picker) {
      const curMonth = new Date().getMonth()
      const gapTime = 3600 * 1000 * 24 * curMonthDays(curMonth) + getDateStamp()
      picker.$emit('pick', getTime(gapTime))
    }
  },
  {
    text: '最近三个月',
    onClick (picker) {
      const curMonth = new Date().getMonth()
      const gapTime = 3600 * 1000 * 24 * (
        curMonthDays(curMonth) + curMonthDays(curMonth - 1) + curMonthDays(curMonth - 2)
      ) + getDateStamp()
      picker.$emit('pick', getTime(gapTime))
    }
  }
]
