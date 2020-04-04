<!-- 图表 -->
<template>
  <div>
    <!-- 内容 -->
    <div id="graduateYear" style="width: 600px;height: 500px;"></div>
  </div>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
      titleText: '过去五年毕业生统计',
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
      passYear: []
    }
  },
  computed: {
    graduateListForAll: function() {
      return this.$store.state.graduate.graduateListForAll
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
          this.tempList = this.graduateListForAll.filter((item) => {
            return item.graduateDate.includes(theyear)
          })
          this.opinionData.push(this.tempList.length)
          this.tempList = []
        }

        this.opinion = JSON.parse(JSON.stringify(this.opinion))
        this.opinionData = JSON.parse(JSON.stringify(this.opinionData))

        // 基于准备好的dom，初始化echarts实例
        const myChart = this.$echarts.init(document.getElementById('graduateYear'))
        // 绘制图表，this.echarts1_option是数据
        myChart.clear()
        myChart.setOption(this.options)
      }
    })
  }

}
</script>
