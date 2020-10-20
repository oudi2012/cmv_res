<template>
  <div class="app-container">
    <div class="search-wrap">
      <div>
        <el-form :inline="true" :model="listQuery">
          <el-form-item label="关键词：">
            <el-input v-model="listQuery.name" placeholder="输入关键词" />
          </el-form-item>
          <el-form-item label="科目：">
            <el-select v-model="listQuery.subjectId" value-key="subjectId" size="mini">
              <el-option v-for="item in subjectList" :key="item.subjectId" :label="item.title" :value="item.subjectId" />
            </el-select>
          </el-form-item>
          <el-form-item label="年级：">
            <el-select v-model="listQuery.gradeId" value-key="gradeId" size="mini">
              <el-option v-for="item in gradeList" :key="item.gradeId" :label="item.name" :value="item.gradeId" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div><el-button type="primary" @click="search">搜索</el-button></div>
      <div><el-button type="primary" @click="toCreate">创建</el-button></div>
    </div>
    <div class="table">
      <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
        <el-table-column align="center" label="封面/cip图片" width="200">
          <template slot-scope="scope">
            <div class="multi-data">
              <span>{{ scope.row.coverImage }}</span>
              <span>{{ scope.row.cipImage }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="名称/简称">
          <template slot-scope="scope">
            <div class="multi-data">
              <span>名称：{{ scope.row.bookName }}</span>
              <span>简称：{{ scope.row.shortName }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="年份/卷册" align="center" width="300">
          <template slot-scope="scope">
            <div class="multi-data">
              <span>年份：{{ scope.row.theYear }}</span>
              <span>卷册：{{ scope.row.volume }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="出版社/必选修" align="center" width="300">
          <template slot-scope="scope">
            <div class="multi-data">
              <span>出版社：{{ scope.row.publisher }}</span>
              <span>必选修：{{ scope.row.elective }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="年级/时间" align="center" width="300">
          <template slot-scope="scope">
            <div class="multi-data">
              <span>年级：{{ scope.row.gradeId }}</span>
              <span>时间：{{ scope.row.createDate | dateFormat }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="toEdit(scope.row.bookId)">编辑</el-button>
            <el-button size="mini" type="danger" @click="remove(scope.row.bookId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="fetchData" />
    </div>
  </div>
</template>

<script>
import { pageList, removeBook } from '@/api/book/bookInfo'
import { listSubject } from '@/api/book/subjectInfo'
import { listGrade } from '@/api/base/gradeInfo'
import { formatDate } from '@/utils/date'
import Pagination from '@/components/Pagination/index'

export default {
  name: 'BookList',
  components: { Pagination },
  filters: {
    dateFormat(time) {
      const date = new Date(time * 1000)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  data() {
    return {
      list: [],
      listLoading: true,
      total: 0,
      subjectId: 0,
      subjectList: [],
      gradeId: 0,
      gradeList: [],
      listQuery: {
        name: '',
        pageIndex: 1,
        pageSize: 20
      }
    }
  },
  inject: ['reload'],
  created() {
    this.listSubject()
    this.listGrade()
    this.fetchData()
  },
  methods: {
    search() {
      this.fetchData()
    },
    listSubject() {
      listSubject().then(response => {
        this.subjectList = response.data
        this.subjectId = this.subjectList[0].subjectId
      })
    },
    listGrade() {
      listGrade().then(response => {
        this.gradeList = response.data
        this.gradeId = this.gradeList[0].gradeId
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
      this.$router.push({ path: '/book/bookAdd' })
    },
    toEdit(bookId) {
      this.$router.push({ path: '/book/bookEdit/' + bookId })
    },
    remove(bookId) {
      const idVo = {
        id: bookId
      }
      removeBook(idVo).then(() => {
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
