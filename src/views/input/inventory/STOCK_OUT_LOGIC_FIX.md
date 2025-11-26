# 出库管理表单逻辑优化

## 🔧 问题修复
**日期**: 2025-11-26
**修复版本**: v1.1.0

---

## ❌ 原有问题

之前的出库表单逻辑存在以下问题:

1. **投入品选择不正确**: 直接从所有投入品中选择,而不是从该仓库的库存中选择
2. **没有库存关联**: 未检查仓库中是否有该投入品的库存
3. **业务流程不对**: 未遵循"先入库后出库"的业务规则

---

## ✅ 修复方案

### 核心改进

出库时的投入品选择现在改为:
- ❌ ~~从所有投入品目录中选择~~
- ✅ **只显示该仓库中有库存的投入品**

### 实现逻辑

```javascript
// 修复前: 加载所有投入品
loadInputList() → getInputList() → 显示所有投入品

// 修复后: 只加载该仓库有库存的投入品
选择仓库 → loadInputListByWarehouse(warehouseId)
         → getInventoryList(warehouseId)
         → 过滤出有库存的投入品
         → 去重显示
```

---

## 📋 修改详情

### 1. 修改API导入

**之前**:
```javascript
import { createStockOut, getBatchList, getWarehouseList } from '@/api/inventory'
import { getInputList } from '@/api/input'
```

**修改后**:
```javascript
import { createStockOut, getBatchList, getWarehouseList, getInventoryList } from '@/api/inventory'
// 移除了 getInputList
```

### 2. 新增函数: `loadInputListByWarehouse`

```javascript
// 根据仓库加载有库存的投入品列表
const loadInputListByWarehouse = async (warehouseId) => {
  if (!warehouseId) {
    inputList.value = []
    return
  }

  inputLoading.value = true
  try {
    // 通过库存API获取该仓库中有库存的投入品
    const res = await getInventoryList({
      warehouseId: warehouseId,
      page: 1,
      pageSize: 1000
    })

    if (res.code === 200 && res.data && res.data.list) {
      // 去重,提取唯一的投入品
      const inputMap = new Map()
      res.data.list.forEach(item => {
        // 只显示有库存的投入品 (current_quantity > 0)
        if (item.current_quantity > 0 && !inputMap.has(item.input_id)) {
          inputMap.set(item.input_id, {
            input_id: item.input_id,
            input_name: item.input_name,
            input_sku: item.input_sku || ''
          })
        }
      })
      inputList.value = Array.from(inputMap.values())

      // 如果该仓库没有库存,提示用户
      if (inputList.value.length === 0) {
        ElMessage.warning('该仓库暂无可用库存')
      }
    }
  } catch (error) {
    console.error('Failed to load input list by warehouse:', error)
    ElMessage.error(t('common.failed'))
  } finally {
    inputLoading.value = false
  }
}
```

### 3. 更新 `handleWarehouseChange`

**之前**:
```javascript
const handleWarehouseChange = () => {
  // 只清空商品选择
  formData.items.forEach(item => {
    item.inputId = ''
    item.batchNo = ''
    item.batchList = []
    item.quantity = null
    item.availableQuantity = 0
  })
}
```

**修改后**:
```javascript
const handleWarehouseChange = () => {
  // 清空所有商品选择
  formData.items.forEach(item => {
    item.inputId = ''
    item.batchNo = ''
    item.batchList = []
    item.quantity = null
    item.availableQuantity = 0
  })

  // 重新加载该仓库有库存的投入品
  if (formData.warehouseId) {
    loadInputListByWarehouse(formData.warehouseId)
  } else {
    inputList.value = []
  }
}
```

### 4. 修改 `onMounted`

**之前**:
```javascript
onMounted(() => {
  loadWarehouseList()
  loadInputList()  // 加载所有投入品
})
```

**修改后**:
```javascript
onMounted(() => {
  loadWarehouseList()
  // 不再预加载投入品,等用户选择仓库后再加载
})
```

### 5. 新增国际化提示

**中文** (zh-CN.js):
```javascript
messages: {
  noData: '暂无数据',
  noItems: '暂无商品明细',
  insufficientStock: '库存不足，无法出库',
  noStockInWarehouse: '该仓库暂无可用库存',  // 新增
}
```

**英文** (en-US.js):
```javascript
messages: {
  noData: 'No data available',
  noItems: 'No items',
  insufficientStock: 'Insufficient stock',
  noStockInWarehouse: 'No available stock in this warehouse',  // 新增
}
```

---

## 🔄 新的业务流程

### 完整的出库流程

