# 奥罗米亚 WMS — 库存盘点功能 前端开发文档

> 本文档面向**前端开发人员**，包含文件结构、API 封装、组件设计、页面逻辑及联调说明。
> 技术栈：**Vue 3 + Vite + Element Plus + Tailwind CSS**。
> 后端接口规范请参阅《WMS_盘点功能_后端API开发文档.md》。

---

## 一、目录结构

在现有 `src/` 目录下，新增以下文件（禁止修改其他模块文件结构）：

```
src/
├── api/
│   └── stockCheck.js                          # [新建] 盘点专属 API 封装
│
├── locales/
│   ├── zh-CN/input.js                         # [修改] 新增 stockCheck 中文词条
│   └── en-US/input.js                         # [修改] 新增 stockCheck 英文词条
│
├── views/input/inventory/
│   ├── stock-check/                           # 盘点录入模块
│   │   ├── index.vue                          # [新建] 盘点单列表页
│   │   ├── form.vue                           # [新建] 新建/编辑表单页
│   │   └── detail.vue                         # [新建] 盘点单详情页（只读）
│   │
│   └── stock-check-review/                    # 盘点审核模块
│       ├── index.vue                          # [新建] 审核列表页
│       └── review.vue                         # [新建] 审核操作页
│
├── router/index.js                            # [修改] 新增 6 条路由
└── config/inventory-layout.json               # [修改] 新增菜单项
```

---

## 二、API 封装（`src/api/stockCheck.js`）

```javascript
import request from '@/utils/request'

const BASE = '/api/v1/inventory/stock-check'

/** 获取盘点单列表（列表页） */
export const getStockCheckList = (params) =>
  request({ url: `${BASE}/list`, method: 'GET', params })

/** 获取盘点单详情（含明细） */
export const getStockCheckDetail = (checkId) =>
  request({ url: `${BASE}/${checkId}`, method: 'GET' })

/** 新建盘点单 */
export const createStockCheck = (data) =>
  request({ url: `${BASE}/create`, method: 'POST', data })

/** 编辑盘点单（仅 DRAFT / REJECTED 可操作） */
export const updateStockCheck = (checkId, data) =>
  request({ url: `${BASE}/${checkId}`, method: 'PUT', data })

/** 删除盘点单（仅 DRAFT 可操作） */
export const deleteStockCheck = (checkId) =>
  request({ url: `${BASE}/${checkId}`, method: 'DELETE' })

/** 提交盘点单 → 状态变为 PENDING */
export const submitStockCheck = (checkId) =>
  request({ url: `${BASE}/${checkId}/submit`, method: 'POST' })

/** 取消盘点单 */
export const cancelStockCheck = (checkId) =>
  request({ url: `${BASE}/${checkId}/cancel`, method: 'POST' })

/** 审核通过（审核人操作） */
export const approveStockCheck = (checkId, data) =>
  request({ url: `${BASE}/${checkId}/approve`, method: 'POST', data })

/** 审核驳回（审核人操作） */
export const rejectStockCheck = (checkId, data) =>
  request({ url: `${BASE}/${checkId}/reject`, method: 'POST', data })

/** 获取指定仓库当前库存（用于初始化盘点明细） */
export const getWarehouseInventory = (warehouseId) =>
  request({ url: `${BASE}/warehouse-inventory`, method: 'GET', params: { warehouseId } })
```

---

## 三、路由配置

在 `src/router/index.js` 的 `/inventory` 路由组下追加：

