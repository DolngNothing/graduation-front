<template>
  <div>
    <el-container>
      <el-header class="back1">
        <bread class="bread"/>
      </el-header>
      <el-header class="back">
        <search />
      </el-header>
      <el-main>
        <transition name="el-fade-in-linear">
          <contents />
      </transition></el-main>
    </el-container>
  </div>
</template>

<script>
import search from './search'
import bread from '@/components/breadcrumb'
import contents from './content'
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
    this.$store.dispatch('status/deleteStudent')
  }
}
</script>

<style>
  .back{
    background-color:#E9EEF3
  }
    .back1{
    background-color:#E9EEF3;
    position: relative;
  }
  .list{
    height: 70vh;
  }
</style>
