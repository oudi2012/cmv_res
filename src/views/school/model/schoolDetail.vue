<template>
  <div class="app-container">
    <el-form ref="formDetail" class="form-inline" :model="postForm" label-width="100px" label-position="left">
      <el-row>
        <el-col :span="6">
          <el-form-item label="学校名称：">
            <el-input v-model="postForm.name" maxlength="50" />
          </el-form-item>
          <el-form-item label="图片：">
            <el-input v-model="postForm.headImage" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="简称：">
            <el-input v-model="postForm.shortName" />
          </el-form-item>
          <el-form-item label="拼音：">
            <el-input v-model="postForm.pinyin" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="区域：">
            <el-select v-model="postForm.provinceCode" value-key="areaCode" size="mini" @change="handleProvinceChange">
              <el-option v-for="item in postForm.provinceList" :key="item.areaCode" :label="item.areaName" :value="item.areaCode" />
            </el-select>
            <el-select v-model="postForm.cityCode" value-key="areaCode" size="mini" @change="handleCityChange">
              <el-option v-for="item in postForm.cityList" :key="item.areaCode" :label="item.areaName" :value="item.areaCode" />
            </el-select>
            <el-select v-model="postForm.townCode" value-key="areaCode" size="mini">
              <el-option v-for="item in postForm.townList" :key="item.areaCode" :label="item.areaName" :value="item.areaCode" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="地址：">
            <el-input v-model="postForm.address" maxlength="200" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="是否重点：">
            <el-radio-group v-model="postForm.weight">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
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
import { provinceList, cityList, townList } from '@/api/base/areaInfo'
import { create, find, edit } from '@/api/school/schoolInfo'

export default {
  name: 'Detail',
  data() {
    return {
      pathList: [],
      postForm: {
        id: this.$route.params.id,
        name: '',
        headImage: '',
        shortName: '',
        pinyin: '',
        address: '',
        weight: '0',
        provinceCode: '',
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
      })
    },
    findItem() {
      find(this.postForm.id).then(res => {
        this.postForm.name = res.data.name
        this.postForm.headImage = res.data.headImage
        this.postForm.shortName = res.data.shortName
        this.postForm.pinyin = res.data.pinyin
        this.postForm.provinceCode = res.data.provinceCode
        this.postForm.cityCode = res.data.cityCode
        this.postForm.townCode = res.data.townCode
        this.postForm.address = res.data.address
        this.postForm.weight = res.data.weight
      })
    },
    editItem() {
      this.listLoading = true
      const schoolInfo = {
        schoolId: this.postForm.id,
        name: this.postForm.name,
        headImage: this.postForm.headImage,
        shortName: this.postForm.shortName,
        pinyin: this.postForm.pinyin,
        weight: this.postForm.weight,
        address: this.postForm.address,
        areaId: this.postForm.townCode
      }
      if (!this.postForm.townCode) {
        schoolInfo.areaId = this.postForm.cityCode
      }
      if (!this.postForm.id) {
        create(schoolInfo).then(() => {
          this.listLoading = false
          this.$message.success('操作成功!')
          this.$router.push({ path: '/school/schoolList' })
        })
      } else {
        edit(schoolInfo).then(() => {
          this.listLoading = false
          this.$message.success('操作成功!')
          this.$router.push({ path: '/school/schoolList' })
        })
      }
    },
    console() {
      this.$router.push({ path: '/school/schoolList' })
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
