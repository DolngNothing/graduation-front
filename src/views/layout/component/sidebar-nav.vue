<template>
  <el-menu
    :collapse="isSidebarNavCollapse"
    :default-active="currentMenu"
    background-color="#304156"
    text-color="#eee"
    active-text-color="#4dbcff"
    class="el-menu-vertical-demo"
  >
    <DynamicMenu :menu-list="sidebarMenu"/>
  </el-menu>
</template>

<script>
import DynamicMenu from '@/views/layout/component/dynamic-menu'
import { mapState } from 'vuex'

export default {
  components: {
    DynamicMenu
  },
  data() {
    return {
      isCollapse: true
    }
  },
  computed: {
    ...mapState(['isSidebarNavCollapse']),
    ...mapState('permission', ['sidebarMenu', 'currentMenu'])
  },
  methods: {}

}
</script>

<style>
.el-menu-vertical-demo{
  width: auto;
  height: 100%;
}
</style>
