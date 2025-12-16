import { useUserStore } from '@/store'

export default {
  mounted(el, binding, vnode) {
    const { value } = binding
    const all_permission = '*:*:*'
    const userStore = useUserStore()
    // 这里的 permissions 需要从 userStore 获取，目前 userStore 还没有 permissions 状态
    // 我们需要更新 userStore 来存储 permissions
    // 暂时假设 userStore.permissions 是一个数组
    const permissions = userStore.permissions || []

    if (value && value instanceof Array && value.length > 0) {
      const permissionFlag = value
      const hasPermissions = permissions.some(permission => {
        return all_permission === permission || permissionFlag.includes(permission)
      })

      if (!hasPermissions) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`请设置操作权限标签值`)
    }
  }
}
