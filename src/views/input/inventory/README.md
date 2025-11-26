# 库存管理模块 (Inventory Management Module)

## 📁 目录结构

```
src/views/input/inventory/
├── warehouse/              # 仓库管理
│   ├── index.vue          # 仓库列表
│   ├── form.vue           # 仓库表单 (新增/编辑)
│   └── detail.vue         # 仓库详情
├── stock-in/              # 入库管理
│   ├── index.vue          # 入库单列表
│   ├── form.vue           # 入库单表单
│   └── detail.vue         # 入库单详情
├── stock-out/             # 出库管理
│   ├── index.vue          # 出库单列表
│   ├── form.vue           # 出库单表单
│   └── detail.vue         # 出库单详情
├── stock/                 # 库存查询
│   ├── index.vue          # 库存列表
│   └── detail.vue         # 库存详情
└── README.md              # 本文档
```

## 🛣️ 路由配置

将以下路由添加到 `src/router/index.js`:

```javascript
{
  path: '/input/inventory',
  name: 'Inventory',
  redirect: '/input/inventory/warehouse',
  meta: { title: '库存管理', requiresAuth: true },
  children: [
    // 仓库管理
    {
      path: 'warehouse',
      name: 'WarehouseList',
      component: () => import('@/views/input/inventory/warehouse/index.vue'),
      meta: { title: '仓库管理' }
    },
    {
      path: 'warehouse/add',
      name: 'WarehouseAdd',
      component: () => import('@/views/input/inventory/warehouse/form.vue'),
      meta: { title: '新增仓库', hideInMenu: true }
    },
    {
      path: 'warehouse/edit/:id',
      name: 'WarehouseEdit',
      component: () => import('@/views/input/inventory/warehouse/form.vue'),
      meta: { title: '编辑仓库', hideInMenu: true }
    },
    {
      path: 'warehouse/detail/:id',
      name: 'WarehouseDetail',
      component: () => import('@/views/input/inventory/warehouse/detail.vue'),
      meta: { title: '仓库详情', hideInMenu: true }
    },

    // 入库管理
    {
      path: 'stock-in',
      name: 'StockInList',
      component: () => import('@/views/input/inventory/stock-in/index.vue'),
      meta: { title: '入库管理' }
    },
    {
      path: 'stock-in/add',
      name: 'StockInAdd',
      component: () => import('@/views/input/inventory/stock-in/form.vue'),
      meta: { title: '新增入库单', hideInMenu: true }
    },
    {
      path: 'stock-in/detail/:id',
      name: 'StockInDetail',
      component: () => import('@/views/input/inventory/stock-in/detail.vue'),
      meta: { title: '入库单详情', hideInMenu: true }
    },

    // 出库管理
    {
      path: 'stock-out',
      name: 'StockOutList',
      component: () => import('@/views/input/inventory/stock-out/index.vue'),
      meta: { title: '出库管理' }
    },
    {
      path: 'stock-out/add',
      name: 'StockOutAdd',
      component: () => import('@/views/input/inventory/stock-out/form.vue'),
      meta: { title: '新增出库单', hideInMenu: true }
    },
    {
      path: 'stock-out/detail/:id',
      name: 'StockOutDetail',
      component: () => import('@/views/input/inventory/stock-out/detail.vue'),
      meta: { title: '出库单详情', hideInMenu: true }
    },

    // 库存查询
    {
      path: 'stock',
      name: 'StockList',
      component: () => import('@/views/input/inventory/stock/index.vue'),
      meta: { title: '库存查询' }
    },
    {
      path: 'stock/detail/:id',
      name: 'StockDetail',
      component: () => import('@/views/input/inventory/stock/detail.vue'),
      meta: { title: '库存详情', hideInMenu: true }
    }
  ]
}
```

## 📋 功能特性

### 1. 仓库管理 (Warehouse Management)

**功能:**
- ✅ 仓库列表查询(支持按名称、类型、状态筛选)
- ✅ 新增/编辑/删除仓库
- ✅ 查看仓库详情及使用率
- ✅ 仓库类型: 普通仓库、冷藏仓库、危险品仓库
- ✅ 容量管理及使用率可视化

**关键字段:**
- `warehouse_name`: 仓库名称
- `warehouse_type`: 仓库类型 (normal/cold/dangerous)
- `location`: 仓库位置
- `capacity`: 仓库容量
- `used_capacity`: 已用容量
- `status`: 状态 (0-停用/1-启用)

### 2. 入库管理 (Stock In Management)

