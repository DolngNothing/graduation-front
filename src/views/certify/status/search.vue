<template>
  <div>
    <el-form >
      <el-form-item>
        <el-row :gutter="4" label="请输入准考证号：">
          <el-col style="width:130px;">
            <label>请输入准考证号： </label>
          </el-col>
          <el-col style="width:230px;padding-left: 0px">
          <el-input v-model="admissionId" :disabled="disableInput" placeholder="准考证号"/></el-col>
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
      admissionId: '',
      disableInput: false
    }
  },
  mounted() {
    if (this.$store.state.user.user.role === '用户') {
      this.disableInput = true
      this.admissionId = this.$store.state.student.student.admissionId
      this.$axios.get('status/' + this.admissionId + '/' + this.$store.state.user.user.role + '/' + this.$store.state.user.user.city.id + '/' + this.$store.state.user.user.district.id).then(res => {
        if (res.data.code === 1) {
          this.$store.dispatch('status/setStudent', res.data.data)
        } else {
          this.$alert(res.data.message, '错误', {
            confirmButtonText: '确定' })
        }
      }).catch(console.error()
      )
    }
  },
  methods: {
    onSubmit: function() {
      if (this.admissionId !== '') {
        this.$axios.get('status/' + this.admissionId + '/' + this.$store.state.user.user.role + '/' + this.$store.state.user.user.city.id + '/' + this.$store.state.user.user.district.id).then(res => {
          if (res.data.code === 1) {
            this.$store.dispatch('status/setStudent', res.data.data)
          } else {
            this.$alert(res.data.message, '错误', {
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
