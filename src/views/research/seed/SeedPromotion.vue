<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader icon="ri-movie-line" :title="$t('research.seedPromotion.title')"
        :subtitle="$t('research.seedPromotion.subtitle')" />

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <!-- 搜索区域 -->
        <div class="search-card">
          <SearchForm @search="handleSearch" @reset="handleReset">
            <SearchItem :label="$t('research.seedPromotion.columns.title')">
              <el-input v-model="searchQuery" :placeholder="$t('research.seedPromotion.searchPlaceholder')" clearable
                @keyup.enter="handleSearch">
                <template #prefix>
                  <i class="ri-search-line"></i>
                </template>
              </el-input>
            </SearchItem>
          </SearchForm>
        </div>

        <!-- 列表区域 -->
        <InfoCard :title="$t('research.seedPromotion.title')" icon="ri-list-check">
          <template #actions>
            <el-button type="primary" @click="handleAdd">
              <i class="ri-upload-line"></i> {{ $t('research.seedPromotion.uploadContent') }}
            </el-button>
          </template>

          <!-- PC端表格 -->
          <div class="table-wrapper pc-only">
            <el-table v-loading="loading" :data="promotionList" stripe style="width: 100%"
              :empty-text="$t('home.noData')">
              <el-table-column prop="promotionId" :label="$t('research.seedPromotion.columns.promotionId')"
                min-width="180" show-overflow-tooltip />
              <el-table-column prop="title" :label="$t('research.seedPromotion.columns.title')" min-width="150"
                show-overflow-tooltip />
              <el-table-column prop="recommendedVarieties"
                :label="$t('research.seedPromotion.columns.recommendedVarieties')" min-width="150"
                show-overflow-tooltip />
              <el-table-column prop="publishTime" :label="$t('research.seedPromotion.columns.publishTime')"
                width="160" />
              <el-table-column prop="validPeriod" :label="$t('research.seedPromotion.columns.validPeriod')" width="140"
                align="center" />
              <el-table-column prop="visitCount" :label="$t('research.seedPromotion.columns.visitCount')" width="100"
                align="center">
                <template #default="{ row }">
                  <el-tag type="info" size="small">{{ row.visitCount }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column :label="$t('research.seedPromotion.columns.shareLink')" min-width="220">
                <template #default="{ row }">
                  <div class="link-cell">
                    <el-input :model-value="row.shareLink" readonly size="small" placeholder="Share Link" />
                    <el-button link type="primary" size="small" @click="handleCopyLink(row.shareLink)">
                      <i class="ri-file-copy-line"></i>
                    </el-button>
                  </div>
                </template>
              </el-table-column>
              <el-table-column :label="$t('common.actions')" width="220" fixed="right">
                <template #default="{ row }">
                  <div class="action-buttons">
                    <el-button size="small" type="primary" @click="handleViewDetail(row)">
                      <i class="ri-eye-line"></i> {{ $t('common.view') }}
                    </el-button>
                    <el-button size="small" type="danger" @click="handleDelete(row)">
                      <i class="ri-delete-bin-line"></i> {{ $t('common.delete') }}
                    </el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>

            <!-- 分页 -->
            <div class="pagination-wrapper">
              <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                :page-sizes="[10, 20, 50, 100]" :total="total" layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleSizeChange" @current-change="handlePageChange" />
            </div>
          </div>

          <!-- 移动端卡片 -->
          <div class="mobile-card-list mobile-only">
            <div v-if="promotionList.length === 0 && !loading" class="empty-status">
              <i class="ri-inbox-line"></i>
              <p>{{ $t('home.noData') }}</p>
            </div>
            <div v-for="item in promotionList" :key="item.promotionId" class="mobile-card">
              <div class="mobile-card-header">
                <div class="mobile-card-title">{{ item.title }}</div>
                <div class="visit-count">
                  <i class="ri-eye-line"></i> <span>{{ item.visitCount }}</span>
                </div>
              </div>
              <div class="mobile-card-body">
                <div class="mobile-card-row">
                  <span class="label">{{ $t('research.seedPromotion.columns.recommendedVarieties') }}:</span>
                  <span class="value">{{ item.recommendedVarieties }}</span>
                </div>
                <div class="mobile-card-row">
                  <span class="label">{{ $t('research.seedPromotion.columns.publishTime') }}:</span>
                  <span class="value">{{ item.publishTime }}</span>
                </div>
                <div class="mobile-card-row link-row">
                  <el-button link type="primary" size="small" @click="handleCopyLink(item.shareLink)">
                    <i class="ri-file-copy-line"></i>
                    {{ $t('research.seedPromotion.copyLink') }}
                  </el-button>
                </div>
              </div>
              <div class="mobile-card-footer">
                <el-button link type="primary" size="small" @click="handleViewDetail(item)">
                  <i class="ri-eye-line"></i> {{ $t('common.view') }}
                </el-button>
                <el-button link type="danger" size="small" @click="handleDelete(item)">
                  <i class="ri-delete-bin-line"></i> {{ $t('common.delete') }}
                </el-button>
              </div>
            </div>

            <!-- 移动端分页 -->
            <div v-if="total > 0" class="pagination-wrapper">
              <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :total="total"
                layout="prev, pager, next" small @current-change="handlePageChange" />
            </div>
          </div>
        </InfoCard>
      </div>

      <!-- 移动端悬浮添加按钮 -->
      <div class="mobile-fab mobile-only" @click="handleAdd">
        <i class="ri-add-line"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getPromotionList, deletePromotion } from '@/api/seedPromotion'
