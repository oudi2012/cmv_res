<template>
  <div class="app-container">
    <el-form ref="formDetail" class="form-inline" :model="postForm" label-width="100px" label-position="left">
      <el-form-item label="cateCode：">
        <el-input v-model="postForm.cateCode" maxlength="50" />
      </el-form-item>
      <el-form-item label="名称：">
        <el-input v-model="postForm.codeTitle" maxlength="50" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="editItem">确定</el-button>
        <el-button @click="console">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { bannerCateCreate, bannerCateFindById, bannerCateUpdate } from '@/api/banner/bannerCate'

export default {
  name: 'BannerCateDetail',
  data() {
    return {
      upLoading: false,
      postForm: {
        id: this.$route.params.id,
        cateCode: '',
        codeTitle: ''
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
      bannerCateFindById(this.postForm.id).then(res => {
        this.postForm.cateCode = res.data.cateCode
        this.postForm.codeTitle = res.data.codeTitle
      })
    },
    editItem() {
      this.listLoading = true
      console.log(this.postForm.id)
      if (!this.postForm.id) {
        bannerCateCreate(this.postForm).then(() => {
          this.listLoading = false
          this.$message.success('操作成功!')
          this.$router.push({ path: '/content/bannerCateList' })
        })
      } else {
        bannerCateUpdate(this.postForm).then(() => {
          this.listLoading = false
          this.$message.success('操作成功!')
          this.$router.push({ path: '/content/bannerCateList' })
        })
      }
    },
    console() {
      this.$router.push({ path: '/content/bannerCateList' })
    }
  }
}
</script>

<style scoped lang="scss">
  .form-inline{
    width: 30%;
    .el-input {
      width:80%;
    }
    .el-select{
      width:80%;
      margin-right: 10px;
    }
  }
</style>
