<template>
  <div>
    <collapse />
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
          <el-col style="width:130px;padding-left: 0px">
          <el-date-picker v-model="year" type="year" style="width:130px" placeholder="选择年份"/></el-col>
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
          <el-col style="width:100px; padding-left: 0px"><el-button type="primary" icon="el-icon-download" plain @click="port()">打印选择</el-button></el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-table
          id="graduate-list"
          :data="filterList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          :default-sort = "{prop: 'graduateDate', order: 'descending'}"
          :row-key="getRowKey"
          :header-cell-style = "{paddingLeft:'0px',lineHeight:'20px'}"
          height="70vh"
          border
          style="width: 100%;"
          @selection-change="handleSelectionChange">
          <!-- 要使当页显示分页后的对应数据，其下标应为(当前页-1)*每页数据数 到 当前页*每页数据数。使用slice方法进行取用  -->
          <el-table-column
            :reserve-selection="true"
            type="selection"/>
          <el-table-column :label="columName[0]" prop="student.admissionId"/>
          <el-table-column :label="columName[1]" prop="student.user.name"/>
          <el-table-column :label="columName[2]" prop="title"/>
          <el-table-column :label="columName[3]" prop="major.name" sortable/>
          <el-table-column :label="columName[4]" prop="passDate" sortable/>
          <el-table-column :label="columName[5]" prop="student.user.city.name" sortable/>
          <el-table-column :label="columName[6]" prop="student.user.district.name" sortable/>
          <el-table-column :label="columName[7]" prop="student.school.name" sortable/>
          <el-table-column :label="columName[8]" prop="context"/>
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
import collapse from './collapse'
export default {
  components: {
    collapse
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
      schoolList: [],
      majorList: [],
      portList: [],
      year: '',
      portColunm: { admissionId: '', username: '', majorname: '', title: '', passDate: '', city: '', district: '', school: '', context: '' },
      columName: ['准考证', '姓名', '论文标题', '论文专业', '通过时间', '城市', '地区', '学校', '文件链接']
    }
  },
  computed: {

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
    this.$axios.get('thesises').then(res => {
      if (res.data.code === 1) {
        this.$store.dispatch('thesis/setThesisList', res.data.data)
        this.applyPage = res.data.data
        this.filterList = this.applyPage
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
      }
    })
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
      if (this.year !== 'null' || this.year !== '') {
        this.filterList = this.filterList.filter((item) => {
          return item.graduateDate.includes(this.year.getFullYear())
        })
      }
    },
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val
    },
    getRowKey(row) {
      return row.id
    },
    port() {
      if (this.multipleSelection.length === 0) {
        this.$message.error('请选择导出的列')
      } else {
        this.export2Excel()
      }
    },
    // 导出书刊列表数据
    export2Excel() {
      require.ensure([], () => {
        this.portList = []
        const { export_json_to_excel } = require('../../../excel/Export2Excel')
        const tHeader = ['准考证', '姓名', '论文标题', '论文专业', '通过时间', '城市', '地区', '学校', '文件链接']
        const filterVal = ['admissionId', 'username', 'title', 'majorname', 'passDate', 'city', 'district', 'school', 'context']
        this.multipleSelection.forEach(item => {
          this.portColunm.admissionId = item.student.admissionId
          this.portColunm.username = item.student.user.name
          this.portColunm.majorname = item.major.name
          this.portColunm.title = item.title
          this.portColunm.city = item.student.user.city.name
          this.portColunm.district = item.student.user.district.name
          this.portColunm.idcard = item.student.idCard
          this.portColunm.school = item.student.school.name
          this.portColunm.passDate = item.passDate

          this.portList.push(this.portColunm)
          this.portColunm = {}
        })
        const list = this.portList
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '导出信息')
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
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
