<template>
  <div class="iot-sensor-management-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-icon-wrapper">
        <i class="ri-sensor-line"></i>
      </div>
      <div class="header-text">
        <h1 class="page-title">{{ $t('research.iotSensor.title') }}</h1>
        <p class="page-subtitle">{{ $t('research.iotSensor.subtitle') }}</p>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="content-wrapper">
      <!-- 搜索和筛选栏 -->
      <div class="search-bar">
        <div class="search-row">
          <el-input
            v-model="searchKeyword"
            :placeholder="$t('research.iotSensor.searchPlaceholder')"
            class="search-input"
            clearable
            @clear="handleSearch"
            @keyup.enter="handleSearch"
          >
            <template #prefix>
              <i class="ri-search-line"></i>
            </template>
          </el-input>

          <el-select
            v-model="filterType"
            :placeholder="$t('research.iotSensor.filterByType')"
            class="filter-select"
            clearable
            @change="handleSearch"
          >
            <el-option :label="$t('research.iotSensor.allTypes')" value="" />
            <el-option :label="$t('research.iotSensor.type.temperature')" value="01" />
            <el-option :label="$t('research.iotSensor.type.humidity')" value="02" />
            <el-option :label="$t('research.iotSensor.type.light')" value="03" />
            <el-option :label="$t('research.iotSensor.type.soil')" value="04" />
            <el-option :label="$t('research.iotSensor.type.gas')" value="05" />
            <el-option :label="$t('research.iotSensor.type.other')" value="99" />
          </el-select>
        </div>

        <div class="action-row">
          <div class="action-left">
            <el-button type="primary" @click="handleSearch">
              <i class="ri-search-line"></i>
              <span class="btn-text">{{ $t('common.search') }}</span>
            </el-button>
            <el-button @click="handleReset">
              <i class="ri-restart-line"></i>
              <span class="btn-text">{{ $t('common.reset') }}</span>
            </el-button>
          </div>
          <div class="action-right">
            <el-button type="primary" @click="handleAdd">
              <i class="ri-add-line"></i>
              <span class="btn-text">{{ $t('research.iotSensor.add') }}</span>
            </el-button>
          </div>
        </div>
      </div>

      <!-- PC端：数据表格 -->
      <div class="table-card pc-view">
        <el-table
          v-loading="loading"
          :data="tableData"
          stripe
          style="width: 100%"
        >
          <el-table-column prop="iotId" :label="$t('research.iotSensor.columns.iotId')" width="150" fixed="left" />
          <el-table-column prop="iotName" :label="$t('research.iotSensor.columns.iotName')" min-width="180" show-overflow-tooltip />
          <el-table-column prop="iotType" :label="$t('research.iotSensor.columns.iotType')" min-width="180" align="center">
            <template #default="{ row }">
              <el-tag :type="getTypeTag(row.iotType)" size="small">
                {{ getTypeName(row.iotType) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="manufacturer" :label="$t('research.iotSensor.columns.manufacturer')" min-width="150" show-overflow-tooltip />
          <el-table-column prop="firmwareVersion" :label="$t('research.iotSensor.columns.firmwareVersion')" min-width="140" align="center" />
          <el-table-column prop="batteryStatus" :label="$t('research.iotSensor.columns.batteryStatus')" min-width="120" align="center">
            <template #default="{ row }">
              <span :class="getBatteryClass(row.batteryStatus)">{{ row.batteryStatus || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="calibrationDate" :label="$t('research.iotSensor.columns.calibrationDate')" min-width="170" align="center" />
          <el-table-column :label="$t('research.iotSensor.columns.actions')" width="200" fixed="right">
            <template #default="{ row }">
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
            </template>
          </el-table-column>
        </el-table>

        <div class="pagination-wrapper">
          <el-pagination
            v-model:current-page="pagination.pageNum"
            v-model:page-size="pagination.pageSize"
            :page-sizes="[10, 20, 50, 100]"
            :total="pagination.total"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handlePageChange"
          />
        </div>
      </div>

      <!-- 移动端：卡片列表 -->
      <div class="mobile-view" v-loading="loading">
        <div class="card-list">
          <div v-for="item in tableData" :key="item.dataId" class="sensor-card" @click="handleView(item)">
            <div class="card-header">
              <div class="sensor-info">
                <h3 class="sensor-name">{{ item.iotName }}</h3>
                <span class="sensor-code">{{ item.iotId }}</span>
              </div>
              <div class="card-tags">
                <el-tag :type="getTypeTag(item.iotType)" size="small">
                  {{ getTypeName(item.iotType) }}
                </el-tag>
              </div>
            </div>

            <div class="card-body">
              <div class="info-row">
                <i class="ri-building-line info-icon"></i>
                <span class="info-label">{{ $t('research.iotSensor.columns.manufacturer') }}:</span>
                <span class="info-value">{{ item.manufacturer || '-' }}</span>
              </div>

              <div class="info-row">
                <i class="ri-code-line info-icon"></i>
                <span class="info-label">{{ $t('research.iotSensor.columns.firmwareVersion') }}:</span>
                <span class="info-value">{{ item.firmwareVersion || '-' }}</span>
              </div>

              <div class="info-row">
                <i class="ri-battery-line info-icon"></i>
                <span class="info-label">{{ $t('research.iotSensor.columns.batteryStatus') }}:</span>
                <span class="info-value" :class="getBatteryClass(item.batteryStatus)">{{ item.batteryStatus || '-' }}</span>
              </div>

              <div class="info-row">
                <i class="ri-calendar-line info-icon"></i>
                <span class="info-label">{{ $t('research.iotSensor.columns.calibrationDate') }}:</span>
                <span class="info-value">{{ item.calibrationDate || '-' }}</span>
              </div>
            </div>

            <div class="card-footer" @click.stop>
              <el-button link type="primary" size="small" @click="handleEdit(item)">
                <i class="ri-edit-line"></i> {{ $t('common.edit') }}
              </el-button>
              <el-button link type="danger" size="small" @click="handleDelete(item)">
                <i class="ri-delete-bin-line"></i> {{ $t('common.delete') }}
              </el-button>
            </div>
          </div>
        </div>

        <div v-if="tableData.length === 0 && !loading" class="empty-state">
          <i class="ri-sensor-line"></i>
          <p>{{ $t('home.noData') }}</p>
        </div>

        <div class="mobile-pagination">
          <el-pagination
            v-model:current-page="pagination.pageNum"
            :total="pagination.total"
            :page-size="pagination.pageSize"
            layout="prev, pager, next"
            small
            @current-change="handlePageChange"
          />
        </div>
      </div>
    </div>

    <!-- 移动端浮动添加按钮 -->
    <div class="mobile-fab" @click="handleAdd">
      <i class="ri-add-line"></i>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getIotSensorList, deleteIotSensor } from '@/api/iot-sensor'

const router = useRouter()
const { t } = useI18n()

const searchKeyword = ref('')
const filterType = ref('')
const loading = ref(false)
const tableData = ref([])

const pagination = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0
})

// 获取传感器类型标签
const getTypeTag = (type) => {
  const typeMap = {
    '01': 'danger',
    '02': 'info',
    '03': 'warning',
    '04': '',
    '05': 'success',
    '99': 'info'
  }
  return typeMap[type] || ''
}

// 获取传感器类型名称
const getTypeName = (type) => {
  const typeMap = {
    '01': t('research.iotSensor.type.temperature'),
    '02': t('research.iotSensor.type.humidity'),
    '03': t('research.iotSensor.type.light'),
    '04': t('research.iotSensor.type.soil'),
    '05': t('research.iotSensor.type.gas'),
    '99': t('research.iotSensor.type.other')
  }
  return typeMap[type] || '-'
}

// 获取电池状态样式
const getBatteryClass = (status) => {
  if (!status) return ''
  const percentage = parseInt(status)
  if (isNaN(percentage)) return ''
  if (percentage >= 60) return 'battery-good'
  if (percentage >= 30) return 'battery-medium'
  return 'battery-low'
}

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    const res = await getIotSensorList({
      iotName: searchKeyword.value,
      iotType: filterType.value,
      pageNum: pagination.pageNum,
      pageSize: pagination.pageSize
    })

    if (res.code === 200) {
      tableData.value = res.data.records || []
      pagination.total = res.data.total || 0
    }
  } catch (error) {
    console.error('Failed to load sensor list:', error)
    ElMessage.error(t('common.failed'))
  } finally {
    loading.value = false
  }
}

