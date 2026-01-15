<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader
        icon="ri-settings-3-line"
        :title="$t('system.config.title')"
        :subtitle="$t('system.config.subtitle')" />

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <!-- 搜索卡片 -->
        <div class="search-card">
          <SearchForm @search="handleQuery" @reset="handleReset">
            <SearchItem :label="$t('system.config.configName')">
              <el-input
                v-model="queryParams.configName"
                :placeholder="$t('common.pleaseInput')"
                clearable
                class="search-input" />
            </SearchItem>

            <SearchItem :label="$t('system.config.configKey')">
              <el-input
                v-model="queryParams.configKey"
                :placeholder="$t('common.pleaseInput')"
                clearable
                class="search-input" />
            </SearchItem>

            <SearchItem :label="$t('system.config.configType')">
              <el-select
                v-model="queryParams.configType"
                :placeholder="$t('common.pleaseSelect')"
                clearable
                class="filter-select">
                <el-option :label="$t('common.yes')" value="Y" />
                <el-option :label="$t('common.no')" value="N" />
              </el-select>
            </SearchItem>
          </SearchForm>
        </div>

        <!-- 列表卡片 -->
        <InfoCard :title="$t('system.config.list')" icon="ri-settings-line">
          <template #actions>
            <el-button type="danger" @click="handleRefreshCache">
              <i class="ri-refresh-line"></i>
              {{ $t('system.config.refreshCache') }}
            </el-button>
            <el-button type="primary" @click="handleAdd">
              <i class="ri-add-line"></i>
              {{ $t('system.common.add') }}
            </el-button>
          </template>

          <!-- PC端表格 -->
          <div class="table-wrapper pc-only">
            <el-table :data="configList" stripe v-loading="loading">
              <el-table-column type="selection" width="55" align="center" />
              <el-table-column prop="configName" :label="$t('system.config.configName')" min-width="180" show-overflow-tooltip />
              <el-table-column prop="configKey" :label="$t('system.config.configKey')" min-width="200" show-overflow-tooltip />
              <el-table-column :label="$t('system.config.configValue')" min-width="200" show-overflow-tooltip>
                <template #default="{ row }">
                  {{ parseConfigValueDisplay(row.configValue) }}
                </template>
              </el-table-column>
              <el-table-column :label="$t('system.config.configType')" width="120" align="center">
                <template #default="{ row }">
                  <el-tag :type="row.configType === 'Y' ? 'success' : 'info'" effect="plain">
                    {{ row.configType === 'Y' ? $t('common.yes') : $t('common.no') }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="createTime" :label="$t('system.user.createTime')" width="160" />
              <el-table-column :label="$t('system.common.operate')" width="240" fixed="right" align="center">
                <template #default="{ row }">
                  <el-button type="primary" size="small" @click="handleEdit(row)">
                    {{ $t('system.common.edit') }}
                  </el-button>
                  <el-button type="danger" size="small" @click="handleDelete(row)">
                    {{ $t('system.common.delete') }}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>

            <div class="pagination-wrapper">
              <el-pagination
                v-model:current-page="queryParams.pageNum"
                v-model:page-size="queryParams.pageSize"
                :page-sizes="[10, 20, 50, 100]"
                :total="total"
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="getList"
                @current-change="getList"
              />
            </div>
          </div>
        </InfoCard>

        <!-- 移动端卡片 -->
        <div class="mobile-card-list mobile-only">
          <div v-for="item in configList" :key="item.configId" class="mobile-card">
            <div class="mobile-card-header">
              <div class="mobile-card-title">
                <i class="ri-settings-line"></i>
                <span>{{ item.configName }}</span>
              </div>
            </div>
            <div class="mobile-card-body">
              <div class="mobile-card-row">
                <span class="label">{{ $t('system.config.configKey') }}:</span>
                <span class="value">{{ item.configKey }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('system.config.configValue') }}:</span>
                <span class="value">{{ parseConfigValueDisplay(item.configValue) }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('system.config.configType') }}:</span>
                <span class="value">
                  <el-tag :type="item.configType === 'Y' ? 'success' : 'info'" effect="plain">
                    {{ item.configType === 'Y' ? $t('common.yes') : $t('common.no') }}
                  </el-tag>
                </span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('system.user.createTime') }}:</span>
                <span class="value">{{ item.createTime }}</span>
              </div>
            </div>
            <div class="mobile-card-actions">
              <el-button type="primary" size="small" @click="handleEdit(item)">
                {{ $t('system.common.edit') }}
              </el-button>
              <el-button type="danger" size="small" @click="handleDelete(item)">
                {{ $t('system.common.delete') }}
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Dialog -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="650px"
      destroy-on-close
    >
      <el-form ref="formRef" :model="form" :rules="rules" label-width="100px" label-position="top">
        <el-form-item :label="$t('system.config.configName')" prop="configName">
          <el-input v-model="form.configName" :placeholder="$t('common.pleaseInput')" />
        </el-form-item>
        <el-form-item :label="$t('system.config.configKey')" prop="configKey">
          <el-input v-model="form.configKey" :placeholder="$t('common.pleaseInput')" />
        </el-form-item>
        
        <!-- 国际化配置值开关 -->
        <el-form-item>
          <el-checkbox v-model="form.enableI18n">
            {{ $t('system.config.enableI18n') || '启用国际化配置值' }}
          </el-checkbox>
        </el-form-item>
        
        <!-- 非国际化模式 -->
        <el-form-item v-if="!form.enableI18n" :label="$t('system.config.configValue')" prop="configValue">
          <el-input v-model="form.configValue" :placeholder="$t('common.pleaseInput')" type="textarea" :rows="3" />
        </el-form-item>
        
        <!-- 国际化模式 - 动态渲染所有支持的语言 -->
        <template v-else>
          <el-form-item 
            v-for="lang in SUPPORTED_LOCALES" 
            :key="lang.jsonKey"
            :label="`${$t('system.config.configValue')} (${lang.label})`"
          >
            <el-input 
              v-model="form.i18nValues[lang.jsonKey]" 
              :placeholder="$t('common.pleaseInput')" 
              type="textarea" 
              :rows="2" 
            />
          </el-form-item>
        </template>
        
        <el-form-item :label="$t('system.config.configType')">
          <el-radio-group v-model="form.configType">
            <el-radio value="Y">{{ $t('common.yes') }}</el-radio>
            <el-radio value="N">{{ $t('common.no') }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('system.config.remark')">
          <el-input v-model="form.remark" :placeholder="$t('common.pleaseInput')" type="textarea" :rows="2" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">{{ $t('system.common.cancel') }}</el-button>
        <el-button type="primary" @click="submitForm">{{ $t('system.common.confirm') }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { listConfig, getConfig, addConfig, updateConfig, delConfig, refreshCache } from '@/api/system/config'
import { parseI18nValue, extractI18nValues, buildI18nValue, SUPPORTED_LOCALES } from '@/utils/i18nHelper'
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'
import '@/assets/styles/page-common.scss'
import '@/assets/styles/workflow-common.scss'
import '@/assets/styles/table-enhanced.scss'

const { t, locale } = useI18n()

const loading = ref(false)
const configList = ref([])
const total = ref(0)
const dialogVisible = ref(false)

const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  configName: '',
  configKey: '',
  configType: ''
})

