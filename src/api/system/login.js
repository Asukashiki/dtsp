 import request from '@/utils/agricultureRequest'

// 登录方法
export function login(username, password, code, uuid) {
  const data = {
    username,
    password,
    code,
    uuid
  }
  return request({
    url: '/login',
    headers: {
      isToken: false,
      repeatSubmit: false
    },
    method: 'post',
    data: data
  })
}

// 注册方法
export function register(data) {
  return request({
    url: '/register',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/getInfo',
    method: 'get'
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

// 获取验证码
export function getCodeImg() {
  return request({
    url: '/captchaImage',
    headers: {
      isToken: false
    },
    method: 'get',
    timeout: 20000
  })
}

// 获取路由（当前用户的菜单，不需要权限）
export function getRouters() {
  return request({
    url: '/getRouters',
    method: 'get'
  })
}

// 获取部门树（公开接口，用于注册页面）
export function getRegisterDeptTree() {
  return request({
    url: '/register/deptTree',
    headers: {
      isToken: false
    },
    method: 'get'
  })
}

// 获取字典数据（公开接口，用于注册页面）
export function getRegisterDict(dictType) {
  return request({
    url: '/register/dict/' + dictType,
    headers: {
      isToken: false
    },
    method: 'get'
  })
}

