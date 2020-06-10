/*
 * @Descripttion:
 * @Date: 2020-06-09 10:24:17
 * @LastEditTime: 2020-06-09 10:24:45
 */
import { parse } from 'qs'
import Mockjs from 'mockjs'

export const requestWrapper = (cb) => {
  return (config) => {
    console.log(`request ${config.url}:`, parse(config.body, { allowDots: true }))
    const result = Mockjs.mock(cb())
    console.log('response:', result)
    return result
  }
}