const form = ref({
  configId: undefined,
  configName: '',
  configKey: '',
  configValue: '',
  i18nValues: {},  // 动态语言值 { zh_CN: '', en_US: '', ... }
  enableI18n: false,
  configType: 'N',
  remark: ''
})

const formRef = ref(null)

const dialogTitle = computed(() => {
  return form.value.configId ? t('system.config.edit') : t('system.config.add')
})

const rules = {
  configName: [{ required: true, message: () => t('common.pleaseInput') + t('system.config.configName'), trigger: 'blur' }],
  configKey: [{ required: true, message: () => t('common.pleaseInput') + t('system.config.configKey'), trigger: 'blur' }]
}

/**
 * 解析配置值用于显示（支持国际化 JSON）
 */
const parseConfigValueDisplay = (value) => {
  return parseI18nValue(value, locale.value, value)
}

/**
 * 解析配置值用于编辑（提取多语言值）
 */
const parseConfigValueForEdit = (value) => {
  const i18nValues = extractI18nValues(value)
  const hasI18n = Object.values(i18nValues).some(v => v !== '')
  
  return {
    enableI18n: hasI18n,
    i18nValues: i18nValues,
    raw: value || ''
  }
}

/**
 * 构建配置值（将多语言值转为 JSON）
 */
const buildConfigValueForSubmit = () => {
  if (form.value.enableI18n) {
    return buildI18nValue(form.value.i18nValues)
  }
  return form.value.configValue
}

