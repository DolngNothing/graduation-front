<template>
  <div>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span class="spanTitle">{{ graduateCard.major.name }}</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click.native.prevent="print()">打印证明</el-button>
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
      <div>
        <el-radio-group v-model="type">
          <el-radio :label="1">遗失证明</el-radio>
          <el-radio :label="2">提前证明</el-radio>
          <el-radio :label="3">出国留学证明</el-radio>
        </el-radio-group>
      </div>
    </el-card>

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
      type: '',
      certifyType: ['遗失证明', '提前证明', '出国留学证明'],
      certifyForm: {
        applyDate: '',
        type: '',
        admissionId: '',
        name: '',
        major: '',
        graduateDate: '',
        city: '',
        district: '',
        admin: '',
        education: '',
        school: ''
      }
    }
  },
  computed: {
    graduateCard: function() {
      return this.$store.state.graduate.graduateCard
    }
  },
  methods: {
    print: function() {
      this.$axios.post('graduateCertify/' + this.graduateCard.id + '/' + this.type + '/' + this.$store.state.user.user.account).then(res => {
        if (res.data.code === 1) {
          this.convertWord(res.data.data)
          this.$message({
            message: '成功打印',
            type: 'success'
          })
        } else {
          this.$message.error({
            message: '未能成功打印 ' + res.data.message
          })
        }
      })
    },
    convertWord(data) {
      this.certifyForm.admissionId = data.student.admissionId
      this.certifyForm.name = data.student.user.name
      this.certifyForm.school = data.student.school.name
      this.certifyForm.applyDate = data.applyDate
      this.certifyForm.city = data.student.user.city.name
      this.certifyForm.district = data.student.user.district.name
      this.certifyForm.admin = data.user.name
      this.certifyForm.type = this.certifyType[data.certifyType]
      this.certifyForm.graduateDate = data.graduate.graduateDate
      this.certifyForm.education = data.graduate.educationLevel
      this.certifyForm.major = data.graduate.major.name
      exportWord('/static/graduateCertify.docx', this.certifyForm, this.certifyForm.admissionId + '毕业证明.docx')
    }
  }
}
</script>

<style>

</style>
