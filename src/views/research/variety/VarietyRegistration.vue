<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-left">
          <div class="header-icon">
            <i class="ri-plant-line"></i>
          </div>
          <div class="header-content">
            <h1 class="page-title">{{ $t('research.variety.registration.title') }}</h1>
            <p class="page-subtitle">{{ $t('research.variety.registration.subtitle') }}</p>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <!-- 列表视图 -->
        <div v-if="!showForm" class="list-view">
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-file-list-3-line"></i>
                <span>{{ $t('research.variety.registration.list') }}</span>
              </div>

            <el-button v-if="!showForm" type="primary" @click="handleAdd" >
            <i class="ri-add-line"></i>
            {{ $t('research.variety.registration.add') }}
          </el-button>
            </div>
            <div class="card-body">
              <!-- 搜索筛选区 -->
              <div class="search-section">
                <el-input
                  v-model="searchQuery"
                  :placeholder="$t('research.variety.registration.searchPlaceholder')"
                  clearable
                  class="search-input"
                >
                  <template #prefix>
                    <i class="ri-search-line"></i>
                  </template>
                </el-input>
                <el-select
                  v-model="filterCrop"
                  :placeholder="$t('research.variety.registration.filterByCrop')"
                  clearable
                  class="filter-select"
                >
                  <el-option :label="$t('research.variety.registration.allCrops')" value="" />
                  <el-option label="Wheat" value="Wheat" />
                  <el-option label="Maize" value="Maize" />
                  <el-option label="Barley" value="Barley" />
                </el-select>
                <el-select
                  v-model="filterStatus"
                  :placeholder="$t('research.variety.registration.filterByStatus')"
                  clearable
                  class="filter-select"
                >
                  <el-option :label="$t('research.variety.registration.allStatus')" value="" />
                  <el-option :label="$t('research.variety.registration.status.draft')" value="0" />
                  <el-option :label="$t('research.variety.registration.status.pending')" value="1" />
                  <el-option :label="$t('research.variety.registration.status.approved')" value="2" />
                  <el-option :label="$t('research.variety.registration.status.rejected')" value="3" />
                </el-select>
              </div>

              <!-- PC端表格 -->
              <div class="table-wrapper pc-only">
                <el-table :data="filteredList" stripe style="width: 100%" v-loading="loading">
                  <el-table-column prop="registrationNo" :label="$t('research.variety.registration.columns.registrationNo')" min-width="150" />
                  <el-table-column prop="varietyName" :label="$t('research.variety.registration.columns.varietyName')" min-width="150" />
                  <el-table-column prop="varietyCode" :label="$t('research.variety.registration.columns.varietyCode')" width="120" />
                  <el-table-column prop="cropType" :label="$t('research.variety.registration.columns.cropType')" width="120" />
                  <el-table-column prop="enterpriseName" :label="$t('research.enterprise.form.enterpriseName')" min-width="180" />
                  <el-table-column prop="createTime" :label="$t('research.variety.registration.columns.submitDate')" width="120">
                    <template #default="{ row }">
                      {{ formatDate(row.createTime) }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="recordStatus" :label="$t('research.variety.registration.columns.registrationStatus')" width="120">
                    <template #default="{ row }">
                      <el-tag :type="getStatusTagType(row.recordStatus)">
                        {{ getStatusLabel(row.recordStatus) }}
                      </el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('research.variety.registration.columns.actions')" width="240" fixed="right">
                    <template #default="{ row }">
                      <div class="action-buttons">
                        <el-button link type="primary" @click="handleView(row)">
                          <i class="ri-eye-line"></i>
                          {{ $t('common.view') }}
                        </el-button>
                        <el-button v-if="row.recordStatus === 2" link type="primary" @click="handleEdit(row)">
                          <i class="ri-edit-line"></i>
                          {{ $t('common.edit') }}
                        </el-button>
                        <el-button v-if="row.recordStatus === 2" link type="danger" @click="handleDelete(row)">
                          <i class="ri-delete-bin-line"></i>
                          {{ $t('common.delete') }}
                        </el-button>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>

                <!-- 分页 -->
                <div class="pagination-wrapper">
                  <el-pagination
                    v-model:current-page="currentPage"
                    v-model:page-size="pageSize"
                    :page-sizes="[10, 20, 50, 100]"
                    :total="total"
                    layout="total, sizes, prev, pager, next, jumper"
                    @size-change="handleSizeChange"
                    @current-change="handlePageChange"
                  />
                </div>
              </div>

              <!-- 移动端卡片 -->
              <div class="card-container mobile-only">
                <div v-if="filteredList.length === 0" class="empty-state">
                  <i class="ri-inbox-line"></i>
                  <p>{{ $t('home.noData') }}</p>
                </div>
                <div v-for="item in filteredList" :key="item.registrationNo" class="variety-card" @click="handleView(item)">
                  <div class="card-header-mobile">
                    <div class="variety-name">{{ item.varietyName }}</div>
                    <el-tag :type="getStatusTagType(item.recordStatus)" size="small">
                      {{ getStatusLabel(item.recordStatus) }}
                    </el-tag>
                  </div>
                  <div class="card-body-mobile">
                    <div class="card-row">
                      <span class="label">{{ $t('research.variety.registration.columns.varietyCode') }}:</span>
                      <span class="value">{{ item.varietyCode }}</span>
                    </div>
                    <div class="card-row">
                      <span class="label">{{ $t('research.variety.registration.columns.cropType') }}:</span>
                      <span class="value">{{ item.cropType }}</span>
                    </div>
                    <div class="card-row">
                      <span class="label">{{ $t('research.variety.registration.columns.submitDate') }}:</span>
                      <span class="value">{{ formatDate(item.createTime) }}</span>
                    </div>
                  </div>
                  <div class="card-actions" @click.stop>
                    <el-button v-if="item.recordStatus === 2" link type="primary" size="small" @click="handleEdit(item)">
                      <i class="ri-edit-line"></i> {{ $t('common.edit') }}
                    </el-button>
                    <el-button v-if="item.recordStatus === 2" link type="danger" size="small" @click="handleDelete(item)">
                      <i class="ri-delete-bin-line"></i> {{ $t('common.delete') }}
                    </el-button>
                  </div>
                </div>

                <!-- 移动端分页 -->
                <div class="pagination-wrapper mobile-pagination">
                  <el-pagination
                    v-model:current-page="currentPage"
                    v-model:page-size="pageSize"
                    :page-sizes="[10, 20, 50]"
                    :total="total"
                    layout="total, prev, pager, next"
                    small
                    @size-change="handleSizeChange"
                    @current-change="handlePageChange"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 表单视图 -->
        <div v-else class="detail-view">
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-file-text-line"></i>
                <span>{{ isView ? $t('common.view') : (isEdit ? $t('common.edit') : $t('research.variety.registration.add')) }}</span>
              </div>
              <el-button @click="handleCancelForm">
                <i class="ri-arrow-left-line"></i>
                {{ $t('common.back') }}
              </el-button>
            </div>
            <div class="card-body form-body-scrollable">
              <el-form
                ref="formRef"
                :model="formData"
                :rules="rules"
                :disabled="isView"
                label-position="top"
                class="variety-form"
              >
                <!-- 1. 备案实体信息 - 只读展示 -->
                <div class="form-section">
                  <div class="section-header">
                    <i class="ri-building-2-line"></i>
                    <h3>{{ $t('research.variety.registration.sections.enterpriseInfo') }}</h3>
                  </div>
                  <div class="info-grid-readonly">
                    <div class="info-item">
                      <span class="label">{{ $t('research.enterprise.form.enterpriseName') }}</span>
                      <span class="value">{{ enterpriseInfo.enterpriseName }}</span>
                    </div>
                    <div class="info-item">
                      <span class="label">{{ $t('research.enterprise.form.enterpriseId') }}</span>
                      <span class="value">{{ enterpriseInfo.enterpriseId }}</span>
                    </div>
                    <div class="info-item">
                      <span class="label">{{ $t('research.enterprise.form.unifiedSocialCreditCode') }}</span>
                      <span class="value">{{ enterpriseInfo.unifiedSocialCreditCode }}</span>
                    </div>
                    <div class="info-item">
                      <span class="label">{{ $t('research.enterprise.form.seedLicenseNo') }}</span>
                      <span class="value">{{ enterpriseInfo.seedLicenseNo }}</span>
                    </div>
                  </div>
                </div>

                <!-- 2. 品种标识信息 -->
                <div class="form-section">
                  <div class="section-header">
                    <i class="ri-seedling-line"></i>
                    <h3>{{ $t('research.variety.registration.sections.identificationInfo') }}</h3>
                  </div>
                  <el-row :gutter="24">
                    <el-col :xs="24" :sm="12">
                      <el-form-item :label="$t('research.variety.registration.form.varietyName')" prop="varietyName">
                        <el-input
                          v-model="formData.varietyName"
                          :placeholder="$t('research.variety.registration.placeholder.varietyName')"
                          size="large"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12">
                      <el-form-item :label="$t('research.variety.registration.form.varietyCode')" prop="varietyCode">
                        <el-input
                          v-model="formData.varietyCode"
                          :placeholder="$t('research.variety.registration.placeholder.varietyCode')"
                          size="large"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12">
                      <el-form-item :label="$t('research.variety.registration.form.cropType')" prop="cropType">
                        <el-select
                          v-model="formData.cropType"
                          :placeholder="$t('research.variety.registration.placeholder.cropType')"
                          size="large"
                          class="full-width"
                        >
                          <el-option label="Wheat" value="Wheat" />
                          <el-option label="Maize" value="Maize" />
                          <el-option label="Barley" value="Barley" />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12">
                      <el-form-item :label="$t('research.variety.registration.form.species')" prop="species">
                        <el-input
                          v-model="formData.species"
                          :placeholder="$t('research.variety.registration.placeholder.species')"
                          size="large"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12">
                      <el-form-item :label="$t('research.variety.registration.form.genus')" prop="genus">
                        <el-input
                          v-model="formData.genus"
                          :placeholder="$t('research.variety.registration.placeholder.genus')"
                          size="large"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12">
                      <el-form-item :label="$t('research.variety.registration.form.family')" prop="family">
                        <el-input
                          v-model="formData.family"
                          :placeholder="$t('research.variety.registration.placeholder.family')"
                          size="large"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12">
                      <el-form-item :label="$t('research.variety.registration.form.breedingMethod')" prop="breedingMethod">
                        <el-select
                          v-model="formData.breedingMethod"
                          :placeholder="$t('research.variety.registration.placeholder.breedingMethod')"
                          size="large"
                          class="full-width"
                        >
                          <el-option label="Hybrid" value="hybrid" />
                          <el-option label="Selection" value="selection" />
                          <el-option label="Mutation" value="mutation" />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12">
                      <el-form-item :label="$t('research.variety.registration.form.cultivationYear')" prop="cultivationYear">
                        <el-date-picker
                          v-model="formData.cultivationYear"
                          type="year"
                          :placeholder="$t('research.variety.registration.placeholder.cultivationYear')"
                          size="large"
                          class="full-width"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item :label="$t('research.variety.registration.form.methodPedigree')" prop="methodPedigree">
                        <el-input
                          v-model="formData.methodPedigree"
                          :placeholder="$t('research.variety.registration.placeholder.methodPedigree')"
                          type="textarea"
                          :rows="2"
                          size="large"
                        />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>

                <!-- 3. 技术性状信息 -->
                <div class="form-section">
                  <div class="section-header">
                    <i class="ri-bar-chart-line"></i>
                    <h3>{{ $t('research.variety.registration.sections.technicalInfo') }}</h3>
                  </div>
                  <el-row :gutter="24">
                    <el-col :xs="24" :sm="12">
                      <el-form-item :label="$t('research.variety.registration.form.minYieldPotential')" prop="minYieldPotential">
                        <el-input
                          v-model.number="formData.minYieldPotential"
                          :placeholder="$t('research.variety.registration.placeholder.minYieldPotential')"
                          type="number"
                          size="large"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12">
                      <el-form-item :label="$t('research.variety.registration.form.maxYieldPotential')" prop="maxYieldPotential">
                        <el-input
                          v-model.number="formData.maxYieldPotential"
                          :placeholder="$t('research.variety.registration.placeholder.maxYieldPotential')"
                          type="number"
                          size="large"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12">
                      <el-form-item :label="$t('research.variety.registration.form.growthPeriod')" prop="growthPeriod">
                        <el-input
                          v-model.number="formData.growthPeriod"
                          :placeholder="$t('research.variety.registration.placeholder.growthPeriod')"
                          type="number"
                          size="large"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12">
                      <el-form-item :label="$t('research.variety.registration.form.plantHeight')" prop="plantHeight">
                        <el-input
                          v-model.number="formData.plantHeight"
                          :placeholder="$t('research.variety.registration.placeholder.plantHeight')"
                          type="number"
                          size="large"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item :label="$t('research.variety.registration.form.diseaseResistance')" prop="diseaseResistance">
                        <el-input
                          v-model="formData.diseaseResistance"
                          :placeholder="$t('research.variety.registration.placeholder.diseaseResistance')"
                          type="textarea"
                          :rows="2"
                          size="large"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item :label="$t('research.variety.registration.form.stressResistance')" prop="stressResistance">
                        <el-input
                          v-model="formData.stressResistance"
                          :placeholder="$t('research.variety.registration.placeholder.stressResistance')"
                          type="textarea"
                          :rows="2"
                          size="large"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item :label="$t('research.variety.registration.form.grainQuality')" prop="grainQuality">
                        <el-input
                          v-model="formData.grainQuality"
                          :placeholder="$t('research.variety.registration.placeholder.grainQuality')"
                          type="textarea"
                          :rows="2"
                          size="large"
                        />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>

                <!-- 4. 试验和性能信息 -->
                <div class="form-section">
                  <div class="section-header">
                    <i class="ri-flask-line"></i>
                    <h3>{{ $t('research.variety.registration.sections.trialInfo') }}</h3>
                  </div>
                  <el-row :gutter="24">
                    <el-col :xs="24" :sm="12">
                      <el-form-item :label="$t('research.variety.registration.form.trialLocation')" prop="trialLocation">
                        <el-input
                          v-model="formData.trialLocation"
                          :placeholder="$t('research.variety.registration.placeholder.trialLocation')"
                          size="large"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12">
                      <el-form-item :label="$t('research.variety.registration.form.trialYear')" prop="trialYear">
                        <el-date-picker
                          v-model="formData.trialYear"
                          type="year"
                          :placeholder="$t('research.variety.registration.placeholder.trialYear')"
                          size="large"
                          class="full-width"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12">
                      <el-form-item :label="$t('research.variety.registration.form.averageYield')" prop="averageYield">
                        <el-input
                          v-model.number="formData.averageYield"
                          :placeholder="$t('research.variety.registration.placeholder.averageYield')"
                          type="number"
                          size="large"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12">
                      <el-form-item :label="$t('research.variety.registration.form.stabilityScore')" prop="stabilityScore">
                        <el-input
                          v-model.number="formData.stabilityScore"
                          :placeholder="$t('research.variety.registration.placeholder.stabilityScore')"
                          type="number"
                          size="large"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item :label="$t('research.variety.registration.form.trialReport')" prop="trialReport">
                        <el-upload
                          v-if="!isView"
                          v-model:file-list="formData.trialReport"
                          :auto-upload="false"
                          :limit="5"
                          accept=".pdf,.jpg,.jpeg,.png"
                          list-type="picture-card"
                        >
                          <div class="upload-icon">
                            <i class="ri-upload-2-line"></i>
                            <div class="upload-text">{{ $t('common.upload') }}</div>
                          </div>
                        </el-upload>
                        <div v-else class="file-list">
                          <div v-for="file in formData.trialReport" :key="file.uid" class="file-item">
                            <i class="ri-file-text-line"></i>
                            <span>{{ file.name }}</span>
                          </div>
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item :label="$t('research.variety.registration.form.photos')" prop="photos">
                        <el-upload
                          v-if="!isView"
                          v-model:file-list="formData.photos"
                          :auto-upload="false"
                          :limit="10"
                          accept=".jpg,.jpeg,.png"
                          list-type="picture-card"
                        >
                          <div class="upload-icon">
                            <i class="ri-upload-2-line"></i>
                            <div class="upload-text">{{ $t('common.upload') }}</div>
                          </div>
                        </el-upload>
                        <div v-else class="file-list">
                          <div v-for="file in formData.photos" :key="file.uid" class="file-item">
                            <i class="ri-image-line"></i>
                            <span>{{ file.name }}</span>
                          </div>
                        </div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>

                <!-- 5. 监管信息 -->
                <div class="form-section">
                  <div class="section-header">
                    <i class="ri-shield-check-line"></i>
                    <h3>{{ $t('research.variety.registration.sections.regulatoryInfo') }}</h3>
                  </div>
                  <el-row :gutter="24">
                    <el-col :xs="24" :sm="12">
                      <el-form-item :label="$t('research.variety.registration.form.approvalDocumentNo')" prop="approvalDocumentNo">
                        <el-input
                          v-model="formData.approvalDocumentNo"
                          :placeholder="$t('research.variety.registration.placeholder.approvalDocumentNo')"
                          size="large"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12">
                      <el-form-item :label="$t('research.variety.registration.form.approvalAgency')" prop="approvalAgency">
                        <el-input
                          v-model="formData.approvalAgency"
                          :placeholder="$t('research.variety.registration.placeholder.approvalAgency')"
                          size="large"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12">
                      <el-form-item :label="$t('research.variety.registration.form.approvalDate')" prop="approvalDate">
                        <el-date-picker
                          v-model="formData.approvalDate"
                          type="date"
                          :placeholder="$t('research.variety.registration.placeholder.approvalDate')"
                          size="large"
                          class="full-width"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12">
                      <el-form-item :label="$t('research.variety.registration.form.certificationDocument')" prop="certificationDocument">
                        <el-upload
                          v-if="!isView"
                          v-model:file-list="formData.certificationDocument"
                          :auto-upload="false"
                          :limit="5"
                          accept=".pdf,.jpg,.jpeg,.png"
                          list-type="picture-card"
                        >
                          <div class="upload-icon">
                            <i class="ri-upload-2-line"></i>
                            <div class="upload-text">{{ $t('common.upload') }}</div>
                          </div>
                        </el-upload>
                        <div v-else class="file-list">
                          <div v-for="file in formData.certificationDocument" :key="file.uid" class="file-item">
                            <i class="ri-file-text-line"></i>
                            <span>{{ file.name }}</span>
                          </div>
                        </div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>

                <!-- 表单操作按钮 -->
                <div v-if="!isView" class="form-actions">
                  <el-button @click="handleReset" size="large">
                    {{ $t('common.reset') }}
                  </el-button>
                  <el-button @click="handleSaveDraft" :loading="draftLoading" size="large">
                    {{ $t('research.variety.registration.actions.saveDraft') }}
                  </el-button>
                  <el-button
                    type="primary"
                    @click="handleSubmit"
                    :loading="submitLoading"
                    class="submit-btn"
                    size="large"
                  >
                    <i class="ri-send-plane-line"></i>
                    {{ $t('research.variety.registration.actions.submit') }}
                  </el-button>
                </div>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useUserStore } from '@/store'
