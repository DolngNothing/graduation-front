<template>
  <el-collapse >
    <el-collapse-item name="1" class="collap">
      <template slot="title" >
        <span class="collapText"> 学校统计</span>
      </template>
      <el-row>
        <el-col style="width:600px;margin-left:50px"><schoolAll /></el-col>
        <el-col style="width:600px;margin-left:50px"><schoolYear /></el-col>
      </el-row>
    </el-collapse-item>
    <el-collapse-item name="2" class="collap">
      <template slot="title" >
        <span class="collapText"> 专业统计</span>
      </template>
      <el-row>
        <el-col style="width:600px;margin-left:100px"><majorAll /></el-col>
        <el-col style="width:600px;margin-left:100px"><majorYear /></el-col>
      </el-row>
    </el-collapse-item>
    <el-collapse-item name="3" class="collap">
      <template slot="title" >
        <span class="collapText"> 地区统计</span>
      </template>
      <el-select v-model="city" placeholder="请选择" @change="selectCity">
        <el-option
          v-for="item in citys"
          :key="item.id"
          :label="item.name"
          :value="item.id"/>
      </el-select>
      <el-row>
        <el-col style="width:600px;margin-left:100px"><districtYear /></el-col>
        <el-col style="width:600px;margin-left:100px"><districtAll /></el-col>
      </el-row>
    </el-collapse-item>
    <el-collapse-item name="4" class="collap">
      <template slot="title" >
        <span class="collapText"> 历年统计</span>
      </template>
      <el-row>
        <el-col style="width:1000px;margin-left:100px"><graduateYear /></el-col>
      </el-row>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import schoolAll from './echarts/schoolAll'
import majorAll from './echarts/majorAll'
import schoolYear from './echarts/schoolYear'
import majorYear from './echarts/majorYear'
import districtYear from './echarts/districtYear'
import districtAll from './echarts/districtAll'
import graduateYear from './echarts/graduateYear'
export default {
  components: {
    schoolAll,
    majorAll,
    schoolYear,
    majorYear,
    districtYear,
    districtAll,
    graduateYear
  },
  data() {
    return {
      citys: [],
      city: ''
    }
  },
  created() {
    this.$axios.get('citys').then(res => {
      this.citys = res.data.data
      this.$store.dispatch('graduate/setCitys', this.citys)
    })
  },
  methods: {
    selectCity() {
      this.$axios.get('districts/' + this.city).then(res => {
        this.$store.dispatch('graduate/setDistrict', res.data.data)
      })
    }
  }
}
</script>

<style>
.collap{
  border-radius: 10px;
  border:solid 1px rgba(163, 199, 235, 0.74);
}
.collapText{
  font-size: 17px;
  margin: 15px;
}
</style>
