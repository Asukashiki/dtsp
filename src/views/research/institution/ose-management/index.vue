<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader icon="ri-building-4-line" :title="$t('research.breeding.seed.ose.title')"
        :subtitle="$t('research.breeding.seed.ose.subtitle')" />

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <!-- 搜索区域 -->
        <div class="search-card">
          <SearchForm @search="loadData" @reset="handleReset">
            <SearchItem :label="$t('research.breeding.seed.ose.columns.oseName')">
              <el-input v-model="searchQuery" :placeholder="$t('research.breeding.seed.ose.searchPlaceholder')"
                clearable @clear="loadData" @keyup.enter="loadData" />
            </SearchItem>

            <SearchItem :label="$t('research.breeding.seed.ose.columns.oseStatus')">
              <el-select v-model="statusFilter" :placeholder="$t('research.breeding.seed.ose.filterByStatus')" clearable
                @change="loadData">
                <el-option :label="$t('research.breeding.seed.ose.allStatus')" value="" />
                <el-option :label="$t('research.breeding.seed.ose.status.ENABLED')" value="ENABLED" />
                <el-option :label="$t('research.breeding.seed.ose.status.DISABLED')" value="DISABLED" />
              </el-select>
            </SearchItem>

          </SearchForm>
        </div>

        <!-- 列表区域 -->
        <InfoCard :title="$t('research.breeding.seed.ose.list')" icon="ri-list-check">
          <template #actions>
            <el-button type="primary" @click="handleAdd">
              <i class="ri-add-line"></i>
              {{ $t('research.breeding.seed.ose.add') }}
            </el-button>
          </template>
          <!-- PC端表格 -->
          <div class="table-wrapper pc-only">
            <el-table v-loading="loading" :data="filteredList" stripe>
              <el-table-column prop="oseCode" :label="$t('research.breeding.seed.ose.columns.oseCode')" width="250"
                show-overflow-tooltip />
              <el-table-column prop="oseName" :label="$t('research.breeding.seed.ose.columns.oseName')" min-width="150"
                show-overflow-tooltip />
              <el-table-column prop="location" :label="$t('research.breeding.seed.ose.columns.location')"
                min-width="200" show-overflow-tooltip />
              <!-- <el-table-column prop="regionName" :label="$t('research.breeding.seed.ose.columns.regionName')"
                width="150" /> -->
              <el-table-column prop="contactName" :label="$t('research.breeding.seed.ose.columns.contactName')"
                width="120" />
              <el-table-column prop="contactNumber" :label="$t('research.breeding.seed.ose.columns.contactNumber')"
                width="150">
                <template #default="{ row }">
                  +{{ row.contactNumber }}
                </template>
              </el-table-column>
              <el-table-column prop="oseStatus" :label="$t('research.breeding.seed.ose.columns.oseStatus')" width="110"
                align="center">
                <template #default="{ row }">
                  <el-tag :type="row.oseStatus === 'ENABLED' ? 'success' : 'info'" size="small">
                    {{ $t(`research.breeding.seed.ose.status.${row.oseStatus}`) }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column :label="$t('common.actions')" width="280" fixed="right">
                <template #default="{ row }">
                  <div class="action-buttons">
                    <el-button link type="primary" @click="handleView(row)">
                      <i class="ri-eye-line"></i>
                      {{ $t('common.view') }}
                    </el-button>
                    <el-button link type="primary" @click="handleEdit(row)">
                      <i class="ri-edit-line"></i>
                      {{ $t('common.edit') }}
                    </el-button>
                    <el-button link type="danger" @click="handleDelete(row)">
                      <i class="ri-delete-bin-line"></i>
                      {{ $t('common.delete') }}
                    </el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>

            <div class="pagination-wrapper">
              <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper" :total="total"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" />
            </div>
          </div>

          <!-- 移动端卡片列表 -->
          <div class="mobile-card-list mobile-only">
            <div v-for="item in filteredList" :key="item.oseId" class="mobile-card" @click="handleView(item)">
              <div class="mobile-card-header">
                <div class="mobile-card-title">
                  <i class="ri-building-4-line"></i>
                  <span>{{ item.oseName }}</span>
                </div>
                <el-tag :type="item.oseStatus === 'ENABLED' ? 'success' : 'info'" size="small">
                  {{ $t(`research.breeding.seed.ose.status.${item.oseStatus}`) }}
                </el-tag>
              </div>
              <div class="mobile-card-body">
                <div class="mobile-card-row">
                  <span class="label">{{ $t('research.breeding.seed.ose.columns.oseCode') }}:</span>
                  <span class="value">{{ item.oseCode }}</span>
                </div>
                <div class="mobile-card-row">
                  <span class="label">{{ $t('research.breeding.seed.ose.columns.regionName') }}:</span>
                  <span class="value">{{ item.regionName }}</span>
                </div>
                <div class="mobile-card-row">
                  <span class="label">{{ $t('research.breeding.seed.ose.columns.contactName') }}:</span>
                  <span class="value">{{ item.contactName }}</span>
                </div>
                <div class="mobile-card-row">
                  <span class="label">{{ $t('research.breeding.seed.ose.columns.contactNumber') }}:</span>
                  <span class="value">+{{ item.contactNumber }}</span>
                </div>
              </div>
              <div class="mobile-card-footer">
                <el-button link type="primary" size="small" @click.stop="handleEdit(item)">
                  <i class="ri-edit-line"></i> {{ $t('common.edit') }}
                </el-button>
                <el-button link type="danger" size="small" @click.stop="handleDelete(item)">
                  <i class="ri-delete-bin-line"></i> {{ $t('common.delete') }}
                </el-button>
              </div>
            </div>

            <div v-if="filteredList.length === 0 && !loading" class="empty-status">
              <i class="ri-inbox-line"></i>
              <p>{{ $t('common.noData') }}</p>
            </div>

            <div class="pagination-wrapper">
              <el-pagination v-model:current-page="currentPage" :total="total" :page-size="pageSize"
                layout="prev, pager, next" small @current-change="handleCurrentChange" />
            </div>
          </div>
        </InfoCard>
      </div>

      <!-- 移动端悬浮按钮 -->
      <div class="mobile-fab mobile-only" @click="handleAdd">
        <i class="ri-add-line"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getOseList, deleteOse } from '@/api/breedSeed'
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'

