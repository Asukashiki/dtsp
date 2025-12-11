# 农资需求汇总系统实现文档

## 1. 系统概述

本文档描述了农资需求汇总系统的完整实现，该系统支持多级数据汇聚和统计功能，用于管理从农户级别到地区级别的农资需求数据。

### 1.1 业务场景

系统实现了三级农资需求数据汇聚架构：

1. **农户级别** → **Kebele（村）级别汇总**
2. **Kebele级别** → **Woreda/Zone（镇/市）级别汇总**
3. **主记录追踪** → **demand_input_summary 主汇总记录**

### 1.2 核心表结构

| 表名 | 用途 | 数据级别 |
|------|------|----------|
| `demand_farmer_input_item` | 农户投入品需求明细 | 农户级原始数据 |
| `demand_input_summary_item` | 农资需求汇总明细 | 汇聚后的统计数据（按类别+类型） |
| `demand_input_summary` | 农资需求汇总主表 | 高层汇总记录追踪 |

---

## 2. 数据库设计

### 2.1 demand_input_summary_item（农资需求汇总明细表）

```sql
CREATE TABLE `demand_input_summary_item` (
  `id` varchar(64) NOT NULL COMMENT '主键ID',
  `input_category` varchar(128) DEFAULT NULL COMMENT '投入品类别',
  `input_type` varchar(128) DEFAULT NULL COMMENT '投入品类型',
  `total_quantity` decimal(10,2) DEFAULT NULL COMMENT '总数量',
  `total_count` int(11) DEFAULT NULL COMMENT '总计数',
  `source_code` varchar(128) DEFAULT NULL COMMENT '来源编码',
  `source_name` varchar(255) DEFAULT NULL COMMENT '来源名称',
  `target_code` varchar(128) DEFAULT NULL COMMENT '目标编码',
  `target_name` varchar(255) DEFAULT NULL COMMENT '目标名称',
  `status` varchar(16) DEFAULT NULL COMMENT '状态 (0:待审核, 1:已通过, 2:拒绝)',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `creator` varchar(128) DEFAULT NULL COMMENT '创建人',
  `year` varchar(8) DEFAULT NULL COMMENT '年份',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='农资需求汇总明细表';
```

**字段说明：**
- `input_category`: 投入品类别（如：种子、化肥、农药等）
- `input_type`: 投入品类型（如：玉米种子、尿素等）
- `total_quantity`: 该类型投入品的汇总数量
- `total_count`: 该类型投入品的汇总记录数
- `source_code`/`source_name`: 数据来源组织（如：某个Kebele）
- `target_code`/`target_name`: 数据目标组织（如：上级Woreda）
- `status`: 审核状态（0=待审核，1=已通过，2=拒绝）

### 2.2 demand_input_summary（农资需求汇总主表）

```sql
CREATE TABLE `demand_input_summary` (
  `id` varchar(64) NOT NULL COMMENT '主键ID',
  `source_code` varchar(128) DEFAULT NULL COMMENT '来源编码',
  `source_name` varchar(255) DEFAULT NULL COMMENT '来源名称',
  `target_code` varchar(128) DEFAULT NULL COMMENT '目标编码',
  `target_name` varchar(255) DEFAULT NULL COMMENT '目标名称',
  `status` varchar(16) DEFAULT NULL COMMENT '状态',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `creator` varchar(128) DEFAULT NULL COMMENT '创建人',
  `year` varchar(8) DEFAULT NULL COMMENT '年份',
  `sub_quantity` int(11) DEFAULT NULL COMMENT '子项数量',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='农资需求汇总主表';
```

**字段说明：**
- 该表用于追踪高层级的汇总记录
- `sub_quantity`: 该汇总包含的子项数量
- 其他字段与明细表类似，但不包含具体的投入品类别和类型信息

---

## 3. 代码架构

### 3.1 模块位置

所有代码位于 `igdp-agriculture-input` 模块下：

