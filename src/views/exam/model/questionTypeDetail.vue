<template>
  <div class="app-container">
    <el-form ref="formDetail" class="form-inline" :model="postForm" label-width="100px" label-position="left">
      <el-form-item label="名称：">
        <el-input v-model="postForm.title" maxlength="50" />
      </el-form-item>
      <el-form-item label="排序：">
        <el-input v-model="postForm.orderNo" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="editItem">确定</el-button>
        <el-button @click="console">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { createQuestionType, findQuestionType, editQuestionType } from '@/api/exam/questionTypeInfo'

export default {
  name: 'Detail',
  data() {
    return {
      pathList: [],
      listLoading: false,
      postForm: {
        id: this.$route.params.id,
        title: '',
        orderNo: ''
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
      findQuestionType(this.postForm.id).then(res => {
        this.postForm.title = res.data.title
        this.postForm.orderNo = res.data.orderNo
      })
    },
    editItem() {
      this.listLoading = true
      if (!this.postForm.id) {
        createQuestionType(this.postForm).then(() => {
          this.listLoading = false
          this.$message.success('操作成功!')
          this.$router.push({ path: '/exam/questionTypeList' })
        })
      } else {
        editQuestionType(this.postForm).then(() => {
          this.listLoading = false
          this.$message.success('操作成功!')
          this.$router.push({ path: '/exam/questionTypeList' })
        })
      }
    },
    console() {
      this.$router.push({ path: '/exam/questionTypeList' })
    }
  }
}
</script>

<style scoped lang="scss">
  .form-inline{
    width: 80%;
    .el-input {
      width:80%;
    }
  }
</style>
