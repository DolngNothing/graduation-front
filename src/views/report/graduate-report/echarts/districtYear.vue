<!-- 图表 -->
<template>
  <div>
    <!-- 内容 -->
    <div id="echarts4" style="width: 600px;height: 500px;"></div>
  </div>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
      titleText: '今年：毕业生地区统计',
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
    majorList: function() {
      return this.$store.state.graduate.majorList
    },
    district: function() {
      return this.$store.state.graduate.district
    },
    citys: function() {
      return this.$store.state.graduate.citys
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
    'district': function(newVal, oldVal) {
      this.$axios.get('test').then(res => {
        if (res.data.code === 1) {
          this.opinion = []
          this.opinionData = []
          var j, len
          for (j = 0, len = this.district.length; j < len; j++) {
            var school = JSON.parse(JSON.stringify(this.district[j]))
            var date = new Date()
            var year = date.getFullYear()
            this.tempList = this.graduateListForAll.filter((item) => {
              return item.student.user.district.name.includes(school.name) && item.graduateDate.includes(year)
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
          const myChart = this.$echarts.init(document.getElementById('echarts4'))
          // 绘制图表，this.echarts1_option是数据
          myChart.clear()
          myChart.setOption(this.options)
        }
      })
    }
  },
  mounted() {
    this.$axios.get('test').then(res => {
      if (res.data.code === 1) {
        console.log(this.citys)
        this.opinion = []
        this.opinionData = []
        var j, len
        var school
        var date = new Date()
        var year = date.getFullYear()
        for (j = 0, len = this.citys.length; j < len; j++) {
          school = JSON.parse(JSON.stringify(this.citys[j]))
          this.tempList = this.graduateListForAll.filter((item) => {
            return item.student.user.city.name.includes(school.name) && item.graduateDate.includes(year)
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
        const myChart = this.$echarts.init(document.getElementById('echarts4'))
        // 绘制图表，this.echarts1_option是数据
        myChart.clear()
        myChart.setOption(this.options)
      }
    })
  }
}
</script>
