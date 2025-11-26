<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- Page Header -->
      <div class="page-header">
        <div class="header-icon">
          <i class="ri-landscape-line"></i>
        </div>
        <div class="header-content">
          <h1 class="page-title">{{ $t('farm.land.title') }}</h1>
          <p class="page-subtitle">{{ $t('farm.land.subtitle') }}</p>
        </div>
      </div>

      <!-- Content -->
      <div class="content-wrapper">
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-map-pin-line"></i>
              <span>{{ $t('farm.land.list') }}</span>
            </div>
            <el-button type="primary" @click="handleAdd" class="add-btn">
              <i class="ri-add-line"></i>
              {{ $t('farm.land.add') }}
            </el-button>
          </div>
          <div class="card-body">
            <!-- 搜索栏 -->
            <div class="search-bar">
              <el-input
                v-model="searchKeyword"
                :placeholder="$t('farm.land.searchPlaceholder')"
                clearable
                @clear="handleSearch"
                @keyup.enter="handleSearch"
              >
                <template #prefix>
                  <i class="ri-search-line"></i>
                </template>
              </el-input>
              <el-button type="primary" @click="handleSearch">
                {{ $t('common.search') }}
              </el-button>
            </div>

            <!-- PC端表格 -->
            <div class="table-wrapper pc-only">
              <el-table
                :data="tableData"
                style="width: 100%"
                v-loading="loading"
              >
                <el-table-column
                  prop="landName"
                  :label="$t('farm.land.columns.landName')"
                  min-width="120"
                />
                <el-table-column
                  prop="ownerType"
                  :label="$t('farm.land.columns.ownerType')"
                  min-width="100"
                />
                <el-table-column
                  prop="adCode"
                  :label="$t('farm.land.columns.adCode')"
                  min-width="100"
                />
                <el-table-column
                  prop="areaSize"
                  :label="$t('farm.land.columns.areaSize')"
                  min-width="100"
                >
                  <template #default="{ row }">
                    {{ row.areaSize }} {{ $t('farm.land.form.areaSizeUnit') }}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="landType"
                  :label="$t('farm.land.columns.landType')"
                  min-width="100"
                />
                <el-table-column
                  prop="currentStatus"
                  :label="$t('farm.land.columns.currentStatus')"
                  min-width="100"
                />
                <el-table-column
                  prop="createTime"
                  :label="$t('farm.land.columns.createTime')"
                  min-width="160"
                >
                  <template #default="{ row }">
                    {{ formatDate(row.createTime) }}
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('farm.land.columns.actions')"
                  fixed="right"
                  min-width="300"
                >
                  <template #default="{ row }">
                    <el-button type="primary" link @click="handleView(row)">
                      <i class="ri-eye-line"></i>
                      {{ $t('common.viewDetails') }}
                    </el-button>
                    <el-button type="warning" link @click="handleEdit(row)">
                      <i class="ri-edit-line"></i>
                      {{ $t('common.edit') }}
                    </el-button>
                    <el-button type="danger" link @click="handleDelete(row)">
                      <i class="ri-delete-bin-line"></i>
                      {{ $t('common.delete') }}
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>

            <!-- 移动端卡片 -->
            <div class="card-list mobile-only">
              <div
                v-for="item in tableData"
                :key="item.landId"
                class="list-card"
              >
                <div class="card-info">
                  <div class="info-row">
                    <span class="label">{{ $t('farm.land.columns.landName') }}:</span>
                    <span class="value">{{ item.landName }}</span>
                  </div>
                  <div class="info-row">
                    <span class="label">{{ $t('farm.land.columns.ownerType') }}:</span>
                    <span class="value">{{ item.ownerType }}</span>
                  </div>
                  <div class="info-row">
                    <span class="label">{{ $t('farm.land.columns.adCode') }}:</span>
                    <span class="value">{{ item.adCode }}</span>
                  </div>
                  <div class="info-row">
                    <span class="label">{{ $t('farm.land.columns.areaSize') }}:</span>
                    <span class="value">{{ item.areaSize }} {{ $t('farm.land.form.areaSizeUnit') }}</span>
                  </div>
                  <div class="info-row">
                    <span class="label">{{ $t('farm.land.columns.landType') }}:</span>
                    <span class="value">{{ item.landType }}</span>
                  </div>
                  <div class="info-row">
                    <span class="label">{{ $t('farm.land.columns.currentStatus') }}:</span>
                    <span class="value">{{ item.currentStatus }}</span>
                  </div>
                </div>
                <div class="card-actions">
                  <el-button type="primary" plain size="small" @click="handleView(item)">
                    <i class="ri-eye-line"></i>
                    {{ $t('common.viewDetails') }}
                  </el-button>
                  <el-button type="warning" plain size="small" @click="handleEdit(item)">
                    <i class="ri-edit-line"></i>
                    {{ $t('common.edit') }}
                  </el-button>
                  <el-button type="danger" plain size="small" @click="handleDelete(item)">
                    <i class="ri-delete-bin-line"></i>
                    {{ $t('common.delete') }}
                  </el-button>
                </div>
              </div>
              <el-empty v-if="!loading && tableData.length === 0" :description="$t('home.noData')" />
            </div>

            <!-- 分页 -->
            <div v-if="pagination.total > 0" class="pagination-wrapper">
              <el-pagination
                v-model:current-page="pagination.page"
                v-model:page-size="pagination.pageSize"
                :total="pagination.total"
                :page-sizes="[10, 20, 50, 100]"
                layout="total, sizes, prev, pager, next, jumper"
                @current-change="handlePageChange"
                @size-change="handleSizeChange"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 新增/编辑对话框 -->
    <ResponsiveDialog
      v-model="dialogVisible"
      :title="isEdit ? $t('farm.land.edit') : $t('farm.land.add')"
      width="800px"
      :confirm-loading="submitLoading"
      @confirm="handleSubmit"
      @cancel="dialogVisible = false"
    >
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-position="top"
      >
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12">
            <el-form-item :label="$t('farm.land.form.landName')" prop="landName">
              <el-input v-model="form.landName" :placeholder="$t('farm.land.placeholder.landName')" />
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12">
            <el-form-item :label="$t('farm.land.form.ownerType')" prop="ownerType">
              <el-select v-model="form.ownerType" :placeholder="$t('farm.land.placeholder.ownerType')" style="width: 100%">
                <el-option
                  v-for="(value, key) in ownerTypes"
                  :key="key"
                  :label="value"
                  :value="key"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12">
            <el-form-item :label="$t('farm.land.form.adCode')" prop="adCode">
              <el-input v-model="form.adCode" :placeholder="$t('farm.land.placeholder.adCode')" />
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12">
            <el-form-item :label="$t('farm.land.form.areaSize')" prop="areaSize">
              <el-input v-model.number="form.areaSize" :placeholder="$t('farm.land.placeholder.areaSize')" type="number">
                <template #append>{{ $t('farm.land.form.areaSizeUnit') }}</template>
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12">
            <el-form-item :label="$t('farm.land.form.landType')" prop="landType">
              <el-select v-model="form.landType" :placeholder="$t('farm.land.placeholder.landType')" style="width: 100%">
                <el-option
                  v-for="(value, key) in landTypes"
                  :key="key"
                  :label="value"
                  :value="key"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12">
            <el-form-item :label="$t('farm.land.form.currentStatus')" prop="currentStatus">
              <el-select v-model="form.currentStatus" :placeholder="$t('farm.land.placeholder.currentStatus')" style="width: 100%">
                <el-option
                  v-for="(value, key) in statusOptions"
                  :key="key"
                  :label="value"
                  :value="key"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12">
            <el-form-item :label="$t('farm.land.form.latitude')" prop="latitude">
              <el-input v-model.number="form.latitude" :placeholder="$t('farm.land.placeholder.latitude')" type="number" />
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12">
            <el-form-item :label="$t('farm.land.form.longitude')" prop="longitude">
              <el-input v-model.number="form.longitude" :placeholder="$t('farm.land.placeholder.longitude')" type="number" />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item :label="$t('farm.land.form.detailAddress')" prop="detailAddress">
              <el-input v-model="form.detailAddress" :placeholder="$t('farm.land.placeholder.detailAddress')" type="textarea" :rows="2" />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item :label="$t('farm.land.form.remark')" prop="remark">
              <el-input v-model="form.remark" :placeholder="$t('farm.land.placeholder.remark')" type="textarea" :rows="2" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </ResponsiveDialog>

    <!-- 详情对话框 -->
    <ResponsiveDialog
      v-model="detailDialogVisible"
      :title="$t('farm.land.detail')"
      width="600px"
      :show-footer="false"
    >
      <div class="detail-content" v-if="currentItem">
        <div class="detail-item">
          <span class="item-label">{{ $t('farm.land.form.landName') }}:</span>
          <span class="item-value">{{ currentItem.landName }}</span>
        </div>
        <div class="detail-item">
          <span class="item-label">{{ $t('farm.land.form.ownerType') }}:</span>
          <span class="item-value">{{ ownerTypes[currentItem.ownerType] || currentItem.ownerType }}</span>
        </div>
        <div class="detail-item">
          <span class="item-label">{{ $t('farm.land.form.adCode') }}:</span>
          <span class="item-value">{{ currentItem.adCode }}</span>
        </div>
        <div class="detail-item">
          <span class="item-label">{{ $t('farm.land.form.detailAddress') }}:</span>
          <span class="item-value">{{ currentItem.detailAddress }}</span>
        </div>
        <div class="detail-item">
          <span class="item-label">{{ $t('farm.land.form.areaSize') }}:</span>
          <span class="item-value">{{ currentItem.areaSize }} {{ $t('farm.land.form.areaSizeUnit') }}</span>
        </div>
        <div class="detail-item">
          <span class="item-label">{{ $t('farm.land.form.landType') }}:</span>
          <span class="item-value">{{ landTypes[currentItem.landType] || currentItem.landType }}</span>
        </div>
        <div class="detail-item">
          <span class="item-label">{{ $t('farm.land.form.currentStatus') }}:</span>
          <span class="item-value">{{ statusOptions[currentItem.currentStatus] || currentItem.currentStatus }}</span>
        </div>
        <div class="detail-item" v-if="currentItem.latitude">
          <span class="item-label">{{ $t('farm.land.form.latitude') }}:</span>
          <span class="item-value">{{ currentItem.latitude }}</span>
        </div>
        <div class="detail-item" v-if="currentItem.longitude">
          <span class="item-label">{{ $t('farm.land.form.longitude') }}:</span>
          <span class="item-value">{{ currentItem.longitude }}</span>
        </div>
        <div class="detail-item" v-if="currentItem.remark">
          <span class="item-label">{{ $t('farm.land.form.remark') }}:</span>
          <span class="item-value">{{ currentItem.remark }}</span>
        </div>
        <div class="detail-item">
          <span class="item-label">{{ $t('farm.land.form.createTime') }}:</span>
          <span class="item-value">{{ formatDate(currentItem.createTime) }}</span>
        </div>
      </div>
    </ResponsiveDialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getLandList, addLand, updateLand, deleteLand } from '@/api/farm'
