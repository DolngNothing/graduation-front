<template>
  <div>
    <transition-group tag="el-row" name="mlist">
      <el-col v-for="(item) in courseGrade" :key="item.id" style="width:370px;">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span class="spanTitle">{{ item.course.name }}</span>
          </div>
          <el-row style="height:0px;">
            <el-col style="width:170px;height:100px;">
              <div class="cardContent"><span class="spanText">学生成绩：{{ item.score }}</span></div>
              <div class="cardContent"><span class="spanText">课程学分：{{ item.course.credit }}</span></div>
              <div class="cardContent"><span class="spanText">通过日期：{{ item.passDate | FormatDate('yyyy年MM月dd日') }}</span></div>
            </el-col>
            <el-col style="width:100px;height:0px;position:relative">
              <el-progress :percentage="item.score" :status="pass(item.score)" type="circle" width="60" stroke-width="7" style="padding:0;margin:0;position:absolute;left:60px"/>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </transition-group >
    <transition-group tag="el-row" name="mlist">
      <el-col v-for="(item) in thesisList" :key="item.id" style="width:370px;">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span class="spanTitle">{{ item.title }}</span>
          </div>
          <div class="cardContent"><span class="spanText">论文专业：{{ item.major.name }}</span></div>
          <div class="cardContent"><span class="spanText">论文归属：{{ item.student.user.name }}</span></div>
          <div class="cardContent"><span class="spanText">通过日期：{{ item.passDate | FormatDate('yyyy年MM月dd日') }}</span></div>
        </el-card>
      </el-col>
    </transition-group >
    <transition name="mlist">
      <el-row>
        <el-col v-if="existCE" :span="5" style="width:400px;">
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
              <span class="spanTitle">中英文考试成绩</span>
            </div>
            <el-row style="height:0px;">
              <el-col style="width:170px;">
                <div class="cardContent"><span class="spanText">学生中文成绩：{{ CE.chineseGrade }}</span></div>
                <div class="cardContent"><span class="spanText">学生英文成绩：{{ CE.englishGrade }}</span></div>
                <div class="cardContent"><span class="spanText">通过日期：{{ CE.passDate | FormatDate('yyyy年MM月dd日') }}</span></div>
              </el-col>
              <el-col style="width:100px;height:0px;position:relative">
                <div><el-progress :percentage="CE.chineseGrade" :status="pass(CE.chineseGrade)" type="circle" width="40" stroke-width="5" style="padding:0;margin:0;position:absolute;left:100px;top:0px"/></div>
                <div><el-progress :percentage="CE.englishGrade" :status="pass(CE.englishGrade)" type="circle" width="40" stroke-width="5" style="padding:0;margin:0;position:relative;left:70px;top:10px"/></div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </transition>
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
    courseGrade: function() {
      return this.$store.state.grade.courseGrade
    },
    CE: function() {
      return this.$store.state.grade.CE
    },
    student: function() {
      return this.$store.state.student.student
    },
    thesisList: function() {
      return this.$store.state.thesis.thesisList
    },
    existCE: function() {
      return JSON.stringify(this.CE) !== '{}'
    }
  },
  mounted() {
    this.$axios.get('courseGrades/' + this.student.admissionId + '/' + this.$store.state.user.user.city.id + '/' + this.$store.state.user.user.district.id).then(res => {
      if (res.data.code === 1) {
        this.$store.dispatch('grade/setCoureGrade', res.data.data)
        console.log(this.$store.state.grade.courseGrade)
      } else {
        this.$alert(res.data.message, '提示', {
          confirmButtonText: '确定' })
      }
    }).catch(console.error()
    )
    this.$axios.get('ceGradeInfo/' + this.student.admissionId + '/' + this.$store.state.user.user.city.id + '/' + this.$store.state.user.user.district.id).then(res => {
      if (res.data.code === 1) {
        console.log(res.data.data)
        this.$store.dispatch('grade/setCE', res.data.data)
      } else {
        this.$alert(res.data.message, '提示', {
          confirmButtonText: '确定' })
      }
    }).catch(console.error()
    )
    this.$axios.get('thesis/' + this.student.admissionId).then(res => {
      if (res.data.code === 1) {
        console.log(res.data.data)
        this.$store.dispatch('thesis/setThesisList', res.data.data)
      } else {
        this.$alert(res.data.message, '提示', {
          confirmButtonText: '确定' })
      }
    }).catch(console.error())
  },
  methods: {
    print(grade) {
      if (grade.score >= 60) {
        this.$store.commit('setDialogVisible', true)
      } else {
        this.$message.error('成绩未合格')
      }
    },
    printCE() {
      if (this.CE.chineseGrade >= 60 && this.CE.englishGrade >= 60) {
        this.$store.commit('setDialogVisible', true)
      } else {
        this.$message.error('成绩未合格')
      }
    },
    pass(score) {
      if (score >= 60) {
        return 'success'
      } else return 'exception'
    }
  }
}
</script>

<style>

</style>
