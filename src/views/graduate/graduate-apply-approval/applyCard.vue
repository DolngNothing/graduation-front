<template>
  <el-card class="box-card" shadow="hover">
    <div slot="header" class="clearfix">
      <span class="spanTitle">申请审核</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click.native.prevent="print()">确认审核</el-button>
    </div>
    <div class="cardContent"><span class="spanText">学生姓名：{{ apply.student.user.name }}</span></div>
    <div class="cardContent"><span class="spanText">准考证号：{{ apply.student.admissionId }}</span></div>
    <div class="cardContent"><span class="spanText">毕业学校：{{ apply.student.school.name }}</span></div>
    <div class="cardContent"><span class="spanText">毕业学位：{{ apply.education }}</span></div>
    <div class="cardContent"><span class="spanText">专业名字：{{ apply.major.name }}</span></div>
    <div class="cardContent"><span class="spanText">申请毕业时间：{{ apply.graduateDate }}</span></div>
    <div class="cardContent"><span class="spanText">提交时间：{{ apply.submitDate }}</span></div>
    <el-divider><span class="divierSpan">详细信息</span></el-divider>
    <div class="cardContent"><span class="spanText">学生身份证：{{ apply.student.idCard }}</span></div>
    <div class="cardContent"><span class="spanText">户籍住址：{{ apply.student.status.permanentAddress }}</span></div>
    <div class="cardContent"><span class="spanText">所属城市：{{ apply.student.user.city.name }}</span></div>
    <div class="cardContent"><span class="spanText">所属地区：{{ apply.student.user.district.name }}</span></div>
    <div>
      <el-radio-group v-model="pass">
        <el-radio :label="true">通过</el-radio>
        <el-radio :label="false">不通过</el-radio>
      </el-radio-group>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      pass: ''
    }
  },
  computed: {
    apply: function() {
      return this.$store.state.graduate.graduateApply
    }
  },
  methods: {
    print: function() {
      if (this.pass !== '') {
        this.$axios.put('graduationApply/' + this.$store.state.user.user.role + '/' + this.apply.id + '/' + this.pass).then(res => {
          if (res.data.code === 1) {
            this.$message({
              type: 'success',
              message: res.data.message
            })
          } else {
            this.$message.error(res.data.message)
          }
        })
      } else {
        this.$message.error('请选择是否通过')
      }
    }
  }
}
</script>

<style>

</style>
