<template >
  <body class="background">
    <div>
      <div class="login-logo">
        <img class="logo" src="@/assets/logo1.png" />
      </div>
      <div class="login-container">
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          autocomplete="on"
          label-position="left"
        >
          <div class="login_title">
            <h2 class="title">Login</h2>
          </div>

          <el-form-item prop="username">
            <el-input
              ref="username"
              v-model="loginForm.username"
              placeholder="Username"
              name="username"
              type="text"
              tabindex="1"
              autocomplete="on"
            />
          </el-form-item>

          <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
            <el-form-item prop="password">

              <el-input
                ref="password"
                :key="passwordType"
                v-model="loginForm.password"
                :type="passwordType"
                placeholder="Password"
                name="password"
                tabindex="2"
                autocomplete="on"
                @keyup.native="checkCapslock"
                @blur="capsTooltip = false"
                @keyup.enter.native="handleLogin"
              />

            </el-form-item>
          </el-tooltip>
          <el-button
            :loading="loading"
            type="primary"
            style="width:100%;margin-bottom:30px;"
            @click.native.prevent="handleLogin"
          >Login</el-button>
        </el-form>
      </div>
    </div>
  </body>
</template>

<script>

export default {
  name: 'Login',
  components: {},
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The Username can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  /*
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  */
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$axios.post('login', {
            account: this.loginForm.username,
            password: this.loginForm.password
          })
            .then(res => {
              if (sessionStorage.getItem('timeTable') === null) {
                console.log('存储timeTable')
                this.$axios.get('timeTable').then(res => {
                  if (res.data.code === 1) {
                    sessionStorage.setItem('timeTable', JSON.stringify(res.data.data))
                  }
                })
              }
              if (res.data.code === 1) {
                sessionStorage.setItem('user', JSON.stringify(res.data.data))
                this.$store.dispatch('user/login', res.data.data)
                if (res.data.data.role === '用户') {
                  console.log('初次登陆检测到为用户')
                  this.$axios.get('student/user/' + res.data.data.account).then(res => {
                    if (res.data.code === 1) {
                      this.$store.dispatch('student/setStudent', res.data.data)
                      sessionStorage.setItem('student', JSON.stringify(res.data.data))
                    }
                  })
                }
                this.$notify({
                  title: res.data.message,
                  message: '将跳转',
                  type: 'success'
                })
                setTimeout(() => { this.$router.replace({ path: '/' }) }, 1000)
                console.log(this.$store.state.user.user.password)
              } else if (res.data.code === 0) {
                this.loading = false
                this.$notify.error({
                  title: res.data.message,
                  message: '将跳转'
                })
                setTimeout(() => this.$router.go(0), 1000)
              }
            })
            .catch(err => {
              console.error(err)
            })
          /*
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            }) */
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style>
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 0px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: rgba(255, 255, 255, .5);
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.login-logo{
  margin: 0 auto; /*水平居中*/
  text-align:center;
}

.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}

.logo {
  margin: 80px;
  text-align: center;
  width: 13%;
  height: 13%;
}

.background{
  background: url("../../assets/back1.jpg") no-repeat;
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: 100%;
  position: fixed;
}
body{
  margin: 0px;
}
</style>
