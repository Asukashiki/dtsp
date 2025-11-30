# 数据库修复脚本执行指南

## 问题说明

之前的 `breeding_module_fix.sql` 脚本包含了对 `breeding_dataset` 表的修改,但该表在建表时就已经包含了冗余字段,导致执行报错:

```
[42S21][1060] Duplicate column name 'batch_name'
```

## 正确的修复方案

### 表结构现状

1. **breeding_dataset 表** - ✅ 已有冗余字段
   - 在 `breeding_dataset.sql` 建表时就包含了:
   - `batch_name VARCHAR(100)` (Line 9)
   - `crop_type VARCHAR(50)` (Line 10)
   - `variety_name VARCHAR(100)` (Line 11)

2. **breeding_license 表** - ❌ 缺少冗余字段
   - 需要添加以下字段:
   - `batch_name`
   - `dataset_code`
   - `crop_type`
   - `variety_name`

## 执行SQL脚本

### 方式1: 使用简单版本脚本(推荐)

执行文件: `breeding_license_add_columns.sql`

```bash
# 在MySQL中执行
mysql -u root -p agriculture_igdp_admin < E:/work/companyProject/igdp-service/igdp-seed/sql/breeding_license_add_columns.sql
```

或在数据库工具中直接执行:

```sql
-- 添加批次名称
ALTER TABLE breeding_license ADD COLUMN batch_name VARCHAR(100) COMMENT '批次名称' AFTER batch_id;

-- 添加数据集编号
ALTER TABLE breeding_license ADD COLUMN dataset_code VARCHAR(50) COMMENT '数据集编号' AFTER dataset_id;

-- 添加作物类型
ALTER TABLE breeding_license ADD COLUMN crop_type VARCHAR(50) COMMENT '作物类型' AFTER dataset_code;

-- 添加品种名称
ALTER TABLE breeding_license ADD COLUMN variety_name VARCHAR(100) COMMENT '品种名称' AFTER crop_type;
```

### 方式2: 使用安全检查版本

执行文件: `breeding_module_fix_v2.sql`

这个脚本会先检查字段是否存在,避免重复添加:

```bash
mysql -u root -p agriculture_igdp_admin < E:/work/companyProject/igdp-service/igdp-seed/sql/breeding_module_fix_v2.sql
```

## 验证结果

执行后,运行以下SQL验证字段是否添加成功:

```sql
-- 查看 breeding_license 表结构
DESCRIBE breeding_license;

-- 或者
SHOW COLUMNS FROM breeding_license;
```

应该看到以下字段:

| Field | Type | Null | Key | Default | Extra |
|-------|------|------|-----|---------|-------|
| id | varchar(36) | NO | PRI | NULL | |
| batch_id | varchar(36) | NO | UNI | NULL | |
| **batch_name** | **varchar(100)** | **YES** | | **NULL** | |
| dataset_id | varchar(36) | NO | MUL | NULL | |
| **dataset_code** | **varchar(50)** | **YES** | | **NULL** | |
| **crop_type** | **varchar(50)** | **YES** | | **NULL** | |
| **variety_name** | **varchar(100)** | **YES** | | **NULL** | |
| license_no | varchar(50) | NO | UNI | NULL | |
| ... | ... | ... | ... | ... | ... |

## 错误处理

### 如果字段已存在

如果执行简单版本脚本时遇到 "Duplicate column name" 错误,说明字段已经存在,可以忽略该错误,或者:

1. 使用安全检查版本脚本 (`breeding_module_fix_v2.sql`)
2. 或者手动检查哪些字段缺失,只添加缺失的字段

### 检查某个字段是否存在

```sql
SELECT COUNT(*) AS field_exists
FROM information_schema.COLUMNS
WHERE TABLE_SCHEMA = 'agriculture_igdp_admin'
  AND TABLE_NAME = 'breeding_license'
  AND COLUMN_NAME = 'batch_name';
```

返回 1 表示存在,返回 0 表示不存在。

## 可用的SQL脚本文件

1. ✅ **breeding_license_add_columns.sql** (推荐) - 简单版本,直接添加字段
2. ✅ **breeding_module_fix_v2.sql** - 安全版本,带字段存在性检查
3. ✅ **breeding_license_fix.sql** - 仅许可表,包含详细说明
4. ❌ **breeding_module_fix.sql** - 旧版本,不要使用(会报错)

## 完成后

执行SQL脚本后:

1. ✅ breeding_license 表结构完整
2. ✅ breeding_dataset 表结构完整(建表时已有)
3. ✅ 后端代码可以正常使用冗余字段
4. ✅ 前端需要在选择批次/数据集时填充这些冗余字段

## 数据迁移(可选)

如果表中已有数据,但冗余字段为空,可以执行以下SQL同步数据:

```sql
-- 注意: 这需要 breeding_batch 表存在
-- 如果没有 breeding_batch 表,跳过这一步,由前端在编辑时填充

-- 示例: 从批次表同步数据(如果批次表存在)
-- UPDATE breeding_license l
-- INNER JOIN breeding_batch b ON l.batch_id = b.id
-- SET l.batch_name = b.batch_name,
--     l.crop_type = b.crop_type,
--     l.variety_name = b.variety_name
-- WHERE l.batch_name IS NULL OR l.batch_name = '';
```

---

执行完成后,育种模块的数据库结构就完全准备好了!
