/*
 * @Descripttion:
 * @Date: 2020-06-10 13:54:41
 * @LastEditTime: 2020-06-10 14:03:56
 */
export default {
  userCommentList: () => ({
    userComments: [
      {
        gameName: '西游女儿国【游戏】', // 游戏名字
        commentPictures: ['https://image.x7sy.com/buy/20200324/80283020383752952556517.jpg', 'https://image.x7sy.com/buy/20200324/47151815295291816256517.jpg'], // 点评图片
        commentContent: '11111这是一段内容,这是一段内容,这是一段内容,这是一段内容这是。这是一段内容,这是一段内容,这是一段内容这是这是一段内容,这是一段内容,这是一段内容这是。', // 点评内容
        commentTime: 1590473666, // 点评时间
        userName: 'ip*****78', // 用户名
        rewardVirtualMoney: 0, // 奖励平台币数量
        examineStatus: 1, // 审核状态（-3-待审核,-2-审核失败,-1-审核中,1-审核通过）
        mid: '3787771', // 用户id
        installId: '8837594', // 设备id
        osType: 1, // 系统类型（1-iOS，2-Andriod）
        isShow: 1 // 客户端是否显示(1-显示，-1-不显示)
      },
      {
        gameName: '西游女儿国【游戏】', // 游戏名字
        commentPictures: ['https://image1.x7sy.com/video_folder/comment/20200522/19487382417536635887.mp4'], // 点评图片
        commentContent: '22222这是一段内容,这是一段内容,这是一段内容,这是一段内容。', // 点评内容
        commentTime: 1590473666, // 点评时间
        userName: 'ip*****78', // 用户名
        rewardVirtualMoney: 0, // 奖励平台币数量
        examineStatus: -2, // 审核状态（-3-待审核,-2-审核失败,-1-审核中,1-审核通过）
        mid: '3787771', // 用户id
        installId: '8837594', // 设备id
        osType: 2, // 系统类型（1-iOS，2-Andriod）
        isShow: -1 // 客户端是否显示(1-显示，-1-不显示)
      }
    ],
    totalNum: 200
  }),
  userCommentReplies: () => ({
    gameCommentReplies: [
      {
        gameName: '倩女幽魂【游戏】', // 游戏名字
        replyContent: '22222222222内容,这是一段内容,这是一段内容。', // 回复内容
        replyTime: 1590473666, // 回复时间
        userName: 'ip*****78', // 用户名
        rewardVirtualMoney: 0, // 奖励平台币数量
        examineStatus: -1, // 审核状态（-3-待审核,-2-审核失败,-1-审核中,1-审核通过）
        mid: '3787771', // 用户id
        installId: '8837594', // 设备id
        osType: 1, // 系统类型（1-iOS，2-Andriod）
        isShow: -1 // 客户端是否显示(1-显示，-1-不显示)
      }
    ],
    totalNum: 200
  })
}
