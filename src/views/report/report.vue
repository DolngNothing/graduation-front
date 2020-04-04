<template>
  <div>
    <transition :name="transitionName">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      transitionName: ''
    }
  },
  watch: {// 使用watch 监听$router的变化
    $route(to, from) {
      // 如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if (to.meta.index > from.meta.index) {
        // 设置动画名称
        this.transitionName = 'slide-left'
      } else {
        this.transitionName = 'slide-right'
      }
    }
  },
  created() {
    this.$axios.get('schools').then(res => {
      if (res.data.code === 1) {
        this.$store.dispatch('graduate/setSchoolList', res.data.data)
      }
    })
    this.$axios.get('majors').then(res => {
      if (res.data.code === 1) {
        this.$store.dispatch('graduate/setMajorList', res.data.data)
      }
    })
    this.$axios.get('graduates').then(res => {
      if (res.data.code === 1) {
        this.$store.dispatch('graduate/setGraduateListForAll', res.data.data)
      }
    })
  }
}
</script>
<style>
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
