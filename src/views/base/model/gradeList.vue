<template>
  <div class="app-container">
    <div class="search-wrap">
      <div><el-input v-model="listQuery.name" placeholder="输入关键词" /></div>
      <div><el-button type="primary" @click="search">搜索</el-button></div>
      <div><el-button type="primary" @click="toCreate">创建</el-button></div>
    </div>
    <div class="table">
      <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
        <el-table-column label="编号" width="110">
          <template slot-scope="scope">{{ scope.row.gradeId }}</template>
        </el-table-column>
        <el-table-column label="名称" align="center">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column align="center" label="状态" width="200">
          <template slot-scope="scope">{{ scope.row.state }}</template>
        </el-table-column>
        <el-table-column align="center" label="排序编号" width="200">
          <template slot-scope="scope">{{ scope.row.orderNo }}</template>
        </el-table-column>
        <el-table-column align="center" label="创建时间" width="200">
          <template slot-scope="scope">{{ scope.row.createTime | dateFormat }}</template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="toEdit(scope.row.gradeId)">编辑</el-button>
            <el-button size="mini" type="danger" @click="remove(scope.row.gradeId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { listGrade, removeGrade } from '@/api/base/gradeInfo'
import { formatDate } from '@/utils/date'

export default {
  name: 'GradeList',
  filters: {
    dateFormat(time) {
      const date = new Date(time * 1000)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      listQuery: {
        name: ''
      }
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
      listGrade().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    toCreate() {
      this.$router.push({ path: '/base/gradeAdd' })
    },
    remove(gradeId) {
      removeGrade(gradeId).then(() => {
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
  .table{
    margin-top: 20px;
  }
</style>