import { useUserStore } from '@/store'
import ResponsiveDialog from '@/components/ResponsiveDialog.vue'

const { t } = useI18n()
const userStore = useUserStore()

// 数据
const loading = ref(false)
const tableData = ref([])
const searchKeyword = ref('')
const dialogVisible = ref(false)
const detailDialogVisible = ref(false)
const isEdit = ref(false)
const currentItem = ref(null)
const submitLoading = ref(false)

// 分页数据
const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0
})

// 表单引用
const formRef = ref(null)

// 表单数据
const form = reactive({
  landId: null,
  landName: '',
  ownerType: '',
  adCode: '',
  detailAddress: '',
  areaSize: null,
  landType: '',
  currentStatus: '',
  latitude: null,
  longitude: null,
  remark: ''
})

// 选项
const ownerTypes = computed(() => ({
  collective: t('farm.land.ownerTypes.collective'),
  contract: t('farm.land.ownerTypes.contract'),
  lease: t('farm.land.ownerTypes.lease'),
  other: t('farm.land.ownerTypes.other'),
}))

const landTypes = computed(() => ({
  paddyField: t('farm.land.landTypes.paddyField'),
  dryField: t('farm.land.landTypes.dryField'),
  orchard: t('farm.land.landTypes.orchard'),
  vegetableField: t('farm.land.landTypes.vegetableField'),
  other: t('farm.land.landTypes.other'),
}))

