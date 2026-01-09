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
            <h1 class="page-title">{{ $t('research.breeding.seed.receiveConfirm.confirm') }}</h1>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper" v-loading="loading">
        <!-- 育种家种子明细 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-seedling-line"></i>
              <span>{{ $t('research.breeding.seed.receiveConfirm.form.breedSeedDetail') }}</span>
            </div>
          </div>
          <div class="card-body">
            <div class="table-container" v-if="seedDetailList && seedDetailList.length > 0">
              <el-table :data="seedDetailList" stripe border style="width: 100%">
                <el-table-column type="index" label="#" width="60" align="center" />
                <el-table-column
                  prop="varietyName"
                  :label="$t('research.breeding.seed.receiveConfirm.form.varietyName')"
                  min-width="180"
                  show-overflow-tooltip
                >
                  <template #default="{ row }">
                    {{ row.varietyName || '-' }}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="cropType"
                  :label="$t('research.breeding.seed.receiveConfirm.form.cropType')"
                  min-width="140"
                >
                  <template #default="{ row }">
                    {{ getLabelByValue('crop_type', row.cropType) || '-' }}
                  </template>
                </el-table-column>
                <el-table-column
                    prop="seedType"
                    :label="$t('research.breeding.seed.receiveConfirm.form.seedType')"
                    min-width="140"
                >
                  <template #default="{ row }">
                    {{ row.seedType || '-' }}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="breedSeedProduceBatchId"
                  :label="$t('research.breeding.seed.receiveConfirm.columns.seedId')"
                  min-width="220"
                  show-overflow-tooltip
                />
                <el-table-column
                    prop="produceBatchName"
                    :label="$t('research.breeding.seed.receiveConfirm.form.breedSeedProduceBatchId')"
                    min-width="220"
                    show-overflow-tooltip
                />
                <el-table-column
                  prop="distributeQuantity"
                  :label="$t('research.breeding.seed.receiveConfirm.form.distributeQuantity')"
                  width="180"
                  align="right"
                >
                  <template #default="{ row }">
                    {{ row.distributeQuantity }} kg
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="total-quantity" v-if="confirmData.distributeDetail">
              <span class="label">{{ $t('research.breeding.seed.receiveConfirm.form.totalDistributeQuantity') }}:</span>
              <span class="value">{{ totalQuantity }} kg</span>
            </div>
          </div>
        </div>

        <!-- 确认表单 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-file-edit-line"></i>
              <span>{{ $t('research.breeding.seed.receiveConfirm.form.confirmInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-form
              ref="formRef"
              :model="formData"
              :rules="rules"
              label-width="140px"
            >
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breeding.seed.receiveConfirm.form.oseName')">
                    <el-input v-model="confirmData.oseName" disabled />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breeding.seed.receiveConfirm.form.confirmTime')" prop="confirmTime">
                    <el-date-picker
                      v-model="formData.confirmTime"
                      type="datetime"
                      :placeholder="$t('research.breeding.seed.receiveConfirm.placeholder.confirmTime')"
                      format="YYYY-MM-DD HH:mm:ss"
                      value-format="YYYY-MM-DD HH:mm:ss"
                      style="width: 100%"
                    />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breeding.seed.receiveConfirm.form.confirmPeople')" prop="confirmPeople">
                    <el-input
                      v-model="formData.confirmPeople"
                      :placeholder="$t('research.breeding.seed.receiveConfirm.placeholder.confirmPeople')"
                      clearable
                      maxlength="50"
                      disabled
                    />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="24">
                  <el-form-item :label="$t('research.breeding.seed.receiveConfirm.form.remark')">
                    <el-input
                      v-model="formData.remark"
                      type="textarea"
                      :rows="4"
                      :placeholder="$t('research.breeding.seed.receiveConfirm.placeholder.remark')"
                      maxlength="500"
                      show-word-limit
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="form-actions">
          <el-button @click="goBack">
            {{ $t('common.cancel') }}
          </el-button>
          <el-button type="primary" @click="handleConfirm" :loading="submitting">
            {{ $t('common.confirm') }}
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { confirmOseReceive, getOseReceiveConfirmDetail } from '@/api/breedSeed'
import { useUserStore } from '@/store/user'
import { useDict } from '@/hooks/useDict'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

// 使用 useDict hook 获取字典数据
const { getLabelByValue } = useDict(['crop_type'])
const userStore = useUserStore()

const formRef = ref(null)
const submitting = ref(false)
const loading = ref(false)
const confirmData = ref({})

const formData = reactive({
  confirmTime: '',
  confirmPeople: '',
  remark: ''
})

const rules = computed(() => ({
  confirmTime: [
    { required: true, message: t('research.breeding.seed.receiveConfirm.rules.confirmTime'), trigger: 'change' }
  ],
  confirmPeople: [
    { required: true, message: t('research.breeding.seed.receiveConfirm.rules.confirmPeople'), trigger: 'blur' }
  ]
}))

// 获取种子明细列表
const seedDetailList = computed(() => {
  return confirmData.value.distributeDetail?.detailList || []
})

// 计算总数量
const totalQuantity = computed(() => {
  return confirmData.value.distributeDetail?.totalDistributeQuantity || 0
})

const goBack = () => {
  router.back()
}

const loadDetail = async () => {
  const id = route.params.id
  if (!id) {
    ElMessage.error(t('common.invalidId'))
    goBack()
    return
  }

  loading.value = true
  try {
    const res = await getOseReceiveConfirmDetail(id)
    if (res.code === 200) {
      confirmData.value = res.data || {}

      // 验证状态
      if (confirmData.value.receiveStatus === 'CONFIRMED') {
        ElMessage.warning(t('research.breeding.seed.receiveConfirm.messages.alreadyConfirmed'))
        goBack()
        return
      }

      // 初始化表单数据
      formData.confirmTime = new Date().toISOString().slice(0, 19).replace('T', ' ')
      const userInfo = userStore.userInfo?.user || {}
      formData.confirmPeople = userInfo.nickName || userInfo.NICK_NAME || userInfo.name || userInfo.NAME || userInfo.username || userInfo.USERNAME || ''
      formData.remark = ''
    } else {
      ElMessage.error(res.msg || t('common.loadFailed'))
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

const handleConfirm = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    submitting.value = true

    const res = await confirmOseReceive(confirmData.value.receiveConfirmId, formData)

    if (res.code === 200) {
      ElMessage.success(t('research.breeding.seed.receiveConfirm.confirmSuccess'))
      router.push({ name: 'OseReceiveConfirm' })
    } else {
      ElMessage.error(res.msg || t('common.failed'))
    }
  } catch (error) {
    if (error !== false) {
      console.error('Confirm error:', error)
      ElMessage.error(t('common.submitFailed'))
    }
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  loadDetail()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';

.table-container {
  overflow-x: auto;
}

.table-container :deep(.el-table) {
  font-size: 14px;
}

.table-container :deep(.el-table th) {
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.05) 0%, rgba(254, 221, 0, 0.05) 100%);
  color: #009A44;
  font-weight: 600;
}

.total-quantity {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 12px 16px;
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.08) 0%, rgba(254, 221, 0, 0.08) 100%);
  border-radius: 6px;
  margin-top: 12px;
}

.total-quantity .label {
  font-size: 14px;
  font-weight: 600;
  color: #666;
  margin-right: 8px;
}

.total-quantity .value {
  font-size: 16px;
  font-weight: 700;
  color: #009A44;
}

.form-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 24px 0;
}
</style>
