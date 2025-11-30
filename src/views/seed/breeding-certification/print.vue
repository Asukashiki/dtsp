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
          <h1 class="page-title">{{ $t('seed.breedingCertification.certificateLabel') }}</h1>
        </div>
        <div class="header-right">
          <el-button type="primary" @click="handlePrint">
            <i class="ri-printer-line"></i>
            {{ $t('seed.breedingCertification.print') }}
          </el-button>
        </div>
      </div>
    </div>

    <!-- 打印内容区域 -->
    <div v-loading="loading" class="print-wrapper" id="printArea">
      <template v-if="certData">
        <!-- 认证标签 -->
        <div class="certificate-label">
          <div class="cert-header">
            <div class="cert-logo">
              <i class="ri-seedling-line"></i>
            </div>
            <h2 class="cert-title">Official Seed Certification Label</h2>
            <p class="cert-subtitle">Breeding Seed Certificate</p>
          </div>

          <div class="cert-body">
            <!-- Basic Information -->
            <div class="cert-section">
              <div class="cert-row">
                <span class="cert-label">Certification ID:</span>
                <span class="cert-value cert-number">{{ certData.authId }}</span>
              </div>
              <div class="cert-row">
                <span class="cert-label">Approval Number:</span>
                <span class="cert-value">{{ certData.supervision?.approvalNumber }}</span>
              </div>
            </div>

            <!-- Variety Information -->
            <div class="cert-section">
              <div class="section-title">Variety Information</div>
              <div class="cert-row">
                <span class="cert-label">Variety Name:</span>
                <span class="cert-value">{{ certData.varietyName }}</span>
              </div>
              <div class="cert-row">
                <span class="cert-label">Variety Code:</span>
                <span class="cert-value">{{ certData.varietyInfo?.varietyCode }}</span>
              </div>
              <div class="cert-row">
                <span class="cert-label">Crop Type:</span>
                <span class="cert-value">{{ $t(`seed.breedingCertification.cropTypes.${certData.cropType}`) }}</span>
              </div>
            </div>

            <!-- Quality Traits -->
            <div class="cert-section">
              <div class="section-title">Quality Traits</div>
              <div class="cert-row">
                <span class="cert-label">Yield Potential:</span>
                <span class="cert-value">
                  {{ certData.technicalTrait?.minYieldPotential }} - {{ certData.technicalTrait?.maxYieldPotential }}
                </span>
              </div>
              <div class="cert-row">
                <span class="cert-label">Maturity Period:</span>
                <span class="cert-value">{{ certData.technicalTrait?.maturityPeriod }} days</span>
              </div>
              <div class="cert-row">
                <span class="cert-label">Disease Resistance:</span>
                <span class="cert-value">{{ certData.technicalTrait?.diseaseResistance }}</span>
              </div>
            </div>

            <!-- Regulatory Information -->
            <div class="cert-section">
              <div class="section-title">Regulatory Information</div>
              <div class="cert-row">
                <span class="cert-label">Approval Organization:</span>
                <span class="cert-value">{{ certData.supervision?.approvalOrganization }}</span>
              </div>
              <div class="cert-row">
                <span class="cert-label">Approval Date:</span>
                <span class="cert-value">{{ certData.supervision?.approvalDate }}</span>
              </div>
              <div class="cert-row">
                <span class="cert-label">Applicant Organization:</span>
                <span class="cert-value">{{ certData.applyOrgName }}</span>
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
                <p>Print Count: {{ certData.printCount || 0 }}</p>
                <p v-if="certData.lastPrintTime">Last Print: {{ certData.lastPrintTime }}</p>
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
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getCertificateLabel, recordPrintLog } from '@/api/seed'
import VueQr from 'vue-qr/src/packages/vue-qr.vue'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const loading = ref(false)
const certData = ref(null)
const qrContent = ref('')

// 加载认证标签数据
const loadCertData = async () => {
  loading.value = true
  try {
    const res = await getCertificateLabel(route.params.id)
    if (res.code === 200) {
      certData.value = res.data
      // 生成二维码内容
      qrContent.value = `${window.location.origin}/research/seed/breeding-certification/detail/${res.data.dataId}`
    }
  } catch (error) {
    console.error('Failed to load certificate data:', error)
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
    await recordPrintLog(route.params.id)

    // 执行打印
    window.print()

    // 重新加载数据以更新打印次数
    loadCertData()
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
  loadCertData()
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
  min-width: 120px;
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