```
igdp-agriculture-input/
└── src/main/java/com/inspur/agriculture/input/
    ├── controller/demand/          # 控制器层
    │   ├── DemandInputSummaryController.java
    │   ├── DemandInputSummaryItemController.java
    │   └── FarmerDemandController.java
    ├── domain/demand/              # 实体层
    │   ├── DemandInputSummary.java
    │   ├── DemandInputSummaryItem.java
    │   └── DemandFarmerInputItem.java
    ├── dto/demand/                 # 数据传输对象
    │   ├── DemandInputSummaryDTO.java
    │   ├── DemandInputSummaryItemDTO.java
    │   ├── DemandInputSummaryQueryDTO.java
    │   ├── DemandInputSummaryItemQueryDTO.java
    │   └── DemandOrganDTO.java
    ├── vo/demand/                  # 视图对象
    │   ├── DemandInputSummaryVO.java
    │   ├── DemandInputSummaryItemVO.java
    │   ├── FarmerInputAggregationVO.java
    │   └── InputAggregationSummaryVO.java
    ├── mapper/demand/              # 数据访问层
    │   ├── DemandInputSummaryMapper.java
    │   ├── DemandInputSummaryItemMapper.java
    │   └── DemandFarmerInputItemMapper.java
    └── service/demand/             # 服务层
        ├── IDemandInputSummaryService.java
        ├── IDemandInputSummaryItemService.java
        ├── IFarmerDemandService.java
        └── impl/
            ├── DemandInputSummaryServiceImpl.java
            ├── DemandInputSummaryItemServiceImpl.java
            └── FarmerDemandServiceImpl.java

└── src/main/resources/mapper/agriculture/demand/
    ├── DemandInputSummaryMapper.xml
    └── DemandInputSummaryItemMapper.xml
```

### 3.2 分层职责

| 层次 | 职责 | 示例 |
|------|------|------|
| **Controller** | 处理HTTP请求，参数验证，响应封装 | DemandInputSummaryController |
| **Service** | 业务逻辑，事务管理 | DemandInputSummaryServiceImpl |
| **Mapper** | 数据访问，SQL执行 | DemandInputSummaryMapper |
| **Domain** | 数据库表实体映射 | DemandInputSummary |
| **DTO** | 接收前端请求参数 | DemandInputSummaryDTO |
| **VO** | 返回给前端的视图数据 | DemandInputSummaryVO |

---

## 4. 核心功能实现

### 4.1 农资需求汇总主表功能

#### 4.1.1 分页查询列表

**接口：** `GET /demand/input/summary/main/list`

**请求参数：**
```json
{
  "sourceCode": "KB001",
  "sourceName": "某村",
  "targetCode": "WD001",
  "targetName": "某镇",
  "status": "0",
  "year": "2025",
  "page": 1,
  "pageSize": 10
}
```

**响应示例：**
```json
{
  "code": 200,
  "msg": "操作成功",
  "data": {
    "list": [
      {
        "id": "1234567890",
        "sourceCode": "KB001",
        "sourceName": "某村",
        "targetCode": "WD001",
        "targetName": "某镇",
        "status": "0",
        "statusDesc": "待审核",
        "createTime": "2025-12-10 10:30:00",
        "creator": "admin",
        "year": "2025",
        "subQuantity": 15
      }
    ],
    "total": 100,
    "page": 1,
    "pageSize": 10
  }
}
```

