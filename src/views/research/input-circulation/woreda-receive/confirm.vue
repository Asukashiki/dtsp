<template>
  <div class="union-receive-confirm-container">
    <el-page-header @back="handleBack" :title="$t('common.back')">
      <template #content><span>{{ $t('inputCirculation.confirmReceive') }}</span></template>
    </el-page-header>

    <el-card v-loading="loading" class="form-card">
      <el-form :model="formData" :rules="rules" ref="formRef" label-width="120px">
        <el-form-item :label="$t('inputCirculation.confirmBy')" prop="confirmBy">
          <el-input v-model="formData.confirmBy" :placeholder="$t('common.pleaseInput')" />
        </el-form-item>
        <el-form-item :label="$t('inputCirculation.confirmOrg')" prop="confirmOrg">
          <el-input v-model="formData.confirmOrg" :placeholder="$t('common.pleaseInput')" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">{{ $t('inputCirculation.confirmReceive') }}</el-button>
          <el-button @click="handleBack">{{ $t('common.cancel') }}</el-button>
        </el-form-item>
      </el-form>
    </el-card>
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
    loading.value = true
    try {
      const response = await confirmWoredaReceive(route.params.id, formData)
      if (response.code === 200) {
        ElMessage.success(t('common.saveSuccess'))
        router.back()
      } else {
        ElMessage.error(response.msg || t('common.saveFailed'))
      }
    } catch (error) {
      ElMessage.error(t('common.saveFailed'))
    } finally {
      loading.value = false
    }
  })
}

const handleBack = () => router.back()
</script>

<style scoped>
.union-receive-confirm-container { padding: 20px; }
.form-card { margin-top: 20px; }
</style>
