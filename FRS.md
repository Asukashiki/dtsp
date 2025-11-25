\## 企业注册备案

\### 种子企业认证

\#### 功能描述

种子企业、机构通过该功能进行种子企业认证，用户填写企业基础信息后，系统进行验证，验证通过后方可使用品种管理、育种管理等功能，备案数据有助于监管部门掌握奥罗米亚州的种子企业情况。

\#### 使用对象

种子企业人员、审核人员

\#### 业务逻辑

1、种子企业开展种子相关业务，需提交备案材料完成认证；企业在线提交认证材料后，企业负责录入/核对企业信息，审核人员对提交的材料及信息进行审核，决定是否通过备案。

2、自动关联企业基本信息、法人信息、经营范围等基础数据。

3、对必填字段进行格式校验，对重复信息进行提示。

\#### 原型设计

认证申请页面：​

顶部为企业身份信息区：企业名称、企业注册 ID、统一社会信用代码、企业类型、种子企业许可证编号、许可证有效期起始日、许可证有效期；

中部为位置与运营信息区：包括地区、区域、县、乡、完整地址、业务范围、年生产能力（吨/年）；

中部为企业额外信息区：包括企业成立时间、法人姓名及ID、联系人姓名、联系电话、邮箱；

中部为所需文件区：包括营业执照、种子许可证、税务登记证、工厂许可证等证明材料。

底部为操作信息展示区：包括操作人、操作机构、操作时间。

\#### 输入信息

\#### 输出信息

\#### 数据库设计

enterprise_info

|     |     |     |     |     |

| --- | --- | --- | --- | --- |

| 字段名称(FieldName) | 数据类型(DataType) | 是否为空(Null) | 描述(Description) | 备注(Note) |

| enterprise_id | VARCHAR(32) | NOT NULL | Enterprise Unique Identifier | Primary key, system generated |

| enterprise_name | VARCHAR(100) | NOT NULL | Business name | Unique Index |

| unified_social_credit_code | VARCHAR(20) | NOT NULL | Unified Social Credit Code | Unique Index |

| enterprise_type | VARCHAR(50) | NOT NULL | Business Type | Enumeration: Production-oriented/trade-oriented/integrated |

| seed_license_no | VARCHAR(50) | NOT NULL | Seed business license number | Unique Index |

| license_start_date | DATE | NOT NULL | Start date of license validity |     |

| license_end_date | DATE | NOT NULL | License expiration date |     |

| region | VARCHAR(50) | NOT NULL | Region |     |

| zone | VARCHAR(50) | NOT NULL | Area |     |

| county | VARCHAR(50) | NOT NULL | county |     |

| township | VARCHAR(50) | NOT NULL | township |     |

| detailed_address | VARCHAR(255) | NOT NULL | Full address |     |

| business_scope | VARCHAR(255) | NOT NULL | Business Scope |     |

| annual_production_capacity | A DECIMAL (1, 2) | NOT NULL | Annual production capacity (tons/year) |     |

| establishment_date | DATE | NOT NULL | Time of establishment |     |

| legal_person_name | VARCHAR(50) | NOT NULL | Legal person's name |     |

| legal_person_id | VARCHAR(30) | NOT NULL | Legal person ID |     |

| contact_person | VARCHAR(50) | NOT NULL | Contact person's name |     |

| contact_phone | VARCHAR(20) | NOT NULL | Contact number |     |

| contact_email | VARCHAR(100) | NULL | Mailbox |     |

| business_license_url | VARCHAR(255) | NOT NULL | Business license storage path |     |

| seed_license_url | VARCHAR(255) | NOT NULL | Seed license storage path |     |

| tax_registration_url | VARCHAR(255) | NOT NULL | Tax registration certificate storage path |     |

| factory_license_url | VARCHAR(255) | NOT NULL | Factory license storage path |     |

| operator | VARCHAR(50) | NOT NULL | Operator |     |

| operation_org | VARCHAR(100) | NOT NULL | Operating mechanism |     |

| operation_time | DATETIME | NOT NULL | Operation time | Default current time |

| certification_status | TINYINT(1) | NOT NULL | Authentication status |     |

\### 种子企业审核

\#### 功能描述

种子企业、机构提交种子企业认证信息后，对种子企业提交的备案申请材料进行合规性审核与审批，确认企业是否具备种子企业的资质，最终形成审核结果。

\#### 使用对象

审核人员

\#### 业务逻辑

种子企业提交备案申请后，分配至管理人员的待办列表；管理人员审核企业基础信息、资质材料及填报数据，验证材料完整性、有效性及信息一致性，决定审核通过或驳回。

\#### 原型设计

\- 审核任务列表页面：​

列表展示审核中/已审核的企业申请，包含企业名称、统一社会信用代码、申请日期、当前审核阶段、分配审核人；

支持按照企业名称、ID、许可证号、审核状态进行条件筛选；

\- 审核任务详情页面：​

顶部为企业基础信息概览：包括企业名称、ID、许可证号、企业类型、申请类型等，不可编辑；

