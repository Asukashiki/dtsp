<template>
  <div class="dataset-detail-container">
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
          <h1 class="page-title">{{ $t('research.datasetCompilation.detail') }}</h1>
        </div>
        <div class="header-right">
          <el-button
              v-if="detailData && (detailData.datasetStatus === 'draft' || detailData.datasetStatus === 'rejected')"
              type="primary"
              @click="handleEdit"
          >
            <i class="ri-edit-line"></i>
            {{ $t('common.edit') }}
          </el-button>
        </div>
      </div>
    </div>

    <!-- 详情区域 -->
    <div v-loading="loading" class="detail-wrapper">
      <template v-if="detailData">
        <!-- 基础信息 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-information-line"></i>
            {{ $t('research.datasetCompilation.form.basicInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('research.datasetCompilation.columns.datasetCode') }}:</span>
              <span class="value">{{ detailData.datasetCode || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.datasetCompilation.form.status') }}:</span>
              <el-tag :type="getStatusType(detailData.status || detailData.datasetStatus)">
                {{ getStatusLabel(detailData.status || detailData.datasetStatus) }}
              </el-tag>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.datasetCompilation.form.trialId') }}:</span>
              <span class="value">{{ detailData.trialId || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.datasetCompilation.form.batchId') }}:</span>
              <span class="value">{{ detailData.batchId || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.datasetCompilation.form.versionNo') }}:</span>
              <span class="value">{{ detailData.versionNo || '1.0' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.datasetCompilation.form.recordCount') }}:</span>
              <span class="value">{{ detailData.recordCount || 0 }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.datasetCompilation.form.batchName') }}:</span>
              <span class="value">{{ detailData.batchName || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.datasetCompilation.form.cropType') }}:</span>
              <span class="value">{{ detailData.cropType || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.datasetCompilation.form.varietyName') }}:</span>
              <span class="value">{{ detailData.varietyName || '-' }}</span>
            </div>
            <div class="detail-item full-width">
              <span class="label">{{ $t('research.datasetCompilation.form.remark') }}:</span>
              <span class="value">{{ detailData.remark || '-' }}</span>
            </div>
          </div>
        </div>

        <!-- 编制信息 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-user-line"></i>
            {{ $t('research.datasetCompilation.form.compilationInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('research.datasetCompilation.form.compiledBy') }}:</span>
              <span class="value">{{ detailData.compiledByName || detailData.compiledBy || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.datasetCompilation.form.compiledAt') }}:</span>
              <span class="value">{{ detailData.compiledAt || '-' }}</span>
            </div>
          </div>
        </div>

        <!-- 数据统计 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-bar-chart-line"></i>
            {{ $t('research.datasetCompilation.form.statisticsInfo') }}
          </div>
          <div class="statistics-grid">
            <div class="stat-card">
              <div class="stat-icon">
                <i class="ri-flask-line"></i>
              </div>
              <div class="stat-content">
                <div class="stat-label">{{ $t('research.datasetCompilation.form.trialCount') }}</div>
                <div class="stat-value">{{ detailData.trialCount || 1 }}</div>
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

            <div class="stat-card">
              <div class="stat-icon">
                <i class="ri-bar-chart-box-line"></i>
              </div>
              <div class="stat-content">
                <div class="stat-label">{{ $t('research.datasetCompilation.form.statistics.totalCount') }}</div>
                <div class="stat-value">
                  {{ plotInfoList.length + farmingRecordList.length + agronomicTraitList.length + environmentDataList.length + yieldDataList.length + labTestList.length }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 数据详情Tab页 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-data-line"></i>
            {{ $t('research.datasetCompilation.form.dataDetails') }}
          </div>
          <el-tabs v-model="activeTab" type="card" style="margin-top: 12px">
            <!-- 地块及播种信息Tab -->
            <el-tab-pane :label="$t('research.datasetCompilation.tab.plot')" name="plotInfo">
              <el-table
                  :data="plotInfoList"
                  border
                  stripe
                  size="small"
                  style="width: 100%; margin-top: 12px"
                  :empty-text="$t('common.noData')"
              >
                <el-table-column prop="plotId" :label="$t('research.datasetCompilation.table.plot.plotId')" min-width="120" />
                <el-table-column prop="batchId" :label="$t('research.datasetCompilation.table.common.batchId')" min-width="100" />
                <el-table-column prop="trialId" :label="$t('research.datasetCompilation.table.common.trialId')" min-width="100" />
                <el-table-column prop="replicationNo" :label="$t('research.datasetCompilation.table.plot.replicationNo')" min-width="100" />
                <el-table-column prop="rowNo" :label="$t('research.datasetCompilation.table.plot.rowNo')" min-width="80" />
                <el-table-column prop="columnNo" :label="$t('research.datasetCompilation.table.plot.columnNo')" min-width="80" />
                <el-table-column prop="varietyCode" :label="$t('research.datasetCompilation.table.plot.varietyCode')" min-width="100" />
                <el-table-column prop="sowingDate" :label="$t('research.datasetCompilation.table.plot.sowingDate')" min-width="100">
                  <template #default="scope">
                    {{ scope.row.sowingDate || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="seedQuantity" :label="$t('research.datasetCompilation.table.plot.seedQuantity')" min-width="100">
                  <template #default="scope">
                    {{ scope.row.seedQuantity || 0 }}
                  </template>
                </el-table-column>
                <el-table-column prop="sowingMethod" :label="$t('research.datasetCompilation.table.plot.sowingMethod')" min-width="100">
                  <template #default="scope">
                    {{ scope.row.sowingMethod || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="plotAreaM2" :label="$t('research.datasetCompilation.table.plot.plotAreaM2')" min-width="100">
                  <template #default="scope">
                    {{ scope.row.plotAreaM2 || 0 }}
                  </template>
                </el-table-column>
                <el-table-column prop="gpsLat" :label="$t('research.datasetCompilation.table.plot.gpsLat')" min-width="100">
                  <template #default="scope">
                    {{ scope.row.gpsLat || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="gpsLong" :label="$t('research.datasetCompilation.table.plot.gpsLong')" min-width="100">
                  <template #default="scope">
                    {{ scope.row.gpsLong || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="region" :label="$t('research.datasetCompilation.table.plot.region')" min-width="100">
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
              <el-table
                  :data="farmingRecordList"
                  border
                  stripe
                  size="small"
                  style="width: 100%; margin-top: 12px"
                  :empty-text="$t('common.noData')"
              >
                <el-table-column prop="farmingRecordId" :label="$t('research.datasetCompilation.table.farming.farmingRecordId')" min-width="120" />
                <el-table-column prop="trialId" :label="$t('research.datasetCompilation.table.common.trialId')" min-width="100" />
                <el-table-column prop="batchId" :label="$t('research.datasetCompilation.table.common.batchId')" min-width="100" />
                <el-table-column prop="plotId" :label="$t('research.datasetCompilation.table.common.plotId')" min-width="100" />
                <el-table-column prop="activityDate" :label="$t('research.datasetCompilation.table.farming.activityDate')" min-width="120">
                  <template #default="scope">
                    {{ scope.row.activityDate || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="activityType" :label="$t('research.datasetCompilation.table.farming.activityType')" min-width="100">
                  <template #default="scope">
                    {{ scope.row.activityType || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="inputName" :label="$t('research.datasetCompilation.table.farming.inputName')" min-width="120">
                  <template #default="scope">
                    {{ scope.row.inputName || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="quantity" :label="$t('research.datasetCompilation.table.common.quantity')" min-width="80">
                  <template #default="scope">
                    {{ scope.row.quantity || 0 }}
                  </template>
                </el-table-column>
                <el-table-column prop="unit" :label="$t('research.datasetCompilation.table.common.unit')" min-width="80">
                  <template #default="scope">
                    {{ scope.row.unit || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="operatorId" :label="$t('research.datasetCompilation.table.farming.operatorId')" min-width="100">
                  <template #default="scope">
                    {{ scope.row.operatorId || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="operationDesc" :label="$t('research.datasetCompilation.table.farming.operationDesc')" min-width="150">
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
              <el-table
                  :data="agronomicTraitList"
                  border
                  stripe
                  size="small"
                  style="width: 100%; margin-top: 12px"
                  :empty-text="$t('common.noData')"
                  @row-click="handleAgronomicView"
              >
                <!-- 选择列 -->
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
                    {{ getLabelByValue('growth_cycle', row.growthStage) || row.growthStage || '-' }}
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
              <el-table
                  :data="environmentDataList"
                  border
                  stripe
                  size="small"
                  style="width: 100%; margin-top: 12px"
                  :empty-text="$t('common.noData')"
              >
                <el-table-column prop="envRecordId" :label="$t('research.datasetCompilation.table.environment.envRecordId')" min-width="120" />
                <el-table-column prop="trialId" :label="$t('research.datasetCompilation.table.common.trialId')" min-width="100" />
                <el-table-column prop="batchId" :label="$t('research.datasetCompilation.table.common.batchId')" min-width="100" />
                <el-table-column prop="plotId" :label="$t('research.datasetCompilation.table.common.plotId')" min-width="100" />
                <el-table-column prop="collectTime" :label="$t('research.datasetCompilation.table.environment.collectTime')" min-width="120">
                  <template #default="scope">
                    {{ scope.row.collectTime || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="dataType" :label="$t('research.datasetCompilation.table.environment.dataType')" min-width="100">
                  <template #default="scope">
                    {{ scope.row.dataType || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="soilPh" :label="$t('research.datasetCompilation.table.environment.soilPh')" min-width="100">
                  <template #default="scope">
                    {{ scope.row.soilPh || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="soilTemperature" :label="$t('research.datasetCompilation.table.environment.soilTemperature')" min-width="120">
                  <template #default="scope">
                    {{ scope.row.soilTemperature || 0 }}
                  </template>
                </el-table-column>
                <el-table-column prop="soilMoisture" :label="$t('research.datasetCompilation.table.environment.soilMoisture')" min-width="120">
                  <template #default="scope">
                    {{ scope.row.soilMoisture || 0 }}
                  </template>
                </el-table-column>
                <el-table-column prop="airTemperature" :label="$t('research.datasetCompilation.table.environment.airTemperature')" min-width="120">
                  <template #default="scope">
                    {{ scope.row.airTemperature || 0 }}
                  </template>
                </el-table-column>
                <el-table-column prop="airHumidity" :label="$t('research.datasetCompilation.table.environment.airHumidity')" min-width="120">
                  <template #default="scope">
                    {{ scope.row.airHumidity || 0 }}
                  </template>
                </el-table-column>
                <el-table-column prop="rainfall" :label="$t('research.datasetCompilation.table.environment.rainfall')" min-width="100">
                  <template #default="scope">
                    {{ scope.row.rainfall || 0 }}
                  </template>
                </el-table-column>
                <el-table-column prop="remarks" :label="$t('research.datasetCompilation.table.common.remarks')" min-width="150">
                  <template #default="scope">
                    {{ scope.row.remarks || '-' }}
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
              <el-table
                  :data="yieldDataList"
                  border
                  stripe
                  size="small"
                  style="width: 100%; margin-top: 12px"
                  :empty-text="$t('common.noData')"
              >
                <el-table-column prop="id" :label="$t('research.datasetCompilation.table.yield.inspectionId')" min-width="120" />
                <el-table-column prop="trialId" :label="$t('research.datasetCompilation.table.common.trialId')" min-width="100" />
                <el-table-column prop="batchId" :label="$t('research.datasetCompilation.table.common.batchId')" min-width="100" />
                <el-table-column prop="plotId" :label="$t('research.datasetCompilation.table.common.plotId')" min-width="100" />
                <el-table-column prop="plotAreaM2" :label="$t('research.datasetCompilation.table.yield.plotAreaM2')" min-width="100">
                  <template #default="scope">
                    {{ scope.row.plotAreaM2 || 0 }}
                  </template>
                </el-table-column>
                <el-table-column prop="inspectionDate" :label="$t('research.datasetCompilation.table.yield.inspectionDate')" min-width="120">
                  <template #default="scope">
                    {{ scope.row.inspectionDate || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="inspectionType" :label="$t('research.datasetCompilation.table.yield.inspectionType')" min-width="100">
                  <template #default="scope">
                    {{ scope.row.inspectionType || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="grainWeightKg" :label="$t('research.datasetCompilation.table.yield.grainWeightKg')" min-width="100">
                  <template #default="scope">
                    {{ scope.row.grainWeightKg || 0 }}
                  </template>
                </el-table-column>
                <el-table-column prop="yieldQtPerHa" :label="$t('research.datasetCompilation.table.yield.yieldQtPerHa')" min-width="100">
                  <template #default="scope">
                    {{ scope.row.yieldQtPerHa || 0 }}
                  </template>
                </el-table-column>
                <el-table-column prop="moistureContent" :label="$t('research.datasetCompilation.table.yield.moistureContent')" min-width="100">
                  <template #default="scope">
                    {{ scope.row.moistureContent || 0 }}
                  </template>
                </el-table-column>
                <el-table-column prop="scoreValue" :label="$t('research.datasetCompilation.table.yield.scoreValue')" min-width="100">
                  <template #default="scope">
                    {{ scope.row.scoreValue || 0 }}
                  </template>
                </el-table-column>
                <el-table-column prop="harvestDate" :label="$t('research.datasetCompilation.table.yield.harvestDate')" min-width="120">
                  <template #default="scope">
                    {{ scope.row.harvestDate || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="recorderName" :label="$t('research.datasetCompilation.table.yield.recorderName')" min-width="100">
                  <template #default="scope">
                    {{ scope.row.recorderName || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="createdTime" :label="$t('research.datasetCompilation.table.common.createdTime')" min-width="150">
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
              <el-table
                  :data="labTestList"
                  border
                  stripe
                  size="small"
                  style="width: 100%; margin-top: 12px"
                  :empty-text="$t('common.noData')"
              >
                <el-table-column prop="id" :label="$t('research.datasetCompilation.table.lab.testId')" min-width="120" />
                <el-table-column prop="trialId" :label="$t('research.datasetCompilation.table.common.trialId')" min-width="100" />
                <el-table-column prop="batchId" :label="$t('research.datasetCompilation.table.common.batchId')" min-width="100" />
                <el-table-column prop="sampleId" :label="$t('research.datasetCompilation.table.lab.sampleId')" min-width="100">
                  <template #default="scope">
                    {{ scope.row.sampleId || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="sampleType" :label="$t('research.datasetCompilation.table.lab.sampleType')" min-width="100">
                  <template #default="scope">
                    {{ scope.row.sampleType || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="germinationRate" :label="$t('research.datasetCompilation.table.lab.germinationRate')" min-width="100">
                  <template #default="scope">
                    {{ scope.row.germinationRate || 0 }}
                  </template>
                </el-table-column>
                <el-table-column prop="purityPercent" :label="$t('research.datasetCompilation.table.lab.purityPercent')" min-width="100">
                  <template #default="scope">
                    {{ scope.row.purityPercent || 0 }}
                  </template>
                </el-table-column>
                <el-table-column prop="moistureContentPercent" :label="$t('research.datasetCompilation.table.lab.moistureContentPercent')" min-width="120">
                  <template #default="scope">
                    {{ scope.row.moistureContentPercent || 0 }}
                  </template>
                </el-table-column>
                <el-table-column prop="proteinPercent" :label="$t('research.datasetCompilation.table.lab.proteinPercent')" min-width="120">
                  <template #default="scope">
                    {{ scope.row.proteinPercent || 0 }}
                  </template>
                </el-table-column>
                <el-table-column prop="testDate" :label="$t('research.datasetCompilation.table.lab.testDate')" min-width="120">
                  <template #default="scope">
                    {{ scope.row.testDate || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="testOrganization" :label="$t('research.datasetCompilation.table.lab.testOrganization')" min-width="120">
                  <template #default="scope">
                    {{ scope.row.testOrganization || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="testerName" :label="$t('research.datasetCompilation.table.lab.testerName')" min-width="100">
                  <template #default="scope">
                    {{ scope.row.testerName || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="passFailFlag" :label="$t('research.datasetCompilation.table.lab.passFailFlag')" min-width="100">
                  <template #default="scope">
                    <el-tag :type="scope.row.passFailFlag === 'pass' ? 'success' : 'danger'">
                      {{ scope.row.passFailFlag === 'pass' ? $t('research.datasetCompilation.table.lab.pass') : (scope.row.passFailFlag === 'fail' ? $t('research.datasetCompilation.table.lab.fail') : '-') }}
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

        <!-- 提交信息 -->
        <div v-if="detailData.submitTime" class="detail-section">
          <div class="section-title">
            <i class="ri-send-plane-line"></i>
            {{ $t('research.datasetCompilation.form.submitInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('research.datasetCompilation.form.submitTime') }}:</span>
              <span class="value">{{ detailData.submitTime }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.datasetCompilation.form.submitBy') }}:</span>
              <span class="value">{{ detailData.submitByName || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.datasetCompilation.form.submitOrgName') }}:</span>
              <span class="value">{{ detailData.submitOrgName || '-' }}</span>
            </div>
          </div>
        </div>

        <!-- 审核信息 -->
        <div v-if="detailData.auditTime" class="detail-section">
          <div class="section-title">
            <i class="ri-shield-check-line"></i>
            {{ $t('research.datasetCompilation.form.auditInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('research.datasetCompilation.form.auditTime') }}:</span>
              <span class="value">{{ detailData.auditTime }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.datasetCompilation.form.auditBy') }}:</span>
              <span class="value">{{ detailData.auditByName || '-' }}</span>
            </div>
            <div v-if="detailData.auditOpinion" class="detail-item full-width">
              <span class="label">{{ $t('research.datasetCompilation.form.auditOpinion') }}:</span>
              <span class="value">{{ detailData.auditOpinion }}</span>
            </div>
          </div>
        </div>

        <!-- 创建信息 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-time-line"></i>
            {{ $t('research.datasetCompilation.form.creationInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('research.datasetCompilation.form.createdTime') }}:</span>
              <span class="value">{{ detailData.createdTime }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.datasetCompilation.form.createdBy') }}:</span>
              <span class="value">{{ detailData.createdByName || '-' }}</span>
            </div>
            <div v-if="detailData.updatedTime" class="detail-item">
              <span class="label">{{ $t('research.datasetCompilation.form.updatedTime') }}:</span>
              <span class="value">{{ detailData.updatedTime }}</span>
            </div>
            <div v-if="detailData.updatedBy" class="detail-item">
              <span class="label">{{ $t('research.datasetCompilation.form.updatedBy') }}:</span>
              <span class="value">{{ detailData.updatedBy || '-' }}</span>
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
const { getLabelByValue } = useDict(['agronomic_trait_name', 'growth_cycle', 'flow_status'])

const loading = ref(false)
const detailData = ref(null)
const activeTab = ref('plotInfo') // 默认激活第一个Tab

// 数据列表 Ref
const plotInfoList = ref([])           // 地块及播种信息
const farmingRecordList = ref([])     // 农事记录
const agronomicTraitList = ref([])    // 农艺性状
const environmentDataList = ref([])   // 环境监测数据
const labTestList = ref([])           // 实验室测试数据
const yieldDataList = ref([])         // 田间检查/产量数据

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
        return ({ data: { list: [], total: 0 } })
      }),
      getYieldDataList({ pageNum: 1, pageSize: 9999, trialId }).catch(err => {
        console.error('获取产量数据失败:', err)
        return ({ msg: "操作失败", code: 500, data: [] })
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
    labTestList.value = (labRes?.data?.list || []).map(item => ({
      ...item,
      remark: item.remark || ''
    }))
    yieldDataList.value = (yieldRes?.data || []).map(item => ({
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
          const labTestRemarkMap = new Map(labTestRemarks.map(r => [r.id, r.remark]))
          labTestList.value = labTestList.value.map(item => ({
            ...item,
            remark: labTestRemarkMap.get(item.id) || item.remark
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

// 编辑
const handleEdit = () => {
  router.push({ name: 'DatasetCompilationEdit', params: { id: route.params.id } })
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

<style scoped>
.dataset-detail-container {
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
  flex-direction: column;
}

.detail-item .label {
  font-weight: 500;
  color: #6b7280;
  min-width: 160px;
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

/* ========== Tab 页样式优化 ========== */
.dataset-detail-container :deep(.el-tabs) {
  --el-tabs-header-text-color: #6b7280;
  --el-tabs-active-text-color: #009A44;
  --el-tabs-border-color: #e5e7eb;
  --el-tabs-card-header-background: #f9fafb;
}

.dataset-detail-container :deep(.el-tabs__header) {
  margin-bottom: 16px;
}

.dataset-detail-container :deep(.el-tabs__item) {
  padding: 0 20px;
  height: 40px;
  line-height: 40px;
}

.dataset-detail-container :deep(.el-tabs__item.is-active) {
  background-color: #f0fdf4;
  border-color: #009A44;
}

.dataset-detail-container :deep(.el-tabs--card > .el-tabs__header .el-tabs__item.is-active) {
  border-bottom-color: #009A44;
}

.dataset-detail-container :deep(.el-tabs__ink-bar) {
  height: 3px;
  background-color: #009A44;
}

/* 表格样式适配 */
.dataset-detail-container :deep(.el-table) {
  --el-table-header-text-color: #009A44;
  --el-table-row-hover-bg-color: #f0fdf4;
}

.dataset-detail-container :deep(.el-table th) {
  background-color: #f8fff9 !important;
}

.dataset-detail-container :deep(.el-table td) {
  border-color: #e8f5ec;
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

  .statistics-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .stat-card {
    padding: 12px;
  }

  .stat-icon {
    width: 40px;
    height: 40px;
  }

  .stat-icon i {
    font-size: 20px;
  }

  .stat-label {
    font-size: 12px;
  }

  .stat-value {
    font-size: 20px;
  }

  /* Tab 页移动端适配 */
  .dataset-detail-container :deep(.el-tabs__nav) {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .dataset-detail-container :deep(.el-tabs__item) {
    padding: 0 16px;
    height: 36px;
    line-height: 36px;
    font-size: 13px;
    white-space: nowrap;
  }

  /* 表格移动端适配 */
  .dataset-detail-container :deep(.el-table) {
    font-size: 12px;
  }

  .dataset-detail-container :deep(.el-table th) {
    padding: 8px 4px;
  }

  .dataset-detail-container :deep(.el-table td) {
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