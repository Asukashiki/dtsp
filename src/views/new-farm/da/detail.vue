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
            <h1 class="page-title">{{ $t('newFarm.da.detail') }}</h1>
          </div>
        </div>
      </div>

      <!-- 详情内容 -->
      <div class="content-wrapper" v-loading="loading">
        <template v-if="detail">
          <!-- 基本信息 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-user-star-line"></i>
                <span>{{ $t('newFarm.da.sections.basicInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-descriptions :column="2" border>
                <el-descriptions-item :label="$t('newFarm.da.form.daId')">{{ detail.daId }}</el-descriptions-item>
                <el-descriptions-item :label="$t('newFarm.da.form.daName')">{{ detail.daName }}</el-descriptions-item>
                <el-descriptions-item :label="$t('newFarm.da.form.idCard')">{{ detail.idCard || '-' }}</el-descriptions-item>
                <el-descriptions-item :label="$t('newFarm.da.form.gender')">
                  <template v-if="detail.gender">
                    <el-tag size="small" effect="plain" :type="detail.gender === 'MALE' ? 'primary' : 'danger'">
                      {{ detail.gender === 'MALE' ? $t('newFarm.common.male') : $t('newFarm.common.female') }}
                    </el-tag>
                  </template>
                  <template v-else>-</template>
                </el-descriptions-item>
                <el-descriptions-item :label="$t('newFarm.da.form.phone')">{{ detail.phone || '-' }}</el-descriptions-item>
                <el-descriptions-item :label="$t('newFarm.da.form.email')">{{ detail.email || '-' }}</el-descriptions-item>
                <el-descriptions-item :label="$t('newFarm.da.form.address')" :span="2">
                  {{ detail.address || '-' }}
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>

          <!-- 账号信息 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-account-circle-line"></i>
                <span>{{ $t('newFarm.da.sections.accountInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-descriptions :column="2" border>
                <el-descriptions-item :label="$t('newFarm.da.form.account')">{{ detail.account || '-' }}</el-descriptions-item>
                <el-descriptions-item :label="$t('newFarm.da.form.accountStatus')">
                  <el-tag :type="detail.accountStatus === '1' ? 'success' : 'danger'" effect="plain" size="small">
                    {{ detail.accountStatus === '1' ? $t('newFarm.da.status.enabled') : $t('newFarm.da.status.disabled') }}
                  </el-tag>
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>

          <!-- 区划信息 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-map-pin-line"></i>
                <span>{{ $t('newFarm.da.sections.regionInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-descriptions :column="2" border>
                <el-descriptions-item :label="$t('newFarm.common.zoneName')">{{ zoneName }}</el-descriptions-item>
                <el-descriptions-item :label="$t('newFarm.common.woredaName')">{{ woredaName }}</el-descriptions-item>
                <el-descriptions-item :label="$t('newFarm.da.form.kebeleCodes')" :span="2">
                  <template v-if="kebeleNames.length > 0">
                    <el-tag v-for="(name, index) in kebeleNames" :key="index" size="small" effect="plain" class="mr-2 mb-1">
                      {{ name }}
                    </el-tag>
                  </template>
                  <template v-else>-</template>
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>

          <!-- 统计信息 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-bar-chart-line"></i>
                <span>{{ $t('newFarm.da.sections.statistics') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-descriptions :column="2" border>
                <el-descriptions-item :label="$t('newFarm.da.stats.farmerCount')">{{ detail.farmerCount || 0 }}</el-descriptions-item>
                <el-descriptions-item :label="$t('newFarm.da.stats.landCount')">{{ detail.landCount || 0 }}</el-descriptions-item>
                <el-descriptions-item :label="$t('newFarm.da.stats.totalLandArea')" :span="2">
                  {{ formatArea(detail.totalLandArea) }}
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>

          <!-- 系统信息 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-information-line"></i>
                <span>{{ $t('newFarm.common.systemInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-descriptions :column="2" border>
                <el-descriptions-item :label="$t('newFarm.common.createBy')">{{ detail.createBy || '-' }}</el-descriptions-item>
                <el-descriptions-item :label="$t('newFarm.common.createTime')">{{ detail.createTime || '-' }}</el-descriptions-item>
                <el-descriptions-item :label="$t('newFarm.common.updateBy')">{{ detail.updateBy || '-' }}</el-descriptions-item>
                <el-descriptions-item :label="$t('newFarm.common.updateTime')">{{ detail.updateTime || '-' }}</el-descriptions-item>
                <el-descriptions-item :label="$t('newFarm.common.remark')" :span="2">{{ detail.remark || '-' }}</el-descriptions-item>
              </el-descriptions>
            </div>
          </div>

          <!-- ⚠️ 详情页不显示编辑按钮（按规范） -->
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getDaDetail } from '@/api/newFarm'
import { getRegionTree } from '@/api/orgRegistration'
import { listSubRegionByCode } from '@/api/application'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const loading = ref(false)
const detail = ref(null)

// 区域相关状态
const regionTreeData = ref([])
const kebeleOptions = ref([])

// 返回
const goBack = () => {
  router.back()
}

// 格式化面积
const formatArea = (area) => {
  if (!area) return '0'
  return `${parseFloat(area).toFixed(2)} ha`
}

// 递归查找区域节点
const findRegionNode = (tree, code) => {
  for (const node of tree) {
    if (node.value === code || node.code === code) {
      return node
    }
    if (node.children && node.children.length > 0) {
      const found = findRegionNode(node.children, code)
      if (found) return found
    }
  }
  return null
}

// 递归查找区域路径（包含所有父节点）
const findRegionPath = (tree, code, path = []) => {
  for (const node of tree) {
    const currentPath = [...path, node]
    if (node.value === code || node.code === code) {
      return currentPath
    }
    if (node.children && node.children.length > 0) {
      const found = findRegionPath(node.children, code, currentPath)
      if (found) return found
    }
  }
  return null
}

// 计算 Woreda 名称
const woredaName = computed(() => {
  if (!detail.value?.woredaCode || regionTreeData.value.length === 0) return '-'
  const node = findRegionNode(regionTreeData.value, detail.value.woredaCode)
  return node?.label || node?.name || detail.value.woredaCode
})

// 计算 Zone 名称（从 Woreda 的父节点获取）
const zoneName = computed(() => {
  if (!detail.value?.woredaCode || regionTreeData.value.length === 0) return '-'
  const path = findRegionPath(regionTreeData.value, detail.value.woredaCode)
  if (path && path.length >= 2) {
    // path 中倒数第二个是 Zone（假设层级是 Region > Zone > Woreda）
    const zoneNode = path[path.length - 2]
    return zoneNode?.label || zoneNode?.name || '-'
  }
  return '-'
})

// 计算 Kebele 名称
const kebeleNames = computed(() => {
  if (!detail.value?.kebeleCodes || kebeleOptions.value.length === 0) return []
  const codes = detail.value.kebeleCodes.split(',').filter(c => c)
  return codes.map(code => {
    const kebele = kebeleOptions.value.find(k => k.code === code || k.id === code)
    return kebele?.name || code
  })
})

// 加载区域树
const loadRegionTree = async () => {
  try {
    const res = await getRegionTree()
    if (res.code === 200 && res.data) {
      regionTreeData.value = res.data
    }
  } catch (error) {
    console.error('Failed to load region tree:', error)
  }
}

// 加载 Kebele 列表
const loadKebeleOptions = async (woredaCode) => {
  if (!woredaCode) return
  try {
    const res = await listSubRegionByCode({ regionCode: woredaCode })
    if (res.code === 200) {
      kebeleOptions.value = res.data || []
    }
  } catch (error) {
    console.error('Failed to load kebele options:', error)
  }
}

// 加载详情
const loadDetail = async () => {
  loading.value = true
  try {
    const res = await getDaDetail(route.params.id)
    if (res.code === 200) {
      detail.value = res.data
      // 加载 Kebele 选项
      if (res.data.woredaCode) {
        await loadKebeleOptions(res.data.woredaCode)
      }
    }
  } catch (error) {
    console.error('Failed to load detail:', error)
    ElMessage.error(t('common.failed'))
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await loadRegionTree()
  loadDetail()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
</style>
