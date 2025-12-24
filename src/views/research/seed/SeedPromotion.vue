<template>
  <div class="seed-promotion-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-icon header-left">
        <i class="ri-movie-line"></i>
      </div>
      <div class="header-content">
        <h1 class="page-title">{{ $t('research.seedPromotion.title') }}</h1>
        <p class="page-subtitle">{{ $t('research.seedPromotion.subtitle') }}</p>
      </div>
    </div>

    <!-- 工具栏 -->
    <div class="toolbar">
      <el-button type="primary" @click="showUploadDialog = true">
        <i class="ri-upload-line"></i>
        {{ $t('research.seedPromotion.uploadContent') }}
      </el-button>
    </div>

    <!-- 搜索筛选区 -->
    <div class="search-section">
      <el-input
        v-model="searchQuery"
        :placeholder="$t('research.seedPromotion.searchPlaceholder')"
        clearable
        class="search-input"
        @input="handleSearch"
      >
        <template #prefix>
          <i class="ri-search-line"></i>
        </template>
      </el-input>
    </div>

    <!-- PC端表格 -->
    <div class="table-container pc-only">
      <el-table
        v-loading="loading"
        :data="promotionList"
        stripe
        style="width: 100%"
        :empty-text="$t('home.noData')"
      >
        <el-table-column
          prop="promotionId"
          :label="$t('research.seedPromotion.columns.promotionId')"
          min-width="180"
        />
        <el-table-column
          prop="title"
          :label="$t('research.seedPromotion.columns.title')"
          min-width="120"
        />
        <el-table-column
          prop="recommendedVarieties"
          :label="$t('research.seedPromotion.columns.recommendedVarieties')"
          min-width="120"
        />
        <el-table-column
          prop="publishTime"
          :label="$t('research.seedPromotion.columns.publishTime')"
           min-width="120"
        />
        <el-table-column
          prop="validPeriod"
          :label="$t('research.seedPromotion.columns.validPeriod')"
          width="130"
          align="center"
        />
        <el-table-column
          prop="visitCount"
          :label="$t('research.seedPromotion.columns.visitCount')"
          width="130"
          align="center"
        >
          <template #default="{ row }">
            <el-tag type="info">{{ row.visitCount }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('research.seedPromotion.columns.shareLink')"
          min-width="200"
        >
          <template #default="{ row }">
            <div class="link-cell">
              <el-input
                :model-value="row.shareLink"
                readonly
                size="small"
              />
              <el-button
                link
                type="primary"
                size="small"
                @click="handleCopyLink(row.shareLink)"
              >
                <i class="ri-file-copy-line"></i>
                {{ $t('research.seedPromotion.copyLink') }}
              </el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('research.seedPromotion.columns.actions')"
          width="180"
          fixed="right"
        >
          <template #default="{ row }">
            <div class="action-buttons">
              <el-button link type="primary" @click="handleViewDetail(row)">
                <i class="ri-eye-line"></i>
                {{ $t('common.view') }}
              </el-button>
              <el-button link type="danger" @click="handleDelete(row)">
                <i class="ri-delete-bin-line"></i>
                {{ $t('common.delete') }}
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-wrapper">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
        />
      </div>
    </div>

    <!-- 移动端卡片 -->
    <div class="card-container mobile-only">
      <div v-if="promotionList.length === 0" class="empty-state">
        <i class="ri-inbox-line"></i>
        <p>{{ $t('home.noData') }}</p>
      </div>
      <div
        v-for="item in promotionList"
        :key="item.promotionId"
        class="promotion-card"
      >
        <div class="card-header">
          <div class="promotion-title">{{ item.title }}</div>
          <div class="visit-count">
            <i class="ri-eye-line"></i>
            <span>{{ item.visitCount }}</span>
          </div>
        </div>
        <div class="card-body">
          <div class="card-row">
            <span class="label">{{ $t('research.seedPromotion.columns.recommendedVarieties') }}:</span>
            <span class="value">{{ item.recommendedVarieties }}</span>
          </div>
          <div class="card-row">
            <span class="label">{{ $t('research.seedPromotion.columns.publishTime') }}:</span>
            <span class="value">{{ item.publishTime }}</span>
          </div>
          <div class="card-row">
            <span class="label">{{ $t('research.seedPromotion.card.validUntil') }}:</span>
            <span class="value">{{ formatValidUntil(item.publishTime, item.validPeriod) }}</span>
          </div>
          <div class="card-row link-row">
            <el-button
              link
              type="primary"
              size="small"
              @click="handleCopyLink(item.shareLink)"
            >
              <i class="ri-file-copy-line"></i>
              {{ $t('research.seedPromotion.copyLink') }}
            </el-button>
          </div>
        </div>
        <div class="card-actions">
          <el-button link type="primary" size="small" @click="handleViewDetail(item)">
            <i class="ri-eye-line"></i> {{ $t('common.view') }}
          </el-button>
          <el-button link type="danger" size="small" @click="handleDelete(item)">
            <i class="ri-delete-bin-line"></i> {{ $t('common.delete') }}
          </el-button>
        </div>
      </div>

      <!-- 移动端分页 -->
      <div class="pagination-wrapper mobile-pagination">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50]"
          :total="total"
          layout="total, prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
        />
      </div>
    </div>

    <!-- 上传对话框 -->
    <UploadDialog
      v-model="showUploadDialog"
      @success="handleUploadSuccess"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getPromotionList, deletePromotion } from '@/api/seedPromotion'