const statusOptions = computed(() => ({
  cultivating: t('farm.land.statusOptions.cultivating'),
  idle: t('farm.land.statusOptions.idle'),
  fallow: t('farm.land.statusOptions.fallow'),
  other: t('farm.land.statusOptions.other'),
}))

// 表单验证规则
const rules = computed(() => ({
  landName: [
    { required: true, message: t('farm.land.rules.landNameRequired'), trigger: 'blur' }
  ],
  ownerType: [
    { required: true, message: t('farm.land.rules.ownerTypeRequired'), trigger: 'change' }
  ],
  adCode: [
    { required: true, message: t('farm.land.rules.adCodeRequired'), trigger: 'blur' }
  ],
  detailAddress: [
    { required: true, message: t('farm.land.rules.detailAddressRequired'), trigger: 'blur' }
  ],
  areaSize: [
    { required: true, message: t('farm.land.rules.areaSizeRequired'), trigger: 'blur' },
    { type: 'number', message: t('farm.land.rules.areaSizeFormat'), trigger: 'blur' }
  ],
  landType: [
    { required: true, message: t('farm.land.rules.landTypeRequired'), trigger: 'change' }
  ],
  currentStatus: [
    { required: true, message: t('farm.land.rules.currentStatusRequired'), trigger: 'change' }
  ]
}))

