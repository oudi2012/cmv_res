<template>
  <div class="app-container">
    <el-form ref="formDetail" class="form-inline" :model="postForm" label-width="100px" label-position="left">
      <el-row>
        <el-col :span="6">
          <el-form-item label="科目：">
            <el-select v-model="postForm.subjectId" value-key="subjectId">
              <el-option v-for="item in subjectList" :key="item.subjectId" :label="item.title" :value="item.subjectId" />
            </el-select>
          </el-form-item>
          <el-form-item label="书名：">
            <el-input v-model="postForm.bookName" maxlength="50" />
          </el-form-item>
          <el-form-item label="简称：">
            <el-input v-model="postForm.shortName" />
          </el-form-item>
          <el-form-item label="封面：">
            <el-input v-model="postForm.coverImage" />
          </el-form-item>
          <el-form-item label="卷册：">
            <el-radio-group v-model="postForm.volume">
              <el-radio :label="1">上册</el-radio>
              <el-radio :label="2">下册</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="版本：">
            <el-select v-model="postForm.verId" value-key="verId" size="mini">
              <el-option v-for="item in versionList" :key="item.verId" :label="item.name" :value="item.verId" />
            </el-select>
          </el-form-item>
          <el-form-item label="年份：">
            <el-input v-model="postForm.theYear" />
          </el-form-item>
          <el-form-item label="cip图片：">
            <el-input v-model="postForm.cipImage" />
          </el-form-item>
          <el-form-item label="年级：">
            <el-select v-model="postForm.gradeId" value-key="gradeId" size="mini">
              <el-option v-for="item in gradeList" :key="item.gradeId" :label="item.name" :value="item.gradeId" />
            </el-select>
          </el-form-item>
          <el-form-item label="必选修：">
            <el-radio-group v-model="postForm.elective">
              <el-radio :label="1">必修</el-radio>
              <el-radio :label="0">选修</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item>
          <el-button type="primary" @click="editItem">确定</el-button>
          <el-button @click="console">取消</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { listGrade } from '@/api/base/gradeInfo'
import { createBook, findBook, editBook } from '@/api/book/bookInfo'
import { listSubject } from '@/api/book/subjectInfo'
import { listVersion } from '@/api/book/versionType'

export default {
  name: 'Detail',
  data() {
    return {
      pathList: [],
      gradeList: [],
      listLoading: false,
      subjectList: [],
      versionList: [],
      postForm: {
        id: this.$route.params.id,
        name: this.$route.params.name,
        subjectId: 0,
        bookName: '',
        coverImage: '',
        shortName: '',
        volume: 1,
        elective: 1,
        verId: '',
        theYear: 2020,
        cipImage: '',
        gradeId: 1
      }
    }
  },
  created() {
    this.getGradeList()
    this.listSubject()
    this.getVersionList()
    if (this.postForm.id) {
      this.findItem()
    }
  },
  methods: {
    getGradeList() {
      listGrade().then(res => {
        this.gradeList = res.data
        this.postForm.gradeId = this.gradeList[0].gradeId
      })
    },
    listSubject() {
      listSubject().then(res => {
        this.subjectList = res.data
        this.postForm.subjectId = this.subjectList[0].subjectId
      })
    },
    getVersionList() {
      listVersion().then(res => {
        this.versionList = res.data
        this.postForm.verId = this.versionList[0].verId
      })
    },
    findItem() {
      findBook(this.postForm.name, this.postForm.id).then(res => {
        this.postForm.bookName = res.data.bookName
        this.postForm.shortName = res.data.shortName
        this.postForm.verId = res.data.verId
        this.postForm.theYear = res.data.theYear
        this.postForm.coverImage = res.data.coverImage
        this.postForm.cipImage = res.data.cipImage
        this.postForm.volume = res.data.volume
        this.postForm.elective = res.data.elective
        this.postForm.gradeId = res.data.gradeId
      })
    },
    editItem() {
      this.listLoading = true
      const bookInfo = {
        bookId: this.postForm.id,
        bookName: this.postForm.bookName,
        shortName: this.postForm.shortName,
        version: this.postForm.verId,
        theYear: this.postForm.theYear,
        coverImage: this.postForm.coverImage,
        cipImage: this.postForm.cipImage,
        volume: this.postForm.volume,
        elective: this.postForm.elective,
        subjectId: this.postForm.subjectId,
        gradeId: this.postForm.gradeId
      }
      if (!this.postForm.id) {
        console.log(bookInfo)
        createBook(bookInfo).then(() => {
          this.listLoading = false
          this.$message.success('操作成功!')
          this.$router.push({ path: '/book/bookList' })
        })
      } else {
        editBook(bookInfo).then(() => {
          this.listLoading = false
          this.$message.success('操作成功!')
          this.$router.push({ path: '/book/bookList' })
        })
      }
    },
    console() {
      this.$router.push({ path: '/book/bookList' })
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
    .el-select{
      width:80%;
      margin-right: 10px;
    }
  }
</style>