中部为企业额外信息区：包括企业成立时间、法人姓名及ID、联系人姓名、联系电话、邮箱；

中部为所需文件区：包括营业执照、种子许可证、税务登记证、工厂许可证等证明材料。

底部为审核操作区：包括审核结果、审核意见、审核人、审核时间。

\#### 输入信息

\#### 输出信息

\#### 数据库设计

|     |     |     |     |     |

| --- | --- | --- | --- | --- |

| 字段名称(FieldName) | 数据类型(DataType) | 是否为空(Null) | 描述(Description) | 备注(Note) |

| audit_id | VARCHAR(32) | NOT NULL | Audit record unique identifier | Primary key, system generated |

| enterprise_id | VARCHAR(32) | NOT NULL | Associated enterprise unique identifier | The foreign key is associated with enterprise_info.enterprise_id |

| audit_result | TINYINT(1) | NOT NULL | Review Results | 1 - Pass / 2 - reject |

| audit_opinion | VARCHAR(500) | NULL | Review comments |     |

| auditor | VARCHAR(50) | NOT NULL | Reviewer |     |

| audit_time | DATETIME | NOT NULL | Review time | Default Current time |

| audit_stage | VARCHAR(50) | NOT NULL | Current Review stage | Enumeration: Initial review/re-review/final review |

| reject_reason | VARCHAR(500) | NULL | Reasons for rejection |     |

| audit_id | VARCHAR(32) | NOT NULL | Audit record unique identifier | Primary key, system generated |

| enterprise_id | VARCHAR(32) | NOT NULL | Associated enterprise unique identifier | The foreign key is associated with enterprise_info.enterprise_id |

| audit_result | TINYINT(1) | NOT NULL | Review Results | 1 - Pass / 2 - reject |

| audit_opinion | VARCHAR(500) | NULL | Review comments |     |

\## 品种管理

\### 品种登记

\#### 功能描述

记录种子品种的基础信息，通过系统标准化录入，形成完整的品种登记档案，为后续审核与发布提供基础数据支撑。

\#### 使用对象

种子企业人员

\#### 业务逻辑

1、种子企业按作物类型填写品种基本信息，并上传证明材料，系统生成品种登记申请单。

2、前置条件：需要种子企业已完成企业注册备案；

3、品种登记申请提交后，系统生成唯一登记申请号，状态更新为 “审核中”；

4、支持 PDF、JPG 格式的材料上传，单份材料大小<2MB。

\#### 原型设计

\- 登记申请页面，分为备案基础信息、品种标识信息、技术性状信息、试验和性能数据、监管数据五部分。

1、顶部为备案实体信息区：企业名称、企业注册 ID、统一社会信用代码、企业类型、种子企业许可证编号、许可证有效期起始日、许可证有效期，不可修改；

中部为备案基础信息区：包括备案类型、备案日期、备案状态；

2、品种标识信息区：包括品种名称、品种代码、作物类型、物种、属、科、育种方法、方法系谱、培育年份；

3、技术性状信息区：包括最低产量潜力（公担 / 公顷）、最高产量潜力（公担 / 公顷）、抗病性、抗逆性、生育期（天）、株高（厘米）、谷物质量性状。

4、实验和性能信息区：包括试验地点、试验年份、平均产量、稳定性评分、试验报告、照片；

5、监管信息区：包括核准文件编号、核准机构、核准日期、认证文件。

\#### 输入信息

企业身份信息：企业名称、企业注册 ID、统一社会信用代码、企业类型、种子企业许可证编号、许可证有效期起始日、许可证有效期

位置与运营信息：地区、区域、县、乡、完整地址、业务范围、年生产能力（吨 / 年）

企业额外信息：企业成立时间、法人姓名及 ID、联系人姓名、联系电话、邮箱

所需文件：营业执照（PDF/JPG）、种子许可证（PDF/JPG）、税务登记证（PDF/JPG）、工厂许可证（PDF/JPG），单份文件≤2MB

\#### 输出信息

种子企业认证申请单（含完整填报信息及文件附件）

系统生成的企业备案唯一标识

字段校验结果提示（重复信息、格式错误提醒）

\#### 数据库设计

数据库设计（enterprise_info）

| 字段名称 | 数据类型 | 是否为空 | 描述  | 备注  |

| --- | --- | --- | --- | --- |

| enterprise_id | VARCHAR(32) | NOT NULL | 企业唯一标识 | 主键，系统生成 |

| enterprise_name | VARCHAR(100) | NOT NULL | 企业名称 | 唯一索引 |

| unified_social_credit_code | VARCHAR(20) | NOT NULL | 统一社会信用代码 | 唯一索引 |

| enterprise_type | VARCHAR(50) | NOT NULL | 企业类型 | 枚举：生产型 / 贸易型 / 综合型 |

| seed_license_no | VARCHAR(50) | NOT NULL | 种子企业许可证编号 | 唯一索引 |

| license_start_date | DATE | NOT NULL | 许可证有效期起始日 |     |

| license_end_date | DATE | NOT NULL | 许可证有效期截止日 |     |

| region | VARCHAR(50) | NOT NULL | 地区  |     |

