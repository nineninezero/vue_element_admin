import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/z_ui/a_admin/index'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // console.log('路由导航守卫：', to, from, next)
  NProgress.start()

  document.title = getPageTitle(to.meta.title)

  const hasToken = getToken()

  if (hasToken) {
    console.log('存在token_login')
    if (to.path === '/z_ui/a_admin/index') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (to.path === '/z_ui/a_admin/index_qr') {
        // 有token_login了可以去二维码页
        next()
        return
      }
      // （准备换成判断二维码token的）
      // const hasGetUserInfo = store.getters.name
      // if (hasGetUserInfo) {
      //   next()
      // } else {
      //   try {
      //     // get user info
      //     await store.dispatch('user/getInfo')

      //     next()
      //   } catch (error) {
      //     // remove token and go to login page to re-login
      //     await store.dispatch('user/resetToken')
      //     Message.error(error || 'Has Error')
      //     next(`/z_ui/a_admin/index?redirect=${to.path}`)
      //     NProgress.done()
      //   }
      // }
      next()
    }
  } else {
    console.log('未有token_login')

    if (whiteList.indexOf(to.path) !== -1) {
      // 白名单直接跳
      next()
    } else {
      next(`/z_ui/a_admin/index?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
