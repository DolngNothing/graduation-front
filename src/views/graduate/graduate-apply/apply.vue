<template>

  <el-row>
    <el-col style="width:270px">
      <el-select v-model="major.id" placeholder="请选择专业">
        <div v-for="(item) in majorList" :key="item.id">
          <el-option :label="item.name" :value="item.id"/>
        </div>
      </el-select>
    </el-col>
    <el-col style="width:200px">
      <el-date-picker
        v-model="graduateDate"
        :picker-options="pickerOptions"
        type="month"
        placeholder="选择毕业时间"
    /></el-col>
    <el-col style="width:200px">
      <el-button @click="check">查询毕业资格</el-button>
    </el-col>
    <el-col style="width:100px">
      <el-button @click.native.prevent="apply">申请毕业</el-button>
    </el-col>
  </el-row>

</template>

<script>
export default {
  data() {
    return {
      major: {
        id: ''
      },
      majorList: [],
      pickerOptions: {
        // disabledDate是一个函数,参数是当前选中的日期值,这个函数需要返回一个Boolean值,
        disabledDate: (time) => {
          // 如果函数处理比较简单,可以直接在这里写逻辑方法
          // return time.getTime() < Date.now() - 8.64e7

          // 如果函数里处理的数据比较麻烦,也可以单独放在一个函数里,避免data数据太臃肿
          return this.dealDisabledDate(time)
        }
      }, // 日期设置对象
      graduateDate: {}
    }
  },
  computed: {
    student: function() {
      return this.$store.state.student.student
    }
  },
  mounted() {
    this.$axios.get('majors').then(res => {
      if (res.data.code === 1) {
        this.majorList = res.data.data
      }
    })
  },
  methods: {
    apply: function() {
      this.$confirm('此操作将申请毕业(不可取消), 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.major.id !== '' && (JSON.stringify(this.graduateDate) !== '{}' && JSON.stringify(this.graduateDate) !== 'null')) {
          this.$axios.post('graduationApply/' + this.student.admissionId + '/' + this.major.id, this.graduateDate).then(res => {
            if (res.data.code === 1) {
              this.$message({
                message: res.data.message,
                type: 'success'
              })
            } else {
              this.$message.error(res.data.message)
            }
          }).catch(console.log(this.error))
        } else {
          this.$message.error('请选择申请毕业的专业和时间')
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    check: function() {
      console.log(JSON.stringify(this.graduateDate))
      if (this.major.id !== '' && (JSON.stringify(this.graduateDate) !== '{}' && JSON.stringify(this.graduateDate) !== 'null')) {
        console.log(this.major.id)
        this.$axios.post('graduationApply/queryQualify/' + this.student.admissionId + '/' + this.major.id, this.graduateDate).then(res => {
          if (res.data.code === 1) {
            this.$message({
              message: res.data.message,
              type: 'success'
            })
          } else {
            this.$message.error(res.data.message)
          }
        })
      } else {
        this.$message.error('请选择申请毕业的专业和时间')
      }
    },
    dealDisabledDate(time) {
      // time.getTime是把选中的时间转化成自1970年1月1日 00:00:00 UTC到当前时间的毫秒数
      // Date.now()是把今天的时间转化成自1970年1月1日 00:00:00 UTC到当前时间的毫秒数,这样比较好比较
      // return的值,true是不可以操作选择,false可以操作选择,比如下面这个判断就只能选择今天之后的时间
      return time.getTime() < Date.now() || time.getFullYear() !== new Date().getFullYear() || (time.getMonth() !== 5 && time.getMonth() !== 11)

      // 这里减8.64e7的作用是,让今天的日期可以选择,如果不减的话,今天的日期就不可以选择,判断中写<= 也是没用的,一天的毫秒数就是8.64e7
      // return time.getTime() <= Date.now()
      // return time.getTime() < Date.now() - 8.64e7
    }
  }

}
</script>

<style>

</style>