| zone | VARCHAR(50) | NOT NULL | 区域  |     |

| county | VARCHAR(50) | NOT NULL | 县   |     |

| township | VARCHAR(50) | NOT NULL | 乡   |     |

| detailed_address | VARCHAR(255) | NOT NULL | 完整地址 |     |

| business_scope | VARCHAR(255) | NOT NULL | 业务范围 |     |

| annual_production_capacity | DECIMAL(10,2) | NOT NULL | 年生产能力（吨 / 年） |     |

| establishment_date | DATE | NOT NULL | 企业成立时间 |     |

| legal_person_name | VARCHAR(50) | NOT NULL | 法人姓名 |     |

| legal_person_id | VARCHAR(30) | NOT NULL | 法人 ID |     |

| contact_person | VARCHAR(50) | NOT NULL | 联系人姓名 |     |

| contact_phone | VARCHAR(20) | NOT NULL | 联系电话 |     |

| contact_email | VARCHAR(100) | NULL | 邮箱  |     |

| business_license_url | VARCHAR(255) | NOT NULL | 营业执照存储路径 |     |

| seed_license_url | VARCHAR(255) | NOT NULL | 种子许可证存储路径 |     |

| tax_registration_url | VARCHAR(255) | NOT NULL | 税务登记证存储路径 |     |

| factory_license_url | VARCHAR(255) | NOT NULL | 工厂许可证存储路径 |     |

| operator | VARCHAR(50) | NOT NULL | 操作人 |     |

| operation_org | VARCHAR(100) | NOT NULL | 操作机构 |     |

| operation_time | DATETIME | NOT NULL | 操作时间 | 默认当前时间 |

| certification_status | TINYINT(1) | NOT NULL | 认证状态 |     |

\### 品种审核

\#### 功能描述

种子企业、机构提交种子企业认证信息后，对种子品种登记申请的材料完整性、数据真实性及合规性进行审核，确认品种是否符合登记条件，最终形成审核结果。

\#### 使用对象

审核人员

\#### 业务逻辑

1、审核人员登录系统，查看审核中的品种申请列表，查阅品种信息，审核人员根据校验结果及法规要求，决定 “通过”或“驳回”，并填写审核意见。

2、品种登记申请已提交且状态为 “审核中”；审核通过：品种状态更新为 “待发布”；审核未通过，系统记录驳回原因，申请状态更新为 “审核未通过”。

\#### 原型设计

\- 审核任务列表页面：​

列表展示审核中的品种，包含申请号、品种名称、作物类型、提交单位；

支持按照品种、提交单位、审核状态进行条件筛选；

\- 审核任务详情页面：​

顶部为品种基础信息区：包括名称、作物类型、申请号、提交单位；

中部为审核操作区：包括审核结果、审核意见、审核人、审核时间；

底部为品种详细信息区：包括品种标识信息、技术性状信息、试验和性能数据、监管数据。

\#### 输入信息

审核操作信息：审核结果（通过 / 驳回）、审核意见、审核人、审核时间

关联数据：待审核企业的备案申请信息及提交的证明材料

\#### 输出信息

审核结果通知（系统消息 / 邮件）

企业备案状态更新记录

审核意见存档

\#### 数据库设计

|     |     |     |     |     |

| --- | --- | --- | --- | --- |

| 字段名称(FieldName) | 数据类型(DataType) | 是否为空(Null) | 描述(Description) | 备注(Note) |

| audit_id | VARCHAR(32) | NOT NULL | 审核记录唯一标识 | 主键，系统生成 |

| enterprise_id | VARCHAR(32) | NOT NULL | 关联企业唯一标识 | 外键关联 enterprise_info.enterprise_id |

| audit_result | TINYINT(1) | NOT NULL | 审核结果 | 1 - 通过 / 2 - 驳回 |

| audit_opinion | VARCHAR(500) | NULL | 审核意见 |     |

| auditor | VARCHAR(50) | NOT NULL | 审核人 |     |

| audit_time | DATETIME | NOT NULL | 审核时间 | 默认当前时间 |

| audit_stage | VARCHAR(50) | NOT NULL | 当前审核阶段 | 枚举：初审 / 复审 / 终审 |

| reject_reason | VARCHAR(500) | NULL | 驳回原因 |     |

| audit_id | VARCHAR(32) | NOT NULL | 审核记录唯一标识 | 主键，系统生成 |

| enterprise_id | VARCHAR(32) | NOT NULL | 关联企业唯一标识 | 外键关联 enterprise_info.enterprise_id |

| audit_result | TINYINT(1) | NOT NULL | 审核结果 | 1 - 通过 / 2 - 驳回 |

| audit_opinion | VARCHAR(500) | NULL | 审核意见 |     |

\### 品种发布

\#### 功能描述

将审核通过的种子品种信息录入品种登记数据库，并通过平台向社会公示，实现品种信息可查询。

\#### 使用对象

管理人员

\#### 业务逻辑

1、品种审核通过后，系统自动将其纳入发布队列；管理人员可进行发布操作，发布完成后，并在平台 “种子信息公示” 栏目可查看，公众可查询品种信息。

