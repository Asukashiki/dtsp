<template>
  <div class="page-container">
    <div class="page-wrapper">
      <PageHeader icon="ri-file-chart-line" :title="$t('research.multiplierReport.title')" :subtitle="$t('research.multiplierReport.subtitle')" />

      <div class="content-wrapper">
        <div class="search-card">
          <SearchForm @search="handleSearch" @reset="handleReset">
            <SearchItem :label="$t('research.multiplierReport.varietyName')">
              <el-input v-model="filterForm.keyword" :placeholder="$t('research.multiplierReport.searchPlaceholder')" clearable />
            </SearchItem>
            <SearchItem :label="$t('research.multiplierReport.cropType')">
              <el-select v-model="filterForm.cropType" :placeholder="$t('common.pleaseSelect')" clearable>
                <el-option v-for="item in cropTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </SearchItem>
            <SearchItem :label="$t('research.multiplierReport.seedClassReceived')">
              <el-select v-model="filterForm.seedClassReceived" :placeholder="$t('common.pleaseSelect')" clearable>
                <el-option label="Breeder" value="Breeder" />
                <el-option label="Pre-Basic" value="Pre-Basic" />
                <el-option label="Basic" value="Basic" />
                <el-option label="C1" value="C1" />
              </el-select>
            </SearchItem>
          </SearchForm>
        </div>

        <InfoCard :title="$t('research.multiplierReport.list')" icon="ri-file-list-3-line">
          <template #actions>
            <el-button type="success" :loading="exporting" @click="handleExport">
              <i class="ri-download-line"></i> {{ $t('common.export') }}
            </el-button>
            <el-button type="primary" @click="handleAdd">
              <i class="ri-add-line"></i> {{ $t('common.add') }}
            </el-button>
          </template>

          <div class="table-wrapper pc-only">
            <el-table :data="tableData" stripe v-loading="loading">
              <el-table-column type="index" label="#" width="60" />
              <el-table-column prop="reportDate" :label="$t('research.multiplierReport.reportDate')" width="120" />
              <el-table-column prop="multiplierId" :label="$t('research.multiplierReport.multiplierId')" min-width="140" show-overflow-tooltip />
              <el-table-column prop="distributionId" :label="$t('research.multiplierReport.distributionId')" min-width="140" show-overflow-tooltip />
              <el-table-column prop="certificateId" :label="$t('research.multiplierReport.certificateId')" min-width="130" show-overflow-tooltip />
              <el-table-column prop="seedClassReceived" :label="$t('research.multiplierReport.seedClassReceived')" width="150" align="center">
                <template #default="{ row }">
                  <el-tag size="small">{{ row.seedClassReceived }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="cropType" :label="$t('research.multiplierReport.cropType')" width="120" align="center">
                <template #default="{ row }">
                  {{ row.cropType || '-' }}
                </template>
              </el-table-column>
              <el-table-column prop="varietyName" :label="$t('research.multiplierReport.varietyName')" min-width="160" show-overflow-tooltip />
              <el-table-column prop="areaPlantedHa" :label="$t('research.multiplierReport.areaPlantedHa')" width="130" align="right">
                <template #default="{ row }">
                  {{ row.areaPlantedHa }} ha
                </template>
              </el-table-column>
              <el-table-column prop="producedSeedQuantity" :label="$t('research.multiplierReport.producedSeedQuantity')" width="180" align="right">
                <template #default="{ row }">
                  {{ row.producedSeedQuantity }} qt
                </template>
              </el-table-column>
              <el-table-column :label="$t('common.actions')" width="300" fixed="right" align="center">
                <template #default="{ row }">
                  <div class="action-buttons">
                    <el-button size="small" type="primary" @click="handleView(row)">
                      <i class="ri-eye-line"></i>
                      <span class="btn-text">{{ $t('common.view') }}</span>
                    </el-button>
                    <el-button size="small" type="warning" @click="handleEdit(row)">
                      <i class="ri-edit-line"></i>
                      <span class="btn-text">{{ $t('common.edit') }}</span>
                    </el-button>
                    <el-button size="small" type="danger" @click="handleDelete(row)">
                      <i class="ri-delete-bin-line"></i>
                      <span class="btn-text">{{ $t('common.delete') }}</span>
                    </el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination-wrapper">
              <el-pagination v-model:current-page="pagination.pageNum" v-model:page-size="pagination.pageSize"
                :page-sizes="[10, 20, 50]" :total="pagination.total"
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="loadList" @current-change="loadList" />
            </div>
          </div>
        </InfoCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getMultiplierReportList, deleteMultiplierReport, exportMultiplierReport } from '@/api/multiplierReport'
