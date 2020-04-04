<template>
  <el-form ref="graduate" :model="timeTable" label-position="right" label-width="150px" size="medium">
    <el-form-item
      style="width:1000px"
      label="毕业预提时间:">
      <el-row>
        <el-col style="width:250px">
          <el-date-picker v-model="timeTable.withHoldingGraduationStartDate" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择开始日期" />
        </el-col>
        <el-col style="width:40px"> 至</el-col>
        <el-col style="width:250px">
          <el-date-picker v-model="timeTable.withHoldingGraduationEndDate" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择截止日期"/>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item
      style="width:1000px"
      label="前置学历申请时间:">
      <el-row>
        <el-col style="width:250px">
          <el-date-picker v-model="timeTable.frontDegreeApplyStartDate" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择开始日期" />
        </el-col>
        <el-col style="width:40px"> 至</el-col>
        <el-col style="width:250px">
          <el-date-picker v-model="timeTable.frontDegreeApplyEndDate" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择截止日期"/>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item
      style="width:1000px"
      label="毕业申请时间:">
      <el-row>
        <el-col style="width:250px">
          <el-date-picker v-model="timeTable.graduateApplyStartDate" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择开始日期" />
        </el-col>
        <el-col style="width:40px"> 至</el-col>
        <el-col style="width:250px">
          <el-date-picker v-model="timeTable.graduateApplyEndDate" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择截止日期"/>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item
      style="width:1000px"
      label="毕业申请审核时间:">
      <el-row>
        <el-col style="width:250px">
          <el-date-picker v-model="timeTable.graduateCheckStartDate" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择开始日期" />
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item style="width:420px">
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
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
      },
      test: new Date()
    }
  },
  mounted() {
    this.$axios.get('timeTable').then(res => {
      if (res.data.code === 1) {
        this.timeTable = res.data.data
      }
    })
  },
  methods: {
    onSubmit: function() {
      this.$axios.post('timeTable', this.timeTable).then(res => {
        if (res.data.code === 1) {
          sessionStorage.setItem('timeTable', JSON.stringify(res.data.data))
          this.$message({
            type: 'success',
            message: res.data.message
          })
        }
      })
    }
  }
}
</script>

<style>

</style>
