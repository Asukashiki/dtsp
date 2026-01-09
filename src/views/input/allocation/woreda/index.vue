<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader
        icon="ri-community-line"
        :title="$t('allocation.menu.woredaAllocation')"
        :subtitle="$t('allocation.menu.woredaAllocation')"
      />

      <div class="content-wrapper">
        <!-- 查询表单 -->
        <div class="search-card">
          <SearchForm @search="handleQuery" @reset="handleReset">
            <SearchItem :label="$t('allocation.allocationName')">
              <el-input v-model="queryParams.allocationName" :placeholder="$t('common.pleaseInput')" @change="handleQuery" />
            </SearchItem>
            <SearchItem :label="$t('allocation.year')">
              <el-date-picker
                v-model="queryParams.year"
                type="year"
                value-format="YYYY"
                @change="handleQuery"
              />
            </SearchItem>
          </SearchForm>
        </div>

        <!-- 数据列表 -->
        <InfoCard :title="$t('allocation.menu.woredaAllocation')" icon="ri-file-list-3-line">
          <template #actions>
            <el-button type="primary" @click="handleAdd">
              <i class="ri-add-line"></i>
              {{ $t('common.add') }}
            </el-button>
          </template>

          <div class="table-wrapper pc-only">
            <el-table :data="allocationList" v-loading="loading" border stripe>
              <el-table-column prop="allocationName" :label="$t('allocation.allocationName')" min-width="200" />
              <el-table-column prop="year" :label="$t('allocation.year')" min-width="120" />
              <el-table-column prop="zoneName" :label="$t('allocation.woreda')" min-width="150" />
              <el-table-column prop="createTime" :label="$t('common.createTime')" min-width="160" />
              <el-table-column :label="$t('common.actions')" min-width="240" fixed="right">
                <template #default="{ row }">
                  <ActionButtons
                    :workflow-status="'S0'"
                    mode="list"
                    :show-audit="false"
                    @action="(action) => handleAction(row, action)"
                  />
                </template>
              </el-table-column>
            </el-table>

            <div class="pagination-wrapper">
              <el-pagination
                v-model:current-page="queryParams.pageNum"
                v-model:page-size="queryParams.pageSize"
                :total="total"
                :page-sizes="[10, 20, 50]"
                layout="total, sizes, prev, pager, next"
                @size-change="handleQuery"
                @current-change="handleQuery"
              />
            </div>
          </div>

          <!-- 移动端卡片列表 -->
          <div class="mobile-card-list mobile-only">
            <div v-for="item in allocationList" :key="item.id" class="mobile-card">
              <div class="mobile-card-header">
                <div class="year-badge">
                  <i class="ri-calendar-line"></i>
                  <span>{{ item.year }}</span>
                </div>
              </div>
              <div class="mobile-card-body">
                <div class="mobile-card-row">
                  <span class="label">{{ $t('allocation.allocationName') }}:</span>
                  <span class="value">{{ item.allocationName }}</span>
                </div>
                <div class="mobile-card-row">
                  <span class="label">{{ $t('allocation.woreda') }}:</span>
                  <span class="value">{{ item.zoneName }}</span>
                </div>
              </div>
              <div class="mobile-card-footer">
                <ActionButtons
                  :workflow-status="'S0'"
                  mode="list"
                  :show-audit="false"
                  @action="(action) => handleAction(item, action)"
                />
              </div>
            </div>
            
            <div class="pagination-wrapper">
              <el-pagination
                v-model:current-page="queryParams.pageNum"
                v-model:page-size="queryParams.pageSize"
                :total="total"
                small
                layout="prev, pager, next"
                @size-change="handleQuery"
                @current-change="handleQuery"
              />
            </div>
          </div>
        </InfoCard>

        <el-empty
          v-if="allocationList.length === 0 && !loading"
          :description="$t('common.noData')"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getWoredaAllocationList, deleteWoredaAllocation } from '@/api/allocation'
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'
import ActionButtons from '@/components/workflow/ActionButtons.vue'

const { t } = useI18n()
const router = useRouter()

const loading = ref(false)
const allocationList = ref([])
const total = ref(0)
const zoneOptions = ref([]) // 区域选项

const queryParams = reactive({
  allocationName: '',
  year: '',
  zone: '',
  level: 'woreda', // woreda level
  pageNum: 1,
  pageSize: 10
})

// 获取区域选项数据（模拟）
const getZoneOptions = async () => {
  try {
    // 这里应该调用获取区域数据的API
    // 示例数据
    zoneOptions.value = [
      { code: 'ZONE001', name: 'Zone 1' },
      { code: 'ZONE002', name: 'Zone 2' },
      { code: 'ZONE003', name: 'Zone 3' }
    ]
  } catch (error) {
    ElMessage.error(t('common.queryFailed'))
  }
}

const handleQuery = async () => {
  loading.value = true
  try {
    // 调用API获取列表数据
    const response = await getWoredaAllocationList(queryParams)
    if (response.code === 200) {
      allocationList.value = response.data.records || []
      total.value = response.data.total || 0
    } else {
      ElMessage.error(response.msg || t('common.queryFailed'))
    }
  } catch (error) {
    ElMessage.error(t('common.queryFailed'))
  } finally {
    loading.value = false
  }
}

// 重置查询
const handleReset = () => {
  queryParams.allocationName = ''
  queryParams.year = ''
  queryParams.zone = ''
  queryParams.pageNum = 1
  handleQuery()
}

const handleAdd = () => {
  router.push('/input/allocation/woreda/add')
}

const handleEdit = (row) => {
  router.push(`/input/allocation/woreda/edit/${row.id}`)
}

const handleView = (row) => {
  router.push(`/input/allocation/woreda/detail/${row.id}`)
}

const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm(t('common.confirmDelete'), t('common.warning'), { type: 'warning' })
    const response = await deleteWoredaAllocation(row.id)
    if (response.code === 200) {
      ElMessage.success(t('common.deleteSuccess'))
      handleQuery()
    } else {
      ElMessage.error(response.msg || t('common.deleteFailed'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(t('common.deleteFailed'))
    }
  }
}

// 统一动作处理
const handleAction = (row, action) => {
  switch (action) {
    case 'view':
      handleView(row)
      break
    case 'edit':
      handleEdit(row)
      break
    case 'cancelBatch': // 对应 ActionButtons 中的删除/作废
      handleDelete(row)
      break
  }
}

onMounted(() => {
  handleQuery()
  getZoneOptions()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
@use '@/assets/styles/table-enhanced.scss';
</style>