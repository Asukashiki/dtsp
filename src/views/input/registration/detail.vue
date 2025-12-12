<template>
  <div class="input-detail-container">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-left">
          <el-button link @click="goBack">
            <i class="ri-arrow-left-line"></i>
            {{ $t('common.back') }}
          </el-button>
        </div>
        <div class="header-center">
          <h1 class="page-title">{{ $t('registration.application.detail') }}</h1>
        </div>
        <div class="header-right">
          <el-button v-if="detailData.applicationStatus === 'draft' || detailData.applicationStatus === 'rejected'" type="primary" @click="handleEdit">
            <i class="ri-edit-line"></i>
            {{ $t('common.edit') }}
          </el-button>
        </div>
      </div>
    </div>

    <!-- 详情区域 -->
    <div v-loading="loading" class="detail-wrapper">
      <template v-if="detailData.id">
        <!-- 基础信息 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-information-line"></i>
            {{ $t('registration.application.form.basicInfo') }}
            <el-tag :type="getStatusType(detailData.applicationStatus)" style="margin-left: auto;">
              {{ $t(`registration.application.status.${detailData.applicationStatus}`) }}
            </el-tag>
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('registration.application.form.enterpriseName') }}:</span>
              <span class="value">{{ detailData.enterpriseName || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('registration.application.form.orgType') }}:</span>
              <el-tag :type="detailData.orgType === 'union' ? 'success' : 'info'">
                {{ detailData.orgType ? $t(`registration.application.orgType.${detailData.orgType}`) : '-' }}
              </el-tag>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('registration.application.form.enterpriseType') }}:</span>
              <span class="value">{{ detailData.enterpriseType || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('registration.application.form.enterpriseRegistrationId') }}:</span>
              <span class="value">{{ detailData.enterpriseRegistrationId || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('registration.application.form.unifiedSocialCreditCode') }}:</span>
              <span class="value">{{ detailData.unifiedSocialCreditCode || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('registration.application.form.seedEnterpriseLicenseNumber') }}:</span>
              <span class="value">{{ detailData.seedEnterpriseLicenseNumber || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('registration.application.form.licenseValidityStart') }}:</span>
              <span class="value">{{ detailData.licenseValidityStart || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('registration.application.form.licenseValidityEnd') }}:</span>
              <span class="value">{{ detailData.licenseValidityEnd || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('registration.application.form.inputTypes') }}:</span>
              <span class="value">{{ formatInputTypes(detailData.inputTypes) }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('registration.application.form.salesRegions') }}:</span>
              <span class="value">{{ formatSalesRegions(detailData.salesRegions) }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('registration.application.form.createdTime') }}:</span>
              <span class="value">{{ detailData.createdTime || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('registration.application.form.updatedTime') }}:</span>
              <span class="value">{{ detailData.updatedTime || '-' }}</span>
            </div>
            <div v-if="detailData.remark" class="detail-item full-width">
              <span class="label">{{ $t('registration.application.form.remark') }}:</span>
              <span class="value text-block">{{ detailData.remark }}</span>
            </div>
          </div>
        </div>

        <!-- 位置运营信息 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-map-pin-line"></i>
            {{ $t('registration.application.form.locationInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('registration.application.form.region') }}:</span>
              <span class="value">{{ detailData.location?.region || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('registration.application.form.zone') }}:</span>
              <span class="value">{{ detailData.location?.zone || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('registration.application.form.woreda') }}:</span>
              <span class="value">{{ detailData.location?.woreda || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('registration.application.form.kebele') }}:</span>
              <span class="value">{{ detailData.location?.kebele || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('registration.application.form.gpsLatitude') }}:</span>
              <span class="value">{{ detailData.location?.gpsLatitude || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('registration.application.form.gpsLongitude') }}:</span>
              <span class="value">{{ detailData.location?.gpsLongitude || '-' }}</span>
            </div>
            <div class="detail-item full-width">
              <span class="label">{{ $t('registration.application.form.fullAddress') }}:</span>
              <span class="value">{{ detailData.location?.fullAddress || '-' }}</span>
            </div>
            <div class="detail-item full-width">
              <span class="label">{{ $t('registration.application.form.businessScope') }}:</span>
              <span class="value">{{ detailData.location?.businessScope || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('registration.application.form.annualProductionCapacity') }}:</span>
              <span class="value">{{ detailData.location?.annualProductionCapacity || '-' }}</span>
            </div>
          </div>
        </div>

        <!-- 许可证件信息 -->
        <div v-if="detailData.licenses && detailData.licenses.length > 0" class="detail-section">
          <div class="section-title">
            <i class="ri-file-list-2-line"></i>
            {{ $t('registration.application.form.licenseInfo') }}
          </div>
          <div class="license-list">
            <div v-for="(license, index) in detailData.licenses" :key="index" class="license-card">
              <div class="license-header">
                <span class="license-number">{{ $t('registration.application.form.licenses') }} {{ index + 1 }}</span>
                <el-tag>{{ $t(`registration.application.licenseType.${license.licenseType}`) }}</el-tag>
              </div>
              <div class="detail-grid">
                <div class="detail-item">
                  <span class="label">{{ $t('registration.application.form.licenseNumber') }}:</span>
                  <span class="value">{{ license.licenseNumber || '-' }}</span>
                </div>
                <div class="detail-item">
                  <span class="label">{{ $t('registration.application.form.issueDate') }}:</span>
                  <span class="value">{{ license.issueDate || '-' }}</span>
                </div>
                <div class="detail-item">
                  <span class="label">{{ $t('registration.application.form.expiryDate') }}:</span>
                  <span class="value">{{ license.expiryDate || '-' }}</span>
                </div>
                <div v-if="license.licenseFileUrl" class="detail-item full-width">
                  <span class="label">{{ $t('registration.application.form.licenseFile') }}:</span>
                  <el-image
                    :src="license.licenseFileUrl"
                    :preview-src-list="[license.licenseFileUrl]"
                    fit="cover"
                    class="license-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 审核记录 -->
        <div v-if="auditRecords.length > 0" class="detail-section">
          <div class="section-title">
            <i class="ri-history-line"></i>
            {{ $t('registration.application.auditRecords') }}
          </div>
          <div class="audit-timeline">
            <el-timeline>
              <el-timeline-item
                v-for="(record, index) in auditRecords"
                :key="index"
                :timestamp="record.auditTime"
                placement="top"
                :type="record.auditResult === 'approved' ? 'success' : 'danger'"
              >
                <div class="audit-card">
                  <div class="audit-header">
                    <div class="audit-user">
                      <i class="ri-user-line"></i>
                      {{ record.auditUserName }}
                    </div>
                    <el-tag :type="record.auditResult === 'approved' ? 'success' : 'danger'">
                      {{ record.auditResultName || $t(`registration.application.status.${record.auditResult}`) }}
                    </el-tag>
                  </div>
                  <div v-if="record.auditOpinion" class="audit-item">
                    <span class="label">{{ $t('registration.application.auditRecord.auditOpinion') }}:</span>
                    <span class="value">{{ record.auditOpinion }}</span>
                  </div>
                  <div v-if="record.remark" class="audit-item">
                    <span class="label">{{ $t('registration.application.form.remark') }}:</span>
                    <span class="value">{{ record.remark }}</span>
                  </div>
                </div>
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getRegistrationDetail, getAuditRecordList } from '@/api/input-registration'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const loading = ref(false)
const detailData = reactive({
  id: null,
  enterpriseName: '',
  orgType: '',
  enterpriseType: '',
  enterpriseRegistrationId: '',
  unifiedSocialCreditCode: '',
  seedEnterpriseLicenseNumber: '',
  licenseValidityStart: '',
  licenseValidityEnd: '',
  inputTypes: '',
  salesRegions: '',
  applicationStatus: '',
  remark: '',
  createdTime: '',
  updatedTime: '',
  location: null,
  licenses: []
})

const auditRecords = ref([])

// 加载详情
const loadDetail = async () => {
  loading.value = true
  try {
    const res = await getRegistrationDetail(route.params.id)
    if (res.code === 200 && res.data) {
      const data = res.data

      // 处理许可证件图片URL
      if (data.licenses && data.licenses.length > 0) {
        const { downloadFile } = await import('@/api/file')

        const licensePromises = data.licenses.map(async (license) => {
          if (!license.licenseFileUrl) {
            return license
          }

          try {
            // 通过下载接口获取文件数据
            console.log('正在加载许可证文件:', license.licenseFileUrl)
            const response = await downloadFile(license.licenseFileUrl)
            console.log('文件下载响应:', response)

            // 判断文件类型，创建对应的blob
            const contentType = response.headers?.['content-type'] || 'image/jpeg'
            const blob = new Blob([response.data], { type: contentType })
            const blobUrl = URL.createObjectURL(blob)

            console.log('创建的 Blob URL:', blobUrl, 'Content-Type:', contentType)

            return {
              ...license,
              licenseFileUrl: blobUrl,
              originalFileId: license.licenseFileUrl  // 保存原始ID供下载使用
            }
          } catch (error) {
            console.error('加载许可证文件失败:', license.licenseFileUrl, error)
            ElMessage.warning(`文件 ${license.licenseFileName || license.licenseFileUrl} 加载失败`)
            // 如果下载失败，返回原数据（不显示图片）
            return {
              ...license,
              licenseFileUrl: null,  // 设置为null，不显示图片
              originalFileId: license.licenseFileUrl
            }
          }
        })

        data.licenses = await Promise.all(licensePromises)
      }

      Object.assign(detailData, data)
    } else {
      ElMessage.error(res.msg || t('common.loadFailed'))
    }
  } catch (error) {
    console.error('Failed to load detail:', error)
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
}

// 加载审核记录
const loadAuditRecords = async () => {
  try {
    const res = await getAuditRecordList(route.params.id)
    if (res.code === 200 && res.data) {
      auditRecords.value = res.data
    }
  } catch (error) {
    console.error('Failed to load audit records:', error)
  }
}

// 格式化投入品类型
const formatInputTypes = (types) => {
  if (!types) return '-'
  const typeArray = Array.isArray(types) ? types : (typeof types === 'string' ? types.split(',') : [])
  return typeArray.map(type => t(`registration.application.inputType.${type}`)).join(', ')
}

// 格式化销售区域
const formatSalesRegions = (regions) => {
  if (!regions) return '-'

  // 处理不同的数据格式
  let regionArray = []

  if (Array.isArray(regions)) {
    regionArray = regions
  } else if (typeof regions === 'string') {
    // 按逗号分隔并过滤空值
    regionArray = regions.split(',').map(r => r.trim()).filter(r => r)
  }

  // 过滤掉无效值并返回
  return regionArray.filter(r => r).join(', ') || '-'
}

// 获取状态标签类型
const getStatusType = (status) => {
  const typeMap = {
    draft: '',
    pending: 'warning',
    approved: 'success',
    rejected: 'danger'
  }
  return typeMap[status] || ''
}

// 返回
const goBack = () => {
  router.back()
}

// 编辑
const handleEdit = () => {
  router.push({ name: 'RegistrationEdit', params: { id: route.params.id } })
}

// 初始化
onMounted(() => {
  loadDetail()
  loadAuditRecords()
})
</script>

<style scoped>
.input-detail-container {
  min-height: calc(100vh - 120px);
}

/* 页面头部 */
.page-header {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  margin: -24px -24px 24px -24px;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left,
.header-right {
  flex: 1;
}

.header-right {
  text-align: right;
}

.header-center {
  flex: 2;
  text-align: center;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: #1f2937;
}

/* 详情区域 */
.detail-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

/* 详情分节 */
.detail-section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #009A44;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #009A44;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-title i {
  font-size: 20px;
}

/* 详情网格 */
.detail-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.detail-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.detail-item.full-width {
  grid-column: 1 / -1;
}

.detail-item .label {
  font-weight: 500;
  color: #6b7280;
  min-width: 140px;
  flex-shrink: 0;
}

.detail-item .value {
  color: #1f2937;
  flex: 1;
}

.detail-item .value.text-block {
  white-space: pre-wrap;
  line-height: 1.6;
}

/* 许可证件列表 */
.license-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.license-card {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 20px;
}

.license-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e5e7eb;
}

.license-number {
  font-size: 15px;
  font-weight: 600;
  color: #009A44;
}

.license-image {
  width: 240px;
  height: 180px;
  border-radius: 8px;
  cursor: pointer;
  border: 1px solid #e5e7eb;
}

/* 审核记录 */
.audit-timeline {
  margin-top: 8px;
}

.audit-card {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
}

.audit-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e5e7eb;
}

.audit-user {
  font-weight: 600;
  color: #009A44;
  display: flex;
  align-items: center;
  gap: 6px;
}

.audit-user i {
  font-size: 16px;
}

.audit-item {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}

.audit-item .label {
  font-weight: 500;
  color: #6b7280;
  flex-shrink: 0;
}

.audit-item .value {
  color: #1f2937;
  flex: 1;
  line-height: 1.6;
}

/* ==================== 响应式设计 ==================== */
@media screen and (max-width: 1024px) {
  .page-header {
    margin: -16px -16px 16px -16px;
  }

  .header-content {
    padding: 16px;
  }

  .detail-section {
    padding: 20px 16px;
  }
}

@media screen and (max-width: 768px) {
  .page-header {
    margin: -12px -12px 12px -12px;
  }

  .header-content {
    padding: 12px;
    flex-wrap: wrap;
  }

  .header-left,
  .header-center,
  .header-right {
    flex: auto;
  }

  .header-left {
    order: 1;
  }

  .header-center {
    order: 2;
    width: 100%;
    margin-top: 8px;
    text-align: left;
  }

  .header-right {
    order: 3;
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 50;
    text-align: center;
  }

  .header-right .el-button {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    padding: 0;
    background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
    border: none;
    box-shadow: 0 4px 16px rgba(0, 154, 68, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .header-right .el-button i {
    font-size: 24px;
    margin-right: 0;
  }

  .header-right .el-button span {
    display: none;
  }

  .header-left .el-button {
    font-size: 14px;
  }

  .page-title {
    font-size: 16px;
  }

  .detail-section {
    padding: 16px 12px;
    margin-bottom: 12px;
    border-radius: 8px;
  }

  .section-title {
    font-size: 15px;
    margin-bottom: 16px;
    padding-bottom: 10px;
  }

  .section-title i {
    font-size: 18px;
  }

  /* 单列布局 */
  .detail-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .detail-item.full-width {
    grid-column: 1;
  }

  .detail-item {
    flex-direction: column;
    gap: 6px;
    padding: 12px;
    background: rgba(0, 154, 68, 0.02);
    border-radius: 8px;
    border-left: 3px solid #009A44;
  }

  .detail-item .label {
    min-width: auto;
    font-size: 13px;
    color: #009A44;
    font-weight: 600;
  }

  .detail-item .value {
    font-size: 14px;
    color: #303133;
  }

  .detail-item .value.text-block {
    font-size: 13px;
    line-height: 1.6;
  }

  .license-card {
    padding: 16px 12px;
  }

  .license-image {
    width: 100%;
    height: auto;
  }

  .audit-card {
    padding: 12px;
  }

  .audit-item {
    flex-direction: column;
    gap: 4px;
  }

  .audit-item .label {
    font-size: 13px;
  }

  .audit-item .value {
    font-size: 13px;
  }
}

@media screen and (max-width: 480px) {
  .page-header {
    margin: -8px -8px 8px -8px;
  }

  .header-content {
    padding: 10px 8px;
  }

  .page-title {
    font-size: 15px;
  }

  .header-right .el-button {
    width: 48px;
    height: 48px;
    bottom: 16px;
    right: 16px;
  }

  .header-right .el-button i {
    font-size: 20px;
  }

  .detail-section {
    padding: 12px 8px;
    margin-bottom: 8px;
  }

  .section-title {
    font-size: 14px;
    margin-bottom: 12px;
    padding-bottom: 8px;
  }

  .detail-grid {
    gap: 12px;
  }

  .detail-item {
    padding: 10px;
  }

  .detail-item .label {
    font-size: 12px;
  }

  .detail-item .value {
    font-size: 13px;
  }

  .detail-item .value.text-block {
    font-size: 12px;
  }
}
</style>
