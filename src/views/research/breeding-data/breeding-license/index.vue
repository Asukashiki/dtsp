<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader
        icon="ri-shield-check-line"
        :title="$t('research.breedingLicense.title')"
        :subtitle="$t('research.breedingLicense.subtitle')"
      />

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <!-- 搜索卡片 -->
        <div class="search-card">
          <SearchForm @search="handleSearch" @reset="handleReset">
            <SearchItem :label="$t('common.keyword')">
              <el-input
                v-model="queryParams.keyword"
                :placeholder="$t('research.breedingLicense.searchPlaceholder')"
                clearable
                class="search-input"
              >
                <template #prefix>
                  <i class="ri-search-line"></i>
                </template>
              </el-input>
            </SearchItem>
            <SearchItem :label="$t('research.breedingLicense.form.licenseStatus')">
              <el-select
                v-model="queryParams.licenseStatus"
                :placeholder="$t('research.breedingLicense.filterByStatus')"
                clearable
                class="search-select"
              >
                <el-option :label="$t('research.breedingLicense.allStatus')" value="" />
                <el-option :label="$t('research.breedingLicense.status.valid')" value="valid" />
                <el-option :label="$t('research.breedingLicense.status.expired')" value="expired" />
<!--                <el-option :label="$t('research.breedingLicense.status.revoked')" value="revoked" />-->
              </el-select>
            </SearchItem>
          </SearchForm>
        </div>

        <!-- 列表卡片 -->
        <InfoCard :title="$t('research.breedingLicense.list')" icon="ri-file-list-3-line">
          <template #actions>
            <el-button type="primary" @click="handleAdd">
              <i class="ri-add-line"></i>
              {{ $t('common.add') }}
            </el-button>
          </template>

          <!-- PC端表格 -->
          <div class="table-wrapper pc-only">
            <el-table v-loading="loading" :data="licenseList" stripe>
              <el-table-column type="selection" width="55" align="center" />
              <el-table-column
                prop="licenseNo"
                :label="$t('research.breedingLicense.columns.licenseNo')"
                min-width="150"
              />
              <!-- <el-table-column
                prop="batchName"
                :label="$t('research.breedingLicense.columns.batchName')"
                min-width="150"
              /> -->
              <el-table-column
                prop="cropType"
                :label="$t('research.breedingLicense.columns.cropType')"
                min-width="120"
              >
                <template #default="{ row }">
                  {{ getCropTypeDisplay(row.cropType) }}
                </template>
              </el-table-column>
              <el-table-column
                prop="varietyName"
                :label="$t('research.breedingLicense.columns.varietyName')"
                min-width="130"
              />
              <el-table-column
                prop="approvalOrg"
                :label="$t('research.breedingLicense.columns.approvalOrg')"
                min-width="150"
              />
              <el-table-column
                prop="approvalDate"
                :label="$t('research.breedingLicense.columns.approvalDate')"
                min-width="120"
              />
              <el-table-column
                :label="$t('research.breedingLicense.columns.licenseStatus')"
                min-width="100"
                align="center"
              >
                <template #default="{ row }">
                  <el-tag :type="getStatusType(row.licenseStatus)">
                    {{ getStatusText(row.licenseStatus) }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column :label="$t('common.actions')" fixed="right" width="240">
                <template #default="{ row }">
                  <div class="action-buttons">
                    <el-button  type="primary" @click="handleDetail(row.id)">
                      <i class="ri-eye-line"></i>
                      {{ $t('common.view') }}
                    </el-button>
                    <el-button  type="primary" @click="handleEdit(row.id)">
                      <i class="ri-edit-line"></i>
                      {{ $t('common.edit') }}
                    </el-button>
                    <!-- <el-button link type="danger" @click="handleDelete(row.id)">
                      <i class="ri-delete-bin-line"></i>
                      {{ $t('common.delete') }}
                    </el-button> -->
                  </div>
                </template>
              </el-table-column>
            </el-table>

            <!-- 分页 -->
            <div class="pagination-wrapper">
              <el-pagination
                v-model:current-page="queryParams.pageNum"
                v-model:page-size="queryParams.pageSize"
                :total="total"
                :page-sizes="[10, 20, 50, 100]"
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleSizeChange"
                @current-change="handlePageChange"
              />
            </div>
          </div>

          <!-- 移动端卡片 -->
          <div class="mobile-card-list mobile-only">
            <div v-for="item in licenseList" :key="item.id" class="mobile-card">
              <div class="mobile-card-header">
                <div class="mobile-card-title">
                  <i class="ri-shield-check-line"></i>
                  <span>{{ item.licenseNo }}</span>
                </div>
                <el-tag :type="getStatusType(item.licenseStatus)" size="small">
                  {{ getStatusText(item.licenseStatus) }}
                </el-tag>
              </div>
              <div class="mobile-card-body">
                <!-- <div class="mobile-card-row">
                  <span class="label">{{ $t('research.breedingLicense.columns.batchName') }}:</span>
                  <span class="value">{{ item.batchName }}</span>
                </div> -->
                <div class="mobile-card-row">
                  <span class="label">{{ $t('research.breedingLicense.columns.cropType') }}:</span>
                  <span class="value">{{ getCropTypeDisplay(item.cropType) }}</span>
                </div>
                <div class="mobile-card-row">
                  <span class="label">{{ $t('research.breedingLicense.columns.varietyName') }}:</span>
                  <span class="value">{{ item.varietyName }}</span>
                </div>
                <div class="mobile-card-row">
                  <span class="label">{{ $t('research.breedingLicense.columns.approvalOrg') }}:</span>
                  <span class="value">{{ item.approvalOrg }}</span>
                </div>
                <div class="mobile-card-row">
                  <span class="label">{{ $t('research.breedingLicense.columns.approvalDate') }}:</span>
                  <span class="value">{{ item.approvalDate || '-' }}</span>
                </div>
              </div>
              <div class="mobile-card-actions">
                <el-button type="primary" size="small" @click="handleDetail(item.id)">
                  {{ $t('common.view') }}
                </el-button>
                <el-button size="small" @click="handleEdit(item.id)">
                  {{ $t('common.edit') }}
                </el-button>
                <!-- <el-button type="danger" size="small" @click="handleDelete(item.id)">
                  {{ $t('common.delete') }}
                </el-button> -->
              </div>
            </div>

            <!-- 移动端分页 -->
            <div class="pagination-wrapper mobile-pagination">
              <el-pagination
                v-model:current-page="queryParams.pageNum"
                v-model:page-size="queryParams.pageSize"
                :page-sizes="[10, 20, 50]"
                :total="total"
                layout="total, prev, next"
                @size-change="handleSizeChange"
                @current-change="handlePageChange"
              />
            </div>
          </div>
          
          <!-- 空状态 -->
          <el-empty v-if="licenseList.length === 0 && !loading" :description="$t('home.noData')" />
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
import { getLicenseList, deleteLicense } from '@/api/breedingLicense'
import { useDict } from '@/hooks/useDict'
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'

const router = useRouter()
const { t } = useI18n()

// 字典数据
const { options, getLabelByValue } = useDict(['crop_type', 'license_status', 'approval_org'])
const getCropTypeDisplay = (value) => getLabelByValue('crop_type', value) || value || '-'

const loading = ref(false)
const licenseList = ref([])
const total = ref(0)

const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  keyword: '',
  licenseStatus: '',
  approvalDateStart: '',
  approvalDateEnd: ''
})