```
步骤1: 用户打开出库表单
      ↓
   加载仓库列表

步骤2: 用户选择仓库
      ↓
   handleWarehouseChange() 触发
      ↓
   调用 loadInputListByWarehouse(warehouseId)
      ↓
   通过 getInventoryList 获取该仓库的库存数据
      ↓
   提取有库存的投入品 (current_quantity > 0)
      ↓
   去重后显示在投入品下拉列表

步骤3: 用户选择投入品
      ↓
   handleInputChange() 触发
      ↓
   调用 getBatchList(warehouseId, inputId)
      ↓
   显示该投入品在该仓库的所有批次

步骤4: 用户选择批次
      ↓
   handleBatchChange() 触发
      ↓
   设置 availableQuantity (可用库存)

步骤5: 用户填写出库数量
      ↓
   表单验证: quantity ≤ availableQuantity

步骤6: 提交表单
      ↓
   调用 createStockOut()
      ↓
   后端扣减对应批次的库存
```

---

## ✅ 修复效果

### 业务逻辑正确性

1. ✅ **只显示有库存的投入品**: 用户不会选择到没有库存的投入品
2. ✅ **仓库关联查询**: 投入品列表与选中的仓库强关联
3. ✅ **库存数量判断**: 通过 `current_quantity > 0` 过滤
4. ✅ **遵循业务规则**: 严格执行"先入库后出库"

### 用户体验提升

1. ✅ **智能提示**: 仓库无库存时自动提示用户
2. ✅ **级联加载**: 选择仓库后自动加载对应的投入品
3. ✅ **数据准确**: 避免用户选择不存在的库存

### 数据安全性

1. ✅ **去重处理**: Map去重确保投入品列表唯一
2. ✅ **库存校验**: 出库数量不能超过可用库存
3. ✅ **批次追溯**: 所有出库都关联到具体批次

---

## 🎯 测试建议

### 测试场景1: 正常流程
```
1. 选择有库存的仓库 → 应该显示该仓库的投入品列表
2. 选择投入品 → 应该显示该投入品的批次列表
3. 选择批次 → 应该显示可用库存数量
4. 填写数量并提交 → 应该成功创建出库单
```

### 测试场景2: 空库存仓库
```
1. 选择一个空库存的仓库
2. 应该显示提示: "该仓库暂无可用库存"
3. 投入品下拉列表应该为空
4. 无法继续操作
```

### 测试场景3: 切换仓库
```
1. 选择仓库A → 显示仓库A的投入品
2. 选择投入品并填写数据
3. 切换到仓库B
4. 之前选择的投入品应该被清空
5. 显示仓库B的投入品列表
```

### 测试场景4: 库存不足
```
1. 选择仓库和投入品
2. 选择批次 (可用库存: 50)
3. 填写出库数量: 100
4. 应该显示错误提示: "出库数量不能超过可用库存"
5. 无法提交表单
```

---

## 📊 API调用对比

### 修改前
```
页面加载 → getWarehouseList() + getInputList()
选择仓库 → 无操作
选择投入品 → getBatchList(warehouseId, inputId)
```

### 修改后
```
页面加载 → getWarehouseList()
选择仓库 → getInventoryList(warehouseId) → 提取有库存的投入品
选择投入品 → getBatchList(warehouseId, inputId)
```

**优势**:
- ✅ 减少不必要的API调用 (不再预加载所有投入品)
- ✅ 数据更准确 (直接从库存数据获取)
- ✅ 业务逻辑更清晰 (仓库 → 库存 → 批次)

---

## 🔍 关键代码片段

### 投入品去重逻辑
```javascript
const inputMap = new Map()
res.data.list.forEach(item => {
  if (item.current_quantity > 0 && !inputMap.has(item.input_id)) {
    inputMap.set(item.input_id, {
      input_id: item.input_id,
      input_name: item.input_name,
      input_sku: item.input_sku || ''
    })
  }
})
inputList.value = Array.from(inputMap.values())
```

**说明**:
- 使用 `Map` 自动去重 (同一个投入品可能有多条库存记录)
- 只保留 `current_quantity > 0` 的库存
- 提取投入品的ID、名称、SKU字段

---

## 📁 修改的文件

1. ✅ `src/views/input/inventory/stock-out/form.vue` - 核心逻辑修改
2. ✅ `src/locales/zh-CN.js` - 新增中文提示
3. ✅ `src/locales/en-US.js` - 新增英文提示

---

## 🎉 总结

### 修复的核心问题
- ❌ **错误**: 出库时从所有投入品目录选择
- ✅ **正确**: 出库时只能选择该仓库中有库存的投入品

### 业务价值
1. **数据准确性**: 确保出库操作基于真实库存
2. **业务合规性**: 严格遵循"先入库后出库"规则
3. **用户体验**: 避免用户选择不存在的库存,减少错误操作

---

**修复状态**: ✅ 已完成
**测试状态**: ⏳ 待测试
**部署状态**: ⏳ 待部署

**最后更新**: 2025-11-26
**版本**: v1.1.0
**开发者**: Claude Code Agent
