<template>
  <div class="page-container">
    <div class="page-wrapper">
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="goBack"><i class="ri-arrow-left-line"></i></el-button>
          <div class="header-content">
            <h1 class="page-title">{{ isEdit ? $t('research.organization.edit') : $t('research.organization.add') }}</h1>
          </div>
        </div>
      </div>

      <div class="content-wrapper">
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="140px" v-loading="loading">
          <div class="info-card">
            <div class="card-header">
              <div class="card-title"><i class="ri-building-line"></i><span>{{ $t('research.organization.basicInfo') }}</span></div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.organization.orgCode')" prop="orgCode">
                    <el-input v-model="formData.orgCode" :placeholder="$t('common.pleaseInput')" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.organization.orgName')" prop="orgName">
                    <el-input v-model="formData.orgName" :placeholder="$t('common.pleaseInput')" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.organization.orgCategory')" prop="orgCategory">
                    <el-select v-model="formData.orgCategory" :placeholder="$t('common.pleaseSelect')" style="width:100%">
                      <el-option v-for="item in categoryOptions" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.organization.region')">
                    <el-input v-model="formData.region" :placeholder="$t('common.pleaseInput')" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.organization.location')">
                    <el-input v-model="formData.location" :placeholder="$t('common.pleaseInput')" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.organization.contactPerson')">
                    <el-input v-model="formData.contactPerson" :placeholder="$t('common.pleaseInput')" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.organization.phoneNumber')">
                    <el-input v-model="formData.phoneNumber" :placeholder="$t('common.pleaseInput')" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.organization.status')">
                    <el-radio-group v-model="formData.status">
                      <el-radio-button value="0">{{ $t('common.normal') }}</el-radio-button>
                      <el-radio-button value="1">{{ $t('common.disabled') }}</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item :label="$t('common.remarks')">
                    <el-input v-model="formData.remark" type="textarea" :rows="3" :placeholder="$t('common.pleaseInput')" />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <div class="form-actions">
            <el-button @click="goBack">{{ $t('common.cancel') }}</el-button>
            <el-button type="primary" @click="handleSubmit" :loading="submitting">{{ $t('common.submit') }}</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getOrganization, addOrganization, updateOrganization } from '@/api/organization'
import { useDict } from '@/hooks/useDict'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const { options: dictOptions } = useDict(['org_category'])

const formRef = ref(null)
const loading = ref(false)
const submitting = ref(false)
const isEdit = computed(() => !!route.params.id)

const formData = ref({
  orgCode: '', orgName: '', orgCategory: '', location: '',
  region: '', contactPerson: '', phoneNumber: '', status: '0', remark: ''
})

const categoryOptions = computed(() => dictOptions.value.org_category || [])

const rules = computed(() => ({
  orgCode: [{ required: true, message: t('common.pleaseInput'), trigger: 'blur' }],
  orgName: [{ required: true, message: t('common.pleaseInput'), trigger: 'blur' }],
  orgCategory: [{ required: true, message: t('common.pleaseSelect'), trigger: 'change' }]
}))

const loadDetail = async () => {
  if (!isEdit.value) return
  loading.value = true
  try {
    const res = await getOrganization(route.params.id)
    if (res.code === 200 && res.data) {
      Object.keys(formData.value).forEach(key => {
        if (res.data[key] !== undefined) formData.value[key] = res.data[key]
      })
    }
  } catch (e) {
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  await formRef.value?.validate()
  submitting.value = true
  try {
    if (isEdit.value) {
      await updateOrganization({ ...formData.value, id: route.params.id })
    } else {
      await addOrganization(formData.value)
    }
    ElMessage.success(t('common.success'))
    goBack()
  } catch (e) {
    ElMessage.error(t('common.submitFailed'))
  } finally {
    submitting.value = false
  }
}

const goBack = () => router.back()

onMounted(() => loadDetail())
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
</style>
