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
          <template #actions></template>

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
                  {{ getLabelByValue('crop_type', row.cropType) }}
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
              <el-table-column :label="$t('common.actions')" width="100" fixed="right" align="center">
                <template #default="{ row }">
                  <el-button size="small" type="primary" @click="handleView(row)">
                    <i class="ri-eye-line"></i> {{ $t('common.view') }}
                  </el-button>
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
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getMultiplierReportList } from '@/api/multiplierReport'
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'
import { useDict } from '@/hooks/useDict'

const router = useRouter()
const { t } = useI18n()
const { options: dictOptions, getLabelByValue } = useDict(['crop_type'])

const loading = ref(false)
const tableData = ref([])
const filterForm = ref({ keyword: '', cropType: '', seedClassReceived: '' })
const pagination = ref({ pageNum: 1, pageSize: 10, total: 0 })

const cropTypeOptions = computed(() => dictOptions.value.crop_type || [])

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
const handleView = (row) => router.push(`/research/multiplier-report/detail/${row.id}`)

onMounted(() => loadList())
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
@use '@/assets/styles/table-enhanced.scss';
</style>
