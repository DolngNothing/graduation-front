<template>
  <div>
    <el-container>
      <el-header class="head1"> <bread class="bread"/></el-header>
      <el-header class="head"><Search /></el-header>
      <el-main>
        <Content>
      </content></el-main>
    </el-container>
  </div>
</template>

<script>
import Search from './Search'
import Content from './content'
import bread from '@/components/breadcrumb'
export default {
  components: {
    Search,
    Content,
    bread
  },
  data() {
    return {
    }
  },
  destroyed() {
    this.$store.dispatch('student/deleteStudent')
    this.$store.dispatch('grade/deleteCourseGrade')
    this.$store.dispatch('grade/deleteCE')
  }
}
</script>

<style>
.head{
  background-color: #E9EEF3
}
.head1{
  background-color: #E9EEF3;
  position: relative;
}
.bread{
  position: absolute;
  left: 0px;
}
</style>
