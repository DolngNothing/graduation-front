<template>
  <div>
    <el-container>
      <el-header class="back1">
        <bread class="bread"/>
      </el-header>
      <el-header class="back"><apply /></el-header>
      <el-main>
        <contents />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import bread from '@/components/breadcrumb'
import contents from './content'
import apply from './apply'
export default {
  components: {
    bread,
    contents,
    apply
  },
  data() {
    return {
      timeTable: {
        withHoldingGraduationStartDate: '',
        withHoldingGraduationEndDate: '',
        frontDegreeApplyStartDate: '',
        frontDegreeApplyEndDate: '',
        graduateApplyStartDate: '',
        graduateApplyEndDate: '',
        graduateCheckStartDate: ''
      }
    }
  },
  mounted() {
    if (sessionStorage.getItem('timeTable') !== null) {
      this.timeTable = JSON.parse(sessionStorage.getItem('timeTable'))
      console.log(this.timeTable)
      if (this.timeTable.graduateApplyStartDate !== null && this.timeTable.graduateApplyEndDate !== null) {
        if ((new Date()).getTime() < (new Date(this.timeTable.graduateApplyStartDate)).getTime()) {
          this.$message.error('业务开始时间未到：' + this.timeTable.graduateApplyStartDate)
          this.$router.replace({ path: '/' })
        } else if ((new Date()).getTime() > (new Date(this.timeTable.graduateApplyEndDate)).getTime()) {
          this.$message.error('过了业务截止时间：' + this.timeTable.graduateApplyEndDate)
          this.$router.replace({ path: '/' })
        }
      }
    }
  },
  destroyed() {
    this.$store.dispatch('status/deleteStudent')
  }
}
</script>

<style>
  .back{
    background-color:#E9EEF3
  }
    .back1{
    background-color:#E9EEF3;
    position: relative;
  }
  .list{
    height: 70vh;
  }
</style>