2、品种登记审核已通过，状态为 “待发布”；品种信息正式发布，状态更新为 “已发布”，可在平台公开查询；审核通过的品种自动进入 “待发布” 队列，支持按作物类型、审核时间排序。

\#### 原型设计

\- 品种发布管理页面：​

展示待发布品种列表，包含申请号、品种名称、作物类型、审核通过时间、公示状态；

操作列包含 “预览发布信息”“立即发布”按钮，录入决策说明信息。

\- 品种发布查询页面：

展示已发布品种列表，包含发布编号、品种名称、作物类型、发布日期、发布主管部门，点击查看详情，可查看公开描述、决策说明、照片、推荐地区、播种指南。

\#### 输入信息

发布操作信息：发布决策说明、发布人、发布时间

关联数据：审核通过的品种登记信息（状态为 “待发布”）

\#### 输出信息

已发布品种信息（平台公示数据）

品种发布记录

\#### 数据库设计

| **字段名称** | **数据类型** | **是否为空** | **描述** | **备注** |

| --- | --- | --- | --- | --- |

| publish_id | VARCHAR(32) | NOT NULL | 发布记录唯一标识 | 主键，系统生成 |

| publish_no | VARCHAR(50) | NOT NULL | 发布编号 | 唯一索引 |

| registration_id | VARCHAR(32) | NOT NULL | 关联登记申请唯一标识 | 外键关联 variety_registration.registration_id |

| variety_name | VARCHAR(100) | NOT NULL | 品种名称 | 冗余字段，便于查询 |

| crop_type | VARCHAR(50) | NOT NULL | 作物类型 | 冗余字段，便于查询 |

| publish_date | DATE | NOT NULL | 发布日期 | 默认当前日期 |

| publish_dept | VARCHAR(100) | NOT NULL | 发布主管部门 |     |

| decision_explanation | VARCHAR(500) | NULL | 决策说明 |     |

| public_description | VARCHAR(1000) | NULL | 公开描述 |     |

| recommended_region | VARCHAR(255) | NULL | 推荐地区 |     |

| sowing_guide | VARCHAR(1000) | NULL | 播种指南 |     |

| publish_status | TINYINT(1) | NOT NULL | 公示状态 | 1 - 公示中 / 2 - 已下架 |

| publisher | VARCHAR(50) | NOT NULL | 发布人 |     |

| publish_time | DATETIME | NOT NULL | 发布时间 |     |

\## 育种管理

\### 育种计划管理

\#### 功能描述

种子企业设置育种计划，包括育种年度、育种批次、种植基地、作物、亲本品种、繁殖级别，确保育种目标有序推进，同时关联数据采集模块，形成闭环管理。

\#### 使用对象

种子企业人员

\#### 业务逻辑

1、种子企业根据需求制定育种计划，明确选育目标、亲本组合、试验规模及时间节点。

2、需要种子企业已完成平台备案，且具备基础资源数据；

\#### 原型设计

\- 育种计划制定页面：​

计划基本信息区，包括计划名称、育种年度、育种批次ID、种植基地、作物类型、品种名称、繁殖级别、亲本种子来源、负责人、起止时间、目标、备注。

\#### 输入信息

计划基本信息：计划名称、育种年度、育种批次 ID、种植基地、作物类型、品种名称、繁殖级别、亲本种子来源、负责人、起止时间、目标、备注

\#### 输出信息

育种计划记录

关联的育种批次标识

计划执行跟踪关联依据

\#### 数据库设计

| **字段名称** | **数据类型** | **是否为空** | **描述** | **备注** |

| --- | --- | --- | --- | --- |

| plan_id | VARCHAR(32) | NOT NULL | 育种计划唯一标识 | 主键，系统生成 |

| enterprise_id | VARCHAR(32) | NOT NULL | 关联企业唯一标识 | 外键关联 enterprise_info.enterprise_id |

| plan_name | VARCHAR(100) | NOT NULL | 计划名称 |     |

| breeding_year | YEAR | NOT NULL | 育种年度 |     |

| batch_id | VARCHAR(32) | NOT NULL | 育种批次 ID | 唯一索引 |

| planting_base | VARCHAR(100) | NOT NULL | 种植基地 |     |

| crop_type | VARCHAR(50) | NOT NULL | 作物类型 |     |

| variety_name | VARCHAR(100) | NOT NULL | 品种名称 |     |

| propagation_level | VARCHAR(50) | NOT NULL | 繁殖级别 | 枚举：育种家种子 / 原原种 / 原种 / 良种 |

| parent_seed_source | VARCHAR(255) | NOT NULL | 亲本种子来源 |     |

| person_in_charge | VARCHAR(50) | NOT NULL | 负责人 |     |

| start_date | DATE | NOT NULL | 计划起始时间 |     |

| end_date | DATE | NOT NULL | 计划结束时间 |     |

| breeding_goal | VARCHAR(500) | NOT NULL | 育种目标 |     |

| remarks | VARCHAR(500) | NULL | 备注  |     |

