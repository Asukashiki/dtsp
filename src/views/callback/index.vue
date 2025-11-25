<template>
  <div class="callback-container">
    <div class="callback-content">
      <div class="loading-icon">
        <i class="ri-loader-4-line"></i>
      </div>
      <h2>{{ $t('callback.processing') }}</h2>
      <p>{{ $t('callback.pleaseWait') }}</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store'
import { getCodeFromUrl } from '@/utils/auth'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const userStore = useUserStore()
const { t } = useI18n()

onMounted(async () => {
  await handleOAuth2Callback()
})

// 处理OAuth2回调
const handleOAuth2Callback = async () => {
  try {
    const code = getCodeFromUrl()

    if (!code) {
      ElMessage.error(t('callback.noCode'))
      setTimeout(() => {
        userStore.logoutAndRedirect(0)
      }, 2000)
      return
    }

    // 构建登录数据
    const loginData = {
      code: code,
      redirectUri: window.location.origin + '/agriculture/#/callback',
      grantType: 'bsp'
    }

    // 使用授权码换取token
    const success = await userStore.Oauth2LoginWithCode(loginData)

    if (success) {
      console.log('登录成功，检查用户信息状态')
      console.log('hasUserInfo:', userStore.hasUserInfo)
      console.log('userInfo:', JSON.stringify(userStore.userInfo))

      // 如果用户信息未加载，再次尝试获取
      if (!userStore.hasUserInfo) {
        console.log('用户信息未加载，再次尝试获取')
        try {
          await userStore.fetchUserInfo()
          console.log('二次获取用户信息成功')
        } catch (error) {
          console.error('二次获取用户信息失败:', error)
        }
      }

      // 显示成功消息
      ElMessage.success(t('callback.loginSuccess'))

      // 清除URL中的code参数
      window.history.replaceState(null, '', window.location.pathname + '#/')

      // 延迟跳转，确保状态更新完成
      setTimeout(() => {
        console.log('准备跳转到首页，当前用户信息状态:', userStore.hasUserInfo)
        router.push('/home')
      }, 300)
    } else {
      ElMessage.error(t('callback.loginFailed'))
      setTimeout(() => {
        userStore.logoutAndRedirect(0)
      }, 2000)
    }
  } catch (error) {
    console.error('OAuth2登录失败:', error)
    ElMessage.error(t('callback.loginError'))
    setTimeout(() => {
      userStore.logoutAndRedirect(0)
    }, 2000)
  }
}
</script>

<style scoped>
.callback-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.callback-content {
  text-align: center;
  padding: 60px 40px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  min-width: 400px;
}

.loading-icon {
  font-size: 64px;
  color: #009A44;
  margin-bottom: 24px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 12px;
  font-weight: 600;
}

p {
  font-size: 16px;
  color: #666;
}
</style>