import {
  submitVarietyRegistration,
  getVarietyRegistrationList,
  getVarietyRegistrationDetail,
  uploadFile,
  uploadFiles,
  getEnterpriseCertifyDetail
} from '@/api/enterprise'

const { t } = useI18n()
const userStore = useUserStore()

// 页面状态
const showForm = ref(false)
const isEdit = ref(false)
const isView = ref(false)
const loading = ref(false)
const submitLoading = ref(false)
const draftLoading = ref(false)

// 表单引用
const formRef = ref(null)

// 搜索筛选
const searchQuery = ref('')
const filterCrop = ref('')
const filterStatus = ref('')

// 分页
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 企业信息
const enterpriseInfo = reactive({
  enterpriseName: '',
  enterpriseId: '',
  unifiedSocialCreditCode: '',
  seedLicenseNo: '',
  enterpriseType: ''
})

// 表单数据
const formData = reactive({
  varietyName: '',
  varietyCode: '',
  cropType: '',
  species: '',
  genus: '',
  family: '',
  breedingMethod: '',
  methodPedigree: '',
  cultivationYear: '',
  minYieldPotential: null,
  maxYieldPotential: null,
  diseaseResistance: '',
  stressResistance: '',
  growthPeriod: null,
  plantHeight: null,
  grainQuality: '',
  trialLocation: '',
  trialYear: '',
  averageYield: null,
  stabilityScore: null,
  trialReport: [],
  photos: [],
  approvalDocumentNo: '',
  approvalAgency: '',
  approvalDate: '',
  certificationDocument: []
})

