import Cookies from 'js-cookie'

const TokenKey = 'token_login'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// 二维码的token
export function getToken_qr() {
  return Cookies.get('token_qr')
}

export function setToken_qr(val) {
  return Cookies.set('token_qr', val)
}

export function removeToken_qr() {
  return Cookies.remove('token_qr')
}
