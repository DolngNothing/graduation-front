<template>

  <el-dialog
    :visible.sync="dialogVisible"
    width="400px"
  >

    <div class="userCard titleHigh">
      <i class="el-icon-success userInfo " ></i>
      <span class="userInfo">打印成功！负责人：</span>
    </div>
    <div class="userCard contentHigh">
      <span v-if=" 'role' in user" class="userInfo">{{ user.role }} <br/></span>
      <span class="userInfo">{{ user.city.name }} </span>
      <span class="userInfo">{{ user.district.name }} </span>
      <span v-if=" 'account' in user" class="userInfo">负责人账号名：{{ user.account }} <br/></span>
      <span v-if=" 'name' in user" class="userInfo">负责人名字：{{ user.name }}<br/> </span>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button class="dialogButton" type="primary" @click="close">确 定</el-button>
    </span>
  </el-dialog>

</template>

<script>
export default {
  computed: {
    user: function() {
      return this.$store.state.user.user
    },
    dialogVisible: function() {
      return this.$store.state.dialogVisible
    }
  },
  methods: {
    close: function() {
      this.$store.commit('setDialogVisible', false)
    }
  }
}
</script>

<style>

.userCard{
    width: 400px;
    position: relative;
    font-size: 20px;
}

.titleHigh{
  height: 35px;
}

.contentHigh{
  height: 180px;
}

.userInfo{
    display: inline-flex;
    float:left;
    width:25vh;
    line-height:30px;
    padding:0px;
    margin:0px;
    font-size: 19px;
    left: 15px;
    top: 0px;
}

.iconp{
    position: absolute;
    left: 0px;
}

.dialog-footer{
  display: block;
  position: relative;
  top: 0px;
  left: 38%;
  width: 100px;
  height: 30px;
}

.dialogButton{
  position: absolute;
  top: 0;
  left: 0;
}

.el-dialog{
  border-radius: 30px
}

.el-icon-success{
  color: #006600
}
</style>
