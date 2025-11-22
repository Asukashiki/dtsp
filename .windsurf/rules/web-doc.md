---
trigger: manual
---

这是一个基于 **Vue 3 + TypeScript + Vite + Naive UI + Tailwind CSS** 的前端开发实施文档。该文档专为适配 **RuoYi (若依)** 后端架构而设计，涵盖了路由、权限、UI 规范及国际化策略。

-----

# 前端开发实施文档 - 奥罗米亚智慧农业大数据平台

**文档版本**: V1.0  
**适用框架**: Vue 3 (Composition API) + TypeScript  
**UI 框架**: Naive UI + Tailwind CSS  
**构建工具**: Vite  
**后端依赖**: RuoYi-Vue (Java / Spring Boot)

-----

## 1\. 项目初始化与目录结构

为了适应若依的后端接口结构并保持 Vue 3 的最佳实践，前端工程目录将进行如下规划：

### 1.1 目录结构 (src)

```text
src/
├── api/                  // API 接口定义 (按业务模块拆分)
│   ├── auth.ts           // 登录、注册、验证码
│   ├── system/           // 系统模块 (用户、角色、菜单)
│   ├── agriculture/      // [核心] 农业业务模块
│   │   ├── land.ts       // 土地管理
│   │   ├── seed.ts       // 种子/研发
│   │   └── input.ts      // 投入品/库存
│   └── common.ts         // 通用上传、下载
├── assets/               // 静态资源 (Images, Tailwind css entry)
├── components/           // 全局通用组件
│   ├── DictTag/          // 字典标签组件
│   ├── FileUpload/       // 文件上传组件 (适配 MinIO/Local)
│   ├── LangSelect/       // 语言切换组件
│   └── Breadcrumb/       // 面包屑导航
├── directives/           // 自定义指令
│   ├── permission/       // 权限指令 (v-hasPermi, v-role)
│   └── index.ts
├── hooks/                // 组合式函数 (useDict, usePermission)
├── layout/               // 布局组件 (Sidebar, Navbar, AppMain)
├── locales/              // 国际化资源文件 (en, zh, om-奥罗莫语)
├── router/               // 路由配置
│   └── guard/            // 路由守卫 (Token校验, 动态路由加载)
├── store/                // Pinia 状态管理
│   ├── modules/
│   │   ├── user.ts       // 用户信息、Token
│   │   ├── permission.ts // 动态路由生成
│   │   └── app.ts        // 应用配置 (语言, 侧边栏状态)
├── utils/                // 工具类
│   ├── request.ts        // Axios 封装 (适配 RuoYi Result)
│   ├── dict.ts           // 字典转换工具
│   └── theme.ts          // NaiveUI 主题配置
└── views/                // 页面视图 (与后端 component 路径映射)
    ├── login/            // 登录页
    ├── register/         // 注册页
    ├── dashboard/        // 首页/大屏
    ├── system/           // 系统管理页面
    ├── land/             // 土地管理页面
    ├── research/         // 研发页面
    ├── inputs/           // 投入品页面
    └── redirect/         // 刷新重定向
```

-----

## 2\. 路由与菜单规划

本系统采用 **Hybrid Routing (混合路由)** 策略：

1.  **基础路由 (Static)**：本地定义的白名单路由（登录、注册、404）。
2.  **动态路由 (Dynamic)**：登录后通过 API `/getRouters` 从后端获取，前端解析映射组件。

### 2.1 基础路由 (Static Routes)

  * `/login`: 用户登录
  * `/register`: 用户注册 (含角色选择：农民/供应商/收购商)
  * `/auth-process`: 身份认证流程 (提交资质/等待审核)
  * `/404`: 页面未找到
  * `/401`: 无权限

### 2.2 业务菜单规划 (Dynamic Mapping)

以下路径对应 RuoYi `sys_menu` 表中的配置，以及前端 `views` 目录下的文件路径。

