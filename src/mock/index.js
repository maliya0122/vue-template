/*
 * @Descripttion:
 * @Date: 2020-06-09 10:24:09
 * @LastEditTime: 2020-06-10 13:56:29
 */
import Mock from 'mockjs'
import { requestWrapper } from './utils'

import infoCenter from './about/userInfoCenter'
import userComment from './about/userComment'
Mock.setup({
  timeout: '350-600'
})
Mock.mock(/\/user-message-center-messages/, 'get', requestWrapper(infoCenter.getInfoCenter))
Mock.mock(/\/user-game-comment-replies/, 'get', requestWrapper(userComment.userCommentReplies))
