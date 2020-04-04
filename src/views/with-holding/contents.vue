<template>
  <div>
    <el-container style="height:100%;" direction="vertical" position="absolute">
      <el-header class="back">
        <el-row>
          <el-col style="width:230px;padding-left: 0px">
            <el-input v-model="admissionId" placeholder="准考证号" @keyup.enter.native="search" />
          </el-col>
          <el-col style="width:100px;padding-left: 0px">
            <el-button icon="el-icon-search" circle @click="search"/>
          </el-col>
          <el-col v-if="isTop" :push="16" style="width:230px;">
            <el-button round @click.native.prevent="update">更新预提表</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main style="height:100%;" direction="vertical">
        <el-table
          :data="withHoldingList"
          :header-cell-style = "{paddingLeft:'0px',lineHeight:'20px'}"
          class="list"
          max-height="60vh"
          border
          style="width: 100%;">
          <el-table-column
            prop="student.admissionId"
            label="准考证号"/>
          <el-table-column
            prop="student.user.name"
            label="姓名"/>
          <el-table-column
            prop="student.school.name"
            label="学校"/>
          <el-table-column
            prop="student.education"
            label="学历水平"/>
          <el-table-column
            prop="student.major.name"
            label="专业"/>
          <el-table-column
            prop="student.user.city.name"
            label="城市"/>
          <el-table-column
            prop="student.user.district.name"
            label="地区"/>
        </el-table>
      </el-main>
      <el-footer class="back">
        <div class="block">
          <el-pagination
            :total="totalnum*pagesize"
            :current-page="currentPage"
            :page-size="pagesize"
            layout="prev, pager, next"
            @current-change="handleCurrentPage"
          />
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      applyPage: [],
      currentPage: 1,
      pagesize: 7,
      totalnum: 10,
      filterList: [],
      admissionId: '',
      school: '',
      district: '',
      city: '',
      withHoldingList: []
    }
  },
  computed: {
    isTop: function() {
      console.log(this.$store.state.user.user.role === '省考试')
      return this.$store.state.user.user.role === '省考试'
    }
  },
  mounted() {
    this.$axios.get('withHoldingGraduation/' + this.currentPage + '/' + this.pagesize).then(res => {
      if (res.data.code === 1) {
        this.withHoldingList = res.data.data.content
        this.totalnum = res.data.data.totalPages
      } else {
        this.$alter(res.data.message, '返回首页', {
          confirmButtonText: '确定',
          callback: action => {
            this.$router.replace({ path: '/' })
          }
        })
      }
    })
  },
  methods: {
    handleCurrentPage: function(currentPage) {
      this.currentPage = currentPage
      this.$axios.get('withHoldingGraduation/' + this.currentPage + '/' + this.pagesize).then(res => {
        if (res.data.code === 1) {
          this.withHoldingList = res.data.data.content
          this.totalnum = res.data.data.totalPages
        } else {
          this.$notify.error({
            message: res.data.message
          })
        }
      })
    },
    reset: function() {
      this.$axios.get('withHoldingGraduation/' + this.currentPage + '/' + this.pagesize).then(res => {
        if (res.data.code === 1) {
          this.withHoldingList = res.data.data.content
          this.totalnum = res.data.data.totalPages
        } else {
          this.$alter(res.data.message, '返回首页', {
            confirmButtonText: '确定',
            callback: action => {
              this.$router.replace({ path: '/' })
            }
          })
        }
      })
    },
    update: function() {
      this.$axios.post('withHoldingGraduation').then(res => {
        if (res.data.code === 1) {
          this.reset()
        } else {
          this.$notify.error({
            title: res.data.message
          })
        }
      })
    },
    search() {
      if (this.admissionId !== '') {
        this.$axios.get('withHolding/' + this.admissionId).then(res => {
          if (res.data.code === 1) {
            this.withHoldingList = []
            this.withHoldingList.push(res.data.data)
            this.currentPage = 1
            this.totalnum = 1
          } else {
            this.$message.error(res.data.message)
          }
        })
      } else {
        this.$message.error('请先输入准考证')
      }
    }
  }
}
</script>

<style>
  .back{
    background-color:#E9EEF3
  }
</style>

