# 繁殖模块关联关系配置

## 一、表关联关系图

```
┌─────────────────────────────────┐
│     breeding_batch_info         │
│       (繁殖批次信息表)            │
│                                 │
│  PK: id                         │
│  BK: batch_id (业务主键)         │
└──────────────┬──────────────────┘
               │
               │ 1:N (一对多)
               │ 关联字段: batch_id
               ▼
┌─────────────────────────────────┐
│    breeding_tracking_info       │
│      (繁殖跟踪信息表)             │
│                                 │
│  PK: id                         │
│  BK: tracking_id (业务主键)      │
│  FK: batch_id                   │
└──────────────┬──────────────────┘
               │
               │ 1:N (一对多)
               │ 关联字段: tracking_id
               ▼
┌─────────────────────────────────┐
│      breeding_test_info         │
│       (繁殖检测信息表)            │
│                                 │
│  PK: id                         │
│  BK: test_id (业务主键)          │
│  FK: tracking_id                │
│  FK: batch_id (冗余外键)         │
└─────────────────────────────────┘
```

---

## 二、关联关系配置（JSON格式）

```json
{
  "moduleName": "breeding",
  "moduleTitle": "繁殖信息管理",
  "tables": [
    {
      "tableName": "breeding_batch_info",
      "tableTitle": "繁殖批次信息",
      "entityName": "BreedingBatch",
      "primaryKey": "id",
      "businessKey": "batch_id",
      "apiPrefix": "/seed/breeding/batch",
      "isMainTable": true
    },
    {
      "tableName": "breeding_tracking_info",
      "tableTitle": "繁殖跟踪信息",
      "entityName": "BreedingTracking",
      "primaryKey": "id",
      "businessKey": "tracking_id",
      "apiPrefix": "/seed/breeding/tracking",
      "isMainTable": false
    },
    {
      "tableName": "breeding_test_info",
      "tableTitle": "繁殖检测信息",
      "entityName": "BreedingTest",
      "primaryKey": "id",
      "businessKey": "test_id",
      "apiPrefix": "/seed/breeding/test",
      "isMainTable": false
    }
  ],
  "relations": [
    {
      "relationId": "REL_BATCH_TRACKING",
      "relationName": "批次-跟踪关联",
      "relationType": "ONE_TO_MANY",
      "masterTable": {
        "tableName": "breeding_batch_info",
        "entityName": "BreedingBatch",
        "joinField": "batch_id",
        "displayField": "batch_id"
      },
      "slaveTable": {
        "tableName": "breeding_tracking_info",
        "entityName": "BreedingTracking",
        "joinField": "batch_id",
        "displayField": "tracking_id"
      },
      "cascadeConfig": {
        "cascadeQuery": true,
        "cascadeDelete": false,
        "cascadeInsert": true
      },
      "uiConfig": {
        "showInMasterDetail": true,
        "showInSlaveList": true,
        "masterFieldLabel": "繁殖批次",
        "slaveFieldLabel": "跟踪记录"
      }
    },
    {
      "relationId": "REL_TRACKING_TEST",
      "relationName": "跟踪-检测关联",
      "relationType": "ONE_TO_MANY",
      "masterTable": {
        "tableName": "breeding_tracking_info",
        "entityName": "BreedingTracking",
        "joinField": "tracking_id",
        "displayField": "tracking_id"
      },
      "slaveTable": {
        "tableName": "breeding_test_info",
        "entityName": "BreedingTest",
        "joinField": "tracking_id",
        "displayField": "test_id"
      },
      "cascadeConfig": {
        "cascadeQuery": true,
        "cascadeDelete": false,
        "cascadeInsert": true
      },
      "uiConfig": {
        "showInMasterDetail": true,
        "showInSlaveList": true,
        "masterFieldLabel": "跟踪记录",
        "slaveFieldLabel": "检测记录"
      }
    },
    {
      "relationId": "REL_BATCH_TEST",
      "relationName": "批次-检测关联（冗余）",
      "relationType": "ONE_TO_MANY",
      "masterTable": {
        "tableName": "breeding_batch_info",
        "entityName": "BreedingBatch",
        "joinField": "batch_id",
        "displayField": "batch_id"
      },
      "slaveTable": {
        "tableName": "breeding_test_info",
        "entityName": "BreedingTest",
        "joinField": "batch_id",
        "displayField": "test_id"
      },
      "cascadeConfig": {
        "cascadeQuery": true,
        "cascadeDelete": false,
        "cascadeInsert": false
      },
      "uiConfig": {
        "showInMasterDetail": true,
        "showInSlaveList": false,
        "masterFieldLabel": "繁殖批次",
        "slaveFieldLabel": "检测记录"
      }
    }
  ]
}
```

---

## 三、详细关联关系定义

### 3.1 关联关系一：批次 → 跟踪（一对多）

| 配置项 | 值 |
|--------|-----|
| **关联ID** | REL_BATCH_TRACKING |
| **关联类型** | ONE_TO_MANY |
| **主表** | breeding_batch_info |
| **从表** | breeding_tracking_info |
| **主表关联字段** | batch_id |
| **从表关联字段** | batch_id |
| **关联描述** | 一个繁殖批次可以有多条跟踪记录 |

**前端场景：**
- 在批次详情页显示该批次下的所有跟踪记录列表
- 新增跟踪记录时，需选择关联的批次
- 批次列表页可展开显示子表跟踪记录

---

### 3.2 关联关系二：跟踪 → 检测（一对多）

| 配置项 | 值 |
|--------|-----|
| **关联ID** | REL_TRACKING_TEST |
| **关联类型** | ONE_TO_MANY |
| **主表** | breeding_tracking_info |
| **从表** | breeding_test_info |
| **主表关联字段** | tracking_id |
| **从表关联字段** | tracking_id |
| **关联描述** | 一条跟踪记录可以有多条检测记录 |

**前端场景：**
- 在跟踪详情页显示该跟踪下的所有检测记录
- 新增检测记录时，需选择关联的跟踪记录
- 可通过跟踪记录级联查询检测信息

---

### 3.3 关联关系三：批次 → 检测（一对多，冗余关联）

| 配置项 | 值 |
|--------|-----|
| **关联ID** | REL_BATCH_TEST |
| **关联类型** | ONE_TO_MANY |
| **主表** | breeding_batch_info |
| **从表** | breeding_test_info |
| **主表关联字段** | batch_id |
| **从表关联字段** | batch_id |
| **关联描述** | 一个繁殖批次可以直接关联多条检测记录（冗余字段便于查询） |

**前端场景：**
- 在批次详情页可直接查看该批次所有检测记录
- 用于快速统计批次下的检测合格率等

---



## 七、关联关系汇总表

| 关联ID | 主表 | 从表 | 关联类型 | 关联字段 | 用途说明 |
|--------|------|------|----------|----------|----------|
| REL_BATCH_TRACKING | breeding_batch_info | breeding_tracking_info | 一对多 | batch_id | 批次下的跟踪记录 |
| REL_TRACKING_TEST | breeding_tracking_info | breeding_test_info | 一对多 | tracking_id | 跟踪下的检测记录 |
| REL_BATCH_TEST | breeding_batch_info | breeding_test_info | 一对多 | batch_id | 批次下的检测记录(冗余) |