#### A. 系统门户 (Dashboard)

  * **路径**: `/index`
  * **组件**: `views/dashboard/index`
  * **功能**: 展示系统公告、待办事项、快捷入口、数据概览（根据角色展示不同面板）。

#### B. 土地信息管理 (Land Management)

  * **父级路径**: `/land`
  * **子菜单**:
    1.  **我的土地**: `/land/list` (`views/land/my-land/index`)
          * *权限*: 农民
    2.  **土地全景**: `/land/overview` (`views/land/admin/index`)
          * *权限*: 管理员 (查看所有)

#### C. 研究与开发 (R\&D)

  * **父级路径**: `/research`
  * **子菜单**:
    1.  **企业备案**: `/research/enterprise` (`views/research/enterprise/index`)
          * *功能*: 企业认证申请、审核状态查看。
    2.  **品种管理**: `/research/variety` (`views/research/variety/index`)
          * *Tab页*: 品种登记、品种审核、品种发布。
    3.  **育种计划**: `/research/breeding` (`views/research/breeding/index`)
          * *功能*: 育种批次、材料登记、跟踪记录。
    4.  **数据采集**: `/research/data-collection` (`views/research/data/index`)
          * *功能*: 试验数据、农事记录、物联网(IoT)数据展示。

#### D. 农业投入品管理 (Inputs & Inventory)

  * **父级路径**: `/inputs`
  * **子菜单**:
    1.  **投入品库**: `/inputs/product` (`views/inputs/product/index`)
          * *功能*: 种子/化肥/农药基础信息维护。
    2.  **供应商管理**: `/inputs/supplier` (`views/inputs/supplier/index`)
          * *功能*: 供应商资质审核、供应商品关联。
    3.  **仓库管理**: `/inputs/warehouse` (`views/inputs/warehouse/index`)
          * *功能*: 仓库建模、可视化库位。
    4.  **入库作业**: `/inputs/inbound` (`views/inputs/stock/inbound`)
          * *功能*: 采购入库、生产入库、扫码作业。
    5.  **出库作业**: `/inputs/outbound` (`views/inputs/stock/outbound`)
          * *功能*: 销售出库、扫码核销。

-----

## 3\. 权限体系规划 (RBAC)

前端权限控制分为 **路由级 (Page Level)** 和 **组件级 (Element Level)**，完全适配 RuoYi 的权限标识符设计。

### 3.1 路由级权限

  * **实现机制**: `router.beforeEach` 拦截。
  * **逻辑**:
    1.  检查 Cookie/LocalStorage 中是否存在 Token。
    2.  若无 Token，重定向至 `/login`。
    3.  若有 Token 但无用户信息，调用 `GetInfo` 接口获取 `roles` 和 `permissions` 数组。
    4.  调用 `GenerateRoutes` 将后端返回的菜单树转换为 Vue Routes，使用 `router.addRoute` 动态挂载。

### 3.2 组件级权限 (Tailwind CSS 集成)

不使用 ElementUI 自带的权限判断，而是开发自定义指令配合 Tailwind 实现更灵活的 UI 控制。

#### 指令：`v-hasPermi`

  * **用途**: 彻底移除无权限的 DOM 元素。
  * **示例**:
    ```html
    <n-button v-hasPermi="['agriculture:land:add']">新增地块</n-button>
    ```

#### 指令：`v-role-style` (UI 差异化)

  * **用途**: 根据权限保留元素，但改变样式 (如置灰、禁用)。
  * **结合 Tailwind**:
      * 我们不直接移除元素，而是动态应用 Tailwind 的 `grayscale` 或 `cursor-not-allowed` 类。
      * **实现逻辑**:
    <!-- end list -->
    ```html
    <button 
      :class="hasPermi('ag:stock:audit') 
        ? 'bg-blue-600 hover:bg-blue-700' 
        : 'bg-gray-300 cursor-not-allowed opacity-50'"
      :disabled="!hasPermi('ag:stock:audit')"
    >
      审核入库单
    </button>
    ```

-----

## 4\. UI/UX 设计规范 (Tailwind + Naive UI)

