# 研究中心模块前端代码

## 模块概述
研究中心模块用于管理农业研究中的各个研究中心信息，包括位置、地理坐标、行政区域等基础信息。

## 文件清单

### 1. 列表页面
**文件路径**: `index.vue`
- 支持分页查询研究中心列表
- 支持按位置名称、地区、区域筛选
- PC端使用表格展示，移动端使用卡片展示
- 支持批量删除、单条删除
- 完全响应式设计，适配移动端

### 2. 表单页面（新增/编辑共用）
**文件路径**: `form.vue`
- 新增和编辑研究中心信息
- 通过路由参数判断是新增还是编辑模式
- 包含基本信息、位置信息、地理坐标、备注信息四个区块
- 表单验证：位置名称必填，经纬度范围校验
- 移动端优化布局

### 3. 详情页面
**文件路径**: `detail.vue`
- 展示研究中心完整信息
- 使用 el-descriptions 组件展示
- 包含审计信息（创建人、创建时间、更新人、更新时间）
- 支持快速跳转到编辑页面

## API 接口

### 接口列表
已在 `@/api/breedingData.js` 文件中添加以下接口：

1. **分页查询**: `getLocationMasterList(params)`
   - 接口地址: `/seed/locationMaster/page`
   - 请求方式: POST
   - 支持按条件查询

2. **获取详情**: `getLocationMasterInfo(locationId)`
   - 接口地址: `/seed/locationMaster/detail`
   - 请求方式: GET

3. **新增**: `addLocationMaster(data)`
   - 接口地址: `/seed/locationMaster/add`
   - 请求方式: POST

4. **编辑**: `editLocationMaster(data)`
   - 接口地址: `/seed/locationMaster/update`
   - 请求方式: POST

5. **删除**: `deleteLocationMaster(locationIds)`
   - 接口地址: `/seed/locationMaster/delete`
   - 请求方式: GET

6. **下拉选项**: `getLocationMasterOptions()`
   - 接口地址: `/seed/locationMaster/list`
   - 请求方式: GET

## 国际化配置

### 中文配置
**文件路径**: `@/locales/zh-CN/research/breedingData.js`
- 已添加 `researchCenter` 节点
- 包含标题、表单字段、提示信息、列名等完整翻译

### 英文配置
**文件路径**: `@/locales/en-US/research/breedingData.js`
- 已添加 `researchCenter` 节点
- 与中文配置对应的英文翻译

### 使用方式
```javascript
// 在组件中使用
$t('research.breedingData.researchCenter.title')
$t('research.breedingData.researchCenter.form.locationName')
```

## 菜单配置

已在 `@/config/research-layout.json` 中的 `seed-institution-management` 节点下添加了研究中心菜单项:

```json
{
  "index": "/research/breeding-data/research-center",
  "icon": "ri-building-line",
  "titleKey": "research.menu.researchCenterManagement"
}
```

对应的国际化配置已添加到:
- 中文: `@/locales/zh-CN/research/menu.js` - `researchCenterManagement`
- 英文: `@/locales/en-US/research/menu.js` - `researchCenterManagement`

## 路由配置

需要在路由配置文件中添加以下路由：

```javascript
{
  path: '/research/breeding-data/research-center',
  name: 'ResearchCenter',
  component: () => import('@/views/research/breeding-data/research-center/index.vue'),
  meta: { title: '研究中心管理' }
},
{
  path: '/research/breeding-data/research-center/add',
  name: 'ResearchCenterAdd',
  component: () => import('@/views/research/breeding-data/research-center/form.vue'),
  meta: { title: '新增研究中心' }
},
{
  path: '/research/breeding-data/research-center/edit/:locationId',
  name: 'ResearchCenterEdit',
  component: () => import('@/views/research/breeding-data/research-center/form.vue'),
  meta: { title: '编辑研究中心' }
},
{
  path: '/research/breeding-data/research-center/detail/:locationId',
  name: 'ResearchCenterDetail',
  component: () => import('@/views/research/breeding-data/research-center/detail.vue'),
  meta: { title: '研究中心详情' }
}
```

## 技术特性

### 1. 响应式设计
- PC端（>768px）：使用表格展示数据
- 移动端（≤768px）：使用卡片展示数据
- 使用 `page-common.scss` 统一样式

### 2. 国际化支持
- 完整的中英文翻译
- 使用 vue-i18n 实现多语言切换
- 所有文本内容都通过 `$t()` 方法获取

### 3. 表单验证
- 位置名称：必填，1-100字符
- 纬度：-90 到 90 之间
- 经度：-180 到 180 之间
- 其他字段：可选

### 4. 用户体验优化
- 加载状态提示
- 操作成功/失败提示
- 删除前确认
- 移动端友好的操作按钮布局

### 5. 数据字段

| 字段名 | 类型 | 说明 | 必填 |
|--------|------|------|------|
| locationId | String | 位置ID（自动生成） | 是 |
| locationName | String | 位置名称 | 是 |
| region | String | 地区 | 否 |
| zone | String | 区域 | 否 |
| woneda | String | 沃雷达（行政区域） | 否 |
| latitude | Decimal | 纬度 | 否 |
| longitude | Decimal | 经度 | 否 |
| remark | String | 备注 | 否 |

## 使用说明

1. **访问列表页面**
   - 路径: `/research/breeding-data/research-center`
   - 可以查看所有研究中心，支持搜索和筛选

2. **新增研究中心**
   - 点击"新增研究中心"按钮
   - 填写必填字段（位置名称）
   - 点击"保存"提交

3. **编辑研究中心**
   - 在列表中点击"编辑"按钮
   - 修改信息后点击"保存"

4. **查看详情**
   - 在列表中点击"查看"按钮
   - 可以查看完整信息，包括审计信息

5. **删除研究中心**
   - 单条删除：点击行操作中的"删除"按钮
   - 批量删除：选中多条记录后点击"批量删除"按钮

## 移动端适配

- 搜索区域：单列布局，每个搜索项占满宽度
- 数据展示：卡片形式，更适合触摸操作
- 操作按钮：水平排列，按钮尺寸适中
- 分页组件：简化版，仅显示上一页、页码、下一页

## 依赖项

- Vue 3
- Vue Router
- Element Plus
- vue-i18n
- @/assets/styles/page-common.scss（通用页面样式）
- @/api/breedingData.js（API接口）

## 注意事项

1. 确保后端接口已正确配置并可访问
2. 路由配置需要手动添加到路由文件中
3. 位置ID由后端自动生成，前端无需处理
4. 经纬度使用 Decimal 类型，精度为2位小数
5. 所有文本内容都已国际化，支持中英文切换
