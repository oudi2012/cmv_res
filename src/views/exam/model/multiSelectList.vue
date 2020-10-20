<template>
  <div class="app-container">
    <div class="search-wrap">
      <div>
        <el-form :inline="true" :model="listQuery">
          <el-form-item label="关键词：">
            <el-input v-model="listQuery.name" placeholder="输入关键词" />
          </el-form-item>
        </el-form>
      </div>
      <div><el-button type="primary" @click="search">搜索</el-button></div>
      <div><el-button type="primary" @click="toCreate">创建</el-button></div>
    </div>
    <div class="table">
      <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
        <el-table-column align="center" label="编号" width="50">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="题目/类型" width="400">
          <template slot-scope="scope">
            <div class="multi-data">
              <span>题目:{{ scope.row.title }}</span>
              <span>类型:{{ scope.row.qusType | qusTypeName }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="选项" align="center">
          <template slot-scope="scope">
            <div class="multi-data">
              <span v-for="(item, index) in scope.row.selectQuestionOptionList" :key="item.id">{{ optionItemName(item.title, index) }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="答案/难度" width="200">
          <template slot-scope="scope">
            <div class="multi-data">
              <span>答案:{{ scope.row.answers }}</span>
              <span><el-rate v-model="scope.row.hardLevelId" disabled text-color="#ff9900" score-template="{starValue}" /></span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="年级/科目" width="200">
          <template slot-scope="scope">
            <div class="multi-data">
              <span>年级:{{ scope.row.gradeName }}</span>
              <span>科目:{{ scope.row.subjectName }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="toEdit(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="danger" @click="remove(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="fetchData" />
    </div>
  </div>
</template>

<script>
import { pageSelect, removeSelect } from '@/api/exam/selectQuestion'
import { formatDate } from '@/utils/date'
import Pagination from '@/components/Pagination/index'
import { getChar } from '@/api/base/base'

export default {
  name: 'SelectQuestionList',
  components: { Pagination },
  filters: {
    dateFormat(time) {
      const date = new Date(time * 1000)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    },
    qusTypeName(type) {
      if (type === 10) {
        return '单选'
      } else {
        return '多选'
      }
    },
    cutStr(value) {
      if (value.length > 60) {
        return value.substr(0, 60)
      }
    }
  },
  data() {
    return {
      showCreate: false,
      hardLevelId: 1,
      selectQuestionOptionList: [],
      list: [],
      listLoading: true,
      total: 0,
      listQuery: {
        name: '',
        pageIndex: 1,
        pageSize: 20
      },
      starValue: 1
    }
  },
  inject: ['reload'],
  created() {
    this.fetchData()
  },
  methods: {
    search() {
      this.$message({
        message: '嘿嘿...该功能不能使用',
        type: 'error'
      })
    },
    fetchData() {
      this.listLoading = true
      pageSelect(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
      })
    },
    optionItemName(name, index) {
      return getChar(index + 1) + ' . ' + name
    },
    toCreate() {
      this.$router.push({ path: '/exam/selectQuestionAdd' })
    },
    toEdit(id) {
      this.$router.push({ path: '/exam/selectQuestionEdit/' + id })
    },
    remove(id) {
      const idVo = {
        id: id
      }
      removeSelect(idVo).then(() => {
        this.listLoading = false
        this.reload()
      })
    }
  }
}
</script>

<style scoped>
  .search-wrap{
    display: flex;
  }
  .search-wrap>div{
    margin-right: 20px;
  }
  .table {
    margin-top: 20px;
  }
  .multi-data > span{
    width: 100%;
    height: 30px;
    padding: 5px;
    text-align: left;
    float: left;
    border-bottom: 1px solid #cccccc;
  }
</style>