// 搜索
const handleSearch = () => {
  pagination.pageNum = 1
  loadData()
}

// 重置
const handleReset = () => {
  searchKeyword.value = ''
  filterType.value = ''
  pagination.pageNum = 1
  loadData()
}

// 新增
const handleAdd = () => {
  router.push('/research/data-collection/iot-sensor/add')
}

// 查看
const handleView = (row) => {
  router.push(`/research/data-collection/iot-sensor/detail/${row.dataId}`)
}

// 编辑
const handleEdit = (row) => {
  router.push(`/research/data-collection/iot-sensor/edit/${row.dataId}`)
}

// 删除
const handleDelete = (row) => {
  ElMessageBox.confirm(
    t('research.iotSensor.deleteConfirm'),
    t('common.tips'),
    {
      confirmButtonText: t('common.confirm'),
      cancelButtonText: t('common.cancel'),
      type: 'warning'
    }
  ).then(async () => {
    try {
      const res = await deleteIotSensor([row.dataId])
      if (res.code === 200) {
        ElMessage.success(t('research.iotSensor.deleteSuccess'))
        loadData()
      }
    } catch (error) {
      console.error('Failed to delete sensor:', error)
      ElMessage.error(t('common.failed'))
    }
  }).catch(() => {})
}

// 切换每页条数
const handleSizeChange = () => {
  pagination.pageNum = 1
  loadData()
}

