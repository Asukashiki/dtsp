<template>
  <div class="min-h-screen flex bg-gradient-to-br from-emerald-900 via-green-800 to-emerald-900 relative overflow-hidden">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <!-- Floating particles -->
      <div class="absolute top-20 left-10 w-72 h-72 bg-ethio-yellow/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 right-10 w-96 h-96 bg-ethio-green/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-1/2 left-1/4 w-64 h-64 bg-ethio-red/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      
      <!-- Decorative lines -->
      <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-ethio-green via-ethio-yellow to-ethio-red"></div>
      <div class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-ethio-red via-ethio-yellow to-ethio-green"></div>
    </div>

    <!-- Left Panel - Brand Section (Hidden on mobile) -->
    <div class="hidden lg:flex lg:w-1/2 xl:w-3/5 flex-col justify-center items-center p-12 relative">
      <div class="relative z-10 text-center max-w-xl">
        <!-- Logo/Icon -->
        <div class="mb-8 inline-flex items-center justify-center w-28 h-28 rounded-3xl bg-gradient-to-br from-ethio-green to-emerald-500 shadow-2xl shadow-ethio-green/30">
          <i class="ri-plant-line text-6xl text-white"></i>
        </div>
        
        <!-- Title -->
        <h1 class="text-5xl xl:text-6xl font-extrabold text-white mb-6 leading-tight">
          {{ $t('login.brandTitle') || 'Smart Agriculture' }}
        </h1>
        
        <!-- Subtitle -->
        <p class="text-xl text-emerald-100/80 mb-10 leading-relaxed">
          {{ $t('login.brandSubtitle') || 'Oromia Value Chain Big Data Platform' }}
        </p>
        
        <!-- Feature Icons -->
        <div class="flex justify-center gap-8">
          <div class="flex flex-col items-center gap-2 group">
            <div class="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-ethio-yellow/20 transition-all duration-300">
              <i class="ri-seedling-line text-2xl text-ethio-yellow"></i>
            </div>
            <span class="text-sm text-emerald-200/70">{{ $t('login.featureSeed') || 'Seed Tracking' }}</span>
          </div>
          <div class="flex flex-col items-center gap-2 group">
            <div class="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-ethio-yellow/20 transition-all duration-300">
              <i class="ri-bar-chart-grouped-line text-2xl text-ethio-yellow"></i>
            </div>
            <span class="text-sm text-emerald-200/70">{{ $t('login.featureData') || 'Data Analytics' }}</span>
          </div>
          <div class="flex flex-col items-center gap-2 group">
            <div class="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-ethio-yellow/20 transition-all duration-300">
              <i class="ri-leaf-line text-2xl text-ethio-yellow"></i>
            </div>
            <span class="text-sm text-emerald-200/70">{{ $t('login.featureCrop') || 'Crop Management' }}</span>
          </div>
        </div>
      </div>
      
      <!-- Ethiopian Flag Stripe -->
      <div class="absolute bottom-12 left-12 right-12 flex gap-2 opacity-50">
        <div class="flex-1 h-2 rounded-full bg-ethio-green"></div>
        <div class="flex-1 h-2 rounded-full bg-ethio-yellow"></div>
        <div class="flex-1 h-2 rounded-full bg-ethio-red"></div>
      </div>
    </div>

    <!-- Right Panel - Login Form -->
    <div class="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-6 sm:p-8 lg:p-12">
      <div class="w-full max-w-md">
        <!-- Glass Card -->
        <div class="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/20 p-8 sm:p-10 border border-white/20">
          <!-- Header -->
          <div class="text-center mb-8">
            <!-- Mobile Logo -->
            <div class="lg:hidden mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-ethio-green to-emerald-500 shadow-lg shadow-ethio-green/30">
              <i class="ri-plant-line text-3xl text-white"></i>
            </div>
            
            <div class="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-ethio-green to-emerald-500 shadow-lg shadow-ethio-green/25 mb-4 hidden lg:inline-flex">
              <i class="ri-shield-keyhole-line text-2xl text-white"></i>
            </div>
            <h2 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">{{ $t('login.title') }}</h2>
            <p class="text-gray-500 text-sm">{{ $t('login.subtitle') }}</p>
          </div>

          <!-- Login Form -->
          <form @submit.prevent="handleLogin" class="space-y-5">
            <!-- Username Input -->
            <div class="group">
              <label class="block text-sm font-semibold text-gray-600 mb-2">
                <i class="ri-user-line text-ethio-green mr-1"></i>
                {{ $t('login.username') }}
              </label>
              <div class="relative">
                <input
                  v-model="loginForm.username"
                  type="text"
                  :placeholder="$t('login.usernamePlaceholder') || $t('login.username')"
                  class="w-full px-4 py-3.5 pl-12 bg-gray-50 border-2 border-gray-100 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-ethio-green focus:bg-white focus:ring-4 focus:ring-ethio-green/10 transition-all duration-300"
                  :class="{ 'border-red-400 bg-red-50/50': errors.username }"
                />
                <i class="ri-user-3-line absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400 group-focus-within:text-ethio-green transition-colors"></i>
              </div>
              <p v-if="errors.username" class="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                <i class="ri-error-warning-line"></i>
                {{ errors.username }}
              </p>
            </div>

            <!-- Password Input -->
            <div class="group">
              <label class="block text-sm font-semibold text-gray-600 mb-2">
                <i class="ri-lock-line text-ethio-green mr-1"></i>
                {{ $t('login.password') }}
              </label>
              <div class="relative">
                <input
                  v-model="loginForm.password"
                  :type="showPassword ? 'text' : 'password'"
                  :placeholder="$t('login.passwordPlaceholder') || $t('login.password')"
                  class="w-full px-4 py-3.5 pl-12 pr-12 bg-gray-50 border-2 border-gray-100 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-ethio-green focus:bg-white focus:ring-4 focus:ring-ethio-green/10 transition-all duration-300"
                  :class="{ 'border-red-400 bg-red-50/50': errors.password }"
                  @keyup.enter="handleLogin"
                />
                <i class="ri-lock-password-line absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400 group-focus-within:text-ethio-green transition-colors"></i>
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-400 hover:text-ethio-green transition-colors"
                >
                  <i :class="showPassword ? 'ri-eye-off-line' : 'ri-eye-line'"></i>
                </button>
              </div>
              <p v-if="errors.password" class="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                <i class="ri-error-warning-line"></i>
                {{ errors.password }}
              </p>
            </div>

            <!-- Captcha Input (if enabled) -->
            <div v-if="captchaEnabled" class="group">
              <label class="block text-sm font-semibold text-gray-600 mb-2">
                <i class="ri-shield-check-line text-ethio-green mr-1"></i>
                {{ $t('login.captcha') }}
              </label>
              <div class="flex gap-3">
                <div class="relative flex-1">
                  <input
                    v-model="loginForm.code"
                    type="text"
                    :placeholder="$t('login.captchaPlaceholder') || $t('login.captcha')"
                    class="w-full px-4 py-3.5 pl-12 bg-gray-50 border-2 border-gray-100 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-ethio-green focus:bg-white focus:ring-4 focus:ring-ethio-green/10 transition-all duration-300"
                    @keyup.enter="handleLogin"
                  />
                  <i class="ri-shield-check-line absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400 group-focus-within:text-ethio-green transition-colors"></i>
                </div>
                <div 
                  @click="getCaptcha" 
                  class="w-28 h-[54px] rounded-xl overflow-hidden cursor-pointer bg-gray-100 flex items-center justify-center hover:opacity-80 transition-opacity border-2 border-gray-100"
                >
                  <img v-if="codeUrl" :src="codeUrl" alt="captcha" class="w-full h-full object-cover" />
                  <i v-else class="ri-loader-4-line text-2xl text-gray-400 animate-spin"></i>
                </div>
              </div>
            </div>

            <!-- Remember Me -->
            <div class="flex items-center justify-between">
              <label class="flex items-center gap-2 cursor-pointer group/check">
                <div class="relative">
                  <input
                    v-model="loginForm.rememberMe"
                    type="checkbox"
                    class="sr-only peer"
                  />
                  <div class="w-5 h-5 border-2 border-gray-300 rounded-md peer-checked:bg-ethio-green peer-checked:border-ethio-green transition-all duration-200 flex items-center justify-center">
                    <i class="ri-check-line text-white text-sm opacity-0 peer-checked:opacity-100 transition-opacity"></i>
                  </div>
                </div>
                <span class="text-sm text-gray-600 group-hover/check:text-gray-800 transition-colors">{{ $t('login.rememberMe') }}</span>
              </label>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="loading"
              class="w-full py-4 bg-gradient-to-r from-ethio-green to-emerald-500 text-white font-bold text-lg rounded-xl shadow-lg shadow-ethio-green/30 hover:shadow-xl hover:shadow-ethio-green/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              <i v-if="loading" class="ri-loader-4-line animate-spin text-xl"></i>
              <i v-else class="ri-login-box-line text-xl"></i>
              {{ loading ? $t('login.loggingIn') || 'Signing in...' : $t('login.submit') }}
            </button>
          </form>

          <!-- Language Switch -->
          <div class="mt-8 pt-6 border-t border-gray-100">
            <div class="flex justify-center">
              <div class="relative" ref="langDropdownRef">
                <button
                  @click="showLangMenu = !showLangMenu"
                  class="flex items-center gap-2 px-4 py-2 text-gray-500 hover:text-ethio-green rounded-lg hover:bg-gray-50 transition-all duration-200"
                >
                  <i class="ri-translate-2 text-lg"></i>
                  <span class="text-sm font-medium">{{ currentLanguage }}</span>
                  <i class="ri-arrow-down-s-line text-lg transition-transform" :class="{ 'rotate-180': showLangMenu }"></i>
                </button>
                
                <!-- Dropdown Menu -->
                <Transition
                  enter-active-class="transition duration-200 ease-out"
                  enter-from-class="opacity-0 scale-95 -translate-y-1"
                  enter-to-class="opacity-100 scale-100 translate-y-0"
                  leave-active-class="transition duration-150 ease-in"
                  leave-from-class="opacity-100 scale-100 translate-y-0"
                  leave-to-class="opacity-0 scale-95 -translate-y-1"
                >
                  <div
                    v-if="showLangMenu"
                    class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-36 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
                  >
                    <button
                      @click="handleLanguageChange('zh-CN')"
                      class="w-full px-4 py-2.5 text-left text-sm hover:bg-ethio-green/10 hover:text-ethio-green transition-colors flex items-center gap-2"
                      :class="{ 'bg-ethio-green/10 text-ethio-green font-semibold': localeStore.locale === 'zh-CN' }"
                    >
                      <span class="text-base">🇨🇳</span>
                      中文
                    </button>
                    <button
                      @click="handleLanguageChange('en-US')"
                      class="w-full px-4 py-2.5 text-left text-sm hover:bg-ethio-green/10 hover:text-ethio-green transition-colors flex items-center gap-2"
                      :class="{ 'bg-ethio-green/10 text-ethio-green font-semibold': localeStore.locale === 'en-US' }"
                    >
                      <span class="text-base">🇺🇸</span>
                      English
                    </button>
                  </div>
                </Transition>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <p class="text-center mt-6 text-emerald-200/60 text-sm">
          © {{ new Date().getFullYear() }} Oromia Smart Agriculture Platform
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { useUserStore, useLocaleStore } from '@/store'
import { login, getCodeImg } from '@/api/system/login'
import Cookies from 'js-cookie'

