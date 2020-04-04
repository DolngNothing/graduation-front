<template>
  <transition-group tag="el-row" name="mlist">
    <el-col v-for="(item) in graduationApplyList" :key="item.id" style="width:400px;">
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span class="spanTitle">{{ item.major.name }}</span>
        </div>
        <div class="cardContent"><span class="spanText">学生准考证：{{ item.student.admissionId }}</span></div>
        <div class="cardContent"><span class="spanText">学生名字：{{ item.student.user.name }}</span></div>
        <div class="cardContent"><span class="spanText">申请专业：{{ item.major.name }}</span></div>
        <div class="cardContent"><span class="spanText">申请毕业学历：{{ item.student.education }}</span></div>
        <div class="cardContent"><span class="spanText">申请毕业日期：{{ item.graduateDate }}</span></div>
        <div class="cardContent"><span class="spanText">申请提交日期：{{ item.submitDate }}</span></div>
        <div class="cardContent"><span class="spanText">申请进度：{{ as[item.applyState] }}</span></div>
        <el-divider><span class="divierSpan">申请成功后</span></el-divider>
        <div class="cardContent"><span class="spanText">毕业证进度：{{ gs[item.certificateState] }}</span></div>
        <div class="cardContent"><span class="spanText">领取的时间：{{ item.receiveStartDate }}</span></div>
        <div class="cardContent"><span class="spanText">领取结束的时间：{{ item.receiveEndDate }}</span></div>
        <div class="cardContent"><span class="spanText">领取地点：{{ item.receivePosition }}</span></div>
      </el-card>
    </el-col>
  </transition-group >
</template>

<script>
export default {
  data() {
    return {
      graduationApplyList: [],
      as: ['区审批中', '市审批中', '省审批中', '审批通过', '审批不通过'],
      gs: ['待打印', '已打印，待发放', '已发放，待领取', '已领取', '被撤销毕业']
    }
  },
  computed: {

  },
  mounted() {
    this.$axios.get('graduationApply/' + this.$store.state.student.student.admissionId).then(res => {
      if (res.data.code === 1) {
        this.graduationApplyList = res.data.data
      }
    })
  }

}
</script>

<style>
.divierSpan{
  position: absolute;
  line-height: 30px;
  width: 100px;
  left:-30px;
  top:-13px;
}
</style>
