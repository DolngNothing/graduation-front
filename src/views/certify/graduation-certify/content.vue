<template>
  <div>
    <transition-group tag="el-row" name="el-fade-in-linear">
      <el-col v-for="(item) in graduateList" :key="item.id" style="width:370px;">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span class="spanTitle">{{ item.major.name }}</span>
            <el-button :disabled="!item.certified" style="float: right; padding: 3px 0" type="text" @click.native.prevent="select(item)">选择证明</el-button>
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
    <el-drawer
      :visible.sync="drawer"
      :direction="direction">
      <certifyCard />
    </el-drawer>
  </div>
</template>

<script>
import certifyCard from './certifyCard'
export default {
  components: {
    certifyCard
  },
  data() {
    return {
      graduate: {},
      drawer: false,
      direction: 'rtl'
    }
  },
  computed: {
    graduateList: function() {
      return this.$store.state.graduate.graduateList
    }
  },
  methods: {
    select: function(graduate) {
      this.drawer = true
      this.$store.dispatch('graduate/setGraduateCard', graduate)
    }
  }

}
</script>

<style>

</style>
