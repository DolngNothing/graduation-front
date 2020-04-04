<!-- 图表 -->
<template>
  <div>
    <!-- 内容 -->
    <div id="echarts1" style="width: 600px;height: 600px;"></div>
  </div>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
      titleText: '今年:毕业生学校统计',
      tooltipFormatter: '毕业生数量',
      opinion: [],
      seriesName: '毕业生数量统计',
      opinionData: [],
      tempList: [],
      s: {
        height: '',
        width: '',
        border: ''
      },
      temp: { value: '', name: '' }
    }
  },

  computed: {
    graduateListForAll: function() {
      return this.$store.state.graduate.graduateListForAll
    },
    schoolList: function() {
      return this.$store.state.graduate.schoolList
    }
  },
  beforeMount: function() {
    this.$axios.get('schools').then(res => {
      if (res.data.code === 1) {
        this.$store.dispatch('graduate/setSchoolList', res.data.data)
      }
    })
    this.$axios.get('test').then(res => {
      if (res.data.code === 1) {
        var j, len
        for (j = 0, len = this.schoolList.length; j < len; j++) {
          var school = JSON.parse(JSON.stringify(this.schoolList[j]))
          var date = new Date()
          var year = date.getFullYear()
          console.log(school.name)
          this.tempList = this.graduateListForAll.filter((item) => {
            return item.student.school.name.includes(school.name) && item.graduateDate.includes(year)
          })
          this.temp.value = this.tempList.length
          this.temp.name = school.name
          this.opinion.push(school.name)
          this.opinionData.push(this.temp)
          this.temp = {}
          this.tempList = []
        }
        this.opinion = JSON.parse(JSON.stringify(this.opinion))
        this.opinionData = JSON.parse(JSON.stringify(this.opinionData))

        // 基于准备好的dom，初始化echarts实例
        const myChart = this.$echarts.init(document.getElementById('echarts1'))
        // 绘制图表，this.echarts1_option是数据
        myChart.setOption({
          title: {
            text: this.titleText, // 标题文本
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/> ' + this.tooltipFormatter + ':{c}'
          },
          legend: {
            bottom: 20,
            left: 'center',
            data: this.opinion // 扇形区域名称
          },
          series: [
            {
              name: this.seriesName, // 提示框标题
              type: 'pie',
              radius: '65%',
              center: ['50%', '50%'],
              selectedMode: 'single',
              data: this.opinionData, // 扇形区域数据
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        })
      }
    })
  }

}
</script>
