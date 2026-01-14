<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader icon="ri-building-2-line" :title="$t('orgRegistration.title')"
        :subtitle="$t('orgRegistration.subtitle')" />

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <!-- 搜索区域 -->
        <div class="search-card">
          <SearchForm @search="handleSearch" @reset="handleReset">
            <SearchItem :label="$t('orgRegistration.columns.orgName')">
              <el-input v-model="searchForm.keyword" :placeholder="$t('orgRegistration.list.searchPlaceholder')"
                clearable @clear="handleSearch" @keyup.enter="handleSearch">
                <template #prefix><i class="ri-search-line"></i></template>
              </el-input>
            </SearchItem>

            <SearchItem :label="$t('orgRegistration.columns.orgType')">
              <el-select v-model="searchForm.orgType" :placeholder="$t('orgRegistration.list.filterByType')" clearable
                @change="handleSearch">
                <el-option value="" :label="$t('orgRegistration.list.allTypes')"></el-option>
                <el-option value="UNION" :label="$t('orgRegistration.orgType.UNION')"></el-option>
                <el-option value="COOPERATIVE" :label="$t('orgRegistration.orgType.COOPERATIVE')"></el-option>
                <el-option value="PRIVATE" :label="$t('orgRegistration.orgType.PRIVATE')"></el-option>
              </el-select>
            </SearchItem>

            <SearchItem :label="$t('orgRegistration.columns.auditStatus')">
              <el-select v-model="searchForm.auditStatus" :placeholder="$t('orgRegistration.list.filterByStatus')"
                clearable @change="handleSearch">
                <el-option value="" :label="$t('orgRegistration.list.allStatus')"></el-option>
                <el-option :value="0" :label="$t('orgRegistration.status.pending')"></el-option>
                <el-option :value="1" :label="$t('orgRegistration.status.approved')"></el-option>
                <el-option :value="2" :label="$t('orgRegistration.status.rejected')"></el-option>
              </el-select>
            </SearchItem>

          </SearchForm>
        </div>

        <!-- 列表区域 -->
        <InfoCard :title="$t('orgRegistration.list.title')" icon="ri-list-check">
          <template #actions>
            <el-button type="primary" @click="handleAdd">
              <i class="ri-add-line"></i>
              {{ $t('common.add') }}
            </el-button>
          </template>
          <!-- PC端表格 -->
          <div class="table-wrapper pc-only">
            <el-table v-loading="loading" :data="tableData" stripe>
              <el-table-column prop="orgName" :label="$t('orgRegistration.columns.orgName')" min-width="180" />
              <el-table-column prop="orgType" :label="$t('orgRegistration.columns.orgType')" min-width="140">
                <template #default="{ row }">
                  <el-tag :type="row.orgType === 'UNION' ? 'primary' : 'success'">
                    {{ $t(`orgRegistration.orgType.${row.orgType}`) }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="licenseNumber" :label="$t('orgRegistration.columns.licenseNumber')"
                min-width="180" />
              <el-table-column prop="regionName" :label="$t('orgRegistration.columns.regionCode')" min-width="150">
                <template #default="{ row }">
                  <span>{{ formatRegionName(row.regionName) }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="applyUsername" :label="$t('orgRegistration.columns.applyUsername')"
                min-width="120" />
              <el-table-column prop="auditStatus" :label="$t('orgRegistration.columns.auditStatus')" width="120"
                align="center">
                <template #default="{ row }">
                  <el-tag :type="getStatusType(row.auditStatus)" size="small">
                    {{ getStatusLabel(row.auditStatus) }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column :label="$t('orgRegistration.columns.actions')" width="260" fixed="right">
                <template #default="{ row }">
                  <div class="action-buttons">
                    <el-button size="small" type="primary" @click="handleView(row)">
                      <i class="ri-eye-line"></i>{{ $t('orgRegistration.actions.view') }}
                    </el-button>
                    <!-- <el-button link type="primary" v-if="row.auditStatus === 0" @click="handleAudit(row)">
                      <i class="ri-check-double-line"></i>{{ $t('orgRegistration.actions.audit') }}
                    </el-button> -->
                    <el-button size="small" type="primary" v-if="row.auditStatus === 2" @click="handleEdit(row)">
                      <i class="ri-edit-line"></i>{{ $t('orgRegistration.actions.edit') }}
                    </el-button>
                    <el-button size="small" type="danger" @click="handleDelete(row)">
                      <i class="ri-delete-bin-line"></i>{{ $t('common.delete') }}
                    </el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>

            <div class="pagination-wrapper">
              <el-pagination v-model:currentPage="pagination.currentPage" v-model:pageSize="pagination.pageSize"
                :total="pagination.total" :page-sizes="[10, 20, 50]" layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" />
            </div>
          </div>

          <!-- 移动端卡片列表 -->
          <div class="mobile-card-list mobile-only">
            <div v-for="item in tableData" :key="item.id" class="mobile-card" @click="handleView(item)">
              <div class="mobile-card-header">
                <div class="mobile-card-title">
                  <i class="ri-building-2-line"></i>
                  <span>{{ item.orgName }}</span>
                </div>
                <el-tag :type="getStatusType(item.auditStatus)" size="small">
                  {{ getStatusLabel(item.auditStatus) }}
                </el-tag>
              </div>
              <div class="mobile-card-body">
                <div class="mobile-card-row">
                  <span class="label">{{ $t('orgRegistration.columns.orgType') }}:</span>
                  <span class="value">{{ $t(`orgRegistration.orgType.${item.orgType}`) }}</span>
                </div>
                <div class="mobile-card-row">
                  <span class="label">{{ $t('orgRegistration.columns.licenseNumber') }}:</span>
                  <span class="value">{{ item.licenseNumber }}</span>
                </div>
                <div class="mobile-card-row">
                  <span class="label">{{ $t('orgRegistration.columns.regionCode') }}:</span>
                  <span class="value">{{ formatRegionName(item.regionName) }}</span>
                </div>
                <div class="mobile-card-row">
                  <span class="label">{{ $t('orgRegistration.columns.applyUsername') }}:</span>
                  <span class="value">{{ item.applyUsername }}</span>
                </div>
              </div>
              <div class="mobile-card-footer">
                <el-button v-if="item.auditStatus === 0" link type="primary" size="small"
                  @click.stop="handleAudit(item)">
                  <i class="ri-check-double-line"></i> {{ $t('orgRegistration.actions.audit') }}
                </el-button>
                <el-button v-if="item.auditStatus === 2" link type="primary" size="small"
                  @click.stop="handleEdit(item)">
                  <i class="ri-edit-line"></i> {{ $t('orgRegistration.actions.edit') }}
                </el-button>
                <el-button link type="danger" size="small" @click.stop="handleDelete(item)">
                  <i class="ri-delete-bin-line"></i> {{ $t('common.delete') }}
                </el-button>
              </div>
            </div>

            <div v-if="tableData.length === 0 && !loading" class="empty-status">
              <i class="ri-inbox-line"></i>
              <p>{{ $t('common.noData') }}</p>
            </div>

            <div class="pagination-wrapper mobile-pagination">
              <el-pagination v-model:currentPage="pagination.currentPage" :total="pagination.total"
                :page-size="pagination.pageSize" layout="prev, pager, next" small
                @current-change="handleCurrentChange" />
            </div>
          </div>
        </InfoCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getRegistrationList, deleteRegistration } from '@/api/breedingOrgRegistration'
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'

const router = useRouter()
const { t } = useI18n()

const loading = ref(false)
const tableData = ref([])

const searchForm = reactive({
  keyword: '',
  orgType: '',
  auditStatus: ''
})

const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

// 获取状态标签
const getStatusLabel = (status) => {
  const statusMap = {
    0: t('orgRegistration.status.pending'),
    1: t('orgRegistration.status.approved'),
    2: t('orgRegistration.status.rejected')
  }
  return statusMap[status] || status
}

// 获取状态类型
const getStatusType = (status) => {
  const typeMap = {
    0: 'warning',
    1: 'success',
    2: 'danger'
  }
  return typeMap[status] || 'info'
}

// 格式化区域名称
const formatRegionName = (regionName) => {
  if (!regionName) return '-'
  const parts = regionName.split('#')
  if (parts.length > 2) {
    return parts.slice(-2).join(' > ')
  }
  return parts.join(' > ')
}

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    const res = await getRegistrationList({
      page: pagination.currentPage,
      pageSize: pagination.pageSize,
      orgName: searchForm.keyword,
      orgType: searchForm.orgType,
      auditStatus: searchForm.auditStatus !== '' ? searchForm.auditStatus : undefined
    })
    if (res.code === 200) {
      // 兼容性处理：优先使用 data.list, 其次是 rows, 最后是 list
      const data = res.data || res
      tableData.value = data.list || data.rows || (Array.isArray(data) ? data : [])
      pagination.total = data.total || 0
    }
  } catch (error) {
    console.error('Failed to load data:', error)
    ElMessage.error(t('orgRegistration.messages.loadFailed'))
  } finally {
    loading.value = false
  }
}

