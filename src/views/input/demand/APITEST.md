接口详情
1. 分页查询列表
请求方式: GET
请求路径: /demand/input/summary/main/list
请求参数:
page: 页码（默认1）
pageSize: 每页大小（默认10）
查询条件（通过 DemandInputSummaryQueryDTO）:
sourceCode: 来源编码
sourceName: 来源名称（模糊查询）
targetCode: 目标编码
targetName: 目标名称（模糊查询）
status: 状态
year: 年份
creator: 创建人
keyword: 关键字搜索
startTime: 开始时间
endTime: 结束时间
响应示例:
{
  "code": 200,
  "msg": "操作成功",
  "data": {
    "list": [
      {
        "id": "1234567890",
        "sourceCode": "KB001",
        "sourceName": "Kebele A",
        "targetCode": "WR001",
        "targetName": "Woreda B",
        "status": "0",
        "statusDesc": "待审核",
        "createTime": "2025-12-10 10:00:00",
        "creator": "admin",
        "year": "2025",
        "subQuantity": 10
      }
    ],
    "total": 100,
    "page": 1,
    "pageSize": 10
  }
}
2. 查询详情
请求方式: GET
请求路径: /demand/input/summary/main/{id}
路径参数:
id: 主键ID
响应示例:
{
  "code": 200,
  "msg": "操作成功",
  "data": {
    "id": "1234567890",
    "sourceCode": "KB001",
    "sourceName": "Kebele A",
    "targetCode": "WR001",
    "targetName": "Woreda B",
    "status": "0",
    "statusDesc": "待审核",
    "createTime": "2025-12-10 10:00:00",
    "creator": "admin",
    "year": "2025",
    "subQuantity": 10
  }
}
3. 添加记录
请求方式: POST
请求路径: /demand/input/summary/main
请求体:
{
  "sourceCode": "KB001",
  "sourceName": "Kebele A",
  "targetCode": "WR001",
  "targetName": "Woreda B",
  "status": "0",
  "creator": "admin",
  "year": "2025",
  "subQuantity": 10
}
响应示例:
{
  "code": 200,
  "msg": "添加成功"
}
校验规则:
sourceCode: 必填
4. 更新记录
请求方式: POST
请求路径: /demand/input/summary/main/update
请求体:
{
  "id": "1234567890",
  "sourceCode": "KB001",
  "sourceName": "Kebele A",
  "targetCode": "WR001",
  "targetName": "Woreda B",
  "status": "1",
  "creator": "admin",
  "year": "2025",
  "subQuantity": 15
}
响应示例:
{
  "code": 200,
  "msg": "更新成功"
}
字段说明
根据系统提示，新增了 subQuantity 字段（子汇聚数量），该字段已包含在：
✅ Domain 实体类 DemandInputSummary
✅ DTO 类 DemandInputSummaryDTO
✅ VO 类 DemandInputSummaryVO
状态枚举
0 - 待审核
1 - 已通过
2 - 已拒绝
特性
分页支持: 使用 PageHelper 实现分页
多条件查询: 支持精确查询、模糊查询、时间范围查询
数据校验: 使用 @Validated 注解进行参数校验
异常处理: 统一捕获并返回错误信息
事务支持: Service 层已配置事务管理
所有接口已完成，可以直接使用！