```javascript
// ---- 库存盘点录入 ----
{
  path: 'inventory/stock-check',
  name: 'StockCheckList',
  component: () => import('@/views/input/inventory/stock-check/index.vue'),
  meta: { title: 'stockCheck.title', icon: 'inventory' }
},
{
  path: 'inventory/stock-check/form',
  name: 'StockCheckAdd',
  component: () => import('@/views/input/inventory/stock-check/form.vue'),
  meta: { title: 'stockCheck.addTitle', hideInMenu: true }
},
{
  path: 'inventory/stock-check/form/:id',
  name: 'StockCheckEdit',
  component: () => import('@/views/input/inventory/stock-check/form.vue'),
  meta: { title: 'stockCheck.editTitle', hideInMenu: true }
},
{
  path: 'inventory/stock-check/detail/:id',
  name: 'StockCheckDetail',
  component: () => import('@/views/input/inventory/stock-check/detail.vue'),
  meta: { title: 'stockCheck.detailTitle', hideInMenu: true }
},
// ---- 盘点审核 ----
{
  path: 'inventory/stock-check-review',
  name: 'StockCheckReviewList',
  component: () => import('@/views/input/inventory/stock-check-review/index.vue'),
  meta: { title: 'stockCheckReview.title', icon: 'audit' }
},
{
  path: 'inventory/stock-check-review/review/:id',
  name: 'StockCheckReview',
  component: () => import('@/views/input/inventory/stock-check-review/review.vue'),
  meta: { title: 'stockCheckReview.reviewTitle', hideInMenu: true }
}
```

---

## 四、菜单配置

在 `src/config/inventory-layout.json` 的"库存管理"菜单组下追加：

```json
{
  "name": "库存管理",
  "children": [
    { "name": "库存查看", "route": "InventoryView" },
    { "name": "库存预警", "route": "InventoryAlert" },
    { "name": "盘点录入", "route": "StockCheckList" },
    { "name": "盘点审核", "route": "StockCheckReviewList" }
  ]
}
```

---

## 五、国际化词条

在 `src/locales/zh-CN/input.js` 的 `inventory` 对象下新增：

```javascript
stockCheck: {
  title: '盘点录入',
  addTitle: '新建盘点单',
  editTitle: '编辑盘点单',
  detailTitle: '盘点单详情',
  fields: {
    checkId: '盘点单编号',
    checkDate: '盘点日期',
    warehouseName: '盘点仓库',
    checkerName: '盘点人',
    checkStatus: '盘点状态',
    checkRemark: '总体说明',
    totalItems: '商品总数',
    diffItems: '差异商品数',
    productName: '商品名称',
    categoryMajor: '商品大类',
    categoryMinor: '商品小类',
    batchNo: '生产批次',
    unit: '单位',
    expiryDate: '有效期',
    systemQty: '库存数据',
    actualQty: '实盘数据',
    diffType: '差异类型',
    diffQty: '差异数量',
    itemRemark: '盘点说明',
    reviewOpinion: '审核意见',
    reviewerName: '审核人',
    reviewDate: '审核日期',
  },
  status: {
    DRAFT: '草稿',
    PENDING: '待审核',
    APPROVED: '审核通过',
    REJECTED: '审核驳回',
    ADJUSTED: '已调整',
    CANCELLED: '已取消',
  },
  diffType: {
    SURPLUS: '盘盈',
    LOSS: '盘亏',
    NONE: '无差异',
  },
  actions: {
    create: '新建盘点单',
    edit: '编辑',
    delete: '删除',
    submit: '提交',
    cancel: '取消',
    view: '查看',
    approve: '审核通过',
    reject: '审核驳回',
    saveDraft: '保存草稿',
    submitReview: '提交审核',
    backToList: '返回',
    onlyDiff: '仅显示差异商品',
  },
  validation: {
    actualQtyRequired: '请填写全部商品的实盘数量',
    actualQtyMin: '实盘数量不能为负数',
    itemRemarkRequired: '有差异的商品必须填写盘点说明',
    reviewOpinionRequired: '请填写审核意见',
  },
  messages: {
    createSuccess: '盘点单创建成功',
    submitSuccess: '提交成功，等待审核',
    approveSuccess: '审核通过，库存已自动调整',
    rejectSuccess: '已驳回，盘点单退回盘点人',
    deleteConfirm: '确认删除该盘点单？',
    cancelConfirm: '确认取消该盘点单？',
    submitConfirm: '提交后不可修改，确认提交？',
  }
},
stockCheckReview: {
  title: '盘点审核',
  reviewTitle: '审核盘点单',
}
```

