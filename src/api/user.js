import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/zz_admin/index/login',
    method: 'post',
    data
  })
}

export function func_qr_check(auth_id, tokenAdmin) {
  return request({
    url: 'zz_admin/index_qr/check',
    method: 'post',
    params: { auth_id, tokenAdmin }
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
