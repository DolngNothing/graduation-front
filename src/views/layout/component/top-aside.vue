<template>
  <div >
    <span class="systitle">省自考系统毕业管理子系统</span>
    <el-dropdown class="aside-right">
      <span>
        <el-avatar :size="60" fit="fill">
          <img src="../../../assets/touxiang.png" />
        </el-avatar>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <div>
            <span>权限:{{ this.$store.state.user.user.role }}</span>
          </div>
        </el-dropdown-item>
        <el-dropdown-item>
          <div>
            <el-button type="text" @click="logout">退出登录</el-button>
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      sessionStorage.removeItem('user')
      sessionStorage.removeItem('student')
      this.$store.dispatch('user/logout')
      this.$store.dispatch('student/deleteStudent')
      this.$router.go(0)
    }
  }
}
</script>

<style>
.systitle{
  font-family: "Microsoft YaHei";
  font-weight:bold;
  font-size: 19px;
  letter-spacing:1.5px;
}
</style>
