<template>
  <div class="applyContent">
    <h1 style="line-height :30px;font-size:25px">
      填写你申请的前置专业
    </h1>
    <el-form ref="graduate" :model="graduate" label-position="right" label-width="100px">
      <el-form-item
        label="专业:">
        <el-select v-model="graduate.major.id" placeholder="请选择专业">
          <div v-for="(item) in majorList" :key="item.id">
            <el-option :label="item.name" :value="item.id"/>
          </div>
        </el-select>
      </el-form-item>
      <el-form-item
        label="学校:">
        <el-select v-model="graduate.school.id" placeholder="请选择学校">
          <div v-for="(item) in schoolList" :key="item.id">
            <el-option :label="item.name" :value="item.id"/>
          </div>
        </el-select>
      </el-form-item>
      <el-form-item
        label="毕业时间:">
        <el-date-picker
          v-model="graduate.graduateDate"
          :picker-options="pickerOptions"
          type="month"
          value-format="yyyy-MM"
          placeholder="选择毕业时间"
        />
      </el-form-item>
      <el-form-item
        label="选择学历:">
        <el-select v-model="graduate.educationLevel" placeholder="请选择学历">
          <el-option label="本科" value="本科"/>
          <el-option label="专科" value="专科"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
  data() {
    return {
      graduate: {
        major: {
          id: ''
        },
        school: {
          id: ''
        },
        graduateDate: '',
        educationLevel: ''
      },
      pickerOptions: {
        // disabledDate是一个函数,参数是当前选中的日期值,这个函数需要返回一个Boolean值,
        disabledDate: (time) => {
          // 如果函数处理比较简单,可以直接在这里写逻辑方法
          // return time.getTime() < Date.now() - 8.64e7

          // 如果函数里处理的数据比较麻烦,也可以单独放在一个函数里,避免data数据太臃肿
          return this.dealDisabledDate(time)
        }
      },
      majorList: [],
      schoolList: []
    }
  },
  mounted() {
    this.$axios.get('majors').then(res => {
      if (res.data.code === 1) {
        console.log(111111111)
        this.majorList = res.data.data
      }
    })
    this.$axios.get('schools').then(res => {
      if (res.data.code === 1) {
        console.log(111111111)
        this.schoolList = res.data.data
      }
    })
  },
  methods: {
    onSubmit: function() {
      console.log(this.graduate.graduateDate)
      this.$axios.put('frontDegree/' + this.$store.state.student.student.admissionId, this.graduate).then(res => {
        if (res.data.code === 1) {
          this.$message({
            message: '恭喜你，这是一条成功消息',
            type: 'success'
          })
        } else {
          this.$message.error({
            message: res.data.message
          })
        }
      })
    },
    dealDisabledDate(time) {
      // time.getTime是把选中的时间转化成自1970年1月1日 00:00:00 UTC到当前时间的毫秒数
      // Date.now()是把今天的时间转化成自1970年1月1日 00:00:00 UTC到当前时间的毫秒数,这样比较好比较
      // return的值,true是不可以操作选择,false可以操作选择,比如下面这个判断就只能选择今天之后的时间
      return (time.getMonth() !== 5 && time.getMonth() !== 11)

      // 这里减8.64e7的作用是,让今天的日期可以选择,如果不减的话,今天的日期就不可以选择,判断中写<= 也是没用的,一天的毫秒数就是8.64e7
      // return time.getTime() <= Date.now()
      // return time.getTime() < Date.now() - 8.64e7
    }
  }
}
</script>

<style>
.applyContent{
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 30px;
  width: 330px;
  height: 500px;
}
</style>
