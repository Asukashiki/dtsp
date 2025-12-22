<template>
  <div class="trial-plan-audit-review-container">
    <div class="page-header">
      <div class="header-content">
        <div class="header-left">
          <el-button link @click="goBack">
            <i class="ri-arrow-left-line"></i>
            {{ $t('common.back') }}
          </el-button>
        </div>
        <div class="header-center">
          <h1 class="page-title">{{ $t('research.trialPlanAudit.title') }}</h1>
        </div>
        <div class="header-right"></div>
      </div>
    </div>

    <div v-loading="loading" class="detail-wrapper">
      <template v-if="detailData">
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-information-line"></i>
            {{ $t('research.trialPlanAudit.form.basicInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('research.trialPlanAudit.form.planCode') }}:</span>
              <span class="value highlight">{{ detailData.planCode || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.trialPlanAudit.form.planStatus') }}:</span>
              <el-tag :type="getTrialPlanStatusType(detailData.planStatus)">
                {{ $t(`research.trialPlan.status.${detailData.planStatus}`) }}
              </el-tag>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.trialPlanAudit.form.trialName') }}:</span>
              <span class="value">{{ detailData.trialName || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.trialPlanAudit.form.cropType') }}:</span>
              <span class="value">{{ detailData.cropType || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.trialPlanAudit.form.planCycle') }}:</span>
              <span class="value">{{ detailData.planCycle || '1个生长周期' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.trialPlanAudit.form.testType') }}:</span>
              <span class="value">{{ detailData.testType || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.trialPlanAudit.form.province') }}:</span>
              <span class="value">{{ detailData.province || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.trialPlanAudit.form.isNational') }}:</span>
              <el-tag :type="detailData.isNational === 1 ? 'success' : 'info'">
                {{ detailData.isNational === 1 ? $t('common.yes') : $t('common.no') }}
              </el-tag>
            </div>
            <div class="detail-item full-width">
              <span class="label">{{ $t('research.trialPlanAudit.form.remark') }}:</span>
              <span class="value">{{ detailData.remark || '-' }}</span>
            </div>
          </div>
        </div>

        <div class="detail-section">
          <div class="section-title">
            <i class="ri-bar-chart-line"></i>
            {{ $t('research.trialPlanAudit.form.dataStatistics') }}
          </div>
          <div class="statistics-grid">
            <div class="stat-card">
              <div class="stat-icon">
                <i class="ri-seedling-line"></i>
              </div>
              <div class="stat-content">
                <div class="stat-label">{{ $t('research.trialPlanAudit.statistics.varietyCount') }}</div>
                <div class="stat-value">{{ varietyList.length }}</div>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">
                <i class="ri-map-pin-line"></i>
              </div>
              <div class="stat-content">
                <div class="stat-label">{{ $t('research.trialPlanAudit.statistics.pointCount') }}</div>
                <div class="stat-value">{{ trialPointList.length }}</div>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">
                <i class="ri-layout-grid-line"></i>
              </div>
              <div class="stat-content">
                <div class="stat-label">{{ $t('research.trialPlanAudit.statistics.plotCount') }}</div>
                <div class="stat-value">{{ detailData.plotCount || 0 }}</div>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">
                <i class="ri-meter-line"></i>
              </div>
              <div class="stat-content">
                <div class="stat-label">{{ $t('research.trialPlanAudit.statistics.indexCount') }}</div>
                <div class="stat-value">{{ observationIndexList.length }}</div>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">
                <i class="ri-calendar-line"></i>
              </div>
              <div class="stat-content">
                <div class="stat-label">{{ $t('research.trialPlanAudit.statistics.phaseCount') }}</div>
                <div class="stat-value">{{ implementPlanList.length }}</div>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">
                <i class="ri-check-double-line"></i>
              </div>
              <div class="stat-content">
                <div class="stat-label">{{ $t('research.trialPlanAudit.statistics.checkCount') }}</div>
                <div class="stat-value">{{ checkItemList.length }}</div>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">
                <i class="ri-user-team-line"></i>
              </div>
              <div class="stat-content">
                <div class="stat-label">{{ $t('research.trialPlanAudit.statistics.responsorCount') }}</div>
                <div class="stat-value">{{ responsorList.length }}</div>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">
                <i class="ri-bar-chart-box-line"></i>
              </div>
              <div class="stat-content">
                <div class="stat-label">{{ $t('research.trialPlanAudit.statistics.totalCount') }}</div>
                <div class="stat-value">
                  {{ varietyList.length + trialPointList.length + observationIndexList.length + implementPlanList.length + checkItemList.length + responsorList.length }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="detail-section">
          <div class="section-title">
            <i class="ri-user-line"></i>
            {{ $t('research.trialPlanAudit.form.compilationInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('research.trialPlanAudit.form.compiledBy') }}:</span>
              <span class="value">{{ detailData.compiledByName || detailData.compiledBy || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.trialPlanAudit.form.compiledAt') }}:</span>
              <span class="value">{{ detailData.compiledAt || '-' }}</span>
            </div>
          </div>
        </div>

        <div class="detail-section">
          <div class="section-title">
            <i class="ri-send-plane-line"></i>
            {{ $t('research.trialPlanAudit.form.submitInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('research.trialPlanAudit.form.submitTime') }}:</span>
              <span class="value">{{ detailData.submitTime || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.trialPlanAudit.form.submitterName') }}:</span>
              <span class="value">{{ detailData.submitterName || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.trialPlanAudit.form.submitOrgName') }}:</span>
              <span class="value">{{ detailData.submitOrgName || '-' }}</span>
            </div>
          </div>
        </div>

        <div class="detail-section">
          <div class="section-title">
            <i class="ri-data-line"></i>
            {{ $t('research.trialPlanAudit.form.dataDetails') }}
          </div>
          <el-tabs v-model="activeTab" type="card" style="margin-top: 12px">
            <el-tab-pane :label="$t('research.trialPlanAudit.tab.variety')" name="variety">
              <el-table
                  :data="varietyList"
                  border
                  stripe
                  size="small"
                  style="width: 100%; margin-top: 12px"
                  :empty-text="$t('common.noData')"
                  @row-click="handleVarietyView"
              >
                <el-table-column prop="varietyCode" :label="$t('research.trialPlanAudit.table.variety.varietyCode')" min-width="120" />
                <el-table-column prop="varietyName" :label="$t('research.trialPlanAudit.table.variety.varietyName')" min-width="150" />
                <el-table-column prop="varietyType" :label="$t('research.trialPlanAudit.table.variety.varietyType')" min-width="120" />
                <el-table-column prop="breederUnit" :label="$t('research.trialPlanAudit.table.variety.breederUnit')" min-width="150" />
                <el-table-column prop="isControl" :label="$t('research.trialPlanAudit.table.variety.isControl')" min-width="100" align="center">
                  <template #default="scope">
                    <el-tag :type="scope.row.isControl === 1 ? 'success' : 'info'">
                      {{ scope.row.isControl === 1 ? $t('common.yes') : $t('common.no') }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="seedingQuantity" :label="$t('research.trialPlanAudit.table.variety.seedingQuantity')" min-width="120" />
                <el-table-column :label="$t('research.trialPlanAudit.table.common.remark')" min-width="180">
                  <template #default="scope">
                    {{ scope.row.remark || '-' }}
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>

            <el-tab-pane :label="$t('research.trialPlanAudit.tab.trialPoint')" name="trialPoint">
              <el-table
                  :data="trialPointList"
                  border
                  stripe
                  size="small"
                  style="width: 100%; margin-top: 12px"
                  :empty-text="$t('common.noData')"
              >
                <el-table-column prop="pointCode" :label="$t('research.trialPlanAudit.table.point.pointCode')" min-width="120" />
                <el-table-column prop="pointName" :label="$t('research.trialPlanAudit.table.point.pointName')" min-width="150" />
                <el-table-column prop="city" :label="$t('research.trialPlanAudit.table.point.city')" min-width="100" />
                <el-table-column prop="address" :label="$t('research.trialPlanAudit.table.point.address')" min-width="180" />
                <el-table-column prop="responsor" :label="$t('research.trialPlanAudit.table.point.responsor')" min-width="100" />
                <el-table-column prop="phone" :label="$t('research.trialPlanAudit.table.point.phone')" min-width="120" />
                <el-table-column prop="soilType" :label="$t('research.trialPlanAudit.table.point.soilType')" min-width="120" />
                <el-table-column :label="$t('research.trialPlanAudit.table.common.remark')" min-width="180">
                  <template #default="scope">
                    {{ scope.row.remark || '-' }}
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>

            <el-tab-pane :label="$t('research.trialPlanAudit.tab.observationIndex')" name="observationIndex">
              <el-table
                  :data="observationIndexList"
                  border
                  stripe
                  size="small"
                  style="width: 100%; margin-top: 12px"
                  :empty-text="$t('common.noData')"
              >
                <el-table-column prop="indexCode" :label="$t('research.trialPlanAudit.table.index.indexCode')" min-width="120" />
                <el-table-column prop="indexName" :label="$t('research.trialPlanAudit.table.index.indexName')" min-width="150" />
                <el-table-column prop="indexType" :label="$t('research.trialPlanAudit.table.index.indexType')" min-width="120" />
                <el-table-column prop="unit" :label="$t('research.trialPlanAudit.table.index.unit')" min-width="80" />
                <el-table-column prop="observationStage" :label="$t('research.trialPlanAudit.table.index.observationStage')" min-width="150" />
                <el-table-column prop="isRequired" :label="$t('research.trialPlanAudit.table.index.isRequired')" min-width="100" align="center">
                  <template #default="scope">
                    <el-tag :type="scope.row.isRequired === 1 ? 'danger' : 'info'">
                      {{ scope.row.isRequired === 1 ? $t('common.yes') : $t('common.no') }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('research.trialPlanAudit.table.common.remark')" min-width="180">
                  <template #default="scope">
                    {{ scope.row.remark || '-' }}
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>

            <el-tab-pane :label="$t('research.trialPlanAudit.tab.fieldDesign')" name="fieldDesign">
              <el-table
                  :data="fieldDesignList"
                  border
                  stripe
                  size="small"
                  style="width: 100%; margin-top: 12px"
                  :empty-text="$t('common.noData')"
              >
                <el-table-column prop="designType" :label="$t('research.trialPlanAudit.table.design.designType')" min-width="120" />
                <el-table-column prop="replicationCount" :label="$t('research.trialPlanAudit.table.design.replicationCount')" min-width="120" />
                <el-table-column prop="plotLength" :label="$t('research.trialPlanAudit.table.design.plotLength')" min-width="100" />
                <el-table-column prop="plotWidth" :label="$t('research.trialPlanAudit.table.design.plotWidth')" min-width="100" />
                <el-table-column prop="plotArea" :label="$t('research.trialPlanAudit.table.design.plotArea')" min-width="100" />
                <el-table-column prop="rowSpacing" :label="$t('research.trialPlanAudit.table.design.rowSpacing')" min-width="100" />
                <el-table-column prop="plantSpacing" :label="$t('research.trialPlanAudit.table.design.plantSpacing')" min-width="100" />
                <el-table-column :label="$t('research.trialPlanAudit.table.common.remark')" min-width="180">
                  <template #default="scope">
                    {{ scope.row.remark || '-' }}
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>

            <el-tab-pane :label="$t('research.trialPlanAudit.tab.implementPlan')" name="implementPlan">
              <el-table
                  :data="implementPlanList"
                  border
                  stripe
                  size="small"
                  style="width: 100%; margin-top: 12px"
                  :empty-text="$t('common.noData')"
              >
                <el-table-column prop="phaseName" :label="$t('research.trialPlanAudit.table.plan.phaseName')" min-width="120" />
                <el-table-column prop="startDate" :label="$t('research.trialPlanAudit.table.plan.startDate')" min-width="120" />
                <el-table-column prop="endDate" :label="$t('research.trialPlanAudit.table.plan.endDate')" min-width="120" />
                <el-table-column prop="mainContent" :label="$t('research.trialPlanAudit.table.plan.mainContent')" min-width="200" />
                <el-table-column prop="responsor" :label="$t('research.trialPlanAudit.table.plan.responsor')" min-width="100" />
                <el-table-column :label="$t('research.trialPlanAudit.table.common.remark')" min-width="180">
                  <template #default="scope">
                    {{ scope.row.remark || '-' }}
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>

            <el-tab-pane :label="$t('research.trialPlanAudit.tab.checkItem')" name="checkItem">
              <el-table
                  :data="checkItemList"
                  border
                  stripe
                  size="small"
                  style="width: 100%; margin-top: 12px"
                  :empty-text="$t('common.noData')"
              >
                <el-table-column prop="checkItemName" :label="$t('research.trialPlanAudit.table.check.checkItemName')" min-width="150" />
                <el-table-column prop="checkStandard" :label="$t('research.trialPlanAudit.table.check.checkStandard')" min-width="200" />
                <el-table-column prop="checkMethod" :label="$t('research.trialPlanAudit.table.check.checkMethod')" min-width="150" />
                <el-table-column prop="isKeyItem" :label="$t('research.trialPlanAudit.table.check.isKeyItem')" min-width="100" align="center">
                  <template #default="scope">
                    <el-tag :type="scope.row.isKeyItem === 1 ? 'danger' : 'info'">
                      {{ scope.row.isKeyItem === 1 ? $t('common.yes') : $t('common.no') }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('research.trialPlanAudit.table.common.remark')" min-width="180">
                  <template #default="scope">
                    {{ scope.row.remark || '-' }}
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </div>

        <div v-if="detailData.auditStatus && detailData.auditStatus !== 'pending'" class="detail-section">
          <div class="section-title">
            <i class="ri-shield-check-line"></i>
            {{ $t('research.trialPlanAudit.form.auditInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('research.trialPlanAudit.form.auditStatus') }}:</span>
              <el-tag :type="getAuditStatusType(detailData.auditStatus)">
                {{ $t(`research.trialPlanAudit.auditStatus.${detailData.auditStatus}`) }}
              </el-tag>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.trialPlanAudit.form.lockedFlag') }}:</span>
              <el-tag :type="detailData.lockedFlag === 1 ? 'danger' : 'success'">
                <i :class="detailData.lockedFlag === 1 ? 'ri-lock-line' : 'ri-lock-unlock-line'"></i>
                {{ detailData.lockedFlag === 1 ? $t('research.trialPlanAudit.form.locked') : $t('research.trialPlanAudit.form.unlocked') }}
              </el-tag>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.trialPlanAudit.form.auditTime') }}:</span>
              <span class="value">{{ detailData.auditTime || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.trialPlanAudit.form.auditorName') }}:</span>
              <span class="value">{{ detailData.auditorName || '-' }}</span>
            </div>
            <div v-if="detailData.auditOpinion" class="detail-item full-width">
              <span class="label">{{ $t('research.trialPlanAudit.form.auditOpinion') }}:</span>
              <span class="value">{{ detailData.auditOpinion }}</span>
            </div>
          </div>
        </div>

        <div v-if="!detailData.auditStatus || detailData.auditStatus === 'pending'" class="detail-section audit-form-section">
          <div class="section-title">
            <i class="ri-shield-check-line"></i>
            {{ $t('research.trialPlanAudit.form.auditInfo') }}
          </div>

          <el-form
              ref="auditFormRef"
              :model="auditForm"
              :rules="auditRules"
              label-position="top"
              class="audit-form"
          >
            <el-form-item :label="$t('research.trialPlanAudit.form.auditOpinion')" prop="auditOpinion">
              <el-input
                  v-model="auditForm.auditOpinion"
                  type="textarea"
                  :rows="4"
                  :placeholder="$t('research.trialPlanAudit.placeholder.auditOpinion')"
                  maxlength="1000"
                  show-word-limit
              />
            </el-form-item>

            <el-form-item :label="$t('research.trialPlanAudit.form.lockPlan')">
              <div class="lock-dataset-control">
                <el-switch
                    v-model="auditForm.lockedFlag"
                    :active-value="1"
                    :inactive-value="0"
                    active-color="#DA121A"
                    inactive-color="#009A44"
                    size="large"
                >
                  <template #active-action>
                    <i class="ri-lock-line"></i>
                  </template>
                  <template #inactive-action>
                    <i class="ri-lock-unlock-line"></i>
                  </template>
                </el-switch>
                <span class="lock-label">
                  {{ auditForm.lockedFlag === 1 ? $t('research.trialPlanAudit.form.locked') : $t('research.trialPlanAudit.form.unlocked') }}
                </span>
              </div>
              <div class="lock-tip">
                <i class="ri-information-line"></i>
                {{ $t('research.trialPlanAudit.form.lockPlanTip') }}
              </div>
            </el-form-item>

            <div class="audit-actions">
              <el-button
                  type="success"
                  size="large"
                  :loading="submitting"
                  @click="handleApprove"
              >
                <i class="ri-check-line"></i>
                {{ $t('research.trialPlanAudit.actions.approve') }}
              </el-button>
              <el-button
                  type="warning"
                  size="large"
                  :loading="submitting"
                  @click="handleNeedsRevision"
              >
                <i class="ri-edit-line"></i>
                {{ $t('research.trialPlanAudit.actions.needsRevision') }}
              </el-button>
              <el-button
                  type="danger"
                  size="large"
                  :loading="submitting"
                  @click="handleReject"
              >
                <i class="ri-close-line"></i>
                {{ $t('research.trialPlanAudit.actions.reject') }}
              </el-button>
            </div>
          </el-form>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useDict } from '@/hooks/useDict'

import { getTrialPlanById } from '@/api/trialPlan'
import { getTrialPlanAuditById, performTrialPlanAudit } from '@/api/trialPlanAudit'
import {
  getVarietyList,
  getTrialPointList,
  getObservationIndexList,
  getFieldDesignList,
  getImplementPlanList,
  getCheckItemList,
  getResponsorList
} from '@/api/trialPlanData'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const { getLabelByValue } = useDict(['trial_plan_status', 'crop_type', 'variety_type'])

const loading = ref(false)
const submitting = ref(false)
const detailData = ref(null)
const auditFormRef = ref(null)
const activeTab = ref('variety')

const varietyList = ref([])
const trialPointList = ref([])
const observationIndexList = ref([])
const fieldDesignList = ref([])
const implementPlanList = ref([])
const checkItemList = ref([])
const responsorList = ref([])

const auditForm = reactive({
  trialPlanId: '',
  auditStatus: '',
  auditOpinion: '',
  lockedFlag: 0
})

const auditRules = computed(() => ({
  auditOpinion: [
    {
      validator: (_rule, value, callback) => {
        if ((auditForm.auditStatus === 'rejected' || auditForm.auditStatus === 'needs_revision') && !value) {
          callback(new Error(t('research.trialPlanAudit.rules.auditOpinionRequired')))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}))

const getTrialPlanStatusType = (status) => {
  const typeMap = {
    draft: '',
    submitted: 'info',
    reviewing: 'warning',
    approved: 'success',
    rejected: 'danger'
  }
  return typeMap[status] || ''
}

const getAuditStatusType = (status) => {
  const typeMap = {
    pending: 'warning',
    approved: 'success',
    rejected: 'danger',
    needs_revision: 'warning'
  }
  return typeMap[status] || ''
}

const loadAllDataLists = async (planId) => {
  if (!planId) return

  try {
    console.log(t('research.trialPlanAudit.log.loadingDataList', { planId }))
    const [
      varietyRes,
      trialPointRes,
      observationIndexRes,
      fieldDesignRes,
      implementPlanRes,
      checkItemRes,
      responsorRes
    ] = await Promise.all([
      getVarietyList({ pageNum: 1, pageSize: 9999, planId }).catch(err => {
        console.error(t('research.trialPlanAudit.log.loadVarietyFailed'), err)
        return { rows: [], total: 0 }
      }),
      getTrialPointList({ pageNum: 1, pageSize: 9999, planId }).catch(err => {
        console.error(t('research.trialPlanAudit.log.loadPointFailed'), err)
        return { rows: [], total: 0 }
      }),
      getObservationIndexList({ pageNum: 1, pageSize: 9999, planId }).catch(err => {
        console.error(t('research.trialPlanAudit.log.loadIndexFailed'), err)
        return { rows: [], total: 0 }
      }),
      getFieldDesignList({ pageNum: 1, pageSize: 9999, planId }).catch(err => {
        console.error(t('research.trialPlanAudit.log.loadDesignFailed'), err)
        return { rows: [], total: 0 }
      }),
      getImplementPlanList({ pageNum: 1, pageSize: 9999, planId }).catch(err => {
        console.error(t('research.trialPlanAudit.log.loadPlanFailed'), err)
        return { rows: [], total: 0 }
      }),
      getCheckItemList({ pageNum: 1, pageSize: 9999, planId }).catch(err => {
        console.error(t('research.trialPlanAudit.log.loadCheckFailed'), err)
        return { rows: [], total: 0 }
      }),
      getResponsorList({ pageNum: 1, pageSize: 9999, planId }).catch(err => {
        console.error(t('research.trialPlanAudit.log.loadResponsorFailed'), err)
        return { rows: [], total: 0 }
      })
    ])

    varietyList.value = (varietyRes?.rows || varietyRes?.data?.rows || []).map(item => ({ ...item, remark: item.remark || '' }))
    trialPointList.value = (trialPointRes?.rows || trialPointRes?.data?.rows || []).map(item => ({ ...item, remark: item.remark || '' }))
    observationIndexList.value = (observationIndexRes?.rows || observationIndexRes?.data?.rows || []).map(item => ({ ...item, remark: item.remark || '' }))
    fieldDesignList.value = (fieldDesignRes?.rows || fieldDesignRes?.data?.rows || []).map(item => ({ ...item, remark: item.remark || '' }))
    implementPlanList.value = (implementPlanRes?.rows || implementPlanRes?.data?.rows || []).map(item => ({ ...item, remark: item.remark || '' }))
    checkItemList.value = (checkItemRes?.rows || checkItemRes?.data?.rows || []).map(item => ({ ...item, remark: item.remark || '' }))
    responsorList.value = (responsorRes?.rows || responsorRes?.data?.rows || []).map(item => ({ ...item, remark: item.remark || '' }))

    if (detailData.value?.moduleRowRemarks && typeof detailData.value.moduleRowRemarks === 'string') {
      try {
        const moduleRemarks = JSON.parse(detailData.value.moduleRowRemarks)
        const { varietyRemarks, pointRemarks, indexRemarks, designRemarks, planRemarks, checkRemarks } = moduleRemarks

        if (varietyRemarks) {
          const varietyRemarkMap = new Map(varietyRemarks.map(r => [r.varietyCode, r.remark]))
          varietyList.value = varietyList.value.map(item => ({ ...item, remark: varietyRemarkMap.get(item.varietyCode) || item.remark }))
        }

        if (pointRemarks) {
          const pointRemarkMap = new Map(pointRemarks.map(r => [r.pointCode, r.remark]))
          trialPointList.value = trialPointList.value.map(item => ({ ...item, remark: pointRemarkMap.get(item.pointCode) || item.remark }))
        }
      } catch (parseError) {
        console.error(t('research.trialPlanAudit.log.parseRemarkFailed'), parseError)
      }
    }
  } catch (error) {
    console.error(t('research.trialPlanAudit.log.loadDataFailed'), error)
    ElMessage.warning(t('research.trialPlanAudit.message.loadDataFailed'))
  }
}

const loadStatisticsData = async (planId) => {
  if (!planId) {
    console.warn(t('research.trialPlanAudit.log.noPlanId'))
    return null
  }

  try {
    console.log(t('research.trialPlanAudit.log.loadingStatistics', { planId }))
    const [varietyRes, pointRes, indexRes, planRes, checkRes, responsorRes] = await Promise.all([
      getVarietyList({ pageNum: 1, pageSize: 9999, planId }).catch(err => ({ total: 0 })),
      getTrialPointList({ pageNum: 1, pageSize: 9999, planId }).catch(err => ({ total: 0 })),
      getObservationIndexList({ pageNum: 1, pageSize: 9999, planId }).catch(err => ({ total: 0 })),
      getImplementPlanList({ pageNum: 1, pageSize: 9999, planId }).catch(err => ({ total: 0 })),
      getCheckItemList({ pageNum: 1, pageSize: 9999, planId }).catch(err => ({ total: 0 })),
      getResponsorList({ pageNum: 1, pageSize: 9999, planId }).catch(err => ({ total: 0 }))
    ])

    const varietyCount = varietyRes?.total || varietyRes?.data?.total || 0
    const pointCount = pointRes?.total || pointRes?.data?.total || 0
    const indexCount = indexRes?.total || indexRes?.data?.total || 0
    const planCount = planRes?.total || planRes?.data?.total || 0
    const checkCount = checkRes?.total || checkRes?.data?.total || 0
    const responsorCount = responsorRes?.total || responsorRes?.data?.total || 0

    const statistics = {
      varietyCount,
      pointCount,
      indexCount,
      planCount,
      checkCount,
      responsorCount
    }
    return statistics
  } catch (error) {
    console.error(t('research.trialPlanAudit.log.loadStatsFailed'), error)
    return { varietyCount: 0, pointCount: 0, indexCount: 0, planCount: 0, checkCount: 0, responsorCount: 0 }
  }
}

const loadDetail = async () => {
  loading.value = true
  try {
    const planRes = await getTrialPlanById(route.params.id)
    if (planRes.code === 200 && planRes.data) {
      detailData.value = planRes.data
      auditForm.trialPlanId = planRes.data.id

      if (planRes.data.id) {
        const statisticsResult = await loadStatisticsData(planRes.data.id)
        if (statisticsResult) {
          Object.assign(detailData.value, statisticsResult)
        }
        await loadAllDataLists(planRes.data.id)
      }

      try {
        const auditRes = await getTrialPlanAuditById(route.params.id)
        if (auditRes.code === 200 && auditRes.data) {
          const auditData = auditRes.data
          Object.assign(detailData.value, {
            auditStatus: auditData.auditStatus || auditData.audit_status || 'pending',
            auditTime: auditData.auditTime || auditData.audit_time || '-',
            auditorName: auditData.auditorName || auditData.auditor_name || '-',
            auditOpinion: auditData.auditOpinion || auditData.audit_opinion || '',
            lockedFlag: auditData.lockedFlag ?? 0
          })
        }
      } catch (error) {
        console.log(t('research.trialPlanAudit.log.noAuditRecord'))
      }
    } else {
      ElMessage.error(t('common.loadFailed'))
      goBack()
    }
  } catch (error) {
    console.error(t('research.trialPlanAudit.log.loadDetailFailed'), error)
    ElMessage.error(t('common.loadFailed'))
    goBack()
  } finally {
    loading.value = false
  }
}

const handleApprove = async () => {
  try {
    await ElMessageBox.confirm(
        t('research.trialPlanAudit.confirm.approve'),
        t('common.confirm'),
        { confirmButtonText: t('common.confirm'), cancelButtonText: t('common.cancel'), type: 'success' }
    )

    submitting.value = true
    auditForm.auditStatus = 'approved'
    const res = await performTrialPlanAudit(auditForm)

    if (res.code === 200) {
      ElMessage.success(t('research.trialPlanAudit.message.approveSuccess'))
      goBack()
    } else {
      ElMessage.error(res.msg || t('common.operationFailed'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error(t('research.trialPlanAudit.log.approveFailed'), error)
      ElMessage.error(t('common.operationFailed'))
    }
  } finally {
    submitting.value = false
  }
}

const handleReject = async () => {
  if (!auditForm.auditOpinion) {
    ElMessage.warning(t('research.trialPlanAudit.message.rejectOpinionRequired'))
    return
  }

  try {
    await ElMessageBox.confirm(
        t('research.trialPlanAudit.confirm.reject'),
        t('common.confirm'),
        { confirmButtonText: t('common.confirm'), cancelButtonText: t('common.cancel'), type: 'warning' }
    )

    submitting.value = true
    auditForm.auditStatus = 'rejected'
    const res = await performTrialPlanAudit(auditForm)

    if (res.code === 200) {
      ElMessage.success(t('research.trialPlanAudit.message.rejectSuccess'))
      goBack()
    } else {
      ElMessage.error(res.msg || t('common.operationFailed'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error(t('research.trialPlanAudit.log.rejectFailed'), error)
      ElMessage.error(t('common.operationFailed'))
    }
  } finally {
    submitting.value = false
  }
}

const handleNeedsRevision = async () => {
  if (!auditForm.auditOpinion) {
    ElMessage.warning(t('research.trialPlanAudit.message.needsRevisionOpinionRequired'))
    return
  }

  try {
    await ElMessageBox.confirm(
        t('research.trialPlanAudit.confirm.needsRevision'),
        t('common.confirm'),
        { confirmButtonText: t('common.confirm'), cancelButtonText: t('common.cancel'), type: 'warning' }
    )

    submitting.value = true
    auditForm.auditStatus = 'needs_revision'
    const res = await performTrialPlanAudit(auditForm)

    if (res.code === 200) {
      ElMessage.success(t('research.trialPlanAudit.message.needsRevisionSuccess'))
      goBack()
    } else {
      ElMessage.error(res.msg || t('common.operationFailed'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error(t('research.trialPlanAudit.log.needsRevisionFailed'), error)
      ElMessage.error(t('common.operationFailed'))
    }
  } finally {
    submitting.value = false
  }
}

const handleVarietyView = (row) => {
  if (row.varietyCode) {
    router.push(`/research/trial-plan/variety/detail/${row.varietyCode}`)
  } else {
    ElMessage.warning(t('common.noRecordId'))
  }
}

const goBack = () => {
  router.back()
}

onMounted(() => {
  loadDetail()
})
</script>

<style scoped>
.trial-plan-audit-review-container {
  min-height: calc(100vh - 120px);
}

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

.detail-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

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
  flex-direction: column;
}

.detail-item .label {
  font-weight: 500;
  color: #6b7280;
  min-width: 140px;
  flex-shrink: 0;
}

.detail-item.full-width .label {
  min-width: auto;
  margin-bottom: 8px;
}

.detail-item .value {
  color: #1f2937;
  flex: 1;
}

.detail-item .value.highlight {
  color: #009A44;
  font-weight: 600;
  font-size: 16px;
}

.statistics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.stat-card {
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
  border: 1px solid #86efac;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 154, 68, 0.15);
}

.stat-icon {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-icon i {
  font-size: 28px;
  color: white;
}

.stat-content {
  flex: 1;
}

.stat-label {
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #009A44;
  line-height: 1;
}

.audit-form-section {
  background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
  border: 2px solid #fbbf24;
}

.audit-form {
  margin-top: 20px;
}

.lock-dataset-control {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  background: white;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.lock-label {
  font-size: 16px;
  font-weight: 500;
  color: #1f2937;
}

.lock-tip {
  margin-top: 8px;
  padding: 8px 12px;
  background: #f0f9ff;
  border-left: 3px solid #009A44;
  border-radius: 4px;
  font-size: 13px;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 8px;
}

.lock-tip i {
  font-size: 16px;
  color: #009A44;
  flex-shrink: 0;
}

.audit-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 24px;
}

.audit-actions .el-button {
  min-width: 160px;
}

.trial-plan-audit-review-container :deep(.el-tabs) {
  --el-tabs-header-text-color: #6b7280;
  --el-tabs-active-text-color: #009A44;
  --el-tabs-border-color: #e5e7eb;
  --el-tabs-card-header-background: #f9fafb;
}

.trial-plan-audit-review-container :deep(.el-tabs__header) {
  margin-bottom: 16px;
}

.trial-plan-audit-review-container :deep(.el-tabs__item) {
  padding: 0 20px;
  height: 40px;
  line-height: 40px;
}

.trial-plan-audit-review-container :deep(.el-tabs__item.is-active) {
  background-color: #f0fdf4;
  border-color: #009A44;
}

.trial-plan-audit-review-container :deep(.el-tabs--card > .el-tabs__header .el-tabs__item.is-active) {
  border-bottom-color: #009A44;
}

.trial-plan-audit-review-container :deep(.el-tabs__ink-bar) {
  height: 3px;
  background-color: #009A44;
}

.trial-plan-audit-review-container :deep(.el-table) {
  --el-table-header-text-color: #009A44;
  --el-table-row-hover-bg-color: #f0fdf4;
}

.trial-plan-audit-review-container :deep(.el-table th) {
  background-color: #f8fff9 !important;
}

.trial-plan-audit-review-container :deep(.el-table td) {
  border-color: #e8f5ec;
}

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

  .statistics-grid {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  }
}

@media screen and (max-width: 768px) {
  .page-header {
    margin: -12px -12px 12px -12px;
  }

  .header-content {
    padding: 12px;
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

  .detail-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .detail-item {
    flex-direction: column;
    gap: 6px;
    padding: 12px;
    background: rgba(0, 154, 68, 0.02);
    border-radius: 8px;
    border-left: 3px solid #009A44;
  }

  .detail-item.full-width {
    grid-column: auto;
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

  .detail-item .value.highlight {
    font-size: 15px;
  }

  .statistics-grid {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  }

  .audit-actions {
    flex-direction: column;
  }

  .audit-actions .el-button {
    width: 100%;
    min-width: auto;
  }

  .trial-plan-audit-review-container :deep(.el-tabs__nav) {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .trial-plan-audit-review-container :deep(.el-tabs__item) {
    padding: 0 16px;
    height: 36px;
    line-height: 36px;
    font-size: 13px;
    white-space: nowrap;
  }

  .trial-plan-audit-review-container :deep(.el-table) {
    font-size: 12px;
  }

  .trial-plan-audit-review-container :deep(.el-table th) {
    padding: 8px 4px;
  }

  .trial-plan-audit-review-container :deep(.el-table td) {
    padding: 8px 4px;
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

  .detail-item .value.highlight {
    font-size: 14px;
  }

  .statistics-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .stat-card {
    padding: 10px;
  }

  .stat-icon {
    width: 36px;
    height: 36px;
  }

  .stat-icon i {
    font-size: 18px;
  }

  .stat-label {
    font-size: 11px;
  }

  .stat-value {
    font-size: 18px;
  }
}
</style>