// 表单验证规则
const rules = computed(() => ({
  varietyName: [{ required: true, message: t('research.variety.registration.rules.varietyNameRequired'), trigger: 'blur' }],
  varietyCode: [{ required: true, message: t('research.variety.registration.rules.varietyCodeRequired'), trigger: 'blur' }],
  cropType: [{ required: true, message: t('research.variety.registration.rules.cropTypeRequired'), trigger: 'change' }],
  species: [{ required: true, message: t('research.variety.registration.rules.speciesRequired'), trigger: 'blur' }],
  breedingMethod: [{ required: true, message: t('research.variety.registration.rules.breedingMethodRequired'), trigger: 'change' }],
  cultivationYear: [{ required: true, message: t('research.variety.registration.rules.cultivationYearRequired'), trigger: 'change' }]
}))

// 列表数据
const listData = ref([])

// 筛选后的列表
const filteredList = computed(() => listData.value)

// 处理页码变化
const handlePageChange = (page) => {
  currentPage.value = page
  loadData()
}

// 处理每页条数变化
const handleSizeChange = (size) => {
  pageSize.value = size
  currentPage.value = 1
  loadData()
}

// 获取状态标签样式 - 映射后端状态值
const getStatusTagType = (status) => {
  const tagMap = {
    0: 'warning', // 审核中
    1: 'success', // 待发布
    2: 'danger',  // 已驳回
    3: ''         // 已发布
  }
  return tagMap[status] || 'info'
}