`en-US/input.js` 同步补充对应英文翻译（字段结构完全一致，值改为英文）。

---

## 六、页面组件详细设计

### 6.1 盘点录入列表页（`stock-check/index.vue`）

**核心数据**

```javascript
const query = reactive({
  warehouseId: '',
  checkStatus: '',
  startDate: '',
  endDate: '',
  pageNum: 1,
  pageSize: 10
})
const tableData = ref([])
const total = ref(0)
const loading = ref(false)
```

**列表列定义**

| 列名 | `prop` | 宽度 | 特殊处理 |
| :--- | :--- | :--- | :--- |
| 盘点单编号 | `checkId` | 160 | 可点击，跳转详情页 |
| 盘点日期 | `checkDate` | 120 | — |
| 盘点仓库 | `warehouseName` | 160 | — |
| 盘点人 | `checkerName` | 100 | — |
| 商品总数 | `totalItems` | 90 | — |
| 差异商品数 | `diffItems` | 90 | `diffItems > 0` 时使用红色标签 |
| 盘点状态 | `checkStatus` | 100 | `<el-tag>` + 颜色映射 |
| 操作 | — | 200 | 按状态动态渲染按钮 |

**状态标签颜色映射**

```javascript
const statusTagType = {
  DRAFT: '',        // 灰色（Element Plus default）
  PENDING: 'warning',
  APPROVED: 'success',
  REJECTED: 'danger',
  ADJUSTED: 'success',
  CANCELLED: 'info'
}
```

**操作按钮按状态显示规则**

```javascript
const actionsByStatus = {
  DRAFT:    ['view', 'edit', 'submit', 'delete'],
  PENDING:  ['view'],
  APPROVED: ['view'],
  REJECTED: ['view', 'edit', 'submit'],
  ADJUSTED: ['view'],
  CANCELLED:['view']
}
```

---

### 6.2 新建/编辑表单页（`stock-check/form.vue`）

**核心数据**

```javascript
const form = reactive({
  checkDate: dayjs().format('YYYY-MM-DD'),
  warehouseId: '',
  checkRemark: '',
  details: []   // 由 getWarehouseInventory() 加载后初始化
})
```

**关键交互逻辑**

```javascript
// 选择仓库后自动加载库存
watch(() => form.warehouseId, async (newId) => {
  if (!newId) { form.details = []; return }
  const res = await getWarehouseInventory(newId)
  form.details = res.data.items.map(item => ({
    ...item,          // 来自后端：productId, productName, batchNo, systemQty, unit, ...
    actualQty: null,  // 用户待填写
    diffType: 'NONE',
    diffQty: 0,
    itemRemark: ''
  }))
})

// 实时计算差异（每行实盘数量变化时）
const calcDiff = (row) => {
  if (row.actualQty === null || row.actualQty === '') {
    row.diffType = null
    row.diffQty = null
    return
  }
  row.diffQty = row.actualQty - row.systemQty
  if (row.diffQty > 0) row.diffType = 'SURPLUS'
  else if (row.diffQty < 0) row.diffType = 'LOSS'
  else row.diffType = 'NONE'
}
```

**悬浮统计栏（固定底部）**

```javascript
const summaryStats = computed(() => ({
  totalItems: form.details.length,
  filledItems: form.details.filter(r => r.actualQty !== null).length,
  diffItems: form.details.filter(r => r.diffType && r.diffType !== 'NONE').length,
  surplusItems: form.details.filter(r => r.diffType === 'SURPLUS').length,
  lossItems: form.details.filter(r => r.diffType === 'LOSS').length
}))
```

**提交前校验**

