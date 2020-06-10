<!--
 * @Descripttion:
 * @Date: 2020-06-03 20:38:31
 * @LastEditTime: 2020-06-10 15:05:22
-->
<template>
  <div>
    <bread-curmb>
      <el-breadcrumb-item slot="parentPath">用户查询</el-breadcrumb-item>
      <el-breadcrumb-item slot="childPath">信息中心</el-breadcrumb-item>
    </bread-curmb>

    <div class="menu-box">
      <i class="el-icon-s-fold"></i>
      <el-button  :class="[isSelect === 1 ? 'select': 'default']"  @click="commentList">评论查询</el-button>
      <el-button  :class="[isSelect === 2 ? 'select': 'default']"  @click="replyList">回复查询</el-button>
    </div>

    <div class="content-box">
      <MyListTable :query-option="data.options" ref="dataList" :api="userInfoCenter" :keyParam="data.key">
        <el-table-column fixed sortable label="序号" type="index" align="center" min-width="73px" />

        <el-table-column v-if="isSelect === 1" label="内容" align="center" min-width="120px" class="content">
          <template slot-scope="scope">
            <el-popover
              placement="bottom-start"
              width="180"
              trigger="hover"
              visible-arrow
              :content="scope.row.messageNotice"
            >
              <span class="content-hover" slot="reference">{{scope.row.messageNotice}}</span>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column
          v-if="isSelect === 1"
          label="归属地区"
          align="center"
          min-width="110px"
          class="content"
          prop="isOversea"
        />
        <el-table-column v-if="isSelect === 1" sortable label="发送时间" align="center" prop="messageTime" min-width="120px" />
        <el-table-column v-if="isSelect === 1" label="是否显示" align="center" min-width="70px" class="content">
          <template slot-scope="scope">
            <span :class="scope.row.showColor">{{scope.row.isShow}}</span>
          </template>
        </el-table-column>

        <el-table-column v-if="isSelect === 1" label="是否已读" align="center" min-width="70px" class="content">
          <template slot-scope="scope">
            <span :class="scope.row.readColor">{{scope.row.readState}}</span>
          </template>
        </el-table-column>

        <el-table-column :label="item.label" align="center" :prop="item.prop"
          :min-width="item.width" v-for="(item, index) in data.table" :key="index"/>

      </MyListTable>
    </div>
  </div>
</template>

<script>
import BreadCurmb from '@/components/BreadCurmb'
import MyListTable from '@/components/MyListTable'
import { userInfoCenter, gameCommentReplies } from '@/api/about/aboutData'
import Cookies from 'js-cookie'

export default {
  components: { BreadCurmb, MyListTable },
  data () {
    return {
      isSelect: 1,
      data: {
        key: 'userMessageCenterMessages',
        options: [
          { type: 'input', prop: 'gameName', label: '游戏名称', width: 170 },
          { type: 'datetimeRange', startProp: 'beginTime', endProp: 'endTime', label: '点评时间' }
        ],
        table: [
          { label: '是否显示', prop: 'isShow', width: '100px' }
        ]
      },
      initData: ''
    }
  },
  mounted () {
    this.initData = Object.assign({}, this.data)

    // 测试一下cookie，可以发请求
    Cookies.set('cs_manager_info', '%7B%22groupId%22%3A1%2C%22adminId%22%3A207%2C%22adminUserName%22%3A%22huxiangqi%22%2C%22adminName%22%3A%22%E8%83%A1%E6%B9%98%E9%BA%92%22%2C%22isEffective%22%3A1%7D')
    Cookies.set('cs_session_id', '90948B7829761A18F1368A07565B231A')
    Cookies.set('JSESSIONID', '90948B7829761A18F1368A07565B231A')
    Cookies.set('SERVERID', 'e5eab36724676dfee702be172aab2b55|1591770458|1591769835')
    Cookies.set('acw_tc', '76b20ffe15917698353962420e1253028a72a0e3fbd85adcb6d6508f691256')
    Cookies.set('x7sy_token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhZG1pbl9pZCI6IjIwNyIsImFkbWluX3VzZXJpZCI6Imh1eGlhbmdxaSIsImFkbWluX25hbWUiOiJcdTgwZTFcdTZlNThcdTllOTIiLCJsYXN0bG9naW50aW1lIjoiMTU2Njk4MTgxMiIsImdyb3VwX3B1cnZpZXciOnsiIjowfSwiaXNfc3RhdGUiOiIxIiwiZ3JvdXBfaWQiOiIxIiwiZ3JvdXBfbmFtZSI6MSwibGFzdGxvZ2luaXAiOiIxOTIuMTY4LjMuMTI2IiwiZ3JvdXBfaXNfc3RhdGUiOiJcdThkODVcdTdlYTdcdTdiYTFcdTc0MDZcdTU0NThcdTdlYzQiLCJBZG1pbkZvbGRlciI6Im1hbmFnZV9nYW1lIn0.KnQ4TvfCcexIjYwMH3x7pUY2iClyyVR2WtL7EwsRpUc')
    Cookies.set('aliyungf_tc', 'AQAAAJaxmwNCLAcAmTOZDrZ9UJYHkZ8O')
  },
  computed: {
    userInfoCenter: () => userInfoCenter
  },
  methods: {
    // 第一个按钮
    commentList () {
      this.isSelect = 1
      // 修改api
      this.$refs.dataList.newApi = userInfoCenter
      this.data = Object.assign({}, this.initData)
      this.$refs.dataList.getList()
    },
    // 第二个按钮
    replyList () {
      this.isSelect = 2
      this.$refs.dataList.newApi = gameCommentReplies
      this.data = {
        key: 'gameCommentReplies',
        options: [
          { type: 'input', prop: 'taskId', label: '任务ID', width: 170 },
          { type: 'input', prop: 'mid', label: '用户名ID', width: 170 },
          { type: 'datetimeRange', startProp: 'beginTime', endProp: 'endTime', label: '时间' }
        ],
        table: [
          { label: '用户ID', prop: 'mid', width: '120px' },
          { label: '回复账号', prop: 'userName', width: '120px' },
          { label: '回复时间', prop: 'replyTime', width: '150px' },
          { label: '奖励', prop: 'rewardVirtualMoney', width: '100px' },
          { label: 'Install_ID', prop: 'installId', width: '120px' }
        ]
      }
      this.$refs.dataList.getList()
    }
  }
}
</script>
<style lang='scss' scoped>
@import "src/style/index.scss";
</style>
