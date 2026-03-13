<template>
  <div class="page-container">
    <div class="page-wrapper">
      <PageHeader
        icon="ri-shield-keyhole-line"
        :title="$t('inventory.permission.title')"
        :subtitle="$t('inventory.permission.subtitle')" />

      <div class="content-wrapper">
        <InfoCard :title="$t('inventory.permission.listTitle')" icon="ri-shield-keyhole-line">
          <div class="search-card">
            <SearchForm @search="handleSearch" @reset="handleReset">
              <SearchItem :label="$t('inventory.permission.search.warehouse')">
                <el-select
                  v-model="filters.warehouseId"
                  :placeholder="$t('inventory.permission.placeholder.warehouse')"
                  clearable
                  filterable
                  class="filter-select">
                  <el-option
                    v-for="item in warehouseOptions"
                    :key="item.id"
                    :label="item.warehouseName"
                    :value="item.id" />
                </el-select>
              </SearchItem>
              <SearchItem :label="$t('inventory.permission.search.owner')">
                <el-select
                  v-model="filters.ownerUserId"
                  :placeholder="$t('inventory.permission.placeholder.owner')"
                  clearable
                  filterable
                  class="filter-select">
                  <el-option
                    v-for="item in userOptions"
                    :key="item.userId"
                    :label="item.userName"
                    :value="item.userId" />
                </el-select>
              </SearchItem>
              <SearchItem :label="$t('inventory.permission.search.dept')">
              <el-tree-select
                v-model="filters.deptId"
                :data="deptOptions"
                :props="{ label: 'label', value: 'value', children: 'children' }"
                node-key="id"
                value-key="id"
                check-strictly
                filterable
                clearable
                :placeholder="$t('inventory.permission.placeholder.dept')"
                class="filter-select" />
              </SearchItem>
            </SearchForm>
          </div>

          <div class="table-wrapper pc-only">
            <el-table v-loading="loading" :data="pagedList" stripe>
              <el-table-column prop="warehouseCode" :label="$t('inventory.permission.columns.warehouseCode')" min-width="150" show-overflow-tooltip />
              <el-table-column prop="warehouseName" :label="$t('inventory.permission.columns.warehouse')" min-width="180" show-overflow-tooltip />
              <el-table-column :label="$t('inventory.permission.columns.owner')" min-width="140">
                <template #default="{ row }">
                  {{ row.ownerName || '-' }}
                </template>
              </el-table-column>
              <el-table-column :label="$t('inventory.permission.columns.ownerOrg')" min-width="160" show-overflow-tooltip>
                <template #default="{ row }">
                  {{ row.ownerOrgName || '-' }}
                </template>
              </el-table-column>
              <el-table-column :label="$t('inventory.permission.columns.dept')" min-width="220">
                <template #default="{ row }">
                  <div class="permission-tags" v-if="row.deptNames.length">
                    <el-tag v-for="name in getDeptPreview(row.deptNames)" :key="name" size="small">{{ name }}</el-tag>
                    <el-tag v-if="row.deptNames.length > deptPreviewLimit" size="small" type="info">...</el-tag>
                  </div>
                  <span v-else>-</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('inventory.permission.columns.updateTime')" min-width="170" show-overflow-tooltip>
                <template #default="{ row }">
                  {{ row.updateTime || '-' }}
                </template>
              </el-table-column>
              <el-table-column :label="$t('inventory.permission.columns.actions')" width="260" fixed="right">
                <template #default="{ row }">
                  <div class="action-buttons">
                    <el-button class="action-btn action-btn-edit" size="small" @click="openOwnerDialog(row)">
                      <i class="ri-user-star-line"></i>
                      <span class="btn-text">{{ $t('inventory.permission.actions.owner') }}</span>
                    </el-button>
                    <el-button class="action-btn action-btn-edit" type="primary" size="small" @click="openPermissionDialog(row)">
                      <i class="ri-team-line"></i>
                      <span class="btn-text">{{ $t('inventory.permission.actions.permission') }}</span>
                    </el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>

            <div class="pagination-wrapper">
              <el-pagination
                v-model:current-page="pagination.page"
                v-model:page-size="pagination.pageSize"
                :page-sizes="[10, 20, 50, 100]"
                :total="pagination.total"
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="handlePageChange"
                @current-change="handlePageChange" />
            </div>
          </div>

          <div class="mobile-card-list mobile-only" v-loading="loading">
            <div v-for="item in pagedList" :key="item.id" class="permission-card">
              <div class="card-header">
                <div class="card-title">
                  <i class="ri-shield-keyhole-line"></i>
                  <span>{{ item.warehouseName }}</span>
                </div>
              </div>
              <div class="card-body">
                <div class="info-row">
                  <span class="info-label">{{ $t('inventory.permission.columns.warehouseCode') }}</span>
                  <span class="info-value">{{ item.warehouseCode || '-' }}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">{{ $t('inventory.permission.columns.owner') }}</span>
                  <span class="info-value">{{ item.ownerName || '-' }}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">{{ $t('inventory.permission.columns.dept') }}</span>
                  <span class="info-value">{{ item.deptNames.length ? item.deptNames.join('、') : '-' }}</span>
                </div>
              </div>
              <div class="card-footer">
                <el-button class="action-btn" size="small" @click="openOwnerDialog(item)">
                  <i class="ri-user-star-line"></i>
                  <span class="btn-text">{{ $t('inventory.permission.actions.owner') }}</span>
                </el-button>
                <el-button class="action-btn" type="primary" size="small" @click="openPermissionDialog(item)">
                  <i class="ri-team-line"></i>
                  <span class="btn-text">{{ $t('inventory.permission.actions.permission') }}</span>
                </el-button>
              </div>
            </div>
            <div v-if="pagedList.length === 0 && !loading" class="empty-state">
              <i class="ri-inbox-line"></i>
              <p>{{ $t('home.noData') }}</p>
            </div>
          </div>
        </InfoCard>
      </div>
    </div>

    <el-dialog
      v-model="ownerDialogVisible"
      :title="ownerDialogTitle"
      width="560px"
      destroy-on-close
      class="responsive-dialog">
      <el-form ref="ownerFormRef" :model="ownerForm" :rules="ownerRules" label-width="120px" label-position="top">
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12">
            <el-form-item :label="$t('inventory.permission.form.warehouse')" prop="warehouseId">
              <el-input v-model="ownerForm.warehouseName" disabled />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item :label="$t('inventory.permission.form.owner')" prop="ownerUserId">
              <el-select v-model="ownerForm.ownerUserId" :placeholder="$t('inventory.permission.placeholder.owner')" filterable style="width: 100%" @change="handleOwnerUserChange">
                <el-option v-for="item in userOptions" :key="item.userId" :label="item.userName" :value="item.userId" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <el-button @click="ownerDialogVisible = false">{{ $t('common.cancel') }}</el-button>
        <el-button type="primary" :loading="ownerSubmitLoading" @click="submitOwner">{{ $t('common.save') }}</el-button>
      </template>
    </el-dialog>

    <el-dialog
      v-model="permissionDialogVisible"
      :title="permissionDialogTitle"
      width="600px"
      destroy-on-close
      class="responsive-dialog">
      <el-form ref="permissionFormRef" :model="permissionForm" :rules="permissionRules" label-width="120px" label-position="top" v-loading="permissionDialogLoading">
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12">
            <el-form-item :label="$t('inventory.permission.form.warehouse')" prop="warehouseId">
              <el-input v-model="permissionForm.warehouseName" disabled />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item :label="$t('inventory.permission.form.dept')" prop="deptIds">
              <el-tree-select
                ref="permissionDeptTreeRef"
                v-model="permissionForm.deptIds"
                :data="deptOptions"
                :props="{ label: 'label', value: 'value', children: 'children' }"
                node-key="id"
                value-key="id"
                multiple
                show-checkbox
                check-strictly
                check-on-click-node
                collapse-tags
                filterable
                style="width: 100%"
                :placeholder="$t('inventory.permission.placeholder.dept')"
                @check="handleDeptCheck" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <el-button @click="permissionDialogVisible = false">{{ $t('common.cancel') }}</el-button>
        <el-button type="primary" :loading="permissionSubmitLoading" @click="submitPermission">{{ $t('common.save') }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import {
  addWarehouseOwner,
  addWarehousePermission,
  deleteWarehousePermission,
  getWarehouseList,
  getWarehouseOwnerList,
  getWarehousePermissionList,
  updateWarehouseOwner
} from '@/api/inventory'
import { listUser } from '@/api/system/user'
import { deptTreeSelect } from '@/api/system/user'
import { getWarehouseManage, listWarehouseManage } from '@/api/warehouseManage'
import { InfoCard, PageHeader, SearchForm, SearchItem } from '@/components/common'

const { t, locale } = useI18n()

const warehouseOptions = ref([])
const userOptions = ref([])
const deptOptions = ref([])

const loading = ref(false)
const warehouseList = ref([])
const ownerRecords = ref([])
const permissionRecords = ref([])

const filters = reactive({
  warehouseId: '',
  ownerUserId: '',
  deptId: ''
})

const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0
})

