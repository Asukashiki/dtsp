<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="handleCancel">
            <i class="ri-arrow-left-line"></i>
          </el-button>
          <div class="header-content">
            <h1 class="page-title">{{ isEdit ? $t('common.edit') : $t('common.add') }}</h1>
            <p class="page-subtitle">{{ $t('demandConfirmation.subtitle') }}</p>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <el-form
            ref="formRef"
            :model="formData"
            :rules="rules"
            :label-width="labelWidth"
        >
          <!-- 基本信息 -->
          <InfoCard
            :title="$t('demandConfirmation.form.basicInfo')"
            icon="ri-information-line"
          >
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('demandConfirmation.form.fromActor')" prop="fromActor">
                    <el-select
                      v-model="formData.fromActor"
                      :placeholder="$t('demandConfirmation.form.fromActor')"
                      style="width: 100%"
                    >
                      <el-option
                        v-for="item in actorOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('demandConfirmation.form.toActor')" prop="toActor">
                    <el-select
                      v-model="formData.toActor"
                      :placeholder="$t('demandConfirmation.form.toActor')"
                      style="width: 100%"
                    >
                      <el-option
                        v-for="item in actorOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('demandConfirmation.form.referenceId')" prop="referenceId">
                    <el-input
                      v-model="formData.referenceId"
                      :placeholder="$t('demandConfirmation.form.referenceId')"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('demandConfirmation.form.confirmationType')" prop="confirmationType">
                    <el-select
                      v-model="formData.confirmationType"
                      :placeholder="$t('demandConfirmation.form.confirmationType')"
                      style="width: 100%"
                    >
                      <el-option
                        v-for="item in typeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('demandConfirmation.form.confirmedTime')" prop="confirmedTime">
                    <el-date-picker
                      v-model="formData.confirmedTime"
                      type="datetime"
                      :placeholder="$t('demandConfirmation.form.confirmedTime')"
                      style="width: 100%"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </InfoCard>

          <!-- 操作按钮 -->
          <div class="form-actions">
            <el-button @click="handleCancel">{{ $t('common.cancel') }}</el-button>
            <el-button type="primary" @click="handleSubmit" :loading="submitting">
              {{ $t('common.submit') }}
            </el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { addDemandConfirmation, getDemandConfirmationDetail } from '@/api/demandConfirmation'
import { InfoCard } from '@/components/common'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

// 响应式标签宽度（适配移动端）
const labelWidth = computed(() => {
  const isMobile = window.innerWidth <= 768
  return isMobile ? '120px' : '180px'
})

// 表单相关
const formRef = ref(null)
const submitting = ref(false)
const isEdit = computed(() => !!route.params.id)

// 发送方/接收方选项
const actorOptions = [
  { value: 'DA', label: 'DA' },
  { value: 'Coop', label: 'Coop' },
  { value: 'Union', label: 'Union' },
  { value: 'District', label: 'District' },
  { value: 'Zone', label: 'Zone' },
  { value: 'Region', label: 'Region' }
]

// 确认类型选项
const typeOptions = [
  { value: 'Receipt', label: t('demandConfirmation.type.receipt') },
  { value: 'Delivery', label: t('demandConfirmation.type.delivery') }
]

// 表单数据
const formData = reactive({
  fromActor: '',
  toActor: '',
  referenceId: '',
  confirmationType: '',
  confirmedTime: new Date()
})

// 表单验证规则
const rules = reactive({
  fromActor: [
    { required: true, message: t('demandConfirmation.rules.fromActorRequired'), trigger: 'change' }
  ],
  toActor: [
    { required: true, message: t('demandConfirmation.rules.toActorRequired'), trigger: 'change' }
  ],
  referenceId: [
    { required: true, message: t('demandConfirmation.rules.referenceIdRequired'), trigger: 'blur' }
  ],
  confirmationType: [
    { required: true, message: t('demandConfirmation.rules.confirmationTypeRequired'), trigger: 'change' }
  ]
})

// 加载编辑态数据
const loadData = async () => {
  if (!isEdit.value) return
  try {
    const res = await getDemandConfirmationDetail(route.params.id)
    if (res.code === 200 && res.data) {
      Object.assign(formData, res.data)
      // 处理日期格式
      if (res.data.confirmedTime) {
        formData.confirmedTime = new Date(res.data.confirmedTime)
      }
    }
  } catch (error) {
    console.error('Failed to load data:', error)
    ElMessage.error(t('common.loadFailed'))
  }
}

// 提交表单
const handleSubmit = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()

    submitting.value = true
    const res = await addDemandConfirmation(formData)
    if (res.code === 200) {
      ElMessage.success(isEdit.value ? t('common.editSuccess') : t('common.addSuccess'))
      router.push({ name: 'DemandConfirmation' })
    } else {
      ElMessage.error(res.msg || t('common.saveFailed'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Failed to submit:', error)
      ElMessage.error(t('common.saveFailed'))
    }
  } finally {
    submitting.value = false
  }
}

// 取消操作
const handleCancel = () => {
  router.back()
}

// 初始化
onMounted(() => {
  loadData()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';

// 自定义样式
.form-actions {
  margin-top: 32px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>