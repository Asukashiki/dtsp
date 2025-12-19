<template>
  <el-dialog
    v-model="visible"
    :title="$t('research.breeding.seed.receiveConfirm.confirm')"
    width="800px"
    :close-on-click-modal="false"
    @close="handleClose"
  >
    <!-- 接收种子明细 -->
    <div class="seed-details-section" v-if="seedDetailList && seedDetailList.length > 0">
      <div class="section-title">
        <i class="ri-seedling-line"></i>
        {{ $t('research.breeding.seed.receiveConfirm.form.breedSeedDetail') }}
      </div>
      <el-table :data="seedDetailList" stripe border style="width: 100%; margin-bottom: 20px;">
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
            {{ row.cropType || '-' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="breedSeedProduceBatchId"
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
      <div class="total-quantity">
        <span class="label">{{ $t('research.breeding.seed.receiveConfirm.form.totalDistributeQuantity') }}:</span>
        <span class="value">{{ totalQuantity }} kg</span>
      </div>
    </div>

    <!-- 确认表单 -->
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-width="140px"
    >
      <el-form-item :label="$t('research.breeding.seed.receiveConfirm.form.oseName')">
        <el-input v-model="confirmData.oseName" disabled />
      </el-form-item>

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

      <el-form-item :label="$t('research.breeding.seed.receiveConfirm.form.confirmPeople')" prop="confirmPeople">
        <el-input
          v-model="formData.confirmPeople"
          :placeholder="$t('research.breeding.seed.receiveConfirm.placeholder.confirmPeople')"
          clearable
          maxlength="50"
          disabled
        />
      </el-form-item>

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
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">{{ $t('common.cancel') }}</el-button>
        <el-button type="primary" @click="handleConfirm" :loading="submitting">
          {{ $t('common.confirm') }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { confirmOseReceive } from '@/api/breedSeed'
import { useUserStore } from '@/store/user'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  confirmData: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue', 'success'])
const { t } = useI18n()
const userStore = useUserStore()

const formRef = ref(null)
const submitting = ref(false)

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

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
  return props.confirmData.distributeDetail?.detailList || []
})

// 计算总数量
const totalQuantity = computed(() => {
  return props.confirmData.distributeDetail?.totalDistributeQuantity || 0
})

// 监听对话框打开，初始化表单
watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    // 默认当前时间
    formData.confirmTime = new Date().toISOString().slice(0, 19).replace('T', ' ')
    
    // 自动填充确认人
    const userInfo = userStore.userInfo?.user || {}
    formData.confirmPeople = userInfo.nickName || userInfo.NICK_NAME || userInfo.name || userInfo.NAME || userInfo.username || userInfo.USERNAME || ''
    
    formData.remark = ''
  }
})

const handleClose = () => {
  formRef.value?.resetFields()
  visible.value = false
}

const handleConfirm = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    submitting.value = true

    const res = await confirmOseReceive(props.confirmData.receiveConfirmId, formData)

    if (res.code === 200) {
      ElMessage.success(t('research.breeding.seed.receiveConfirm.confirmSuccess'))
      emit('success')
      handleClose()
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
</script>

<style scoped>
.seed-details-section {
  margin-bottom: 24px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 600;
  color: #009A44;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 2px solid #009A44;
}

.section-title i {
  font-size: 18px;
}

.seed-details-section :deep(.el-table) {
  font-size: 14px;
}

.seed-details-section :deep(.el-table th) {
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

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