// 获取状态标签文本
const getStatusLabel = (status) => {
  // 映射后端状态到前端显示
  const statusMap = {
    0: 'pending',   // 审核中
    1: 'approved',  // 待发布
    2: 'rejected',  // 已驳回
    3: 'published'  // 已发布
  }
  const mappedStatus = statusMap[status] || status
  return t(`research.variety.registration.status.${mappedStatus}`)
}

// 格式化日期
const formatDate = (dateStr) => {
  if (!dateStr) return '-'
  const date = new Date(dateStr)
  return date.toLocaleDateString()
}

// 新增
const handleAdd = () => {
  isEdit.value = false
  isView.value = false
  showForm.value = true
  resetForm()
}

// 查看
const handleView = async (row) => {
  isEdit.value = false
  isView.value = true
  showForm.value = true
  await loadDetailData(row.registrationId)
}

// 编辑
const handleEdit = async (row) => {
  isEdit.value = true
  isView.value = false
  showForm.value = true
  await loadDetailData(row.registrationId)
}

// 加载详情数据
const loadDetailData = async (registrationId) => {
  try {
    loading.value = true
    const res = await getVarietyRegistrationDetail(registrationId)
    if (res.code === 200 && res.data) {
      const data = res.data

      // 映射后端数据到表单
      Object.assign(formData, {
        varietyName: data.varietyName || '',
        varietyCode: data.varietyCode || '',
        cropType: data.cropType || '',
        species: data.species || '',
        genus: data.genus || '',
        family: data.family || '',
        breedingMethod: data.breedingMethod || '',
        methodPedigree: data.methodPedigree || '',
        cultivationYear: data.breedingYear ? new Date(data.breedingYear, 0) : '',
        minYieldPotential: data.minYieldPotential || null,
        maxYieldPotential: data.maxYieldPotential || null,
        diseaseResistance: data.diseaseResistance || '',
        stressResistance: data.stressResistance || '',
        growthPeriod: data.growthPeriod || null,
        plantHeight: data.plantHeight || null,
        grainQuality: data.grainQualityTraits || '',
        trialLocation: data.testLocation || '',
        trialYear: data.testYear ? new Date(data.testYear, 0) : '',
        averageYield: data.averageYield || null,
        stabilityScore: data.stabilityScore || null,
        trialReport: data.testReportUrl ? [{ name: '试验报告', url: data.testReportUrl }] : [],
        photos: data.photoUrl ? [{ name: '品种照片', url: data.photoUrl }] : [],
        approvalDocumentNo: data.approvalDocNo || '',
        approvalAgency: data.approvalOrg || '',
        approvalDate: data.approvalDate || '',
        certificationDocument: data.certificationDocUrl ? [{ name: '认证文件', url: data.certificationDocUrl }] : []
      })
    }
  } catch (error) {
    console.error('加载详情失败:', error)
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
}

// 删除
const handleDelete = (row) => {
  ElMessageBox.confirm(
    t('research.variety.registration.messages.deleteConfirm'),
    t('common.tips'),
    {
      confirmButtonText: t('common.confirm'),
      cancelButtonText: t('common.cancel'),
      type: 'warning'
    }
  ).then(() => {
    // TODO: 调用删除API
    ElMessage.success(t('research.variety.registration.messages.deleteSuccess'))
  }).catch(() => {})
}

// 取消表单
const handleCancelForm = () => {
  showForm.value = false
  isEdit.value = false
  isView.value = false
  resetForm()
}

// 重置表单
const handleReset = () => {
  formRef.value?.resetFields()
}

// 重置表单数据
const resetForm = () => {
  Object.assign(formData, {
    varietyName: '',
    varietyCode: '',
    cropType: '',
    species: '',
    genus: '',
    family: '',
    breedingMethod: '',
    methodPedigree: '',
    cultivationYear: '',
    minYieldPotential: null,
    maxYieldPotential: null,
    diseaseResistance: '',
    stressResistance: '',
    growthPeriod: null,
    plantHeight: null,
    grainQuality: '',
    trialLocation: '',
    trialYear: '',
    averageYield: null,
    stabilityScore: null,
    trialReport: [],
    photos: [],
    approvalDocumentNo: '',
    approvalAgency: '',
    approvalDate: '',
    certificationDocument: []
  })
  formRef.value?.clearValidate()
}

// 保存草稿
const handleSaveDraft = async () => {
  draftLoading.value = true
  try {
    // TODO: 调用保存草稿API
    console.log('Save draft:', formData)
    ElMessage.success(t('research.variety.registration.messages.saveDraftSuccess'))
  } catch (error) {
    console.error(error)
  } finally {
    draftLoading.value = false
  }
}

// 上传文件辅助函数
const uploadFileHelper = async (files) => {
  if (!files || files.length === 0) return []

  const uploadedUrls = []
  for (const file of files) {
    if (file.raw) {
      const formData = new FormData()
      formData.append('file', file.raw)
      try {
        const res = await uploadFile(formData)
        if (res.code === 200 && res.data) {
          uploadedUrls.push(res.data.filePath)
        }
      } catch (error) {
        console.error('文件上传失败:', error)
      }
    } else if (file.url) {
      uploadedUrls.push(file.url)
    }
  }
  return uploadedUrls
}

// 提交表单
const handleSubmit = async () => {
  try {
    await formRef.value?.validate()
    submitLoading.value = true

    try {
      // 上传文件
      const testReportUrls = await uploadFileHelper(formData.trialReport)
      const photoUrls = await uploadFileHelper(formData.photos)
      const certDocUrls = await uploadFileHelper(formData.certificationDocument)

      // 准备提交数据
      const submitData = {
        enterpriseId: enterpriseInfo.enterpriseId,
        enterpriseName: enterpriseInfo.enterpriseName,
        unifiedSocialCreditCode: enterpriseInfo.unifiedSocialCreditCode,
        enterpriseType: enterpriseInfo.enterpriseType,
        seedLicenseNo: enterpriseInfo.seedLicenseNo,
        recordType: '新品种登记',
        recordDate: new Date().toISOString().split('T')[0],
        varietyName: formData.varietyName,
        varietyCode: formData.varietyCode,
        cropType: formData.cropType,
        species: formData.species,
        genus: formData.genus,
        family: formData.family,
        breedingMethod: formData.breedingMethod,
        methodPedigree: formData.methodPedigree,
        breedingYear: formData.cultivationYear ? new Date(formData.cultivationYear).getFullYear() : null,
        minYieldPotential: formData.minYieldPotential,
        maxYieldPotential: formData.maxYieldPotential,
        diseaseResistance: formData.diseaseResistance,
        stressResistance: formData.stressResistance,
        growthPeriod: formData.growthPeriod,
        plantHeight: formData.plantHeight,
        grainQualityTraits: formData.grainQuality,
        testLocation: formData.trialLocation,
        testYear: formData.trialYear ? new Date(formData.trialYear).getFullYear() : null,
        averageYield: formData.averageYield,
        stabilityScore: formData.stabilityScore,
        testReportUrl: testReportUrls[0] || '',
        photoUrl: photoUrls[0] || '',
        approvalDocNo: formData.approvalDocumentNo,
        approvalOrg: formData.approvalAgency,
        approvalDate: formData.approvalDate ? new Date(formData.approvalDate).toISOString().split('T')[0] : '',
        certificationDocUrl: certDocUrls[0] || '',
        operator: userStore.userInfo?.userName || userStore.userInfo?.nickName || '',
        operationOrg: enterpriseInfo.enterpriseName
      }

      const res = await submitVarietyRegistration(submitData)
      if (res.code === 200) {
        ElMessage.success(t('research.variety.registration.messages.submitSuccess'))
        setTimeout(() => {
          showForm.value = false
          resetForm()
          loadData()
        }, 1500)
      }
    } catch (error) {
      console.error('提交失败:', error)
      ElMessage.error(t('research.variety.registration.messages.submitFailed'))
    } finally {
      submitLoading.value = false
    }
  } catch (error) {
    console.log('Validation failed', error)
  }
}

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    // 构建查询参数
    const params = {
      pageNum: currentPage.value,
      pageSize: pageSize.value
    }

    if (searchQuery.value) {
      params.varietyName = searchQuery.value
    }
    if (filterCrop.value) {
      params.cropType = filterCrop.value
    }
    if (filterStatus.value) {
      params.recordStatus = filterStatus.value
    }

    const res = await getVarietyRegistrationList(params)
    if (res.code === 200) {
      listData.value = res.rows || []
      total.value = res.total || 0
    }
  } catch (error) {
    console.error('加载数据失败:', error)
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
}

