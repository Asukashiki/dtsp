# useDict Hook 使用文档

字典数据 Hook，提供统一的字典数据获取、缓存和格式化功能，支持国际化。

## 基本用法

```javascript
import { useDict } from '@/hooks/useDict'

// 传入需要使用的字典类型
const { options, getLabelByValue, loading } = useDict([
  'crop_type',      // 作物类型
  'flow_status',    // 流程状态
  'input_category'  // 投入品品类
])
```

## 返回值

| 属性 | 类型 | 说明 |
|------|------|------|
| `dictData` | `Ref<Object>` | 原始字典数据 `{ dictType: [...] }` |
| `options` | `ComputedRef<Object>` | 响应式选项对象（推荐使用） |
| `loading` | `Ref<Boolean>` | 加载状态 |
| `getOptions(dictType)` | `Function` | 获取指定类型的选项列表 |
| `getLabelByValue(dictType, value)` | `Function` | 根据值获取标签 |
| `getRawData(dictType)` | `Function` | 获取原始字典数据 |
| `refresh()` | `Function` | 刷新字典（清除缓存重新加载） |

## 在模板中使用

### 下拉选择框

```vue
<template>
  <!-- 方式1：使用响应式 options 对象（推荐） -->
  <el-select v-model="form.cropType" placeholder="选择作物">
    <el-option
      v-for="item in options.crop_type"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>

  <!-- 方式2：使用 getOptions 函数 -->
  <el-select v-model="form.status" placeholder="选择状态">
    <el-option
      v-for="item in getOptions('flow_status')"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script setup>
import { useDict } from '@/hooks/useDict'

const { options, getOptions } = useDict(['crop_type', 'flow_status'])
</script>
```

### 显示标签

```vue
<template>
  <!-- 根据值显示对应的标签 -->
  <span>状态: {{ getLabelByValue('flow_status', row.status) }}</span>
  
  <!-- 在表格中使用 -->
  <el-table-column label="状态">
    <template #default="{ row }">
      <el-tag>{{ getLabelByValue('flow_status', row.status) }}</el-tag>
    </template>
  </el-table-column>
</template>

<script setup>
const { getLabelByValue } = useDict(['flow_status'])
</script>
```

### 遍历显示标签

```vue
<template>
  <el-tag v-for="item in options.flow_status" :key="item.value">
    {{ item.label }}
  </el-tag>
</template>
```

## 配置选项

```javascript
const { options } = useDict(['crop_type'], {
  immediate: true,  // 是否立即加载，默认 true
  cache: true       // 是否启用缓存，默认 true
})
```

## 加载状态处理

```vue
<template>
  <el-select v-loading="loading" placeholder="选择作物">
    <el-option
      v-for="item in options.crop_type"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script setup>
// 重命名 loading 避免与其他变量冲突
const { options, loading: dictLoading } = useDict(['crop_type'])
</script>
```

## 手动刷新

```javascript
const { refresh } = useDict(['crop_type'])

// 清除缓存并重新加载
async function handleRefresh() {
  await refresh()
}
```

## 清除缓存

```javascript
import { clearDictCache } from '@/hooks/useDict'

// 清除指定类型的缓存
clearDictCache('crop_type')

// 清除所有缓存
clearDictCache()
```

## 注意事项

1. **响应式更新**：在模板中使用 `options.xxx` 会自动响应式更新
2. **避免同步调用**：不要在 `setup` 同步代码中直接使用 `getOptions()`，因为数据是异步加载的
3. **缓存机制**：默认启用全局缓存，相同类型只加载一次
4. **国际化支持**：自动解析 `dictLabel` 中的 JSON 国际化格式

## 完整示例

```vue
<template>
  <div>
    <!-- 选择作物 -->
    <el-form-item label="作物类型">
      <el-select v-model="form.cropType" v-loading="dictLoading">
        <el-option
          v-for="item in options.crop_type"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>

    <!-- 显示状态 -->
    <div>当前状态: {{ getLabelByValue('flow_status', form.status) }}</div>

    <!-- 状态标签列表 -->
    <div>
      <el-tag 
        v-for="item in options.flow_status" 
        :key="item.value"
        class="mr-2"
      >
        {{ item.label }}
      </el-tag>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useDict } from '@/hooks/useDict'

const form = ref({
  cropType: '',
  status: 'S1'
})

const { options, getLabelByValue, loading: dictLoading } = useDict([
  'crop_type',
  'flow_status'
])
</script>
```
