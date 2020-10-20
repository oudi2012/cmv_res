<template>
  <div class="app-container">
    <el-form ref="formDetail" class="form-inline" :model="postForm" label-width="100px" label-position="left">
      <el-form-item label="名称：">
        <el-input v-model="postForm.name" maxlength="50" />
      </el-form-item>
      <el-form-item label="标题：">
        <el-input v-model="postForm.title" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="editItem">确定</el-button>
        <el-button @click="console">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { createSubject, editSubject, findSubject } from '@/api/book/subjectInfo'

export default {
  name: 'Detail',
  data() {
    return {
      pathList: [],
      listLoading: false,
      postForm: {
        id: this.$route.params.id,
        name: '',
        title: ''
      }
    }
  },
  created() {
    if (this.postForm.id) {
      this.findItem()
    }
  },
  methods: {
    findItem() {
      findSubject(this.postForm.id).then(res => {
        this.postForm.name = res.data.name
        this.postForm.title = res.data.title
      })
    },
    editItem() {
      this.listLoading = true
      if (!this.postForm.id) {
        createSubject(this.postForm).then(() => {
          this.listLoading = false
          this.$message.success('操作成功!')
          this.$router.push({ path: '/book/subjectList' })
        })
      } else {
        editSubject(this.postForm).then(() => {
          this.listLoading = false
          this.$message.success('操作成功!')
          this.$router.push({ path: '/book/subjectList' })
        })
      }
    },
    console() {
      this.$router.push({ path: '/book/subjectList' })
    }
  }
}
</script>

<style scoped lang="scss">
  .form-inline{
    width: 50%;
    .el-input {
      width:80%;
    }
    .el-select{
      width:30%;
      margin-right: 10px;
    }
  }
</style>
