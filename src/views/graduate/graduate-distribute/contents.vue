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
          <el-col style="width:100px; padding-left: 0px"><el-button type="primary" icon="el-icon-download" plain @click="show">地址输入</el-button></el-col>
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
    <el-drawer
      :visible.sync="drawer"
      :direction="direction"
      label-position="right"
      size="20%"
    >
      <el-form :model="info" label-width="130px" style="width:300px">
        <el-form-item label="领取开始时间">
          <el-date-picker
            v-model="info.receiveStartDate"
            type="datetime"
            placeholder="选择日期时间"/>
        </el-form-item>
        <el-form-item label="领取截止时间">
          <el-date-picker
            v-model="info.receiveEndDate"
            type="datetime"
            placeholder="选择日期时间"/>
        </el-form-item>
        <el-form-item label="领取地点">
          <el-input v-model="info.receivePosition" type="textarea"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-download" plain @click="distribute">完成输入</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>

</template>

<script>
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
      info: {
        receiveStartDate: '',
        receiveEndDate: '',
        receivePosition: '',
        idList: []
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
    this.$axios.get('graduationApply/toDistribute/' + this.$store.state.user.user.district.id).then(res => {
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
      console.log(val)
      this.multipleSelection = val
    },
    getRowKey(row) {
      return row.id
    },
    distribute() {
      this.$confirm('此操作将设置领取信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.multipleSelection.forEach(item => {
          this.printId.push(item.id)
        })
        this.info.idList = this.printId
        console.log(this.info.idList)
        if (this.info.idList.length !== 0) {
          if (JSON.stringify(this.info.receiveStartDate) !== '{}' && JSON.stringify(this.info.receiveStartDate) !== 'null' &&
        JSON.stringify(this.info.receiveEndDate) !== '{}' && JSON.stringify(this.info.receiveEndDate) !== 'null' &&
        this.info.receivePosition !== ''
          ) {
            this.$axios.put('graduationApply/distribute', this.info).then(res => {
              if (res.data.code === 1) {
                this.$message({
                  message: res.data.message,
                  type: 'success'
                })
              }
            })
          } else {
            this.$message.error('信息未填写完整')
          }
        } else {
          this.$message.error('请选择派发的学生')
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    show() {
      this.drawer = true
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