// 切换页码
const handlePageChange = () => {
  loadData()
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.iot-sensor-management-page {
  min-height: calc(100vh - 120px);
  position: relative;
}

/* 页面头部 */
.page-header {
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  padding: 32px;
  margin: -24px 0 24px 0;
  border-radius: 0 0 16px 16px;
  display: flex;
  align-items: center;
  gap: 24px;
}

.header-icon-wrapper {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  flex-shrink: 0;
}

.header-icon-wrapper i {
  font-size: 40px;
  color: white;
}

.header-text {
  flex: 1;
  color: white;
}

.page-title {
  font-size: 28px;
  font-weight: 600;
  margin: 0 0 8px 0;
}

.page-subtitle {
  font-size: 15px;
  opacity: 0.9;
  margin: 0;
}

/* 内容区域 */
.content-wrapper {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* 搜索栏 */
.search-bar {
  margin-bottom: 24px;
}

.search-row {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.search-input {
  flex: 1;
  min-width: 200px;
}

.filter-select {
  width: 180px;
  flex-shrink: 0;
}

.action-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.action-left,
.action-right {
  display: flex;
  gap: 8px;
}

/* PC端表格 */
.table-card {
  background: white;
}

.pagination-wrapper {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}

/* 电池状态样式 */
.battery-good {
  color: #67c23a;
  font-weight: 500;
}

.battery-medium {
  color: #e6a23c;
  font-weight: 500;
}

.battery-low {
  color: #f56c6c;
  font-weight: 500;
}

/* 移动端默认隐藏 */
.mobile-view,
.mobile-fab {
  display: none;
}

/* 移动端卡片样式 */
.card-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.sensor-card {
  background: white;
  border: 1px solid #e4e7ed;
  border-radius: 12px;
  padding: 16px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.sensor-card:active {
  transform: scale(0.98);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f2f5;
}

.sensor-info {
  flex: 1;
  min-width: 0;
}

.sensor-name {
  font-size: 17px;
  font-weight: 600;
  color: #303133;
  margin: 0 0 4px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sensor-code {
  font-size: 13px;
  color: #909399;
}

.card-tags {
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-end;
  flex-shrink: 0;
  margin-left: 12px;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 12px;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.info-icon {
  font-size: 16px;
  color: #909399;
  flex-shrink: 0;
}

.info-label {
  color: #606266;
  flex-shrink: 0;
}

.info-value {
  color: #303133;
  font-weight: 500;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-footer {
  display: flex;
  gap: 12px;
  padding-top: 12px;
  border-top: 1px solid #f0f2f5;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #909399;
}

.empty-state i {
  font-size: 64px;
  margin-bottom: 12px;
  display: block;
  opacity: 0.5;
}

.mobile-pagination {
  display: flex;
  justify-content: center;
  padding: 16px 0;
  margin-top: 16px;
}

/* ==================== 响应式设计 ==================== */
@media screen and (max-width: 1024px) {
  .page-header {
    margin: -16px -16px 16px -16px;
    padding: 24px;
  }
}

@media screen and (max-width: 768px) {
  .page-header {
    margin: -12px -12px 12px -12px;
    padding: 20px 16px;
    gap: 16px;
  }

  .header-icon-wrapper {
    width: 64px;
    height: 64px;
    border-radius: 12px;
  }

  .header-icon-wrapper i {
    font-size: 32px;
  }

  .page-title {
    font-size: 20px;
  }

  .page-subtitle {
    font-size: 13px;
  }

  .content-wrapper {
    padding: 16px;
  }

  .search-row {
    flex-direction: column;
  }

  .search-input,
  .filter-select {
    width: 100%;
  }

  .action-row {
    flex-direction: column;
    align-items: stretch;
  }

  .action-left,
  .action-right {
    justify-content: stretch;
  }

  .action-left .el-button,
  .action-right .el-button {
    flex: 1;
  }

  .action-right {
    display: none;
  }

  .pc-view {
    display: none;
  }

  .mobile-view {
    display: block;
  }

  .mobile-fab {
    display: flex;
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 56px;
    height: 56px;
    background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 24px;
    box-shadow: 0 4px 16px rgba(0, 154, 68, 0.3);
    cursor: pointer;
    z-index: 50;
    transition: all 0.3s ease;
  }

  .mobile-fab:active {
    transform: scale(0.9);
  }

  .btn-text {
    display: none;
  }
}

@media screen and (max-width: 480px) {
  .page-header {
    padding: 16px 12px;
  }

  .header-icon-wrapper {
    width: 56px;
    height: 56px;
  }

  .header-icon-wrapper i {
    font-size: 28px;
  }

  .page-title {
    font-size: 18px;
  }

  .sensor-card {
    padding: 14px;
  }

  .sensor-name {
    font-size: 16px;
  }

  .mobile-fab {
    bottom: 16px;
    right: 16px;
    width: 48px;
    height: 48px;
    font-size: 20px;
  }
}
</style>
