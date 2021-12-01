import { login, logout, getInfo, func_qr_check } from '@/api/user'
import { getToken, setToken, removeToken, getToken_qr, setToken_qr, removeToken_qr } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    token_qr: getToken_qr(),
    auth_id: '',
    auth_qr: '',
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  set_token_qr: (state, val) => {
    state.token_qr = val
  },
  set_auth_qr: (state, val) => {
    state.auth_qr = val
  },
  set_auth_id: (state, val) => {
    state.auth_id = val
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // 用户登录
  login({ commit }, userInfo) {
    const { site_id, username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ uid: username.trim(), pwd: password, site_id: site_id }).then(data => {
        console.log('***** login结果：', data)
        commit('SET_TOKEN', data.tokenAdmin)
        commit('set_auth_qr', data.auth_qr)
        commit('set_auth_id', data.auth_id)
        setToken(data.tokenAdmin)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 检查二维码
  func_qr_check({ commit, state }) {
    return new Promise((resolve, reject) => {
      func_qr_check(state.auth_id, state.token).then(data => {
        // console.log('***** func_qr_check结果：', data)
        if (!data) {
          return reject('请重新登录')
        }
        commit('set_token_qr', data.tokenAdmin)
        setToken_qr(data.tokenAdmin)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        removeToken_qr()
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      removeToken_qr()
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

