<template>
  <div>
    <transition-group tag="el-row" name="el-fade-in-linear">
      <el-col v-for="(item) in graduateList" :key="item.id" style="width:370px;">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span class="spanTitle">{{ item.major.name }}</span>
          </div>
          <div class="cardContent"><span class="spanText">学生姓名：{{ item.student.user.name }}</span></div>
          <div class="cardContent"><span class="spanText">准考证号：{{ item.student.admissionId }}</span></div>
          <div class="cardContent"><span class="spanText">毕业学校：{{ item.student.school.name }}</span></div>
          <div class="cardContent"><span class="spanText">毕业学位：{{ item.educationLevel }}</span></div>
          <div class="cardContent"><span class="spanText">专业名字：{{ item.major.name }}</span></div>
          <div class="cardContent"><span class="spanText">毕业日期：{{ item.graduateDate }}</span></div>
          <div class="cardContent"><span class="spanText">是否通过：
            <span v-if="item.certified" style="color:#67C23A">通过</span>
            <span v-else style="color:#F56C6C">未通过</span>
          </span></div>
        </el-card>
      </el-col>
    </transition-group>
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
    }
  },
  computed: {
    graduateList: function() {
      return this.$store.state.graduate.graduateList
    }
  },
  mounted() {
    if (this.$store.state.user.user.role === '用户') {
      this.disableInput = true
      this.admissionId = this.$store.state.student.student.admissionId
      this.$axios.get('graduates/id/' + this.admissionId).then(res => {
        if (res.data.code === 1) {
          this.$store.dispatch('graduate/setGraduateList', res.data.data)
        } else {
          this.$alert(res.data.message, '错误', {
            confirmButtonText: '确定' })
        }
      }).catch(console.error()
      )
    }
  }
}
</script>

<style>

</style>
