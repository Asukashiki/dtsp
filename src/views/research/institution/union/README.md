# Union注册功能

## 功能描述
Union注册功能用于种子机构录入Union信息并发起注册申请。

## 菜单位置
研究与开发管理系统 > 企业注册备案 > Union注册

## 功能特性

### 1. 企业身份信息
- 企业名称（必填）
- 企业注册ID
- 统一社会信用代码
- 种子企业许可证编号（必填）
- 企业类型（必填）：生产型/贸易型/综合型
- 许可证有效期起止（必填）

### 2. 位置与运营信息
- 地区、区域、Woreda（必填）、Kebele（必填）
- 完整地址（必填）
- GPS坐标（纬度必填，经度选填）
- 业务范围
- 年生产能力（吨/年）

### 3. 许可信息
- 营业执照（必填）
- 种子许可证
- 税务登记证
- 工厂许可证（必填）

### 4. 操作人信息
- 操作人（必填）
- 操作机构（自动填充）
- 操作时间（自动记录）

## 状态流转
1. **草稿（-1）**：保存但未提交的申请
2. **待审核（0）**：已提交等待审核
3. **已通过（1）**：审核通过
4. **已驳回（2）**：审核驳回，可查看驳回原因并重新提交

## 文件说明

### 前端文件
- `UnionRegistration.vue` - Union注册页面组件
- `src/api/union.js` - Union相关API接口
- `src/locales/zh-CN/research.js` - 中文国际化配置
- `src/locales/en-US/research.js` - 英文国际化配置

### 后端文件
- `IUnionRegistrationService.java` - Union注册服务接口
- `UnionRegistrationController.java` - Union注册控制器
- `UnionRegistrationDTO.java` - Union注册数据传输对象
- `union_registration_fix.sql` - 数据库表结构

## API接口

### 提交注册申请
```javascript
POST /seed/union/registration/submit
```

### 保存草稿
```javascript
POST /seed/union/registration/save
```

### 查询当前用户的Union信息
```javascript
GET /seed/union/registration/info
```

### 查询Union列表
```javascript
GET /seed/union/registration/list
```

### 删除Union信息
```javascript
DELETE /seed/union/registration/{enterpriseIds}
```

## 使用说明

1. 填写企业身份信息（必填项）
2. 填写位置与运营信息
3. 上传许可证文件（营业执照和工厂许可证为必传）
4. 填写操作人信息
5. 可选择"保存草稿"或"提交申请"
6. 提交后等待审核
7. 如被驳回，可查看驳回原因并修改后重新提交

## 注意事项

1. 带 * 号的字段为必填项
2. 文件上传支持格式：PDF、JPG、PNG
3. 文件大小限制：10MB
4. GPS坐标格式：纬度和经度使用小数点格式
5. 许可证有效期：结束日期必须晚于开始日期
6. 待审核和已通过状态下表单为只读，不可编辑
7. 已驳回状态下可以修改并重新提交

## 数据库表结构

### union_info（Union基本信息表）
主要字段：
- data_id: 数据唯一标识
- enterprise_id: 企业唯一标识
- enterprise_name: 企业名称
- seed_enterprise_license_number: 种子企业许可证编号
- enterprise_type: 企业类型
- license_validity_start/end: 许可证有效期
- woreda, kebele: 地理位置
- gps_latitude, gps_longitude: GPS坐标
- certification_status: 认证状态（-1草稿/0待审核/1通过/2驳回）

### union_license_info（Union许可信息表）
主要字段：
- data_id: 数据唯一标识
- enterprise_id: 企业唯一标识（外键）
- business_license: 营业执照文件路径
- seed_license: 种子许可证文件路径
- tax_certificate: 税务登记证文件路径
- factory_permit: 工厂许可证文件路径

## 开发者备注

- 文件上传功能当前为模拟实现，需要集成实际的文件上传服务
- GPS坐标输入可以考虑集成地图选点功能
- 可以添加表单自动保存功能（定时保存草稿）
- 建议添加表单填写进度提示
