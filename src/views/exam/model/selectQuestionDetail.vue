<template>
  <div class="app-container">
    <el-form class="form-inline" :model="resultInfo">
      <el-row class="label-tag">
        <el-col :span="20">
          <span>{{ resultInfo.gradeName }}</span><span>  {{ resultInfo.subjectName }}</span>
          <span>  {{ resultInfo.qusTypeName }}</span>
        </el-col>
      </el-row>
      <el-row class="label-tag">
        <el-col :span="20">
          <span style="display: block; width: 500px; float: left;">{{ resultInfo.title }}</span>
          <span style="display: block; margin-left: 30px; width: 50px; float: left; ">({{ resultInfo.answers }})</span>
          <span style="margin: 15px; float: left; "><el-rate v-model="resultInfo.hardLevel" disabled text-color="#ff9900" score-template="{starValue}" /></span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <span v-if="resultInfo.qusType === 1">
            <el-radio-group v-model="resultInfo.selectItem" @change="getAnswers">
              <el-radio v-for="item in resultInfo.optionList" :key="item.key" :label="item.key">{{ item.key }} : {{ item.option }}
                <a class="el-icon-close" @click="removeOptionItem(item.key)" />
              </el-radio>
            </el-radio-group>
          </span>
          <span v-else>
            <el-checkbox-group v-model="resultInfo.selectItem">
              <el-checkbox v-for="item in resultInfo.optionList" :key="item.key" :label="item.key">{{ item.key }} : {{ item.option }}
                <a class="el-icon-close" @click="removeOptionItem(item.key)" />
              </el-checkbox>
            </el-checkbox-group>
          </span>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px">
        <el-col :span="20">
          <el-button type="primary" size="mini" @click="editQuestion">保存试题</el-button>
          <el-button type="primary" size="mini" @click="console">取消</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-divider />
    <el-form ref="formDetail" class="form-inline" :model="postForm" label-width="60px" label-position="left">
      <el-row>
        <el-col :span="6">
          <el-form-item label="题目：">
            <el-input v-model="postForm.name" maxlength="200" />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label-width="0px">
            <el-switch v-model="postForm.qusType" active-text="单选" inactive-text="多选" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label-width="0px">
            <el-select v-model="postForm.hardLevel" value-key="gradeId" size="mini" @change="setLevel">
              <el-option v-for="item in hardLevelList" :key="item.index" :label="item" :value="item" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label-width="0px">
            <el-select v-model="postForm.gradeId" value-key="gradeId" size="mini" @change="setGrade">
              <el-option v-for="item in gradeList" :key="item.gradeId" :label="item.name" :value="item.gradeId" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label-width="0px">
            <el-select v-model="postForm.subjectId" value-key="subjectId" size="mini" @change="setSubject">
              <el-option v-for="item in subjectList" :key="item.subjectId" :label="item.title" :value="item.subjectId" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="选项：">
            <el-input v-model="postForm.itemName" maxlength="200" />
            <el-button type="primary" @click="addQuestionItem">添加选项</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { createSelect, editSelect, findSelect } from '@/api/exam/selectQuestion'
import { listGrade } from '@/api/base/gradeInfo'
import { getChar } from '@/api/base/base'
import { listSubject } from '@/api/book/subjectInfo'