| create_time | DATETIME | NOT NULL | 创建时间 | 默认当前时间 |

| update_time | DATETIME | NULL | 更新时间 |     |

\### 育种材料登记

\#### 功能描述

对育种过程中的育种资源进行管理，记录输入接收的种子信息，确保材料可查、可用。

\#### 使用对象

种子企业人员

\#### 业务逻辑

1、种子企业人员收集种子资源后，在系统中登记材料信息，录入库存数量

2、已创建育种计划，系统已配置材料分类标准、编码规则；

3、育种材料登记后生成唯一编码；

\#### 原型设计

\- 育种材料登记页面：​

顶部为基础信息区，包含育种批次信息、登记编码信息（自动生成）；

中部为信息录入区，支持多次录入，包括入库 ID、批次ID、种子类别、数量（千克）、来源实体、接收日期、实验室检测报告；

底部为操作展示区：包括操作人、操作机构、操作时间。

\#### 输入信息

基础关联信息：育种批次 ID、登记编码（系统自动生成）

材料信息：入库 ID、种子类别、数量（千克）、来源实体、接收日期、实验室检测报告（PDF/JPG）

\#### 输出信息

育种材料登记记录

唯一材料编码

材料库存台账

\#### 数据库设计

| **字段名称** | **数据类型** | **是否为空** | **描述** | **备注** |

| --- | --- | --- | --- | --- |

| material_id | VARCHAR(32) | NOT NULL | 材料登记唯一标识 | 主键，系统生成 |

| registration_code | VARCHAR(50) | NOT NULL | 登记编码 | 唯一索引，系统生成 |

| batch_id | VARCHAR(32) | NOT NULL | 育种批次 ID | 外键关联 breeding_plan.batch_id |

| warehouse_in_id | VARCHAR(32) | NOT NULL | 入库 ID |     |

| seed_type | VARCHAR(50) | NOT NULL | 种子类别 |     |

| quantity | DECIMAL(10,2) | NOT NULL | 数量（千克） |     |

| source_entity | VARCHAR(100) | NOT NULL | 来源实体 |     |

| receive_date | DATE | NOT NULL | 接收日期 |     |

| lab_test_report_url | VARCHAR(255) | NULL | 实验室检测报告路径 |     |

| operator | VARCHAR(50) | NOT NULL | 操作人 |     |

| operation_org | VARCHAR(100) | NOT NULL | 操作机构 |     |

| operation_time | DATETIME | NOT NULL | 操作时间 | 默认当前时间 |

\### 育种跟踪管理

\#### 功能描述

对育种繁殖跟踪阶段进行记录，包括亲本系准备 / 育种家种子、原原种繁殖、原种繁殖，确保育种过程规范可控。

\#### 使用对象

种子企业人员

\#### 业务逻辑

创建育种计划后，种子企业人员育种繁殖阶段信息，形成完整的育种过程数据。

\#### 原型设计

\- 育种跟踪管理页面：​

展示育种跟踪记录列表，包含跟踪ID、批次ID、阶段名称、位置、阶段完成日期；

操作列包含 “查看”按钮，点击可以查看详情，点击新增可以新增跟踪记录。

\- 育种跟踪详情页面：

展示跟踪ID、批次ID、阶段名称、位置、坐标、预期产量、实际产量、田间检查评分、病害观察、阶段完成日期，育种跟踪记录人信息。

\- 育种跟踪新增页面：

系统自动生成跟踪ID，并选择批次ID，录入阶段名称、位置、坐标、预期产量、实际产量、田间检查评分、病害观察、阶段完成日期，育种跟踪记录人信息。

\#### 输入信息

关联信息：批次 ID、跟踪 ID（系统自动生成）

跟踪信息：阶段名称、位置、坐标、预期产量、实际产量、田间检查评分、病害观察、阶段完成日期、记录人

\#### 输出信息

育种各阶段跟踪记录

育种过程完整数据链

阶段产量及质量分析依据

\#### 数据库设计

| **字段名称** | **数据类型** | **是否为空** | **描述** | **备注** |

| --- | --- | --- | --- | --- |

| tracking_id | VARCHAR(32) | NOT NULL | 跟踪记录唯一标识 | 主键，系统生成 |

| batch_id | VARCHAR(32) | NOT NULL | 育种批次 ID | 外键关联 breeding_plan.batch_id |

| stage_name | VARCHAR(50) | NOT NULL | 阶段名称 | 枚举：亲本系准备 / 育种家种子 / 原原种繁殖 / 原种繁殖 |

| location | VARCHAR(100) | NOT NULL | 位置  |     |

| coordinates | VARCHAR(50) | NULL | 坐标（经纬度） | 格式：纬度，经度 |

| expected_yield | DECIMAL(10,2) | NOT NULL | 预期产量 |     |

| actual_yield | DECIMAL(10,2) | NULL | 实际产量 | 阶段完成后填写 |

| field_inspection_score | DECIMAL(3,2) | NULL | 田间检查评分 | 0-5 分制 |

| disease_observation | VARCHAR(500) | NULL | 病害观察 |     |

