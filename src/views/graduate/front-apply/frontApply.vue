<template>
  <div>
    <el-container>
      <el-header class="back1">
        <bread class="bread"/>
      </el-header>
      <el-header class="back">
        <applylist />
      </el-header>
      <el-main class="contents">
        <contents />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import applylist from './applylist'
import bread from '@/components/breadcrumb'
import contents from './applyContents'
export default {
  components: {
    applylist,
    bread,
    contents
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
  created() {
  },
  mounted() {
    if (sessionStorage.getItem('timeTable') !== null) {
      this.timeTable = JSON.parse(sessionStorage.getItem('timeTable'))
      if (this.timeTable.frontDegreeApplyStartDate !== null && this.timeTable.frontDegreeApplyEndDate !== null) {
        if ((new Date()).getTime() < (new Date(this.timeTable.frontDegreeApplyStartDate)).getTime()) {
          this.$message.error('业务开始时间未到：' + this.timeTable.frontDegreeApplyStartDate)
          this.$router.replace({ path: '/' })
        } else if ((new Date()).getTime() > (new Date(this.timeTable.frontDegreeApplyEndDate)).getTime()) {
          this.$message.error('过了业务截止时间：' + this.timeTable.frontDegreeApplyEndDate)
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
    display: block;
    background-color:#E9EEF3;
    height: 400px;
  }
    .back1{
    background-color:#E9EEF3;
    position: relative;
  }
  .list{
    height: 70vh;
  }
  .contents{
    position: absolute;
    top:400px;
  }
</style>