```javascript
const validateBeforeSubmit = () => {
  const errors = []
  if (form.details.some(r => r.actualQty === null)) {
    errors.push(t('stockCheck.validation.actualQtyRequired'))
  }
  if (form.details.some(r => r.diffType !== 'NONE' && !r.itemRemark)) {
    errors.push(t('stockCheck.validation.itemRemarkRequired'))
  }
  return errors
}
```

---

### 6.3 盘点单详情页（`stock-check/detail.vue`）

- 全页只读展示，复用表单页的表格组件（`:editable="false"` prop 控制）
- 审核信息区：`checkStatus` 为 `APPROVED`/`REJECTED`/`ADJUSTED` 时展示审核人、审核日期、审核意见
- 差异行颜色：`SURPLUS` 行背景 `#FFF7ED`，`LOSS` 行背景 `#FEF2F2`（通过 `el-table` 的 `:row-class-name` 实现）
- 若状态为 `DRAFT`/`REJECTED`，底部显示「编辑」按钮跳转表单页

---

### 6.4 审核列表页（`stock-check-review/index.vue`）

与盘点录入列表页结构一致，差异：

| 差异点 | 值 |
| :--- | :--- |
| 无「新建」按钮 | — |
| 默认 `checkStatus` 筛选 | `PENDING` |
| 操作列按钮 | 仅 `view`、`review`（跳转审核页） |
| 默认排序 | 提交时间倒序 |

---

### 6.5 审核操作页（`stock-check-review/review.vue`）

**差异汇总统计卡片**

```html
<div class="grid grid-cols-4 gap-4 mb-6">
  <StatCard label="盘点商品总数" :value="stats.totalItems" color="default" />
  <StatCard label="差异商品数"   :value="stats.diffItems"  color="danger" />
  <StatCard label="盘盈商品数"   :value="stats.surplusItems" color="warning" />
  <StatCard label="盘亏商品数"   :value="stats.lossItems"  color="danger" />
</div>
```

**仅显示差异开关**

```javascript
const showOnlyDiff = ref(false)
const filteredDetails = computed(() =>
  showOnlyDiff.value
    ? detail.details.filter(r => r.diffType !== 'NONE')
    : detail.details
)
```

**审核操作区**

```javascript
const reviewOpinion = ref('')

const handleApprove = async () => {
  if (!reviewOpinion.value) {
    ElMessage.warning(t('stockCheck.validation.reviewOpinionRequired'))
    return
  }
  await ElMessageBox.confirm('审核通过后系统将自动调整库存，是否继续？', '确认审核通过', { type: 'warning' })
  const res = await approveStockCheck(checkId, { reviewOpinion: reviewOpinion.value })
  ElMessage.success(t('stockCheck.messages.approveSuccess'))
  router.push({ name: 'StockCheckReviewList' })
}

const handleReject = async () => {
  if (!reviewOpinion.value) {
    ElMessage.warning(t('stockCheck.validation.reviewOpinionRequired'))
    return
  }
  await rejectStockCheck(checkId, { reviewOpinion: reviewOpinion.value })
  ElMessage.success(t('stockCheck.messages.rejectSuccess'))
  router.push({ name: 'StockCheckReviewList' })
}
```

---

## 七、UI 规范

遵循项目现有设计系统，盘点功能额外约定：

### 7.1 颜色规范

| 场景 | 颜色 | Token |
| :--- | :--- | :--- |
| 主按钮/确认操作 | `#009A44` | `primary` |
| 危险/驳回按钮 | `#DA121A` | 危险红 |
| 差异商品数（> 0） | `#DA121A` | 危险红 |
| 盘盈行背景 | `#FFF7ED` | 浅橙 |
| 盘亏行背景 | `#FEF2F2` | 浅红 |
| 库存数据（只读列） | `#1D4ED8` 蓝色加粗 | 强调 |
| 盘盈差异标签 | `#F59E0B` | `amber` |
| 盘亏差异标签 | `#DA121A` | 危险红 |