const router = useRouter()
const { t } = useI18n()

const loading = ref(false)
const dataList = ref([])
const searchQuery = ref('')
const statusFilter = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

const filteredList = computed(() => {
  let list = dataList.value
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    list = list.filter(item =>
      item.oseName?.toLowerCase().includes(query) ||
      item.oseCode?.toLowerCase().includes(query)
    )
  }
  if (statusFilter.value) {
    list = list.filter(item => item.oseStatus === statusFilter.value)
  }
  return list
})

const loadData = async () => {
  loading.value = true
  try {
    const res = await getOseList({
      page: currentPage.value,
      pageSize: pageSize.value,
      oseName: searchQuery.value,
      oseStatus: statusFilter.value
    })
    if (res.code === 200) {
      // 兼容性处理
      const data = res.data || res
      dataList.value = data.list || data.rows || (Array.isArray(data) ? data : [])
      total.value = data.total || 0
    }
  } catch (error) {
    console.error('Failed to load OSE list:', error)
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
}

const handleReset = () => {
  searchQuery.value = ''
  statusFilter.value = ''
  currentPage.value = 1
  loadData()
}

const handleAdd = () => {
  router.push({ name: 'OseAdd' })
}

const handleEdit = (row) => {
  router.push({ name: 'OseEdit', params: { id: row.oseId } })
}

const handleView = (row) => {
  router.push({ name: 'OseDetail', params: { id: row.oseId } })
}

const handleDelete = (row) => {
  ElMessageBox.confirm(
    t('common.deleteConfirm'),
    t('common.tip'),
    {
      confirmButtonText: t('common.confirm'),
      cancelButtonText: t('common.cancel'),
      type: 'warning'
    }
  ).then(async () => {
    try {
      const res = await deleteOse(row.oseId)
      if (res.code === 200) {
        ElMessage.success(t('common.deleteSuccess'))
        loadData()
      } else {
        ElMessage.error(res.msg || t('common.failed'))
      }
    } catch (error) {
      console.error('Delete OSE failed:', error)
      ElMessage.error(t('common.deleteFailed'))
    }
  })
}

const handleSizeChange = (val) => {
  pageSize.value = val
  currentPage.value = 1
  loadData()
}

const handleCurrentChange = (val) => {
  currentPage.value = val
  loadData()
}

onMounted(() => {
  loadData()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
@use '@/assets/styles/table-enhanced.scss';
</style>
