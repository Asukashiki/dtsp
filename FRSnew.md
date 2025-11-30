

1. **田间检验和实验室测试数据采集** - 采集实验室检测数据和田间产量数据
2. **育种数据集编制** - 汇总育种数据并提交审核
3. **育种数据集审核** - 审核育种数据集
4. **育种许可数据录入** - 录入国家审批许可信息
5. **物联网传感器维护** - 维护传感器设备基础信息

---

## 二、业务流程关系图

```
育种批次 → 试验基础信息 → 田间数据采集 → 环境数据采集
                                    ↓
                         田间检验和实验室测试数据采集
                                    ↓
                            育种数据集编制
                                    ↓
                            育种数据集审核
                                    ↓
                            育种许可数据录入
                                    
物联网传感器维护 (独立维护，为环境数据采集提供设备支撑)
```

---

## 三、功能详细设计

### 3.1 田间检验和实验室测试数据采集

#### 3.1.1 功能描述
采集种子质量检测的实验室数据（发芽率、纯度、水分含量等）和田间产量验证数据，支持多次录入，为育种数据集提供质量评估依据。

#### 3.1.2 使用对象
- 种子机构技术人员
- 实验室检测人员

#### 3.1.3 业务逻辑

```
1. 前置条件：
   - 必须存在有效的育种批次
   - 必须存在关联的试验记录

2. 操作流程：
   ┌─────────────────────────────────────────────────────────┐
   │  选择育种批次/试验 → 录入实验室测试数据 → 数据校验 → 保存  │
   │                   → 录入产量数据       → 数据校验 → 保存  │
   └─────────────────────────────────────────────────────────┘

3. 数据校验规则：
   - 发芽率：0-100%
   - 纯度：0-100%
   - 水分含量：0-100%
   - 产量数据：必须大于0
   
4. 支持功能：
   - 多次录入（同一试验可录入多次检测数据）
   - 上传实验室报告文件
   - 数据修改（未提交审核前）
```

#### 3.1.4 数据库设计

**表1：实验室测试数据表 (breeding_lab_test)**

| 字段名                      | 数据类型          | 是否为空     | 默认值               | 描述        | 备注                 |
| ------------------------ | ------------- | -------- | ----------------- | --------- | ------------------ |
| id                       | varchar(36)   | NOT NULL | -                 | 主键ID      | UUID               |
| batch_id                 | varchar(36)   | NOT NULL | -                 | 育种批次ID    | 外键关联breeding_batch |
| trial_id                 | varchar(36)   | NOT NULL | -                 | 试验ID      | 外键关联breeding_trial |
| sample_id                | varchar(50)   | NOT NULL | -                 | 样本编号      | 唯一标识样本             |
| sample_status            | varchar(50)   | NULL     | -                 | 样本状态      |                    |
| germination_rate         | decimal(5,2)  | NOT NULL | -                 | 发芽率(%)    | 0-100              |
| purity_percent           | decimal(5,2)  | NOT NULL | -                 | 纯度(%)     | 0-100              |
| moisture_content_percent | decimal(5,2)  | NOT NULL | -                 | 水分含量(%)   | 0-100              |
| protein_percent          | decimal(5,2)  | NULL     | -                 | 蛋白质含量(%)  |                    |
| toxin_level_ppm          | decimal(10,4) | NULL     | -                 | 毒素水平(PPM) |                    |
| seed_health_findings     | varchar(500)  | NULL     | -                 | 种子健康发现    |                    |
| chain_responsibility     | varchar(200)  | NULL     | -                 | 链路责任      |                    |
| lab_report_file          | varchar(255)  | NULL     | -                 | 实验室报告文件路径 |                    |
| test_date                | date          | NOT NULL | -                 | 检测日期      |                    |
| test_organization        | varchar(100)  | NULL     | -                 | 检测机构      |                    |
| tester_name              | varchar(50)   | NULL     | -                 | 检测人员      |                    |
| status                   | char(1)       | NOT NULL | '1'               | 状态        | 1:有效 0:无效          |
| created_by               | varchar(36)   | NOT NULL | -                 | 创建人ID     |                    |
| created_by_name          | varchar(50)   | NULL     | -                 | 创建人姓名     |                    |
| created_org_code         | varchar(36)   | NULL     | -                 | 创建机构代码    |                    |
| created_org_name         | varchar(100)  | NULL     | -                 | 创建机构名称    |                    |
| created_time             | datetime      | NOT NULL | CURRENT_TIMESTAMP | 创建时间      |                    |
| updated_by               | varchar(36)   | NULL     | -                 | 更新人ID     |                    |
| updated_time             | datetime      | NULL     | -                 | 更新时间      |                    |
| remark                   | varchar(500)  | NULL     | -                 | 备注        |                    |
| deleted                  | char(1)       | NOT NULL | '0'               | 删除标记      | 0:未删除 1:已删除        |

**表2：产量数据表 (breeding_yield_data)**

