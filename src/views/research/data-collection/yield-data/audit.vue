<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部（带返回按钮） -->
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="goBack">
            <i class="ri-arrow-left-line"></i>
          </el-button>
          <div class="header-content">
            <h1 class="page-title">{{ $t('research.dataCollection.fieldInspectionAudit.title') }}</h1>
          </div>
        </div>
      </div>

      <!-- 表单区域 -->
      <div class="content-wrapper">
        <el-form
          ref="formRef"
          v-loading="loading"
          :model="formData"
          label-position="right"
          label-width="200px"
        >
          <!-- 基础信息卡片 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-information-line"></i>
                <span>{{ $t('research.dataCollection.fieldInspectionAudit.form.basicInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.dataCollection.yieldData.form.batchId')">
                    <el-input v-model="detailData.batchId" disabled />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.dataCollection.yieldData.form.trialId')">
                    <el-input v-model="detailData.trialId" disabled />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.dataCollection.yieldData.form.plotId')">
                    <el-input v-model="detailData.plotId" disabled />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- 检验信息卡片 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-file-search-line"></i>
                <span>{{ $t('research.dataCollection.fieldInspectionAudit.form.inspectionInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.dataCollection.yieldData.form.inspectionDate')">
                    <el-date-picker
                      v-model="detailData.inspectionDate"
                      type="date"
                      :placeholder="$t('research.dataCollection.yieldData.placeholder.inspectionDate')"
                      style="width: 100%"
                      disabled
                    />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.dataCollection.yieldData.form.inspectionType')">
                    <el-input v-model="detailData.inspectionType" disabled />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.dataCollection.yieldData.form.scoreCode')">
                    <el-input v-model="detailData.scoreCode" disabled />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.dataCollection.yieldData.form.scoreValue')">
                    <el-input v-model="detailData.scoreValue" disabled />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- 审核信息卡片 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-user-line"></i>
                <span>{{ $t('research.dataCollection.fieldInspectionAudit.form.auditInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24">
                  <el-form-item 
                    :label="$t('research.dataCollection.fieldInspectionAudit.form.auditComment')" 
                    prop="remark" 
                    :rules="[{ required: true, message: $t('research.dataCollection.fieldInspectionAudit.rules.auditCommentRequired'), trigger: 'blur' }]">
                    <el-input
                      v-model="formData.remark"
                      type="textarea"
                      :rows="4"
                      :placeholder="$t('research.dataCollection.fieldInspectionAudit.form.auditComment')"
                    />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.dataCollection.fieldInspectionAudit.form.auditor')">
                    <el-input v-model="formData.auditBy" :placeholder="$t('research.dataCollection.fieldInspectionAudit.placeholder.auditor')" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.dataCollection.fieldInspectionAudit.form.approvalTime')">
                    <el-date-picker
                      v-model="formData.auditTime"
                      type="datetime"
                      :placeholder="$t('research.dataCollection.fieldInspectionAudit.placeholder.approvalTime')"
                      style="width: 100%"
                      disabled
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- 操作按钮 -->
          <div class="form-actions">
            <el-button @click="goBack">
              {{ $t('common.cancel') }}
            </el-button>
            <el-button type="danger" @click="handleReject">
              {{ $t('research.dataCollection.fieldInspectionAudit.reject') }}
            </el-button>
            <el-button type="primary" @click="handleApprove">
              {{ $t('research.dataCollection.fieldInspectionAudit.approve') }}
            </el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getFieldInspectionAuditInfo, approveFieldInspection, rejectFieldInspection } from '@/api/fieldInspectionAudit'
import { useUserStore } from '@/store'
import { getUserInfo } from '@/utils/auth'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()
const userStore = useUserStore()

const formRef = ref(null)
const loading = ref(false)
const detailData = ref({})

// 当前登录用户信息
const currentUser = getUserInfo()
const defaultAuditor = currentUser?.userName || currentUser?.user?.REALNAME || currentUser?.user?.USERNAME || ''
const defaultAuditDepartment = currentUser?.user?.organName || currentUser?.user?.ORGANNAME || ''

const formData = reactive({
  remark: '',
  auditBy: defaultAuditor,
  auditTime: null // 审批时间自动设置为当前时间
})

// 加载详情
const loadDetail = async () => {
  loading.value = true
  try {
    const res = await getFieldInspectionAuditInfo(route.params.id)
    if (res.code === 200 && res.data) {
      detailData.value = res.data
      // 自动带出当前时间作为审批时间
      formData.auditTime = new Date()
    } else {
      ElMessage.error(t('common.loadFailed'))
      goBack()
    }
  } catch (error) {
    console.error('Failed to load detail:', error)
    ElMessage.error(t('common.loadFailed'))
    goBack()
  } finally {
    loading.value = false
  }
}

// 同意审核
const handleApprove = () => {
  formRef.value.validate(async (valid) => {
    if (!valid) return

    try {
      await ElMessageBox.confirm(
        t('research.dataCollection.fieldInspectionAudit.confirmApprove'),
        t('common.confirm'),
        {
          confirmButtonText: t('common.confirm'),
          cancelButtonText: t('common.cancel'),
          type: 'warning'
        }
      )

      // 自动设置审批时间为当前时间
      formData.auditTime = new Date()

      const submitData = {
        ...detailData.value,
        ...formData
      }

      const res = await approveFieldInspection(submitData)
      if (res.code === 200) {
        ElMessage.success(t('research.dataCollection.fieldInspectionAudit.approveSuccess'))
        goBack()
      } else {
        ElMessage.error(res.msg || t('common.operationFailed'))
      }
    } catch (error) {
      if (error !== 'cancel') {
        console.error('Failed to approve:', error)
        ElMessage.error(t('common.operationFailed'))
      }
    }
  })
}

// 不同意审核
const handleReject = () => {
  formRef.value.validate(async (valid) => {
    if (!valid) return

    try {
      await ElMessageBox.confirm(
        t('research.dataCollection.fieldInspectionAudit.confirmReject'),
        t('common.confirm'),
        {
          confirmButtonText: t('common.confirm'),
          cancelButtonText: t('common.cancel'),
          type: 'warning'
        }
      )

      // 自动审批时间为当前时间
      formData.auditTime = new Date()

      const submitData = {
        ...detailData.value,
        ...formData
      }

      const res = await rejectFieldInspection(submitData)
      if (res.code === 200) {
        ElMessage.success(t('research.dataCollection.fieldInspectionAudit.rejectSuccess'))
        goBack()
      } else {
        ElMessage.error(res.msg || t('common.operationFailed'))
      }
    } catch (error) {
      if (error !== 'cancel') {
        console.error('Failed to reject:', error)
        ElMessage.error(t('common.operationFailed'))
      }
    }
  })
}

// 返回
const goBack = () => {
  router.back()
}

// 初始化
onMounted(() => {
  loadDetail()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
</style>
