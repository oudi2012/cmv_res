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
        <el-table-column label="编号">
          <template slot-scope="scope">{{ scope.row.subjectId }}</template>
        </el-table-column>
        <el-table-column label="名称">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="标题">
          <template slot-scope="scope">{{ scope.row.title }}</template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="toEdit(scope.row.subjectId)">编辑</el-button>
            <el-button size="mini" type="danger" @click="remove(scope.row.subjectId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { listSubject, removeSubject } from '@/api/book/subjectInfo'

export default {
  name: 'SubjectList',
  data() {
    return {
      list: [],
      listLoading: true,
      listQuery: {
        name: '',
        pageIndex: 1,
        pageSize: 20
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
      listSubject().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    toCreate() {
      this.$router.push({ path: '/book/subjectAdd' })
    },
    toEdit(id) {
      this.$router.push({ path: '/book/subjectEdit/' + id })
    },
    remove(id) {
      const idVo = {
        id: id
      }
      removeSubject(idVo).then(() => {
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