import { useUserStore } from '@/store'
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'

const router = useRouter()
const { t } = useI18n()
const userStore = useUserStore()

// 列表数据
const loading = ref(false)
const promotionList = ref([])
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref(10)
const searchQuery = ref('')

// 加载推广内容列表
const loadPromotionList = async () => {
  loading.value = true
  try {
    const params = {
      enterpriseId: userStore.userInfo?.enterpriseId || 'ENT1A3B5C7D9E8F7890',
      title: searchQuery.value,
      pageNum: currentPage.value,
      pageSize: pageSize.value
    }

    const response = await getPromotionList(params)
    if (response.code === 200) {
      promotionList.value = response.rows || []
      total.value = response.total || 0
    } else {
      ElMessage.error(response.msg || t('research.seedPromotion.messages.loadFailed'))
    }
  } catch (error) {
    console.error('Failed to load promotion list:', error)
    ElMessage.error(t('research.seedPromotion.messages.loadFailed'))
  } finally {
    loading.value = false
  }
}

// 搜索处理
const handleSearch = () => {
  currentPage.value = 1
  loadPromotionList()
}

const handleReset = () => {
  searchQuery.value = ''
  handleSearch()
}

// 分页处理
const handleSizeChange = (newSize) => {
  pageSize.value = newSize
  currentPage.value = 1
  loadPromotionList()
}

const handlePageChange = (newPage) => {
  currentPage.value = newPage
  loadPromotionList()
}

// 复制链接
const handleCopyLink = async (link) => {
  try {
    await navigator.clipboard.writeText(link)
    ElMessage.success(t('research.seedPromotion.linkCopied'))
  } catch (error) {
    console.error('Failed to copy link:', error)
    const textarea = document.createElement('textarea')
    textarea.value = link
    document.body.appendChild(textarea)
    textarea.select()
    try {
      document.execCommand('copy')
      ElMessage.success(t('research.seedPromotion.linkCopied'))
    } catch (err) {
      ElMessage.error('Failed to copy link')
    }
    document.body.removeChild(textarea)
  }
}

// 新增内容 - 跳转到表单页
const handleAdd = () => {
  router.push({ name: 'SeedPromotionForm' })
}

// 查看详情 - 跳转到详情页
const handleViewDetail = (row) => {
  router.push({
    name: 'SeedPromotionDetail',
    params: { promotionId: row.promotionId }
  })
}

// 删除推广内容
const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm(
      t('research.seedPromotion.messages.deleteConfirm'),
      t('common.tips'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      }
    )

    const response = await deletePromotion(row.promotionId)
    if (response.code === 200) {
      ElMessage.success(t('research.seedPromotion.messages.deleteSuccess'))
      loadPromotionList()
    } else {
      ElMessage.error(response.msg || t('research.seedPromotion.messages.deleteFailed'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Failed to delete promotion:', error)
      ElMessage.error(t('research.seedPromotion.messages.deleteFailed'))
    }
  }
}

// 页面加载时获取数据
onMounted(() => {
  loadPromotionList()
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/table-enhanced.scss';

.link-cell {
  display: flex;
  gap: 8px;
  align-items: center;

  .el-input {
    flex: 1;
  }
}

.visit-count {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #64748b;
  font-size: 13px;
}

.action-buttons button {
  margin-left: 0;
}
</style>