// 获取状态类型 - 使用字典
const getStatusType = (status) => {
  const typeMap = {
    valid: 'success',
    expired: 'warning',
    revoked: 'danger'
  }
  return typeMap[status] || 'info'
}

// 获取状态文本 - 使用字典
const getStatusText = (status) => {
  return getLabelByValue('license_status', status) || status
}

// 加载数据
const fetchLicenseList = async () => {
  loading.value = true
  try {
    const res = await getLicenseList(queryParams)
    if (res.code === 200) {
      licenseList.value = res.data.list || []
      total.value = res.data.total || 0
    } else {
      ElMessage.error(res.msg || t('common.loadFailed'))
    }
  } catch (error) {
    console.error('Failed to fetch license list:', error)
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
}

// 搜索
const handleSearch = () => {
  queryParams.pageNum = 1
  fetchLicenseList()
}

// 重置
const handleReset = () => {
  queryParams.keyword = ''
  queryParams.licenseStatus = ''
  queryParams.approvalDateStart = ''
  queryParams.approvalDateEnd = ''
  handleSearch()
}

// 新增
const handleAdd = () => {
  router.push({ name: 'BreedingLicenseAdd' })
}

// 查看
const handleDetail = (id) => {
  router.push({ name: 'BreedingLicenseDetail', params: { id } })
}

// 编辑
const handleEdit = (id) => {
  router.push({ name: 'BreedingLicenseEdit', params: { id } })
}

// 删除
const handleDelete = async (id) => {
  try {
    await ElMessageBox.confirm(
      t('common.deleteConfirm'),
      t('common.warning'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      }
    )

    const res = await deleteLicense([id])
    if (res.code === 200) {
      ElMessage.success(t('common.deleteSuccess'))
      fetchLicenseList()
    } else {
      ElMessage.error(res.msg || t('common.deleteFailed'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Failed to delete license:', error)
      ElMessage.error(t('common.deleteFailed'))
    }
  }
}

// 分页
const handleSizeChange = () => {
  queryParams.pageNum = 1
  fetchLicenseList()
}

const handlePageChange = () => {
  fetchLicenseList()
}

// 初始化
onMounted(() => {
  fetchLicenseList()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
</style>
