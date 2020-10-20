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
        <el-table-column align="center" label="头像" width="100">
          <template slot-scope="scope">{{ scope.row.headImage }}</template>
        </el-table-column>
        <el-table-column label="编号/电话/日期" width="200">
          <template slot-scope="scope">
            <div class="multi-data">
              <span>编号: {{ scope.row.id }}</span>
              <span>电话: {{ scope.row.phone }}</span>
              <span>日期: {{ scope.row.regDate | dateFormat }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="姓名/登录名/注册类型" align="center">
          <template slot-scope="scope">
            <div class="multi-data">
              <span>姓    名: {{ scope.row.realName }}</span>
              <span>登 录 名: {{ scope.row.userName }}</span>
              <span>注册类型: {{ scope.row.regType }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="学校/年级/班级" align="center" width="200">
          <template slot-scope="scope">
            <div class="multi-data">
              <span>{{ scope.row.schoolName }}</span>
              <span>{{ scope.row.areaId }}</span>
              <span>{{ scope.row.sex }}</span>
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
import { listTeacher, removeTeacher } from '@/api/base/userInfo'
import { formatDate } from '@/utils/date'
import Pagination from '@/components/Pagination'

export default {
  name: 'TeacherList',
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
      listTeacher(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
      })
    },
    toCreate() {
      this.$router.push({ path: '/user/teacherAdd' })
    },
    toEdit(id) {
      this.$router.push({ path: '/user/teacherEdit/' + id })
    },
    remove(id) {
      const idVo = {
        id: id
      }
      removeTeacher(idVo).then(() => {
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
  .multi-data>span{
    width: 100%;
    height: 30px;
    padding: 5px;
    text-align: left;
    float: left;
    border-bottom: 1px solid #cccccc;
  }
</style>