const ownerDialogVisible = ref(false)
const permissionDialogVisible = ref(false)
const ownerSubmitLoading = ref(false)
const permissionSubmitLoading = ref(false)
const ownerFormRef = ref(null)
const permissionFormRef = ref(null)
const permissionDialogLoading = ref(false)
const permissionDialogRecords = ref([])
const permissionDeptTreeRef = ref(null)

const ownerForm = reactive({
  id: undefined,
  warehouseId: undefined,
  warehouseName: '',
  ownerUserId: undefined,
  ownerUserName: '',
  ownerOrgId: undefined,
  ownerOrgName: ''
})

const permissionForm = reactive({
  warehouseId: undefined,
  warehouseName: '',
  deptIds: []
})

const ownerRules = {
  warehouseId: [{ required: true, message: () => t('common.pleaseSelect') + t('inventory.permission.form.warehouse'), trigger: 'change' }],
  ownerUserId: [{ required: true, message: () => t('common.pleaseSelect') + t('inventory.permission.form.owner'), trigger: 'change' }]
}

const permissionRules = {
  warehouseId: [{ required: true, message: () => t('common.pleaseSelect') + t('inventory.permission.form.warehouse'), trigger: 'change' }],
  deptIds: [{ required: true, message: () => t('common.pleaseSelect') + t('inventory.permission.form.dept'), trigger: 'change' }]
}

