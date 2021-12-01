<template>
  <div class="qr-container">
    <img class="qr_img" :src="$store.state.user.auth_qr" alt="">
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'

export default {
  name: 'Qr',
  data() {
    return {
      token_login: '',
      redirect: ''
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    console.log('=== ct index_qr', this.$store.state.user.auth_qr)
    this.token_login = getToken()
    this.func_qr_check()
  },
  methods: {
    func_qr_check() {
      this.loading = true
      this.$store.dispatch('user/func_qr_check', this.$store.state.user.auth_id, this.token_login).then((data) => {
        if (data.errcode !== 0) {
          if (data.errcode === -100) {
            // 等待扫码，定时触发
            setTimeout(() => {
              this.func_qr_check()
            }, 2000)
          } else {
            Message({
              message: data.errmsg || 'Error',
              type: 'error',
              duration: 5 * 1000
            })
          }
        } else {
          console.log('检查二维码成功')

          this.$router.replace({ path: this.redirect })
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss">
img{
  display: block;
  height: auto;
  margin-bottom: 0;
}
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.qr-container {

}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.qr-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .qr_img{
    width: 400px;
  }
}
</style>
