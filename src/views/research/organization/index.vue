<template>
  <div class="page-container">
    <div class="page-wrapper">
      <PageHeader icon="ri-building-line" :title="$t('research.organization.title')" :subtitle="$t('research.organization.subtitle')" />

      <div class="content-wrapper">
        <!-- 搜索 -->
        <div class="search-card">
          <SearchForm @search="handleSearch" @reset="handleReset">
            <SearchItem :label="$t('research.organization.orgName')">
              <el-input v-model="filterForm.keyword" :placeholder="$t('research.organization.searchPlaceholder')" clearable />
            </SearchItem>
            <SearchItem :label="$t('research.organization.orgCategory')">
              <el-select v-model="filterForm.orgCategory" :placeholder="$t('common.pleaseSelect')" clearable>
                <el-option v-for="item in categoryOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </SearchItem>
            <SearchItem :label="$t('research.organization.status')">
              <el-select v-model="filterForm.status" :placeholder="$t('common.pleaseSelect')" clearable>
                <el-option :label="$t('common.normal')" value="0" />
                <el-option :label="$t('common.disabled')" value="1" />
              </el-select>
            </SearchItem>
          </SearchForm>
        </div>

        <!-- 列表 -->
        <InfoCard :title="$t('research.organization.list')" icon="ri-file-list-3-line">
          <template #actions>
            <el-button type="primary" @click="handleAdd">
              <i class="ri-add-line"></i>
              {{ $t('common.add') }}
            </el-button>
          </template>

          <div class="table-wrapper pc-only">
            <el-table :data="tableData" stripe v-loading="loading">
              <el-table-column type="index" label="#" width="60" />
              <el-table-column prop="orgCode" :label="$t('research.organization.orgCode')" min-width="140" show-overflow-tooltip />
              <el-table-column prop="orgName" :label="$t('research.organization.orgName')" min-width="180" show-overflow-tooltip />
              <el-table-column prop="orgCategory" :label="$t('research.organization.orgCategory')" min-width="120" align="center">
                <template #default="{ row }">
                  <el-tag size="small">{{ getCategoryLabel(row.orgCategory) }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="location" :label="$t('research.organization.location')" min-width="150" show-overflow-tooltip />
              <el-table-column prop="region" :label="$t('research.organization.region')" min-width="140" show-overflow-tooltip />
              <el-table-column prop="contactPerson" :label="$t('research.organization.contactPerson')" min-width="120" />
              <el-table-column prop="phoneNumber" :label="$t('research.organization.phoneNumber')" min-width="140" />
              <el-table-column prop="status" :label="$t('research.organization.status')" width="100" align="center">
                <template #default="{ row }">
                  <el-tag :type="row.status === '0' ? 'success' : 'danger'" size="small">
                    {{ row.status === '0' ? $t('common.normal') : $t('common.disabled') }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column :label="$t('common.actions')" width="280" fixed="right" align="center">
                <template #default="{ row }">
                  <div style="white-space: nowrap">
                    <el-button size="small" type="primary" @click="handleView(row)">
                      <i class="ri-eye-line"></i> {{ $t('common.view') }}
                    </el-button>
                    <el-button size="small" type="primary" @click="handleEdit(row)">
                      <i class="ri-edit-line"></i> {{ $t('common.edit') }}
                    </el-button>
                    <el-button size="small" type="danger" @click="handleDelete(row)">
                      <i class="ri-delete-bin-line"></i> {{ $t('common.delete') }}
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
import { ref, onMounted, computed } from 'vue'

import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getOrganizationList, deleteOrganization } from '@/api/organization'
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'
import { useDict } from '@/hooks/useDict'

const router = useRouter()
const { t } = useI18n()

const { options: dictOptions, getLabelByValue } = useDict(['org_category'])

const loading = ref(false)
const tableData = ref([])
const filterForm = ref({ keyword: '', orgCategory: '', status: '' })
const pagination = ref({ pageNum: 1, pageSize: 10, total: 0 })

const categoryOptions = computed(() => dictOptions.value.org_category || [])

const getCategoryLabel = (val) => getLabelByValue('org_category', val)

const loadList = async () => {
  loading.value = true
  try {
    const params = {
      pageNum: pagination.value.pageNum,
      pageSize: pagination.value.pageSize,
      ...filterForm.value
    }
    const res = await getOrganizationList(params)
    if (res.code === 200) {
      tableData.value = res.rows || res.data?.records || []
      pagination.value.total = res.total || res.data?.total || 0
    }
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

const handleSearch = () => { pagination.value.pageNum = 1; loadList() }
const handleReset = () => { filterForm.value = { keyword: '', orgCategory: '', status: '' }; handleSearch() }
const handleAdd = () => router.push('/research/organization/add')
const handleView = (row) => router.push(`/research/organization/detail/${row.id}`)
const handleEdit = (row) => router.push(`/research/organization/edit/${row.id}`)
const handleDelete = (row) => {
  ElMessageBox.confirm(t('common.confirmDelete'), t('common.warning'), {
    confirmButtonText: t('common.confirm'), cancelButtonText: t('common.cancel'), type: 'warning'
  }).then(async () => {
    await deleteOrganization(row.id)
    ElMessage.success(t('common.deleteSuccess'))
    loadList()
  }).catch(() => {})
}

onMounted(() => loadList())
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
@use '@/assets/styles/table-enhanced.scss';
</style>