const ownerDialogTitle = computed(() => t('inventory.permission.ownerSection.title'))
const permissionDialogTitle = computed(() => t('inventory.permission.permissionSection.title'))
const deptPreviewLimit = 2

const resolveI18nLabel = (label) => {
  try {
    if (!label) return ''
    if (label.startsWith('{')) {
      const names = JSON.parse(label)
      const lang = locale.value === 'zh-CN' ? 'zh_CN' : 'en_US'
      return names[lang] || names['zh_CN'] || label
    }
    return label
  } catch (e) {
    return label
  }
}

const processTreeLabels = (nodes) => {
  if (!nodes) return []
  return nodes.map(node => ({
    ...node,
    id: (() => {
      const rawId = node.deptId ?? node.dept_id ?? node.id ?? node.value
      return rawId !== undefined && rawId !== null ? String(rawId) : rawId
    })(),
    value: (() => {
      const rawId = node.deptId ?? node.dept_id ?? node.id ?? node.value
      return rawId !== undefined && rawId !== null ? String(rawId) : rawId
    })(),
    label: resolveI18nLabel(node.label),
    children: node.children ? processTreeLabels(node.children) : []
  }))
}

const getWarehouseName = (id) => {
  if (!id) return '-'
  const match = warehouseOptions.value.find(item => item.id === id)
  return match ? match.warehouseName : `#${id}`
}

const getUserName = (id, fallback) => {
  if (fallback) return fallback
  const match = userOptions.value.find(item => item.userId === id)
  return match ? match.userName : id ? `#${id}` : '-'
}

const resolveDeptName = (deptId, fallback) => {
  if (fallback) return resolveI18nLabel(fallback)
  const match = flattenDeptOptions(deptOptions.value).find(item => item.id === deptId)
  return match ? match.label : deptId ? `#${deptId}` : '-'
}

const flattenDeptOptions = (nodes) => {
  const result = []
  const walk = (items) => {
    if (!items) return
    items.forEach(item => {
      const rawId = item.deptId ?? item.dept_id ?? item.id ?? item.value
      const normalizedId = rawId !== undefined && rawId !== null ? String(rawId) : rawId
      result.push({ id: normalizedId, label: item.label })
      if (item.children && item.children.length) {
        walk(item.children)
      }
    })
  }
  walk(nodes)
  return result
}

const getRowValue = (row, camel, snake) => {
  if (!row) return undefined
  if (row[camel] !== undefined && row[camel] !== null) return row[camel]
  return row[snake]
}