export default {
  name: 'Detail',
  data() {
    return {
      hardLevelList: [1, 2, 3, 4, 5],
      gradeList: [],
      subjectList: [],
      listLoading: false,
      resultInfo: {
        gradeName: '年级',
        subjectName: '科目',
        qusTypeName: '题型',
        title: '题目',
        answers: '答案',
        hardLevel: 1,
        qusType: 1,
        selectItem: 'A',
        optionList: []
      },
      postForm: {
        id: this.$route.params.id,
        name: '',
        itemName: '',
        hardLevel: 1,
        qusType: true,
        gradeId: 0,
        subjectId: 0
      },
      starValue: 1
    }
  },
  watch: {
    'postForm.name': {
      handler(newValue) {
        this.resultInfo.title = newValue
      }
    },
    'postForm.qusType': {
      handler(newValue) {
        if (newValue) {
          this.resultInfo.qusTypeName = '单选'
        } else {
          this.resultInfo.qusTypeName = '多选'
        }
      }
    }
  },
  inject: ['reload'],
  created() {
    this.getGradeList()
    this.listSubject()
    if (this.postForm.id) {
      this.findItem()
    }
  },
  methods: {
    getGradeList() {
      listGrade().then(res => {
        this.gradeList = res.data
        this.postForm.gradeId = this.gradeList[0].gradeId
        this.resultInfo.gradeName = this.gradeList[0].name
      })
    },
    listSubject() {
      listSubject().then(res => {
        this.subjectList = res.data
        this.postForm.subjectId = this.subjectList[0].subjectId
        this.resultInfo.subjectName = this.subjectList[0].title
      })
    },
    setLevel() {
      this.resultInfo.hardLevel = this.postForm.hardLevel
    },
    setGrade() {
      this.resultInfo.gradeName = this.gradeList[this.postForm.gradeId].name
    },
    setSubject() {
      this.resultInfo.subjectName = this.subjectList[this.postForm.subjectId].title
    },
    findItem() {
      findSelect(this.postForm.id).then(res => {
        this.resultInfo.gradeName = res.data.gradeName
        this.resultInfo.subjectName = res.data.subjectName
        this.resultInfo.qusTypeName = res.data.qusType === 10 ? '单选' : '多选'
        this.resultInfo.title = res.data.title
        this.resultInfo.answers = res.data.answers
        this.resultInfo.hardLevel = res.data.hardLevelId
        this.resultInfo.selectItem = res.data.answers
        this.formatQuestionOption(res.data.selectQuestionOptionList)
        this.postForm.name = res.data.title
        this.postForm.qusType = res.data.qusType === 10
        this.postForm.hardLevel = res.data.hardLevelId
        this.postForm.gradeId = res.data.gradeId
        this.postForm.subjectId = res.data.subjectId
        this.setOptionItemName()
      })
    },
    formatQuestionOption(selectQuestionOptionList) {
      let idx = 1
      selectQuestionOptionList.forEach(item => {
        const optionItem = {
          key: getChar(idx++),
          option: item.title
        }
        this.resultInfo.optionList.push(optionItem)
      })
    },
    setOptionItemName() {
      this.resultInfo.optionList.forEach((item) => {
        if (item.key === this.resultInfo.selectItem) {
          this.postForm.itemName = item.option
        }
      })
    },
    addQuestionItem() {
      const length = this.resultInfo.optionList.length
      const optionItem = {
        key: getChar(length + 1),
        option: this.postForm.itemName
      }
      this.resultInfo.optionList.push(optionItem)
    },
    getAnswers() {
      this.resultInfo.answers = this.resultInfo.selectItem
    },
    removeOptionItem(key) {
      let idx = 0
      const arrOptList = []
      this.resultInfo.optionList.forEach((item) => {
        if (item.key !== key) {
          idx = idx + 1
          const optionItem = {
            key: getChar(idx),
            option: item.option
          }
          arrOptList.push(optionItem)
        }
      })
      this.resultInfo.optionList = []
      this.resultInfo.optionList = arrOptList
    },
    editQuestion() {
      this.listLoading = true
      const selectQuestionOptionList = []
      for (let idx = 0; idx < this.resultInfo.optionList.length; idx++) {
        const optionItem = {
          title: ''
        }
        optionItem.title = this.resultInfo.optionList[idx].option
        selectQuestionOptionList.push(optionItem)
      }
      const tmpInfo = {
        id: this.postForm.id,
        title: this.postForm.name,
        subjectId: this.postForm.subjectId,
        gradeId: this.postForm.gradeId,
        qusType: this.postForm.qusType ? 10 : 20,
        examScope: '',
        answers: this.resultInfo.answers,
        hardLevelId: this.postForm.hardLevel,
        selectQuestionOptionList: selectQuestionOptionList
      }
      if (!this.postForm.id) {
        createSelect(tmpInfo).then(() => {
          this.listLoading = false
          this.$message.success('操作成功!')
          this.$router.push({ path: '/exam/selectQuestionList' })
        })
      } else {
        editSelect(tmpInfo).then(() => {
          this.listLoading = false
          this.$message.success('操作成功!')
          this.$router.push({ path: '/exam/selectQuestionList' })
        })
      }
    },
    console() {
      this.$router.push({ path: '/exam/selectQuestionList' })
    }
  }
}
</script>

<style scoped lang="scss">
  .app-container {
    border: 1px solid #EBEEF5;
  }
  .el-icon-close {
    font-size: 16px;
  }
  .el-icon-close:hover {
    color: orangered;
  }
  .form-inline{
    width: 80%;
    .el-input {
      width:60%;
    }
    .label-tag {
      color: #999999;
      font-size: 14px;
      line-height: 50px;
    }
    .el-select{
      width:60%;
      margin-right: 10px;
    }
  }
  .form-inline>span {
    width: 30%;
    margin-right: 5px;
    float: left;
  }
</style>
