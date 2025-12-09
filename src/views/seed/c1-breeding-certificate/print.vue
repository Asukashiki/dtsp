<template>
  <div class="certificate-print-container">
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
          <h1 class="page-title">{{ $t('seed.c1Certificate.title') }}</h1>
        </div>
        <div class="header-right">
          <el-button type="primary" @click="handlePrint">
            <i class="ri-printer-line"></i>
            {{ $t('seed.c1Certificate.print') }}
          </el-button>
        </div>
      </div>
    </div>

    <!-- 打印内容区域 -->
    <div v-loading="loading" class="print-wrapper" id="printArea">
      <template v-if="batchData">
        <!-- 认证标签 -->
        <div class="certificate-label">
          <div class="cert-header">
            <div class="cert-logo">
              <i class="ri-plant-line"></i>
            </div>
            <h2 class="cert-title">C1 Seed Propagation Certificate</h2>
            <p class="cert-subtitle">Official Certification Label</p>
          </div>

          <div class="cert-body">
            <!-- Basic Information -->
            <div class="cert-section">
              <div class="section-title">Batch Information</div>
              <div class="cert-row">
                <span class="cert-label">Batch ID:</span>
                <span class="cert-value cert-number">{{ batchData.batchId }}</span>
              </div>
              <div class="cert-row">
                <span class="cert-label">Batch Status:</span>
                <span class="cert-value">{{ getStatusName(batchData.batchStatus) }}</span>
              </div>
            </div>

            <!-- Variety Information -->
            <div class="cert-section">
              <div class="section-title">Variety Information</div>
              <div class="cert-row">
                <span class="cert-label">Variety Name:</span>
                <span class="cert-value">{{ batchData.varietyName }}</span>
              </div>
              <div class="cert-row">
                <span class="cert-label">Crop Type:</span>
                <span class="cert-value">{{ batchData.cropType }}</span>
              </div>
            </div>

            <!-- Propagation Details -->
            <div class="cert-section">
              <div class="section-title">Propagation Details</div>
              <div class="cert-row">
                <span class="cert-label">Location:</span>
                <span class="cert-value">{{ batchData.location || '-' }}</span>
              </div>
              <div class="cert-row">
                <span class="cert-label">Planting Area:</span>
                <span class="cert-value">{{ batchData.plantingArea || '-' }} ha</span>
              </div>
              <div class="cert-row">
                <span class="cert-label">Expected Yield:</span>
                <span class="cert-value">{{ batchData.expectedYield || '-' }} kg</span>
              </div>
              <div class="cert-row">
                <span class="cert-label">Actual Yield:</span>
                <span class="cert-value">{{ batchData.actualYield || '-' }} kg</span>
              </div>
              <div class="cert-row">
                <span class="cert-label">Start Date:</span>
                <span class="cert-value">{{ batchData.startDate || '-' }}</span>
              </div>
              <div class="cert-row">
                <span class="cert-label">End Date:</span>
                <span class="cert-value">{{ batchData.endDate || '-' }}</span>
              </div>
            </div>

            <!-- Organization Information -->
            <div class="cert-section">
              <div class="section-title">Organization Information</div>
              <div class="cert-row">
                <span class="cert-label">Organization:</span>
                <span class="cert-value">{{ batchData.orgName || '-' }}</span>
              </div>
              <div class="cert-row">
                <span class="cert-label">Organization Type:</span>
                <span class="cert-value">{{ batchData.orgType || '-' }}</span>
              </div>
            </div>

            <!-- Audit Information -->
            <div class="cert-section">
              <div class="section-title">Audit Information</div>
              <div class="cert-row">
                <span class="cert-label">Audit Status:</span>
                <span class="cert-value audit-approved">Approved</span>
              </div>
              <div class="cert-row">
                <span class="cert-label">Auditor:</span>
                <span class="cert-value">{{ batchData.auditor || '-' }}</span>
              </div>
              <div class="cert-row">
                <span class="cert-label">Audit Time:</span>
                <span class="cert-value">{{ batchData.auditTime || '-' }}</span>
              </div>
              <div class="cert-row" v-if="batchData.auditComment">
                <span class="cert-label">Comment:</span>
                <span class="cert-value">{{ batchData.auditComment }}</span>
              </div>
            </div>

            <!-- QR Code and Print Information -->
            <div class="cert-footer">
              <div class="qr-code">
                <vue-qr
                  v-if="qrContent"
                  :text="qrContent"
                  :size="120"
                  :margin="0"
                  colorDark="#000000"
                  colorLight="#ffffff"
                />
                <p class="qr-tip">Scan for details</p>
              </div>
              <div class="print-info">
                <p>Print Count: {{ batchData.printCount || 0 }}</p>
                <p v-if="batchData.lastPrintTime">Last Print: {{ batchData.lastPrintTime }}</p>
              </div>
            </div>
          </div>

          <div class="cert-stamp">
            <div class="stamp-inner">
              <div class="stamp-text">CERTIFIED</div>
              <div class="stamp-text-en">OFFICIAL</div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getC1BreedingBatchById, recordC1BatchPrint } from '@/api/c1BreedingBatch'
import VueQr from 'vue-qr/src/packages/vue-qr.vue'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const loading = ref(false)
const batchData = ref(null)
const qrContent = ref('')

// 状态映射
const statusMap = computed(() => ({
  '01': 'Ongoing',
  '02': 'Completed',
  '03': 'Terminated'
}))

