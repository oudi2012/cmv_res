<template>
  <div class="app-container">
    <el-form ref="formDetail" class="form-inline" :model="postForm" label-width="100px" label-position="left">
      <el-form-item label="类别：">
        <el-select v-model="postForm.cateCode" value-key="cateCode">
          <el-option v-for="item in cateList" :key="item.cateCode" :label="item.codeTitle" :value="item.cateCode" />
        </el-select>
      </el-form-item>
      <el-form-item label="标题：">
        <el-input v-model="postForm.title" maxlength="50" />
      </el-form-item>
      <el-form-item label="内容类型：">
        <el-select v-model="postForm.cntType" value-key="code">
          <el-option v-for="item in cntTypeList" :key="item.code" :label="item.title" :value="item.code" />
        </el-select>
      </el-form-item>
      <el-form-item label="显示目标：">
        <el-select v-model="postForm.target" value-key="code">
          <el-option v-for="item in targetList" :key="item.code" :label="item.title" :value="item.code" />
        </el-select>
      </el-form-item>
      <el-form-item label="连接地址：">
        <el-input v-model="postForm.href" maxlength="300" />
      </el-form-item>
      <el-form-item label="图片：">
        <el-upload
          ref="upload"
          class="el-upload"
          action="/api/image/upload"
          :accept="acceptFileType"
          :limit="1"
          :headers="token"
          :before-upload="beforeUpload"
          :on-success="handleSuccess"
          :auto-upload="true"
        >
          <img :src="postForm.srcUrl" class="image" alt="">
          <el-button slot="trigger" size="small" type="primary" style="margin-left: 20px">浏览</el-button>
          <div slot="tip" class="el-upload__tip" style="width: 300px">只能上传图片，且不超过1M</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="editItem">确定</el-button>
        <el-button @click="console">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { bannerCatePageList } from '@/api/banner/bannerCate'
import { bannerInfoFindById, bannerInfoCreate, bannerInfoUpdate } from '@/api/banner/bannerInfo'
import { getToken } from '@/utils/auth'

const cntTypeList = [
  { code: 'pic', title: '图片' },
  { code: 'video', title: '视频' }
]

const targetList = [
  { code: 'all', title: '全部' },
  { code: 'wechat', title: '微信小程序' },
  { code: 'app', title: 'app' }
]

const token = getToken()

export default {
  name: 'Detail',
  data() {
    return {
      token: { token: token },
      cateList: [],
      codeTitle: '',
      upLoading: false,
      cntTypeList: cntTypeList,
      targetList: targetList,
      acceptFileType: 'image/jpg,image/jpeg,image/gif,image/png',
      postForm: {
        id: this.$route.params.id,
        cateCode: '',
        cntType: 'pic',
        title: '',
        srcUrl: '',
        target: 'all',
        orderNo: 0
      }
    }
  },
  created() {
    this.getBannerCateList()
    if (this.postForm.id) {
      this.findItem()
    }
  },
  methods: {
    handleSuccess(res) {
      console.log(res.data)
      this.postForm.srcUrl = res.data
    },
    beforeUpload(file) {
      const fileName = file.name.substring(file.name.lastIndexOf('.') + 1)
      if (this.acceptFileType.indexOf(fileName) < 0) {
        this.$message({
          type: 'error',
          showClose: true,
          duration: 3000,
          message: '文件类型不是图片文件'
        })
        return false
      }
      const fileSize = file.size
      if (fileSize > 1048576) {
        this.$message({
          type: 'error',
          showClose: true,
          duration: 3000,
          message: '文件不能大于1M'
        })
        return false
      }
      return true
    },
    getBannerCateList() {
      const cateItem = {
        pageIndex: 1,
        pageSize: 50
      }
      bannerCatePageList(cateItem).then(res => {
        this.cateList = res.data.list
        this.postForm.cateCode = this.cateList[0].cateCode
      })
    },
    findItem() {
      bannerInfoFindById(this.postForm.id).then(res => {
        this.postForm.cateCode = res.data.cateCode
        this.postForm.cntType = res.data.cntType
        this.postForm.title = res.data.title
        this.postForm.srcUrl = res.data.srcUrl
      })
    },
    editItem() {
      this.listLoading = true
      if (!this.postForm.id) {
        bannerInfoCreate(this.postForm).then(() => {
          this.listLoading = false
          this.$message.success('操作成功!')
          this.$router.push({ path: '/content/bannerInfoList' })
        })
      } else {
        bannerInfoUpdate(this.postForm).then(() => {
          this.listLoading = false
          this.$message.success('操作成功!')
          this.$router.push({ path: '/content/bannerInfoList' })
        })
      }
    },
    console() {
      this.$router.push({ path: '/content/bannerInfoList' })
    }
  }
}
</script>

<style scoped lang="scss">
  .form-inline{
    width: 50%;
    .el-input {
      width:50%;
    }
    .el-select{
      width:50%;
      margin-right: 10px;
    }
  }
  .image{
    float: left;
    width: 300px;
    min-height: 100px;
    max-height: 300px;
    border: 1px rgba(140, 147, 157, 0.58) dashed;
  }
</style>
