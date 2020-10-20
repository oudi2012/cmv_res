<template>
  <div class="app-container">
    <el-form ref="formDetail" class="form-inline" :model="postForm" label-width="80px" label-position="left">
      <el-row>
        <el-col :span="10">
          <el-form-item label="手机号：">
            <el-input v-model="postForm.phone" maxlength="11" />
          </el-form-item>
          <el-form-item label="头像：">
            <el-input v-model="postForm.headImage" />
          </el-form-item>
          <el-form-item label="用户名：">
            <el-input v-model="postForm.userName" />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="身份：">
            <el-select v-model="postForm.roleId" size="mini">
              <el-option v-for="item in postForm.roleList" :key="item.code" :label="item.name" :value="item.code" />
            </el-select>
          </el-form-item>
          <el-form-item label="性别：">
            <el-radio-group v-model="postForm.sex">
              <el-radio :label="1">男生</el-radio>
              <el-radio :label="0">女生</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="区域：">
            <el-select v-model="postForm.province" size="mini" @change="handleProvinceChange">
              <el-option v-for="item in postForm.provinceList" :key="item.areaCode" :label="item.areaName" :value="item.areaCode" />
            </el-select>
            <el-select v-model="postForm.city" size="mini" @change="handleCityChange">
              <el-option v-for="item in postForm.cityList" :key="item.areaCode" :label="item.areaName" :value="item.areaCode" />
            </el-select>
            <el-select v-model="postForm.town" size="mini">
              <el-option v-for="item in postForm.townList" :key="item.areaCode" :label="item.areaName" :value="item.areaCode" />
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
import { createGuardian, findGuardian, editGuardian, listRoles } from '@/api/base/userInfo'

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
        sex: 1,
        roleId: 10,
        roleList: [
          {
            code: 10,
            name: '爸爸'
          }
        ],
        regType: 6,
        provinceList: [
          {
            areaCode: 103,
            areaName: '河北'
          }
        ],
        city: '',
        cityList: [
          {
            areaCode: 10301,
            areaName: '邯郸市'
          }
        ],
        town: '',
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
    this.listRoles()
    if (this.postForm.id) {
      this.findItem()
    }
  },
  methods: {
    listRoles() {
      listRoles().then(res => {
        this.postForm.roleList = res.data
      })
    },
    handleProvinceChange() {
      this.getCityList()
    },
    handleCityChange() {
      this.getTownList()
    },
    getProvinceList() {
      provinceList().then(res => {
        this.postForm.provinceList = res.data
        this.postForm.province = this.postForm.provinceList[2].areaCode
        this.getCityList()
      })
    },
    getCityList() {
      cityList(this.postForm.province).then(res => {
        this.postForm.cityList = res.data
        this.postForm.city = this.postForm.cityList[0].areaCode
        this.getTownList()
      })
    },
    getTownList() {
      townList(this.postForm.city).then(res => {
        this.postForm.townList = res.data
        if (this.postForm.townList.length > 0) {
          this.postForm.town = this.postForm.townList[0].areaCode
        } else {
          this.postForm.town = ''
        }
      })
    },
    findItem() {
      findGuardian(this.postForm.id).then(res => {
        this.postForm.phone = res.data.phone
        this.postForm.headImage = res.data.headImage
        this.postForm.userName = res.data.userName
        this.postForm.sex = res.data.sex
        this.postForm.roleId = res.data.roleId
        this.postForm.province = res.data.province
        this.postForm.city = res.data.city
        this.postForm.town = res.data.town
        this.postForm.regType = res.data.regType
      })
    },
    editItem() {
      this.listLoading = true
      const guardianInfo = {
        id: this.postForm.id,
        phone: this.postForm.phone,
        headImage: this.postForm.headImage,
        userName: this.postForm.userName,
        regType: this.postForm.regType,
        sex: this.postForm.sex,
        roleId: this.postForm.roleId,
        areaId: this.postForm.town
      }
      if (!this.postForm.town) {
        guardianInfo.areaId = this.postForm.city
      }
      if (!this.postForm.id) {
        createGuardian(guardianInfo).then(() => {
          this.listLoading = false
          this.$message.success('操作成功!')
          this.$router.push({ path: '/user/guardianList' })
        })
      } else {
        editGuardian(guardianInfo).then(() => {
          this.listLoading = false
          this.$message.success('操作成功!')
          this.$router.push({ path: '/user/guardianList' })
        })
      }
    },
    console() {
      this.$router.push({ path: '/user/guardianList' })
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
      width:30%;
      margin-right: 10px;
    }
  }
</style>
