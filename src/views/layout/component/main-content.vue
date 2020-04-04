<template>
  <div>
    <Content></Content>
  </div>
</template>

<script>
import Content from './content'
import { mapState } from 'vuex'

export default {
  components: {
    Content
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(['isSidebarNavCollapse'])
  }
}
</script>

