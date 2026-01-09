<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部（带返回按钮） -->
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="handleBack">
            <i class="ri-arrow-left-line"></i>
          </el-button>
          <div class="header-content">
            <h1 class="page-title">{{ $t('inputCirculation.confirmReceive') }}</h1>
          </div>
        </div>
      </div>

      <!-- 表单区域 -->
      <div class="content-wrapper">
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="140px" v-loading="loading">
          
          <!-- 确认信息卡片 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-information-line"></i>
                <span>{{ $t('inputCirculation.basicInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <!-- 两列布局 -->
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('inputCirculation.confirmBy')" prop="confirmBy">
                    <el-input
                      v-model="formData.confirmBy"
                      :placeholder="$t('common.pleaseInput')"
                      clearable />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('inputCirculation.confirmOrg')" prop="confirmOrg">
                    <el-input
                      v-model="formData.confirmOrg"
                      :placeholder="$t('common.pleaseInput')"
                      clearable />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- 操作按钮区域（固定在底部） -->
          <div class="form-actions">
            <el-button @click="handleBack">{{ $t('common.cancel') }}</el-button>
            <el-button
              type="primary"
              @click="handleSubmit"
              :loading="submitLoading">
              {{ $t('inputCirculation.confirmReceive') }}
            </el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { confirmWoredaReceive } from '@/api/inputCirculation'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const loading = ref(false)
const submitLoading = ref(false)
const formRef = ref(null)

const formData = reactive({
  confirmBy: '',
  confirmOrg: ''
})

const rules = {
  confirmBy: [{ required: true, message: t('common.required'), trigger: 'blur' }],
  confirmOrg: [{ required: true, message: t('common.required'), trigger: 'blur' }]
}

const handleSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate(async (valid) => {
    if (!valid) return
    submitLoading.value = true
    try {
      const response = await confirmWoredaReceive(route.params.id, formData.confirmBy, formData.confirmOrg)
      if (response.code === 200) {
        ElMessage.success(t('common.saveSuccess'))
        router.back()
      } else {
        ElMessage.error(response.msg || t('common.saveFailed'))
      }
    } catch (error) {
      ElMessage.error(t('common.saveFailed'))
    } finally {
      submitLoading.value = false
    }
  })
}

const handleBack = () => router.back()
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
</style>
