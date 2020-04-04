<template>
  <div>
    <div id="register">
      <h1 style="line-height:25px;"><span class="title">研究生报考证明</span></h1>
      <table class="ttable" border="1">
        <tr>
          <td width="120" align="center">准考证号</td>
          <td width="280" colspan="3">{{ register.student.admissionId }}</td>
          <td width="120" align="center">学生姓名</td>
          <td width="280" colspan="3">{{ register.student.user.name }}</td>
        </tr>
        <tr>
          <td>所属地区</td>
          <td colspan="3" style="text-align:left;">
            <span>{{ register.student.user.city.name }}市</span>
            <span>{{ register.student.user.district.name }}</span>
          </td>
          <td>所属学校</td>
          <td colspan="3">
            {{ register.student.school.name }}
          </td>
        </tr>
        <tr><td height="70">学生身份证号</td>
          <td colspan="6">{{ register.student.idCard }}</td>
        </tr>
        <tr id="time">
          <td height="45">报名时间</td>
          <td colspan="3" width="240">{{ register.registerDate| FormatDate('yyyy年MM月dd日') }}</td>
          <td >学历</td>
          <td colspan="3" >{{ register.student.education }}</td>
        </tr>
        <tr>
          <td height="45">研究生报名学校</td>
          <td colspan="3" >{{ register.school.name }}</td>
          <td height="45">研究生报名专业</td>
          <td colspan="3" >{{ register.major.name }}</td>
        </tr>
        <tr>
          <td colspan="2" >打印负责人</td>
          <td colspan="4" >负责人账号：{{ user.account }} &nbsp; &nbsp;负责人姓名：{{ user.name }}</td>
        </tr>
        <tr class="btr">
          <td class="speci">备注</td>
          <td colspan="6"><el-input
            :rows="4"
            v-model="textarea"
            type="textarea"
            placeholder="请输入内容"/></td>
        </tr>
      </table>
    </div>
    <el-button class="bb" type="success" round @click.native.prevent="print">打印按钮</el-button>
  </div>
</template>

<script>
import { getPdf } from '@/utils/export-pdf.js'
export default {
  components: {

  },
  data() {
    return {
      type: '',
      textarea: ''
    }
  },
  computed: {
    register: function() {
      return this.$store.state.register.register
    },
    user: function() {
      return this.$store.state.user.user
    }
  },
  methods: {
    print: function() {
      getPdf(this.register.student.admissionId + '研究生报名证明', 'register')
      this.$message({
        message: '成功打印',
        type: 'success'
      })
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
