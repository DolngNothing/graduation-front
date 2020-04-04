<template>
  <div>
    <el-container>
      <el-header class="back1">
        <bread class="bread"/>
      </el-header>
      <el-header class="back">
        <search />
      </el-header>
      <el-main class="contents">
        <contents />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import search from './search'
import bread from '@/components/breadcrumb'
import contents from './contents'
export default {
  components: {
    search,
    bread,
    contents
  },
  data() {
    return {
    }
  },
  destroyed() {
    this.$store.dispatch('frontDegree/deleteFrontDegree')
  }
}
</script>

<style>
  .back{
    display: block;
    background-color:#E9EEF3;
    height: 400px;
  }
    .back1{
    background-color:#E9EEF3;
    position: relative;
  }
  .list{
    height: 70vh;
  }
  .contents{
    position: absolute;
    top:200px;
  }
</style>