// 加载企业信息
const loadEnterpriseInfo = async () => {
  try {
    const res = await getEnterpriseCertifyDetail()
    if (res.code === 200 && res.data) {
      Object.assign(enterpriseInfo, {
        enterpriseName: res.data.enterpriseName || '',
        enterpriseId: res.data.enterpriseId || '',
        unifiedSocialCreditCode: res.data.unifiedSocialCreditCode || '',
        seedLicenseNo: res.data.seedLicenseNo || '',
        enterpriseType: res.data.enterpriseType || ''
      })
    }
  } catch (error) {
    console.error('加载企业信息失败:', error)
  }
}

onMounted(() => {
  loadEnterpriseInfo()
  loadData()
})
</script>

<style scoped>
.page-container {
  min-height: calc(100vh - 200px);
  background: linear-gradient(to bottom, #f8fafb 0%, #ffffff 100%);
}

.page-wrapper {
  max-width: 1400px;
  margin: 0 auto;
}

/* 页面头部 */
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 40px;
  padding: 32px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.06);
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.05) 0%, rgba(254, 221, 0, 0.03) 100%);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 24px;
  flex: 1;
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

.header-right {
  flex-shrink: 0;
}

/* 内容区域 */
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

.card-body {
  padding: 24px;
}

.form-body-scrollable {
  max-height: calc(100vh - 320px);
  overflow-y: auto;
  padding-right: 12px;
}