| 字段名              | 数据类型          | 是否为空     | 默认值               | 描述        | 备注                 |
| ---------------- | ------------- | -------- | ----------------- | --------- | ------------------ |
| id               | varchar(36)   | NOT NULL | -                 | 主键ID      | UUID               |
| batch_id         | varchar(36)   | NOT NULL | -                 | 育种批次ID    | 外键关联breeding_batch |
| trial_id         | varchar(36)   | NOT NULL | -                 | 试验ID      | 外键关联breeding_trial |
| plot_id          | varchar(50)   | NOT NULL | -                 | 地块编号      |                    |
| plot_area_m2     | decimal(12,2) | NOT NULL | -                 | 地块面积(m²)  |                    |
| grain_weight_kg  | decimal(12,3) | NOT NULL | -                 | 谷物重量(kg)  |                    |
| yield_qt_per_ha  | decimal(10,2) | NOT NULL | -                 | 产量(公担/公顷) |                    |
| moisture_content | decimal(5,2)  | NULL     | -                 | 含水量(%)    |                    |
| harvest_date     | date          | NOT NULL | -                 | 收获日期      |                    |
| recorder_name    | varchar(50)   | NULL     | -                 | 记录人员      |                    |
| status           | char(1)       | NOT NULL | '1'               | 状态        | 1:有效 0:无效          |
| created_by       | varchar(36)   | NOT NULL | -                 | 创建人ID     |                    |
| created_by_name  | varchar(50)   | NULL     | -                 | 创建人姓名     |                    |
| created_org_code | varchar(36)   | NULL     | -                 | 创建机构代码    |                    |
| created_org_name | varchar(100)  | NULL     | -                 | 创建机构名称    |                    |
| created_time     | datetime      | NOT NULL | CURRENT_TIMESTAMP | 创建时间      |                    |
| updated_by       | varchar(36)   | NULL     | -                 | 更新人ID     |                    |
| updated_time     | datetime      | NULL     | -                 | 更新时间      |                    |
| remark           | varchar(500)  | NULL     | -                 | 备注        |                    |
| deleted          | char(1)       | NOT NULL | '0'               | 删除标记      | 0:未删除 1:已删除        |

---

### 3.2 育种数据集编制

#### 3.2.1 功能描述
将育种批次下的所有试验数据（田间数据、环境数据、检验数据）汇总成数据集，提交上级部门审核。

#### 3.2.2 使用对象
- 种子机构管理人员

#### 3.2.3 业务逻辑

```
1. 前置条件：
   - 育种批次必须包含完整的试验数据
   - 至少有一条实验室检测记录
   - 至少有一条产量数据记录

2. 操作流程：
   ┌────────────────────────────────────────────────────────────────┐
   │  选择育种批次 → 系统自动汇总数据 → 检查数据完整性 → 提交审核    │
   └────────────────────────────────────────────────────────────────┘

3. 数据集状态流转：
   草稿(draft) → 已提交(submitted) → 审核中(reviewing) 
                                   → 已通过(approved) / 已驳回(rejected)
   
   已驳回 → 修改后重新提交 → 已提交

4. 数据汇总内容：
   - 育种批次基础信息
   - 试验记录数量统计
   - 田间数据记录数
   - 环境数据记录数
   - 检验数据记录数
   - 产量数据汇总
```

#### 3.2.4 数据库设计

**表3：育种数据集表 (breeding_dataset)**

| 字段名              | 数据类型         | 是否为空     | 默认值               | 描述       | 备注                                       |
| ---------------- | ------------ | -------- | ----------------- | -------- | ---------------------------------------- |
| id               | varchar(36)  | NOT NULL | -                 | 主键ID     | UUID                                     |
| dataset_code     | varchar(50)  | NOT NULL | -                 | 数据集编号    | 审核通过后生成，唯一                               |
| batch_id         | varchar(36)  | NOT NULL | -                 | 育种批次ID   | 外键关联breeding_batch                       |
| batch_name       | varchar(100) | NULL     | -                 | 育种批次名称   | 冗余字段                                     |
| crop_type        | varchar(50)  | NULL     | -                 | 作物类型     | 冗余字段                                     |
| variety_name     | varchar(100) | NULL     | -                 | 品种名称     | 冗余字段                                     |
| trial_count      | int          | NULL     | 0                 | 试验记录数    |                                          |
| field_data_count | int          | NULL     | 0                 | 田间数据记录数  |                                          |
| env_data_count   | int          | NULL     | 0                 | 环境数据记录数  |                                          |
| lab_test_count   | int          | NULL     | 0                 | 实验室检测记录数 |                                          |
| yield_data_count | int          | NULL     | 0                 | 产量数据记录数  |                                          |
| dataset_status   | varchar(20)  | NOT NULL | 'draft'           | 数据集状态    | draft/submitted/reviewing/approved/rejected |
| submit_time      | datetime     | NULL     | -                 | 提交时间     |                                          |
| submit_by        | varchar(36)  | NULL     | -                 | 提交人ID    |                                          |
| submit_by_name   | varchar(50)  | NULL     | -                 | 提交人姓名    |                                          |
| submit_org_code  | varchar(36)  | NULL     | -                 | 提交机构代码   |                                          |
| submit_org_name  | varchar(100) | NULL     | -                 | 提交机构名称   |                                          |
| status           | char(1)      | NOT NULL | '1'               | 状态       | 1:有效 0:无效                                |
| created_by       | varchar(36)  | NOT NULL | -                 | 创建人ID    |                                          |
| created_by_name  | varchar(50)  | NULL     | -                 | 创建人姓名    |                                          |
| created_org_code | varchar(36)  | NULL     | -                 | 创建机构代码   |                                          |
| created_org_name | varchar(100) | NULL     | -                 | 创建机构名称   |                                          |
| created_time     | datetime     | NOT NULL | CURRENT_TIMESTAMP | 创建时间     |                                          |
| updated_by       | varchar(36)  | NULL     | -                 | 更新人ID    |                                          |
| updated_time     | datetime     | NULL     | -                 | 更新时间     |                                          |
| remark           | varchar(500) | NULL     | -                 | 备注       |                                          |
| deleted          | char(1)      | NOT NULL | '0'               | 删除标记     | 0:未删除 1:已删除                              |

---

### 3.3 育种数据集审核

#### 3.3.1 功能描述
对提交的育种数据集进行审核，审核通过后数据集被锁定不可修改，并生成正式的数据集编号；审核不通过则退回修改。

#### 3.3.2 使用对象
- 种子机构审核人员
- 上级主管部门人员

#### 3.3.3 业务逻辑

```
1. 前置条件：
   - 数据集状态为"已提交"
   - 审核人员具有审核权限

2. 操作流程：
   ┌─────────────────────────────────────────────────────────────────┐
   │  查看待审核列表 → 选择数据集 → 查看详情 → 填写审核意见 → 通过/驳回 │
   └─────────────────────────────────────────────────────────────────┘

3. 审核规则：
   - 审核通过：
     * 生成正式数据集编号
     * 锁定相关数据不可修改
     * 状态变更为"已通过"
   - 审核驳回：
     * 必须填写驳回原因
     * 状态变更为"已驳回"
     * 解锁数据允许修改

4. 审核记录：
   - 保留完整的审核历史
   - 支持多级审核流程
```

