<template>
  <div>
    <!-- 查询条件 -->
    <el-form inline :model="queryForm" ref="tableForm">
      <div class="tool-bar">
        <div>
          <!-- 下面的slot是临时兼容 -->
          <el-form-item v-if="$slots.formHeader">
            <slot name="formHeader"></slot>
          </el-form-item>
          <el-form-item
            :v-if="queryOption && queryOption.length"
            v-for="(item, index) in queryOption"
            :key="item.prop"
            :label="item.label"
          >
            <el-input
              v-if="item.type === 'input'"
              v-model="queryForm[item.prop]"
              clearable
              @keyup.native.enter="handleFilter"
              placeholder="请输入"
              :style=" item.width ? `width: ${item.width}px;` : ''"
            ></el-input>

            <template v-else-if="item.type === 'range'">
              <el-input-number
                v-model="queryForm[item.prop][0]"
                :precision="2"
                :step="1.0"
                :min="item.min"
                :max="item.max"
                :controls="false"
                :style=" item.width ? `width: ${item.width}px;` : ''"
              ></el-input-number>~
              <el-input-number
                v-model="queryForm[item.prop][1]"
                :precision="2"
                :step="1.0"
                :min="item.min"
                :max="item.max"
                :controls="false"
                :style=" item.width ? `width: ${item.width}px;` : ''"
              ></el-input-number>
            </template>

            <el-date-picker
              v-else-if="item.type === 'date'"
              v-model="queryForm[item.prop]"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期"
              :style=" item.width ? `width: ${item.width}px;` : ''"
            />
            <el-select
              v-else-if="item.type === 'select'"
              v-model="queryForm[item.prop]"
              :multiple="item.multiple"
              clearable
              placeholder="全部"
              :style=" item.width ? `width: ${item.width}px;` : ''"
            >
              <el-option
                v-for="item2 in item.dict"
                :key="item.dictValueProp ? item2[item.dictValueProp] : item2.value"
                :label="item.dictLabelProp ? item2[item.dictLabelProp] : item2.label"
                :value="item.dictValueProp ? item2[item.dictValueProp] : item2.value"
              ></el-option>
            </el-select>
            <el-date-picker
              v-else-if="item.type === 'datetimeRange'"
              v-model="dateRange['tmp' + index]"
              @change="handleDateRangeChange(dateRange['tmp' + index], item)"
              value-format="yyyy-MM-dd HH:mm:ss"
              :default-time="['00:00:00', '23:59:59']"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
            ></el-date-picker>
            <el-date-picker
              v-else-if="item.type === 'dateRange'"
              v-model="dateRange['tmp' + index]"
              @change="handleDateRangeChange(dateRange['tmp' + index], item)"
              :value-format="`yyyy-MM-dd${item.defaultTime === false ? '' : ' HH:mm:ss'}`"
              :default-time="['00:00:00', '23:59:59']"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
            <el-time-picker
              v-else-if="item.type === 'timeRange'"
              v-model="dateRange['tmp' + index]"
              @change="handleDateRangeChange(dateRange['tmp' + index], item)"
              is-range
              arrow-control
              value-format="HH:mm:ss"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
            ></el-time-picker>
          </el-form-item>
          <el-form-item v-if="queryOption && queryOption.length">
            <el-button type="primary" @click="handleFilter" icon="el-icon-search">查询</el-button>
            <el-button type="danger" @click="handleClear" icon="el-icon-delete">清空</el-button>
          </el-form-item>
          <el-form-item v-if="$slots.leftBtn">
            <slot name="leftBtn"></slot>
          </el-form-item>
        </div>
        <div>
          <el-form-item v-if="$slots.rightBtn">
            <slot name="rightBtn"></slot>
          </el-form-item>
        </div>
      </div>
    </el-form>

    <!-- 表格数据展示 -->
    <el-table
      :max-height="tableHeight"
      v-loading="showLoading"
      element-loading-text="稍等一会儿"
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
      @row-click="handleRowClick"
      :span-method="spanMethod"
      ref="listTable"
    >
      <slot></slot>

      <el-table-column label="操作" align="center" min-width="170px" class="content">
        <el-button size="small" class="btn">修改</el-button>
        <el-button size="small" class="btn">删除</el-button>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination
        style="padding: 10px "
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { timeCurrency, banReq, _searchRequest } from '../utils/timeCurrency'