| stage_completion_date | DATE | NULL | 阶段完成日期 |     |

| recorder | VARCHAR(50) | NOT NULL | 记录人 |     |

| record_time | DATETIME | NOT NULL | 记录时间 | 默认当前时间 |

| update_time | DATETIME | NULL | 更新时间 | 阶段完成后更新 |

\## 数据采集

\### 试验基础数据采集

\#### 功能描述

试验基础信息采集功能通过统一的录入规范和数据校验规则，确保试验信息的完整性和准确性，提供数据录入、数据查询功能。

\#### 使用对象

种子企业人员

\#### 业务逻辑

种子企业人员新增试验基础数据，录入作物类型、品种名称、研究中心ID等核心信息，系统提供数据校验，校验不通过则提示具体错误；

\#### 原型设计

\- 试验基础数据采集列表页面：​

顶部为查询区，包括试验ID、作物类型、品种名称、查询时间起止；

\- 试验基础数据采集新增/查看页面：​

包括试验基础数据信息、操作人信息。

\#### 输入信息

| **输入项** | **类型** | **必填** | **验证规则** |

| --- | --- | --- | --- |

| TrialID | 字符串 | \-  | 系统自动生成 |

| 作物类型 | 枚举  | 是   | 须与育种计划关联 |

| 品种名称 | 字符串 | 是   | 须与育种计划关联 |

| 研究中心ID | 字符串 | 是   |     |

| 程序 ID | 字符串 | 是   |     |

| 子程序 ID | 字符串 | 是   |     |

| 主题研究领域 ID | 字符串 | 是   |     |

| Region | 列表  | 是   |     |

| Zone | 列表  | 是   |     |

| Woreda | 列表  | 是   |     |

| Kebele | 列表  | 是   |     |

| 农业生态区 | 枚举  |     |     |

| GPS位置 | GPS | 是   | 支持自动获取，自动获取失败手动录入 |

| 开始日期 | 日期  | 是   |     |

| ActivityCod | 字符串 | 否   |     |

| KPI_Code | 字符串 | 否   |     |

| 季节  | 枚举  | 是   |     |

\#### 输出信息

无。

\#### 数据库设计

参照输入信息。

\### 农艺性状数据采集

\#### 功能描述

农业性状数据采集功能通过统一的录入规范和数据校验规则，确保植物生长信息的完整性和准确性，提供数据录入、数据查询功能。

\#### 使用对象

种子企业人员

\#### 业务逻辑

种子企业人员录入农业性状数据，录入植物高度、花期、产量信息，系统提供数据校验，校验不通过则提示具体错误。

\#### 原型设计

\- 数据采集列表页面：​

顶部为查询区，包括品种名称、查询时间起止；

\- 数据采集新增/查看页面：​

包括农艺性状数据信息、操作人信息。

\#### 输入信息

| **输入项** | **类型** | **必填** | **验证规则** |

| --- | --- | --- | --- |

| 植物高度 CM | float | 是   |     |

| TillerCount | 整数  | 是   |     |

| SpikeLengthCM | float | 是   |     |

| DaysToEmergence | 整数  | 是   |     |

| DaysToTillering | 整数  | 是   |     |

| 天数至抽穗期 | 整数  | 是   |     |

| 天数至开花期 | 整数  | 是   |     |

| DaysToGrainFilling | 整数  | 是   |     |

| DaysToMaturity | 整数  | 是   |     |

| LodgingScore | 整数  | 是   |     |

| BiomassWeightKG | float | 是   |     |

| 穗密度 | float | 是   |     |

| 每穗粒重 | float | 是   |     |

| 疾病评分 | 对象  | 是   |     |

| 压力指标 | 对象  | 是   |     |

| 害虫观察 | 字符串 | 是   |     |

| PhotoEvidence | 文件  | 否   |     |

\#### 输出信息

无。

\#### 数据库设计

参照输入信息。

\### 农事记录数据采集

\#### 功能描述

农事记录信息采集功能通过统一的录入规范和数据校验规则，确保试验信息的完整性和准确性，提供数据录入、数据查询功能。

\#### 使用对象

种子企业人员

\#### 业务逻辑

种子企业人员录入农事记录数据，系统提供数据校验，校验不通过则提示具体错误；

\#### 原型设计

\- 数据采集列表页面：​

顶部为查询区，包括管理类型；

\- 数据采集新增/查看页面：​

包括试验主数据信息、操作人信息。

\#### 输入信息

| **输入项** | **类型** | **必填** | **验证规则** |

| --- | --- | --- | --- |

| 数据ID | Int | 是   |     |

| 管理措施 | 枚举  | 是   |     |

| 肥料类型 | float | 否   |     |

| 肥料施用量（公斤） | float | 否   |     |

| UreaRateKG | 字符串 | 否   |     |

| PesticideType | 枚举 (字符串) | 否   |     |

| 灌溉类型 | 整数  | 否   |     |

| 灌溉频率 | 日期  | 否   |     |

| 除草日期 | 布尔值 | 否   |     |

