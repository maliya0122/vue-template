/*
 * @Descripttion:
 * @Date: 2020-06-03 17:03:32
 * @LastEditTime: 2020-06-09 09:49:33
 */
export default [
  {
    path: 'about',
    name: '关于',
    children: [
      {
        path: 'about1',
        name: 'about1',
        children: [
          {
            path: 'about11',
            name: 'about11'
          }
        ]
      },
      {
        path: 'about2',
        name: 'about2',
        children: [
          {
            path: 'about21',
            name: 'about21'
          },
          {
            path: 'about22',
            name: 'about22'
          },
          {
            path: 'about23',
            name: 'about23'
          }
        ]
      },
      {
        path: 'about3',
        name: 'about3',
        children: [
          {
            path: 'about33',
            name: 'about33'
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
      }
    ]
  },
  {
    path: 'system-data',
    name: '系统数据',
    children: [
      {
        path: 'ad-data',
        name: '广告数据'
      },
      {
        path: 'game-data',
        name: '游戏数据'
      }
    ]
  }
]