const getStatusName = (status) => statusMap.value[status] || status

// 加载批次数据
const loadBatchData = async () => {
  loading.value = true
  try {
    const res = await getC1BreedingBatchById(route.params.id)
    if (res.code === 200) {
      batchData.value = res.data
      // 生成二维码内容
      qrContent.value = `${window.location.origin}/research/c1-breeding-batch/detail/${res.data.id}`
    }
  } catch (error) {
    console.error('Failed to load batch data:', error)
    ElMessage.error(t('common.failed'))
    goBack()
  } finally {
    loading.value = false
  }
}

// 打印
const handlePrint = async () => {
  try {
    // 记录打印日志
    await recordC1BatchPrint(route.params.id)

    // 执行打印
    window.print()

    // 重新加载数据以更新打印次数
    loadBatchData()
  } catch (error) {
    console.error('Print failed:', error)
    ElMessage.error(t('common.failed'))
  }
}

// 返回
const goBack = () => {
  router.back()
}

// 初始化
onMounted(() => {
  loadBatchData()
})
</script>

<style scoped>
.certificate-print-container {
  min-height: calc(100vh - 120px);
  background: #f5f5f5;
}

/* 页面头部 */
.page-header {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  margin: -24px -24px 24px -24px;
}

.header-content {
  max-width: 900px;
  margin: 0 auto;
  padding: 46px 24px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left,
.header-right {
  flex: 1;
}

.header-right {
  display: flex;
  justify-content: flex-end;
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

/* 打印区域 */
.print-wrapper {
  max-width: 900px;
  margin: 0 auto;
  padding: 24px;
}

/* 认证标签 */
.certificate-label {
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  border: 3px solid #009A44;
  position: relative;
  min-height: 800px;
}

.cert-header {
  text-align: center;
  padding-bottom: 30px;
  border-bottom: 2px solid #009A44;
  margin-bottom: 30px;
}

.cert-logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  border-radius: 50%;
  margin-bottom: 20px;
}

.cert-logo i {
  font-size: 48px;
  color: white;
}

.cert-title {
  font-size: 32px;
  font-weight: 700;
  color: #009A44;
  margin: 0 0 8px 0;
}

.cert-subtitle {
  font-size: 16px;
  color: #6b7280;
  margin: 0;
  font-style: italic;
}

/* 证书主体 */
.cert-body {
  padding: 0;
}

.cert-section {
  margin-bottom: 24px;
  padding: 20px;
  background: rgba(0, 154, 68, 0.02);
  border-radius: 8px;
  border-left: 4px solid #009A44;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #009A44;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(0, 154, 68, 0.2);
}

.cert-row {
  display: flex;
  margin-bottom: 12px;
  line-height: 1.6;
}

.cert-row:last-child {
  margin-bottom: 0;
}

.cert-label {
  min-width: 140px;
  font-weight: 500;
  color: #374151;
  flex-shrink: 0;
}

.cert-value {
  color: #1f2937;
  flex: 1;
}

.cert-number {
  font-size: 18px;
  font-weight: 600;
  color: #009A44;
  letter-spacing: 1px;
}

.audit-approved {
  color: #10b981;
  font-weight: 600;
}

/* 证书底部 */
.cert-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 30px;
  margin-top: 30px;
  border-top: 2px solid #e5e7eb;
}

.qr-code {
  text-align: center;
}

.qr-code :deep(canvas),
.qr-code :deep(img) {
  padding: 8px;
  background: white;
  border: 2px solid #009A44;
  border-radius: 8px;
  display: inline-block;
}

.qr-tip {
  margin-top: 8px;
  font-size: 12px;
  color: #6b7280;
}

.print-info {
  text-align: right;
  font-size: 12px;
  color: #6b7280;
}

.print-info p {
  margin: 4px 0;
}

/* 认证印章 */
.cert-stamp {
  position: absolute;
  top: 80px;
  right: 60px;
  width: 100px;
  height: 100px;
  border: 3px solid #dc2626;
  border-radius: 50%;
  transform: rotate(-15deg);
  opacity: 0.8;
}

.stamp-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: #dc2626;
}

.stamp-text {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 2px;
}

.stamp-text-en {
  font-size: 10px;
  font-weight: 600;
  margin-top: 4px;
}

/* 打印样式 */
@media print {
  .page-header {
    display: none;
  }

  .certificate-print-container {
    background: white;
  }

  .print-wrapper {
    max-width: 100%;
    padding: 0;
  }

  .certificate-label {
    box-shadow: none;
    page-break-after: always;
  }
}

/* 响应式设计 */
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
  }

  .header-right .el-button {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    padding: 0;
    background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
    border: none;
    box-shadow: 0 4px 16px rgba(0, 154, 68, 0.3);
  }

  .header-right .el-button i {
    font-size: 24px;
    margin-right: 0;
  }

  .header-right .el-button span {
    display: none;
  }

  .print-wrapper {
    padding: 12px;
  }

  .certificate-label {
    padding: 24px 16px;
  }

  .cert-title {
    font-size: 24px;
  }

  .cert-subtitle {
    font-size: 14px;
  }

  .cert-stamp {
    top: 60px;
    right: 20px;
    width: 80px;
    height: 80px;
  }

  .stamp-text {
    font-size: 16px;
  }

  .cert-footer {
    flex-direction: column;
    gap: 20px;
  }

  .print-info {
    text-align: center;
  }
}
</style>