// 格式化日期
const formatDate = (dateStr) => {
  if (!dateStr) return '-'
  const date = new Date(dateStr)
  return date.toLocaleString()
}

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    const userId = userStore.userInfo?.user?.id
    if (!userId) {
      ElMessage.error('User not found')
      return
    }

    const params = {
      farmerUserId: userId,
      page: pagination.page,
      pageSize: pagination.pageSize
    }

    // 如果有搜索关键词，添加到参数中
    if (searchKeyword.value) {
      params.keyword = searchKeyword.value
    }

    const res = await getLandList(params)
    if (res.code === 200) {
      tableData.value = res.data?.list || []
      pagination.total = res.data?.total || 0
      pagination.page = res.data?.page || 1
      pagination.pageSize = res.data?.pageSize || 10
    }
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

// 搜索
const handleSearch = () => {
  pagination.page = 1
  loadData()
}

// 分页变化
const handlePageChange = (page) => {
  pagination.page = page
  loadData()
}

const handleSizeChange = (size) => {
  pagination.pageSize = size
  pagination.page = 1
  loadData()
}

// 新增
const handleAdd = () => {
  isEdit.value = false
  resetForm()
  dialogVisible.value = true
}

// 编辑
const handleEdit = (row) => {
  isEdit.value = true
  Object.assign(form, row)
  dialogVisible.value = true
}

// 查看详情
const handleView = (row) => {
  currentItem.value = row
  detailDialogVisible.value = true
}

// 删除
const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm(
      t('farm.land.deleteConfirm'),
      t('common.tips'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning',
      }
    )

    try {
      const res = await deleteLand(row.landId)
      if (res.code === 200) {
        ElMessage.success(t('farm.land.deleteSuccess'))
        loadData()
      }
    } catch (error) {
      console.error(error)
    }
  } catch {
    // 用户取消
  }
}

// 提交表单
const handleSubmit = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    submitLoading.value = true

    try {
      const userId = userStore.userInfo?.user?.id || userStore.userInfo?.userId
      const data = {
        ...form,
        farmerUserId: String(userId),
        createBy: String(userId)
      }

      let res
      if (isEdit.value) {
        res = await updateLand(data)
      } else {
        res = await addLand(data)
      }

      if (res.code === 200) {
        ElMessage.success(
          isEdit.value ? t('farm.land.editSuccess') : t('farm.land.addSuccess')
        )
        dialogVisible.value = false
        loadData()
      }
    } catch (error) {
      console.error(error)
    } finally {
      submitLoading.value = false
    }
  } catch (error) {
    console.log('Validation failed', error)
  }
}