.form-body-scrollable::-webkit-scrollbar {
  width: 8px;
}

.form-body-scrollable::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.form-body-scrollable::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.form-body-scrollable::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* 搜索区域 */
.search-section {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.search-input {
  flex: 1;
  min-width: 200px;
}

.filter-select {
  width: 200px;
}

/* 表格 */
.table-wrapper :deep(.el-table) {
  border-radius: 8px;
}

.table-wrapper :deep(.el-table__header th) {
  background-color: rgba(0, 154, 68, 0.05);
  color: #009A44;
  font-weight: 600;
}

/* 操作按钮容器 */
.action-buttons {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
}

.action-buttons .el-button {
  margin: 0;
}

/* 分页 */
.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #e8f5e9;
}

/* 移动端卡片 */
.card-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.empty-state {
  background: white;
  border-radius: 12px;
  padding: 60px 20px;
  text-align: center;
}

.empty-state i {
  font-size: 64px;
  color: #dcdfe6;
  margin-bottom: 16px;
}

.empty-state p {
  font-size: 14px;
  color: #909399;
  margin: 0;
}

.variety-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  transition: all 0.3s;
  cursor: pointer;
}

.variety-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.card-header-mobile {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f2f5;
}

.variety-name {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  flex: 1;
}

.card-body-mobile {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 12px;
}

