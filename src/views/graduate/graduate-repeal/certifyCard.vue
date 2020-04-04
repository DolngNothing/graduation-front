<template>
  <div>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span class="spanTitle2">{{ graduateCard.major.name }}</span>
        <el-button style="float: right; " type="danger" icon="el-icon-delete" @click.native.prevent="deleteGraduate()">删除</el-button>
      </div>
      <div class="cardContent"><span class="spanText">学生姓名：{{ graduateCard.student.user.name }}</span></div>
      <div class="cardContent"><span class="spanText">准考证号：{{ graduateCard.student.admissionId }}</span></div>
      <div class="cardContent"><span class="spanText">毕业学校：{{ graduateCard.student.school.name }}</span></div>
      <div class="cardContent"><span class="spanText">毕业学位：{{ graduateCard.educationLevel }}</span></div>
      <div class="cardContent"><span class="spanText">专业名字：{{ graduateCard.major.name }}</span></div>
      <div class="cardContent"><span class="spanText">毕业日期：{{ graduateCard.graduateDate | FormatDate('yyyy年MM月dd日') }}</span></div>
      <div class="cardContent"><span class="spanText">是否通过：
        <span v-if="graduateCard.certified">通过</span>
        <span v-else>未通过</span>
      </span></div>
      <div class="cardContent"><span class="spanText">学生身份证：{{ graduateCard.student.idCard }}</span></div>
      <div class="cardContent"><span class="spanText">户籍住址：{{ graduateCard.student.status.permanentAddress }}</span></div>
      <div class="cardContent"><span class="spanText">所属城市：{{ graduateCard.student.user.city.name }}</span></div>
      <div class="cardContent"><span class="spanText">所属地区：{{ graduateCard.student.user.district.name }}</span></div>
    </el-card>
  </div>
</template>

<script>
import userInfo from '@/components/userInfo'
export default {
  components: {
    userInfo
  },
  data() {
    return {
      type: ''
    }
  },
  computed: {
    graduateCard: function() {
      return this.$store.state.graduate.graduateCard
    }
  },
  methods: {
    deleteGraduate: function() {
      this.$confirm('此操作将删除毕业证(且会删除对应毕业证明), 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.delete('graduate/' + this.graduateCard.id).then(res => {
          if (res.data.code === 1) {
            this.$message({
              message: res.data.message,
              type: 'success'
            })
          } else {
            this.$message.error(res.data.message)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    }
  }
}
</script>

<style>

</style>
