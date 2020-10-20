<template>
  <div class="app-container">
    <el-form ref="formDetail" class="form-inline" :model="postForm" label-width="120px">
      <el-form-item label="名称">
        <el-input v-model="postForm.name" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="create">确定</el-button>
        <el-button @click="console">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { createGrade } from '@/api/base/gradeInfo'

export default {
  name: 'GradeDetail',
  data() {
    return {
      pathList: [],
      postForm: {
        name: '',
        listLoading: false
      }
    }
  },
  created() {
    this.getPathList()
  },
  methods: {
    create() {
      this.listLoading = true
      const gradeInfo = {
        name: this.postForm.name,
        type: 0
      }
      createGrade(gradeInfo).then(response => {
        this.listLoading = false
        this.$message.success('操作成功!')
        this.$router.push({ path: '/base/gradeList' })
      })
    },
    console() {
      this.$router.push({ path: '/base/gradeList' })
    }
  }
}
</script>

<style scoped lang="scss">
  .form-inline{
    width: 35%;
    .el-input,.el-select{width:100%}
  }
  .line{
    text-align: center;
  }
  .search-wrap{
    display: flex;
    width: 50%;
    margin-bottom: 20px;
    .path-nav {
      margin-left: 80px;
      width: 60px;
    };
    .path-item {
      width: auto;
      margin-right: 10px;
      color: #222222;
    }
  }
</style>