#### 3.3.4 数据库设计

**表4：育种数据集审核记录表 (breeding_dataset_audit)**

| 字段名              | 数据类型          | 是否为空     | 默认值               | 描述      | 备注                        |
| ---------------- | ------------- | -------- | ----------------- | ------- | ------------------------- |
| id               | varchar(36)   | NOT NULL | -                 | 主键ID    | UUID                      |
| dataset_id       | varchar(36)   | NOT NULL | -                 | 数据集ID   | 外键关联breeding_dataset      |
| batch_id         | varchar(36)   | NOT NULL | -                 | 育种批次ID  | 冗余字段                      |
| audit_node       | varchar(50)   | NULL     | -                 | 审核节点    | 支持多级审核                    |
| audit_order      | int           | NULL     | 1                 | 审核顺序    |                           |
| audit_status     | varchar(20)   | NOT NULL | -                 | 审核状态    | pending/approved/rejected |
| audit_opinion    | varchar(1000) | NULL     | -                 | 审核意见    | 驳回时必填                     |
| audit_time       | datetime      | NULL     | -                 | 审核时间    |                           |
| auditor_id       | varchar(36)   | NULL     | -                 | 审核人ID   |                           |
| auditor_name     | varchar(50)   | NULL     | -                 | 审核人姓名   |                           |
| auditor_org_code | varchar(36)   | NULL     | -                 | 审核人机构代码 |                           |
| auditor_org_name | varchar(100)  | NULL     | -                 | 审核人机构名称 |                           |
| submit_time      | datetime      | NOT NULL | -                 | 提交时间    |                           |
| submitter_id     | varchar(36)   | NOT NULL | -                 | 提交人ID   |                           |
| submitter_name   | varchar(50)   | NULL     | -                 | 提交人姓名   |                           |
| status           | char(1)       | NOT NULL | '1'               | 状态      | 1:有效 0:无效                 |
| created_by       | varchar(36)   | NOT NULL | -                 | 创建人ID   |                           |
| created_time     | datetime      | NOT NULL | CURRENT_TIMESTAMP | 创建时间    |                           |
| updated_by       | varchar(36)   | NULL     | -                 | 更新人ID   |                           |
| updated_time     | datetime      | NULL     | -                 | 更新时间    |                           |
| remark           | varchar(500)  | NULL     | -                 | 备注      |                           |
| deleted          | char(1)       | NOT NULL | '0'               | 删除标记    | 0:未删除 1:已删除               |

---

### 3.4 育种许可数据录入

#### 3.4.1 功能描述
育种数据集审核通过后，线下提交国家品种监管部门审批，审批通过后在系统中录入国家许可信息，包括许可证号、物种特性等。

#### 3.4.2 使用对象
- 种子机构管理人员

#### 3.4.3 业务逻辑

```
1. 前置条件：
   - 育种数据集必须审核通过
   - 已获得国家品种监管部门的线下批准

2. 操作流程：
   ┌──────────────────────────────────────────────────────────────────┐
   │  选择已通过的数据集 → 录入物种特性 → 录入许可信息 → 上传认证文件 → 保存 │
   └──────────────────────────────────────────────────────────────────┘

3. 数据关联：
   - 一个育种批次对应一个许可记录
   - 许可信息包含物种特性子表

4. 许可状态：
   - 有效(valid)
   - 过期(expired)
   - 撤销(revoked)
```

#### 3.4.4 数据库设计

**表5：育种许可信息表 (breeding_license)**

| 字段名              | 数据类型         | 是否为空     | 默认值               | 描述      | 备注                    |
| ---------------- | ------------ | -------- | ----------------- | ------- | --------------------- |
| id               | varchar(36)  | NOT NULL | -                 | 主键ID    | UUID                  |
| batch_id         | varchar(36)  | NOT NULL | -                 | 育种批次ID  | 外键关联breeding_batch，唯一 |
| dataset_id       | varchar(36)  | NOT NULL | -                 | 数据集ID   | 外键关联breeding_dataset  |
| license_no       | varchar(50)  | NOT NULL | -                 | 许可证号    | 唯一                    |
| approval_org     | varchar(100) | NOT NULL | -                 | 审批机构    |                       |
| approval_date    | date         | NOT NULL | -                 | 批准日期    |                       |
| valid_start_date | date         | NULL     | -                 | 有效期开始日期 |                       |
| valid_end_date   | date         | NULL     | -                 | 有效期结束日期 |                       |
| certificate_file | varchar(255) | NULL     | -                 | 认证文件路径  |                       |
| license_status   | varchar(20)  | NOT NULL | 'valid'           | 许可状态    | valid/expired/revoked |
| status           | char(1)      | NOT NULL | '1'               | 状态      | 1:有效 0:无效             |
| created_by       | varchar(36)  | NOT NULL | -                 | 创建人ID   |                       |
| created_by_name  | varchar(50)  | NULL     | -                 | 创建人姓名   |                       |
| created_org_code | varchar(36)  | NULL     | -                 | 创建机构代码  |                       |
| created_org_name | varchar(100) | NULL     | -                 | 创建机构名称  |                       |
| created_time     | datetime     | NOT NULL | CURRENT_TIMESTAMP | 创建时间    |                       |
| updated_by       | varchar(36)  | NULL     | -                 | 更新人ID   |                       |
| updated_time     | datetime     | NULL     | -                 | 更新时间    |                       |
| remark           | varchar(500) | NULL     | -                 | 备注      |                       |
| deleted          | char(1)      | NOT NULL | '0'               | 删除标记    | 0:未删除 1:已删除           |

**表6：物种特性表 (breeding_variety_traits)**