.card-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.card-row .label {
  font-size: 14px;
  color: #909399;
  flex-shrink: 0;
}

.card-row .value {
  font-size: 14px;
  color: #303133;
  text-align: right;
}

.card-actions {
  display: flex;
  gap: 8px;
  padding-top: 12px;
  border-top: 1px solid #f0f2f5;
}

/* 表单区域 */
.variety-form {
  margin-top: 0;
}

.form-section {
  margin-bottom: 32px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid rgba(0, 154, 68, 0.1);
}

.section-header i {
  font-size: 24px;
  color: #009A44;
}

.section-header h3 {
  font-size: 18px;
  font-weight: 700;
  color: #303133;
  margin: 0;
}

/* 只读信息展示 */
.info-grid-readonly {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  padding: 20px;
  background: #fafafa;
  border-radius: 8px;
  border: 1px solid #ebeef5;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.info-item:last-child {
  border-bottom: none;
}

.info-item .label {
  font-weight: 600;
  color: #606266;
  font-size: 14px;
}

.info-item .value {
  color: #303133;
  font-size: 15px;
}

.variety-form :deep(.el-form-item__label) {
  font-size: 15px;
  font-weight: 600;
  color: #606266;
  padding-bottom: 10px;
}

.variety-form :deep(.el-input__wrapper) {
  border-radius: 8px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1) inset;
  transition: all 0.3s ease;
}

