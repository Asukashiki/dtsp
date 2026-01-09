<template>
  <div class="min-h-screen bg-gray-50 p-4 md:p-6">
    <div class="max-w-7xl mx-auto space-y-6">
      <!-- Search Area -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
        <el-form :model="queryParams" inline class="flex flex-wrap gap-4">
          <el-form-item :label="$t('system.notice.noticeTitle')" class="mb-0">
            <el-input
              v-model="queryParams.noticeTitle"
              :placeholder="$t('common.pleaseInput')"
              clearable
              class="w-48"
              @keyup.enter="handleQuery"
            />
          </el-form-item>
          <el-form-item :label="$t('system.notice.noticeType')" class="mb-0">
            <el-select v-model="queryParams.noticeType" clearable :placeholder="$t('common.pleaseSelect')" class="w-32">
              <el-option :label="$t('system.notice.typeNotice')" value="1" />
              <el-option :label="$t('system.notice.typeAnnouncement')" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('system.notice.status')" class="mb-0">
            <el-select v-model="queryParams.status" clearable :placeholder="$t('common.pleaseSelect')" class="w-28">
              <el-option :label="$t('system.user.normal')" value="0" />
              <el-option :label="$t('system.user.disable')" value="1" />
            </el-select>
          </el-form-item>
          <el-form-item class="mb-0">
            <el-button type="primary" @click="handleQuery">
              <i class="ri-search-line mr-1"></i>
              {{ $t('system.common.search') }}
            </el-button>
            <el-button @click="resetQuery">
              <i class="ri-refresh-line mr-1"></i>
              {{ $t('system.common.reset') }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- Main Content -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div class="flex items-center gap-3 text-lg font-semibold text-green-600">
            <i class="ri-notification-line text-xl"></i>
            <span>{{ $t('system.notice.title') }}</span>
          </div>
          <el-button type="primary" @click="handleAdd">
            <i class="ri-add-line mr-1"></i>
            {{ $t('system.common.add') }}
          </el-button>
        </div>

        <el-table v-loading="loading" :data="noticeList" class="w-full">
          <el-table-column :label="$t('system.notice.noticeTitle')" min-width="200" show-overflow-tooltip>
            <template #default="{ row }">
              {{ parseI18nValue(row.noticeTitle, locale, row.noticeTitle) }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('system.notice.noticeType')" min-width="120" align="center">
            <template #default="{ row }">
              <el-tag :type="row.noticeType === '1' ? 'warning' : 'success'" effect="light">
                {{ row.noticeType === '1' ? $t('system.notice.typeNotice') : $t('system.notice.typeAnnouncement') }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column :label="$t('system.notice.status')" min-width="100" align="center">
            <template #default="{ row }">
              <el-tag :type="row.status === '0' ? 'success' : 'danger'" effect="light">
                {{ row.status === '0' ? $t('system.user.normal') : $t('system.user.disable') }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createBy" :label="$t('system.common.createBy')" min-width="120" />
          <el-table-column prop="createTime" :label="$t('system.user.createTime')" min-width="160" />
          <el-table-column :label="$t('system.common.operate')" width="220" fixed="right" align="center">
            <template #default="{ row }">
              <el-button type="primary" link @click="handleEdit(row)">
                {{ $t('system.common.edit') }}
              </el-button>
              <el-button type="danger" link @click="handleDelete(row)">
                {{ $t('system.common.delete') }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="px-6 py-4 border-t border-gray-100">
          <el-pagination
            v-model:current-page="queryParams.pageNum"
            v-model:page-size="queryParams.pageSize"
            :page-sizes="[10, 20, 50, 100]"
            :total="total"
            background
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="getList"
            @current-change="getList"
          />
        </div>
      </div>
    </div>

    <!-- Add/Edit Dialog -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="1100px"
      top="5vh"
      destroy-on-close
    >
      <el-form ref="formRef" :model="form" :rules="rules" label-width="100px" label-position="top">
        <!-- 标题使用 I18nInput 国际化输入 -->
        <el-form-item :label="$t('system.notice.noticeTitle')" prop="noticeTitle">
          <I18nInput v-model="form.noticeTitleI18n" />
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="$t('system.notice.noticeType')" prop="noticeType">
              <el-select v-model="form.noticeType" :placeholder="$t('common.pleaseSelect')" class="w-full">
                <el-option :label="$t('system.notice.typeNotice')" value="1" />
                <el-option :label="$t('system.notice.typeAnnouncement')" value="2" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('system.notice.status')">
              <el-radio-group v-model="form.status">
                <el-radio value="0">{{ $t('system.user.normal') }}</el-radio>
                <el-radio value="1">{{ $t('system.user.disable') }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 内容使用 I18nRichText 富文本国际化输入 -->
        <el-form-item :label="$t('system.notice.noticeContent')" prop="noticeContent">
          <I18nRichText v-model="form.noticeContentI18n" height="300px" />
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
import { listNotice, getNotice, addNotice, updateNotice, delNotice } from '@/api/system/notice'
import { parseI18nValue, extractI18nValues, buildI18nValue } from '@/utils/i18nHelper'
import I18nInput from '@/components/I18nInput/index.vue'
import I18nRichText from '@/components/I18nRichText/index.vue'

const { t, locale } = useI18n()

const loading = ref(false)
const noticeList = ref([])
const total = ref(0)
const dialogVisible = ref(false)

const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  noticeTitle: '',
  noticeType: '',
  status: ''
})

const form = ref({
  noticeId: undefined,
  noticeTitle: '',
  noticeTitleI18n: extractI18nValues(''),
  noticeType: '1',
  noticeContent: '',
  noticeContentI18n: extractI18nValues(''),
  status: '0'
})

const formRef = ref(null)

const dialogTitle = computed(() => {
  return form.value.noticeId ? t('system.notice.edit') : t('system.notice.add')
})

const rules = {
  noticeType: [{ required: true, message: () => t('common.pleaseSelect') + t('system.notice.noticeType'), trigger: 'change' }]
}

const getList = async () => {
  loading.value = true
  try {
    const res = await listNotice(queryParams)
    noticeList.value = res.rows || []
    total.value = res.total || 0
  } catch (error) {
    console.error('Failed to fetch notices:', error)
  } finally {
    loading.value = false
  }
}

const handleQuery = () => {
  queryParams.pageNum = 1
  getList()
}

const resetQuery = () => {
  queryParams.noticeTitle = ''
  queryParams.noticeType = ''
  queryParams.status = ''
  handleQuery()
}

const handleAdd = () => {
  form.value = {
    noticeId: undefined,
    noticeTitle: '',
    noticeTitleI18n: extractI18nValues(''),
    noticeType: '1',
    noticeContent: '',
    noticeContentI18n: extractI18nValues(''),
    status: '0'
  }
  dialogVisible.value = true
}

const handleEdit = async (row) => {
  try {
    const res = await getNotice(row.noticeId)
    const data = res.data || row
    
    form.value = {
      ...data,
      noticeTitleI18n: extractI18nValues(data.noticeTitle),
      noticeContentI18n: extractI18nValues(data.noticeContent)
    }
    dialogVisible.value = true
  } catch (error) {
    console.error('Failed to fetch notice:', error)
  }
}

const submitForm = async () => {
  try {
    await formRef.value?.validate()
    
    // 构建提交数据，将国际化对象转为 JSON 字符串
    const submitData = {
      ...form.value,
      noticeTitle: buildI18nValue(form.value.noticeTitleI18n),
      noticeContent: buildI18nValue(form.value.noticeContentI18n)
    }
    // 移除临时字段
    delete submitData.noticeTitleI18n
    delete submitData.noticeContentI18n
    
    if (form.value.noticeId) {
      await updateNotice(submitData)
    } else {
      await addNotice(submitData)
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
    await delNotice(row.noticeId)
    ElMessage.success(t('system.common.success'))
    getList()
  }).catch(() => {})
}

onMounted(() => {
  getList()
})
</script>

