<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-left">
          <div class="header-icon">
            <i class="ri-database-2-line"></i>
          </div>
          <div class="header-content">
            <h1 class="page-title">{{ $t('stateAggregation.title') }}</h1>
            <p class="page-subtitle">{{ $t('stateAggregation.subtitle') }}</p>
          </div>
        </div>
        <div class="header-right">
          <el-button type="success" size="large" @click="handlePublishAll">
            <i class="ri-send-plane-line"></i>
            {{ $t('stateAggregation.actions.publishAll') }}
          </el-button>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <div class="info-card">
          <!-- 主列表视图 -->
          <template v-if="viewMode === 'main'">
            <!-- PC端表格 -->
            <div class="table-wrapper pc-only">
              <el-table
                v-loading="loading"
                :data="tableData"
                stripe
                empty-text=""
              >
                <el-table-column
                  prop="year"
                  :label="$t('stateAggregation.columns.year')"
                  min-width="100"
                />
                <el-table-column
                  prop="sourceName"
                  :label="$t('RegionName')"
                  min-width="140"
                >
                  <template #default="{ row }">
                    <el-button link type="primary" @click="handleDrillDown(row)">
                      {{ row.sourceName }}
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="subQuantity"
                  :label="$t('stateAggregation.columns.subQuantity')"
                  min-width="140"
                />
                <el-table-column
                  prop="unsubmitQuantity"
                  :label="$t('unsubmitQuantity')"
                  min-width="140"
                />
                <el-table-column
                    prop="submitQuantity"
                    :label="$t('submitQuantity')"
                    min-width="140"
                />
                <el-table-column
                  :label="$t('stateAggregation.columns.actions')"
                  fixed="right"
                  width="150"
                >
                  <template #default="{ row }">
                    <div class="action-buttons">
                      <el-button link type="info" @click="handleDetail(row)">
                        <i class="ri-list-check"></i>
                        {{ $t('stateAggregation.actions.detail') }}
                      </el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>

            <!-- 移动端卡片 -->
            <div class="mobile-cards mobile-only">
              <div v-for="item in tableData" :key="item.id" class="mobile-card">
                <div class="mobile-card-header">
                  <div class="year-badge">
                    <i class="ri-calendar-line"></i>
                    <span>{{ item.year }}</span>
                  </div>
                </div>
                <div class="mobile-card-body">
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('RegionName') }}:</span>
                    <span class="value">{{ item.targetName }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('stateAggregation.columns.subQuantity') }}:</span>
                    <span class="value">{{ item.subQuantity }}</span>
                  </div>
                </div>
                <div class="mobile-card-actions">
                  <el-button type="info" size="small" @click="handleDetail(item)">
                    {{ $t('stateAggregation.actions.detail') }}
                  </el-button>
                </div>
              </div>
            </div>

            <!-- 分页 -->
            <div v-if="pagination.total > 0" class="pagination-wrapper">
              <el-pagination
                :current-page="pagination.currentPage"
                :page-size="pagination.pageSize"
                :page-sizes="[10, 20, 50, 100]"
                :total="pagination.total"
                layout="total, sizes, prev, pager, next, jumper"
                background
                small
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                @update:current-page="pagination.currentPage = $event"
                @update:page-size="pagination.pageSize = $event"
              />
            </div>

            <!-- 空状态 -->
            <el-empty
              v-if="tableData.length === 0 && !loading"
              :description="$t('stateAggregation.messages.noData')"
            />
          </template>

          <!-- 第一层下钻列表视图 (Zone级别) -->
          <template v-else-if="viewMode === 'drillDown'">
            <!-- 返回按钮和面包屑 -->
            <div class="drill-down-header">
              <el-button type="primary" plain @click="handleBackToMain">
                <i class="ri-arrow-left-line"></i>
                {{ $t('common.back') }}
              </el-button>
              <el-breadcrumb separator="/" class="breadcrumb">
                <el-breadcrumb-item>{{ $t('stateAggregation.title') }}</el-breadcrumb-item>
                <el-breadcrumb-item>{{ currentDrillDownRow?.targetName }} ({{ currentDrillDownRow?.year }})</el-breadcrumb-item>
              </el-breadcrumb>
            </div>

            <!-- 下钻表格 -->
            <div class="table-wrapper">
              <el-table
                v-loading="drillDownLoading"
                :data="drillDownData"
                stripe
                empty-text=""
              >
                <el-table-column
                  prop="year"
                  :label="$t('stateAggregation.columns.year')"
                  min-width="100"
                />
                <el-table-column
                  prop="sourceName"
                  :label="$t('ZoneName')"
                  min-width="140"
                >
                  <template #default="{ row }">
                    <el-button link type="primary" @click="handleDrillDown2(row)">
                      {{ row.sourceName }}
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column
                    prop="subQuantity"
                    :label="$t('townAggregation.columns.subQuantity')"
                    min-width="140"
                >
                </el-table-column>
                <el-table-column
                    prop="unsubmitQuantity"
                    :label="$t('unsubmitQuantity')"
                    min-width="140"
                />
                <el-table-column
                    prop="submitQuantity"
                    :label="$t('submitQuantity')"
                    min-width="140"
                >
                </el-table-column>
                <el-table-column
                    prop="auditQuantity"
                    :label="$t('auditQuantity')"
                    min-width="140"
                >
                </el-table-column>
                <el-table-column
                  prop="status"
                  :label="$t('stateAggregation.columns.status')"
                  min-width="100"
                >
                  <template #default="{ row }">
                    <el-tag v-if="row.status === '0'" type="info">
                      {{ $t('stateAggregation.status.draft') }}
                    </el-tag>
                    <el-tag v-else-if="row.status === '1'" type="warning">
                      {{ $t('stateAggregation.status.pending') }}
                    </el-tag>
                    <el-tag v-else-if="row.status === '2'" type="success">
                      {{ $t('stateAggregation.status.approved') }}
                    </el-tag>
                    <el-tag v-else-if="row.status === '3'" type="danger">
                      {{ $t('stateAggregation.status.rejected') }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="createTime"
                  :label="$t('stateAggregation.columns.createTime')"
                  min-width="160"
                />
                <el-table-column
                  :label="$t('stateAggregation.columns.actions')"
                  fixed="right"
                  width="120"
                >
                  <template #default="{ row }">
                    <el-button link type="primary" @click="handleDrillDownDetail(row)">
                      <i class="ri-eye-line"></i>
                      Detail
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>

            <!-- 下钻分页 -->
            <div v-if="drillDownPagination.total > 0" class="pagination-wrapper">
              <el-pagination
                :current-page="drillDownPagination.currentPage"
                :page-size="drillDownPagination.pageSize"
                :page-sizes="[10, 20, 50]"
                :total="drillDownPagination.total"
                layout="total, sizes, prev, pager, next"
                background
                small
                @size-change="handleDrillDownSizeChange"
                @current-change="handleDrillDownCurrentChange"
                @update:current-page="drillDownPagination.currentPage = $event"
                @update:page-size="drillDownPagination.pageSize = $event"
              />
            </div>

            <!-- 空状态 -->
            <el-empty
              v-if="drillDownData.length === 0 && !drillDownLoading"
              :description="$t('stateAggregation.messages.noData')"
            />
          </template>

          <!-- 第二层下钻列表视图 (Woreda级别) -->
          <template v-else-if="viewMode === 'drillDown2'">
            <!-- 返回按钮和面包屑 -->
            <div class="drill-down-header">
              <el-button type="primary" plain @click="handleBackToDrillDown">
                <i class="ri-arrow-left-line"></i>
                {{ $t('common.back') }}
              </el-button>
              <el-breadcrumb separator="/" class="breadcrumb">
                <el-breadcrumb-item>{{ $t('stateAggregation.title') }}</el-breadcrumb-item>
                <el-breadcrumb-item>{{ currentDrillDownRow?.targetName }}</el-breadcrumb-item>
                <el-breadcrumb-item>{{ currentDrillDown2Row?.sourceName }} ({{ currentDrillDown2Row?.year }})</el-breadcrumb-item>
              </el-breadcrumb>
            </div>

            <!-- 第二层下钻表格 -->
            <div class="table-wrapper">
              <el-table
                v-loading="drillDown2Loading"
                :data="drillDown2Data"
                stripe
                empty-text=""
              >
                <el-table-column
                  prop="year"
                  :label="$t('stateAggregation.columns.year')"
                  min-width="100"
                />
                <el-table-column
                  prop="sourceName"
                  :label="$t('WoredaName')"
                  min-width="140"
                >
                  <template #default="{ row }">
                    <el-button link type="primary" @click="handleDrillDown3(row)">
                      {{ row.sourceName }}
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column
                    prop="subQuantity"
                    :label="$t('townAggregation.columns.subQuantity')"
                    min-width="140"
                >
                </el-table-column>
                <el-table-column
                    prop="unsubmitQuantity"
                    :label="$t('unsubmitQuantity')"
                    min-width="140"
                />
                <el-table-column
                    prop="submitQuantity"
                    :label="$t('submitQuantity')"
                    min-width="140"
                >
                </el-table-column>
                <el-table-column
                    prop="auditQuantity"
                    :label="$t('auditQuantity')"
                    min-width="140"
                >
                </el-table-column>
                <el-table-column
                  prop="status"
                  :label="$t('stateAggregation.columns.status')"
                  min-width="100"
                >
                  <template #default="{ row }">
                    <el-tag v-if="row.status === '0'" type="info">
                      {{ $t('stateAggregation.status.draft') }}
                    </el-tag>
                    <el-tag v-else-if="row.status === '1'" type="warning">
                      {{ $t('stateAggregation.status.pending') }}
                    </el-tag>
                    <el-tag v-else-if="row.status === '2'" type="success">
                      {{ $t('stateAggregation.status.approved') }}
                    </el-tag>
                    <el-tag v-else-if="row.status === '3'" type="danger">
                      {{ $t('stateAggregation.status.rejected') }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="createTime"
                  :label="$t('stateAggregation.columns.createTime')"
                  min-width="160"
                />
                <el-table-column
                  :label="$t('stateAggregation.columns.actions')"
                  fixed="right"
                  width="120"
                >
                  <template #default="{ row }">
                    <el-button link type="primary" @click="handleDrillDown2Detail(row)">
                      <i class="ri-eye-line"></i>
                      Detail
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>

            <!-- 第二层下钻分页 -->
            <div v-if="drillDown2Pagination.total > 0" class="pagination-wrapper">
              <el-pagination
                :current-page="drillDown2Pagination.currentPage"
                :page-size="drillDown2Pagination.pageSize"
                :page-sizes="[10, 20, 50]"
                :total="drillDown2Pagination.total"
                layout="total, sizes, prev, pager, next"
                background
                small
                @size-change="handleDrillDown2SizeChange"
                @current-change="handleDrillDown2CurrentChange"
                @update:current-page="drillDown2Pagination.currentPage = $event"
                @update:page-size="drillDown2Pagination.pageSize = $event"
              />
            </div>

            <!-- 空状态 -->
            <el-empty
              v-if="drillDown2Data.length === 0 && !drillDown2Loading"
              :description="$t('stateAggregation.messages.noData')"
            />
          </template>

          <!-- 第三层下钻列表视图 (Kebele级别) -->
          <template v-else-if="viewMode === 'drillDown3'">
            <!-- 返回按钮和面包屑 -->
            <div class="drill-down-header">
              <el-button type="primary" plain @click="handleBackToDrillDown2">
                <i class="ri-arrow-left-line"></i>
                {{ $t('common.back') }}
              </el-button>
              <el-breadcrumb separator="/" class="breadcrumb">
                <el-breadcrumb-item>{{ $t('stateAggregation.title') }}</el-breadcrumb-item>
                <el-breadcrumb-item>{{ currentDrillDownRow?.targetName }}</el-breadcrumb-item>
                <el-breadcrumb-item>{{ currentDrillDown2Row?.sourceName }}</el-breadcrumb-item>
                <el-breadcrumb-item>{{ currentDrillDown3Row?.sourceName }} ({{ currentDrillDown3Row?.year }})</el-breadcrumb-item>
              </el-breadcrumb>
            </div>

            <!-- 第三层下钻表格 -->
            <div class="table-wrapper">
              <el-table
                v-loading="drillDown3Loading"
                :data="drillDown3Data"
                stripe
                empty-text=""
              >
                <el-table-column
                  prop="year"
                  :label="$t('stateAggregation.columns.year')"
                  min-width="100"
                />
                <el-table-column
                  prop="sourceName"
                  :label="$t('KebeleName')"
                  min-width="140"
                />
                <el-table-column
                    prop="subQuantity"
                    :label="$t('townAggregation.columns.subQuantity')"
                    min-width="140"
                >
                </el-table-column>
                <el-table-column
                    prop="unsubmitQuantity"
                    :label="$t('unsubmitQuantity')"
                    min-width="140"
                />
                <el-table-column
                    prop="submitQuantity"
                    :label="$t('submitQuantity')"
                    min-width="140"
                >
                </el-table-column>
                <el-table-column
                    prop="auditQuantity"
                    :label="$t('auditQuantity')"
                    min-width="140"
                >
                </el-table-column>
                <el-table-column
                  prop="status"
                  :label="$t('stateAggregation.columns.status')"
                  min-width="100"
                >
                  <template #default="{ row }">
                    <el-tag v-if="row.status === '0'" type="info">
                      {{ $t('stateAggregation.status.draft') }}
                    </el-tag>
                    <el-tag v-else-if="row.status === '1'" type="warning">
                      {{ $t('stateAggregation.status.pending') }}
                    </el-tag>
                    <el-tag v-else-if="row.status === '2'" type="success">
                      {{ $t('stateAggregation.status.approved') }}
                    </el-tag>
                    <el-tag v-else-if="row.status === '3'" type="danger">
                      {{ $t('stateAggregation.status.rejected') }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="createTime"
                  :label="$t('stateAggregation.columns.createTime')"
                  min-width="160"
                />
                <el-table-column
                  :label="$t('stateAggregation.columns.actions')"
                  fixed="right"
                  width="120"
                >
                  <template #default="{ row }">
                    <el-button link type="primary" @click="handleDrillDown3Detail(row)">
                      <i class="ri-eye-line"></i>
                      Detail
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>

            <!-- 第三层下钻分页 -->
            <div v-if="drillDown3Pagination.total > 0" class="pagination-wrapper">
              <el-pagination
                :current-page="drillDown3Pagination.currentPage"
                :page-size="drillDown3Pagination.pageSize"
                :page-sizes="[10, 20, 50]"
                :total="drillDown3Pagination.total"
                layout="total, sizes, prev, pager, next"
                background
                small
                @size-change="handleDrillDown3SizeChange"
                @current-change="handleDrillDown3CurrentChange"
                @update:current-page="drillDown3Pagination.currentPage = $event"
                @update:page-size="drillDown3Pagination.pageSize = $event"
              />
            </div>

            <!-- 空状态 -->
            <el-empty
              v-if="drillDown3Data.length === 0 && !drillDown3Loading"
              :description="$t('stateAggregation.messages.noData')"
            />
          </template>
        </div>
      </div>
    </div>

    <!-- 发布全部对话框 -->
    <el-dialog
      v-model="publishAllDialogVisible"
      :title="$t('stateAggregation.publishAllDialog.title')"
      width="600px"
    >
      <el-form :model="publishAllForm" :rules="publishAllRules" ref="publishAllFormRef" label-width="120px">
        <el-form-item :label="$t('stateAggregation.publishAllDialog.year')" prop="year">
          <el-date-picker
            v-model="publishAllForm.year"
            type="year"
            :placeholder="$t('stateAggregation.publishAllDialog.yearPlaceholder')"
            style="width: 100%"
            value-format="YYYY"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="publishAllDialogVisible = false">
          {{ $t('stateAggregation.publishAllDialog.cancel') }}
        </el-button>
        <el-button type="primary" @click="confirmPublishAll" :loading="publishSubmitting">
          {{ $t('stateAggregation.publishAllDialog.confirm') }}
        </el-button>
      </template>
    </el-dialog>

    <!-- 汇聚明细对话框 -->
    <el-dialog
      v-model="detailDialogVisible"
      :title="$t('stateAggregation.detailDialog.title')"
      width="80%"
      top="5vh"
    >
      <el-table
        v-loading="detailLoading"
        :data="detailData"
        stripe
        max-height="500px"
      >
        <el-table-column
          prop="inputCategory"
          :label="$t('stateAggregation.detailDialog.columns.inputCategory')"
          min-width="150"
        >
          <template #default="{ row }">
            {{ getLabelByValue('input_category', row.inputCategory) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="inputType"
          :label="$t('stateAggregation.detailDialog.columns.inputType')"
          min-width="150"
        >
          <template #default="{ row }">
            {{ getLabelByValue('input_type', row.inputType) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="totalQuantity"
          :label="$t('stateAggregation.detailDialog.columns.totalQuantity')"
          min-width="120"
        />
      </el-table>
      <el-empty
        v-if="detailData.length === 0 && !detailLoading"
        :description="$t('stateAggregation.detailDialog.noData')"
      />
      <template #footer>
        <el-button @click="detailDialogVisible = false">
          {{ $t('common.close') }}
        </el-button>
      </template>
    </el-dialog>

    <!-- 第一层下钻记录详情对话框 -->
    <el-dialog
      v-model="drillDownRecordDetailVisible"
      :title="$t('stateAggregation.detailDialog.title')"
      width="70%"
      top="5vh"
    >
      <el-descriptions :column="2" border>
        <el-descriptions-item :label="$t('stateAggregation.columns.year')">
          {{ drillDownRecordDetail.year }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('Zone Name')">
          {{ drillDownRecordDetail.sourceName }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('Zone Code')">
          {{ drillDownRecordDetail.sourceCode }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('stateAggregation.columns.status')">
          <el-tag v-if="drillDownRecordDetail.status === '0'" type="info">
            {{ $t('stateAggregation.status.draft') }}
          </el-tag>
          <el-tag v-else-if="drillDownRecordDetail.status === '1'" type="warning">
            {{ $t('stateAggregation.status.pending') }}
          </el-tag>
          <el-tag v-else-if="drillDownRecordDetail.status === '2'" type="success">
            {{ $t('stateAggregation.status.approved') }}
          </el-tag>
          <el-tag v-else-if="drillDownRecordDetail.status === '3'" type="danger">
            {{ $t('stateAggregation.status.rejected') }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item :label="$t('stateAggregation.columns.createTime')">
          {{ drillDownRecordDetail.createTime }}
        </el-descriptions-item>
      </el-descriptions>

      <!-- 汇聚结果列表 -->
      <div class="aggregation-result-section">
        <h4 class="section-title">{{ $t('stateAggregation.detailDialog.title') }}</h4>
        <el-table
          v-loading="drillDownAggregationLoading"
          :data="drillDownAggregationData"
          stripe
          max-height="300px"
        >
          <el-table-column
            prop="inputCategory"
            :label="$t('stateAggregation.detailDialog.columns.inputCategory')"
            min-width="150"
          >
            <template #default="{ row }">
              {{ getLabelByValue('input_category', row.inputCategory) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="inputType"
            :label="$t('stateAggregation.detailDialog.columns.inputType')"
            min-width="150"
          >
            <template #default="{ row }">
              {{ getLabelByValue('input_type', row.inputType) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="totalQuantity"
            :label="$t('stateAggregation.detailDialog.columns.totalQuantity')"
            min-width="120"
          />
        </el-table>
        <el-empty
          v-if="drillDownAggregationData.length === 0 && !drillDownAggregationLoading"
          :description="$t('stateAggregation.detailDialog.noData')"
        />
      </div>

      <template #footer>
        <el-button @click="drillDownRecordDetailVisible = false">
          {{ $t('common.close') }}
        </el-button>
      </template>
    </el-dialog>

    <!-- 第二层下钻记录详情对话框 -->
    <el-dialog
      v-model="drillDown2RecordDetailVisible"
      :title="$t('stateAggregation.detailDialog.title')"
      width="70%"
      top="5vh"
    >
      <el-descriptions :column="2" border>
        <el-descriptions-item :label="$t('stateAggregation.columns.year')">
          {{ drillDown2RecordDetail.year }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('Woreda Name')">
          {{ drillDown2RecordDetail.sourceName }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('Woreda Code')">
          {{ drillDown2RecordDetail.sourceCode }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('stateAggregation.columns.status')">
          <el-tag v-if="drillDown2RecordDetail.status === '0'" type="info">
            {{ $t('stateAggregation.status.draft') }}
          </el-tag>
          <el-tag v-else-if="drillDown2RecordDetail.status === '1'" type="warning">
            {{ $t('stateAggregation.status.pending') }}
          </el-tag>
          <el-tag v-else-if="drillDown2RecordDetail.status === '2'" type="success">
            {{ $t('stateAggregation.status.approved') }}
          </el-tag>
          <el-tag v-else-if="drillDown2RecordDetail.status === '3'" type="danger">
            {{ $t('stateAggregation.status.rejected') }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item :label="$t('stateAggregation.columns.createTime')">
          {{ drillDown2RecordDetail.createTime }}
        </el-descriptions-item>
      </el-descriptions>

      <!-- 汇聚结果列表 -->
      <div class="aggregation-result-section">
        <h4 class="section-title">{{ $t('stateAggregation.detailDialog.title') }}</h4>
        <el-table
          v-loading="drillDown2AggregationLoading"
          :data="drillDown2AggregationData"
          stripe
          max-height="300px"
        >
          <el-table-column
            prop="inputCategory"
            :label="$t('stateAggregation.detailDialog.columns.inputCategory')"
            min-width="150"
          >
            <template #default="{ row }">
              {{ getLabelByValue('input_category', row.inputCategory) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="inputType"
            :label="$t('stateAggregation.detailDialog.columns.inputType')"
            min-width="150"
          >
            <template #default="{ row }">
              {{ getLabelByValue('input_type', row.inputType) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="totalQuantity"
            :label="$t('stateAggregation.detailDialog.columns.totalQuantity')"
            min-width="120"
          />
        </el-table>
        <el-empty
          v-if="drillDown2AggregationData.length === 0 && !drillDown2AggregationLoading"
          :description="$t('stateAggregation.detailDialog.noData')"
        />
      </div>

      <template #footer>
        <el-button @click="drillDown2RecordDetailVisible = false">
          {{ $t('common.close') }}
        </el-button>
      </template>
    </el-dialog>

    <!-- 第三层下钻记录详情对话框 -->
    <el-dialog
      v-model="drillDown3RecordDetailVisible"
      :title="$t('stateAggregation.detailDialog.title')"
      width="70%"
      top="5vh"
    >
      <el-descriptions :column="2" border>
        <el-descriptions-item :label="$t('stateAggregation.columns.year')">
          {{ drillDown3RecordDetail.year }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('Kebele Name')">
          {{ drillDown3RecordDetail.sourceName }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('Kebele Code')">
          {{ drillDown3RecordDetail.sourceCode }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('stateAggregation.columns.status')">
          <el-tag v-if="drillDown3RecordDetail.status === '0'" type="info">
            {{ $t('stateAggregation.status.draft') }}
          </el-tag>
          <el-tag v-else-if="drillDown3RecordDetail.status === '1'" type="warning">
            {{ $t('stateAggregation.status.pending') }}
          </el-tag>
          <el-tag v-else-if="drillDown3RecordDetail.status === '2'" type="success">
            {{ $t('stateAggregation.status.approved') }}
          </el-tag>
          <el-tag v-else-if="drillDown3RecordDetail.status === '3'" type="danger">
            {{ $t('stateAggregation.status.rejected') }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item :label="$t('stateAggregation.columns.createTime')">
          {{ drillDown3RecordDetail.createTime }}
        </el-descriptions-item>
      </el-descriptions>

      <!-- 汇聚结果列表 -->
      <div class="aggregation-result-section">
        <h4 class="section-title">{{ $t('stateAggregation.detailDialog.title') }}</h4>
        <el-table
          v-loading="drillDown3AggregationLoading"
          :data="drillDown3AggregationData"
          stripe
          max-height="300px"
        >
          <el-table-column
            prop="inputCategory"
            :label="$t('stateAggregation.detailDialog.columns.inputCategory')"
            min-width="150"
          >
            <template #default="{ row }">
              {{ getLabelByValue('input_category', row.inputCategory) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="inputType"
            :label="$t('stateAggregation.detailDialog.columns.inputType')"
            min-width="150"
          >
            <template #default="{ row }">
              {{ getLabelByValue('input_type', row.inputType) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="totalQuantity"
            :label="$t('stateAggregation.detailDialog.columns.totalQuantity')"
            min-width="120"
          />
        </el-table>
        <el-empty
          v-if="drillDown3AggregationData.length === 0 && !drillDown3AggregationLoading"
          :description="$t('stateAggregation.detailDialog.noData')"
        />
      </div>

      <template #footer>
        <el-button @click="drillDown3RecordDetailVisible = false">
          {{ $t('common.close') }}
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import {
  getVillageDemandSummaryMainList,
  getTownAggregationDetail,
  distributeTask,
  getVillageAggregationDetail
} from '@/api/villageAggregation'
import { useDict } from '@/hooks/useDict'

const { getLabelByValue, options } = useDict(['input_type', 'input_category'])
const router = useRouter()
const { t } = useI18n()

const loading = ref(false)
const tableData = ref([])

// 视图模式: 'main' 主列表, 'drillDown' 第一层下钻, 'drillDown2' 第二层下钻, 'drillDown3' 第三层下钻
const viewMode = ref('main')

// 分页
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

// 发布全部对话框
const publishAllDialogVisible = ref(false)
const publishAllFormRef = ref(null)
const publishSubmitting = ref(false)
const publishAllForm = reactive({
  year: ''
})

const publishAllRules = reactive({
  year: [
    { required: true, message: t('stateAggregation.publishAllDialog.yearRequired'), trigger: 'change' }
  ]
})

// 汇聚明细对话框
const detailDialogVisible = ref(false)
const detailLoading = ref(false)
const detailData = ref([])
const currentDetailRow = ref(null)

// 第一层下钻列表
const drillDownLoading = ref(false)
const drillDownData = ref([])
const currentDrillDownRow = ref(null)

const drillDownPagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

// 第一层下钻记录详情
const drillDownRecordDetailVisible = ref(false)
const drillDownRecordDetail = ref({})
const drillDownAggregationLoading = ref(false)
const drillDownAggregationData = ref([])

// 第二层下钻列表
const drillDown2Loading = ref(false)
const drillDown2Data = ref([])
const currentDrillDown2Row = ref(null)

const drillDown2Pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

// 第二层下钻记录详情
const drillDown2RecordDetailVisible = ref(false)
const drillDown2RecordDetail = ref({})
const drillDown2AggregationLoading = ref(false)
const drillDown2AggregationData = ref([])

// 第三层下钻列表
const drillDown3Loading = ref(false)
const drillDown3Data = ref([])
const currentDrillDown3Row = ref(null)

const drillDown3Pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

// 第三层下钻记录详情
const drillDown3RecordDetailVisible = ref(false)
const drillDown3RecordDetail = ref({})
const drillDown3AggregationLoading = ref(false)
const drillDown3AggregationData = ref([])

// 加载列表数据
const loadData = async () => {
  loading.value = true
  try {
    const params = {
      page: pagination.currentPage,
      pageSize: pagination.pageSize,
      sourceCode: JSON.parse(localStorage.getItem('userInfo')).user.regionCode,
      level: '3'
    }
    const res = await getVillageDemandSummaryMainList(params)

    if (res.code === 200) {
      tableData.value = res.data.list || []
      pagination.total = res.data.total || 0
    }
  } catch (error) {
    console.error('Failed to load data:', error)
    ElMessage.error(t('stateAggregation.messages.loadFailed'))
  } finally {
    loading.value = false
  }
}

// 打开发布全部对话框
const handlePublishAll = () => {
  publishAllForm.year = ''
  publishAllDialogVisible.value = true
}

// 确认发布全部
const confirmPublishAll = async () => {
  if (!publishAllFormRef.value) return

  try {
    await publishAllFormRef.value.validate()

    publishSubmitting.value = true
    const res = await distributeTask({
      year: publishAllForm.year
    })

    if (res.code === 200) {
      ElMessage.success(t('stateAggregation.publishAllDialog.success'))
      publishAllDialogVisible.value = false
      loadData()
    } else {
      ElMessage.error(res.msg || t('stateAggregation.publishAllDialog.failed'))
    }
  } catch (error) {
    if (error !== false) {
      console.error('Failed to publish all:', error)
    }
  } finally {
    publishSubmitting.value = false
  }
}

// 查看汇聚明细
const handleDetail = async (row) => {
  currentDetailRow.value = row
  detailDialogVisible.value = true
  detailLoading.value = true

  try {
    const res = await getTownAggregationDetail({
      sourceCode: row.sourceCode,
      year: row.year
    })

    if (res.code === 200) {
      detailData.value = res.data || []
    }
  } catch (error) {
    console.error('Failed to load detail data:', error)
    ElMessage.error(t('stateAggregation.detailDialog.loadFailed'))
  } finally {
    detailLoading.value = false
  }
}

// ========== 第一层下钻 - Region -> Zone ==========
const handleDrillDown = async (row) => {
  currentDrillDownRow.value = row
  viewMode.value = 'drillDown'
  drillDownPagination.currentPage = 1
  await loadDrillDownData()
}

const handleBackToMain = () => {
  viewMode.value = 'main'
  currentDrillDownRow.value = null
  drillDownData.value = []
  currentDrillDown2Row.value = null
  drillDown2Data.value = []
  currentDrillDown3Row.value = null
  drillDown3Data.value = []
}

const loadDrillDownData = async () => {
  if (!currentDrillDownRow.value) return

  drillDownLoading.value = true
  try {
    const params = {
      page: drillDownPagination.currentPage,
      pageSize: drillDownPagination.pageSize,
      targetCode: currentDrillDownRow.value.sourceCode,
      year: currentDrillDownRow.value.year,
      level: '3'
    }
    const res = await getVillageDemandSummaryMainList(params)

    if (res.code === 200) {
      drillDownData.value = res.data?.list || []
      drillDownPagination.total = res.data?.total || 0
    }
  } catch (error) {
    console.error('Failed to load drill down data:', error)
    ElMessage.error(t('stateAggregation.messages.loadFailed'))
  } finally {
    drillDownLoading.value = false
  }
}

const handleDrillDownSizeChange = () => {
  drillDownPagination.currentPage = 1
  loadDrillDownData()
}

const handleDrillDownCurrentChange = () => {
  loadDrillDownData()
}

const handleDrillDownDetail = async (row) => {
  drillDownRecordDetail.value = row
  drillDownRecordDetailVisible.value = true
  drillDownAggregationData.value = []

  drillDownAggregationLoading.value = true
  try {
    const res = await getTownAggregationDetail({
      sourceCode: row.sourceCode,
      year: row.year
    })
    if (res.code === 200) {
      drillDownAggregationData.value = res.data || []
    }
  } catch (error) {
    console.error('Failed to load aggregation data:', error)
    ElMessage.error(t('stateAggregation.detailDialog.loadFailed'))
  } finally {
    drillDownAggregationLoading.value = false
  }
}

// ========== 第二层下钻 - Zone -> Woreda ==========
const handleDrillDown2 = async (row) => {
  currentDrillDown2Row.value = row
  viewMode.value = 'drillDown2'
  drillDown2Pagination.currentPage = 1
  await loadDrillDown2Data()
}

const handleBackToDrillDown = () => {
  viewMode.value = 'drillDown'
  currentDrillDown2Row.value = null
  drillDown2Data.value = []
  currentDrillDown3Row.value = null
  drillDown3Data.value = []
}

const loadDrillDown2Data = async () => {
  if (!currentDrillDown2Row.value) return

  drillDown2Loading.value = true
  try {
    const params = {
      page: drillDown2Pagination.currentPage,
      pageSize: drillDown2Pagination.pageSize,
      targetCode: currentDrillDown2Row.value.sourceCode,
      year: currentDrillDown2Row.value.year,
      level: '2'
    }
    const res = await getVillageDemandSummaryMainList(params)

    if (res.code === 200) {
      drillDown2Data.value = res.data?.list || []
      drillDown2Pagination.total = res.data?.total || 0
    }
  } catch (error) {
    console.error('Failed to load drill down 2 data:', error)
    ElMessage.error(t('stateAggregation.messages.loadFailed'))
  } finally {
    drillDown2Loading.value = false
  }
}

const handleDrillDown2SizeChange = () => {
  drillDown2Pagination.currentPage = 1
  loadDrillDown2Data()
}

const handleDrillDown2CurrentChange = () => {
  loadDrillDown2Data()
}

const handleDrillDown2Detail = async (row) => {
  drillDown2RecordDetail.value = row
  drillDown2RecordDetailVisible.value = true
  drillDown2AggregationData.value = []

  drillDown2AggregationLoading.value = true
  try {
    const res = await getTownAggregationDetail({
      sourceCode: row.sourceCode,
      year: row.year
    })
    if (res.code === 200) {
      drillDown2AggregationData.value = res.data || []
    }
  } catch (error) {
    console.error('Failed to load aggregation data:', error)
    ElMessage.error(t('stateAggregation.detailDialog.loadFailed'))
  } finally {
    drillDown2AggregationLoading.value = false
  }
}

// ========== 第三层下钻 - Woreda -> Kebele ==========
const handleDrillDown3 = async (row) => {
  currentDrillDown3Row.value = row
  viewMode.value = 'drillDown3'
  drillDown3Pagination.currentPage = 1
  await loadDrillDown3Data()
}

const handleBackToDrillDown2 = () => {
  viewMode.value = 'drillDown2'
  currentDrillDown3Row.value = null
  drillDown3Data.value = []
}

const loadDrillDown3Data = async () => {
  if (!currentDrillDown3Row.value) return

  drillDown3Loading.value = true
  try {
    const params = {
      page: drillDown3Pagination.currentPage,
      pageSize: drillDown3Pagination.pageSize,
      targetCode: currentDrillDown3Row.value.sourceCode,
      year: currentDrillDown3Row.value.year,
      level: '0'
    }
    const res = await getVillageDemandSummaryMainList(params)

    if (res.code === 200) {
      drillDown3Data.value = res.data?.list || []
      drillDown3Pagination.total = res.data?.total || 0
    }
  } catch (error) {
    console.error('Failed to load drill down 3 data:', error)
    ElMessage.error(t('stateAggregation.messages.loadFailed'))
  } finally {
    drillDown3Loading.value = false
  }
}

const handleDrillDown3SizeChange = () => {
  drillDown3Pagination.currentPage = 1
  loadDrillDown3Data()
}

const handleDrillDown3CurrentChange = () => {
  loadDrillDown3Data()
}

const handleDrillDown3Detail = async (row) => {
  drillDown3RecordDetail.value = row
  drillDown3RecordDetailVisible.value = true
  drillDown3AggregationData.value = []

  drillDown3AggregationLoading.value = true
  try {
    const res = await getVillageAggregationDetail({
      sourceCode: row.sourceCode,
      year: row.year
    })
    if (res.code === 200) {
      drillDown3AggregationData.value = res.data || []
    }
  } catch (error) {
    console.error('Failed to load aggregation data:', error)
    ElMessage.error(t('stateAggregation.detailDialog.loadFailed'))
  } finally {
    drillDown3AggregationLoading.value = false
  }
}

// 分页变化
const handleSizeChange = () => {
  pagination.currentPage = 1
  loadData()
}

const handleCurrentChange = () => {
  loadData()
}

// 初始化
onMounted(() => {
  loadData()
})
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5e9 100%);
  padding: 24px;
}

.page-header {
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 154, 68, 0.15);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.header-icon {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: white;
  flex-shrink: 0;
}

.header-content {
  color: white;
}

.page-title {
  font-size: 32px;
  font-weight: 600;
  margin: 0 0 8px 0;
}

.page-subtitle {
  font-size: 16px;
  opacity: 0.9;
  margin: 0;
}

.content-wrapper {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.info-card {
  background: white;
  padding: 24px;
}

.table-wrapper {
  margin-bottom: 16px;
}

.drill-down-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e0e0e0;
}

.drill-down-header .breadcrumb {
  font-size: 14px;
}

.drill-down-header .el-button i {
  margin-right: 4px;
}

.aggregation-result-section {
  margin-top: 24px;
}

.aggregation-result-section .section-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 16px 0;
  padding-bottom: 8px;
  border-bottom: 2px solid #009A44;
}

.action-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.mobile-cards {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 16px;
}

.mobile-card {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.mobile-card-header {
  padding: 16px;
  background: linear-gradient(135deg, #f0f9f4 0%, #e8f5e9 100%);
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.year-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: #009A44;
  font-size: 18px;
}

.mobile-card-body {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mobile-card-row {
  display: flex;
  font-size: 14px;
  line-height: 1.6;
}

.mobile-card-row .label {
  color: #666;
  min-width: 120px;
  flex-shrink: 0;
}

.mobile-card-row .value {
  color: #333;
  font-weight: 500;
}

.mobile-card-actions {
  padding: 12px 16px;
  background: #fafafa;
  border-top: 1px solid #e0e0e0;
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  flex-wrap: wrap;
}

.pagination-wrapper {
  margin-top: 16px;
  display: flex;
  justify-content: center;
}

.pc-only {
  display: block;
}

.mobile-only {
  display: none;
}

@media screen and (max-width: 768px) {
  .page-container {
    padding: 12px;
  }

  .page-header {
    padding: 20px;
    border-radius: 12px;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .header-icon {
    width: 60px;
    height: 60px;
    font-size: 30px;
  }

  .page-title {
    font-size: 24px;
  }

  .page-subtitle {
    font-size: 14px;
  }

  .header-right {
    width: 100%;
  }

  .header-right .el-button {
    width: 100%;
  }

  .info-card {
    padding: 16px;
  }

  .pc-only {
    display: none;
  }

  .mobile-only {
    display: block;
  }
}
</style>
