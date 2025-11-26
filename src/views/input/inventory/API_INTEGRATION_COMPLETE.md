# 库存管理模块 API 对接完成报告

## ✅ 完成时间
**日期**: 2025-11-26
**状态**: 已完成

---

## 📋 对接内容汇总

### 1. 仓库管理表单 (warehouse/form.vue)

#### 已对接 API
- ✅ **供应商选择**: `getSupplierCertList()` from `@/api/supplier`
  - 加载所有已通过审核的供应商 (status='2')
  - 支持搜索和过滤
  - 显示供应商组织名称

#### 更新内容
```javascript
// 新增字段
formData.supplierId  // 供应商ID选择

// 新增函数
loadSupplierList()   // 加载供应商列表
```

#### 数据流
```
页面加载 → loadSupplierList() → getSupplierCertList(status='2') → 填充下拉列表
用户选择 → formData.supplierId → 提交到后端
```

---

### 2. 入库管理表单 (stock-in/form.vue)

#### 已对接 API
- ✅ **仓库选择**: `getWarehouseList()` from `@/api/inventory`
  - 只加载启用状态的仓库 (status='1')
  - 显示仓库名称和编码

- ✅ **供应商选择**: `getSupplierCertList()` from `@/api/supplier`
  - 只加载已通过审核的供应商 (status='2')
  - 显示供应商组织名称

- ✅ **投入品选择**: `getInputList()` from `@/api/input`
  - 加载所有投入品
  - 显示投入品名称和SKU编码

#### 更新内容
```javascript
// 新增列表数据
warehouseList   // 仓库列表
supplierList    // 供应商列表
inputList       // 投入品列表

// 新增加载函数
loadWarehouseList()  // 加载仓库列表
loadSupplierList()   // 加载供应商列表
loadInputList()      // 加载投入品列表

// 修正提交数据格式
items[].expiryDate  // 每个商品独立的过期日期
```

#### 数据流
```
页面加载 → 并行加载三个列表 API
         ↓
    仓库/供应商/投入品下拉列表填充
         ↓
    用户选择并填写表单
         ↓
    提交 → createStockIn() → 后端创建入库单
```

#### 重要特性
- **每个商品独立过期日期**: 表单项中的 `expiryDate` 字段对应每个商品明细
- **日期格式转换**: Date对象自动转换为 `yyyy-MM-dd` 格式

---

### 3. 出库管理表单 (stock-out/form.vue) ⭐ 最复杂

#### 已对接 API
- ✅ **仓库选择**: `getWarehouseList()` from `@/api/inventory`
  - 只加载启用状态的仓库 (status='1')
  - 显示仓库名称和编码

- ✅ **投入品选择**: `getInputList()` from `@/api/input`
  - 加载所有投入品
  - 显示投入品名称和SKU编码
  - 必须先选择仓库后才能选择投入品

- ✅ **批次选择**: `getBatchList()` from `@/api/inventory` 🔥
  - 根据 `warehouseId` 和 `inputId` 动态加载批次
  - 显示批次号和当前可用库存数量
  - 自动设置可用库存数量

#### 更新内容
```javascript
// 新增列表数据
warehouseList         // 仓库列表
inputList             // 投入品列表

// 商品明细扩展字段
items[].batchList     // 该商品可用的批次列表
items[].batchLoading  // 批次加载状态
items[].availableQuantity  // 选中批次的可用库存

// 新增加载函数
loadWarehouseList()   // 加载仓库列表
loadInputList()       // 加载投入品列表

// 新增业务逻辑函数
handleWarehouseChange()      // 仓库变更,清空所有商品选择
handleInputChange(index)     // 投入品变更,加载批次列表
handleBatchChange(index)     // 批次变更,设置可用库存
```

#### 数据流
```
页面加载 → 并行加载仓库和投入品列表
         ↓
    用户选择仓库
         ↓
    启用投入品选择
         ↓
    用户选择投入品 → handleInputChange()
         ↓
    调用 getBatchList(warehouseId, inputId)
         ↓
    填充批次下拉列表 (显示批次号 + 可用库存)
         ↓
    用户选择批次 → handleBatchChange()
         ↓
    设置 availableQuantity (用于数量校验)
         ↓
    用户填写出库数量 (≤ availableQuantity)
         ↓
    提交 → createStockOut() → 后端扣减库存
```

#### 重要业务逻辑

##### 1. 级联选择流程
```javascript
// 步骤1: 选择仓库
用户选择仓库 → 清空所有商品的投入品、批次、数量选择

// 步骤2: 选择投入品
用户选择投入品 → 调用getBatchList → 获取该投入品在该仓库的可用批次

// 步骤3: 选择批次
用户选择批次 → 从batchList中找到对应批次 → 设置availableQuantity

// 步骤4: 填写数量
用户输入数量 → 表单验证 quantity ≤ availableQuantity
```

##### 2. 批次数据结构
```javascript
// getBatchList 返回的数据
[
  {
    batch_no: 'BN-20251126-0001',
    current_quantity: 100,
    // ... 其他字段
  }
]

// 在下拉列表中显示为
"BN-20251126-0001 (可用库存: 100)"
```

##### 3. 库存数量校验
```javascript
// 表单验证规则
{
  validator: (rule, value, callback) => {
    const index = parseInt(rule.field.split('.')[1])
    const item = formData.items[index]
    if (value && item.availableQuantity && value > item.availableQuantity) {
      callback(new Error('出库数量不能超过可用库存'))
    } else {
      callback()
    }
  }
}
```

---

## 🔄 数据流程总结

