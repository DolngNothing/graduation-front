<template>
  <el-table
    :data="applyList"
    :header-cell-style = "{lineHeight:'20px'}"
    class="list"
    height="250px"
    style="width: 100%">
    <el-table-column
      prop="student.admissionId"
      label="准考证号"
      width="180"/>
    <el-table-column
      prop="student.user.name"
      label="姓名"
      width="100"/>
    <el-table-column
      prop="graduate.id"
      label="申请的毕业证id"
      width="130"/>
    <el-table-column
      prop="graduate.school.name"
      label="申请的学校"
      width="130"/>
    <el-table-column
      prop="graduate.major.name"
      label="申请的专业"
      width="130"/>
    <el-table-column
      prop="graduate.educationLevel"
      label="学历"
      width="100"/>
    <el-table-column
      prop="submitDate"
      label="提交时间"
      width="200"/>
    <el-table-column
      label="前置学历审核进度"
      width="100" >
      <template slot-scope="scope">
        <span>{{ applyState[scope.row.state] }}</span>
      </template>
    </el-table-column>

  </el-table>
</template>

<script>
export default {
  data() {
    return {
      applyList: [],
      applyState: ['审核中', '通过', '不通过', '被撤销']
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init: function() {
      this.$axios.get('frontDegree/' + this.$store.state.student.student.admissionId).then(res => {
        if (res.data.code === 1) {
          this.applyList = res.data.data
          console.log(this.applyList)
        } else {
          this.$message.error('找不到')
        }
      })
    }
  }

}
</script>

<style>

</style>
