<template>
  <el-breadcrumb separator="/">
    <transition-group name="breadcrumb">
      <!-- 防止面包屑导航出现 首页/首页， v-if="route.name!='home'" -->
      <el-breadcrumb-item
        v-for="(route,i) in crumbList"
        :key="route.name"
        :to="{name:route.name}"
        :class="{'is-last-link':i==crumbList.length-1}"
      >
        {{ route.meta.name }}
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState(['crumbList'])
  }
}
</script>

<style>
.el-breadcrumb {
    display: inline-block;
    vertical-align: middle;
    font-size: 14px;
    margin-left: 5px;
}
.breadcrumb-enter,
.breadcrumb-leave-active {
    opacity: 0;
    transform: translateX(20px);
}

.breadcrumb-enter-active,
.breadcrumb-leave-active {
    transition: all 0.6s;
}

.breadcrumb-leave-active {
    position: absolute;
}
</style>
