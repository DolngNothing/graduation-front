<!-- 图表 -->
<template>
  <div>
    <!-- 内容 -->
    <div id="thesisYear" style="width: 600px;height: 500px;"></div>
  </div>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
      titleText: '过去五年论文统计',
      tooltipFormatter: '论文数量',
      opinion: [],
      seriesName: '论文数量统计',
      opinionData: [],
      tempList: [],
      s: {
        height: '',
        width: '',
        border: ''
      },
      temp: { value: '', name: '' },
      passYear: []
    }
  },
  computed: {
    thesisList: function() {
      return this.$store.state.thesis.thesisList
    },
    options: function() {
      return {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.opinion,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: this.tooltipFormatter,
            type: 'bar',
            barWidth: '60%',
            data: this.opinionData
          }
        ]
      }
    }
  },
  mounted() {
    this.$axios.get('test').then(res => {
      if (res.data.code === 1) {
        this.opinion = []
        this.opinionData = []
        var date = new Date()
        var year = date.getFullYear()
        for (var i = 4; i >= 0; i--) {
          var theyear = year - i
          this.opinion.push(theyear)
          this.tempList = this.thesisList.filter((item) => {
            return item.passDate.includes(theyear)
          })
          this.opinionData.push(this.tempList.length)
          this.tempList = []
        }

        this.opinion = JSON.parse(JSON.stringify(this.opinion))
        this.opinionData = JSON.parse(JSON.stringify(this.opinionData))

        // 基于准备好的dom，初始化echarts实例
        const myChart = this.$echarts.init(document.getElementById('thesisYear'))
        // 绘制图表，this.echarts1_option是数据
        myChart.clear()
        myChart.setOption(this.options)
      }
    })
  }

}
</script>