// 重置表单
const resetForm = () => {
  form.landId = null
  form.landName = ''
  form.ownerType = ''
  form.adCode = ''
  form.detailAddress = ''
  form.areaSize = null
  form.landType = ''
  form.currentStatus = ''
  form.latitude = null
  form.longitude = null
  form.remark = ''
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.page-container {
  min-height: calc(100vh - 200px);
  background: linear-gradient(to bottom, #f8fafb 0%, #ffffff 100%);
}

.page-wrapper {
  margin: 0 auto;
}

/* Page Header */
.page-header {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 40px;
  padding: 32px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.06);
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.05) 0%, rgba(254, 221, 0, 0.03) 100%);
}

.header-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(0, 154, 68, 0.25);
  flex-shrink: 0;
}

.header-icon i {
  font-size: 40px;
  color: white;
}

.page-title {
  font-size: 32px;
  font-weight: 800;
  color: #009A44;
  margin: 0 0 8px 0;
}

.page-subtitle {
  font-size: 15px;
  color: #909399;
  margin: 0;
}

/* Content */
.content-wrapper {
  padding-bottom: 40px;
}

.info-card {
  background: white;
  border-radius: 16px;
  border: 2px solid rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

.card-header {
  padding: 20px 24px;
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.05) 0%, rgba(254, 221, 0, 0.03) 100%);
  border-bottom: 2px solid rgba(0, 154, 68, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 700;
  color: #009A44;
}

.card-title i {
  font-size: 22px;
}

.add-btn {
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  border: none;
}

.card-body {
  padding: 24px;
}

/* 搜索栏 */
.search-bar {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

.search-bar .el-input {
  flex: 1;
  max-width: 400px;
}

/* Table */
.table-wrapper :deep(.el-table) {
  border-radius: 8px;
}

.table-wrapper :deep(.el-table__header th) {
  background-color: rgba(0, 154, 68, 0.05);
  color: #009A44;
  font-weight: 600;
}

.mobile-only {
  display: none;
}

/* 移动端卡片列表 */
.card-list {
  flex-direction: column;
  gap: 16px;
}

.list-card {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 16px;
  background: white;
  transition: all 0.3s;
}

.list-card:hover {
  box-shadow: 0 4px 12px rgba(0, 154, 68, 0.1);
  border-color: rgba(0, 154, 68, 0.3);
}

.card-info {
  margin-bottom: 12px;
}

.info-row {
  display: flex;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.info-row:last-child {
  border-bottom: none;
}

.info-row .label {
  font-weight: 600;
  color: #606266;
  min-width: 80px;
  font-size: 14px;
}

.info-row .value {
  flex: 1;
  color: #303133;
  font-size: 14px;
}

.card-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.card-actions .el-button {
  flex: 1;
  min-width: 80px;
}

/* 详情内容 */
.detail-content {
  padding: 8px 0;
}

.detail-item {
  display: flex;
  padding: 12px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.detail-item:last-child {
  border-bottom: none;
}

.item-label {
  font-weight: 600;
  color: #606266;
  min-width: 140px;
}

.item-value {
  flex: 1;
  color: #303133;
}

/* 分页 */
.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.pagination-wrapper :deep(.el-pagination) {
  gap: 8px;
}

.pagination-wrapper :deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
  background-color: #009A44;
}

.pagination-wrapper :deep(.el-pagination.is-background .el-pager li:not(.is-disabled):hover) {
  color: #009A44;
}

/* 响应式设计 */
@media screen and (max-width: 768px) {
  .page-header {
    padding: 24px 20px;
    gap: 16px;
  }

  .header-icon {
    width: 64px;
    height: 64px;
  }

  .header-icon i {
    font-size: 32px;
  }

  .page-title {
    font-size: 24px;
  }

  .card-header {
    padding: 16px 20px;
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }

  .add-btn {
    width: 100%;
  }

  .card-body {
    padding: 16px;
  }

  .search-bar {
    flex-direction: column;
  }

  .search-bar .el-input {
    max-width: none;
  }

  .pc-only {
    display: none !important;
  }

  .mobile-only {
    display: flex !important;
  }

  .detail-item {
    flex-direction: column;
    gap: 4px;
  }

  .item-label {
    min-width: auto;
  }
}
</style>