| 字段名                  | 数据类型          | 是否为空     | 默认值               | 描述     | 备注                   |
| -------------------- | ------------- | -------- | ----------------- | ------ | -------------------- |
| id                   | varchar(36)   | NOT NULL | -                 | 主键ID   | UUID                 |
| license_id           | varchar(36)   | NOT NULL | -                 | 许可ID   | 外键关联breeding_license |
| batch_id             | varchar(36)   | NOT NULL | -                 | 育种批次ID | 冗余字段                 |
| min_yield_potential  | decimal(10,2) | NULL     | -                 | 最小产量潜力 |                      |
| max_yield_potential  | decimal(10,2) | NULL     | -                 | 最大产量潜力 |                      |
| disease_resistance   | text          | NULL     | -                 | 抗病性    | JSON格式存储             |
| stress_tolerance     | text          | NULL     | -                 | 压力耐受性  | JSON格式存储             |
| maturity_days        | int           | NULL     | -                 | 成熟期(天) |                      |
| plant_height         | decimal(6,2)  | NULL     | -                 | 株高(cm) |                      |
| grain_quality_traits | varchar(500)  | NULL     | -                 | 谷物品质性状 |                      |
| other_traits         | text          | NULL     | -                 | 其他特性   | JSON格式存储             |
| status               | char(1)       | NOT NULL | '1'               | 状态     | 1:有效 0:无效            |
| created_by           | varchar(36)   | NOT NULL | -                 | 创建人ID  |                      |
| created_time         | datetime      | NOT NULL | CURRENT_TIMESTAMP | 创建时间   |                      |
| updated_by           | varchar(36)   | NULL     | -                 | 更新人ID  |                      |
| updated_time         | datetime      | NULL     | -                 | 更新时间   |                      |
| remark               | varchar(500)  | NULL     | -                 | 备注     |                      |
| deleted              | char(1)       | NOT NULL | '0'               | 删除标记   | 0:未删除 1:已删除          |

---

### 3.5 物联网传感器维护

#### 3.5.1 功能描述
维护物联网传感器设备的基础信息，包括设备注册、状态管理、地块绑定等，为环境数据自动采集提供设备支撑。

#### 3.5.2 使用对象
- 种子机构设备管理人员
- 系统管理员

#### 3.5.3 业务逻辑

```
1. 设备生命周期：
   注册 → 校准 → 绑定地块 → 运行中 → 维护/停用 → 报废

2. 操作流程：
   ┌─────────────────────────────────────────────────────────────────┐
   │  新增设备 → 录入设备信息 → 设备校准 → 绑定地块 → 启用设备          │
   └─────────────────────────────────────────────────────────────────┘

3. 设备状态：
   - 待校准(pending_calibration)
   - 正常运行(running)
   - 维护中(maintenance)
   - 已停用(disabled)
   - 已报废(scrapped)

4. 关联关系：
   - 一个传感器可绑定多个地块
   - 支持查看设备数据上报历史

5. 校验规则：
   - 设备编号唯一
   - 校准日期不能晚于当前日期
```

#### 3.5.4 数据库设计

**表7：物联网传感器设备表 (iot_sensor_device)**

| 字段名                   | 数据类型          | 是否为空     | 默认值                   | 描述       | 备注                                       |
| --------------------- | ------------- | -------- | --------------------- | -------- | ---------------------------------------- |
| id                    | varchar(36)   | NOT NULL | -                     | 主键ID     | UUID                                     |
| device_code           | varchar(50)   | NOT NULL | -                     | 设备编号     | 唯一                                       |
| device_name           | varchar(100)  | NOT NULL | -                     | 设备名称     |                                          |
| device_type           | varchar(20)   | NOT NULL | -                     | 设备类型     | soil:土壤/weather:气象/multi:综合              |
| manufacturer          | varchar(100)  | NULL     | -                     | 制造商      |                                          |
| model                 | varchar(50)   | NULL     | -                     | 设备型号     |                                          |
| serial_number         | varchar(100)  | NULL     | -                     | 序列号      |                                          |
| firmware_version      | varchar(50)   | NULL     | -                     | 固件版本     |                                          |
| calibration_date      | date          | NULL     | -                     | 校准日期     |                                          |
| next_calibration_date | date          | NULL     | -                     | 下次校准日期   |                                          |
| battery_status        | varchar(20)   | NULL     | -                     | 电池状态     | full/normal/low/critical                 |
| battery_level         | int           | NULL     | -                     | 电池电量(%)  | 0-100                                    |
| installation_date     | date          | NULL     | -                     | 安装日期     |                                          |
| installation_location | varchar(200)  | NULL     | -                     | 安装位置     |                                          |
| gps_latitude          | decimal(10,6) | NULL     | -                     | GPS纬度    |                                          |
| gps_longitude         | decimal(10,6) | NULL     | -                     | GPS经度    |                                          |
| device_status         | varchar(20)   | NOT NULL | 'pending_calibration' | 设备状态     | pending_calibration/running/maintenance/disabled/scrapped |
| last_online_time      | datetime      | NULL     | -                     | 最后在线时间   |                                          |
| last_data_time        | datetime      | NULL     | -                     | 最后数据上报时间 |                                          |
| status                | char(1)       | NOT NULL | '1'                   | 状态       | 1:有效 0:无效                                |
| created_by            | varchar(36)   | NOT NULL | -                     | 创建人ID    |                                          |
| created_by_name       | varchar(50)   | NULL     | -                     | 创建人姓名    |                                          |
| created_org_code      | varchar(36)   | NULL     | -                     | 创建机构代码   |                                          |
| created_org_name      | varchar(100)  | NULL     | -                     | 创建机构名称   |                                          |
| created_time          | datetime      | NOT NULL | CURRENT_TIMESTAMP     | 创建时间     |                                          |
| updated_by            | varchar(36)   | NULL     | -                     | 更新人ID    |                                          |
| updated_time          | datetime      | NULL     | -                     | 更新时间     |                                          |
| remark                | varchar(500)  | NULL     | -                     | 备注       |                                          |
| deleted               | char(1)       | NOT NULL | '0'                   | 删除标记     | 0:未删除 1:已删除                              |