const normalizeDeptIdValue = (value) => {
  if (value === undefined || value === null) return value
  if (typeof value === 'object') {
    const raw = value.value ?? value.id ?? value.deptId ?? value.dept_id
    return raw !== undefined && raw !== null ? String(raw) : ''
  }
  return String(value)
}

const getDeptPreview = (items) => {
  if (!Array.isArray(items)) return []
  return items.slice(0, deptPreviewLimit)
}

const collectDescendantIds = (node) => {
  const ids = []
  const walk = (item) => {
    if (!item) return
    const rawId = item.value ?? item.id ?? item.deptId ?? item.dept_id
    if (rawId !== undefined && rawId !== null) {
      ids.push(String(rawId))
    }
    if (item.children && item.children.length) {
      item.children.forEach(child => walk(child))
    }
  }
  walk(node)
  return ids
}

const handleDeptCheck = (data, { checkedKeys }) => {
  const baseKeys = (checkedKeys || []).map(item => String(item))
  const descendantIds = collectDescendantIds(data)
  const checkedSet = new Set(baseKeys)
  const isChecked = checkedSet.has(String(data.value ?? data.id ?? data.deptId ?? data.dept_id))

  if (isChecked) {
    descendantIds.forEach(id => checkedSet.add(id))
  } else {
    descendantIds.forEach(id => checkedSet.delete(id))
  }
  permissionForm.deptIds = Array.from(checkedSet)
}

const normalizeWarehouse = (row) => {
  if (!row) return null
  return {
    id: getRowValue(row, 'id', 'id'),
    warehouseCode: getRowValue(row, 'warehouseCode', 'warehouse_code'),
    warehouseName: getRowValue(row, 'warehouseName', 'warehouse_name'),
    updateTime: getRowValue(row, 'updateTime', 'update_time')
  }
}

const ownerByWarehouse = computed(() => {
  const map = new Map()
  ownerRecords.value.forEach(item => {
    const warehouseId = getRowValue(item, 'warehouseId', 'warehouse_id')
    if (!warehouseId) return
    if (!map.has(warehouseId)) {
      map.set(warehouseId, item)
      return
    }
    const existing = map.get(warehouseId)
    const existingPrimary = getRowValue(existing, 'isPrimary', 'is_primary') === '1'
    const currentPrimary = getRowValue(item, 'isPrimary', 'is_primary') === '1'
    if (!existingPrimary && currentPrimary) {
      map.set(warehouseId, item)
    }
  })
  return map
})

const permissionsByWarehouse = computed(() => {
  const map = new Map()
  permissionRecords.value.forEach(item => {
    const warehouseId = getRowValue(item, 'warehouseId', 'warehouse_id')
    if (!warehouseId) return
    if (!map.has(warehouseId)) {
      map.set(warehouseId, [])
    }
    map.get(warehouseId).push(item)
  })
  return map
})

const mergedList = computed(() => {
  const base = warehouseList.value
    .map(normalizeWarehouse)
    .filter(Boolean)
    .map(item => {
      const owner = ownerByWarehouse.value.get(item.id)
      const ownerUserId = getRowValue(owner, 'ownerUserId', 'owner_user_id')
      const ownerName = getUserName(ownerUserId, getRowValue(owner, 'ownerUserName', 'owner_user_name'))
      const ownerOrgName = resolveI18nLabel(getRowValue(owner, 'ownerOrgName', 'owner_org_name'))
      const permissions = permissionsByWarehouse.value.get(item.id) || []
      const deptNames = permissions
        .map(permission => resolveDeptName(getRowValue(permission, 'deptId', 'dept_id'), getRowValue(permission, 'deptName', 'dept_name')))
        .filter(Boolean)
      const updateTime = getRowValue(owner, 'updateTime', 'update_time') || item.updateTime
      return {
        ...item,
        ownerName,
        ownerUserId,
        ownerOrgName,
        deptNames,
        updateTime
      }
    })

  pagination.total = base.length
  return base
})

const pagedList = computed(() => {
  const start = (pagination.page - 1) * pagination.pageSize
  const end = start + pagination.pageSize
  return mergedList.value.slice(start, end)
})

