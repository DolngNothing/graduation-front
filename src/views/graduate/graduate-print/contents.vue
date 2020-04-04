/* eslint-disable vue/no-side-effects-in-computed-properties */
<template>
  <div>
    <el-container>
      <el-header class="back1" >
        <el-row :gutter="4" label="筛选准考证：">
          <el-col style="width:130px;">
            <label>筛选条件： </label>
          </el-col>
          <el-col style="width:230px;padding-left: 0px">
          <el-input v-model="admissionId" placeholder="准考证号" @keyup.enter.native="search" /></el-col>
          <el-col style="width:200px;padding-left: 0px">
          <el-input v-model="school" placeholder="学校" @keyup.enter.native="search"/></el-col>
          <el-col style="width:140px;padding-left: 0px">
          <el-input v-model="district" :disabled="disabledDistrict" placeholder="所属区" @keyup.enter.native="search"/></el-col>
          <el-col style="width:140px;padding-left: 0px">
          <el-input v-model="city" :disabled="disabledCity" placeholder="所属市" @keyup.enter.native="search"/></el-col>
          <el-col style="width:100px; padding-left: 10px"><el-button icon="el-icon-search" type="primary" @click="search">查询</el-button></el-col>
          <el-col style="width:200px; padding-left: 10px;"><el-switch
            v-model="isAll"
            active-text="大量操作"
            inactive-text="小量操作"
            active-color="#13ce66"
            inactive-color="#ff4949"/>
          </el-col>
          <el-col style="width:100px; padding-left: 0px">已选:{{ multipleSelection.length }}</el-col>
          <el-col style="width:100px; padding-left: 0px"><el-button type="primary" icon="el-icon-download" plain @click="print">打印选择</el-button></el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-table
          :data="filterList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          :default-sort = "{prop: 'graduateDate', order: 'descending'}"
          :row-key="getRowKey"
          :header-cell-style = "{paddingLeft:'0px',lineHeight:'20px'}"
          max-height="70vh"
          class="list"
          border
          style="width: 100%;"
          @selection-change="handleSelectionChange">
          <!-- 要使当页显示分页后的对应数据，其下标应为(当前页-1)*每页数据数 到 当前页*每页数据数。使用slice方法进行取用  -->
          <el-table-column
            :reserve-selection="true"
            type="selection"/>
          <el-table-column :label="columName[0]" prop="student.admissionId"/>
          <el-table-column :label="columName[1]" prop="student.user.name"/>
          <el-table-column :label="columName[2]" prop="major.name"/>
          <el-table-column :label="columName[3]" prop="student.education"/>
          <el-table-column :label="columName[4]" prop="graduateDate" sortable/>
          <el-table-column :label="columName[5]" prop="student.user.city.name"/>
          <el-table-column :label="columName[6]" prop="student.user.district.name"/>
          <el-table-column :label="columName[7]" prop="student.school.name"/>
          <el-table-column :label="columName[8]" prop="student.idCard"/>
        </el-table>
      </el-main>
      <el-footer class="back1">
        <el-pagination
          :current-page="currentPage"
          :page-sizes="[1,5,8]"
          :page-size="pagesize"
          :total="filterList.length"
          background
          layout="total,jumper,prev, pager, next,sizes"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange" />
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import { exportWord } from '@/utils/export-word.js'
export default {
  components: {
  },
  data() {
    return {
      applyPage: [],
      currentPage: 1,
      pagesize: 1,
      applyId: '',
      drawer: false,
      direction: 'rtl',
      pass: '',
      filterList: [],
      admissionId: '',
      school: '',
      district: '',
      city: '',
      disabledCity: true,
      disabledDistrict: true,
      multipleSelection: [],
      printId: [],
      isAll: 'false',
      graduateForm: {
        admissionId: '',
        name: '',
        major: '',
        graduateDate: '',
        city: '',
        district: '',
        admin: '',
        education: '',
        school: ''
      },
      columName: ['准考证', '姓名', '专业', '学历', '毕业时间', '城市', '地区', '学校', '身份证号码']
    }
  },
  watch: {
    'isAll': function() {
      if (this.isAll) {
        this.currentPage = 1
        this.pagesize = 400
      } else {
        this.pagesize = 1
      }
    }
  },
  mounted() {
    this.$axios.get('graduationApply/toPrint').then(res => {
      if (res.data.code === 1) {
        this.applyPage = res.data.data
        this.filterList = this.applyPage
      } else {
        this.$message.error(res.data.message)
      }
    })
    if (this.$store.state.user.user.city.id === 99) {
      this.disabledDistrict = false
      this.disabledCity = false
    } else if (this.$store.state.user.user.district.id === 99) {
      this.disabledDistrict = false
      this.city = this.$store.state.user.user.city.name
    } else {
      this.city = this.$store.state.user.user.city.name
      this.district = this.$store.state.user.user.district.name
    }
  },
  methods: {
    // /分页    初始页currentPage、初始每页数据数pagesize和数据testpage
    handleSizeChange: function(size) {
      this.pagesize = size
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage
    },
    search: function() {
      this.filterList = this.applyPage.filter((item) => {
        return item.student.admissionId.includes(this.admissionId + '')
      })
      this.filterList = this.filterList.filter((item) => {
        return item.student.school.name.includes(this.school)
      })
      this.filterList = this.filterList.filter((item) => {
        return item.student.user.district.name.includes(this.district)
      })
      this.filterList = this.filterList.filter((item) => {
        return item.student.user.city.name.includes(this.city)
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    getRowKey(row) {
      return row.id
    },
    print() {
      if (this.multipleSelection.length !== 0) {
        this.multipleSelection.forEach(item => {
          this.printId.push(item.id)
          this.convertWord(item)
        })

        this.$axios.put('graduationApply/print', this.printId).then(res => {
          if (res.data.code === 1) {
            this.$message({
              message: '打印数量：' + res.data.message,
              type: 'success'
            })
          }
        })
      }
    },
    convertWord(data) {
      this.graduateForm = {}
      this.graduateForm.admissionId = data.student.admissionId
      this.graduateForm.name = data.student.user.name
      this.graduateForm.school = data.student.school.name
      this.graduateForm.city = data.student.user.city.name
      this.graduateForm.district = data.student.user.district.name
      this.graduateForm.admin = this.$store.state.user.user.name
      this.graduateForm.graduateDate = data.graduateDate
      this.graduateForm.education = data.student.education
      this.graduateForm.major = data.major.name
      exportWord('/static/graduate.docx', this.graduateForm, this.graduateForm.admissionId + '毕业证书.docx')
    }
  }

}
</script>

<style>
.divierSpan{
  position: absolute;
  line-height: 30px;
  width: 100px;
  left:-30px;
  top:-13px;
}
.el-table__header tr,
  .el-table__header th {
    padding: 10px;
    height: 40px;
}
</style>
