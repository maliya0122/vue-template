/*
 * @Descripttion:
 * @Date: 2020-06-03 17:03:32
 * @LastEditTime: 2020-06-08 20:17:25
 */
export default [
  {
    path: 'about',
    name: '关于',
    children: [
      {
        path: 'about1',
        name: '测试',
        children: [
          {
            path: 'about11',
            name: '苹果'
          }
        ]
      },
      {
        path: 'about2',
        name: '三个',
        children: [
          {
            path: 'about21',
            name: '申请'
          },
          {
            path: 'about22',
            name: '游戏'
          },
          {
            path: 'about23',
            name: '话题'
          }
        ]
      },
      {
        path: 'about3',
        name: '33',
        children: [
          {
            path: 'about33',
            name: '申请33'
          }
        ]
      }
    ]
  },
  {
    path: 'common',
    name: '公共',
    children: [
      {
        path: 'log',
        name: '日志'
      },
      {
        path: 'options',
        name: '选项'
      },
      {
        path: 'hehe',
        name: '呵呵'
      }
    ]
  },
  {
    path: 'user',
    name: '用户',
    children: [
      {
        path: 'user1',
        name: '用户1',
        children: [
          {
            path: 'user11',
            name: '用户11'
          }

        ]
      }
    ]
  }
]
