<template>
  <div class="app-container">
    <div class="search-wrap">
      <div><el-input v-model="listQuery.areaName" placeholder="输入关键词" /></div>
      <div><el-button type="primary" @click="search">搜索</el-button></div>
      <div><el-button type="primary" @click="toCreate">创建</el-button></div>
    </div>
    <div class="table">
      <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
        <el-table-column label="编号" width="110">
          <template slot-scope="scope">{{ scope.row.areaCode }}</template>
        </el-table-column>
        <el-table-column label="名称" align="center">
          <template slot-scope="scope">
            <router-link :to="{ name: 'subAreaList', params: {pId: scope.row.areaCode}}" active-class="active">{{ scope.row.areaName }}</router-link>
          </template>
        </el-table-column>
        <el-table-column align="center" label="排序值" width="200">
          <template slot-scope="scope">{{ scope.row.orderBy }}</template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="toEdit(scope.row.areaCode)">编辑</el-button>
            <el-button size="mini" type="danger" @click="remove(scope.row.areaCode)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { areaList, removeByCode } from '@/api/base/areaInfo'

export default {
  name: 'AreaList',
  data() {
    return {
      list: null,
      listLoading: true,
      listQuery: {
        pId: this.$route.params.pId,
        areaName: ''
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
      if (!this.listQuery.pId) {
        this.listQuery.pId = 0
      }
      areaList(this.listQuery.pId).then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    toCreate() {
      this.$router.push({ path: '/base/areaAdd/' + this.listQuery.pId })
    },
    remove(code) {
      removeByCode(code).then(() => {
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