const router = useRouter()
const route = useRoute()
const { t, locale } = useI18n()
const userStore = useUserStore()
const localeStore = useLocaleStore()

const loading = ref(false)
const captchaEnabled = ref(false)
const codeUrl = ref('')
const showPassword = ref(false)
const showLangMenu = ref(false)
const langDropdownRef = ref(null)

const loginForm = reactive({
  username: '',
  password: '',
  code: '',
  uuid: '',
  rememberMe: false
})

const errors = reactive({
  username: '',
  password: ''
})

const currentLanguage = computed(() => {
  return localeStore.locale === 'zh-CN' ? '中文' : 'English'
})

// Validate form
const validateForm = () => {
  let valid = true
  errors.username = ''
  errors.password = ''
  
  if (!loginForm.username.trim()) {
    errors.username = t('login.usernameRequired')
    valid = false
  }
  
  if (!loginForm.password.trim()) {
    errors.password = t('login.passwordRequired')
    valid = false
  }
  
  return valid
}

// Get captcha image
const getCaptcha = async () => {
  if (!captchaEnabled.value) return
  try {
    const res = await getCodeImg()
    captchaEnabled.value = res.captchaEnabled !== undefined ? res.captchaEnabled : true
    if (captchaEnabled.value) {
      codeUrl.value = 'data:image/gif;base64,' + res.img
      loginForm.uuid = res.uuid
    }
  } catch (error) {
    console.error('Failed to get captcha:', error)
  }
}

