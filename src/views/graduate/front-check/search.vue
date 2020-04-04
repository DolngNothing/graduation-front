<template>
  <div>
    <el-form >
      <el-form-item>
        <el-row :gutter="4" label="请输入准考证号：">
          <el-col style="width:130px;">
            <label>请输入准考证号： </label>
          </el-col>
          <el-col style="width:230px;padding-left: 0px">
          <el-input v-model="admissionId" placeholder="准考证号"/></el-col>
          <el-col style="width:100px; padding-left: 10px"><el-button icon="el-icon-search" type="primary" @click="onSubmit">查询</el-button></el-col>
        </el-row>
      </el-form-item>
      <el-form-item />
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      admissionId: ''
    }
  },
  methods: {
    onSubmit() {
      if (this.admissionId !== '') {
        this.$axios.get('frontDegreeIng/' + this.admissionId).then(res => {
          if (res.data.code === 1) {
            console.log(res.data.data)
            this.$store.dispatch('frontDegree/setFrontDegree', res.data.data)
          } else {
            this.$alert(res.data.message, '提示', {
              confirmButtonText: '确定' })
          }
        }).catch(console.error()
        )
      } else {
        this.$message.error('请输入准考证')
      }
    }
  }
}
</script>

<style>

</style>