const loadOptions = async () => {
  try {
    const [warehouseRes, userRes, deptRes] = await Promise.all([
      listWarehouseManage({ pageNum: 1, pageSize: 10000 }),
      listUser({ pageNum: 1, pageSize: 200 }),
      deptTreeSelect()
    ])
    const optionList = warehouseRes.data?.list || warehouseRes.data?.rows || warehouseRes.rows || []
    warehouseOptions.value = optionList.map(item => ({
      ...item,
      warehouseName: item.warehouseName || item.warehouse_name
    }))
    userOptions.value = userRes.rows || []
    const deptData = deptRes.data || []
    deptOptions.value = processTreeLabels(deptData)
  } catch (error) {
    console.error('Failed to load options:', error)
  }
}

const loadData = async () => {
  loadFromServer({
    warehouseId: filters.warehouseId,
    ownerUserId: filters.ownerUserId,
    deptId: filters.deptId
  })
}

const loadFromServer = async ({ warehouseId, ownerUserId, deptId }) => {
  loading.value = true
  try {
    const warehousePromise = warehouseId
      ? getWarehouseManage(warehouseId)
      : listWarehouseManage({ pageNum: 1, pageSize: 10000 })
    const [warehouseRes, ownerRes, permissionRes] = await Promise.all([
      warehousePromise,
      getWarehouseOwnerList({ page: 1, pageSize: 10000, warehouseId, ownerUserId }),
      getWarehousePermissionList({ page: 1, pageSize: 10000, warehouseId, deptId })
    ])
    if (warehouseId) {
      warehouseList.value = warehouseRes.data ? [warehouseRes.data] : []
    } else {
      warehouseList.value = warehouseRes.data?.list || warehouseRes.data?.rows || warehouseRes.rows || []
    }
    ownerRecords.value = ownerRes.rows || ownerRes.data?.list || []
    permissionRecords.value = permissionRes.rows || permissionRes.data?.list || []

    if (!warehouseId && (ownerUserId || deptId)) {
      const ownerWarehouseIds = ownerUserId
        ? new Set(ownerRecords.value.map(item => String(getRowValue(item, 'warehouseId', 'warehouse_id'))).filter(Boolean))
        : null
      const permissionWarehouseIds = deptId
        ? new Set(permissionRecords.value.map(item => String(getRowValue(item, 'warehouseId', 'warehouse_id'))).filter(Boolean))
        : null
      const filteredIds = (() => {
        if (ownerWarehouseIds && permissionWarehouseIds) {
          return new Set([...ownerWarehouseIds].filter(id => permissionWarehouseIds.has(id)))
        }
        return ownerWarehouseIds || permissionWarehouseIds || new Set()
      })()
      warehouseList.value = warehouseList.value.filter(item => {
        const id = String(getRowValue(item, 'id', 'id'))
        return filteredIds.has(id)
      })
    }
  } catch (error) {
    console.error('Failed to load permission data:', error)
    ElMessage.error(t('inventory.permission.loadFailed'))
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  pagination.page = 1
  loadFromServer({
    warehouseId: filters.warehouseId,
    ownerUserId: filters.ownerUserId,
    deptId: filters.deptId
  })
}

const handleReset = () => {
  filters.warehouseId = ''
  filters.ownerUserId = ''
  filters.deptId = ''
  pagination.page = 1
  loadFromServer({})
}

const handlePageChange = () => {
  if (pagination.page < 1) pagination.page = 1
}

const resetOwnerForm = () => {
  ownerForm.id = undefined
  ownerForm.warehouseId = undefined
  ownerForm.warehouseName = ''
  ownerForm.ownerUserId = undefined
  ownerForm.ownerUserName = ''
  ownerForm.ownerOrgId = undefined
  ownerForm.ownerOrgName = ''
}

const resetPermissionForm = () => {
  permissionForm.warehouseId = undefined
  permissionForm.warehouseName = ''
  permissionForm.deptIds = []
}

const openOwnerDialog = (row) => {
  resetOwnerForm()
  if (row) {
    ownerForm.warehouseId = row.id
    ownerForm.warehouseName = row.warehouseName || getWarehouseName(row.id)
    const owner = ownerByWarehouse.value.get(row.id)
    if (owner) {
      ownerForm.id = getRowValue(owner, 'id', 'id')
      ownerForm.ownerUserId = getRowValue(owner, 'ownerUserId', 'owner_user_id')
      ownerForm.ownerUserName = getRowValue(owner, 'ownerUserName', 'owner_user_name') || ''
      ownerForm.ownerOrgId = getRowValue(owner, 'ownerOrgId', 'owner_org_id')
      ownerForm.ownerOrgName = getRowValue(owner, 'ownerOrgName', 'owner_org_name') || ''
    }
  }
  ownerDialogVisible.value = true
}

const openPermissionDialog = (row) => {
  resetPermissionForm()
  if (row) {
    permissionForm.warehouseId = row.id
    permissionForm.warehouseName = row.warehouseName || getWarehouseName(row.id)
    permissionDialogVisible.value = true
    loadPermissionDialogData(row.id)
    return
  }
  permissionDialogVisible.value = true
}

const loadPermissionDialogData = async (warehouseId) => {
  if (!warehouseId) return
  permissionDialogLoading.value = true
  try {
    const res = await getWarehousePermissionList({ page: 1, pageSize: 10000, warehouseId })
    const list = res.rows || res.data?.list || []
    permissionDialogRecords.value = list
    permissionForm.deptIds = list
      .map(permission => getRowValue(permission, 'deptId', 'dept_id'))
      .filter(Boolean)
      .map(item => String(item))
  } catch (error) {
    console.error('Failed to load permission dialog data:', error)
    ElMessage.error(t('inventory.permission.loadFailed'))
  } finally {
    permissionDialogLoading.value = false
  }
}

const handleOwnerUserChange = (userId) => {
  const user = userOptions.value.find(item => item.userId === userId)
  ownerForm.ownerUserName = user?.userName || ownerForm.ownerUserName
  ownerForm.ownerOrgId = user?.deptId || ownerForm.ownerOrgId
  ownerForm.ownerOrgName = user?.deptName || ownerForm.ownerOrgName
}

const submitOwner = async () => {
  try {
    await ownerFormRef.value?.validate()
    ownerSubmitLoading.value = true
    const payload = {
      id: ownerForm.id,
      warehouseId: ownerForm.warehouseId,
      ownerUserId: ownerForm.ownerUserId,
      ownerUserName: ownerForm.ownerUserName,
      ownerOrgId: ownerForm.ownerOrgId || null,
      ownerOrgName: ownerForm.ownerOrgName,
      ownerRole: 'PRIMARY',
      isPrimary: '1'
    }
    if (ownerForm.id) {
      await updateWarehouseOwner(payload)
    } else {
      await addWarehouseOwner(payload)
    }
    ElMessage.success(t('inventory.permission.saveSuccess'))
    ownerDialogVisible.value = false
    loadData()
  } catch (error) {
    console.error('Failed to save owner:', error)
  } finally {
    ownerSubmitLoading.value = false
  }
}

const submitPermission = async () => {
  try {
    await permissionFormRef.value?.validate()
    permissionSubmitLoading.value = true
    const warehouseId = permissionForm.warehouseId
    const existing = permissionDialogRecords.value.length
      ? permissionDialogRecords.value
      : (permissionsByWarehouse.value.get(warehouseId) || [])
    const existingMap = new Map(
      existing
        .map(item => String(getRowValue(item, 'deptId', 'dept_id')))
        .filter(Boolean)
        .map(key => [key, true])
    )
    const selected = (permissionForm.deptIds || [])
      .map(normalizeDeptIdValue)
      .filter(Boolean)
    const selectedSet = new Set(selected)
    const toAdd = selected.filter(deptId => !existingMap.has(deptId))
    const toRemove = existing.filter(item => !selectedSet.has(String(getRowValue(item, 'deptId', 'dept_id'))))

    if (toAdd.length) {
      await Promise.all(toAdd.map(deptId => addWarehousePermission({
        warehouseId,
        deptId,
        deptName: resolveDeptName(deptId, '')
      })))
    }
    if (toRemove.length) {
      const ids = toRemove.map(item => getRowValue(item, 'id', 'id')).filter(Boolean)
      if (ids.length) {
        await deleteWarehousePermission(ids)
      }
    }
    ElMessage.success(t('inventory.permission.saveSuccess'))
    permissionDialogVisible.value = false
    permissionDialogRecords.value = []
    loadData()
  } catch (error) {
    console.error('Failed to save permission:', error)
  } finally {
    permissionSubmitLoading.value = false
  }
}

onMounted(() => {
  loadOptions()
  loadData()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/table-enhanced.scss';

.permission-card {
  background: #fff;
  border: 1px solid #e4e7ed;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.card-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: #303133;
}

.card-body {
  display: grid;
  gap: 8px;
  margin-bottom: 12px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #606266;
}

.card-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.btn-text {
  margin-left: 2px;
}

.permission-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
</style>