// Login handler
const handleLogin = async () => {
  if (!validateForm()) return
  
  loading.value = true
  try {
    const res = await login(
      loginForm.username,
      loginForm.password,
      loginForm.code,
      loginForm.uuid
    )
    
    // Store token
    const token = res.token
    userStore.setToken(token)
    
    // Remember me
    if (loginForm.rememberMe) {
      Cookies.set('username', loginForm.username, { expires: 30 })
      Cookies.set('rememberMe', true, { expires: 30 })
    } else {
      Cookies.remove('username')
      Cookies.remove('rememberMe')
    }
    
    ElMessage.success(t('login.success'))
    
    // Redirect
    const redirect = route.query.redirect || '/'
    router.push(redirect)
  } catch (error) {
    console.error('Login failed:', error)
    ElMessage.error(error.message || t('login.failed'))
    getCaptcha()
  } finally {
    loading.value = false
  }
}

// Language switch
const handleLanguageChange = (lang) => {
  localeStore.setLocale(lang)
  locale.value = lang
  showLangMenu.value = false
}

// Close language menu when clicking outside
const handleClickOutside = (event) => {
  if (langDropdownRef.value && !langDropdownRef.value.contains(event.target)) {
    showLangMenu.value = false
  }
}

// Load remembered username
onMounted(() => {
  const savedUsername = Cookies.get('username')
  const rememberMe = Cookies.get('rememberMe')
  if (savedUsername && rememberMe) {
    loginForm.username = savedUsername
    loginForm.rememberMe = true
  }
  getCaptcha()
  
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* Custom animations */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

/* Checkbox custom styling */
input[type="checkbox"]:checked + div {
  background-color: #009A44;
  border-color: #009A44;
}

input[type="checkbox"]:checked + div i {
  opacity: 1;
}

/* Smooth transitions for all interactive elements */
* {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