import datePicker from '../utils/dataPicker'

export default {
  props: {
    // getList需要的api
    api: {
      type: Function,
      required: true
    },
    queryOption: {
      type: Array,
      default: () => []
    },
    constantQuery: {
      type: Object,
      default: () => ({})
    },
    defaultQuery: {
      type: Object,
      default: () => ({})
    },
    // 数据处理
    dataHandler: {
      type: Function
    },
    submitHandler: {
      type: Function
    },
    spanMethod: {
      type: Function
    },
    keyParam: {
      type: String
    }
  },
  data () {
    return {
      overallSearch: this.$route.query ? this.$route.query : '', // 全局搜索
      // api重定义
      newApi: this.api,
      keys: this.key,
      queryForm: {},
      dateRange: {},
      list: [],
      total: 0,
      pageSize: 10,
      pageNum: 1,
      showLoading: false,
      argumentId: '', // 页面带参数id进行查询
      ready: false, // 判断是否mounted
      pageChange: true, // hack: 避免因page改变导致触发 handleCurrentChange 事件,

      // 存储上一时间值
      oldTime: [],

      // 时间快捷选择
      pickerOptions: {
        shortcuts: datePicker
      }
    }
  },
  computed: {
    // 计算表格高度
    tableHeight () {
      let tableFormHeight = 0
      if (this.ready) {
        tableFormHeight = this.$refs.tableForm.$el.clientHeight
      }
      const height =
        document.documentElement.clientHeight -
        (60 + 50 + 32 + 30 + tableFormHeight + 20 * 2 + 1)
      if (height <= 500) return 500
      else return height
    }
  },
  watch: {
    // search：查询数据
    '$store.state.search': {
      handler (val, oldVal) {
        if (val.searchData) {
          this.overallSearch = Object.assign(
            {},
            { ...val.searchData, uid: this.$store.getters.searchQuery }
          )
        }
        if (val.isSearch) {
          this.getList()
          this.$store.dispatch('EndSearch')
          // 全局搜索 消费记录统计部分调用
          this.$emit('userConsumeTotal', {
            ...this.queryForm,
            ...this.overallSearch,
            uid: this.$store.getters.searchQuery
          })
        }
      },
      deep: true
    },
    // 行为日志联级筛选
    'queryForm.logType': {
      // 登录 0 其他 -1
      handler (val, oldVal) {
        this.$emit('logTypeChange', val)
        if (this.queryForm.behaviorType && val !== oldVal) {
          this.$set(this.queryForm, 'behaviorType', '')
        }
      },
      deep: true
    },
    queryOption () {
      this.queryFormDefaultHandler()
    }
  },
  methods: {
    // 列表多选
    handleSelectionChange (selection) {
      this.$emit('selection-change', selection)
    },
    handleRowClick (row) {
      this.$emit('row-click', row)
    },
    // 获取数据
    getList (pageInfo) {
      // 全局搜索换块置空
      let overallSearch = this.overallSearch

      if (this.$store.state.search.diffFlag) {
        overallSearch = {}
        this.$store.dispatch('DelSearch')
      }

      if (!banReq(this.$route.query, this.$route.name)) return

      // 多页面部分有需要mid进行查询的排除
      let funcApi = this.newApi.toString().substr('function'.length)
      funcApi = funcApi.substr(0, funcApi.indexOf('(')).replace(/\s+/g, '')
      if (
        _searchRequest.indexOf(funcApi) > -1 &&
        !(
          this.$route.query.mid ||
          this.$route.query.userName ||
          this.$route.query.phone
        )
      ) { return }

      let queryForm = this.queryForm

      // 初始结束时间处理，用户部分用的和游戏部分字段不同
      if (this.oldTime[0] !== queryForm.beginTime && queryForm.beginTime) {
        queryForm.beginTime = timeCurrency(queryForm.beginTime) / 1000
      }
      if (this.oldTime[0] !== queryForm.startTime && queryForm.startTime) {
        queryForm.startTime = timeCurrency(queryForm.startTime) / 1000
      }
      if (this.oldTime[1] !== queryForm.endTime && queryForm.endTime) {
        queryForm.endTime = timeCurrency(queryForm.endTime) / 1000
      }
      if (this.$route.path.split('/')[2] === 'game-search') {
        this.oldTime = [queryForm.startTime, queryForm.endTime]
      } else {
        this.oldTime = [queryForm.beginTime, queryForm.endTime]
      }

      pageInfo = Object.assign(
        {},
        { pageNum: this.pageNum, pageSize: this.pageSize },
        pageInfo
      )
      if (this.submitHandler) {
        queryForm = this.submitHandler(this.queryForm)
      }
      this.showLoading = true

      // 去掉input 空格
      for (const key in queryForm) {
        if (typeof queryForm[key] === 'string') {
          queryForm[key] = queryForm[key].replace(/(^\s*)|(\s*$)/g, '')
          if (queryForm[key] === '') {
            delete queryForm[key]
          }
        }
      }

      overallSearch = {
        ...overallSearch,
        uid: this.$store.getters.searchQuery
      }

      if (
        this.$route.path === '/kfxt/user-search/chat-search/chat-control' &&
        !queryForm.groupName
      ) {
        this.$notify.error({
          title: '查询失败',
          message: '群组名称不能为空'
        })
      }
      // queryForm.groupName 为针对群聊信息监控所传参数
      return this.newApi(
        { ...pageInfo, ...overallSearch, ...queryForm },
        queryForm.groupName
      )
        .then(result => {
          let list

          for (const key in result.data) {
            if (key === this.keyParam) {
              list = result.data[key]
              break
            }
          }

          let total = result.data.totalNum
          if (this.dataHandler) {
            const data = this.dataHandler(result.data)
            data && (list = data)
            result.totalNum && (total = result.totalNum)
          }

          this.list = list
          this.total = total

          this.pageNum = pageInfo.pageNum
          this.pageSize = pageInfo.pageSize

          this.showLoading = false
        })
        .catch(e => {
          this.list = []
          const errMap = [
            '请求参数缺失',
            '管理员不存在，权限不足！',
            '群组名称不能为空'
          ]
          if (errMap.indexOf(e.message) !== -1) {
            this.$notify.error({
              title: '查询失败',
              message: `${e.message}`
            })
          } else {
            this.$notify.error({
              title: '列表查询失败',
              message: `${e.message}`
            })
          }
          this.showLoading = false
        })
    },
    // 查询按钮
    handleFilter () {
      // 再次查询去query中表所携带的参数
      try {
        this.pageChange = false
        if (this.$store.state.search.searchData) {
          const searchData = this.$store.state.search.searchData
          // 无查询的sql块直接跳转
          if (this.$route.path.split('/')[2] === 'common-search') {
            this.$router.push(`${this.$route.path}`)
          } else {
            let keyList = ''
            for (const key in searchData) {
              if (key) {
                keyList += `&${key}=${searchData[key]}`
              } else {
                this.$router.push(`${this.$route.path}`)
                break
              }
            }
            this.$router.push(`${this.$route.path}?${keyList}`)
          }
        }
        this.getList({ pageNum: 1 }).then(() => {
          this.pageChange = true
        })
      } catch (error) {}
      // 全局搜索 消费记录统计部分调用
      this.$emit('userConsumeTotal', {
        ...this.overallSearch,
        ...this.queryForm
      })
    },
    handleDateRangeChange (val, item) {
      if (val) {
        this.queryForm[item.startProp] = val[0]
        this.queryForm[item.endProp] = val[1]
      } else {
        this.queryForm[item.startProp] = ''
        this.queryForm[item.endProp] = ''
      }
    },
    handleClear () {
      this.queryForm = Object.assign({}, this.constantQuery)
      if (this.submitHandler) {
        this.queryForm.reportId = this.argumentId
      }
      this.queryOption.forEach(item => {
        if (
          (item.type === 'select' && item.multiple) ||
          item.type === 'range'
        ) {
          this.$set(this.queryForm, item.prop, [])
        }
      })
      //! 如果有日期为常驻查询，下面就会有问题
      for (const key in this.dateRange) {
        this.dateRange[key] = null
      }
      // this.handleFilter()
    },
    handleSizeChange (val) {
      this.pageChange = false
      this.getList({ pageSize: val, pageNum: 1 }).then(() => {
        this.pageChange = true
      })
    },
    handleCurrentChange (val) {
      if (this.pageChange) {
        this.getList({ pageNum: val })
      } else {
        this.pageChange = true
      }
    },
    // 没有找到用处
    updateListLoading (showLoading = false) {
      this.showLoading = showLoading
    },
    // 对查询参数进行非空校验
    queryFormDefaultHandler () {
      if (this.queryOption && this.queryOption.length) {
        this.queryOption.forEach(item => {
          if (item.type === 'range' && !item.default) {
            item.default = []
          }
          if (item.default !== undefined) {
            this.queryForm[item.prop] = item.default
          }
        })
      }
    },
    // 初始化函数
    init () {
      // 带参查询
      this.ready = true
      this.queryForm = Object.assign(
        {},
        this.queryForm,
        this.constantQuery,
        this.defaultQuery
      )
      this.getList()
    }
  },
  created () {
    this.queryFormDefaultHandler()
  },
  mounted () {
    // 初始默认值
    this.queryOption.forEach(item => {
      // 代金券不需要默认值
      if (
        item.prop === 'gameType' &&
        this.$route.path !== '/kfxt/user-search/welfare-search/user-coupon'
      ) {
        this.$set(this.queryForm, 'gameType', 1)
      }
      if (item.prop === 'osType' && this.$route.name !== '停运补偿') { this.$set(this.queryForm, 'osType', 1) }
      if (item.prop === 'smallAccountType') { this.$set(this.queryForm, 'smallAccountType', 1) }
      if (item.prop === 'awardType') this.$set(this.queryForm, 'awardType', 1)
      if (item.prop === 'logType') this.$set(this.queryForm, 'logType', 0)
    })
    // 带参数
    if (this.$route.query) {
      for (const key in this.$route.query) {
        this.queryOption.forEach(_item => {
          if (_item.prop === key) {
            if (_item.type === 'select') {
              this.$set(
                this.queryForm,
                `${key}`,
                parseInt(this.$route.query[key])
              )
            } else {
              this.$set(this.queryForm, `${key}`, this.$route.query[key])
            }
          }
        })
      }
    }

    // 加载页面进行是否请求判断 并且群聊监控初始不请求
    if (
      banReq(this.$route.query) &&
      this.$route.path !== '/kfxt/user-search/chat-search/chat-control'
    ) { this.init() }

    if (
      this.$route.path === '/kfxt/user-search/consume-search/consume-record'
    ) {
      // 全局搜索 消费记录统计部分调用
      this.$emit('userConsumeTotal', {
        ...this.overallSearch,
        ...this.queryForm
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.list-table {
  padding-top: 20px !important;
}
.list-table {
  padding: 20px;
}
.tool-bar {
  display: flex;
  justify-content: space-between;
}
.el-pagination {
  text-align: center;
}
.tool-bar div {
  margin-left: 0 !important;
}
</style>