| HerbicideUsed | 字符串 | 否   |     |

| SeedSource | float | 否   |     |

\#### 输出信息

无。

\#### 数据库设计

参照输入信息。

\### 环境与土壤属性数据采集

\#### 功能描述

环境与土壤属性数据信息采集功能通过统一的录入规范和数据校验规则，确保试验信息的完整性和准确性，提供数据录入、数据查询功能。

\#### 使用对象

种子企业人员

\#### 业务逻辑

种子企业人员新增数据，录入土壤 pH 值、土壤磷含量信息，系统提供数据校验，校验不通过则提示具体错误；

\#### 原型设计

\- 试验主数据采集列表页面：​

顶部为查询区，包括地貌、水源、查询时间起止；

\- 试验主数据采集新增/查看页面：​

包括环境与土壤属性数据信息、操作人信息。

\#### 输入信息

| **输入项** | **类型** | **必填** | **验证规则** |

| --- | --- | --- | --- |

| 数据ID | Int | 是   |     |

| 土壤 pH 值 | float | 是   |     |

| SoilEC | float | 是   |     |

| SoilNitrogenPercent | float | 是   |     |

| 土壤磷含量（PPM） | float | 是   |     |

| 土壤钾含量（PPM） | float | 是   |     |

| PreviousCrop | 字符串 | 否   |     |

| 水源  | 字符串 | 是   |     |

| 地貌  | 枚举 (字符串) | 是   |     |

| SlopePercent | float | 否   |     |

| 土壤湿度百分比 | float | 是   |     |

| 土壤温度 C | float | 是   |     |

| RainfallMM | float | 否   |     |

| AirTemperatureC | float | 否   |     |

| 湿度百分比 | float | 是   |     |

| 风速 MS | float | 是   |     |

| 太阳辐射 Wm2 | float | 是   |     |

| 时间戳 |     |     |     |

\#### 输出信息

无。

\#### 数据库设计

参照输入信息。

\### 农民与地块属性数据采集

\#### 功能描述

农民与地块属性数据信息采集功能通过统一的录入规范和数据校验规则，确保试验信息的完整性和准确性，提供数据录入、数据查询功能。

\#### 使用对象

种子企业人员

\#### 业务逻辑

种子企业人员新增数据，录入农民、地块信息，系统提供数据校验，校验不通过则提示具体错误；

\#### 原型设计

\- 试验主数据采集列表页面：​

顶部为查询区，包括农民、查询时间起止；

\- 试验主数据采集新增/查看页面：​

包括农民与地块属性数据信息、操作人信息。

\#### 输入信息

| **输入项** | **类型** | **必填** | **验证规则** |

| --- | --- | --- | --- |

| 数据ID | Int | 是   |     |

| FarmerName | 字符串 | 是   |     |

| 性别  | 枚举 (字符串) | 是   |     |

| 青年类别 | 枚举 (字符串) | 是   |     |

| 合作社成员资格 | 字符串 | 是   |     |

| PlotSizeM2 | float | 是   |     |

| **HouseholdID** | 字符串 | 否   |     |

| 联系电话 | 字符串 | 是   |     |

\#### 输出信息

无。

\#### 数据库设计

参照输入信息。

\### 实验室测试数据采集

\#### 功能描述

实验室测试数据信息采集功能通过统一的录入规范和数据校验规则，确保试验信息的完整性和准确性，提供数据录入、数据查询功能。

\#### 使用对象

种子企业人员

\#### 业务逻辑

种子企业人员新增数据，录入样本数据、发芽率信息，系统提供数据校验，校验不通过则提示具体错误；

\#### 原型设计

\- 数据采集列表页面：​

顶部为查询区，包括品种、查询时间起止；

\- 试验主数据采集新增/查看页面：​

包括实验室测试数据信息、操作人信息。

\#### 输入信息

| **输入项** | **类型** | **必填** | **验证规则** |

| --- | --- | --- | --- |

| DataID | 字符串 | 是   |     |

| SampleID | 字符串 | 是   |     |

| 样本状态 | 字符串 | 是   |     |

| 发芽率 | float | 是   |     |

| PurityPercent | float | 是   |     |

| MoistureContentPercent | float | 是   |     |

| 蛋白质百分比 | float | 是   |     |

| ToxinLevelPPM | float | 否   |     |

| 种子健康发现 | 字符串 | 是   |     |

| 链路责任 | 字符串 | 是   |     |

| LabReportFile | 文件  | 否   |     |

\#### 输出信息

无。

\#### 数据库设计

参照输入信息。

\### 产量数据采集

\#### 功能描述

产量数据信息采集功能通过统一的录入规范和数据校验规则，确保试验信息的完整性和准确性，提供数据录入、数据查询功能。

\#### 使用对象

种子企业人员

\#### 业务逻辑

种子企业人员新增数据，录入面积、产量信息，系统提供数据校验，校验不通过则提示具体错误；

\#### 原型设计

\- 数据采集列表页面：​

顶部为查询区，包括品种、查询时间起止；

\- 数据采集新增/查看页面：​

包括产量数据信息、操作人信息。