**表8：传感器设备与地块绑定关系表 (iot_sensor_bindplot)**

| 字段名          | 数据类型         | 是否为空     | 默认值               | 描述    | 备注                    |
| ------------ | ------------ | -------- | ----------------- | ----- | --------------------- |
| id           | varchar(36)  | NOT NULL | -                 | 主键ID  | UUID                  |
| device_id    | varchar(36)  | NOT NULL | -                 | 设备ID  | 外键关联iot_sensor_device |
| plot_id      | varchar(36)  | NOT NULL | -                 | 地块ID  | 外键关联地块表               |
| bindtime     | datetime     | NOT NULL | -                 | 绑定时间  |                       |
| unbind_time  | datetime     | NULL     | -                 | 解绑时间  |                       |
| bindstatus   | char(1)      | NOT NULL | '1'               | 绑定状态  | 1:已绑定 0:已解绑           |
| bindby       | varchar(36)  | NOT NULL | -                 | 绑定人ID |                       |
| bindby_name  | varchar(50)  | NULL     | -                 | 绑定人姓名 |                       |
| status       | char(1)      | NOT NULL | '1'               | 状态    | 1:有效 0:无效             |
| created_by   | varchar(36)  | NOT NULL | -                 | 创建人ID |                       |
| created_time | datetime     | NOT NULL | CURRENT_TIMESTAMP | 创建时间  |                       |
| updated_by   | varchar(36)  | NULL     | -                 | 更新人ID |                       |
| updated_time | datetime     | NULL     | -                 | 更新时间  |                       |
| remark       | varchar(500) | NULL     | -                 | 备注    |                       |
| deleted      | char(1)      | NOT NULL | '0'               | 删除标记  | 0:未删除 1:已删除           |

---

## 四、数据库表关系图

```
                                    ┌─────────────────────┐
                                    │   breeding_batch    │
                                    │     (育种批次)       │
                                    └──────────┬──────────┘
                                               │
                    ┌──────────────────────────┼──────────────────────────┐
                    │                          │                          │
                    ▼                          ▼                          ▼
        ┌───────────────────┐      ┌───────────────────┐      ┌───────────────────┐
        │  breeding_trial   │      │ breeding_lab_test │      │breeding_yield_data│
        │    (育种试验)      │      │  (实验室测试数据)   │      │   (产量数据)       │
        └───────────────────┘      └───────────────────┘      └───────────────────┘
                    │
                    ▼
        ┌───────────────────┐
        │ breeding_dataset  │
        │   (育种数据集)     │
        └─────────┬─────────┘
                  │
        ┌─────────┴─────────┐
        │                   │
        ▼                   ▼
┌─────────────────┐  ┌─────────────────┐
│breeding_dataset │  │breeding_license │
│     _audit      │  │  (育种许可)      │
│  (数据集审核)    │  └────────┬────────┘
└─────────────────┘           │
                              ▼
                    ┌─────────────────┐
                    │breeding_variety │
                    │    _traits      │
                    │  (物种特性)      │
                    └─────────────────┘


        ┌───────────────────┐         ┌───────────────────┐
        │iot_sensor_device  │────────▶│iot_sensor_bindplot│
        │  (传感器设备)      │         │  (设备地块绑定)    │
        └───────────────────┘         └───────────────────┘
```

---

## 五、公共字段说明

所有表统一包含以下公共字段：

| 字段名              | 数据类型         | 描述     | 说明                |
| ---------------- | ------------ | ------ | ----------------- |
| id               | varchar(36)  | 主键     | UUID格式            |
| status           | char(1)      | 业务状态   | 1:有效 0:无效         |
| created_by       | varchar(36)  | 创建人ID  |                   |
| created_by_name  | varchar(50)  | 创建人姓名  | 冗余字段，便于查询         |
| created_org_code | varchar(36)  | 创建机构代码 |                   |
| created_org_name | varchar(100) | 创建机构名称 | 冗余字段，便于查询         |
| created_time     | datetime     | 创建时间   | 默认当前时间            |
| updated_by       | varchar(36)  | 更新人ID  |                   |
| updated_time     | datetime     | 更新时间   |                   |
| remark           | varchar(500) | 备注     |                   |
| deleted          | char(1)      | 删除标记   | 0:未删除 1:已删除(逻辑删除) |

---

## 六、DDL建表语句

