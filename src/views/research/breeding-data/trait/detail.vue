<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="goBack">
            <i class="ri-arrow-left-line"></i>
          </el-button>
          <div class="header-content">
            <h1 class="page-title">{{ $t('trait.detail') }}</h1>
          </div>
        </div>
      </div>

      <div class="content-wrapper" v-loading="loading">
        <!-- 基本信息 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title"><i class="ri-information-line"></i><span>{{ $t('trait.cards.basicInfo') }}</span></div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('trait.recordId')">{{ detailData.recordId || '-' }}</el-descriptions-item>
              <el-descriptions-item :label="$t('trait.plotId')">{{ detailData.plotId || '-' }}</el-descriptions-item>
              <el-descriptions-item :label="$t('trait.trialId')">{{ detailData.trialId || '-' }}</el-descriptions-item>
              <el-descriptions-item :label="$t('trait.batchId')">{{ detailData.batchId || '-' }}</el-descriptions-item>
              <el-descriptions-item :label="$t('trait.observationDate')">{{ detailData.observationDate || '-' }}</el-descriptions-item>
              <el-descriptions-item :label="$t('trait.growthStage')">
                {{ getLabelByValue('growth_cycle', detailData.growthStage) || detailData.growthStage || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('trait.columns.status')">
                <el-tag type="info" v-if="detailData.status">
                  {{ getLabelByValue('flow_status', detailData.status) || detailData.status }}
                </el-tag>
                <span v-else>-</span>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('trait.remarks')" :span="2">{{ detailData.remarks || '-' }}</el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <!-- 性状明细 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-list-check"></i>
              <span>{{ $t('trait.cards.traitDetails') }}</span>
              <el-tag type="success" style="margin-left: 12px;">{{ detailData.traitCount || 0 }} {{ $t('trait.traitDetails') }}</el-tag>
            </div>
          </div>
          <div class="card-body">
            <!-- PC端表格 -->
            <div class="pc-only">
              <el-table :data="detailData.detailList" border stripe v-if="detailData.detailList && detailData.detailList.length > 0">
                <el-table-column type="index" label="#" width="60" align="center" />
                <el-table-column :label="$t('trait.traitName')" min-width="200">
                  <template #default="{ row }">
                    {{ getLabelByValue('agronomic_trait_name', row.traitCode) || row.traitName || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="traitCode" :label="$t('trait.traitCode')" width="120" />
                <el-table-column prop="traitValue" :label="$t('trait.traitValue')" width="120" align="right" />
                <el-table-column prop="unit" :label="$t('trait.unit')" width="120" />
              </el-table>
              <el-empty v-else :description="$t('trait.noTraits')" />
            </div>

            <!-- 移动端卡片 -->
            <div class="mobile-only">
              <div v-if="detailData.detailList && detailData.detailList.length > 0" class="trait-detail-list">
                <div v-for="(item, index) in detailData.detailList" :key="item.detailId" class="trait-detail-card">
                  <div class="trait-detail-header">
                    <span class="trait-number">#{{ index + 1 }}</span>
                    <span class="trait-name">{{ getLabelByValue('agronomic_trait_name', item.traitCode) || item.traitName || '-' }}</span>
                  </div>
                  <div class="trait-detail-body">
                    <div class="detail-row">
                      <span class="label">{{ $t('trait.traitCode') }}:</span>
                      <span class="value">{{ item.traitCode }}</span>
                    </div>
                    <div class="detail-row">
                      <span class="label">{{ $t('trait.traitValue') }}:</span>
                      <span class="value value-highlight">{{ item.traitValue }} <span class="unit">{{ item.unit }}</span></span>
                    </div>
                  </div>
                </div>
              </div>
              <el-empty v-else :description="$t('trait.noTraits')" />
            </div>
          </div>
        </div>

        <!-- 照片信息 -->
        <div class="info-card" v-if="detailData.photoUrl">
          <div class="card-header">
            <div class="card-title"><i class="ri-image-line"></i><span>{{ $t('trait.cards.photoInfo') }}</span></div>
          </div>
          <div class="card-body">
            <el-descriptions :column="1" border>
              <el-descriptions-item :label="$t('trait.photoUrl')">
                <el-image :src="previewPhotoUrl" fit="contain" style="width: 200px; height: 150px" :preview-src-list="[previewPhotoUrl]" />
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <!-- 审核信息 -->
        <div class="info-card" v-if="detailData.auditBy">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-history-line"></i>
              <span>{{ $t('common.auditInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('common.auditBy')">{{ detailData.auditBy || '-' }}</el-descriptions-item>
              <el-descriptions-item :label="$t('common.auditTime')">{{ detailData.auditTime || '-' }}</el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <!-- 创建和更新信息 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-time-line"></i>
              <span>{{ $t('common.systemInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('common.createBy')">{{ getUserName(detailData.createBy) }}</el-descriptions-item>
              <el-descriptions-item :label="$t('common.createTime')">{{ detailData.createTime || '-' }}</el-descriptions-item>
              <el-descriptions-item :label="$t('common.updateBy')">{{ getUserName(detailData.updateBy) }}</el-descriptions-item>
              <el-descriptions-item :label="$t('common.updateTime')">{{ detailData.updateTime || '-' }}</el-descriptions-item>
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
import { ElMessage } from 'element-plus'
import { getTraitRecordInfo, getUserInfoById } from '@/api/breedingData'
import { getFilePreviewUrl } from '@/api/file'
import { useDict } from '@/hooks/useDict'

const route = useRoute()
const router = useRouter()
const { getLabelByValue } = useDict(['flow_status', 'agronomic_trait_name', 'growth_cycle'])

const loading = ref(false)
const detailData = ref({})
const userNames = ref({}) // 缓存用户名

// 照片预览URL
const previewPhotoUrl = computed(() => {
  if (!detailData.value.photoUrl) return ''
  // 如果是完整URL直接返回，否则需要通过API获取
  if (detailData.value.photoUrl.startsWith('http')) {
    return detailData.value.photoUrl
  }
  // 这里简化处理，实际应该调用getFilePreviewUrl
  return detailData.value.photoUrl
})

const getInfo = async () => {
  // 同时支持params和query两种方式获取traitId（路由参数名为traitId）
  const recordId = route.params.traitId || route.query.traitId
  
  if (!recordId) {
    console.error('No traitId found in route params or query')
    ElMessage.error('Missing record ID parameter')
    return
  }
  
  console.log('Loading trait record detail, recordId:', recordId)
  
  loading.value = true
  try {
    const res = await getTraitRecordInfo(recordId)
    detailData.value = res.data || {}

    // 获取用户名
    await loadUserNames()

    // 如果有照片且不是完整URL，获取预览URL
    if (detailData.value.photoUrl && !detailData.value.photoUrl.startsWith('http')) {
      try {
        const previewRes = await getFilePreviewUrl(detailData.value.photoUrl)
        if (previewRes.code === 200) {
          detailData.value.photoUrl = previewRes.msg
        }
      } catch (error) {
        console.error('Failed to get photo preview URL:', error)
      }
    }
  } finally {
    loading.value = false
  }
}

// 加载用户名
const loadUserNames = async () => {
  const userIds = [
    detailData.value.createBy,
    detailData.value.updateBy,
    detailData.value.auditBy,
    detailData.value.observerId
  ].filter(id => id && !userNames.value[id])

  for (const userId of userIds) {
    try {
      const res = await getUserInfoById(userId)
      if (res.code === 200 && res.data) {
        userNames.value[userId] = res.data.nickName || res.data.userName || userId
      }
    } catch (error) {
      console.error(`Failed to load user info for ${userId}:`, error)
      userNames.value[userId] = userId
    }
  }
}

// 获取用户显示名
const getUserName = (userId) => {
  if (!userId) return '-'
  return userNames.value[userId] || userId
}

const goBack = () => router.push('/research/breeding-data/trait')

onMounted(() => getInfo())
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';

// 移动端性状明细卡片
.trait-detail-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.trait-detail-card {
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  padding: 16px;
  background: #f9fafb;

  .trait-detail-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
    padding-bottom: 12px;
    border-bottom: 1px solid #e4e7ed;

    .trait-number {
      font-weight: 600;
      color: #009A44;
      font-size: 16px;
      min-width: 30px;
    }

    .trait-name {
      font-weight: 500;
      color: #303133;
      font-size: 15px;
      flex: 1;
    }
  }

  .trait-detail-body {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .detail-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;

      .label {
        color: #606266;
      }

      .value {
        color: #303133;
        font-weight: 500;

        &.value-highlight {
          color: #009A44;
          font-size: 16px;

          .unit {
            color: #8492a6;
            font-size: 13px;
            margin-left: 4px;
          }
        }
      }
    }
  }
}
</style>
