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
        <el-table-column align="center" label="头像" width="200">
          <template slot-scope="scope">{{ scope.row.headImage }}</template>
        </el-table-column>
        <el-table-column label="名称/简称/地址">
          <template slot-scope="scope">
            <div class="multi-data">
              <span>名称：{{ scope.row.name }}</span>
              <span>简称：{{ scope.row.shortName }}</span>
              <span>地址：{{ scope.row.address }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="拼音/重点/时间" align="center" width="300">
          <template slot-scope="scope">
            <div class="multi-data">
              <span>拼音：{{ scope.row.pinyin }}</span>
              <span>重点：{{ scope.row.weight | weightFormat }}</span>
              <span>时间：{{ scope.row.createDate | dateFormat }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="toEdit(scope.row.schoolId)">编辑</el-button>
            <el-button size="mini" type="danger" @click="remove(scope.row.schoolId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="fetchData" />
    </div>
  </div>
</template>

<script>
import { pageList, remove } from '@/api/school/schoolInfo'
import { formatDate } from '@/utils/date'
import Pagination from '@/components/Pagination/index'

export default {
  name: 'SchoolList',
  components: { Pagination },
  filters: {
    dateFormat(time) {
      const date = new Date(time * 1000)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    },
    weightFormat(weight) {
      if (weight === '1') {
        return '是'
      } else {
        return '否'
      }
    }
  },
  data() {
    return {
      list: [],
      listLoading: true,
      total: 0,
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
      pageList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
      })
    },
    toCreate() {
      this.$router.push({ path: '/school/schoolAdd' })
    },
    toEdit(schoolId) {
      this.$router.push({ path: '/school/schoolEdit/' + schoolId })
    },
    remove(schoolId) {
      const idVo = {
        id: schoolId
      }
      remove(idVo).then(() => {
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
