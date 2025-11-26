

### 2.1 处理企业审核

**接口描述**：审核人员对企业认证申请进行审核（通过/驳回）。

**接口地址**：`POST /seed/enterprise/audit/handle`

**权限标识**：`seed:enterprise:audit:handle`

**请求参数（审核通过）**：

```json
{
  "enterpriseId": "ENT1BEA2368CED04CF3",
  "auditResult": 1,
  "auditOpinion": "企业资质齐全，信息真实有效，符合认证要求，准予通过。",
  "auditor": "王审核",
  "auditStage": "Initial review"
}
```

**请求参数（审核驳回）**：

```json
{
  "enterpriseId": "ENT1BEA2368CED04CF3",
  "auditResult": 2,
  "auditOpinion": "营业执照复印件模糊不清，无法辨识企业名称和注册信息",
  "rejectReason": "营业执照复印件未加盖企业公章，且图片不清晰，需重新上传高清版本并加盖公章",
  "auditor": "王审核",
  "auditStage": "Initial review"
}
```

**请求参数说明**：

| 字段名          | 类型      | 必填   | 说明                                       |
| ------------ | ------- | ---- | ---------------------------------------- |
| enterpriseId | String  | 是    | 企业唯一标识                                   |
| auditResult  | Integer | 是    | 审核结果：1-通过/2-驳回                           |
| auditOpinion | String  | 否    | 审核意见                                     |
| rejectReason | String  | 否    | 驳回原因（驳回时必填）                              |
| auditor      | String  | 是    | 审核人                                      |
| auditStage   | String  | 是    | 审核阶段：Initial review/re-review/final review |

**成功响应**：

```json
{
  "code": 200,
  "msg": "审核完成",
  "data": {
    "enterpriseId": "ENT4B8E9F2A3C1D5E6F",
    "certificationStatus": 1,
    "auditTime": "2025-11-25 15:45:30"
  }
}
```

**错误响应**：

```json
{
  "code": 500,
  "msg": "驳回时必须填写驳回原因",
  "data": null
}
```

------

### 2.2 查询企业审核列表

**接口描述**：查询企业审核记录列表。

**接口地址**：`GET /seed/enterprise/audit/list`

**权限标识**：`seed:enterprise:audit:list`

**请求示例**：

```
GET /seed/enterprise/audit/list?enterpriseName=企业名称&certificationStatus=1
```

**成功响应**：

```json
{
  "code": 200,
  "msg": "查询成功",
  "data": {
    "total": 8,
    "list": [
      {
        "auditId": "AUD2F4E8B5C9A1D3E7F",
        "enterpriseId": "ENT4B8E9F2A3C1D5E6F",
        "auditResult": 1,
        "auditOpinion": "企业资质齐全，信息真实有效，符合认证要求，准予通过。",
        "rejectReason": null,
        "auditor": "王审核",
        "auditTime": "2025-11-25 15:45:30",
        "auditStage": "Initial review",
        "createTime": "2025-11-25 15:45:30"
      }
    ]
  }
}
```

------

### 

### 1.4文件上传接口

####  1.4.1单文件上传

- **接口地址**: `POST /doc/upload`

- **请求方式**: POST

- **请求类型**: multipart/form-data

- **请求参数**:

  | 参数名  | 类型            | 必填   | 说明    |
  | ---- | ------------- | ---- | ----- |
  | file | MultipartFile | 是    | 上传的文件 |

- **响应数据**:

  ```json
  {
    "code": 200,
    "msg": "操作成功",
    "data": {
      "id": "1234567890",
      "dataId": "abc123",
      "fileName": "renamed_file.jpg",
      "originalFileName": "original_file.jpg",
      "filePath": "/upload/2025/01/renamed_file.jpg",
      "fileType": "jpg",
      "serverType": "minio",
      "createTime": "2025-01-15T10:30:00"
    }
  }
  ```

- **响应说明**:

  - id: 文件记录唯一标识
  - dataId: 文件服务返回的数据ID
  - fileName: 重命名后的文件名称
  - originalFileName: 原始文件名称
  - filePath: 文件存储路径
  - fileType: 文件类型/扩展名
  - serverType: 文件服务类型(minio、fastDb等)

#### 1.4.2多文件上传

- **接口地址**: `POST /doc/uploads`

- **请求方式**: POST

- **请求类型**: multipart/form-data

- **请求参数**:

  | 参数名   | 类型              | 必填   | 说明      |
  | ----- | --------------- | ---- | ------- |
  | files | MultipartFile[] | 是    | 上传的文件数组 |

- **响应数据**:

  ```json
  {
    "code": 200,
    "msg": "操作成功",
    "data": [
      {
        "id": "1234567890",
        "dataId": "abc123",
        "fileName": "renamed_file1.jpg",
        "originalFileName": "original_file1.jpg",
        "filePath": "/upload/2025/01/renamed_file1.jpg",
        "fileType": "jpg",
        "serverType": "minio",
        "createTime": "2025-01-15T10:30:00"
      },
      {
        "id": "1234567891",
        "dataId": "abc124",
        "fileName": "renamed_file2.pdf",
        "originalFileName": "original_file2.pdf",
        "filePath": "/upload/2025/01/renamed_file2.pdf",
        "fileType": "pdf",
        "serverType": "minio",
        "createTime": "2025-01-15T10:30:05"
      }
    ]
  }
  ```

