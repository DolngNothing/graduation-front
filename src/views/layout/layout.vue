<template>
  <div class="homeBox ca">
    <el-container style="height:100%;" direction="vertical" position="absolute">
      <el-header>
        <topAside/>
      </el-header>
      <el-container>
        <el-aside width="200px" min-height="1080px"><sidebarNav /></el-aside>
        <el-main><mainContent/></el-main>
      </el-container>
    </el-container>
  </div>

</template>

<script>
import sidebarNav from '@/views/layout/component/sidebar-nav'
import mainContent from '@/views/layout/component/main-content'
import topAside from './component/top-aside'
import { mapState } from 'vuex'
export default {
  components: {
    sidebarNav,
    mainContent,
    topAside
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(['isSidebarNavCollapse'])
  }

}
</script>

<style type="text/css">
  html,
  body,
  #homebox,
  .el-container{
    padding: 0px;
    margin:0px;
    height: 100%;
  }

  .ca{
    background-color: #304156
  }

  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
    height: 6vh;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
    height: 94vh;
    display: block;
    position: relative;
    margin-bottom: 0px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .aside-right{
    position: absolute;
    right: 50px;
  }
</style>