### 4.1 角色主题色 (Tailwind Config)

在 `tailwind.config.js` 中定义语义化颜色，区分不同角色的操作界面氛围。

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#16a34a',      // 默认主色 (若依蓝或品牌绿)
        farmer: '#15803d',       // 农民端：深绿色 (强调自然/种植)
        admin: '#2563eb',        // 管理员：科技蓝 (强调管控)
        buyer: '#d97706',        // 收购商：丰收金 (强调交易)
        warehouse: '#475569',    // 库管员：工业灰 (强调稳重)
      }
    }
  }
}
```

### 4.2 界面布局策略

  * **农民端 (Mobile First)**:

      * **Grid 布局**: 使用 `grid-cols-1` (手机) 到 `md:grid-cols-2` (平板)。
      * **交互**: 大按钮 (`h-12`), 卡片式列表代替复杂表格。
      * **组件**: 使用 Naive UI 的 `NCard` 和 `NList`。

  * **管理后台 (Desktop)**:

      * **布局**: 经典的左侧 Sidebar + 顶部 Navbar + 面包屑。
      * **数据展示**: 使用 Naive UI 的 `NDataTable`，开启 Stripe 和 Bordered。
      * **操作**: 紧凑型按钮组，支持右键菜单。

### 4.3 核心组件封装

1.  **DictSelect (字典下拉)**:

      * 自动加载若依 `sys_dict_data`。
      * Props: `dictType` (如 `ag_land_type`)。
      * UI: 封装 `NSelect`。

2.  **QrCodeScan (扫码组件)**:

      * 用于库存管理。
      * 支持调用摄像头 (Html5Qrcode) 或 监听 USB 扫码枪 (键盘事件监听)。

-----

## 5\. 国际化 (I18n) 规划

系统支持 **中文 (zh\_CN)**、**英文 (en\_US)** 和 **奥罗莫语 (om\_ET)**。

### 5.1 静态文案

存放于 `src/locales/*.ts`。

```json
// en.ts 示例
{
  "menu": {
    "land_mgmt": "Land Management",
    "seed_rd": "Seed R&D"
  },
  "land": {
    "area": "Area (Hectares)",
    "crop_type": "Crop Type",
    "actions": {
      "plant": "Report Planting",
      "harvest": "Report Harvest"
    }
  }
}
```

### 5.2 动态数据国际化 (字典)

若依后端的字典通常存储的是中文标签 (`dict_label`)。前端需建立映射机制：

  * **方案**: 在 `utils/dict.ts` 中，拦截字典响应。
  * **逻辑**: 如果当前语言非中文，尝试在本地 I18n 文件中查找 Key 为 `dict.{dictType}.{dictValue}` 的翻译。如果找不到，回退显示后端返回的 `dict_label`。

-----

## 6\. API 交互规范

### 6.1 Axios 拦截器 (utils/request.ts)

1.  **请求拦截**:

      * 自动在 Header 中携带 `Authorization: Bearer {token}`。
      * 处理多语言 Header: `Accept-Language: en-US` (用于告知后端返回对应语言的提示信息，如果后端支持)。

2.  **响应拦截**:

      * **Code 200**: 业务成功，返回 `res.data`。
      * **Code 401**: Token 过期/无效。触发 `Pinia` 的 `LogOut` 动作并跳转登录页。
      * **Code 500/Other**: 统一弹出 `window.$message.error` (Naive UI Message)。

### 6.2 数据类型定义 (TypeScript Interfaces)

必须为所有 API 的 Request 和 Response 定义 Interface。

```typescript
// api/agriculture/land.ts 示例
export interface LandDTO {
  landName: string;
  areaSize: number;
  adCode: string;
  // ...
}

export interface LandVO {
  landId: number;
  landName: string;
  status: string; // '0' | '1'
  createTime: string;
}

// 查询接口
export function listLand(query: PageQuery): Promise<ApiResponse<PageResult<LandVO>>> {
  return request({
    url: '/agriculture/land/list',
    method: 'get',
    params: query
  })
}
```