### 入库流程
```
1. 用户选择仓库 (从warehouseList)
2. 用户选择供应商 (从supplierList)
3. 用户添加商品明细:
   - 选择投入品 (从inputList)
   - 填写数量
   - ⭐ 选择该商品的过期日期 (每个商品独立)
4. 提交 → createStockIn() → 后端生成批次号 + 创建库存
```

### 出库流程
```
1. 用户选择仓库 (从warehouseList)
2. 用户添加商品明细:
   - 选择投入品 (从inputList)
   - ⭐ 系统自动加载批次 (getBatchList)
   - 用户选择批次 (从batchList)
   - ⭐ 系统自动设置可用库存
   - 用户填写数量 (≤可用库存)
3. 提交 → createStockOut() → 后端扣减对应批次库存
```

---

## 📊 API 使用统计

| API 函数 | 来源 | 使用位置 | 用途 |
|---------|------|---------|------|
| `getWarehouseList` | @/api/inventory | 入库表单、出库表单 | 获取启用的仓库列表 |
| `getSupplierCertList` | @/api/supplier | 仓库表单、入库表单 | 获取已审核通过的供应商 |
| `getInputList` | @/api/input | 入库表单、出库表单 | 获取投入品列表 |
| `getBatchList` | @/api/inventory | 出库表单 | 获取特定投入品在特定仓库的批次 |
| `createStockIn` | @/api/inventory | 入库表单 | 创建入库单 |
| `createStockOut` | @/api/inventory | 出库表单 | 创建出库单 |
| `addWarehouse` | @/api/inventory | 仓库表单 | 新增仓库 |
| `updateWarehouse` | @/api/inventory | 仓库表单 | 更新仓库 |

---

## ⚠️ 重要注意事项

### 1. 出库业务强约束
- **必须先入库后出库**: 出库时只能选择已入库的批次
- **批次库存实时校验**: 出库数量不能超过批次当前库存
- **级联选择**: 仓库 → 投入品 → 批次,每一步都会清空下一步的选择

### 2. 入库业务特点
- **独立过期日期**: 每个入库商品明细都有自己的 `expiryDate`
- **批次自动生成**: 确认入库后,后端会自动生成批次号(如 `BN-20251126-0001`)

### 3. 数据格式
- **仓库状态**: `'0'` = 停用, `'1'` = 启用
- **供应商状态**: `'2'` = 已通过审核
- **日期格式**: 提交时统一转换为 `yyyy-MM-dd` 格式

### 4. 用户体验优化
- 所有下拉列表都支持搜索过滤 (`filterable`)
- 批次加载时显示 Loading 状态
- 投入品/批次未选择时,相关字段自动禁用
- 实时显示可用库存数量

---

## 🎯 测试建议

### 测试场景1: 入库流程
```
1. 打开入库表单
2. 验证仓库/供应商/投入品下拉列表已正确加载
3. 选择仓库、供应商
4. 添加商品明细,为每个商品设置不同的过期日期
5. 提交表单
6. 验证后端是否正确接收了所有字段,包括expiryDate
```

### 测试场景2: 出库流程 (关键)
```
1. 打开出库表单
2. 选择仓库 → 验证投入品选择被启用
3. 添加商品明细,选择投入品
4. 验证批次下拉列表是否正确加载 (显示批次号 + 可用库存)
5. 选择批次 → 验证可用库存是否正确显示
6. 输入数量:
   - 输入小于可用库存的数量 → 应该通过验证
   - 输入大于可用库存的数量 → 应该显示错误提示
7. 提交表单
8. 验证后端是否正确扣减了对应批次的库存
```

### 测试场景3: 边界情况
```
1. 出库时选择的投入品在该仓库没有库存
   → 应该显示"库存不足"提示
   → 批次下拉列表为空

2. 仓库切换
   → 所有已选择的投入品/批次/数量应该被清空

3. 投入品切换
   → 批次选择和可用库存应该被清空
   → 数量输入应该被清空
```

---

## 📝 代码改动总结

### 文件修改列表
1. ✅ `src/views/input/inventory/warehouse/form.vue` - 添加供应商选择
2. ✅ `src/views/input/inventory/stock-in/form.vue` - 添加仓库/供应商/投入品选择
3. ✅ `src/views/input/inventory/stock-out/form.vue` - 添加仓库/投入品/批次选择 + 级联逻辑

### 新增导入
```javascript
// 仓库表单
import { getSupplierCertList } from '@/api/supplier'

// 入库表单
import { getWarehouseList } from '@/api/inventory'
import { getSupplierCertList } from '@/api/supplier'
import { getInputList } from '@/api/input'

// 出库表单
import { getWarehouseList, getBatchList } from '@/api/inventory'
import { getInputList } from '@/api/input'
```

### 核心函数
```javascript
// 入库/出库表单共用
loadWarehouseList()  // 加载仓库列表
loadInputList()      // 加载投入品列表

// 入库表单专用
loadSupplierList()   // 加载供应商列表

// 出库表单专用
handleWarehouseChange()   // 仓库变更处理
handleInputChange(index)  // 投入品变更处理 + 加载批次
handleBatchChange(index)  // 批次变更处理 + 设置可用库存
```

---

## 🎉 完成状态

- ✅ 所有表单已对接真实API
- ✅ 移除所有模拟数据
- ✅ 业务逻辑完整实现
- ✅ 用户体验优化到位
- ✅ 数据校验规则完善

**状态**: 完全可用,可以进入测试阶段!

---

**最后更新**: 2025-11-26
**版本**: 1.0.0
**开发者**: Claude Code Agent