**功能:**
- ✅ 入库单列表查询(支持按仓库、供应商、类型、状态筛选)
- ✅ 创建入库单(采购入库/退货入库)
- ✅ **每个入库商品设置独立的过期日期** (expiryDate)
- ✅ 确认入库(更新库存及仓库容量)
- ✅ 查看入库单详情及二维码

**重要业务规则:**
- 入库类型: `0`=采购入库, `1`=退货入库
- **每个商品明细都必须设置 `expiryDate`**
- 确认入库时会校验仓库剩余容量
- 确认后生成批次号 (BN-YYYYMMDD-XXXX)

**关键字段:**
- `stock_in_id`: 入库单号 (自动生成)
- `warehouse_id`: 入库仓库
- `supplier_id`: 供应商
- `batch_no`: 批次号 (确认后生成)
- `items[].expiry_date`: **商品过期日期(每个商品独立设置)**

### 3. 出库管理 (Stock Out Management)

**功能:**
- ✅ 出库单列表查询(支持按仓库、客户、类型、状态筛选)
- ✅ 创建出库单(销售出库)
- ✅ **批次选择及可用库存查询** (使用 `getBatchList` API)
- ✅ 确认出库(扣减库存及仓库容量)
- ✅ 查看出库单详情及二维码

**重要业务规则:**
- 出库类型: `0`=销售出库
- **必须指定批次号 (batch_no)**,系统会从可用批次中选择
- 出库数量不能超过指定批次的当前库存
- **业务强约束: 出库商品必须有入库记录** (先入库后出库)

**关键字段:**
- `stock_out_id`: 出库单号 (自动生成)
- `warehouse_id`: 出库仓库
- `customer`: 客户名称
- `items[].batch_no`: **批次号(必选)**
- `items[].quantity`: 出库数量(不能超过批次库存)

**批次选择流程:**
1. 选择仓库
2. 选择投入品
3. 系统调用 `getBatchList` 获取该投入品在该仓库的可用批次
4. 选择批次号并填写出库数量(≤ 可用库存)

### 4. 库存查询 (Inventory Query)

**功能:**
- ✅ 库存列表查询(支持按仓库、投入品、批次号、库存状态筛选)
- ✅ 查看库存详情
- ✅ 库存状态自动判断(正常/临期/过期)
- ✅ 状态颜色标识

**库存状态规则:**
- **正常 (0)**: 距过期日期 > 30天 (绿色标签)
- **临期 (1)**: 距过期日期 ≤ 30天且未过期 (橙色标签)
- **过期 (2)**: 已过期 (红色标签)

**关键字段:**
- `inventory_id`: 库存记录ID
- `batch_no`: 批次号
- `current_quantity`: 当前库存数量
- `in_date`: 入库日期
- `expired_date`: 过期日期
- `stock_status`: 库存状态 (0/1/2)

## 🎨 设计特点

### 响应式设计
- **PC端**: 使用 Element Plus 表格组件展示数据
- **移动端**: 使用卡片布局,更适合触摸操作
- **断点**: 768px (移动/PC切换), 480px (小屏优化)

### 主题色
- **主色**: #009A44 (埃塞俄比亚国旗绿色)
- **辅助色**: #FEDD00 (黄色), #DA121A (红色)
- **渐变**: `linear-gradient(135deg, #009A44 0%, #00b350 100%)`

### 移动端特性
- 浮动添加按钮 (FAB)
- 卡片式交互
- 简化的分页控件
- 触摸友好的按钮尺寸

## 🔌 API集成

所有API已在 `src/api/inventory.js` 中定义:

### 仓库管理 API
- `getWarehouseList(params)` - 查询仓库列表
- `getWarehouseDetail(warehouseId)` - 查询仓库详情
- `addWarehouse(data)` - 新增仓库
- `updateWarehouse(data)` - 更新仓库
- `deleteWarehouse(warehouseId)` - 删除仓库

### 入库管理 API
- `getStockInList(params)` - 查询入库单列表
- `getStockInDetail(stockInId)` - 查询入库单详情
- `createStockIn(data)` - 创建入库单
- `confirmStockIn(stockInId)` - 确认入库
- `deleteStockIn(stockInId)` - 删除入库单

### 出库管理 API
- `getStockOutList(params)` - 查询出库单列表
- `getStockOutDetail(stockOutId)` - 查询出库单详情
- `createStockOut(data)` - 创建出库单
- `confirmStockOut(stockOutId)` - 确认出库
- `deleteStockOut(stockOutId)` - 删除出库单

### 库存查询 API
- `getInventoryList(params)` - 查询库存列表
- `getInventoryDetail(inventoryId)` - 查询库存详情
- `getInventoryWarning(params)` - 查询库存预警
- `getInventorySummaryByInput(params)` - 按投入品汇总
- `getInventorySummaryByWarehouse(params)` - 按仓库汇总

