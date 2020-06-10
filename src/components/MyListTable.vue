<!--
 * @Descripttion:
 * @Date: 2020-06-10 09:47:43
 * @LastEditTime: 2020-06-10 15:05:59
-->
<template>
  <div class="mylistTable">
    <!-- 查询 -->
    <el-form ref="tableForm" :model="queryForm" label-width="80px">
      <el-form-item
        :v-if="queryOption && queryOption.length"
        v-for="(item,index) in queryOption"
        :key="item.prop"
        :label="item.label"
      >
        <el-input
          v-if="item.type === 'input'"
          v-model="queryForm[item.prop]"
          clearable
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

      <el-form-item>
        <el-button type="primary" @click="handleFilter" icon="el-icon-search">查询</el-button>
        <el-button type="danger" @click="resetForm('tableForm')" icon="el-icon-delete">清空</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格数据，需要对数据进行转换操作 -->
    <el-table :data="list" style="width: 100%" ref="listTable" @row-click="handleRowClick">
      <slot></slot>
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
import datePicker from '../utils/dataPicker'

export default {
  props: {
    api: {
      type: Function,
      required: true
    },
    keyParam: {
      type: String
    },
    queryOption: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      queryForm: {}, // 通过传值options，然后加属性进来的
      currentPage: 1,
      // 时间快捷选择
      pickerOptions: {
        shortcuts: datePicker
      },
      dateRange: {},
      // api重定义
      newApi: this.api,
      list: [],
      total: 0,
      pageSize: 10,
      pageNum: 1
    }
  },

  created () {
    this.getList()
  },

  methods: {
    handleRowClick (row) {
      this.$emit('row-click', row)
    },
    // 分页的每页条数切换
    handleSizeChange (val) {
      this.pageSize = val
      this.getList()
    },
    // 跳转到第几页
    handleCurrentChange (val) {
      this.pageNum = val
      this.getList()
    },
    // 查询
    handleFilter () {
      console.log(this.queryForm)
    },
    // 清空，这里还不行，有问题
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    // 时间选择器，转换成属性
    handleDateRangeChange (val, item) {
      if (val) {
        this.queryForm[item.startProp] = val[0]
        this.queryForm[item.endProp] = val[1]
      } else {
        this.queryForm[item.startProp] = ''
        this.queryForm[item.endProp] = ''
      }
    },
    // 获取数据
    getList () {
      this.newApi(
        {
          pageSize: this.pageSize,
          pageNum: this.pageNum,
          mid: 1005,
          uid: 1005
        }
      ).then(res => {
        this.list = res.data[this.keyParam]
        this.total = res.data.totalNum
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.el-pagination {
  padding-top: 10px;
}
.el-form {
  display: flex;
  flex-direction: row;
}
.mylistTable {
  padding: 15px;
  background-color: rgb(249, 249, 249);
}
</style>