**核心代码：** [DemandInputSummaryController.java:34-55](igdp-agriculture-input/src/main/java/com/inspur/agriculture/input/controller/demand/DemandInputSummaryController.java#L34-L55)

```java
@GetMapping("/list")
public AjaxResult list(
        DemandInputSummaryQueryDTO queryDTO,
        @RequestParam(defaultValue = "1") Integer page,
        @RequestParam(defaultValue = "10") Integer pageSize
) {
    try {
        PageHelper.startPage(page, pageSize);
        List<DemandInputSummaryVO> list = demandInputSummaryService.getDemandInputSummaryList(queryDTO);
        PageInfo<DemandInputSummaryVO> pageInfo = new PageInfo<>(list);

        Map<String, Object> result = new HashMap<>();
        result.put("list", pageInfo.getList());
        result.put("total", pageInfo.getTotal());
        result.put("page", pageInfo.getPageNum());
        result.put("pageSize", pageInfo.getPageSize());

        return AjaxResult.success(result);
    } catch (Exception e) {
        return AjaxResult.error(e.getMessage());
    }
}
```

#### 4.1.2 查询详情

**接口：** `GET /demand/input/summary/main/{id}`

**响应示例：**
```json
{
  "code": 200,
  "msg": "操作成功",
  "data": {
    "id": "1234567890",
    "sourceCode": "KB001",
    "sourceName": "某村",
    "targetCode": "WD001",
    "targetName": "某镇",
    "status": "1",
    "statusDesc": "已通过",
    "createTime": "2025-12-10 10:30:00",
    "creator": "admin",
    "year": "2025",
    "subQuantity": 15
  }
}
```

**核心代码：** [DemandInputSummaryController.java:60-71](igdp-agriculture-input/src/main/java/com/inspur/agriculture/input/controller/demand/DemandInputSummaryController.java#L60-L71)

#### 4.1.3 添加记录

**接口：** `POST /demand/input/summary/main`

**请求体：**
```json
{
  "sourceCode": "KB001",
  "sourceName": "某村",
  "targetCode": "WD001",
  "targetName": "某镇",
  "status": "0",
  "creator": "admin",
  "year": "2025",
  "subQuantity": 15
}
```

**业务逻辑：** [DemandInputSummaryServiceImpl.java:43-61](igdp-agriculture-input/src/main/java/com/inspur/agriculture/input/service/demand/impl/DemandInputSummaryServiceImpl.java#L43-L61)

```java
@Transactional(rollbackFor = Exception.class)
@Override
public int addDemandInputSummary(DemandInputSummaryDTO dto) {
    DemandInputSummary summary = new DemandInputSummary();
    BeanUtils.copyProperties(dto, summary);

    // 设置默认值
    if (summary.getStatus() == null || summary.getStatus().isEmpty()) {
        summary.setStatus("0"); // 默认待审核
    }
    summary.setCreateTime(DateUtils.getNowDate());

    // 如果没有设置年份，使用当前年份
    if (summary.getYear() == null || summary.getYear().isEmpty()) {
        summary.setYear(String.valueOf(java.time.Year.now().getValue()));
    }

    return demandInputSummaryMapper.insert(summary);
}
```

#### 4.1.4 更新记录

**接口：** `POST /demand/input/summary/main/update`

**请求体：**
```json
{
  "id": "1234567890",
  "status": "1",
  "subQuantity": 20
}
```

**业务逻辑：** [DemandInputSummaryServiceImpl.java:65-81](igdp-agriculture-input/src/main/java/com/inspur/agriculture/input/service/demand/impl/DemandInputSummaryServiceImpl.java#L65-L81)

---

### 4.2 农资需求汇总明细表功能

#### 4.2.1 一次汇聚（农户 → Kebele）

**接口：** `POST /seed/demand/farmer/input/aggregation`

**功能说明：**
- 从 `demand_farmer_input_item` 表中查询指定Kebele的农户投入品数据
- 按 `input_category` 和 `input_type` 分组统计
- 将汇总结果插入 `demand_input_summary_item` 表

**SQL逻辑：** [DemandFarmerInputItemMapper.java](igdp-agriculture-input/src/main/java/com/inspur/agriculture/input/mapper/demand/DemandFarmerInputItemMapper.java)

```sql
SELECT
    i.input_category AS inputCategory,
    i.input_type AS inputType,
    COUNT(*) AS totalCount,
    SUM(i.quantity) AS totalQuantity
FROM demand_farmer_input_item i, demand_farmer_detail d
WHERE i.demand_id = d.id
    AND d.kebele = ?
    AND d.status = '2'  -- 只统计已审核通过的
    AND i.is_deleted = 0
GROUP BY i.input_category, i.input_type
```

**请求示例：**
```json
{
  "sourceCode": "KB001",
  "sourceName": "某村",
  "targetCode": "WD001",
  "targetName": "某镇"
}
```

**响应示例：**
```json
{
  "code": 200,
  "msg": "汇聚成功，共汇聚15条记录",
  "data": 15
}
```

**服务实现：** [FarmerDemandServiceImpl.java](igdp-agriculture-input/src/main/java/com/inspur/agriculture/input/service/demand/impl/FarmerDemandServiceImpl.java)

```java
@Override
public int getInputAggregation(DemandOrganDTO demandOrganDTO) {
    String sourceCode = demandOrganDTO.getSourceCode();
    List<FarmerInputAggregationVO> demands = inputItemMapper.getInputAggregation(sourceCode);

    int count = 0;
    for(FarmerInputAggregationVO d : demands){
        DemandInputSummaryItemDTO dto = new DemandInputSummaryItemDTO();
        dto.setSourceCode(sourceCode);
        dto.setSourceName(demandOrganDTO.getSourceName());
        dto.setTargetCode(demandOrganDTO.getTargetCode());
        dto.setTargetName(demandOrganDTO.getTargetName());
        dto.setInputCategory(d.getInputCategory());
        dto.setInputType(d.getInputType());
        dto.setTotalQuantity(d.getTotalQuantity());
        dto.setTotalCount(d.getTotalCount());
        dto.setStatus("0"); // 待审核

        int tempCount = demandInputSummaryItemService.addDemandInputSummaryItem(dto);
        count += tempCount;
    }
    return count;
}
```

#### 4.2.2 二次汇聚（Kebele → Woreda/Zone）

**接口：** `POST /demand/input/summary/aggregate`

**功能说明：**
- 从 `demand_input_summary_item` 表中查询指定来源的汇总数据
- 按 `input_category` 和 `input_type` 再次分组统计
- 将二次汇总结果插入 `demand_input_summary_item` 表（上一级组织）

**SQL逻辑：** [DemandInputSummaryItemMapper.xml](igdp-agriculture-input/src/main/resources/mapper/agriculture/demand/DemandInputSummaryItemMapper.xml)

```xml
<select id="getInputAggregation" resultType="com.inspur.agriculture.input.vo.demand.InputAggregationSummaryVO">
    SELECT
        input_category AS inputCategory,
        input_type AS inputType,
        COUNT(*) AS totalCount,
        SUM(total_quantity) AS totalQuantity
    FROM demand_input_summary_item
    WHERE
        <if test="query.sourceCode != null and query.sourceCode != ''">
            source_code = #{query.sourceCode}
        </if>
        <if test="query.targetCode != null and query.targetCode != ''">
            AND target_code = #{query.targetCode}
        </if>
        AND status = '0'
    GROUP BY input_category, input_type
</select>
```

**请求示例：**
```json
{
  "sourceCode": "WD001",
  "sourceName": "某镇",
  "targetCode": "ZN001",
  "targetName": "某市",
  "nextRegionCode": "RG001",
  "nextRegionName": "某区"
}
```

**服务实现：** [DemandInputSummaryItemServiceImpl.java](igdp-agriculture-input/src/main/java/com/inspur/agriculture/input/service/demand/impl/DemandInputSummaryItemServiceImpl.java)

```java
@Override
public int getInputAggregation(DemandOrganDTO demandOrganDTO) {
    List<InputAggregationSummaryVO> aggregationList =
        demandInputSummaryItemMapper.getInputAggregation(demandOrganDTO);

    int count = 0;
    for (InputAggregationSummaryVO aggregation : aggregationList){
        DemandInputSummaryItem item = new DemandInputSummaryItem();
        item.setSourceCode(demandOrganDTO.getTargetCode());
        item.setSourceName(demandOrganDTO.getTargetName());
        item.setTargetCode(demandOrganDTO.getNextRegionCode());
        item.setTargetName(demandOrganDTO.getNextRegionName());
        item.setInputCategory(aggregation.getInputCategory());
        item.setInputType(aggregation.getInputType());
        item.setTotalQuantity(aggregation.getTotalQuantity());
        item.setTotalCount(aggregation.getTotalCount());
        item.setStatus("0");
        item.setCreateTime(DateUtils.getNowDate());
        item.setYear(String.valueOf(java.time.Year.now().getValue()));

        int tempCount = demandInputSummaryItemMapper.insert(item);
        count += tempCount;
    }
    return count;
}
```

---

## 5. 数据流转图

```
农户投入品需求 (demand_farmer_input_item)
    │
    │ [一次汇聚] POST /seed/demand/farmer/input/aggregation
    │ 按Kebele分组统计 (input_category, input_type)
    ↓
Kebele级汇总 (demand_input_summary_item)
    │ source_code = KB001, target_code = WD001
    │
    │ [二次汇聚] POST /demand/input/summary/aggregate
    │ 按Woreda分组统计 (input_category, input_type)
    ↓
Woreda级汇总 (demand_input_summary_item)
    │ source_code = WD001, target_code = ZN001
    │
    │ [三次汇聚] POST /demand/input/summary/aggregate
    │ 按Zone分组统计 (input_category, input_type)
    ↓
Zone级汇总 (demand_input_summary_item)
    │ source_code = ZN001, target_code = RG001
    │
    └─→ 主记录追踪 (demand_input_summary)
        记录高层汇总状态和子项数量
```

---

## 6. 关键技术点

### 6.1 MyBatis Plus集成

**Entity配置：**
```java
@Data
@TableName("demand_input_summary")
public class DemandInputSummary implements Serializable {
    @TableId(type = IdType.ASSIGN_ID)  // 雪花算法生成ID
    private String id;
    // ...
}
```

**Mapper继承：**
```java
public interface DemandInputSummaryMapper extends BaseMapper<DemandInputSummary> {
    // 继承BaseMapper获得基本CRUD方法
    List<DemandInputSummaryVO> selectDemandInputSummaryList(DemandInputSummaryQueryDTO queryDTO);
}
```

### 6.2 分页查询

使用 **PageHelper** 实现分页：

```java
PageHelper.startPage(page, pageSize);
List<DemandInputSummaryVO> list = demandInputSummaryService.getDemandInputSummaryList(queryDTO);
PageInfo<DemandInputSummaryVO> pageInfo = new PageInfo<>(list);
```

### 6.3 事务管理

所有写操作使用 `@Transactional` 注解：

```java
@Transactional(rollbackFor = Exception.class)
@Override
public int addDemandInputSummary(DemandInputSummaryDTO dto) {
    // 业务逻辑
    return demandInputSummaryMapper.insert(summary);
}
```

### 6.4 参数验证

使用 JSR-303 验证：

```java
@Data
public class DemandInputSummaryDTO {
    @NotBlank(message = "来源编码不能为空")
    private String sourceCode;
    // ...
}

// Controller中启用验证
@PostMapping()
public AjaxResult add(@Validated @RequestBody DemandInputSummaryDTO dto) {
    // ...
}
```

### 6.5 动态SQL查询

使用 MyBatis XML 实现条件查询：

```xml
<select id="selectDemandInputSummaryList" resultMap="DemandInputSummaryVOResult">
    select d.id, d.source_code, d.source_name, d.target_code, d.target_name,
           d.status, d.create_time, d.creator, d.year, d.sub_quantity
    from demand_input_summary d
    where 1=1
    <if test="query.sourceCode != null and query.sourceCode != ''">
        and d.source_code = #{query.sourceCode}
    </if>
    <if test="query.targetCode != null and query.targetCode != ''">
        and d.target_code = #{query.targetCode}
    </if>
    <if test="query.status != null and query.status != ''">
        and d.status = #{query.status}
    </if>
    <if test="query.year != null and query.year != ''">
        and d.year = #{query.year}
    </if>
    order by d.create_time desc
</select>
```

---

## 7. API完整清单

### 7.1 农资需求汇总主表接口

| 序号 | 接口路径 | 方法 | 功能说明 |
|------|---------|------|----------|
| 1 | `/demand/input/summary/main/list` | GET | 分页查询汇总主表列表 |
| 2 | `/demand/input/summary/main/{id}` | GET | 查询汇总主表详情 |
| 3 | `/demand/input/summary/main` | POST | 添加汇总主表记录 |
| 4 | `/demand/input/summary/main/update` | POST | 更新汇总主表记录 |

### 7.2 农资需求汇总明细表接口

| 序号 | 接口路径 | 方法 | 功能说明 |
|------|---------|------|----------|
| 1 | `/demand/input/summary/list` | GET | 分页查询汇总明细列表 |
| 2 | `/demand/input/summary/{id}` | GET | 查询汇总明细详情 |
| 3 | `/demand/input/summary` | POST | 添加汇总明细记录 |
| 4 | `/demand/input/summary/update` | POST | 更新汇总明细记录 |
| 5 | `/demand/input/summary/aggregate` | POST | 二次汇聚（Kebele→Woreda/Zone） |
| 6 | `/demand/input/summary/delete/{id}` | POST | 删除单条汇总明细 |
| 7 | `/demand/input/summary/batch/delete` | POST | 批量删除汇总明细 |

### 7.3 农户需求汇聚接口

| 序号 | 接口路径 | 方法 | 功能说明 |
|------|---------|------|----------|
| 1 | `/seed/demand/farmer/input/aggregation` | POST | 一次汇聚（农户→Kebele） |

---

## 8. 状态码说明

### 8.1 审核状态 (status)

| 值 | 说明 | 业务含义 |
|----|------|----------|
| 0 | 待审核 | 数据已汇聚，等待上级审核 |
| 1 | 已通过 | 审核通过，数据有效 |
| 2 | 拒绝 | 审核拒绝，数据无效 |

### 8.2 HTTP响应码

| 状态码 | 说明 |
|--------|------|
| 200 | 请求成功 |
| 400 | 请求参数错误 |
| 500 | 服务器内部错误 |

---

## 9. 使用示例

### 9.1 完整汇聚流程

**步骤1：农户投入品汇聚到Kebele**

```bash
POST /seed/demand/farmer/input/aggregation
Content-Type: application/json

{
  "sourceCode": "KB001",
  "sourceName": "某村",
  "targetCode": "WD001",
  "targetName": "某镇"
}
```

**步骤2：Kebele汇聚到Woreda**

```bash
POST /demand/input/summary/aggregate
Content-Type: application/json

{
  "sourceCode": "WD001",
  "sourceName": "某镇",
  "targetCode": "ZN001",
  "targetName": "某市",
  "nextRegionCode": "RG001",
  "nextRegionName": "某区"
}
```

**步骤3：记录主汇总**

```bash
POST /demand/input/summary/main
Content-Type: application/json

{
  "sourceCode": "KB001",
  "sourceName": "某村",
  "targetCode": "WD001",
  "targetName": "某镇",
  "status": "0",
  "creator": "admin",
  "year": "2025",
  "subQuantity": 15
}
```

### 9.2 查询汇总数据

```bash
GET /demand/input/summary/main/list?sourceCode=KB001&status=0&page=1&pageSize=10
```

### 9.3 审核通过汇总

```bash
POST /demand/input/summary/main/update
Content-Type: application/json

{
  "id": "1234567890",
  "status": "1"
}
```

---

## 10. 注意事项

### 10.1 数据一致性

- 所有汇聚操作使用 `@Transactional` 保证事务一致性
- 汇聚失败时自动回滚，不会产生脏数据

### 10.2 审核流程

- 汇聚后的数据默认状态为 "0"（待审核）
- 只有审核通过（status="1"）的数据才能参与下一级汇聚
- 农户级数据要求 status="2" 才能被汇聚

### 10.3 年份管理

- 如果不指定年份，系统自动使用当前年份
- 建议在汇聚时明确指定年份，便于历史数据查询

### 10.4 性能优化

- 大批量汇聚建议分批处理
- 使用索引优化查询性能（source_code, target_code, status, year）

### 10.5 数据安全

- 删除操作需要谨慎，建议使用逻辑删除
- 关键操作记录操作日志

---

## 11. 常见问题

### Q1: 汇聚时提示"找不到数据"？
**A:** 检查来源数据的状态码，确保符合汇聚条件（农户级需要status="2"，汇总级需要status="0"或"1"）

### Q2: 分页查询返回数据为空？
**A:** 检查查询条件是否过于严格，特别是status和year字段

### Q3: 二次汇聚统计数量不正确？
**A:** 确保source_code和target_code正确对应组织层级关系

### Q4: 如何查看某个Kebele的汇总明细？
**A:** 使用 `/demand/input/summary/list?sourceCode=KB001` 查询

### Q5: 如何追踪汇聚历史？
**A:** 通过 `create_time` 和 `creator` 字段可以追踪汇聚记录的创建时间和创建人

---

## 12. 版本历史

| 版本 | 日期 | 说明 |
|------|------|------|
| v1.0 | 2025-12-10 | 初始版本，实现基础CRUD和汇聚功能 |

---

## 13. 联系方式

如有问题或建议，请联系开发团队。

---

**文档生成时间：** 2025-12-10
**系统版本：** IGDP v1.3.0