```sql
-- ============================================
-- 1. 实验室测试数据表
-- ============================================
CREATE TABLE breeding_lab_test (
    id VARCHAR(36) NOT NULL COMMENT '主键ID',
    batch_id VARCHAR(36) NOT NULL COMMENT '育种批次ID',
    trial_id VARCHAR(36) NOT NULL COMMENT '试验ID',
    sample_id VARCHAR(50) NOT NULL COMMENT '样本编号',
    sample_status VARCHAR(50) DEFAULT NULL COMMENT '样本状态',
    germination_rate DECIMAL(5,2) NOT NULL COMMENT '发芽率(%)',
    purity_percent DECIMAL(5,2) NOT NULL COMMENT '纯度(%)',
    moisture_content_percent DECIMAL(5,2) NOT NULL COMMENT '水分含量(%)',
    protein_percent DECIMAL(5,2) DEFAULT NULL COMMENT '蛋白质含量(%)',
    toxin_level_ppm DECIMAL(10,4) DEFAULT NULL COMMENT '毒素水平(PPM)',
    seed_health_findings VARCHAR(500) DEFAULT NULL COMMENT '种子健康发现',
    chain_responsibility VARCHAR(200) DEFAULT NULL COMMENT '链路责任',
    lab_report_file VARCHAR(255) DEFAULT NULL COMMENT '实验室报告文件路径',
    test_date DATE NOT NULL COMMENT '检测日期',
    test_organization VARCHAR(100) DEFAULT NULL COMMENT '检测机构',
    tester_name VARCHAR(50) DEFAULT NULL COMMENT '检测人员',
    status CHAR(1) NOT NULL DEFAULT '1' COMMENT '状态:1有效0无效',
    created_by VARCHAR(36) NOT NULL COMMENT '创建人ID',
    created_by_name VARCHAR(50) DEFAULT NULL COMMENT '创建人姓名',
    created_org_code VARCHAR(36) DEFAULT NULL COMMENT '创建机构代码',
    created_org_name VARCHAR(100) DEFAULT NULL COMMENT '创建机构名称',
    created_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_by VARCHAR(36) DEFAULT NULL COMMENT '更新人ID',
    updated_time DATETIME DEFAULT NULL COMMENT '更新时间',
    remark VARCHAR(500) DEFAULT NULL COMMENT '备注',
    deleted CHAR(1) NOT NULL DEFAULT '0' COMMENT '删除标记:0未删除1已删除',
    PRIMARY KEY (id),
    INDEX idx_batch_id (batch_id),
    INDEX idx_trial_id (trial_id),
    INDEX idx_sample_id (sample_id),
    INDEX idx_test_date (test_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='实验室测试数据表';

-- ============================================
-- 2. 产量数据表
-- ============================================
CREATE TABLE breeding_yield_data (
    id VARCHAR(36) NOT NULL COMMENT '主键ID',
    batch_id VARCHAR(36) NOT NULL COMMENT '育种批次ID',
    trial_id VARCHAR(36) NOT NULL COMMENT '试验ID',
    plot_id VARCHAR(50) NOT NULL COMMENT '地块编号',
    plot_area_m2 DECIMAL(12,2) NOT NULL COMMENT '地块面积(m²)',
    grain_weight_kg DECIMAL(12,3) NOT NULL COMMENT '谷物重量(kg)',
    yield_qt_per_ha DECIMAL(10,2) NOT NULL COMMENT '产量(公担/公顷)',
    moisture_content DECIMAL(5,2) DEFAULT NULL COMMENT '含水量(%)',
    harvest_date DATE NOT NULL COMMENT '收获日期',
    recorder_name VARCHAR(50) DEFAULT NULL COMMENT '记录人员',
    status CHAR(1) NOT NULL DEFAULT '1' COMMENT '状态:1有效0无效',
    created_by VARCHAR(36) NOT NULL COMMENT '创建人ID',
    created_by_name VARCHAR(50) DEFAULT NULL COMMENT '创建人姓名',
    created_org_code VARCHAR(36) DEFAULT NULL COMMENT '创建机构代码',
    created_org_name VARCHAR(100) DEFAULT NULL COMMENT '创建机构名称',
    created_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_by VARCHAR(36) DEFAULT NULL COMMENT '更新人ID',
    updated_time DATETIME DEFAULT NULL COMMENT '更新时间',
    remark VARCHAR(500) DEFAULT NULL COMMENT '备注',
    deleted CHAR(1) NOT NULL DEFAULT '0' COMMENT '删除标记:0未删除1已删除',
    PRIMARY KEY (id),
    INDEX idx_batch_id (batch_id),
    INDEX idx_trial_id (trial_id),
    INDEX idx_harvest_date (harvest_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='产量数据表';

-- ============================================
-- 3. 育种数据集表
-- ============================================
CREATE TABLE breeding_dataset (
    id VARCHAR(36) NOT NULL COMMENT '主键ID',
    dataset_code VARCHAR(50) DEFAULT NULL COMMENT '数据集编号',
    batch_id VARCHAR(36) NOT NULL COMMENT '育种批次ID',
    batch_name VARCHAR(100) DEFAULT NULL COMMENT '育种批次名称',
    crop_type VARCHAR(50) DEFAULT NULL COMMENT '作物类型',
    variety_name VARCHAR(100) DEFAULT NULL COMMENT '品种名称',
    trial_count INT DEFAULT 0 COMMENT '试验记录数',
    field_data_count INT DEFAULT 0 COMMENT '田间数据记录数',
    env_data_count INT DEFAULT 0 COMMENT '环境数据记录数',
    lab_test_count INT DEFAULT 0 COMMENT '实验室检测记录数',
    yield_data_count INT DEFAULT 0 COMMENT '产量数据记录数',
    dataset_status VARCHAR(20) NOT NULL DEFAULT 'draft' COMMENT '数据集状态:draft/submitted/reviewing/approved/rejected',
    submit_time DATETIME DEFAULT NULL COMMENT '提交时间',
    submit_by VARCHAR(36) DEFAULT NULL COMMENT '提交人ID',
    submit_by_name VARCHAR(50) DEFAULT NULL COMMENT '提交人姓名',
    submit_org_code VARCHAR(36) DEFAULT NULL COMMENT '提交机构代码',
    submit_org_name VARCHAR(100) DEFAULT NULL COMMENT '提交机构名称',
    status CHAR(1) NOT NULL DEFAULT '1' COMMENT '状态:1有效0无效',
    created_by VARCHAR(36) NOT NULL COMMENT '创建人ID',
    created_by_name VARCHAR(50) DEFAULT NULL COMMENT '创建人姓名',
    created_org_code VARCHAR(36) DEFAULT NULL COMMENT '创建机构代码',
    created_org_name VARCHAR(100) DEFAULT NULL COMMENT '创建机构名称',
    created_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_by VARCHAR(36) DEFAULT NULL COMMENT '更新人ID',
    updated_time DATETIME DEFAULT NULL COMMENT '更新时间',
    remark VARCHAR(500) DEFAULT NULL COMMENT '备注',
    deleted CHAR(1) NOT NULL DEFAULT '0' COMMENT '删除标记:0未删除1已删除',
    PRIMARY KEY (id),
    UNIQUE INDEX uk_dataset_code (dataset_code),
    INDEX idx_batch_id (batch_id),
    INDEX idx_dataset_status (dataset_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='育种数据集表';

-- ============================================
-- 4. 育种数据集审核记录表
-- ============================================
CREATE TABLE breeding_dataset_audit (
    id VARCHAR(36) NOT NULL COMMENT '主键ID',
    dataset_id VARCHAR(36) NOT NULL COMMENT '数据集ID',
    batch_id VARCHAR(36) NOT NULL COMMENT '育种批次ID',
    audit_node VARCHAR(50) DEFAULT NULL COMMENT '审核节点',
    audit_order INT DEFAULT 1 COMMENT '审核顺序',
    audit_status VARCHAR(20) NOT NULL COMMENT '审核状态:pending/approved/rejected',
    audit_opinion VARCHAR(1000) DEFAULT NULL COMMENT '审核意见',
    audit_time DATETIME DEFAULT NULL COMMENT '审核时间',
    auditor_id VARCHAR(36) DEFAULT NULL COMMENT '审核人ID',
    auditor_name VARCHAR(50) DEFAULT NULL COMMENT '审核人姓名',
    auditor_org_code VARCHAR(36) DEFAULT NULL COMMENT '审核人机构代码',
    auditor_org_name VARCHAR(100) DEFAULT NULL COMMENT '审核人机构名称',
    submit_time DATETIME NOT NULL COMMENT '提交时间',
    submitter_id VARCHAR(36) NOT NULL COMMENT '提交人ID',
    submitter_name VARCHAR(50) DEFAULT NULL COMMENT '提交人姓名',
    status CHAR(1) NOT NULL DEFAULT '1' COMMENT '状态:1有效0无效',
    created_by VARCHAR(36) NOT NULL COMMENT '创建人ID',
    created_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_by VARCHAR(36) DEFAULT NULL COMMENT '更新人ID',
    updated_time DATETIME DEFAULT NULL COMMENT '更新时间',
    remark VARCHAR(500) DEFAULT NULL COMMENT '备注',
    deleted CHAR(1) NOT NULL DEFAULT '0' COMMENT '删除标记:0未删除1已删除',
    PRIMARY KEY (id),
    INDEX idx_dataset_id (dataset_id),
    INDEX idx_batch_id (batch_id),
    INDEX idx_audit_status (audit_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='育种数据集审核记录表';

-- ============================================
-- 5. 育种许可信息表
-- ============================================
CREATE TABLE breeding_license (
    id VARCHAR(36) NOT NULL COMMENT '主键ID',
    batch_id VARCHAR(36) NOT NULL COMMENT '育种批次ID',
    dataset_id VARCHAR(36) NOT NULL COMMENT '数据集ID',
    license_no VARCHAR(50) NOT NULL COMMENT '许可证号',
    approval_org VARCHAR(100) NOT NULL COMMENT '审批机构',
    approval_date DATE NOT NULL COMMENT '批准日期',
    valid_start_date DATE DEFAULT NULL COMMENT '有效期开始日期',
    valid_end_date DATE DEFAULT NULL COMMENT '有效期结束日期',
    certificate_file VARCHAR(255) DEFAULT NULL COMMENT '认证文件路径',
    license_status VARCHAR(20) NOT NULL DEFAULT 'valid' COMMENT '许可状态:valid/expired/revoked',
    status CHAR(1) NOT NULL DEFAULT '1' COMMENT '状态:1有效0无效',
    created_by VARCHAR(36) NOT NULL COMMENT '创建人ID',
    created_by_name VARCHAR(50) DEFAULT NULL COMMENT '创建人姓名',
    created_org_code VARCHAR(36) DEFAULT NULL COMMENT '创建机构代码',
    created_org_name VARCHAR(100) DEFAULT NULL COMMENT '创建机构名称',
    created_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_by VARCHAR(36) DEFAULT NULL COMMENT '更新人ID',
    updated_time DATETIME DEFAULT NULL COMMENT '更新时间',
    remark VARCHAR(500) DEFAULT NULL COMMENT '备注',
    deleted CHAR(1) NOT NULL DEFAULT '0' COMMENT '删除标记:0未删除1已删除',
    PRIMARY KEY (id),
    UNIQUE INDEX uk_batch_id (batch_id),
    UNIQUE INDEX uk_license_no (license_no),
    INDEX idx_dataset_id (dataset_id),
    INDEX idx_license_status (license_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='育种许可信息表';

-- ============================================
-- 6. 物种特性表
-- ============================================
CREATE TABLE breeding_variety_traits (
    id VARCHAR(36) NOT NULL COMMENT '主键ID',
    license_id VARCHAR(36) NOT NULL COMMENT '许可ID',
    batch_id VARCHAR(36) NOT NULL COMMENT '育种批次ID',
    min_yield_potential DECIMAL(10,2) DEFAULT NULL COMMENT '最小产量潜力',
    max_yield_potential DECIMAL(10,2) DEFAULT NULL COMMENT '最大产量潜力',
    disease_resistance TEXT DEFAULT NULL COMMENT '抗病性(JSON)',
    stress_tolerance TEXT DEFAULT NULL COMMENT '压力耐受性(JSON)',
    maturity_days INT DEFAULT NULL COMMENT '成熟期(天)',
    plant_height DECIMAL(6,2) DEFAULT NULL COMMENT '株高(cm)',
    grain_quality_traits VARCHAR(500) DEFAULT NULL COMMENT '谷物品质性状',
    other_traits TEXT DEFAULT NULL COMMENT '其他特性(JSON)',
    status CHAR(1) NOT NULL DEFAULT '1' COMMENT '状态:1有效0无效',
    created_by VARCHAR(36) NOT NULL COMMENT '创建人ID',
    created_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_by VARCHAR(36) DEFAULT NULL COMMENT '更新人ID',
    updated_time DATETIME DEFAULT NULL COMMENT '更新时间',
    remark VARCHAR(500) DEFAULT NULL COMMENT '备注',
    deleted CHAR(1) NOT NULL DEFAULT '0' COMMENT '删除标记:0未删除1已删除',
    PRIMARY KEY (id),
    INDEX idx_license_id (license_id),
    INDEX idx_batch_id (batch_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='物种特性表';

-- ============================================
-- 7. 物联网传感器设备表
-- ============================================
CREATE TABLE iot_sensor_device (
    id VARCHAR(36) NOT NULL COMMENT '主键ID',
    device_code VARCHAR(50) NOT NULL COMMENT '设备编号',
    device_name VARCHAR(100) NOT NULL COMMENT '设备名称',
    device_type VARCHAR(20) NOT NULL COMMENT '设备类型:soil土壤/weather气象/multi综合',
    manufacturer VARCHAR(100) DEFAULT NULL COMMENT '制造商',
    model VARCHAR(50) DEFAULT NULL COMMENT '设备型号',
    serial_number VARCHAR(100) DEFAULT NULL COMMENT '序列号',
    firmware_version VARCHAR(50) DEFAULT NULL COMMENT '固件版本',
    calibration_date DATE DEFAULT NULL COMMENT '校准日期',
    next_calibration_date DATE DEFAULT NULL COMMENT '下次校准日期',
    battery_status VARCHAR(20) DEFAULT NULL COMMENT '电池状态:full/normal/low/critical',
    battery_level INT DEFAULT NULL COMMENT '电池电量(%)',
    installation_date DATE DEFAULT NULL COMMENT '安装日期',
    installation_location VARCHAR(200) DEFAULT NULL COMMENT '安装位置',
    gps_latitude DECIMAL(10,6) DEFAULT NULL COMMENT 'GPS纬度',
    gps_longitude DECIMAL(10,6) DEFAULT NULL COMMENT 'GPS经度',
    device_status VARCHAR(20) NOT NULL DEFAULT 'pending_calibration' COMMENT '设备状态',
    last_online_time DATETIME DEFAULT NULL COMMENT '最后在线时间',
    last_data_time DATETIME DEFAULT NULL COMMENT '最后数据上报时间',
    status CHAR(1) NOT NULL DEFAULT '1' COMMENT '状态:1有效0无效',
    created_by VARCHAR(36) NOT NULL COMMENT '创建人ID',
    created_by_name VARCHAR(50) DEFAULT NULL COMMENT '创建人姓名',
    created_org_code VARCHAR(36) DEFAULT NULL COMMENT '创建机构代码',
    created_org_name VARCHAR(100) DEFAULT NULL COMMENT '创建机构名称',
    created_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_by VARCHAR(36) DEFAULT NULL COMMENT '更新人ID',
    updated_time DATETIME DEFAULT NULL COMMENT '更新时间',
    remark VARCHAR(500) DEFAULT NULL COMMENT '备注',
    deleted CHAR(1) NOT NULL DEFAULT '0' COMMENT '删除标记:0未删除1已删除',
    PRIMARY KEY (id),
    UNIQUE INDEX uk_device_code (device_code),
    INDEX idx_device_type (device_type),
    INDEX idx_device_status (device_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='物联网传感器设备表';

-- ============================================
-- 8. 传感器设备与地块绑定关系表
-- ============================================
CREATE TABLE iot_sensor_bindplot (
    id VARCHAR(36) NOT NULL COMMENT '主键ID',
    device_id VARCHAR(36) NOT NULL COMMENT '设备ID',
    plot_id VARCHAR(36) NOT NULL COMMENT '地块ID',
    bind_time DATETIME NOT NULL COMMENT '绑定时间',
    unbind_time DATETIME DEFAULT NULL COMMENT '解绑时间',
    bind_status CHAR(1) NOT NULL DEFAULT '1' COMMENT '绑定状态:1已绑定0已解绑',
    bind_by VARCHAR(36) NOT NULL COMMENT '绑定人ID',
    bind_by_name VARCHAR(50) DEFAULT NULL COMMENT '绑定人姓名',
    status CHAR(1) NOT NULL DEFAULT '1' COMMENT '状态:1有效0无效',
    created_by VARCHAR(36) NOT NULL COMMENT '创建人ID',
    created_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_by VARCHAR(36) DEFAULT NULL COMMENT '更新人ID',
    updated_time DATETIME DEFAULT NULL COMMENT '更新时间',
    remark VARCHAR(500) DEFAULT NULL COMMENT '备注',
    deleted CHAR(1) NOT NULL DEFAULT '0' COMMENT '删除标记:0未删除1已删除',
    PRIMARY KEY (id),
    INDEX idx_device_id (device_id),
    INDEX idx_plot_id (plot_id),
    INDEX idx_bindstatus (bind_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='传感器设备与地块绑定关系表';
```

