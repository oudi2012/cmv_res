<template>
  <div class="app-container">
    <el-form ref="formDetail" class="form-inline" :model="postForm" label-width="100px" label-position="left">
      <el-form-item label="名称：">
        <el-input v-model="postForm.name" maxlength="50" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="editItem">确定</el-button>
        <el-button @click="console">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { createVersion, editVersion, findVersion } from '@/api/book/versionType'

export default {
  name: 'Detail',
  data() {
    return {
      pathList: [],
      listLoading: false,
      postForm: {
        verId: this.$route.params.id,
        name: '',
        orderNo: 1
      }
    }
  },
  created() {
    if (this.postForm.verId) {
      this.findItem()
    }
  },
  methods: {
    findItem() {
      findVersion(this.postForm.verId).then(res => {
        this.postForm.name = res.data.name
      })
    },
    editItem() {
      this.listLoading = true
      if (!this.postForm.verId) {
        createVersion(this.postForm).then(() => {
          this.listLoading = false
          this.$message.success('操作成功!')
          this.$router.push({ path: '/book/versionList' })
        })
      } else {
        editVersion(this.postForm).then(() => {
          this.listLoading = false
          this.$message.success('操作成功!')
          this.$router.push({ path: '/book/versionList' })
        })
      }
    },
    console() {
      this.$router.push({ path: '/book/versionList' })
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
