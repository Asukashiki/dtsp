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
            <h1 class="page-title">
              {{ isEdit ? $t('research.datasetCompilation.edit') : $t('research.datasetCompilation.add') }}
            </h1>
          </div>
        </div>
      </div>

      <!-- 表单区域 -->
      <div class="content-wrapper">
        <el-form
          ref="formRef"
          v-loading="loading"
          :model="formData"
          :rules="rules"
          label-position="right"
          label-width="200px"
          class="dataset-form"
        >
          <!-- 基础信息 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-information-line"></i>
                <span>{{ $t('research.datasetCompilation.form.basicInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.datasetCompilation.form.trialId')" prop="trialId">
                    <el-select
                      v-model="formData.trialId"
                      :placeholder="$t('research.datasetCompilation.placeholder.trialId')"
                      :disabled="!isEditable"
                      filterable
                      clearable
                      @change="handleTrialChange"
                    >
                      <el-option
                        v-for="item in trialOptions"
                        :key="item.trialId"
                        :label="`${item.trialId} - ${item.trialName}`"
                        :value="item.trialId"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.datasetCompilation.form.batchId')" prop="batchId">
                    <el-input
                      v-model="formData.batchId"
                      :placeholder="$t('research.datasetCompilation.placeholder.batchIdAuto')"
                      disabled
                      readonly
                    >
                      <template #suffix>
                        <el-tooltip content="$t('research.datasetCompilation.tooltip.batchIdAuto')" placement="top">
                          <i class="ri-information-line"></i>
                        </el-tooltip>
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col v-if="false" :xs="24" :sm="12">
                  <el-form-item :label="$t('research.datasetCompilation.form.compiledBy')" prop="compiledBy">
                    <el-input
                      v-model="formData.compiledByName"
                      :placeholder="$t('research.datasetCompilation.placeholder.compiledBy')"
                      disabled
                      readonly
                    >
                      <template #suffix>
                        <el-tooltip content="$t('research.datasetCompilation.tooltip.compiledByAuto')" placement="top">
                          <i class="ri-user-line"></i>
                        </el-tooltip>
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col v-if="false" :xs="24" :sm="12">
                  <el-form-item :label="$t('research.datasetCompilation.form.compiledAt')" prop="compiledAt">
                    <el-date-picker
                      v-model="formData.compiledAt"
                      type="datetime"
                      :placeholder="$t('research.datasetCompilation.placeholder.compiledAt')"
                      :disabled="!isEditable"
                      value-format="YYYY-MM-DD HH:mm:ss"
                      style="width: 100%"
                    />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.datasetCompilation.form.recordCount')" prop="recordCount">
                    <el-input-number
                      v-model="recordCountComputed"
                      :min="0"
                      :placeholder="$t('research.datasetCompilation.placeholder.recordCount')"
                      disabled
                      readonly
                      style="width: 100%"
                    />
                    <template #extra>
                      <div style="font-size: 12px; color: #909399; margin-top: 4px;">
                        <i class="ri-information-line"></i>
                        {{ $t('research.datasetCompilation.placeholder.recordCountAutoCalculate') }}
                      </div>
                    </template>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.datasetCompilation.form.status')" prop="status">
                    <el-select
                      v-model="formData.status"
                      :placeholder="$t('research.datasetCompilation.placeholder.status')"
                      disabled
                      style="width: 100%"
                    >
                      <el-option :label="$t('research.datasetCompilation.status.draft')" value="Draft" />
                      <el-option :label="$t('research.datasetCompilation.status.submitted')" value="Submitted" />
                      <el-option :label="$t('research.datasetCompilation.status.approved')" value="Approved" />
                      <el-option :label="$t('research.datasetCompilation.status.rejected')" value="Rejected" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.datasetCompilation.form.cropType')" prop="cropType">
                    <el-input
                      :value="getCropTypeDisplay(cropTypeOptions.value, formData.cropType)"
                      :placeholder="$t('research.datasetCompilation.placeholder.cropType')"
                      disabled
                      readonly
                    >
                      <template #suffix>
                        <el-tooltip content="$t('research.datasetCompilation.tooltip.cropTypeAuto')" placement="top">
                          <i class="ri-information-line"></i>
                        </el-tooltip>
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.datasetCompilation.form.varietyName')" prop="varietyName">
                    <el-input
                      v-model="formData.varietyName"
                      :placeholder="$t('research.datasetCompilation.placeholder.varietyName')"
                      disabled
                      readonly
                    >
                      <template #suffix>
                        <el-tooltip content="$t('research.datasetCompilation.tooltip.varietyNameAuto')" placement="top">
                          <i class="ri-information-line"></i>
                        </el-tooltip>
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24">
                  <el-form-item :label="$t('research.datasetCompilation.form.remark')" prop="remark">
                    <el-input
                      v-model="formData.remark"
                      type="textarea"
                      :rows="3"
                      :placeholder="$t('research.datasetCompilation.placeholder.remark')"
                      :disabled="!isEditable"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- 编辑时显示统计信息 -->
          <div v-if="isEdit" class="info-card">
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
                    <i class="ri-flask-line"></i>
                  </div>
                  <div class="stat-content">
                    <div class="stat-label">{{ $t('research.datasetCompilation.form.statistics.trialCount') }}</div>
                    <div class="stat-value">{{ statistics.trialCount }}</div>
                  </div>
                </div>
                <div class="stat-card">
                  <div class="stat-icon">
                    <i class="ri-map-line"></i>
                  </div>
                  <div class="stat-content">
                    <div class="stat-label">{{ $t('research.datasetCompilation.form.statistics.plotCount') }}</div>
                    <div class="stat-value">{{ statistics.plotCount }}</div>
                  </div>
                </div>
                <div class="stat-card">
                  <div class="stat-icon">
                    <i class="ri-calendar-todo-line"></i>
                  </div>
                  <div class="stat-content">
                    <div class="stat-label">{{ $t('research.datasetCompilation.form.statistics.farmingCount') }}</div>
                    <div class="stat-value">{{ statistics.farmingCount }}</div>
                  </div>
                </div>
                <div class="stat-card">
                  <div class="stat-icon">
                    <i class="ri-plant-line"></i>
                  </div>
                  <div class="stat-content">
                    <div class="stat-label">{{ $t('research.datasetCompilation.form.statistics.agronomicCount') }}</div>
                    <div class="stat-value">{{ statistics.agronomicCount }}</div>
                  </div>
                </div>
                <div class="stat-card">
                  <div class="stat-icon">
                    <i class="ri-cloud-line"></i>
                  </div>
                  <div class="stat-content">
                    <div class="stat-label">{{ $t('research.datasetCompilation.form.statistics.envCount') }}</div>
                    <div class="stat-value">{{ statistics.envCount }}</div>
                  </div>
                </div>
                <div class="stat-card">
                  <div class="stat-icon">
                    <i class="ri-scissors-line"></i>
                  </div>
                  <div class="stat-content">
                    <div class="stat-label">{{ $t('research.datasetCompilation.form.statistics.yieldCount') }}</div>
                    <div class="stat-value">{{ statistics.yieldCount }}</div>
                  </div>
                </div>
                <div class="stat-card">
                  <div class="stat-icon">
                    <i class="ri-test-tube-line"></i>
                  </div>
                  <div class="stat-content">
                    <div class="stat-label">{{ $t('research.datasetCompilation.form.statistics.labCount') }}</div>
                    <div class="stat-value">{{ statistics.labCount }}</div>
                  </div>
                </div>
              </div>
              <el-alert
                v-if="formData.datasetStatus === 'draft'"
                :title="$t('research.datasetCompilation.message.submitRequirement')"
                type="info"
                :closable="false"
                show-icon
                style="margin-top: 16px"
              />
            </div>
          </div>

          <!-- 状态提示 -->
          <div v-if="isEdit && !isEditable" class="info-card">
            <div class="card-body">
              <el-alert
                :title="$t('research.datasetCompilation.message.cannotEditApproved')"
                type="warning"
                :closable="false"
                show-icon
              />
            </div>
          </div>

          <!-- 数据模块Tab页 -->
          <div class="info-card" v-if="formData.trialId">
            <div class="card-body">
              <el-tabs v-model="activeTab" type="card" class="data-tabs">
            <!-- 地块与播种信息 -->
            <el-tab-pane :label="$t('research.datasetCompilation.tab.plot')" name="plot">
              <el-table
                  :data="plotInfoList"
                  border
                  stripe
                  size="small"
                  style="width: 100%; margin-top: 12px"
                  :empty-text="''"
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
                <!-- 备注列 -->
                <el-table-column :label="$t('research.datasetCompilation.table.common.remark')" min-width="180">
                  <template #default="scope">
                    <el-input
                        v-model="scope.row.remark"
                        type="textarea"
                        :rows="2"
                        :placeholder="$t('research.datasetCompilation.placeholder.remarkInput')"
                        :disabled="!isEditable"
                        resize="none"
                    />
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>

            <!-- 农事记录数据采集 -->
            <el-tab-pane :label="$t('research.datasetCompilation.tab.farming')" name="farming">
              <el-table
                  :data="farmingRecordList"
                  border
                  stripe
                  size="small"
                  style="width: 100%; margin-top: 12px"
                  :empty-text="''"
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
                <!-- 备注列 -->
                <el-table-column :label="$t('research.datasetCompilation.table.common.remark')" min-width="180">
                  <template #default="scope">
                    <el-input
                        v-model="scope.row.remark"
                        type="textarea"
                        :rows="2"
                        :placeholder="$t('research.datasetCompilation.placeholder.remarkInput')"
                        :disabled="!isEditable"
                        resize="none"
                    />
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>

            <!-- 农艺性状数据采集（与审核页面保持一致） -->
            <el-tab-pane :label="$t('research.datasetCompilation.tab.agronomic')" name="agronomic">
              <el-table
                  :data="agronomicTraitList"
                  border
                  stripe
                  size="small"
                  style="width: 100%; margin-top: 12px"
                  :empty-text="''"
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
                <!-- 备注列（保留输入功能） -->
                <el-table-column :label="$t('research.datasetCompilation.table.common.remark')" min-width="180">
                  <template #default="scope">
                    <el-input
                        v-model="scope.row.remark"
                        type="textarea"
                        :rows="2"
                        :placeholder="$t('research.datasetCompilation.placeholder.remarkInput')"
                        :disabled="!isEditable"
                        resize="none"
                    />
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>

            <!-- 环境监测数据 -->
            <el-tab-pane :label="$t('research.datasetCompilation.tab.environment')" name="environment">
              <el-table
                  :data="environmentDataList"
                  border
                  stripe
                  size="small"
                  style="width: 100%; margin-top: 12px"
                  :empty-text="''"
              >
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
                <!-- 备注列 -->
                <el-table-column :label="$t('research.datasetCompilation.table.common.remark')" min-width="180">
                  <template #default="scope">
                    <el-input
                        v-model="scope.row.remark"
                        type="textarea"
                        :rows="2"
                        :placeholder="$t('research.datasetCompilation.placeholder.remarkInput')"
                        :disabled="!isEditable"
                        resize="none"
                    />
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>

            <!-- 田间检查数据采集 -->
            <el-tab-pane :label="$t('research.datasetCompilation.tab.yield')" name="yield">
              <el-table
                  :data="yieldDataList"
                  border
                  stripe
                  size="small"
                  style="width: 100%; margin-top: 12px"
                  :empty-text="''"
              >
                <el-table-column prop="id" :label="$t('research.datasetCompilation.table.yield.inspectionId')" min-width="120" />
                <el-table-column prop="trialId" :label="$t('research.datasetCompilation.table.common.trialId')" min-width="100" />
                <el-table-column prop="batchId" :label="$t('research.datasetCompilation.table.common.batchId')" min-width="100" />
                <el-table-column prop="plotId" :label="$t('research.datasetCompilation.table.common.plotId')" min-width="100" />
                <!-- <el-table-column prop="plotAreaM2" :label="$t('research.datasetCompilation.table.plot.plotAreaM2')" min-width="100">
                  <template #default="scope">
                    {{ scope.row.plotAreaM2 || 0 }}
                  </template>
                </el-table-column> -->
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
                <!-- <el-table-column prop="grainWeightKg" :label="$t('research.datasetCompilation.table.yield.grainWeightKg')" min-width="100">
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
                </el-table-column> -->
                <el-table-column prop="scoreValue" :label="$t('research.datasetCompilation.table.yield.scoreValue')" min-width="100">
                  <template #default="scope">
                    {{ scope.row.scoreValue || 0 }}
                  </template>
                </el-table-column>
                <!-- <el-table-column prop="harvestDate" :label="$t('research.datasetCompilation.table.yield.harvestDate')" min-width="120">
                  <template #default="scope">
                    {{ scope.row.harvestDate || '-' }}
                  </template>
                </el-table-column> -->
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
                <!-- 备注列 -->
                <el-table-column :label="$t('research.datasetCompilation.table.common.remark')" min-width="180">
                  <template #default="scope">
                    <el-input
                        v-model="scope.row.remark"
                        type="textarea"
                        :rows="2"
                        :placeholder="$t('research.datasetCompilation.placeholder.remarkInput')"
                        :disabled="!isEditable"
                        resize="none"
                    />
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>

            <!-- 实验室测试数据采集 -->
            <el-tab-pane :label="$t('research.datasetCompilation.tab.lab')" name="lab">
              <el-table
                  :data="labTestList"
                  border
                  stripe
                  size="small"
                  style="width: 100%; margin-top: 12px"
                  :empty-text="''"
              >
                <el-table-column prop="dataId" :label="$t('research.datasetCompilation.table.lab.testId')" min-width="120" />
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
                <!-- 备注列 -->
                <el-table-column :label="$t('research.datasetCompilation.table.common.remark')" min-width="180">
                  <template #default="scope">
                    <el-input
                        v-model="scope.row.remark"
                        type="textarea"
                        :rows="2"
                        :placeholder="$t('research.datasetCompilation.placeholder.remarkInput')"
                        :disabled="!isEditable"
                        resize="none"
                    />
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
            </div>
          </div>

          <!-- 操作按钮 -->
          <div class="form-actions">
            <el-button @click="goBack">
              {{ $t('common.cancel') }}
            </el-button>
            <el-button v-if="isEditable" type="primary" @click="handleSubmit">
              <i class="ri-save-line"></i>
              {{ isEdit ? $t('common.save') : $t('research.datasetCompilation.compile') }}
            </el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { useDict } from '@/hooks/useDict' // 新增字典hook
import { getDatasetById, addDataset, updateDataset } from '@/api/dataset'
import {
  getTrialBasicList, getTrialBasicInfo,
  getPlotInfoList, getFarmingRecordList, getEnvironmentDataList,
  getTraitRecordList, getAgronomicTraitAuditList, getFieldInspectionList // 替换原有的getAgronomicTraitList
} from '@/api/breedingData'
import { getLabTestList, getLabTestAuditList } from '@/api/labTest'
import { getYieldDataList } from '@/api/yieldData'
import { getEnvironmentNewDataPage } from '@/api/environment-new-data'
import { useUserStore } from '@/store'
import { loadSeedCropTypeOptions, resolveCropTypeValue, resolveCropTypeLabel, getCropTypeDisplay } from '@/utils/researchCropType'

const route = useRoute()
const router = useRouter()
const { t, locale } = useI18n()
const userStore = useUserStore()
const { getLabelByValue } = useDict(['growth_cycle', 'crop_type', 'env_parameter_code']) // 新增字典解析
const cropTypeOptions = ref([])

const formRef = ref(null)
const loading = ref(false)
const isEdit = computed(() => !!route.params.id)
const trialOptions = ref([])
// Tab页激活项
const activeTab = ref('plot')

// 数据列表 Ref
const plotInfoList = ref([])           // 地块及播种信息
const farmingRecordList = ref([])     // 农事记录
const agronomicTraitList = ref([])    // 农艺性状
const environmentDataList = ref([])   // 环境监测数据
const labTestList = ref([])           // 实验室测试数据
const yieldDataList = ref([])         // 田间检查/产量数据

const formData = reactive({
  id: '',
  trialId: '',
  batchId: '',
  versionNo: null,
  compiledBy: '',
  compiledByName: '',
  compiledAt: '',
  recordCount: 0,
  status: 'Draft',
  cropType: '',
  varietyName: '',
  remark: '',
  datasetStatus: 'draft',
  // 移除原有的统计字段，改为computed实时计算
  moduleRemarks: {}
})

const isEditable = computed(() => {
  if (!isEdit.value) return true
  return formData.datasetStatus === 'draft' || formData.datasetStatus === 'rejected'
})

// 实时统计数据计算（核心修改）
const statistics = computed(() => {
  return {
    trialCount: 1, // 试验记录数固定为1
    plotCount: plotInfoList.value.length, // 地块与播种信息数
    farmingCount: farmingRecordList.value.length, // 农事记录数据数
    agronomicCount: agronomicTraitList.value.length, // 农艺性状数据数
    envCount: environmentDataList.value.length, // 环境监测数据数
    yieldCount: yieldDataList.value.length, // 田间检查数据数
    labCount: labTestList.value.length, // 实验室测试数据数
    totalCount: plotInfoList.value.length + farmingRecordList.value.length + agronomicTraitList.value.length + environmentDataList.value.length + yieldDataList.value.length + labTestList.value.length
  }
})

// 总记录数计算
const recordCountComputed = computed({
  get() {
    return statistics.value.totalCount
  },
  set(value) {}
})

const rules = computed(() => ({
  trialId: [
    { required: true, message: t('research.datasetCompilation.rules.trialIdRequired'), trigger: 'change' }
  ],
  batchId: [
    { required: true, message: t('research.datasetCompilation.rules.batchIdRequired'), trigger: 'blur' }
  ],
  compiledBy: [
    { required: true, message: t('research.datasetCompilation.rules.compiledByRequired'), trigger: 'blur' }
  ],
  compiledAt: [
    { required: true, message: t('research.datasetCompilation.rules.compiledAtRequired'), trigger: 'change' }
  ],
  cropType: [
    { required: true, message: t('research.datasetCompilation.rules.cropTypeRequired'), trigger: 'blur' }
  ],
  varietyName: [
    { required: true, message: t('research.datasetCompilation.rules.varietyNameRequired'), trigger: 'blur' }
  ]
}))

const loadTrialOptions = async () => {
  try {
    const res = await getTrialBasicList({ pageNum: 1, pageSize: 1000 })
    if (res && res.rows) {
      trialOptions.value = res.rows
    }
  } catch (error) {
    console.error('Failed to load trial options:', error)
  }
}

const handleTrialChange = async (trialId) => {
  if (!trialId) {
    formData.batchId = ''
    formData.cropType = ''
    formData.varietyName = ''
    // 清空所有数据列表
    plotInfoList.value = []
    farmingRecordList.value = []
    agronomicTraitList.value = []
    environmentDataList.value = []
    labTestList.value = []
    yieldDataList.value = []
    return
  }

  try {
    console.log('获取试验信息，trialId:', trialId)
    const res = await getTrialBasicInfo(trialId)
    console.log('试验信息API响应:', res)
    if (res && res.data) {
      formData.batchId = res.data.batchId || ''
      if (res.data.cropType) {
        formData.cropType = resolveCropTypeValue(cropTypeOptions.value, res.data.cropType)
      }
      if (res.data.varietyName) {
        formData.varietyName = res.data.varietyName
      }
      if (res.data.batchId) {
        console.log('检测到批次ID，尝试获取批次详细信息')
        await loadBatchInfo(res.data.batchId)
      } else {
        console.warn('试验信息中没有批次ID')
      }
      await loadStatisticsData(trialId)
      if (res.data.locationId) {
        console.log('试验地点:', res.data.locationId)
      }
      if (res.data.year) {
        console.log('试验年份:', res.data.year)
      }
      if (res.data.season) {
        console.log('试验季节:', res.data.season)
      }
    }
  } catch (error) {
    console.error('Failed to get trial info:', error)
    ElMessage.warning(t('research.datasetCompilation.message.getTrialInfoFailed'))
  }
}

const loadBatchInfo = async (batchId) => {
  try {
    console.log('开始获取批次信息，batchId:', batchId)
    const { getBreedingBatchInfo } = await import('@/api/breedingData')
    const res = await getBreedingBatchInfo(batchId)
    console.log('批次信息API响应:', res)
    if (res && res.data) {
      if (res.data.cropType && !formData.cropType) {
        formData.cropType = resolveCropTypeValue(cropTypeOptions.value, res.data.cropType)
        console.log('作物类型已填充:', res.data.cropType)
      }
      if (res.data.varietyName && !formData.varietyName) {
        formData.varietyName = res.data.varietyName
        console.log('品种名称已填充:', res.data.varietyName)
      }
    } else {
      console.warn('批次信息响应无数据')
    }
  } catch (error) {
    console.error('获取批次信息失败:', error)
  }
}

const loadStatisticsData = async (trialId) => {
  if (!trialId) {
    console.warn('试验ID为空，无法加载统计数据')
    return
  }

  try {
    console.log('开始统计数据，trialId:', trialId)
    // 批量请求所有数据接口
    const [
      plotRes, farmingRes, agronomicRes, environmentDataRes, labRes, yieldRes
    ] = await Promise.all([
      // 地块与播种信息: auditStatus=S2
      getPlotInfoList({ pageNum: 1, pageSize: 9999, trialId, auditStatus: 'S2' }).catch(err => {
        console.error('获取地块及播种信息失败:', err)
        return { rows: [], total: 0 }
      }),
      // 农事记录: workflowStatus=S2
      getFarmingRecordList({ pageNum: 1, pageSize: 9999, trialId, workflowStatus: 'S2' }).catch(err => {
        console.error('获取农事记录失败:', err)
        return { rows: [], total: 0 }
      }),
      // 农艺性状: auditStatus=approved
      getAgronomicTraitAuditList({ pageNum: 1, pageSize: 9999, trialId, auditStatus: 'approved' }).catch(err => {
        console.error('获取农艺性状数据失败:', err)
        return { rows: [], total: 0 }
      }),
      // 环境检测: workflowStatus=S2
      getEnvironmentDataList({ pageNum: 1, pageSize: 9999, trialId, workflowStatus: 'S2' }).catch(err => {
        console.error('获取环境监测数据失败:', err)
        return { rows: [], total: 0 }
      }),
      // 实验室测试: workflowStatus=S2, auditCanceled=0
      getLabTestAuditList({ pageNum: 1, pageSize: 9999, trialId, workflowStatus: 'S2', auditCanceled: 0 }).catch(err => {
        console.error('获取实验室测试数据失败:', err)
        return { rows: [], total: 0 }
      }),
      // 田间检查: status=1, workflowStatus=S1
      getFieldInspectionList({ pageNum: 1, pageSize: 9999, trialId, status: 1, workflowStatus: 'S1' }).catch(err => {
        console.error('获取田间检查数据失败:', err)
        return { rows: [], total: 0 }
      })
    ])

    // 赋值数据列表 + 初始化备注字段（避免undefined）
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

    console.log('加载数据完成:', {
      plotInfoList: plotInfoList.value,
      farmingRecordList: farmingRecordList.value,
      agronomicTraitList: agronomicTraitList.value,
      environmentDataList: environmentDataList.value,
      labTestList: labTestList.value,
      yieldDataList: yieldDataList.value
    })

    // 若为编辑状态，回显已存储的备注
    if (isEdit.value && formData.moduleRemarks) {
      const { plotRemarks, farmingRemarks, agronomicRemarks, environmentRemarks, yieldRemarks, labTestRemarks } = formData.moduleRemarks

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

      // 农艺性状备注回显（适配新的recordId字段）
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
    }

  } catch (error) {
    console.error('统计数据加载失败:', error)
    ElMessage.warning(t('research.datasetCompilation.message.statisticsFailed'))
    // 清空所有数据
    plotInfoList.value = []
    farmingRecordList.value = []
    agronomicTraitList.value = []
    environmentDataList.value = []
    labTestList.value = []
    yieldDataList.value = []
  }
}

const initCurrentUser = async () => {
  try {
    const userInfoStr = localStorage.getItem('userInfo')
    console.log('从localStorage读取userInfo:', userInfoStr)
    if (userInfoStr) {
      const userInfo = JSON.parse(userInfoStr)
      const user = userInfo.user || userInfo
      formData.compiledBy = user.userId || user.id || user.user_id || user.USER_ID || ''
      formData.compiledByName = user.userName || user.name || user.nickName || user.realName || user.USER_NAME || ''
    } else {
      console.warn('localStorage中没有userInfo')
      if (!userStore.hasUserInfo) {
        await userStore.fetchUserInfo()
      }
      const userInfo = userStore.userInfo
      if (userInfo && Object.keys(userInfo).length > 0) {
        const user = userInfo.user || userInfo
        formData.compiledBy = user.userId || user.id || user.user_id || user.USER_ID || ''
        formData.compiledByName = user.userName || user.name || user.nickName || user.realName || user.USER_NAME || ''
      }
    }
  } catch (error) {
    console.error('初始化用户信息失败:', error)
  }
  if (!isEdit.value) {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    formData.compiledAt = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
}

const loadDetail = async () => {
  loading.value = true
  try {
    const res = await getDatasetById(route.params.id)
    if (res.code === 200 && res.data) {
      Object.assign(formData, {
        ...res.data,
        cropType: resolveCropTypeValue(cropTypeOptions.value, res.data.cropType)
      })
      // 解析存储的模块备注
      if (res.data.moduleRowRemarks && typeof res.data.moduleRowRemarks === 'string') {
        formData.moduleRemarks = JSON.parse(res.data.moduleRowRemarks)
      } else {
        formData.moduleRemarks = res.data.moduleRowRemarks || {}
      }
      if (formData.trialId) {
        await loadStatisticsData(formData.trialId)
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

const handleSubmit = () => {
  formRef.value.validate(async (valid) => {
    if (!valid) return
    loading.value = true
    try {
      // 收集各模块行级备注（适配农艺性状的recordId）
      const moduleRemarks = {
        plotRemarks: plotInfoList.value.map(item => ({
          plotId: item.plotId,
          remark: item.remark.trim()
        })).filter(item => item.remark), // 只提交非空备注
        farmingRemarks: farmingRecordList.value.map(item => ({
          farmingRecordId: item.farmingRecordId,
          remark: item.remark.trim()
        })).filter(item => item.remark),
        agronomicRemarks: agronomicTraitList.value.map(item => ({
          recordId: item.recordId, // 改为recordId
          remark: item.remark.trim()
        })).filter(item => item.remark),
        environmentRemarks: environmentDataList.value.map(item => ({
          envRecordId: item.envRecordId,
          remark: item.remark.trim()
        })).filter(item => item.remark),
        yieldRemarks: yieldDataList.value.map(item => ({
          id: item.id,
          remark: item.remark.trim()
        })).filter(item => item.remark),
        labTestRemarks: labTestList.value.map(item => ({
          dataId: item.dataId,
          remark: item.remark.trim()
        })).filter(item => item.remark)
      }

      const apiFunc = isEdit.value ? updateDataset : addDataset
      const submitData = {
        trialId: formData.trialId,
        batchId: formData.batchId,
        compiledBy: formData.compiledBy,
        compiledByName: formData.compiledByName,
        compiledAt: formData.compiledAt,
        recordCount: statistics.value.totalCount, // 使用实时统计的总记录数
        status: formData.status,
        datasetStatus: formData.datasetStatus,
        cropType: resolveCropTypeLabel(cropTypeOptions.value, formData.cropType),
        varietyName: formData.varietyName,
        remark: formData.remark,
        // 备注转JSON字符串存储（适配后端字符串字段）
        moduleRowRemarks: JSON.stringify(moduleRemarks)
      }

      if (isEdit.value) {
        submitData.id = formData.id
      }

      const res = await apiFunc(submitData)
      if (res.code === 200) {
        ElMessage.success(t(isEdit.value ? 'common.updateSuccess' : 'common.addSuccess'))
        goBack()
      } else {
        ElMessage.error(res.msg || t('common.operationFailed'))
      }
    } catch (error) {
      console.error('Failed to submit:', error)
      ElMessage.error(t('common.operationFailed'))
    } finally {
      loading.value = false
    }
  })
}

const goBack = () => {
  router.back()
}

onMounted(async () => {
  cropTypeOptions.value = await loadSeedCropTypeOptions(locale.value).catch(() => [])
  loadTrialOptions()
  if (!isEdit.value) {
    await initCurrentUser()
  }
  if (isEdit.value) {
    loadDetail()
  }
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';

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
