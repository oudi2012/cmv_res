<template>
  <div class="app-container">
    <div class="search-wrap">
      <div>
        <el-form :inline="true" :model="listQuery">
          <el-form-item label="关键词：">
            <el-input v-model="listQuery.codeTitle" placeholder="输入关键词" />
          </el-form-item>
        </el-form>
      </div>
      <div><el-button type="primary" @click="search">搜索</el-button></div>
      <div><el-button type="primary" @click="toCreate">创建</el-button></div>
    </div>
    <div class="table">
      <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
        <el-table-column label="ID" width="100">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="编号" align="center" width="200">
          <template slot-scope="scope">{{ scope.row.cateCode }}</template>
        </el-table-column>
        <el-table-column label="名称" align="center">
          <template slot-scope="scope">{{ scope.row.codeTitle }}</template>
        </el-table-column>
        <el-table-column label="添加用户" align="center" width="200">
          <template slot-scope="scope">{{ scope.row.userName }}</template>
        </el-table-column>
        <el-table-column label="时间" align="center" width="200">
          <template slot-scope="scope">{{ scope.row.createDate | dateFormat }}</template>
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
import { bannerCatePageList, bannerCateRemove } from '@/api/banner/bannerCate'
import { formatDate } from '@/utils/date'
import Pagination from '@/components/Pagination/index'

export default {
  name: 'BannerCateList',
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
        codeTitle: '',
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
      this.fetchData()
    },
    fetchData() {
      this.listLoading = true
      bannerCatePageList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
      })
    },
    toCreate() {
      this.$router.push({ path: '/content/bannerCateAdd' })
    },
    toEdit(id) {
      this.$router.push({ path: '/content/bannerCateEdit/' + id })
    },
    remove(id) {
      const idVo = {
        id: id
      }
      bannerCateRemove(idVo).then(() => {
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
