<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="goBack">
            <i class="ri-arrow-left-line"></i>
          </el-button>
          <div class="header-content">
            <h1 class="page-title">{{ $t('research.datasetCompilation.detail') }}</h1>
          </div>
        </div>
      </div>

      <!-- 详情区域 -->
      <div v-loading="loading" class="content-wrapper">
        <template v-if="detailData">
          <!-- 基础信息 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-information-line"></i>
                <span>{{ $t('research.datasetCompilation.form.basicInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-descriptions :column="2" border>
                <el-descriptions-item :label="$t('research.datasetCompilation.columns.datasetCode')">
                  {{ detailData.datasetCode || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('research.datasetCompilation.form.status')">
                  <el-tag :type="getStatusType(detailData.status || detailData.datasetStatus)">
                    {{ getStatusLabel(detailData.status || detailData.datasetStatus) }}
                  </el-tag>
                </el-descriptions-item>
                <el-descriptions-item :label="$t('research.datasetCompilation.form.trialId')">
                  {{ detailData.trialId || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('research.datasetCompilation.form.batchId')">
                  {{ detailData.batchId || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('research.datasetCompilation.form.versionNo')">
                  {{ detailData.versionNo || '1.0' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('research.datasetCompilation.form.recordCount')">
                  {{ detailData.recordCount || 0 }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('research.datasetCompilation.form.cropType')">
                  {{ getLabelByValue('crop_type', detailData.cropType) || detailData.cropType || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('research.datasetCompilation.form.varietyName')">
                  {{ detailData.varietyName || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('research.datasetCompilation.form.remark')" :span="2">
                  {{ detailData.remark || '-' }}
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>

          <!-- 编制信息 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-user-line"></i>
                <span>{{ $t('research.datasetCompilation.form.compilationInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-descriptions :column="2" border>
                <el-descriptions-item :label="$t('research.datasetCompilation.form.compiledBy')">
                  {{ detailData.compiledByName || detailData.compiledBy || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('research.datasetCompilation.form.compiledAt')">
                  {{ detailData.compiledAt || '-' }}
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>

          <!-- 数据统计 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-bar-chart-line"></i>
                <span>{{ $t('research.datasetCompilation.form.statisticsInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <div class="statistics-grid">
                <div class="stat-card">
                  <div class="stat-icon">
                    <i class="ri-bar-chart-box-line"></i>
                  </div>
                  <div class="stat-content">
                    <div class="stat-label">{{ $t('research.datasetCompilation.form.statistics.totalCount') }}</div>
                    <div class="stat-value">
                      {{ plotInfoList.length + farmingRecordList.length + agronomicTraitList.length +
                        environmentDataList.length + yieldDataList.length + labTestList.length }}
                    </div>
                  </div>
                </div>

                <div class="stat-card">
                  <div class="stat-icon">
                    <i class="ri-map-line"></i>
                  </div>
                  <div class="stat-content">
                    <div class="stat-label">{{ $t('research.datasetCompilation.form.statistics.plotCount') }}</div>
                    <div class="stat-value">{{ plotInfoList.length }}</div>
                  </div>
                </div>

                <div class="stat-card">
                  <div class="stat-icon">
                    <i class="ri-calendar-todo-line"></i>
                  </div>
                  <div class="stat-content">
                    <div class="stat-label">{{ $t('research.datasetCompilation.form.statistics.farmingCount') }}</div>
                    <div class="stat-value">{{ farmingRecordList.length }}</div>
                  </div>
                </div>

                <div class="stat-card">
                  <div class="stat-icon">
                    <i class="ri-plant-line"></i>
                  </div>
                  <div class="stat-content">
                    <div class="stat-label">{{ $t('research.datasetCompilation.form.statistics.agronomicCount') }}</div>
                    <div class="stat-value">{{ agronomicTraitList.length }}</div>
                  </div>
                </div>

                <div class="stat-card">
                  <div class="stat-icon">
                    <i class="ri-cloud-line"></i>
                  </div>
                  <div class="stat-content">
                    <div class="stat-label">{{ $t('research.datasetCompilation.form.statistics.envCount') }}</div>
                    <div class="stat-value">{{ environmentDataList.length }}</div>
                  </div>
                </div>

                <div class="stat-card">
                  <div class="stat-icon">
                    <i class="ri-scissors-line"></i>
                  </div>
                  <div class="stat-content">
                    <div class="stat-label">{{ $t('research.datasetCompilation.form.statistics.yieldCount') }}</div>
                    <div class="stat-value">{{ yieldDataList.length }}</div>
                  </div>
                </div>

                <div class="stat-card">
                  <div class="stat-icon">
                    <i class="ri-test-tube-line"></i>
                  </div>
                  <div class="stat-content">
                    <div class="stat-label">{{ $t('research.datasetCompilation.form.statistics.labCount') }}</div>
                    <div class="stat-value">{{ labTestList.length }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 数据详情Tab页 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-data-line"></i>
                <span>{{ $t('research.datasetCompilation.form.dataDetails') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-tabs v-model="activeTab" type="card">
            <!-- 地块及播种信息Tab -->
            <el-tab-pane :label="$t('research.datasetCompilation.tab.plot')" name="plotInfo">
              <el-table :data="plotInfoList" border stripe size="small" style="width: 100%; margin-top: 12px"
                :empty-text="$t('common.noData')">
                <el-table-column prop="plotId" :label="$t('research.datasetCompilation.table.plot.plotId')"
                  min-width="120" />
                <el-table-column prop="batchId" :label="$t('research.datasetCompilation.table.common.batchId')"
                  min-width="100" />
                <el-table-column prop="trialId" :label="$t('research.datasetCompilation.table.common.trialId')"
                  min-width="100" />
                <el-table-column prop="replicationNo"
                  :label="$t('research.datasetCompilation.table.plot.replicationNo')" min-width="100" />
                <el-table-column prop="rowNo" :label="$t('research.datasetCompilation.table.plot.rowNo')"
                  min-width="80" />
                <el-table-column prop="columnNo" :label="$t('research.datasetCompilation.table.plot.columnNo')"
                  min-width="80" />
                <el-table-column prop="varietyCode" :label="$t('research.datasetCompilation.table.plot.varietyCode')"
                  min-width="100" />
                <el-table-column prop="sowingDate" :label="$t('research.datasetCompilation.table.plot.sowingDate')"
                  min-width="100">
                  <template #default="scope">
                    {{ scope.row.sowingDate || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="seedQuantity" :label="$t('research.datasetCompilation.table.plot.seedQuantity')"
                  min-width="100">
                  <template #default="scope">
                    {{ scope.row.seedQuantity || 0 }}
                  </template>
                </el-table-column>
                <el-table-column prop="sowingMethod" :label="$t('research.datasetCompilation.table.plot.sowingMethod')"
                  min-width="100">
                  <template #default="scope">
                    {{ scope.row.sowingMethod || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="plotAreaM2" :label="$t('research.datasetCompilation.table.plot.plotAreaM2')"
                  min-width="100">
                  <template #default="scope">
                    {{ scope.row.plotAreaM2 || 0 }}
                  </template>
                </el-table-column>
                <el-table-column prop="gpsLat" :label="$t('research.datasetCompilation.table.plot.gpsLat')"
                  min-width="100">
                  <template #default="scope">
                    {{ scope.row.gpsLat || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="gpsLong" :label="$t('research.datasetCompilation.table.plot.gpsLong')"
                  min-width="100">
                  <template #default="scope">
                    {{ scope.row.gpsLong || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="region" :label="$t('research.datasetCompilation.table.plot.region')"
                  min-width="100">
                  <template #default="scope">
                    {{ scope.row.region || '-' }}
                  </template>
                </el-table-column>
                <el-table-column :label="$t('research.datasetCompilation.table.common.remark')" min-width="180">
                  <template #default="scope">
                    {{ scope.row.remark || '-' }}
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>

            <!-- 农事记录数据Tab -->
            <el-tab-pane :label="$t('research.datasetCompilation.tab.farming')" name="farmingRecord">
              <el-table :data="farmingRecordList" border stripe size="small" style="width: 100%; margin-top: 12px"
                :empty-text="$t('common.noData')">
                <el-table-column prop="farmingRecordId"
                  :label="$t('research.datasetCompilation.table.farming.farmingRecordId')" min-width="120" />
                <el-table-column prop="trialId" :label="$t('research.datasetCompilation.table.common.trialId')"
                  min-width="100" />
                <el-table-column prop="batchId" :label="$t('research.datasetCompilation.table.common.batchId')"
                  min-width="100" />
                <el-table-column prop="plotId" :label="$t('research.datasetCompilation.table.common.plotId')"
                  min-width="100" />
                <el-table-column prop="activityDate"
                  :label="$t('research.datasetCompilation.table.farming.activityDate')" min-width="120">
                  <template #default="scope">
                    {{ scope.row.activityDate || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="activityType"
                  :label="$t('research.datasetCompilation.table.farming.activityType')" min-width="100">
                  <template #default="scope">
                    {{ scope.row.activityType || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="inputName" :label="$t('research.datasetCompilation.table.farming.inputName')"
                  min-width="120">
                  <template #default="scope">
                    {{ scope.row.inputName || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="quantity" :label="$t('research.datasetCompilation.table.common.quantity')"
                  min-width="80">
                  <template #default="scope">
                    {{ scope.row.quantity || 0 }}
                  </template>
                </el-table-column>
                <el-table-column prop="unit" :label="$t('research.datasetCompilation.table.common.unit')"
                  min-width="80">
                  <template #default="scope">
                    {{ scope.row.unit || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="operatorId" :label="$t('research.datasetCompilation.table.farming.operatorId')"
                  min-width="100">
                  <template #default="scope">
                    {{ scope.row.operatorId || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="operationDesc"
                  :label="$t('research.datasetCompilation.table.farming.operationDesc')" min-width="150">
                  <template #default="scope">
                    {{ scope.row.operationDesc || '-' }}
                  </template>
                </el-table-column>
                <el-table-column :label="$t('research.datasetCompilation.table.common.remark')" min-width="180">
                  <template #default="scope">
                    {{ scope.row.remark || '-' }}
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>

            <!-- 农艺性状数据Tab（与前者保持一致） -->
            <el-tab-pane :label="$t('research.datasetCompilation.tab.agronomic')" name="agronomicTrait">
              <el-table :data="agronomicTraitList" border stripe size="small" style="width: 100%; margin-top: 12px"
                :empty-text="$t('common.noData')" @row-click="handleAgronomicView">
                <!-- 选择列 -->
                <el-table-column type="selection" width="50" />
                <!-- 主记录核心字段列 -->
                <el-table-column prop="recordId" :label="$t('trait.columns.recordId')" min-width="160"
                  show-overflow-tooltip />
                <el-table-column prop="plotId" :label="$t('trait.columns.plotId')" min-width="140"
                  show-overflow-tooltip />
                <el-table-column prop="trialId" :label="$t('trait.columns.trialId')" min-width="140"
                  show-overflow-tooltip />
                <el-table-column prop="batchId" :label="$t('trait.columns.batchId')" min-width="140"
                  show-overflow-tooltip />
                <el-table-column prop="observationDate" :label="$t('trait.columns.observationDate')" min-width="160" />
                <!-- 生长周期：字典解析 -->
                <el-table-column prop="growthStage" :label="$t('trait.columns.growthStage')" min-width="120">
                  <template #default="{ row }">
                    {{ getLabelByValue('growth_cycle', row.growthStage) || row.growthStage || '-' }}
                  </template>
                </el-table-column>
                <!-- 性状数量：success标签展示 -->
                <el-table-column prop="traitCount" :label="$t('trait.columns.traitCount')" min-width="100"
                  align="center">
                  <template #default="{ row }">
                    <el-tag type="success">{{ row.traitCount || 0 }}</el-tag>
                  </template>
                </el-table-column>
                <!-- 创建人、创建时间 -->
                <el-table-column prop="createBy" :label="$t('trait.columns.createBy')" min-width="120"
                  show-overflow-tooltip />
                <el-table-column prop="createTime" :label="$t('trait.columns.createTime')" min-width="160" />
                <!-- 备注列 -->
                <el-table-column :label="$t('research.datasetCompilation.table.common.remark')" min-width="180">
                  <template #default="scope">
                    {{ scope.row.remark || '-' }}
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>

            <!-- 环境监测数据Tab -->
            <el-tab-pane :label="$t('research.datasetCompilation.tab.environment')" name="environmentData">
              <el-table :data="environmentDataList" border stripe size="small" style="width: 100%; margin-top: 12px"
                :empty-text="$t('common.noData')">
                <el-table-column prop="envRecordId"
                  :label="$t('research.datasetCompilation.table.environment.envRecordId')" min-width="150"
                  show-overflow-tooltip />
                <el-table-column prop="stationId" :label="$t('research.datasetCompilation.table.environment.stationId')"
                  min-width="120" show-overflow-tooltip />
                <el-table-column prop="trialId" :label="$t('research.datasetCompilation.table.common.trialId')"
                  min-width="120" show-overflow-tooltip />
                <el-table-column prop="batchId" :label="$t('research.datasetCompilation.table.common.batchId')"
                  min-width="120" show-overflow-tooltip />
                <el-table-column prop="plotId" :label="$t('research.datasetCompilation.table.common.plotId')"
                  min-width="120" show-overflow-tooltip />
                <el-table-column prop="timestamp" :label="$t('research.datasetCompilation.table.environment.timestamp')"
                  min-width="160">
                  <template #default="scope">
                    {{ scope.row.timestamp || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="parameterCode"
                  :label="$t('research.datasetCompilation.table.environment.parameterCode')" min-width="120">
                  <template #default="scope">
                    {{ getLabelByValue('env_parameter_code', scope.row.parameterCode) || scope.row.parameterCode || '-'
                    }}
                  </template>
                </el-table-column>
                <el-table-column prop="value" :label="$t('research.datasetCompilation.table.environment.value')"
                  min-width="100">
                  <template #default="scope">
                    {{ scope.row.value !== null && scope.row.value !== undefined ? scope.row.value : '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="unit" :label="$t('research.datasetCompilation.table.environment.unit')"
                  min-width="80">
                  <template #default="scope">
                    {{ scope.row.unit || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="source" :label="$t('research.datasetCompilation.table.environment.source')"
                  min-width="100">
                  <template #default="scope">
                    {{ scope.row.source || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="createTime" :label="$t('research.datasetCompilation.table.common.createdTime')"
                  min-width="160">
                  <template #default="scope">
                    {{ scope.row.createTime || '-' }}
                  </template>
                </el-table-column>
                <el-table-column :label="$t('research.datasetCompilation.table.common.remark')" min-width="180">
                  <template #default="scope">
                    {{ scope.row.remark || '-' }}
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>

            <!-- 田间检查数据Tab -->
            <el-tab-pane :label="$t('research.datasetCompilation.tab.yield')" name="yieldData">
              <el-table :data="yieldDataList" border stripe size="small" style="width: 100%; margin-top: 12px"
                :empty-text="$t('common.noData')">
                <el-table-column prop="id" :label="$t('research.datasetCompilation.table.yield.inspectionId')"
                  min-width="120" />
                <el-table-column prop="trialId" :label="$t('research.datasetCompilation.table.common.trialId')"
                  min-width="100" />
                <el-table-column prop="batchId" :label="$t('research.datasetCompilation.table.common.batchId')"
                  min-width="100" />
                <el-table-column prop="plotId" :label="$t('research.datasetCompilation.table.common.plotId')"
                  min-width="100" />
                <!-- <el-table-column prop="plotAreaM2" :label="$t('research.datasetCompilation.table.yield.plotAreaM2')"
                  min-width="100">
                  <template #default="scope">
                    {{ scope.row.plotAreaM2 || 0 }}
                  </template>
                </el-table-column> -->
                <el-table-column prop="inspectionDate"
                  :label="$t('research.datasetCompilation.table.yield.inspectionDate')" min-width="120">
                  <template #default="scope">
                    {{ scope.row.inspectionDate || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="inspectionType"
                  :label="$t('research.datasetCompilation.table.yield.inspectionType')" min-width="100">
                  <template #default="scope">
                    {{ scope.row.inspectionType || '-' }}
                  </template>
                </el-table-column>
                <!-- <el-table-column prop="grainWeightKg"
                  :label="$t('research.datasetCompilation.table.yield.grainWeightKg')" min-width="100">
                  <template #default="scope">
                    {{ scope.row.grainWeightKg || 0 }}
                  </template>
                </el-table-column>
                <el-table-column prop="yieldQtPerHa" :label="$t('research.datasetCompilation.table.yield.yieldQtPerHa')"
                  min-width="100">
                  <template #default="scope">
                    {{ scope.row.yieldQtPerHa || 0 }}
                  </template>
                </el-table-column>
                <el-table-column prop="moistureContent"
                  :label="$t('research.datasetCompilation.table.yield.moistureContent')" min-width="100">
                  <template #default="scope">
                    {{ scope.row.moistureContent || 0 }}
                  </template>
                </el-table-column> -->
                <el-table-column prop="scoreValue" :label="$t('research.datasetCompilation.table.yield.scoreValue')"
                  min-width="100">
                  <template #default="scope">
                    {{ scope.row.scoreValue || 0 }}
                  </template>
                </el-table-column>
                <!-- <el-table-column prop="harvestDate" :label="$t('research.datasetCompilation.table.yield.harvestDate')"
                  min-width="120">
                  <template #default="scope">
                    {{ scope.row.harvestDate || '-' }}
                  </template>
                </el-table-column> -->
                <el-table-column prop="recorderName" :label="$t('research.datasetCompilation.table.yield.recorderName')"
                  min-width="100">
                  <template #default="scope">
                    {{ scope.row.recorderName || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="createdTime" :label="$t('research.datasetCompilation.table.common.createdTime')"
                  min-width="150">
                  <template #default="scope">
                    {{ scope.row.createdTime || '-' }}
                  </template>
                </el-table-column>
                <el-table-column :label="$t('research.datasetCompilation.table.common.remark')" min-width="180">
                  <template #default="scope">
                    {{ scope.row.remark || '-' }}
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>

            <!-- 实验室测试数据Tab -->
            <el-tab-pane :label="$t('research.datasetCompilation.tab.lab')" name="labTest">
              <el-table :data="labTestList" border stripe size="small" style="width: 100%; margin-top: 12px"
                :empty-text="$t('common.noData')">
                <el-table-column prop="dataId" :label="$t('research.datasetCompilation.table.lab.testId')"
                  min-width="120" />
                <el-table-column prop="trialId" :label="$t('research.datasetCompilation.table.common.trialId')"
                  min-width="100" />
                <el-table-column prop="batchId" :label="$t('research.datasetCompilation.table.common.batchId')"
                  min-width="100" />
                <el-table-column prop="sampleId" :label="$t('research.datasetCompilation.table.lab.sampleId')"
                  min-width="100">
                  <template #default="scope">
                    {{ scope.row.sampleId || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="sampleType" :label="$t('research.datasetCompilation.table.lab.sampleType')"
                  min-width="100">
                  <template #default="scope">
                    {{ scope.row.sampleType || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="germinationRate"
                  :label="$t('research.datasetCompilation.table.lab.germinationRate')" min-width="100">
                  <template #default="scope">
                    {{ scope.row.germinationRate || 0 }}
                  </template>
                </el-table-column>
                <el-table-column prop="purityPercent" :label="$t('research.datasetCompilation.table.lab.purityPercent')"
                  min-width="100">
                  <template #default="scope">
                    {{ scope.row.purityPercent || 0 }}
                  </template>
                </el-table-column>
                <el-table-column prop="moistureContentPercent"
                  :label="$t('research.datasetCompilation.table.lab.moistureContentPercent')" min-width="120">
                  <template #default="scope">
                    {{ scope.row.moistureContentPercent || 0 }}
                  </template>
                </el-table-column>
                <el-table-column prop="proteinPercent"
                  :label="$t('research.datasetCompilation.table.lab.proteinPercent')" min-width="120">
                  <template #default="scope">
                    {{ scope.row.proteinPercent || 0 }}
                  </template>
                </el-table-column>
                <el-table-column prop="testDate" :label="$t('research.datasetCompilation.table.lab.testDate')"
                  min-width="120">
                  <template #default="scope">
                    {{ scope.row.testDate || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="testOrganization"
                  :label="$t('research.datasetCompilation.table.lab.testOrganization')" min-width="120">
                  <template #default="scope">
                    {{ scope.row.testOrganization || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="testerName" :label="$t('research.datasetCompilation.table.lab.testerName')"
                  min-width="100">
                  <template #default="scope">
                    {{ scope.row.testerName || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="passFailFlag" :label="$t('research.datasetCompilation.table.lab.passFailFlag')"
                  min-width="100">
                  <template #default="scope">
                    <el-tag :type="scope.row.passFailFlag === 'pass' ? 'success' : 'danger'">
                      {{ scope.row.passFailFlag === 'pass' ? $t('research.datasetCompilation.table.lab.pass') :
                        (scope.row.passFailFlag === 'fail' ? $t('research.datasetCompilation.table.lab.fail') : '-') }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('research.datasetCompilation.table.common.remark')" min-width="180">
                  <template #default="scope">
                    {{ scope.row.remark || '-' }}
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { useDict } from '@/hooks/useDict'
import { getDatasetById } from '@/api/dataset'
import {
  getPlotInfoList, getFarmingRecordList, getTraitRecordList,
  getEnvironmentDataList
} from '@/api/breedingData'
import { getLabTestList } from '@/api/labTest'
import { getYieldDataList } from '@/api/yieldData'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const { getLabelByValue } = useDict(['agronomic_trait_name', 'growth_cycle', 'flow_status', 'crop_type', 'env_parameter_code'])

const loading = ref(false)
const detailData = ref(null)
const activeTab = ref('plotInfo')

// 数据列表 Ref
const plotInfoList = ref([])
const farmingRecordList = ref([])
const agronomicTraitList = ref([])
const environmentDataList = ref([])
const labTestList = ref([])
const yieldDataList = ref([])

// 获取状态类型
const getStatusType = (status) => {
  const statusLower = (status || '').toLowerCase()
  const typeMap = {
    draft: '',
    submitted: 'info',
    reviewing: 'warning',
    approved: 'success',
    rejected: 'danger'
  }
  return typeMap[statusLower] || ''
}

// 获取状态标签
const getStatusLabel = (status) => {
  if (!status) return '-'
  const statusLower = status.toLowerCase()

  const labelMap = {
    draft: t('research.datasetCompilation.status.draft'),
    submitted: t('research.datasetCompilation.status.submitted'),
    reviewing: t('research.datasetCompilation.status.reviewing'),
    approved: t('research.datasetCompilation.status.approved'),
    rejected: t('research.datasetCompilation.status.rejected')
  }
  return labelMap[statusLower] || status
}

// 农艺性状主记录查看跳转
const handleAgronomicView = (row) => {
  if (row.recordId) {
    router.push(`/research/breeding-data/trait/detail/${row.recordId}`)
  } else {
    ElMessage.warning(t('common.noRecordId'))
  }
}

// 加载所有数据列表
const loadAllDataLists = async (trialId) => {
  if (!trialId) return

  try {
    console.log('开始加载详情数据列表，trialId:', trialId)
    // 批量请求所有数据接口
    const [
      plotRes, farmingRes, agronomicRes, environmentDataRes,
      labRes, yieldRes
    ] = await Promise.all([
      getPlotInfoList({ pageNum: 1, pageSize: 9999, trialId }).catch(err => {
        console.error('获取地块及播种信息失败:', err)
        return { rows: [], total: 0 }
      }),
      getFarmingRecordList({ pageNum: 1, pageSize: 9999, trialId }).catch(err => {
        console.error('获取农事记录失败:', err)
        return { rows: [], total: 0 }
      }),
      getTraitRecordList({ pageNum: 1, pageSize: 9999, trialId }).catch(err => {
        console.error('获取农艺性状数据失败:', err)
        return { rows: [], total: 0 }
      }),
      getEnvironmentDataList({ pageNum: 1, pageSize: 9999, trialId }).catch(err => {
        console.error('获取环境监测数据失败:', err)
        return { rows: [], total: 0 }
      }),
      getLabTestList({ pageNum: 1, pageSize: 9999, trialId }).catch(err => {
        console.error('获取实验室测试数据失败:', err)
        return { rows: [], total: 0 }
      }),
      getYieldDataList({ pageNum: 1, pageSize: 9999, trialId }).catch(err => {
        console.error('获取产量数据失败:', err)
        return ({ msg: "", code: 500, data: [] })
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
    agronomicTraitList.value = (agronomicRes?.rows || agronomicRes?.data?.rows || []).map(item => ({
      ...item,
      remark: item.remark || ''
    }))
    environmentDataList.value = (environmentDataRes?.rows || environmentDataRes?.data?.rows || []).map(item => ({
      ...item,
      remark: item.remark || ''
    }))
    labTestList.value = (labRes?.rows || labRes?.data || []).map(item => ({
      ...item,
      remark: item.remark || ''
    }))
    yieldDataList.value = (yieldRes?.rows || yieldRes?.data || []).map(item => ({
      ...item,
      remark: item.remark || ''
    }))

    console.log('详情数据列表加载完成:', {
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

        // 农艺性状备注回显（适配recordId）
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
          const labTestRemarkMap = new Map(labTestRemarks.map(r => [r.dataId || r.id, r.remark]))
          labTestList.value = labTestList.value.map(item => ({
            ...item,
            remark: labTestRemarkMap.get(item.dataId) || item.remark
          }))
        }
      } catch (parseError) {
        console.error('解析模块备注失败:', parseError)
      }
    }

  } catch (error) {
    console.error('加载数据列表失败:', error)
    ElMessage.warning(t('research.datasetCompilation.message.statisticsFailed'))
  }
}

// 加载详情数据
const loadDetail = async () => {
  loading.value = true
  try {
    const res = await getDatasetById(route.params.id)
    if (res.code === 200 && res.data) {
      detailData.value = res.data
      
      // 设置审批历史记录
      if (res.data && res.data.approvalComments) {
        approvalHistory.value = res.data.approvalComments.map(comment => ({
          approver: comment.approverName,
          approvalTime: comment.approvalTime,
          comment: comment.comment
        }))
      }
      
      // 加载所有数据列表
      if (res.data.trialId) {
        await loadAllDataLists(res.data.trialId)
      }
    } else {
      ElMessage.error(t('common.loadFailed'))
      goBack()
    }
  } catch (error) {
    console.error('Failed to load detail:', error)
    ElMessage.error(t('common.loadFailed'))
    goBack()
  } finally {
    loading.value = false
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

/* 统计卡片样式 */
.statistics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5e9 100%);
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 154, 68, 0.1);
}

.stat-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 12px;
  color: #009A44;
  font-size: 24px;
}

.stat-content {
  flex: 1;
}

.stat-label {
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
}

.stat-value {
  font-size: 24px;
  font-weight: 600;
  color: #009A44;
}
</style>
