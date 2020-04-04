<template>
  <div>
    <template v-for="v in menuList">
      <el-submenu v-if="v.children&&v.children.length>0" :index="v.name" :key="v.name">
        <template slot="title">
          <i :class="v.meta.icon" class="iconfont"></i>
          <span>{{ v.meta.name }}</span>
        </template>
        <el-menu-item-group>
          <my-nav :menu-list="v.children"/>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item v-else :key="v.name" :index="v.name" @click="gotoRoute(v.name)">
        <i :class="v.meta.icon" class="iconfont"></i>
        <span slot="title">{{ v.meta.name }}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  name: 'MyNav',
  props: {
    menuList: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  methods: {
    gotoRoute(name) {
      this.$router.push({ name })
    }
  }
}
</script>
<style>
.gtitle{
  font-size: 10px;
}
</style>
