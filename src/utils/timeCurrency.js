/*
 * @Date: 2019-11-19 20:07:23
 * @LastEditTime: 2020-06-09 14:13:08
 */
// 时间戳转日期格式过滤函数
export const dateCurrency = (timestamp) => {
  const date = new Date(timestamp * 1000)// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  const Y = date.getFullYear() + '-'
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  const D = date.getDate() + ' '
  const h = date.getHours() + ':'
  const m = date.getMinutes() < 10 ? `0${date.getMinutes()}:` : date.getMinutes() + ':'
  const s = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
  return Y + M + D + h + m + s
}
// 日期转时间戳格式过滤函数
export const timeCurrency = (date) => {
  const timesTamp = new Date(date)
  return Date.parse(timesTamp)
}

// 部分页面可以不依赖全局搜索 页面名称
export const _searchMap = [
  // user
  '行为日志', '消费记录', '封禁记录', '小号回收',
  '邀请记录', '查询列表', '查询记录', '交易记录',
  '首充福利错误日志', '领取礼包', '用户列表'
]
//  不依赖全局查询的多页面中有部分必须全局导出request
export const _searchRequest = ['userPasswordErrorBans', 'transactionReviews', 'smallAccountBannedRecord', 'platfromBlackListLog']

// 全局搜索较验，数据缺失不发请求
export const banReq = (searchData, urlName) => {
  const searchKey = searchData
  let isSea = false
  if (urlName) {
    const searchMap = _searchMap
    searchMap.forEach(item => {
      if (item === urlName) {
        isSea = true
      }
    })
    if (isSea) return true
  }
  for (const key in searchKey) {
    if (searchKey[key] !== '') {
      isSea = true
    }
  }
  if (!isSea) return false
  else return true
}

// 返回当前域名
export const returnDomain = () => {
  const domianStr = document.domain.split('.')
  const domain = domianStr[domianStr.length - 2].concat('.'.concat(domianStr[domianStr.length - 1]))
  return domain
}
