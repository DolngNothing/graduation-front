<template>
  <div>
    <h1 style="line-height:25px;"><span class="title">前置学历申请表</span></h1>
    <table class="ttable" border="1">
      <tr>
        <td width="150" align="center">准考证号</td>
        <td width="300" colspan="3">{{ frontDegree.student.admissionId }}</td>
        <td width="150" align="center">学生姓名</td>
        <td width="300" colspan="3">{{ frontDegree.student.user.name }}</td>
      </tr>
      <tr>
        <td>所属地区</td>
        <td colspan="3" style="text-align:left;">
          <span>{{ frontDegree.student.user.city.name }}市</span>
          <span>{{ frontDegree.student.user.district.name }}</span>
        </td>
        <td>所属学校</td>
        <td colspan="3">
          {{ frontDegree.student.school.name }}
        </td>
      </tr>
      <tr><td height="70">学生身份证号</td>
        <td colspan="6">{{ frontDegree.student.idCard }}</td>
      </tr>
      <tr>
        <td height="70">前置学历毕业学校：</td>
        <td colspan="3">{{ frontDegree.graduate.school.name }}</td>
        <td height="70">前置学历毕业学校：</td>
        <td colspan="3">{{ frontDegree.graduate.major.name }}</td>
      </tr>
      <tr>
        <td height="70">前置学历毕业时间：</td>
        <td colspan="3">{{ frontDegree.graduate.graduateDate }}</td>
        <td height="70">前置学历毕业学历：</td>
        <td colspan="3">{{ frontDegree.graduate.educationLevel }}</td>
      </tr>
      <tr>
        <td height="70">申请提交时间：</td>
        <td colspan="3">{{ frontDegree.submitDate }}</td>
        <td height="70">前置学历申请状态：</td>
        <td colspan="3">{{ applyState[frontDegree.state] }}</td>
      </tr>
    </table>
    <el-radio v-model="pass" label="true">通过</el-radio>
    <el-radio v-model="pass" label="false">不通过</el-radio>
    <el-button class="bb" type="success" round @click.native.prevent="print">确认</el-button>
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      type: '',
      textarea: '',
      applyState: ['审核中', '通过', '不通过', '被撤销'],
      pass: ''
    }
  },
  computed: {
    frontDegree: function() {
      return this.$store.state.frontDegree.frontDegree
    },
    user: function() {
      return this.$store.state.user.user
    }
  },
  methods: {
    print: function() {
      if (this.pass === '') {
        this.$message.error('请选择是否通过')
      } else {
        this.$axios.put('frontDegree/' + this.frontDegree.id + '/' + this.pass + '/' + this.user.account).then(res => {
          if (res.data.code === 1) {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
          } else {
            this.$message.error(res.data.message)
          }
        })
      }
    }
  }
}
</script>

<style>
.ttable{
		border-collapse:collapse;
		text-align: center;
    margin: 0 auto;
    position: relative;
	}
	.ttable span{
		display: inline-block;
		width: 100px;
		text-align: right;
	}
	#time span{
		width: 30px;
  }
  tr{
    position: relative;
  }
  td{
    position: relative;
    line-height: 15px;
    height: 52px;
  }
  .speci{
   position: relative;
    line-height: 15px;
    height: 100px;
  }
  .title{
    font-size: 25px
  }

  .btr{
    position: relative;
  }

</style>
