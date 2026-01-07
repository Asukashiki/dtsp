import { defineStore } from 'pinia'
import { getCurrentUserInfo, getLogout, oauth2LoginWithCode } from '@/api/user'
import { getRouters, getInfo } from '@/api/system/login'
import {
  getToken,
  setToken,
  removeToken,
  getUserInfo,
  setUserInfo,
  removeUserInfo,
  redirectToLogin,
  getLoginMode
} from '@/utils/auth'

export const useUserStore = defineStore('user', {
  state: () => ({
    // 添加响应式状态，初始化时从 localStorage 读取
    _token: getToken() || '',
    _userInfo: getUserInfo() || {},
    menus: [],  // 后端返回的菜单数据
    permissions: [], // 按钮权限
    roles: [], // 角色列表
    deptPath: [] // 区划路径链（从顶级区划到当前部门）
  }),

  getters: {
    token() {
      // 优先使用响应式状态，确保同步更新
      return this._token || getToken() || ''
    },
    userInfo() {
      // 优先使用响应式状态，确保同步更新
      return this._userInfo || getUserInfo() || {}
    },
    isLogin() {
      return !!this._token || !!getToken()
    },
    hasToken() {
      return !!this._token || !!getToken()
    },
    hasUserInfo() {
      const userInfo = this._userInfo || getUserInfo() || {}
      return !!userInfo && Object.keys(userInfo).length > 0
    },
    // 获取用户角色列表
    userRoles() {
      const userInfo = this._userInfo || getUserInfo() || {}
      const roleStr = userInfo.user?.LOGIN_ROLE_VALUE?.['SMART-AGR'] || ''
      return roleStr.split(',').map(r => r.trim()).filter(r => r)
    },
    // 检查用户是否有指定角色
    hasRole() {
      return (roles) => {
        if (!roles || roles.length === 0) return true
        if (this.userRoles.includes('agri-admin')) return true // 超级管理员有所有权限
        return roles.some(role => this.userRoles.includes(role))
      }
    },
    // 检查用户是否有状态操作权限
    hasWorkflowStatusPermission() {
      return (workflowStatusAction) => {
        // 状态操作权限映射
        const workflowStatusPermissions = {
          'create': ['agri-admin', 'OARI', 'RC'], // 创建
          'edit': ['agri-admin', 'OARI', 'RC'], // 编辑
          'submit': ['agri-admin', 'OARI', 'RC'], // 提交审核
          'approve': ['agri-admin', 'OARI'], // 审核通过
          'reject': ['agri-admin', 'OARI'], // 审核驳回
          'archive': ['agri-admin', 'OARI'], // 归档
          'cancel': ['agri-admin', 'OARI'], // 作废
          'view': ['agri-admin', 'OARI', 'RC', 'OSE', 'Union', 'Cooperative', 'OIA'] // 查看
        }
        
        const requiredRoles = workflowStatusPermissions[workflowStatusAction] || []
        return this.hasRole(requiredRoles)
      }
    }
  },

  actions: {
    setToken(token) {
      // 先更新响应式状态，确保立即可用
      this._token = token
      // 再持久化到 localStorage
      setToken(token)
      console.log('setToken: token已保存到响应式状态和localStorage')
    },

    setUserInfo(userInfo) {
      console.log('setUserInfo: 准备保存用户信息:', userInfo)
      // 先更新响应式状态，确保立即可用
      this._userInfo = userInfo
      // 再持久化到 localStorage
      setUserInfo(userInfo)
      console.log('setUserInfo: 用户信息已保存到响应式状态和localStorage')
    },

    // 清除本地token和用户信息
    logout() {
      // 清除响应式状态
      this._token = ''
      this._userInfo = {}
      this.menus = []
      this.permissions = []
      this.roles = []
      this.validPaths = new Set() // 清除缓存的路径
      // 清除 localStorage
      removeToken()
      removeUserInfo()
    },

    async logoutAndRedirect(delay = 0) {
      try {
        await getLogout()
        this.logout()
        
        if (delay > 0) {
          setTimeout(() => {
            redirectToLogin()
          }, delay)
        } else {
          redirectToLogin()
        }
      } catch (error) {
        console.error('登出失败', error)
        this.logout()
        if (delay > 0) {
          setTimeout(() => {
            redirectToLogin()
          }, delay)
        } else {
          redirectToLogin()
        }
      }
    },

    // 获取用户信息
    async fetchUserInfo() {
      if (!this.token) {
        console.warn('fetchUserInfo: 没有token，跳过获取用户信息')
        return
      }

      console.log('fetchUserInfo: 开始获取用户信息')
      try {

         const res = await getInfo()
        if (res.code === 200) {
          const { roles, permissions, deptPath } = res
          this.roles = roles || []
          this.permissions = permissions || []
          this.deptPath = deptPath || []
          this.setUserInfo(res.user)
          console.log('权限信息已加载:', this.permissions.length, '个权限')
          console.log('区划路径链已加载:', this.deptPath.length, '级')
          return { roles, permissions, deptPath, ...res.user }
        }
        return { roles: [], permissions: [] }
        // const res = await getCurrentUserInfo()
        // console.log('fetchUserInfo: API响应:', JSON.stringify(res))

        // if (res.code === 200 && res.data) {
        //   console.log('fetchUserInfo: 用户信息获取成功，准备保存')
        //   
        // this.setUserInfo(res.data)
        //   console.log('fetchUserInfo: 用户信息已保存，hasUserInfo:', this.hasUserInfo)
        //   return res.data
        // } else {
        //   console.error('fetchUserInfo: 响应格式不正确或无数据')
        // }
      } catch (error) {
        console.error('fetchUserInfo: 请求失败:', error)
        throw error;
      }
    },

    // OAuth2授权码登录 (SSO模式使用)
    async Oauth2LoginWithCode(loginData) {
      try {
        const res = await oauth2LoginWithCode(
          loginData.code,
          loginData.redirectUri,
          loginData.grantType || 'authorization_code'
        )

        console.log('OAuth2 API响应:', res)

        // 检查响应格式：token可能在 res.access_token 或 res.data.access_token
        if (res.code === 200) {
          // 优先从根对象获取token（当前API返回格式）
          const token = res.access_token || res.token || (res.data && res.data.access_token)

          if (token) {
            this.setToken(token)
            console.log('OAuth2登录成功，token已保存:', token)

            // 获取用户信息
            await this.fetchUserInfo()
            await this.getPermissions()
            await this.getMenus()

            return { success: true, token }
          } else {
            console.error('OAuth2登录失败: 响应中未找到token', res)
            return { success: false, message: res.msg || '未返回token' }
          }
        } else {
          console.error('OAuth2登录失败:', res.msg || '未知错误')
          return { success: false, message: res.msg || '登录失败' }
        }
      } catch (error) {
        console.error('OAuth2登录异常:', error)
        return { success: false, message: error.message || '登录异常' }
      }
    },

    // 获取用户权限信息
    async getPermissions() {
      try {
        const res = await getInfo()
        if (res.code === 200) {
          const { roles, permissions } = res
          this.roles = roles || []
          this.permissions = permissions || []
          this.setUserInfo(res.user)
          console.log('权限信息已加载:', this.permissions.length, '个权限')
          return { roles, permissions }
        }
        return { roles: [], permissions: [] }
      } catch (error) {
        console.error('获取权限失败:', error)
        return { roles: [], permissions: [] }
      }
    },

    // 获取菜单列表
    async getMenus() {
      try {
        const res = await getRouters()
        if (res.code === 200 && res.data) {
          this.menus = res.data || []
          // 生成扁平化的有效路径集合，用于权限检查
          this.validPaths = new Set(this.flattenPaths(this.menus))
          console.log('菜单数据已加载:', this.menus.length, '个根路由')
          console.log('有效路径集合:', Array.from(this.validPaths))
          return this.menus
        }
        return []
      } catch (error) {
        console.error('获取菜单失败:', error)
        return []
      }
    },

    // 扁平化菜单路径（适配新的 getRouters 格式）
    // 新格式中子菜单的 path 已经是完整相对路径（如 system/menu），只需加前导斜杠
    flattenPaths(menus, parentPath = '') {
      let paths = []
      for (const menu of menus) {
        let fullPath = menu.path || ''
        // 新格式：path 可能是 /system（绝对路径）或 system/menu（相对路径）
        // 相对路径只需要加前导斜杠，不需要拼接父路径
        if (!fullPath.startsWith('/')) {
          fullPath = `/${fullPath}`
        }
        
        // 确保没有双斜杠 //
        fullPath = fullPath.replace(/\/\//g, '/')
        
        paths.push(fullPath)
        
        if (menu.children && menu.children.length > 0) {
          // 子菜单也使用同样的逻辑
          paths = paths.concat(this.flattenPaths(menu.children, fullPath))
        }
      }
      return paths
    },

    // 检查菜单权限（支持动态路径参数如 :id）
    hasMenuPermission(path) {
      if (!this.validPaths || this.validPaths.size === 0) {
        // 如果 validPaths 为空，尝试从 menus 重新生成
        if (this.menus && this.menus.length > 0) {
          this.validPaths = new Set(this.flattenPaths(this.menus))
        } else {
          return false
        }
      }
      // 处理传入路径可能没有前导 / 的情况
      const normalizedPath = path.startsWith('/') ? path : `/${path}`
      
      // 精确匹配
      if (this.validPaths.has(normalizedPath)) {
        return true
      }
      
      // 动态路径匹配（支持 :id, :type 等参数）
      // 例如：菜单配置 /system/dict-data/:id 匹配实际路径 /system/dict-data/sys_user_sex
      for (const menuPath of this.validPaths) {
        if (menuPath.includes(':')) {
          // 将菜单路径中的 :xxx 转换为正则表达式
          // /system/dict-data/:id => /system/dict-data/[^/]+
          const regexPattern = menuPath
            .replace(/:[^/]+/g, '[^/]+')  // :id => [^/]+
            .replace(/\//g, '\\/')        // / => \/
          const regex = new RegExp(`^${regexPattern}$`)
          if (regex.test(normalizedPath)) {
            return true
          }
        }
      }
      
      // 子路由自动放行逻辑：如果父路径有权限，则 add/edit/detail 子路由自动放行
      // 例如：有 /research/breeding-data/trial 权限，则自动放行：
      //   - /research/breeding-data/trial/add
      //   - /research/breeding-data/trial/edit/xxx
      //   - /research/breeding-data/trial/detail/xxx
      const subRoutePatterns = ['/add', '/edit/', '/detail/', '/form']
      for (const pattern of subRoutePatterns) {
        const patternIndex = normalizedPath.indexOf(pattern)
        if (patternIndex > 0) {
          // 提取父路径
          const parentPath = normalizedPath.substring(0, patternIndex)
          // 检查父路径是否有权限
          if (this.validPaths.has(parentPath)) {
            console.log(`路由守卫: 子路由自动放行 - 父路径 ${parentPath} 有权限，允许访问 ${normalizedPath}`)
            return true
          }
        }
      }
      
      return false
    }
  }
}) 