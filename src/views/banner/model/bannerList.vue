<template>
  <div class="app-container">
    <div class="search-wrap">
      <div>
        <el-form :inline="true" :model="listQuery">
          <el-form-item label="关键词：">
            <el-input v-model="listQuery.title" placeholder="输入关键词" />
          </el-form-item>
        </el-form>
      </div>
      <div><el-button type="primary" @click="search">搜索</el-button></div>
      <div><el-button type="primary" @click="toCreate">创建</el-button></div>
    </div>
    <div class="table">
      <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
        <el-table-column align="center" label="图片" width="200">
          <template slot-scope="scope">
            <div class="multi-data">
              <el-image ref="lazyImg" lazy :src="scope.row.srcUrl" :fit="fit">
                <div slot="placeholder" class="image-slot">
                  <i class="el-icon-loading" />加载中
                </div>
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline" />
                </div>
              </el-image>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="名称/类型/内容类型">
          <template slot-scope="scope">
            <div class="multi-data">
              <span>名称：{{ scope.row.title }}</span>
              <span>类型：{{ scope.row.cateName }}</span>
              <span>内容：{{ scope.row.cntTypeName }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="展示位置/状态" align="center" width="300">
          <template slot-scope="scope">
            <div class="multi-data">
              <span>展示位置：{{ scope.row.targetName }}</span>
              <span>状态：{{ scope.row.stateName }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="地址" align="center" width="300">
          <template slot-scope="scope">
            <span>地址：{{ scope.row.href }}</span>
          </template>
        </el-table-column>
        <el-table-column label="时间" align="center" width="300">
          <template slot-scope="scope">
            <span>时间：{{ scope.row.createDate | dateFormat }}</span>
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
import { bannerInfoPageList, bannerInfoRemove } from '@/api/banner/bannerInfo'
import { formatDate } from '@/utils/date'
import Pagination from '@/components/Pagination/index'

export default {
  name: 'BannerList',
  components: { Pagination },
  filters: {
    dateFormat(time) {
      const date = new Date(time * 1000)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  data() {
    return {
      fit: 'contain',
      list: [],
      listLoading: true,
      total: 0,
      subjectId: 0,
      subjectList: [],
      gradeId: 0,
      gradeList: [],
      stateName: '',
      targetName: '',
      cateName: '',
      cntTypeName: '',
      createDate: '',
      listQuery: {
        title: '',
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
      bannerInfoPageList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
      })
    },
    toCreate() {
      this.$router.push({ path: '/content/bannerInfoAdd' })
    },
    toEdit(id) {
      this.$router.push({ path: '/content/bannerInfoEdit/' + id })
    },
    remove(id) {
      const idVo = {
        id: id
      }
      bannerInfoRemove(idVo).then(() => {
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
