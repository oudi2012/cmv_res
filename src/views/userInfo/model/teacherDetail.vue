<template>
  <div class="app-container">
    <el-form ref="formDetail" class="form-inline" :model="postForm" label-width="100px" label-position="left">
      <el-row>
        <el-col :span="10">
          <el-form-item label="手机号：">
            <el-input v-model="postForm.phone" maxlength="11" />
          </el-form-item>
          <el-form-item label="头像：">
            <el-input v-model="postForm.headImage" />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="用户名：">
            <el-input v-model="postForm.userName" />
          </el-form-item>
          <el-form-item label="性别：">
            <el-radio-group v-model="postForm.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="区域-学校：">
            <el-select v-model="postForm.provinceCode" size="mini" @change="handleProvinceChange">
              <el-option v-for="item in postForm.provinceList" :key="item.areaCode" :label="item.areaName" :value="item.areaCode" />
            </el-select>
            <el-select v-model="postForm.cityCode" size="mini" @change="handleCityChange">
              <el-option v-for="item in postForm.cityList" :key="item.areaCode" :label="item.areaName" :value="item.areaCode" />
            </el-select>
            <el-select v-model="postForm.townCode" size="mini" @change="handleTownChange">
              <el-option v-for="item in postForm.townList" :key="item.areaCode" :label="item.areaName" :value="item.areaCode" />
            </el-select>
            <el-select v-model="postForm.schoolId" size="mini">
              <el-option v-for="item in postForm.schoolList" :key="item.code" :label="item.name" :value="item.code" />
            </el-select>
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
import { provinceList, cityList, townList } from '@/api/base/areaInfo'
import { listKv } from '@/api/school/schoolInfo'
import { createTeacher, findTeacher, editTeacher } from '@/api/base/userInfo'

export default {
  name: 'Detail',
  data() {
    return {
      pathList: [],
      postForm: {
        id: this.$route.params.id,
        phone: '',
        headImage: '',
        userName: '',
        sex: '0',
        regType: 6,
        provinceCode: '',
        schoolId: 0,
        schoolList: [
          {
            code: 0,
            name: ''
          }
        ],
        provinceList: [
          {
            areaCode: 103,
            areaName: '河北'
          }
        ],
        cityCode: '',
        cityList: [
          {
            areaCode: 10301,
            areaName: '邯郸市'
          }
        ],
        townCode: '',
        townList: [
          {
            areaCode: 1030101,
            areaName: '邯郸市'
          }
        ],
        listLoading: false
      }
    }
  },
  created() {
    this.getProvinceList()
    if (this.postForm.id) {
      this.findItem()
    }
  },
  methods: {
    handleProvinceChange() {
      this.getCityList()
    },
    handleCityChange() {
      this.getTownList()
    },
    handleTownChange() {
      this.getSchoolList()
    },
    getProvinceList() {
      provinceList().then(res => {
        this.postForm.provinceList = res.data
        this.postForm.provinceCode = this.postForm.provinceList[2].areaCode
        this.getCityList()
      })
    },
    getCityList() {
      cityList(this.postForm.provinceCode).then(res => {
        this.postForm.cityList = res.data
        this.postForm.cityCode = this.postForm.cityList[0].areaCode
        this.getTownList()
      })
    },
    getTownList() {
      townList(this.postForm.cityCode).then(res => {
        this.postForm.townList = res.data
        if (this.postForm.townList.length > 0) {
          this.postForm.townCode = this.postForm.townList[0].areaCode
        } else {
          this.postForm.townCode = ''
        }
        this.getSchoolList()
      })
    },
    getSchoolList() {
      const SchoolInfo = {
        areaId: this.postForm.townCode
      }
      listKv(SchoolInfo).then(res => {
        this.postForm.schoolList = res.data
        if (this.postForm.schoolList) {
          this.postForm.schoolId = this.postForm.schoolList[0].code
        } else {
          this.postForm.schoolId = ''
        }
      })
    },
    findItem() {
      findTeacher(this.postForm.id).then(res => {
        this.postForm.phone = res.data.phone
        this.postForm.headImage = res.data.headImage
        this.postForm.userName = res.data.userName
        this.postForm.sex = res.data.sex
        this.postForm.provinceCode = res.data.provinceCode
        this.postForm.cityCode = res.data.cityCode
        this.postForm.townCode = res.data.townCode
        this.postForm.regType = res.data.regType
      })
    },
    editItem() {
      this.listLoading = true
      const itemInfo = {
        id: this.postForm.id,
        phone: this.postForm.phone,
        headImage: this.postForm.headImage,
        userName: this.postForm.userName,
        regType: this.postForm.regType,
        sex: this.postForm.sex,
        schoolId: this.postForm.schoolId,
        areaId: this.postForm.townCode
      }
      if (!itemInfo.schoolId) {
        itemInfo.schoolId = 0
      }
      if (!this.postForm.townCode) {
        itemInfo.areaId = this.postForm.cityCode
      }
      if (!this.postForm.id) {
        createTeacher(itemInfo).then(() => {
          this.listLoading = false
          this.$message.success('操作成功!')
          this.$router.push({ path: '/user/teacherList' })
        })
      } else {
        editTeacher(itemInfo).then(() => {
          this.listLoading = false
          this.$message.success('操作成功!')
          this.$router.push({ path: '/user/teacherList' })
        })
      }
    },
    console() {
      this.$router.push({ path: '/user/teacherList' })
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
      width:21%;
      margin-right: 10px;
    }
  }
</style>
