<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部（带返回按钮） -->
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="goBack">
            <i class="ri-arrow-left-line"></i>
          </el-button>
          <div class="header-content">
            <h1 class="page-title">{{ $t('research.datasetAudit.title') }}</h1>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper" v-loading="loading">
        <template v-if="detailData">
          <!-- 基础信息卡片 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-information-line"></i>
                <span>{{ $t('research.datasetAudit.form.basicInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-descriptions :column="2" border>
                <el-descriptions-item :label="$t('research.datasetAudit.form.datasetCode')">
                  <span class="highlight-value">{{ detailData.datasetCode || '-' }}</span>
                </el-descriptions-item>
                <el-descriptions-item :label="$t('research.datasetAudit.form.datasetStatus')">
                  <el-tag :type="getDatasetStatusType(detailData.datasetStatus)">
                    {{ $t(`research.datasetCompilation.status.${detailData.datasetStatus}`) }}
                  </el-tag>
                </el-descriptions-item>
                <el-descriptions-item :label="$t('research.datasetAudit.form.trialId')">
                  {{ detailData.trialId || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('research.datasetAudit.form.batchId')">
                  {{ detailData.batchId || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('research.datasetAudit.form.versionNo')">
                  {{ detailData.versionNo || '1.0' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('research.datasetAudit.form.cropType')">
                  {{ detailData.cropType || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('research.datasetAudit.form.varietyName')">
                  {{ detailData.varietyName || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('research.datasetAudit.form.recordCount')">
                  {{ detailData.recordCount || 0 }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('research.datasetAudit.form.remark')" :span="2">
                  {{ detailData.remark || '-' }}
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>

          <!-- 数据统计 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-bar-chart-line"></i>
                <span>{{ $t('research.datasetAudit.form.dataStatistics') }}</span>
              </div>
            </div>
            <div class="card-body">
              <div class="statistics-grid">
            <div class="stat-card">
              <div class="stat-icon">
                <i class="ri-flask-line"></i>
              </div>
              <div class="stat-content">
                <div class="stat-label">{{ $t('research.datasetAudit.columns.trialCount') }}</div>
                <div class="stat-value">{{ detailData.trialCount || 1 }}</div>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">
                <i class="ri-map-line"></i>
              </div>
              <div class="stat-content">
                <div class="stat-label">{{ $t('research.datasetAudit.statistics.plotCount') }}</div>
                <div class="stat-value">{{ plotInfoList.length }}</div>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">
                <i class="ri-calendar-todo-line"></i>
              </div>
              <div class="stat-content">
                <div class="stat-label">{{ $t('research.datasetAudit.statistics.farmingCount') }}</div>
                <div class="stat-value">{{ farmingRecordList.length }}</div>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">
                <i class="ri-plant-line"></i>
              </div>
              <div class="stat-content">
                <div class="stat-label">{{ $t('research.datasetAudit.statistics.agronomicCount') }}</div>
                <div class="stat-value">{{ agronomicTraitList.length }}</div>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">
                <i class="ri-cloud-line"></i>
              </div>
              <div class="stat-content">
                <div class="stat-label">{{ $t('research.datasetAudit.statistics.envCount') }}</div>
                <div class="stat-value">{{ environmentDataList.length }}</div>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">
                <i class="ri-scissors-line"></i>
              </div>
              <div class="stat-content">
                <div class="stat-label">{{ $t('research.datasetAudit.statistics.yieldCount') }}</div>
                <div class="stat-value">{{ yieldDataList.length }}</div>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">
                <i class="ri-test-tube-line"></i>
              </div>
              <div class="stat-content">
                <div class="stat-label">{{ $t('research.datasetAudit.statistics.labCount') }}</div>
                <div class="stat-value">{{ labTestList.length }}</div>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">
                <i class="ri-bar-chart-box-line"></i>
              </div>
              <div class="stat-content">
                <div class="stat-label">{{ $t('research.datasetAudit.statistics.totalCount') }}</div>
                <div class="stat-value">
                  {{ plotInfoList.length + farmingRecordList.length + agronomicTraitList.length + environmentDataList.length + yieldDataList.length + labTestList.length }}
                </div>
              </div>
            </div>
          </div>
        </div>
          </div>

          <!-- 编制信息 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-user-line"></i>
                <span>{{ $t('research.datasetAudit.form.compilationInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-descriptions :column="2" border>
                <el-descriptions-item :label="$t('research.datasetAudit.form.compiledBy')">
                  {{ detailData.compiledByName || detailData.compiledBy || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('research.datasetAudit.form.compiledAt')">
                  {{ detailData.compiledAt || '-' }}
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>

          <!-- 提交信息 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-send-plane-line"></i>
                <span>{{ $t('research.datasetAudit.form.submitInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-descriptions :column="2" border>
                <el-descriptions-item :label="$t('research.datasetAudit.form.submitTime')">
                  {{ detailData.submitTime }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('research.datasetAudit.form.submitterName')">
                  {{ detailData.submitByName || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('research.datasetAudit.form.submitOrgName')" :span="2">
                  {{ detailData.submitOrgName || '-' }}
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>

          <!-- 数据详情Tab页 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-data-line"></i>
                <span>{{ $t('research.datasetAudit.form.dataDetails') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-tabs v-model="activeTab" type="card">
            <!-- 地块及播种信息Tab -->
            <el-tab-pane :label="$t('research.datasetAudit.tab.plot')" name="plotInfo">
              <el-table
                  :data="plotInfoList"
                  border
                  stripe
                  size="small"
                  style="width: 100%; margin-top: 12px"
                  :empty-text="$t('common.noData')"
              >
                <el-table-column prop="plotId" :label="$t('research.datasetAudit.table.plot.plotId')" min-width="120" />
                <el-table-column prop="batchId" :label="$t('research.datasetAudit.table.common.batchId')" min-width="100" />
                <el-table-column prop="trialId" :label="$t('research.datasetAudit.table.common.trialId')" min-width="100" />
                <el-table-column prop="replicationNo" :label="$t('research.datasetAudit.table.plot.replicationNo')" min-width="100" />
                <el-table-column prop="rowNo" :label="$t('research.datasetAudit.table.plot.rowNo')" min-width="80" />
                <el-table-column prop="columnNo" :label="$t('research.datasetAudit.table.plot.columnNo')" min-width="80" />
                <el-table-column prop="varietyCode" :label="$t('research.datasetAudit.table.plot.varietyCode')" min-width="100" />
                <el-table-column prop="sowingDate" :label="$t('research.datasetAudit.table.plot.sowingDate')" min-width="100">
                  <template #default="scope">
                    {{ scope.row.sowingDate || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="seedQuantity" :label="$t('research.datasetAudit.table.plot.seedQuantity')" min-width="100">
                  <template #default="scope">
                    {{ scope.row.seedQuantity || 0 }}
                  </template>
                </el-table-column>
                <el-table-column prop="sowingMethod" :label="$t('research.datasetAudit.table.plot.sowingMethod')" min-width="100">
                  <template #default="scope">
                    {{ scope.row.sowingMethod || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="plotAreaM2" :label="$t('research.datasetAudit.table.plot.plotAreaM2')" min-width="100">
                  <template #default="scope">
                    {{ scope.row.plotAreaM2 || 0 }}
                  </template>
                </el-table-column>
                <el-table-column prop="gpsLat" :label="$t('research.datasetAudit.table.plot.gpsLat')" min-width="100">
                  <template #default="scope">
                    {{ scope.row.gpsLat || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="gpsLong" :label="$t('research.datasetAudit.table.plot.gpsLong')" min-width="100">
                  <template #default="scope">
                    {{ scope.row.gpsLong || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="region" :label="$t('research.datasetAudit.table.plot.region')" min-width="100">
                  <template #default="scope">
                    {{ scope.row.region || '-' }}
                  </template>
                </el-table-column>
                <el-table-column :label="$t('research.datasetAudit.table.common.remark')" min-width="180">
                  <template #default="scope">
                    {{ scope.row.remark || '-' }}
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>

            <!-- 农事记录数据Tab -->
            <el-tab-pane :label="$t('research.datasetAudit.tab.farming')" name="farmingRecord">
              <el-table
                  :data="farmingRecordList"
                  border
                  stripe
                  size="small"
                  style="width: 100%; margin-top: 12px"
                  :empty-text="$t('common.noData')"
              >
                <el-table-column prop="farmingRecordId" :label="$t('research.datasetAudit.table.farming.farmingRecordId')" min-width="120" />
                <el-table-column prop="trialId" :label="$t('research.datasetAudit.table.common.trialId')" min-width="100" />
                <el-table-column prop="batchId" :label="$t('research.datasetAudit.table.common.batchId')" min-width="100" />
                <el-table-column prop="plotId" :label="$t('research.datasetAudit.table.common.plotId')" min-width="100" />
                <el-table-column prop="activityDate" :label="$t('research.datasetAudit.table.farming.activityDate')" min-width="120">
                  <template #default="scope">
                    {{ scope.row.activityDate || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="activityType" :label="$t('research.datasetAudit.table.farming.activityType')" min-width="100">
                  <template #default="scope">
                    {{ scope.row.activityType || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="inputName" :label="$t('research.datasetAudit.table.farming.inputName')" min-width="120">
                  <template #default="scope">
                    {{ scope.row.inputName || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="quantity" :label="$t('research.datasetAudit.table.common.quantity')" min-width="80">
                  <template #default="scope">
                    {{ scope.row.quantity || 0 }}
                  </template>
                </el-table-column>
                <el-table-column prop="unit" :label="$t('research.datasetAudit.table.common.unit')" min-width="80">
                  <template #default="scope">
                    {{ scope.row.unit || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="operatorId" :label="$t('research.datasetAudit.table.farming.operatorId')" min-width="100">
                  <template #default="scope">
                    {{ scope.row.operatorId || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="operationDesc" :label="$t('research.datasetAudit.table.farming.operationDesc')" min-width="150">
                  <template #default="scope">
                    {{ scope.row.operationDesc || '-' }}
                  </template>
                </el-table-column>
                <el-table-column :label="$t('research.datasetAudit.table.common.remark')" min-width="180">
                  <template #default="scope">
                    {{ scope.row.remark || '-' }}
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>

            <!-- 农艺性状数据Tab -->
            <el-tab-pane :label="$t('research.datasetAudit.tab.agronomic')" name="agronomicTrait">
              <el-table
                  :data="agronomicTraitList"
                  border
                  stripe
                  size="small"
                  style="width: 100%; margin-top: 12px"
                  :empty-text="$t('common.noData')"
                  @row-click="handleAgronomicView"
              >
                <!-- 选择列（可选，和前者保持一致） -->
                <el-table-column type="selection" width="50" />
                <!-- 主记录核心字段列 -->
                <el-table-column prop="recordId" :label="$t('trait.columns.recordId')" min-width="160" show-overflow-tooltip />
                <el-table-column prop="plotId" :label="$t('trait.columns.plotId')" min-width="140" show-overflow-tooltip />
                <el-table-column prop="trialId" :label="$t('trait.columns.trialId')" min-width="140" show-overflow-tooltip />
                <el-table-column prop="batchId" :label="$t('trait.columns.batchId')" min-width="140" show-overflow-tooltip />
                <el-table-column prop="observationDate" :label="$t('trait.columns.observationDate')" min-width="160" />
                <!-- 生长周期：字典解析 -->
                <el-table-column prop="growthStage" :label="$t('trait.columns.growthStage')" min-width="120">
                  <template #default="{ row }">
                    {{ getLabelByValue('growth_cycle', row.growthStage) || row.growthStage }}
                  </template>
                </el-table-column>
                <!-- 性状数量：success标签展示 -->
                <el-table-column prop="traitCount" :label="$t('trait.columns.traitCount')" min-width="100" align="center">
                  <template #default="{ row }">
                    <el-tag type="success">{{ row.traitCount || 0 }}</el-tag>
                  </template>
                </el-table-column>
                <!-- 创建人、创建时间 -->
                <el-table-column prop="createBy" :label="$t('trait.columns.createBy')" min-width="120" show-overflow-tooltip />
                <el-table-column prop="createTime" :label="$t('trait.columns.createTime')" min-width="160" />
                <!-- 备注列（新增） -->
                <el-table-column :label="$t('research.datasetAudit.table.common.remark')" min-width="180">
                  <template #default="scope">
                    {{ scope.row.remark || '-' }}
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>

            <!-- 环境监测数据Tab -->
            <el-tab-pane :label="$t('research.datasetAudit.tab.environment')" name="environmentData">
              <el-table
                  :data="environmentDataList"
                  border
                  stripe
                  size="small"
                  style="width: 100%; margin-top: 12px"
                  :empty-text="$t('common.noData')"
              >
                <el-table-column prop="envRecordId" :label="$t('research.datasetAudit.table.environment.envRecordId')" min-width="120" />
                <el-table-column prop="trialId" :label="$t('research.datasetAudit.table.common.trialId')" min-width="100" />
                <el-table-column prop="batchId" :label="$t('research.datasetAudit.table.common.batchId')" min-width="100" />
                <el-table-column prop="plotId" :label="$t('research.datasetAudit.table.common.plotId')" min-width="100" />
                <el-table-column prop="collectTime" :label="$t('research.datasetAudit.table.environment.collectTime')" min-width="120">
                  <template #default="scope">
                    {{ scope.row.collectTime || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="dataType" :label="$t('research.datasetAudit.table.environment.dataType')" min-width="100">
                  <template #default="scope">
                    {{ scope.row.dataType || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="soilPh" :label="$t('research.datasetAudit.table.environment.soilPh')" min-width="100">
                  <template #default="scope">
                    {{ scope.row.soilPh || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="soilTemperature" :label="$t('research.datasetAudit.table.environment.soilTemperature')" min-width="120">
                  <template #default="scope">
                    {{ scope.row.soilTemperature || 0 }}
                  </template>
                </el-table-column>
                <el-table-column prop="soilMoisture" :label="$t('research.datasetAudit.table.environment.soilMoisture')" min-width="120">
                  <template #default="scope">
                    {{ scope.row.soilMoisture || 0 }}
                  </template>
                </el-table-column>
                <el-table-column prop="airTemperature" :label="$t('research.datasetAudit.table.environment.airTemperature')" min-width="120">
                  <template #default="scope">
                    {{ scope.row.airTemperature || 0 }}
                  </template>
                </el-table-column>
                <el-table-column prop="airHumidity" :label="$t('research.datasetAudit.table.environment.airHumidity')" min-width="120">
                  <template #default="scope">
                    {{ scope.row.airHumidity || 0 }}
                  </template>
                </el-table-column>
                <el-table-column prop="rainfall" :label="$t('research.datasetAudit.table.environment.rainfall')" min-width="100">
                  <template #default="scope">
                    {{ scope.row.rainfall || 0 }}
                  </template>
                </el-table-column>
                <el-table-column prop="remarks" :label="$t('research.datasetAudit.table.common.remarks')" min-width="150">
                  <template #default="scope">
                    {{ scope.row.remarks || '-' }}
                  </template>
                </el-table-column>
                <el-table-column :label="$t('research.datasetAudit.table.common.remark')" min-width="180">
                  <template #default="scope">
                    {{ scope.row.remark || '-' }}
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>

            <!-- 田间检查数据Tab -->
            <el-tab-pane :label="$t('research.datasetAudit.tab.yield')" name="yieldData">
              <el-table
                  :data="yieldDataList"
                  border
                  stripe
                  size="small"
                  style="width: 100%; margin-top: 12px"
                  :empty-text="$t('common.noData')"
              >
                <el-table-column prop="id" :label="$t('research.datasetAudit.table.yield.inspectionId')" min-width="120" />
                <el-table-column prop="trialId" :label="$t('research.datasetAudit.table.common.trialId')" min-width="100" />
                <el-table-column prop="batchId" :label="$t('research.datasetAudit.table.common.batchId')" min-width="100" />
                <el-table-column prop="plotId" :label="$t('research.datasetAudit.table.common.plotId')" min-width="100" />
                <!-- <el-table-column prop="plotAreaM2" :label="$t('research.datasetAudit.table.yield.plotAreaM2')" min-width="100">
                  <template #default="scope">
                    {{ scope.row.plotAreaM2 || 0 }}
                  </template>
                </el-table-column> -->
                <el-table-column prop="inspectionDate" :label="$t('research.datasetAudit.table.yield.inspectionDate')" min-width="120">
                  <template #default="scope">
                    {{ scope.row.inspectionDate || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="inspectionType" :label="$t('research.datasetAudit.table.yield.inspectionType')" min-width="100">
                  <template #default="scope">
                    {{ scope.row.inspectionType || '-' }}
                  </template>
                </el-table-column>
                <!-- <el-table-column prop="grainWeightKg" :label="$t('research.datasetAudit.table.yield.grainWeightKg')" min-width="100">
                  <template #default="scope">
                    {{ scope.row.grainWeightKg || 0 }}
                  </template>
                </el-table-column>
                <el-table-column prop="yieldQtPerHa" :label="$t('research.datasetAudit.table.yield.yieldQtPerHa')" min-width="100">
                  <template #default="scope">
                    {{ scope.row.yieldQtPerHa || 0 }}
                  </template>
                </el-table-column>
                <el-table-column prop="moistureContent" :label="$t('research.datasetAudit.table.yield.moistureContent')" min-width="100">
                  <template #default="scope">
                    {{ scope.row.moistureContent || 0 }}
                  </template>
                </el-table-column> -->
                <el-table-column prop="scoreValue" :label="$t('research.datasetAudit.table.yield.scoreValue')" min-width="100">
                  <template #default="scope">
                    {{ scope.row.scoreValue || 0 }}
                  </template>
                </el-table-column>
                <!-- <el-table-column prop="harvestDate" :label="$t('research.datasetAudit.table.yield.harvestDate')" min-width="120">
                  <template #default="scope">
                    {{ scope.row.harvestDate || '-' }}
                  </template>
                </el-table-column> -->
                <el-table-column prop="recorderName" :label="$t('research.datasetAudit.table.yield.recorderName')" min-width="100">
                  <template #default="scope">
                    {{ scope.row.recorderName || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="createdTime" :label="$t('research.datasetAudit.table.common.createdTime')" min-width="150">
                  <template #default="scope">
                    {{ scope.row.createdTime || '-' }}
                  </template>
                </el-table-column>
                <el-table-column :label="$t('research.datasetAudit.table.common.remark')" min-width="180">
                  <template #default="scope">
                    {{ scope.row.remark || '-' }}
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>

            <!-- 实验室测试数据Tab -->
            <el-tab-pane :label="$t('research.datasetAudit.tab.lab')" name="labTest">
              <el-table
                  :data="labTestList"
                  border
                  stripe
                  size="small"
                  style="width: 100%; margin-top: 12px"
                  :empty-text="$t('common.noData')"
              >
                <el-table-column prop="id" :label="$t('research.datasetAudit.table.lab.testId')" min-width="120" />
                <el-table-column prop="trialId" :label="$t('research.datasetAudit.table.common.trialId')" min-width="100" />
                <el-table-column prop="batchId" :label="$t('research.datasetAudit.table.common.batchId')" min-width="100" />
                <el-table-column prop="sampleId" :label="$t('research.datasetAudit.table.lab.sampleId')" min-width="100">
                  <template #default="scope">
                    {{ scope.row.sampleId || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="sampleType" :label="$t('research.datasetAudit.table.lab.sampleType')" min-width="100">
                  <template #default="scope">
                    {{ scope.row.sampleType || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="germinationRate" :label="$t('research.datasetAudit.table.lab.germinationRate')" min-width="100">
                  <template #default="scope">
                    {{ scope.row.germinationRate || 0 }}
                  </template>
                </el-table-column>
                <el-table-column prop="purityPercent" :label="$t('research.datasetAudit.table.lab.purityPercent')" min-width="100">
                  <template #default="scope">
                    {{ scope.row.purityPercent || 0 }}
                  </template>
                </el-table-column>
                <el-table-column prop="moistureContentPercent" :label="$t('research.datasetAudit.table.lab.moistureContentPercent')" min-width="120">
                  <template #default="scope">
                    {{ scope.row.moistureContentPercent || 0 }}
                  </template>
                </el-table-column>
                <el-table-column prop="proteinPercent" :label="$t('research.datasetAudit.table.lab.proteinPercent')" min-width="120">
                  <template #default="scope">
                    {{ scope.row.proteinPercent || 0 }}
                  </template>
                </el-table-column>
                <el-table-column prop="testDate" :label="$t('research.datasetAudit.table.lab.testDate')" min-width="120">
                  <template #default="scope">
                    {{ scope.row.testDate || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="testOrganization" :label="$t('research.datasetAudit.table.lab.testOrganization')" min-width="120">
                  <template #default="scope">
                    {{ scope.row.testOrganization || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="testerName" :label="$t('research.datasetAudit.table.lab.testerName')" min-width="100">
                  <template #default="scope">
                    {{ scope.row.testerName || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="passFailFlag" :label="$t('research.datasetAudit.table.lab.passFailFlag')" min-width="100">
                  <template #default="scope">
                    <el-tag :type="scope.row.passFailFlag === 'pass' ? 'success' : 'danger'">
                      {{ scope.row.passFailFlag === 'pass' ? $t('research.datasetAudit.table.lab.pass') : (scope.row.passFailFlag === 'fail' ? $t('research.datasetAudit.table.lab.fail') : '-') }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('research.datasetAudit.table.common.remark')" min-width="180">
                  <template #default="scope">
                    {{ scope.row.remark || '-' }}
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
            </div>
          </div>

          <!-- 审核信息 (已审核时显示) -->
          <div v-if="detailData.auditStatus && detailData.auditStatus !== 'pending'" class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-shield-check-line"></i>
                <span>{{ $t('research.datasetAudit.form.auditInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-descriptions :column="2" border>
                <el-descriptions-item :label="$t('research.datasetAudit.form.auditStatus')">
                  <el-tag :type="getAuditStatusType(detailData.auditStatus)">
                    {{ $t(`research.datasetAudit.auditStatus.${detailData.auditStatus}`) }}
                  </el-tag>
                </el-descriptions-item>
                <el-descriptions-item :label="$t('research.datasetAudit.form.lockedFlag')">
                  <el-tag :type="detailData.lockedFlag === 1 ? 'danger' : 'success'">
                    <i :class="detailData.lockedFlag === 1 ? 'ri-lock-line' : 'ri-lock-unlock-line'"></i>
                    {{ detailData.lockedFlag === 1 ? $t('research.datasetAudit.form.locked') : $t('research.datasetAudit.form.unlocked') }}
                  </el-tag>
                </el-descriptions-item>
                <el-descriptions-item :label="$t('research.datasetAudit.form.auditTime')">
                  {{ detailData.auditTime || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('research.datasetAudit.form.auditorName')">
                  {{ detailData.auditorName || '-' }}
                </el-descriptions-item>
                <el-descriptions-item v-if="detailData.auditOpinion" :label="$t('research.datasetAudit.form.auditOpinion')" :span="2">
                  {{ detailData.auditOpinion }}
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>

          <!-- 审核表单 (待审核时显示) -->
          <div v-if="!detailData.auditStatus || detailData.auditStatus === 'pending'" class="info-card audit-form-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-shield-check-line"></i>
                <span>{{ $t('research.datasetAudit.form.auditInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-form
                ref="auditFormRef"
                :model="auditForm"
                :rules="auditRules"
                label-position="top">
            <el-form-item :label="$t('research.datasetAudit.form.auditOpinion')" prop="auditOpinion">
              <el-input
                  v-model="auditForm.auditOpinion"
                  type="textarea"
                  :rows="4"
                  :placeholder="$t('research.datasetAudit.placeholder.auditOpinion')"
                  maxlength="1000"
                  show-word-limit
              />
            </el-form-item>

            <!-- 锁定数据集开关 -->
            <el-form-item :label="$t('research.datasetAudit.form.lockDataset')">
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
                  {{ auditForm.lockedFlag === 1 ? $t('research.datasetAudit.form.locked') : $t('research.datasetAudit.form.unlocked') }}
                </span>
              </div>
              <div class="lock-tip">
                <i class="ri-information-line"></i>
                {{ $t('research.datasetAudit.form.lockDatasetTip') }}
              </div>
            </el-form-item>

            <div class="form-actions">
              <el-button @click="goBack">{{ $t('common.cancel') }}</el-button>
              <el-button
                  type="danger"
                  plain
                  :loading="submitting"
                  @click="handleReject"
              >
                <i class="ri-close-circle-line"></i>
                {{ $t('research.datasetAudit.actions.reject') }}
              </el-button>
              <el-button
                  type="success"
                  :loading="submitting"
                  @click="handleApprove"
              >
                <i class="ri-checkbox-circle-line"></i>
                {{ $t('research.datasetAudit.actions.approve') }}
              </el-button>
            </div>
          </el-form>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
// ========== 第一步：所有import放在最顶部 ==========
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useDict } from '@/hooks/useDict' // 移到import区域，只加一次

import { getDatasetById } from '@/api/dataset'
import { getAuditByDatasetId, performAudit } from '@/api/datasetAudit'
import { getAgronomicTraitList,getTraitRecordList, getFarmingRecordList, getPlotInfoList, getEnvironmentDataList } from '@/api/breedingData'
import { getLabTestList } from '@/api/labTest'
import { getYieldDataList } from '@/api/yieldData'
import { getEnvironmentNewDataPage } from '@/api/environment-new-data'

// ========== 第二步：初始化路由、i18n、字典 ==========
const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const { getLabelByValue } = useDict(['agronomic_trait_name', 'growth_cycle', 'flow_status'])
// ========== 第三步：数据Ref声明（删除重复的agronomicTraitList） ==========
const loading = ref(false)
const submitting = ref(false)
const detailData = ref(null)
const auditFormRef = ref(null)
const activeTab = ref('plotInfo') // 默认激活第一个Tab

// 数据列表 Ref（原有声明，仅新增 agronomicDetailList）
const plotInfoList = ref([])           // 地块及播种信息
const farmingRecordList = ref([])     // 农事记录
const agronomicTraitList = ref([])    // 农艺性状（原有，保留）
const environmentDataList = ref([])   // 环境监测数据
const labTestList = ref([])           // 实验室测试数据
const yieldDataList = ref([])         // 田间检查/产量数据

const auditForm = reactive({
  datasetId: '',
  auditStatus: '',
  auditOpinion: '',
  lockedFlag: 0  // 默认不锁定
})

// 审核表单验证规则
const auditRules = computed(() => ({
  auditOpinion: [
    {
      validator: (_rule, value, callback) => {
        if (auditForm.auditStatus === 'rejected' && !value) {
          callback(new Error(t('research.datasetAudit.rules.auditOpinionRequired')))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}))

// 获取数据集状态类型
const getDatasetStatusType = (status) => {
  const typeMap = {
    draft: '',
    submitted: 'info',
    reviewing: 'warning',
    approved: 'success',
    rejected: 'danger'
  }
  return typeMap[status] || ''
}

// 获取审核状态类型
const getAuditStatusType = (status) => {
  const typeMap = {
    pending: 'warning',
    approved: 'success',
    rejected: 'danger',
    needs_revision: 'warning'
  }
  return typeMap[status] || ''
}

// 加载所有数据列表
const loadAllDataLists = async (trialId) => {
  if (!trialId) return

  try {
    console.log(t('research.datasetAudit.log.loadingDataList', { trialId }))
    // 批量请求所有数据接口
    const [
      plotRes, farmingRes, agronomicRes, environmentDataRes,
      labRes, yieldRes
    ] = await Promise.all([
      getPlotInfoList({ pageNum: 1, pageSize: 9999, trialId }).catch(err => {
        console.error(t('research.datasetAudit.log.loadPlotFailed'), err)
        return { rows: [], total: 0 }
      }),
      getFarmingRecordList({ pageNum: 1, pageSize: 9999, trialId }).catch(err => {
        console.error(t('research.datasetAudit.log.loadFarmingFailed'), err)
        return { rows: [], total: 0 }
      }),
      getTraitRecordList({ pageNum: 1, pageSize: 9999, trialId }).catch(err => {
        console.error(t('research.datasetAudit.log.loadAgronomicFailed'), err)
        return { rows: [], total: 0 }
      }),
      getEnvironmentDataList({ pageNum: 1, pageSize: 9999, trialId }).catch(err => {
        console.error(t('research.datasetAudit.log.loadEnvironmentFailed'), err)
        return { rows: [], total: 0 }
      }),
      getLabTestList({ pageNum: 1, pageSize: 9999, trialId }).catch(err => {
        console.error(t('research.datasetAudit.log.loadLabFailed'), err)
        return ({ data: { list: [], total: 0 } })
      }),
      getYieldDataList({ pageNum: 1, pageSize: 9999, trialId }).catch(err => {
        console.error(t('research.datasetAudit.log.loadYieldFailed'), err)
        return ({ msg: t('research.datasetAudit.log.loadYieldError'), code: 500, data: [] })
      })
    ])

    // 赋值数据列表 + 初始化备注字段
    plotInfoList.value = (plotRes?.rows || plotRes?.data?.rows || []).map(item => ({
      ...item,
      remark: item.remark || ''
    }))
    farmingRecordList.value = (farmingRes?.rows || farmingRes?.data?.rows || []).map(item => ({
      ...item,
      remark: item.remark || ''
    }))
    // 找到 agronomicTraitList.value 赋值的位置，替换为以下代码
    agronomicTraitList.value = (agronomicRes?.rows || agronomicRes?.data?.rows || []).map(item => ({
      ...item,
      remark: item.remark || ''
    }))
    // ========== 新增：提取性状明细列表 ==========
    environmentDataList.value = (environmentDataRes?.rows || environmentDataRes?.data?.rows || []).map(item => ({
      ...item,
      remark: item.remark || ''
    }))
    labTestList.value = (labRes?.data?.list || []).map(item => ({
      ...item,
      remark: item.remark || ''
    }))
    yieldDataList.value = (yieldRes?.data || []).map(item => ({
      ...item,
      remark: item.remark || ''
    }))

    console.log(t('research.datasetAudit.log.loadDataSuccess'), {
      plotInfoList: plotInfoList.value,
      farmingRecordList: farmingRecordList.value,
      agronomicTraitList: agronomicTraitList.value,
      environmentDataList: environmentDataList.value,
      labTestList: labTestList.value,
      yieldDataList: yieldDataList.value
    });

    // 解析存储的模块备注并回显
    if (detailData.value?.moduleRowRemarks && typeof detailData.value.moduleRowRemarks === 'string') {
      try {
        const moduleRemarks = JSON.parse(detailData.value.moduleRowRemarks)
        const { plotRemarks, farmingRemarks, agronomicRemarks, environmentRemarks, yieldRemarks, labTestRemarks } = moduleRemarks

        // 地块备注回显
        if (plotRemarks) {
          const plotRemarkMap = new Map(plotRemarks.map(r => [r.plotId, r.remark]))
          plotInfoList.value = plotInfoList.value.map(item => ({
            ...item,
            remark: plotRemarkMap.get(item.plotId) || item.remark
          }))
        }

        // 农事记录备注回显
        if (farmingRemarks) {
          const farmingRemarkMap = new Map(farmingRemarks.map(r => [r.farmingRecordId, r.remark]))
          farmingRecordList.value = farmingRecordList.value.map(item => ({
            ...item,
            remark: farmingRemarkMap.get(item.farmingRecordId) || item.remark
          }))
        }

        // 农艺性状备注回显（新增）
        if (agronomicRemarks) {
          const agronomicRemarkMap = new Map(agronomicRemarks.map(r => [r.recordId, r.remark]))
          agronomicTraitList.value = agronomicTraitList.value.map(item => ({
            ...item,
            remark: agronomicRemarkMap.get(item.recordId) || item.remark
          }))
        }

        // 环境监测备注回显
        if (environmentRemarks) {
          const environmentRemarkMap = new Map(environmentRemarks.map(r => [r.envRecordId, r.remark]))
          environmentDataList.value = environmentDataList.value.map(item => ({
            ...item,
            remark: environmentRemarkMap.get(item.envRecordId) || item.remark
          }))
        }

        // 田间检查备注回显
        if (yieldRemarks) {
          const yieldRemarkMap = new Map(yieldRemarks.map(r => [r.id, r.remark]))
          yieldDataList.value = yieldDataList.value.map(item => ({
            ...item,
            remark: yieldRemarkMap.get(item.id) || item.remark
          }))
        }

        // 实验室测试备注回显
        if (labTestRemarks) {
          const labTestRemarkMap = new Map(labTestRemarks.map(r => [r.id, r.remark]))
          labTestList.value = labTestList.value.map(item => ({
            ...item,
            remark: labTestRemarkMap.get(item.id) || item.remark
          }))
        }
      } catch (parseError) {
        console.error(t('research.datasetAudit.log.parseRemarkFailed'), parseError)
      }
    }

  } catch (error) {
    console.error(t('research.datasetAudit.log.loadDataFailed'), error)
    ElMessage.warning(t('research.datasetAudit.message.loadDataFailed'))
  }
}

// 根据试验ID加载统计数据
const loadStatisticsData = async (trialId) => {
  if (!trialId) {
    console.warn(t('research.datasetAudit.log.noTrialId'))
    return null
  }

  try {
    console.log(t('research.datasetAudit.log.loadingStatistics', { trialId }))

    // 并行调用5个列表接口，根据试验ID统计
    const [farmingRes, fieldRes, envRes, labRes, yieldRes, plotRes] = await Promise.all([
      // 1. 农事记录数据
      getFarmingRecordList({
        pageNum: 1,
        pageSize: 9999,
        trialId: trialId
      }).catch(err => {
        console.error(t('research.datasetAudit.log.loadFarmingStatsFailed'), err)
        return { total: 0 }
      }),

      // 2. 田间数据（农艺性状数据）
      getTraitRecordList({
        pageNum: 1,
        pageSize: 9999,
        trialId: trialId
      }).catch(err => {
        console.error(t('research.datasetAudit.log.loadFieldStatsFailed'), err)
        return { total: 0 }
      }),

      // 3. 环境数据
      getEnvironmentNewDataPage({
        pageNum: 1,
        pageSize: 9999,
        trialId: trialId
      }).catch(err => {
        console.error(t('research.datasetAudit.log.loadEnvStatsFailed'), err)
        return { total: 0 }
      }),

      // 4. 实验室测试数据
      getLabTestList({
        pageNum: 1,
        pageSize: 9999,
        trialId: trialId
      }).catch(err => {
        console.error(t('research.datasetAudit.log.loadLabStatsFailed'), err)
        return { total: 0 }
      }),

      // 5. 产量数据
      getYieldDataList({
        pageNum: 1,
        pageSize: 9999,
        trialId: trialId
      }).catch(err => {
        console.error(t('research.datasetAudit.log.loadYieldStatsFailed'), err)
        return { total: 0 }
      }),

      // 6. 地块及播种数据
      getPlotInfoList({
        pageNum: 1,
        pageSize: 9999,
        trialId: trialId
      }).catch(err => {
        console.error(t('research.datasetAudit.log.loadPlotStatsFailed'), err)
        return { total: 0 }
      })
    ])

    console.log(t('research.datasetAudit.log.statsApiResult'), {
      farmingRes,
      fieldRes,
      envRes,
      labRes,
      yieldRes,
      plotRes
    })

    // 提取总数（兼容不同的返回格式）
    const farmingRecordCount = farmingRes?.total || farmingRes?.data?.total || 0
    const fieldDataCount = fieldRes?.total || fieldRes?.data?.total || 0
    const envDataCount = envRes?.total || envRes?.data?.total || 0
    const labTestCount = labRes?.total || labRes?.data?.total || 0
    const yieldDataCount = yieldRes?.total || yieldRes?.data?.total || 0
    const plotInfoCount = plotRes?.total || plotRes?.data?.total || 0

    const statistics = {
      trialCount: 1, // 当前选择了一个试验
      farmingRecordCount,
      fieldDataCount,
      envDataCount,
      labTestCount,
      yieldDataCount,
      plotInfoCount
    }

    console.log(t('research.datasetAudit.log.statsResult'), statistics)
    return statistics
  } catch (error) {
    console.error(t('research.datasetAudit.log.loadStatsFailed'), error)
    return {
      trialCount: 0,
      farmingRecordCount: 0,
      fieldDataCount: 0,
      envDataCount: 0,
      labTestCount: 0,
      yieldDataCount: 0,
      plotInfoCount: 0
    }
  }
}

// 加载详情数据
const loadDetail = async () => {
  loading.value = true
  try {
    // 加载数据集详情
    const datasetRes = await getDatasetById(route.params.id)
    if (datasetRes.code === 200 && datasetRes.data) {
      detailData.value = datasetRes.data
      auditForm.datasetId = datasetRes.data.id

      // 根据试验ID加载统计数据和TAB列表数据
      if (datasetRes.data.trialId) {
        console.log(t('research.datasetAudit.log.detectedTrialId', { trialId: datasetRes.data.trialId }))
        // 加载统计数据
        const statisticsResult = await loadStatisticsData(datasetRes.data.trialId)
        if (statisticsResult) {
          // 将统计结果合并到详情数据中
          Object.assign(detailData.value, {
            trialCount: statisticsResult.trialCount,
            farmingRecordCount: statisticsResult.farmingRecordCount,
            fieldDataCount: statisticsResult.fieldDataCount,
            envDataCount: statisticsResult.envDataCount,
            labTestCount: statisticsResult.labTestCount,
            yieldDataCount: statisticsResult.yieldDataCount,
            plotInfoCount: statisticsResult.plotInfoCount
          })
          console.log(t('research.datasetAudit.log.statsUpdated'))
        }
        // 加载TAB列表数据
        await loadAllDataLists(datasetRes.data.trialId)
      } else {
        console.warn(t('research.datasetAudit.log.noTrialIdInDataset'))
      }

      // 尝试加载审核信息
      try {
        const auditRes = await getAuditByDatasetId(route.params.id)
        if (auditRes.code === 200 && auditRes.data) {
          const auditData = auditRes.data
          Object.assign(detailData.value, {
            auditStatus: auditData.auditStatus || auditData.audit_status || 'pending',
            auditTime: auditData.auditTime || auditData.audit_time || '-',
            auditorName: auditData.auditorName || auditData.auditor_name || '-',
            auditOpinion: auditData.auditOpinion || auditData.audit_opinion || '',
            lockedFlag: auditData.lockedFlag !== null && auditData.lockedFlag !== undefined ? auditData.lockedFlag : 0
          })
        }
      } catch (error) {
        // 审核记录可能不存在,忽略错误
        console.log(t('research.datasetAudit.log.noAuditRecord'))
      }
    } else {
      ElMessage.error(t('common.loadFailed'))
      goBack()
    }
  } catch (error) {
    console.error(t('research.datasetAudit.log.loadDetailFailed'), error)
    ElMessage.error(t('common.loadFailed'))
    goBack()
  } finally {
    loading.value = false
  }
}

// 审核通过
const handleApprove = async () => {
  try {
    await ElMessageBox.confirm(
        t('research.datasetAudit.confirm.approve'),
        t('common.confirm'),
        {
          confirmButtonText: t('common.confirm'),
          cancelButtonText: t('common.cancel'),
          type: 'success'
        }
    )

    submitting.value = true
    auditForm.auditStatus = 'approved'

    const res = await performAudit(auditForm)
    if (res.code === 200) {
      ElMessage.success(t('research.datasetAudit.message.approveSuccess'))
      goBack()
    } else {
      ElMessage.error(res.msg || t('common.operationFailed'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error(t('research.datasetAudit.log.approveFailed'), error)
      ElMessage.error(t('common.operationFailed'))
    }
  } finally {
    submitting.value = false
  }
}

// 审核驳回
const handleReject = async () => {
  // 驳回时必须填写审核意见
  if (!auditForm.auditOpinion) {
    ElMessage.warning(t('research.datasetAudit.message.rejectOpinionRequired'))
    return
  }

  try {
    await ElMessageBox.confirm(
        t('research.datasetAudit.confirm.reject'),
        t('common.confirm'),
        {
          confirmButtonText: t('common.confirm'),
          cancelButtonText: t('common.cancel'),
          type: 'warning'
        }
    )

    submitting.value = true
    auditForm.auditStatus = 'rejected'

    const res = await performAudit(auditForm)
    if (res.code === 200) {
      ElMessage.success(t('research.datasetAudit.message.rejectSuccess'))
      goBack()
    } else {
      ElMessage.error(res.msg || t('common.operationFailed'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error(t('research.datasetAudit.log.rejectFailed'), error)
      ElMessage.error(t('common.operationFailed'))
    }
  } finally {
    submitting.value = false
  }
}

// 农艺性状主记录查看跳转
const handleAgronomicView = (row) => {
  if (row.recordId) {
    router.push(`/research/breeding-data/trait/detail/${row.recordId}`)
  } else {
    ElMessage.warning(t('common.noRecordId'))
  }
}

// 需要修订
const handleNeedsRevision = async () => {
  // 标记需要修订时必须填写修订意见
  if (!auditForm.auditOpinion) {
    ElMessage.warning(t('research.datasetAudit.message.needsRevisionOpinionRequired'))
    return
  }

  try {
    await ElMessageBox.confirm(
        t('research.datasetAudit.confirm.needsRevision'),
        t('common.confirm'),
        {
          confirmButtonText: t('common.confirm'),
          cancelButtonText: t('common.cancel'),
          type: 'warning'
        }
    )

    submitting.value = true
    auditForm.auditStatus = 'needs_revision'

    const res = await performAudit(auditForm)
    if (res.code === 200) {
      ElMessage.success(t('research.datasetAudit.message.needsRevisionSuccess'))
      goBack()
    } else {
      ElMessage.error(res.msg || t('common.operationFailed'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error(t('research.datasetAudit.log.needsRevisionFailed'), error)
      ElMessage.error(t('common.operationFailed'))
    }
  } finally {
    submitting.value = false
  }
}

// 返回
const goBack = () => {
  router.back()
}

// 初始化
onMounted(() => {
  loadDetail()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';

/* 高亮值样式 */
.highlight-value {
  color: #009A44;
  font-weight: 600;
  font-size: 16px;
}

/* 审核表单卡片特殊样式 */
.audit-form-card {
  background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
  // border: 2px solid #fbbf24;
}

/* 统计卡片网格 */
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

/* 锁定数据集控件 */
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

/* 响应式设计 */
@media screen and (max-width: 768px) {
  .statistics-grid {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  }
}

@media screen and (max-width: 480px) {
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