---

## 七、枚举值定义

### 7.1 数据集状态 (dataset_status)
| 值         | 描述   |
| --------- | ---- |
| draft     | 草稿   |
| submitted | 已提交  |
| reviewing | 审核中  |
| approved  | 已通过  |
| rejected  | 已驳回  |

### 7.2 审核状态 (audit_status)
| 值        | 描述   |
| -------- | ---- |
| pending  | 待审核  |
| approved | 审核通过 |
| rejected | 审核驳回 |

### 7.3 许可状态 (license_status)
| 值       | 描述   |
| ------- | ---- |
| valid   | 有效   |
| expired | 已过期  |
| revoked | 已撤销  |

### 7.4 设备类型 (device_type)
| 值       | 描述    |
| ------- | ----- |
| soil    | 土壤传感器 |
| weather | 气象传感器 |
| multi   | 综合传感器 |

### 7.5 设备状态 (device_status)
| 值                   | 描述   |
| ------------------- | ---- |
| pending_calibration | 待校准  |
| running             | 正常运行 |
| maintenance         | 维护中  |
| disabled            | 已停用  |
| scrapped            | 已报废  |

### 7.6 电池状态 (battery_status)
| 值        | 描述     |
| -------- | ------ |
| full     | 满电     |
| normal   | 正常     |
| low      | 低电量    |
| critical | 电量严重不足 |