.variety-form :deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px #009A44 inset;
}

.variety-form :deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px #009A44 inset;
}

.variety-form :deep(.el-textarea__inner) {
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.variety-form :deep(.el-textarea__inner:hover) {
  border-color: #009A44;
}

.variety-form :deep(.el-textarea__inner:focus) {
  border-color: #009A44;
}

.full-width {
  width: 100%;
}

.upload-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.upload-icon i {
  font-size: 28px;
  color: #8c939d;
}

.upload-text {
  margin-top: 8px;
  font-size: 12px;
  color: #606266;
}

.file-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.file-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: #f5f7fa;
  border-radius: 4px;
  font-size: 14px;
  color: #606266;
}

.file-item i {
  font-size: 16px;
  color: #909399;
}

/* 表单操作 */
.form-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 32px;
  margin-bottom: 24px;
  padding-top: 24px;
  padding-bottom: 24px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.form-actions :deep(.el-button) {
  min-width: 140px;
  border-radius: 8px;
  font-weight: 600;
}

.submit-btn {
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  border: none;
}

.submit-btn:hover {
  background: linear-gradient(135deg, #008038 0%, #009A44 100%);
}

.submit-btn i {
  margin-right: 4px;
}

/* 响应式控制 */
.pc-only {
  display: block;
}

.mobile-only {
  display: none !important;
}

/* 响应式设计 */
@media screen and (max-width: 1024px) {
  .info-grid-readonly {
    grid-template-columns: 1fr;
  }
}

@media screen and (max-width: 768px) {
  .page-header {
    flex-direction: column;
    padding: 24px 20px;
    gap: 16px;
  }

  .header-left {
    width: 100%;
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

  .header-right {
    width: 100%;
  }

  .header-right .el-button {
    width: 100%;
  }

  .card-body {
    padding: 16px;
  }

  .search-section {
    flex-direction: column;
  }

  .search-input,
  .filter-select {
    width: 100%;
  }

  .info-grid-readonly {
    grid-template-columns: 1fr;
    padding: 16px;
  }

  .form-actions {
    flex-direction: column;
  }

  .form-actions :deep(.el-button) {
    width: 100%;
  }

  .pc-only {
    display: none !important;
  }

  .mobile-only {
    display: flex !important;
  }
}
</style>
