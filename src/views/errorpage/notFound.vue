<template>
  <div class="bg">
    <transition :name="transitionName">
      <div>

        <div class="head404"></div>

        <div class="txtbg404">

          <div class="txtbox">

            <p>对不起，您请求的页面不存在、或已被删除、或暂时不可用</p>

            <p class="paddingbox">请点击以下链接继续浏览网页</p>
            <br/>
            <p><a style="cursor:pointer" @click.prevent="back()">返回首面</a></p>

          </div>

        </div>
      </div>

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
  methods: {
    back() {
      this.$router.replace({ path: '/' })
    }
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
.head404{ width:580px; height:234px; margin:50px auto 0 auto; background:url(https://www.daixiaorui.com/Public/images/head404.png) no-repeat; }

.txtbg404{ width:499px; height:169px; margin:10px auto 0 auto; background:url(https://www.daixiaorui.com/Public/images/txtbg404.png) no-repeat;}

.txtbg404 .txtbox{ width:390px; position:relative; top:30px; left:60px;color:#eee; font-size:13px;}

.txtbg404 .txtbox p {margin:5px 0; line-height:18px;}

.txtbg404 .txtbox .paddingbox { padding-top:15px;}

.txtbg404 .txtbox p a { color:#eee; text-decoration:none;}

.txtbg404 .txtbox p a:hover { color:#FC9D1D; text-decoration:underline;}
.bg{
  display: block;
  background-color:#494949;
  outline:solid rgb(0, 0, 0);
      height: 100%;
      width: 100%;
      position: absolute;
}
</style>
