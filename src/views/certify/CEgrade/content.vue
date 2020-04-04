<template>
  <div>
    <transition-group tag="el-row" name="mlist">
      <el-col v-for="(item) in courseGrade" :key="item.id" style="width:370px;">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span class="spanTitle">{{ item.course.name }}</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click.native.prevent="print(item)">打印成绩单</el-button>
          </div>
          <el-row style="height:0px;">
            <el-col style="width:170px;">
              <div class="cardContent"><span class="spanText">学生姓名：{{ item.student.user.name }}</span></div>
              <div class="cardContent"><span class="spanText">准考证号：{{ item.student.admissionId }}</span></div>
              <div class="cardContent"><span class="spanText">学生成绩：{{ item.score }}</span></div>
              <div class="cardContent"><span class="spanText">课程学分：{{ item.course.credit }}</span></div>
              <div class="cardContent"><span class="spanText">通过日期：{{ item.passDate | FormatDate('yyyy年MM月dd日') }}</span></div>
            </el-col>
            <el-col style="width:100px;height:0px;position:relative">
              <el-progress :percentage="item.score" :status="pass(item.score)" type="circle" width="60" stroke-width="7" style="padding:0;margin:0;position:absolute;left:80px"/>
            </el-col>
          </el-row>

        </el-card>
      </el-col>
    </transition-group >
    <transition name="mlist">
      <el-row>
        <el-col v-if="!exist" :span="5" style="width:400px;">
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
              <span class="spanTitle">中英文考试成绩</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click.native.prevent="printCE()">打印成绩单</el-button>
            </div>
            <el-row style="height:0px;">
              <el-col style="width:170px;">
                <div class="cardContent"><span class="spanText">学生姓名：{{ student.user.name }}</span></div>
                <div class="cardContent"><span class="spanText">准考证号：{{ student.admissionId }}</span></div>
                <div class="cardContent"><span class="spanText">学生中文成绩：{{ CE.chineseGrade }}</span></div>
                <div class="cardContent"><span class="spanText">学生英文成绩：{{ CE.englishGrade }}</span></div>
                <div class="cardContent"><span class="spanText">通过日期：{{ CE.passDate | FormatDate('yyyy年MM月dd日') }}</span></div>
              </el-col>
              <el-col style="width:100px;height:0px;position:relative">
                <div><el-progress :percentage="CE.chineseGrade" :status="pass(CE.chineseGrade)" type="circle" width="40" stroke-width="5" style="padding:0;margin:0;position:absolute;left:100px;top:30px"/></div>
                <div><el-progress :percentage="CE.englishGrade" :status="pass(CE.englishGrade)" type="circle" width="40" stroke-width="5" style="padding:0;margin:0;position:relative;left:70px;top:50px"/></div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </transition>
    <userInfo/>
  </div>
</template>

<script>
import { exportWord } from '@/utils/export-word.js'
import userInfo from '@/components/userInfo'
export default {
  components: {
    userInfo
  },
  data() {
    return {
      courseWord: {
        admissionId: '',
        courseName: '',
        name: '',
        score: '',
        credit: '',
        school: '',
        passDate: '',
        city: '',
        district: '',
        admin: ''
      },
      CEWord: {
        admissionId: '',
        name: '',
        cscore: '',
        escore: '',
        school: '',
        passDate: '',
        city: '',
        district: '',
        admin: ''
      }
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
    exist: function() {
      return JSON.stringify(this.CE) === '{}'
    }
  },
  methods: {
    print(grade) {
      if (grade.score >= 60) {
        this.courseWord.admissionId = grade.student.admissionId
        this.courseWord.courseName = grade.course.name
        this.courseWord.name = grade.student.user.name
        this.courseWord.score = grade.score
        this.courseWord.credit = grade.course.credit
        this.courseWord.school = grade.student.school.name
        this.courseWord.passDate = grade.passDate
        this.courseWord.city = grade.student.user.city.name
        this.courseWord.district = grade.student.user.district.name
        this.courseWord.admin = this.$store.state.user.user.name
        exportWord('/static/courseGrade.docx', this.courseWord, this.courseWord.admissionId + this.courseWord.courseName + '课程成绩.docx')
        this.$store.commit('setDialogVisible', true)
      } else {
        this.$message.error('成绩未合格')
      }
    },
    printCE() {
      if (this.CE.chineseGrade >= 60 && this.CE.englishGrade >= 60) {
        this.CEWord.admissionId = this.student.admissionId
        this.CEWord.name = this.student.user.name
        this.CEWord.cscore = this.CE.chineseGrade
        this.CEWord.escore = this.CE.englishGrade
        this.CEWord.school = this.student.school.name
        this.CEWord.passDate = this.CE.passDate
        this.CEWord.city = this.student.user.city.name
        this.CEWord.district = this.student.user.district.name
        this.CEWord.admin = this.$store.state.user.user.name
        exportWord('/static/CEGrade.docx', this.CEWord, '中英文成绩.docx')

        this.$store.commit('setDialogVisible', true)
      } else {
        this.$message.error('成绩未合格')
      }
    },
    pass(score) {
      if (score >= 60) {
        return 'success'
      } else return 'exception'
    },
    passCE(score) {
      if (score >= 60) {
        return 'success'
      } else return 'exception'
    }
  }
}
</script>

<style>

</style>
