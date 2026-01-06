<template>
  <div class="union-receive-confirm-container">
    <el-page-header @back="handleBack" :title="$t('common.back')">
      <template #content><span>{{ $t('inputCirculation.confirmReceive') }}</span></template>
    </el-page-header>

    <el-card v-loading="loading" class="main-card">
      <el-descriptions :column="2" border>
        <el-descriptions-item :label="$t('inputCirculation.releaseId')">{{ mainData.releaseId }}</el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.releaseName')">{{ mainData.releaseName }}</el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.releaseBy')">{{ mainData.releaseBy }}</el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.targetPhone')">{{ mainData.targetPhone }}</el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.releaseOrg')">{{ mainData.releaseOrg }}</el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.releaseDate')">{{ mainData.releaseDate }}</el-descriptions-item>

        <el-descriptions-item :label="$t('inputCirculation.receiveId')">{{ mainData.releaseId }}</el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.receiveName')">{{ mainData.releaseName }}</el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.status')">{{ mainData.receiveStatus }}</el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.confirmBy')">{{ mainData.confirmBy || '-' }}</el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.confirmOrg')">{{ mainData.confirmOrg || '-' }}</el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.confirmTime')">{{ mainData.confirmTime || '-' }}</el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card v-loading="demandLoading" class="main-card">
      <h3>{{ $t('inputCirculation.demandSelectionTitle') }}</h3>
      <el-table :data="demandList" border style="margin-top: 16px">
        <el-table-column :label="$t('districtAggregation.detailDialog.columns.inputType')" min-width="150">
          <template #default="{ row }">
            {{ getLabelByValue('input_type', row.inputType) }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('districtAggregation.detailDialog.columns.inputCategory')" min-width="150">
          <template #default="{ row }">
            {{ getLabelByValue('input_category', row.inputCategory) }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('districtAggregation.detailDialog.columns.totalQuantity')" prop="totalQuantity" min-width="120" />
      </el-table>
    </el-card>

    <el-card v-loading="loading" class="main-card">
      <h3>{{ $t('inputCirculation.detailInfo') }}</h3>
      <el-table :data="detailData" border style="margin-top: 16px">
        <el-table-column :label="$t('districtAggregation.detailDialog.columns.inputType')" min-width="150">
          <template #default="{ row }">
            {{ getLabelByValue('input_type', row.inputType) }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('districtAggregation.detailDialog.columns.inputCategory')" min-width="150">
          <template #default="{ row }">
            {{ getLabelByValue('input_category', row.inputCategory) }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('inputCirculation.quantity')" prop="quantity" min-width="120" />
        <el-table-column :label="$t('inputCirculation.unit')" min-width="100">
          <template #default="{ row }">
            {{ getLabelByValue('agri_unit', row.unit) }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('inputCirculation.unitPrice')" prop="unitPrice" min-width="120" />
      </el-table>
    </el-card>

    <!-- 底部操作按钮 -->
    <el-card class="action-card">
      <div class="action-buttons">
        <el-button @click="handleBack">{{ $t('common.cancel') }}</el-button>
        <el-button type="primary" @click="handleConfirm" :loading="submitLoading">{{ $t('inputCirculation.confirmReceive') }}</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getUnionReceiveDetail, getOseReleaseDetailByReleaseId, confirmUnionReceive } from '@/api/inputCirculation'
import { getTownAggregationDetail } from '@/api/villageAggregation'
import { useDict } from '@/hooks/useDict'
import { useUserStore } from '@/store/user'

const { getLabelByValue } = useDict(['input_type', 'input_category', 'agri_unit'])

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const loading = ref(false)
const submitLoading = ref(false)
const mainData = ref({})
const detailData = ref([])
const demandList = ref([])
const demandLoading = ref(false)

const fetchDetail = async () => {
  loading.value = true
  try {
    const response = await getUnionReceiveDetail(route.params.id)
    if (response.code === 200) {
      mainData.value = response.data?.main || {}
      detailData.value = response.data?.details || []
      console.log('Union Receive mainData:', mainData.value)
      // 加载需求列表 - 通过分发单获取 zoneId
      if (mainData.value.releaseId) {
        await loadDemandListByReleaseId(mainData.value.releaseId)
      }
    }
  } catch (error) {
    ElMessage.error(t('common.queryFailed'))
  } finally {
    loading.value = false
  }
}

// 通过分发单ID加载需求列表
const loadDemandListByReleaseId = async (releaseId) => {
  demandLoading.value = true
  try {
    const releaseResponse = await getOseReleaseDetailByReleaseId(releaseId)
    const releaseMain = releaseResponse.data?.main || {}
    const regionCode = releaseMain.zoneId || releaseMain.zone_id
    const year = releaseMain.releaseYear || releaseMain.release_year || new Date().getFullYear().toString()
    
    if (releaseResponse.code === 200 && regionCode) {
      const response = await getTownAggregationDetail({ sourceCode: regionCode, year })
      if (response.code === 200) {
        demandList.value = response.data || []
      }
    }
  } catch (error) {
    console.error('Failed to load demand list:', error)
  } finally {
    demandLoading.value = false
  }
}

// 确认接收
const handleConfirm = async () => {
  try {
    await ElMessageBox.confirm(
      t('inputCirculation.confirmReceiveMessage'),
      t('common.confirm'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      }
    )
    
    submitLoading.value = true
    
    // 获取当前用户信息
    const userInfo = userStore.userInfo?.userInfo?.user || {}
    const formData = {
      confirmBy: userInfo.nickName || userInfo.username || '',
      confirmOrg: userInfo.deptName || userStore.userInfo?.userInfo?.deptName || ''
    }
    
    const response = await confirmUnionReceive(route.params.id, formData)
    if (response.code === 200) {
      ElMessage.success(t('common.saveSuccess'))
      router.back()
    } else {
      ElMessage.error(response.msg || t('common.saveFailed'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(t('common.saveFailed'))
    }
  } finally {
    submitLoading.value = false
  }
}

const handleBack = () => router.back()
onMounted(() => fetchDetail())
</script>

<style scoped>
.union-receive-confirm-container { padding: 20px; }
.main-card { margin-top: 20px; }
.action-card { 
  margin-top: 20px; 
  position: sticky;
  bottom: 20px;
}
.action-buttons { 
  display: flex; 
  justify-content: flex-end; 
  gap: 12px; 
}
</style>