const getList = async () => {
  loading.value = true
  try {
    const res = await listConfig(queryParams)
    configList.value = res.rows || []
    total.value = res.total || 0
  } catch (error) {
    console.error('Failed to fetch configs:', error)
  } finally {
    loading.value = false
  }
}

const handleQuery = () => {
  queryParams.pageNum = 1
  getList()
}

const handleReset = () => {
  queryParams.configName = ''
  queryParams.configKey = ''
  queryParams.configType = ''
  handleQuery()
}

const handleAdd = () => {
  // 初始化空的 i18nValues
  const emptyI18nValues = {}
  SUPPORTED_LOCALES.forEach(l => {
    emptyI18nValues[l.jsonKey] = ''
  })
  
  form.value = {
    configId: undefined,
    configName: '',
    configKey: '',
    configValue: '',
    i18nValues: emptyI18nValues,
    enableI18n: false,
    configType: 'N',
    remark: ''
  }
  dialogVisible.value = true
}

const handleEdit = async (row) => {
  try {
    const res = await getConfig(row.configId)
    const data = res.data || row
    
    // 解析配置值
    const parsed = parseConfigValueForEdit(data.configValue)
    
    form.value = {
      ...data,
      enableI18n: parsed.enableI18n,
      i18nValues: parsed.i18nValues,
      configValue: parsed.raw
    }
    dialogVisible.value = true
  } catch (error) {
    console.error('Failed to fetch config:', error)
  }
}

const submitForm = async () => {
  try {
    await formRef.value?.validate()
    
    // 构建提交数据
    const submitData = {
      ...form.value,
      configValue: buildConfigValueForSubmit()
    }
    // 移除临时字段
    delete submitData.enableI18n
    delete submitData.i18nValues
    
    if (form.value.configId) {
      await updateConfig(submitData)
    } else {
      await addConfig(submitData)
    }
    ElMessage.success(t('system.common.success'))
    dialogVisible.value = false
    getList()
  } catch (error) {
    console.error('Submit failed:', error)
  }
}

const handleDelete = (row) => {
  ElMessageBox.confirm(t('system.common.confirmDelete'), t('common.tip'), {
    confirmButtonText: t('system.common.confirm'),
    cancelButtonText: t('system.common.cancel'),
    type: 'warning'
  }).then(async () => {
    await delConfig(row.configId)
    ElMessage.success(t('system.common.success'))
    getList()
  }).catch(() => {})
}

const handleRefreshCache = () => {
  ElMessageBox.confirm(t('system.config.confirmRefreshCache') || '确定刷新缓存？', t('common.tip'), {
    confirmButtonText: t('system.common.confirm'),
    cancelButtonText: t('system.common.cancel'),
    type: 'warning'
  }).then(async () => {
    await refreshCache()
    ElMessage.success(t('system.common.success'))
  }).catch(() => {})
}

onMounted(() => {
  getList()
})
</script>