import { getDicts } from '@/api/system/dict'
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'
import { parseI18nValue } from '@/utils/i18nHelper'

const router = useRouter()
const { t, locale } = useI18n()

const loading = ref(false)
const exporting = ref(false)
const tableData = ref([])
const filterForm = ref({ keyword: '', cropType: '', seedClassReceived: '' })
const pagination = ref({ pageNum: 1, pageSize: 10, total: 0 })
const cropTypeOptions = ref([])

const normalizeOptionLabel = (item) => parseI18nValue(item.dictLabel, locale.value, item.dictLabel)

const loadCropTypeOptions = async () => {
  try {
    const [mainRes, subRes] = await Promise.all([
      getDicts('inventory_main_category'),
      getDicts('inventory_sub_category')
    ])

    const mainOptions = (mainRes.data || []).map(item => ({
      label: normalizeOptionLabel(item),
      value: item.dictValue
    }))
    const seedMainCategory = mainOptions.find(item => String(item.value).toUpperCase() === 'SEED')
      || mainOptions.find(item => ['seed', '种子'].includes(String(item.label).trim().toLowerCase()))
    const seedMainCategoryValue = seedMainCategory?.value || 'SEED'

    cropTypeOptions.value = (subRes.data || [])
      .filter(item => String(item.remark) === String(seedMainCategoryValue))
      .map(item => {
        const label = normalizeOptionLabel(item)
        return {
          label,
          value: label
        }
      })
  } catch (error) {
    console.error('Failed to load crop type options:', error)
    cropTypeOptions.value = []
  }
}

const loadList = async () => {
  loading.value = true
  try {
    const params = { pageNum: pagination.value.pageNum, pageSize: pagination.value.pageSize, ...filterForm.value }
    const res = await getMultiplierReportList(params)
    if (res.code === 200) {
      tableData.value = res.rows || []
      pagination.value.total = res.total || 0
    }
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

const handleSearch = () => { pagination.value.pageNum = 1; loadList() }
const handleReset = () => { filterForm.value = { keyword: '', cropType: '', seedClassReceived: '' }; handleSearch() }
const handleAdd = () => router.push('/research/multiplier-report/add')
const handleView = (row) => router.push(`/research/multiplier-report/detail/${row.id}`)
const handleEdit = (row) => router.push(`/research/multiplier-report/edit/${row.id}`)
const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm(t('common.deleteConfirm'), t('common.warning'), { type: 'warning' })
    const res = await deleteMultiplierReport(row.id)
    if (res.code === 200) {
      ElMessage.success(t('research.multiplierReport.deleteSuccess'))
      loadList()
    }
  } catch (e) {
    if (e !== 'cancel') console.error(e)
  }
}

const handleExport = async () => {
  exporting.value = true
  try {
    const res = await exportMultiplierReport(filterForm.value)
    const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'Multiplier_Report_Data.xlsx'
    link.click()
    URL.revokeObjectURL(link.href)
    ElMessage.success(t('common.exportSuccess'))
  } catch (e) {
    console.error(e)
    ElMessage.error(t('common.exportFailed'))
  } finally {
    exporting.value = false
  }
}

onMounted(() => {
  loadCropTypeOptions()
  loadList()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
@use '@/assets/styles/table-enhanced.scss';

.action-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
  justify-content: center;

  :deep(.el-button) {
    min-width: auto;
    padding: 4px 10px;
    font-size: 12px;
    font-weight: 500;
    margin: 0 !important;

    i {
      margin-right: 4px;
      font-size: 13px;
      vertical-align: middle;
    }

    .btn-text {
      white-space: nowrap;
    }
  }
}
</style>