### 7.2 表单交互约定

| 场景 | 处理方式 |
| :--- | :--- |
| 选择仓库 → 商品加载中 | 明细表格展示 `v-loading` |
| 仓库无库存 | 展示空状态提示「该仓库暂无库存商品」 |
| `actualQty` 输入框 | `type="number"`，`min="0"`，`step="0.001"` |
| 差异类型/差异数量 | 纯展示，不可编辑，实时计算 |
| 移动端（`isMobile`） | 商品明细改为滚动列表卡片布局 |

### 7.3 移动端适配

- 列表页：改为卡片列表（与项目其他列表页保持一致）
- 表单页：商品明细表格横向滚动（`overflow-x: auto`），固定「商品名称」列
- 悬浮统计栏：移动端折叠显示 2 列

---

## 八、Mock 数据

联调前，前端使用以下 Mock 数据结构（可在 `src/api/stockCheck.js` 临时硬编码或使用 Vite Mock 插件）：

```javascript
// getStockCheckList 返回示例
{
  code: 200,
  data: {
    total: 3,
    list: [
      {
        checkId: 'PD202603090001',
        checkDate: '2026-03-09',
        warehouseId: 'WH003',
        warehouseName: '卢梅合作社仓库',
        checkerName: 'Abebe Bekele',
        checkStatus: 'PENDING',
        totalItems: 42,
        diffItems: 5
      }
    ]
  }
}

// getWarehouseInventory 返回示例
{
  code: 200,
  data: {
    warehouseId: 'WH003',
    warehouseName: '卢梅合作社仓库',
    items: [
      { productId: 'P001', productName: '氮肥（尿素）', categoryMajor: '化肥',
        categoryMinor: '氮肥', batchNo: 'B20260101', unit: '千克',
        expiryDate: '2027-12-31', qualityStatus: 'AVAILABLE', currentQty: 1000.000 },
      { productId: 'P002', productName: '玉米种子', categoryMajor: '种子',
        categoryMinor: '玉米', batchNo: 'B20260215', unit: '袋',
        expiryDate: '2026-12-31', qualityStatus: 'AVAILABLE', currentQty: 500.000 }
    ]
  }
}
```

---

## 九、联调说明

| 事项 | 说明 |
| :--- | :--- |
| **接口 Base URL** | `/api/v1/inventory/stock-check` |
| **字段命名** | 后端响应统一 `camelCase`，无需前端转换 |
| **时间格式** | 日期 `YYYY-MM-DD`，时间 `YYYY-MM-DDTHH:mm:ss` |
| **分页** | 请求 `pageNum`（从 1 起）+ `pageSize`，响应含 `total` |
| **错误处理** | 全局 `request.js` 拦截器统一处理 400/403/500，无需每个组件重复处理 |
| **权限控制** | 前端根据当前用户角色隐藏无权限按钮；后端仍需做接口级权限校验 |
| **联调顺序建议** | ① `getWarehouseInventory` → ② `create` → ③ `list` → ④ `submit` → ⑤ `approve`/`reject` |

---

## 十、本地验证步骤

```bash
# 1. 启动开发服务器
cd /Users/kether/front/dtsp
npm run dev

# 2. 浏览器访问
http://localhost:8080/ditp/
```

验证清单：

- [ ] 侧边栏「库存管理」下出现「盘点录入」和「盘点审核」菜单
- [ ] 盘点录入列表页：筛选、分页、状态标签颜色正常
- [ ] 新建盘点单：选择仓库后商品列表自动加载
- [ ] 表单：输入实盘数量后差异类型/差异数量实时计算，颜色标记正确
- [ ] 保存草稿：状态为 `DRAFT`；提交后状态变为 `PENDING`
- [ ] 盘点审核列表默认显示 `PENDING` 状态
- [ ] 审核页：差异行高亮、统计卡片数据正确
- [ ] 审核通过/驳回后状态正确流转
