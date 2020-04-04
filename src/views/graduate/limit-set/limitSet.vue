<template>
  <div>
    <el-container>
      <el-header class="back1">
        <bread class="bread"/>
      </el-header>
      <el-header class="back"/>
      <el-main>
        <contents />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import bread from '@/components/breadcrumb'
import contents from './contents'
export default {
  components: {
    bread,
    contents
  },
  data() {
    return {
    }
  },
  destroyed() {
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