### 批次查询 API
- `getBatchList(params)` - 获取批次列表 (用于出库时选择批次)

## 🌐 国际化

所有文本使用 `$t()` 从 `src/locales/zh-CN.js` 和 `src/locales/en-US.js` 读取。

国际化键前缀: `input.inventory.*`

示例:
```javascript
$t('input.inventory.warehouse.title')        // "仓库管理" / "Warehouse Management"
$t('input.inventory.stockIn.add')            // "新增入库单" / "Add Stock In"
$t('input.inventory.stockOut.confirm')       // "确认出库" / "Confirm Stock Out"
$t('input.inventory.stock.status.normal')    // "正常" / "Normal"
```

## ⚠️ 重要业务逻辑

### 1. 入库流程
```
1. 创建入库单 (状态: 未入库)
   - 选择仓库、供应商
   - 添加商品明细,每个商品设置过期日期 (expiryDate)

2. 确认入库 (调用 confirmStockIn API)
   - 系统校验仓库剩余容量
   - 生成批次号 (BN-YYYYMMDD-XXXX)
   - 创建/更新库存记录
   - 更新仓库已用容量
   - 状态变为: 已入库
```

### 2. 出库流程
```
1. 创建出库单 (状态: 未出库)
   - 选择仓库
   - 添加商品明细:
     a. 选择投入品
     b. 调用 getBatchList 获取可用批次
     c. 选择批次号
     d. 填写出库数量 (不能超过批次可用库存)

2. 确认出库 (调用 confirmStockOut API)
   - 系统校验批次库存是否充足
   - 扣减对应批次的库存数量
   - 更新仓库已用容量(减少)
   - 状态变为: 已出库
```

### 3. 库存状态自动判断
```javascript
// 后端自动计算库存状态
if (距过期日期 > 30天) {
  stockStatus = '0'  // 正常
} else if (距过期日期 ≤ 30天 && 未过期) {
  stockStatus = '1'  // 临期
} else {
  stockStatus = '2'  // 过期
}
```

## 📝 使用示例

### 示例1: 创建入库单
```javascript
const stockInData = {
  warehouseId: 1,
  supplierId: 2,
  type: '0',  // 采购入库
  operator: '张三',
  expiredTime: '2025-12-31',
  remarks: '春季采购',
  items: [
    {
      inputId: 10,
      quantity: 100,
      expiryDate: '2025-06-30',  // 商品1的过期日期
      remarks: ''
    },
    {
      inputId: 11,
      quantity: 50,
      expiryDate: '2025-08-31',  // 商品2的过期日期
      remarks: ''
    }
  ]
}

await createStockIn(stockInData)
```

### 示例2: 创建出库单
```javascript
// 1. 先获取批次列表
const batches = await getBatchList({
  warehouseId: 1,
  inputId: 10
})
// 返回: [{ batchNo: 'BN-20251126-0001', currentQuantity: 100 }, ...]

// 2. 创建出库单
const stockOutData = {
  warehouseId: 1,
  type: '0',  // 销售出库
  operator: '李四',
  customer: 'ABC Farm',
  remark: '销售给ABC农场',
  items: [
    {
      inputId: 10,
      batchNo: 'BN-20251126-0001',  // 从上面获取的批次中选择
      quantity: 30,  // 不能超过该批次的当前库存(100)
      remarks: ''
    }
  ]
}

await createStockOut(stockOutData)
```

## 🐛 常见问题

### Q1: 出库时找不到批次怎么办?
**A:** 确保该投入品已经在该仓库入库过,并且入库单已确认。出库依赖于入库数据。

### Q2: 入库时为什么每个商品都要设置过期日期?
**A:** 不同批次的同一商品可能有不同的过期日期,为了精确管理库存状态(正常/临期/过期),需要在入库时为每个商品明细设置独立的过期日期。

### Q3: 如何处理库存预警?
**A:** 系统会根据过期日期自动判断库存状态。可以在库存查询模块按状态筛选,查看临期或过期的库存。

### Q4: 仓库容量不足怎么办?
**A:** 确认入库时如果提示容量不足,需要:
1. 减少入库数量,或
2. 选择其他仓库,或
3. 联系管理员扩容仓库

## 📞 技术支持

如有问题,请查看:
- 后端API文档
- `src/api/inventory.js` 中的API定义
- `src/locales/zh-CN.js` 中的国际化配置
- `CLAUDE.md` 项目文档

---

**最后更新**: 2025-11-26
**版本**: 1.0.0
**作者**: Claude Code Agent
