<!-- 图表 -->
<template>
  <div>
    <!-- 内容 -->
    <div id="echarts3" style="width: 600px;height: 500px;"></div>
  </div>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
      titleText: '今年：毕业生专业统计',
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
      temp: { value: '', name: '' },
      myChart: {
      }
    }
  },
  computed: {
    graduateListForAll: function() {
      return this.$store.state.graduate.graduateListForAll
    },
    majorList: function() {
      return this.$store.state.graduate.majorList
    },
    options: function() {
      return {
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
      }
    }
  },
  watch: {
    'options': function(newVal, oldVal) {
      if (newVal) {
        this.myChart.setOption(newVal, true)
        console.log('更改')
      }
    }
  },
  beforeMount: function() {
    this.$axios.get('majors').then(res => {
      if (res.data.code === 1) {
        this.$store.dispatch('graduate/setMajorList', res.data.data)
      }
    })
    this.$axios.get('graduates').then(res => {
      if (res.data.code === 1) {
        this.$store.dispatch('graduate/setGraduateListForAll', res.data.data)
        var j, len
        for (j = 0, len = this.majorList.length; j < len; j++) {
          var school = JSON.parse(JSON.stringify(this.majorList[j]))
          var date = new Date()
          var year = date.getFullYear()
          this.tempList = this.graduateListForAll.filter((item) => {
            return item.student.major.name.includes(school.name) && item.graduateDate.includes(year)
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
        this.myChart = this.$echarts.init(document.getElementById('echarts3'))
        // 绘制图表，this.echarts1_option是数据
        this.myChart.setOption(this.options, true)
      }
    })
  }

}
</script>
