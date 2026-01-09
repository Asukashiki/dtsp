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
            <h1 class="page-title">{{ $t('research.breeding.seed.receiveConfirm.detail') }}</h1>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper" v-loading="loading">
        <!-- 基本信息卡片 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-information-line"></i>
              <span>{{ $t('research.breeding.seed.receiveConfirm.form.basicInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('research.breeding.seed.receiveConfirm.columns.distributeId')">
                {{ detailData.distributeId }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.breeding.seed.receiveConfirm.columns.oseName')">
                {{ detailData.oseName }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.breeding.seed.receiveConfirm.columns.receiveStatus')">
                <el-tag :type="detailData.receiveStatus === 'CONFIRMED' ? 'success' : 'warning'">
                  {{ $t(`research.breeding.seed.receiveConfirm.status.${detailData.receiveStatus}`) }}
                </el-tag>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.breeding.seed.receiveConfirm.form.totalDistributeQuantity')">
                {{ detailData.distributeDetail?.totalDistributeQuantity || 0 }} kg
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.breeding.seed.receiveConfirm.columns.confirmTime')">
                {{ detailData.confirmTime || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.breeding.seed.receiveConfirm.columns.confirmPeople')">
                {{ detailData.confirmPeople || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.breeding.seed.receiveConfirm.form.remark')" :span="2">
                {{ detailData.remark || '-' }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <!-- 育种家种子信息 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-seedling-line"></i>
              <span>{{ $t('research.breeding.seed.receiveConfirm.form.breedSeedDetail') }}</span>
            </div>
          </div>
          <div class="card-body">
            <div class="table-container" v-if="breedSeedList && breedSeedList.length > 0">
              <el-table :data="breedSeedList" stripe border style="width: 100%">
                <el-table-column type="index" label="#" width="60" align="center" />
                <el-table-column
                  prop="varietyName"
                  :label="$t('research.breeding.seed.receiveConfirm.form.varietyName')"
                  min-width="180"
                  show-overflow-tooltip
                />
                <el-table-column
                  prop="cropType"
                  :label="$t('research.breeding.seed.receiveConfirm.form.cropType')"
                  min-width="140"
                >
                  <template #default="{ row }">
                    {{ getLabelByValue('crop_type', row.cropType) }}
                  </template>
                </el-table-column>
                <el-table-column
                    prop="seedType"
                    :label="$t('research.breeding.seed.receiveConfirm.form.seedType')"
                    min-width="140"
                />
                <el-table-column
                  prop="breedSeedProduceBatchId"
                  :label="$t('research.breeding.seed.receiveConfirm.columns.seedId')"
                  min-width="220"
                  show-overflow-tooltip
                />
                  <el-table-column
                  prop="parentalSeedSource"
                  :label="$t('research.breeding.seed.distribution.detailColumns.parentalSeedSource')"
                  min-width="150"
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
            <div v-else class="empty-state">
              <i class="ri-inbox-line"></i>
              <p>{{ $t('research.breeding.seed.receiveConfirm.messages.noSeedData') }}</p>
            </div>
          </div>
        </div>

        <!-- 系统信息 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-time-line"></i>
              <span>{{ $t('research.breeding.seed.receiveConfirm.form.systemInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('research.breeding.seed.receiveConfirm.columns.createTime')">
                {{ detailData.createTime }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.breeding.seed.receiveConfirm.form.updateTime')">
                {{ detailData.updateTime || '-' }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { useDict } from '@/hooks/useDict'
import { getOseReceiveConfirmDetail } from '@/api/breedSeed'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

// 使用 useDict hook 获取字典数据
const { getLabelByValue } = useDict(['crop_type'])

const loading = ref(false)
const detailData = ref({})

// 获取 breeder seed 列表
const breedSeedList = computed(() => {
  return detailData.value.distributeDetail?.detailList || []
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
      detailData.value = res.data || {}
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

onMounted(() => {
  loadDetail()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';

.table-container {
  margin-top: 12px;
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

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #999;
}

.empty-state i {
  font-size: 48px;
  color: #ddd;
  margin-bottom: 16px;
}

.empty-state p {
  margin: 0;
  font-size: 14px;
}

@media screen and (max-width: 768px) {
  .table-container {
    margin-left: -20px;
    margin-right: -20px;
  }
}
</style>
