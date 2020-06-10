/*
 * @Descripttion:
 * @Date: 2020-06-09 10:14:34
 * @LastEditTime: 2020-06-10 13:53:49
 */
import fetch from '../../utils/fetch'

// 消息中心
export const userInfoCenter = data => fetch({ method: 'get', url: '/user-message-center-messages', params: data })
// 用户游戏点评回复列表
export const gameCommentReplies = data => fetch({ method: 'get', url: '/user-game-comment-replies', params: data })