// 搜索
const handleSearch = () => {
  pagination.currentPage = 1
  loadData()
}

// 重置
const handleReset = () => {
  searchForm.keyword = ''
  searchForm.orgType = ''
  searchForm.auditStatus = ''
  handleSearch()
}

// 新增
const handleAdd = () => {
  router.push({ name: 'RegistrationAdd' })
}

// 查看
const handleView = (row) => {
  router.push({ name: 'RegistrationDetail', params: { id: row.id } })
}

// 审核
const handleAudit = (row) => {
  router.push({ name: 'RegistrationAudit', params: { id: row.id } })
}

// 编辑
const handleEdit = (row) => {
  router.push({ name: 'RegistrationEdit', params: { id: row.id } })
}

// 删除
const handleDelete = (row) => {
  ElMessageBox.confirm(t('common.deleteConfirm'), t('common.warning'), {
    confirmButtonText: t('common.confirm'),
    cancelButtonText: t('common.cancel'),
    type: 'warning'
  }).then(async () => {
    try {
      const res = await deleteRegistration(row.id)
      if (res.code === 200) {
        ElMessage.success(t('common.deleteSuccess'))
        loadData()
      }
    } catch (error) {
      console.error('Delete failed:', error)
    }
  })
}

// 分页变化
const handleSizeChange = () => {
  pagination.currentPage = 1
  loadData()
}

const handleCurrentChange = (val) => {
  pagination.currentPage = val
  loadData()
}

onMounted(() => {
  loadData()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';


.action-buttons button {
  margin-left: 0;
}
</style>
