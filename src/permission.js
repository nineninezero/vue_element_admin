import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken, getToken_qr } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/z_ui/a_admin/index', '/z_ui/a_admin/index_qr'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // console.log('路由导航守卫：', to, from, next)
  NProgress.start()

  document.title = getPageTitle(to.meta.title)

  const hasToken = getToken()
  const hasToken_qr = getToken_qr()

  if (hasToken_qr) {
    console.log('存在token_qr')
    if (to.path === '/z_ui/a_admin/index') {
      // 自动跳首页
      next({ path: '/' })
      NProgress.done()
    } else {
      next()
      NProgress.done()

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
    }
  } else {
    console.log('未有token_qr')
    if (whiteList.indexOf(to.path) !== -1) {
      // 白名单直接跳
      next()
    } else {
      if (hasToken) {
        // 已登录，跳二维码页
        next(`/z_ui/a_admin/index_qr?redirect=${to.path}`)
      } else {
      // 未登录，先去登录页
        next(`/z_ui/a_admin/index?redirect=${to.path}`)
      }
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