\#### 输入信息

| **输入项** | **类型** | **必填** | **验证规则** |

| --- | --- | --- | --- |

| 数据ID | Int | 是   |     |

| PlotID | 字符串 | 是   |     |

| PlotAreaM2 | float | 是   |     |

| GrainWeightKG | float | 是   |     |

| YieldQTPerHa | float | 是   |     |

| 含水量 | float | 是   |     |

\#### 输出信息

无。

\#### 数据库设计

参照输入信息。

\### IOT传感器数据采集

\#### 功能描述

IOT传感器数据信息采集功能通过统一的接口API进行数据上报采集。

\#### 使用对象

种子企业人员

\#### 业务逻辑

系统提供数据接入接口，；

\#### 原型设计

\- 数据采集列表页面：​

顶部为查询区，包括品种、地块、查询时间起止；

\- 数据采集新增/查看页面：​

包括传感器数据信息、操作人信息。

\#### 输入信息

| **输入项** | **类型** | **必填** | **验证规则** |

| --- | --- | --- | --- |

| 数据ID | Int | 是   |     |

| SensorID | 字符串 |     |     |

| SensorType | 枚举 (字符串) |     |     |

| Manufacturer | 字符串 |     |     |

| 校准日期 | 日期  |     |     |

| FirmwareVersion | 字符串 |     |     |

| BatteryStatusPercent | float | 否   |     |

\#### 输出信息

无。

\#### 数据库设计

参照输入信息。

\## 种子信息服务

\### 种子推广信息管理

\#### 功能描述

向农户、合作社、推广人员和田间代理人及时提供本地化的研究成果、品种发布更新、农业建议和推广内容。

\#### 使用对象

种子企业人员

\#### 业务逻辑

种子企业人员上传新品种宣传视频，通过分享链接发送给农户、合作社、推广人员和田间代理人，供他们观看最新研究成果。

\#### 原型设计

推广内容管理页面：​

展示推广内容列表，包含内容ID、标题、视频文件，用户可直接上次新文件，并进行分享，生成分享链接。

\#### 输入信息

基础关联信息：企业 ID、推广内容 ID

推广信息：标题、宣传视频（MP4）、推广摘要、推荐品种、发布时间、有效期

\#### 输出信息

推广内容记录

生成的分享链接

推广内容访问统计数据

\#### 数据库设计

| **字段名称** | **数据类型** | **是否为空** | **描述** | **备注** |

| --- | --- | --- | --- | --- |

| promotion_id | VARCHAR(32) | NOT NULL | 推广信息唯一标识 | 主键，系统生成 |

| enterprise_id | VARCHAR(32) | NOT NULL | 关联企业唯一标识 | 外键关联 enterprise_info.enterprise_id |

| title | VARCHAR(100) | NOT NULL | 推广标题 |     |

| video_url | VARCHAR(255) | NOT NULL | 宣传视频存储路径 | 支持 MP4 格式 |

| promotion_summary | VARCHAR(1000) | NULL | 推广摘要 |     |

| recommended_varieties | VARCHAR(255) | NOT NULL | 推荐品种 | 多个品种用逗号分隔 |

| publish_time | DATETIME | NOT NULL | 发布时间 | 默认当前时间 |

| valid_period | INT(3) | NOT NULL | 有效期（天） |     |

| share_link | VARCHAR(255) | NOT NULL | 分享链接 | 系统生成，唯一 |

| visit_count | INT(10) | NOT NULL | 访问次数 | 默认 0 |

\### 种子信息公示

\#### 功能描述

将已发布的种子品种信息录入品种登记数据库，并通过平台向社会公示，实现品种信息可查询。

\#### 使用对象

公众人员

\#### 业务逻辑

品种发布完成后，公众可查询品种信息。

\#### 原型设计

品种公示页面：​

查询区：支持按品种名称、年度、作物类型搜索。

结果展示区：列表显示品种名称、种类、企业、登记号，点击可查看详情；

详情页：包含品种基础信息、照片。

\#### 输入信息

查询条件：品种名称、年度、作物类型

关联数据：已发布的品种信息

\#### 输出信息

品种公示列表数据

品种详情查询结果

公众查询记录

\#### 数据库设计

| **字段名称** | **数据类型** | **是否为空** | **描述** | **备注** |

| --- | --- | --- | --- | --- |

| query_id | VARCHAR(32) | NOT NULL | 查询记录唯一标识 | 主键，系统生成 |

| query_keyword | VARCHAR(100) | NOT NULL | 查询关键词 | 品种名称 / 年度 / 作物类型 |

| query_time | DATETIME | NOT NULL | 查询时间 | 默认当前时间 |

| ip_address | VARCHAR(50) | NULL | 访问 IP 地址 |     |

| query_result_count | INT(5) | NOT NULL | 查询结果数量 | 默认 0 |

| viewed_publish_id | VARCHAR(32) | NULL | 查看的发布 ID | 外键关联 variety_publish.publish_id |
| ----------------- | ----------- | ---- | -------- | ------------------------------- |
|                   |             |      |          |                                 |