- **响应说明**: 返回上传成功的文件信息数组

- **异常响应**:

  ```json
  {
    "code": 500,
    "msg": "文件上传失败: 文件大小超过限制"
  }
  ```

### 1.5 文件下载接口

#### 1.5.1通用文件下载

- **接口地址**: `GET /doc/download`

- **请求方式**: GET

- **请求参数**:

  | 参数名    | 类型     | 必填   | 说明   |
  | ------ | ------ | ---- | ---- |
  | fileId | String | 是    | 文件ID |

- **响应数据**: 二进制文件流

- **响应头**:

  ```
  Content-Type: application/octet-stream
  Content-Disposition: attachment; filename="文件名.扩展名"
  ```

- **响应说明**: 直接返回文件的二进制流,浏览器会自动下载文件

#### 1.5.2 本地资源下载

- **接口地址**: `GET /doc/download/resource`

- **请求方式**: GET

- **请求参数**:

  | 参数名      | 类型     | 必填   | 说明                 |
  | -------- | ------ | ---- | ------------------ |
  | resource | String | 是    | 资源路径(必须以配置的资源前缀开头) |

- **响应数据**: 二进制文件流

- **响应头**:

  ```
  Content-Type: application/octet-stream
  Content-Disposition: attachment; filename="文件名.扩展名"
  ```

- **响应说明**:

  - 用于下载本地文件系统中的资源文件
  - 会进行安全校验,防止非法路径访问
  - 资源路径必须包含配置的资源前缀(Constants.RESOURCE_PREFIX)

### 1.6 文件预览接口

#### 1.6.1 获取文件预览链接

- **接口地址**: `GET /doc/preview/{fileId}`

- **请求方式**: GET

- **请求参数**:

  | 参数名    | 类型     | 必填   | 说明   |
  | ------ | ------ | ---- | ---- |
  | fileId | String | 是    | 文件ID |

- **响应数据**:

  ```json
  {
    "code": 200,
    "msg": "操作成功",
    "data": "https://example.com/preview/abc123?token=xyz"
  }
  ```

- **响应说明**:

  - 返回文件的预览URL
  - 该URL可直接用于在线预览文件(图片、PDF等)
  - URL可能包含临时访问令牌,具有时效性

## 4. 使用示例

### 4.1 单文件上传示例(JavaScript)

```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);

fetch('/doc/upload', {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(data => {
  console.log('上传成功:', data);
})
.catch(error => {
  console.error('上传失败:', error);
});
```

### 4.2 多文件上传示例(JavaScript)

```javascript
const formData = new FormData();
for (let i = 0; i < fileInput.files.length; i++) {
  formData.append('files', fileInput.files[i]);
}

fetch('/doc/uploads', {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(data => {
  console.log('上传成功:', data);
})
.catch(error => {
  console.error('上传失败:', error);
});
```

### 4.3 文件下载示例(JavaScript)

```javascript
// 方式1: 直接使用链接
window.location.href = `/doc/download?fileId=${fileId}`;

// 方式2: 使用fetch下载
fetch(`/doc/download?fileId=${fileId}`)
  .then(response => response.blob())
  .then(blob => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'filename.ext';
    a.click();
    window.URL.revokeObjectURL(url);
  });
```

### 4.4 文件预览示例(JavaScript)

```javascript
fetch(`/doc/preview/${fileId}`)
  .then(response => response.json())
  .then(data => {
    if (data.code === 200) {
      // 在新窗口打开预览
      window.open(data.data, '_blank');

      // 或者在img标签中显示
      // document.getElementById('preview-img').src = data.data;
    }
  });
```

## 5. 错误码说明

| 错误码  | 说明      | 处理建议         |
| ---- | ------- | ------------ |
| 200  | 请求成功    | -            |
| 400  | 请求参数错误  | 检查请求参数是否正确   |
| 401  | 未授权     | 检查用户登录状态     |
| 404  | 文件不存在   | 确认fileId是否正确 |
| 500  | 服务器内部错误 | 联系技术支持       |

## 6. 注意事项

### 6.1 文件上传限制

- 单个文件大小限制: 根据服务器配置(默认通常为10MB-100MB)
- 支持的文件类型: 根据业务需求配置,建议限制可执行文件上传
- 文件名限制: 会自动重命名,避免文件名冲突

### 6.2 安全性

- 所有文件下载接口都会进行路径安全校验
- 本地资源下载会检查资源路径合法性,防止目录遍历攻击
- 建议在生产环境配置文件访问权限控制

### 6.3 文件服务类型

系统支持多种文件存储服务:

- **minio**: MinIO对象存储服务(推荐用于生产环境)
- **fastDb**: FastDFS分布式文件系统
- 具体使用哪种服务由系统配置决定

### 6.4 最佳实践

1. **大文件上传**: 建议使用分片上传(需要额外实现)
2. **文件预览**: 图片、PDF等文件建议使用预览接口,避免直接下载
3. **批量上传**: 文件数量较多时,考虑限制单次上传数量,避免超时
4. **错误处理**: 前端需要妥善处理上传失败、网络超时等异常情况