import { useUserStore } from '@/store'
import UploadDialog from './components/UploadDialog.vue'

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

// 对话框状态
const showUploadDialog = ref(false)

// 加载推广内容列表
const loadPromotionList = async () => {
  loading.value = true
  try {
    const params = {
      enterpriseId: userStore.userInfo?.enterpriseId || 'ENT1A3B5C7D9E8F7890', // 从用户信息获取或使用默认值
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
    // 降级方案：使用旧的复制方法
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

// 上传成功回调
const handleUploadSuccess = () => {
  showUploadDialog.value = false
  loadPromotionList()
}

// 格式化有效期至日期
const formatValidUntil = (publishTime, validPeriod) => {
  if (!publishTime || !validPeriod) return '-'
  const date = new Date(publishTime)
  date.setDate(date.getDate() + validPeriod)
  return date.toISOString().split('T')[0]
}

// 页面加载时获取数据
onMounted(() => {
  loadPromotionList()
})
</script>

<style scoped lang="scss">
/* 工具栏 */
.toolbar {
  margin-bottom: 24px;
  display: flex;
  justify-content: flex-start;
  gap: 12px;
}

/* 搜索筛选区 */
.search-section {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;

  .search-input {
    flex: 1;
    min-width: 250px;
  }

  .filter-select {
    width: 200px;
  }
}

/* 表格容器 */
.table-container {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);

  .link-cell {
    display: flex;
    gap: 8px;
    align-items: center;

    .el-input {
      flex: 1;
    }
  }

  .action-buttons {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
}

/* 分页 */
.pagination-wrapper {
  margin-top: 24px;
  display: flex;
  justify-content: flex-end;

  &.mobile-pagination {
    justify-content: center;
  }
}

/* 移动端卡片 */
.card-container {
  display: flex;
  flex-direction: column;
  gap: 16px;

  .empty-state {
    text-align: center;
    padding: 60px 20px;
    color: #909399;

    i {
      font-size: 64px;
      margin-bottom: 16px;
      display: block;
    }

    p {
      font-size: 16px;
      margin: 0;
    }
  }

  .promotion-card {
    background: white;
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0 4px 16px rgba(0, 154, 68, 0.15);
      transform: translateY(-2px);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      padding-bottom: 12px;
      border-bottom: 1px solid #EBEEF5;

      .promotion-title {
        font-size: 16px;
        font-weight: 600;
        color: #303133;
        flex: 1;
      }

      .visit-count {
        display: flex;
        align-items: center;
        gap: 4px;
        color: #909399;
        font-size: 14px;

        i {
          font-size: 16px;
        }
      }
    }

    .card-body {
      .card-row {
        display: flex;
        margin-bottom: 8px;
        font-size: 14px;

        &.link-row {
          justify-content: flex-start;
          margin-top: 12px;
        }

        .label {
          color: #909399;
          margin-right: 8px;
          min-width: 80px;
        }

        .value {
          color: #606266;
          flex: 1;
          word-break: break-all;
        }
      }
    }

    .card-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid #EBEEF5;
    }
  }
}

/* 响应式 */
.pc-only {
  display: block;
}

.mobile-only {
  display: none;
}

@media screen and (max-width: 768px) {
  .seed-promotion-page {
    padding: 16px;
  }

  .page-header {
    padding: 20px;
    flex-direction: column;
    text-align: center;

    .header-icon-wrapper {
      margin-right: 0;
      margin-bottom: 16px;
    }

    .header-text {
      .page-title {
        font-size: 22px;
      }

      .page-subtitle {
        font-size: 14px;
      }
    }
  }

  .search-section {
    flex-direction: column;

    .search-input,
    .filter-select {
      width: 100%;
    }
  }

  .pc-only {
    display: none;
  }

  .mobile-only {
    display: flex;
  }
}
</style>
