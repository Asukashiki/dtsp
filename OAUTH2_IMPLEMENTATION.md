# OAuth2 授权码登录实现文档

## ✅ 已完成的工作

### 1. 环境配置

#### .env.development（开发环境）
```bash
# OAuth2配置
VITE_APP_OAUTH2_SERVER='http://10.110.149.140:30012'
VITE_APP_OAUTH2_BASE_API='/auth'
VITE_APP_OAUTH2_SERVER_CODE_GENERATE='/oauth2/authorize'
VITE_APP_OAUTH2_TYPE='response_type=code'
VITE_APP_OAUTH2_CALLBACK='/callback'
VITE_APP_OAUTH2_CLIENT_ID='YY'
```

#### .env.production（生产环境）
```bash
# OAuth2配置（生产环境使用同域名）
VITE_APP_OAUTH2_SERVER=''
VITE_APP_OAUTH2_BASE_API='/auth'
VITE_APP_OAUTH2_SERVER_CODE_GENERATE='/oauth2/authorize'
VITE_APP_OAUTH2_TYPE='response_type=code'
VITE_APP_OAUTH2_CALLBACK='/callback'
VITE_APP_OAUTH2_CLIENT_ID='YY'
```

### 2. 核心功能实现

#### 2.1 API接口 (src/api/user.js)

新增 `oauth2LoginWithCode` 函数：
```javascript
// OAuth2授权码登录
export const oauth2LoginWithCode = (code, redirectUri, grantType) => {
  const data = {
    code,
    redirectUri,
    grantType
  }
  return request({
    url: '/ucif/oauth/codeLogin',
    headers: {
      isToken: false,
      repeatSubmit: false
    },
    method: 'post',
    data: data
  })
}
```

**功能说明**：
- 接收三个参数：
  - `code`: 授权码
  - `redirectUri`: 回调地址
  - `grantType`: 授权类型（固定为 'bsp'）
- 使用POST方法，data传参（非params）
- 设置特殊headers：
  - `isToken: false` - 该请求不需要携带token
  - `repeatSubmit: false` - 允许重复提交
- 调用后端接口 `/ucif/oauth/codeLogin` 进行授权码验证
- 返回包含 token 的响应数据

#### 2.2 工具函数 (src/utils/auth.js)

**新增 `getCodeFromUrl` 函数**：
```javascript
/**
 * 从URL中提取授权码（OAuth2 Authorization Code Flow）
 * 支持两种格式：
 * 1. Hash中的code: http://example.com/#/callback?code=xxx
 * 2. 查询参数中的code: http://example.com/?code=xxx
 */
export function getCodeFromUrl() {
  // 首先检查URL查询参数中是否包含code
  const urlParams = new URLSearchParams(window.location.search)
  const code = urlParams.get('code')
  if (code) return code

  // 检查hash中是否包含查询参数
  const hash = window.location.hash
  if (hash && hash.includes('?')) {
    const hashQuery = hash.split('?')[1]
    const hashParams = new URLSearchParams(hashQuery)
    return hashParams.get('code')
  }

  return null
}
```

**更新 `redirectToLogin` 函数**：
```javascript
export async function redirectToLogin() {
  const isDev = import.meta.env.DEV
  const OAUTH2_SERVER = isDev
    ? import.meta.env.VITE_APP_OAUTH2_SERVER
    : location.origin
  const OAUTH2_BASE_API = import.meta.env.VITE_APP_OAUTH2_BASE_API
  const OAUTH2_SERVER_CODE_GENERATE = import.meta.env.VITE_APP_OAUTH2_SERVER_CODE_GENERATE
  const OAUTH2_TYPE = import.meta.env.VITE_APP_OAUTH2_TYPE
  const OAUTH2_CALLBACK = import.meta.env.VITE_APP_OAUTH2_CALLBACK
  const CLIENT_ID = import.meta.env.VITE_APP_OAUTH2_CLIENT_ID

  // 构建回调地址
  const redirectUrl = window.location.origin + '/ditp/#' + OAUTH2_CALLBACK

  // 构建OAuth2授权码流程URL
  const authUrl = `${OAUTH2_SERVER}${OAUTH2_BASE_API}${OAUTH2_SERVER_CODE_GENERATE}?${OAUTH2_TYPE}&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUrl)}`

  window.location.href = authUrl
}
```

**重定向URL示例**：
```
http://10.110.149.140:30012/auth/oauth2/authorize?response_type=code&client_id=YY&redirect_uri=http://localhost:8080/ditp/#/callback
```

#### 2.3 状态管理 (src/store/user.js)

新增 `Oauth2LoginWithCode` action：
```javascript
// OAuth2授权码登录
async Oauth2LoginWithCode(loginData) {
  try {
    const res = await oauth2LoginWithCode(
      loginData.code,
      loginData.redirectUri,
      loginData.grantType
    )
    if (res.code === 200 && res.data) {
      const token = res.data.token || res.data.access_token
      if (token) {
        this.setToken(token)
        await this.fetchUserInfo()
        return true
      }
    }
    return false
  } catch (error) {
    console.error('OAuth2授权码登录失败', error)
    throw error
  }
}
```

**功能说明**：
- 接收 `loginData` 对象，包含：
  - `code`: 授权码
  - `redirectUri`: 回调地址
  - `grantType`: 授权类型
- 调用 `oauth2LoginWithCode` API 进行授权码验证
- 自动提取返回的 token（支持 `token` 或 `access_token` 字段）
- 保存 token 到 localStorage
- 自动获取用户信息
- 返回登录是否成功

#### 2.4 回调页面组件 (src/views/callback/index.vue)

创建专用的 OAuth2 回调处理页面：

**核心代码**：
```javascript
const handleOAuth2Callback = async () => {
  const code = getCodeFromUrl()

  // 构建登录数据
  const loginData = {
    code: code,
    redirectUri: window.location.origin + '/ditp/#/callback',
    grantType: 'bsp'
  }

  // 使用授权码换取token
  const success = await userStore.Oauth2LoginWithCode(loginData)

  if (success) {
    router.push('/home')
  }
}
```

**功能**：
1. 从 URL 中提取授权码（code）
2. 构建包含三个参数的 `loginData` 对象：
   - `code`: 从URL提取的授权码
   - `redirectUri`: 回调地址（与授权请求中的一致）
   - `grantType`: 固定为 'bsp'
3. 调用 store 的 `Oauth2LoginWithCode` 方法进行登录
4. 显示加载动画和提示信息
5. 登录成功后跳转到首页
6. 登录失败时显示错误提示并重定向到登录页

**UI特点**：
- 居中显示的加载提示
- 绿色旋转图标（匹配埃塞俄比亚主题）
- 友好的提示文本
- 支持中英文双语

#### 2.5 路由配置 (src/router/index.js)

新增回调路由：
```javascript
{
  path: '/callback',
  name: 'Callback',
  component: () => import('../views/callback/index.vue'),
  meta: { requiresAuth: false }  // 不需要认证
}
```

**重要**：`requiresAuth: false` 确保回调页面无需认证即可访问

#### 2.6 国际化支持

**中文 (src/locales/zh-CN.js)**：
```javascript
callback: {
  processing: '正在处理登录...',
  pleaseWait: '请稍候，正在验证您的身份',
  noCode: '未获取到授权码，请重新登录',
  loginSuccess: '登录成功',
  loginFailed: '登录失败，请重试',
  loginError: '登录过程中发生错误',
}
```

**英文 (src/locales/en-US.js)**：
```javascript
callback: {
  processing: 'Processing Login...',
  pleaseWait: 'Please wait while we verify your identity',
  noCode: 'Authorization code not found, please login again',
  loginSuccess: 'Login Successful',
  loginFailed: 'Login Failed, please try again',
  loginError: 'An error occurred during login',
}
```

## 🔄 OAuth2 授权码流程

### 完整流程图

```
1. 用户访问系统（无token）
   ↓
2. 路由守卫检测到未登录
   ↓
3. 调用 redirectToLogin()
   ↓
4. 重定向到 OAuth2 授权服务器
   URL: http://10.110.149.140:30012/auth/oauth2/authorize?response_type=code&client_id=YY&redirect_uri=...
   ↓
5. 用户在授权服务器登录
   ↓
6. 授权服务器重定向回系统
   URL: http://localhost:8080/ditp/#/callback?code=AUTHORIZATION_CODE
   ↓
7. 回调页面（/callback）提取授权码
   ↓
8. 构建登录数据（code + redirectUri + grantType）
   ↓
9. 调用 Oauth2LoginWithCode(loginData)
   ↓
10. 后端验证授权码并返回 token
   ↓
11. 存储 token 到 localStorage
   ↓
12. 获取用户信息
   ↓
13. 重定向到首页（/home）
   ↓
14. 路由守卫验证 token，允许访问
```

### 关键URL示例

**开发环境授权请求**：
```
http://10.110.149.140:30012/auth/oauth2/authorize?response_type=code&client_id=YY&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fditp%2F%23%2Fcallback
```

**授权服务器回调**：
```
http://localhost:8080/ditp/#/callback?code=AUTH_CODE_HERE
```

**Token 交换请求**：
```
POST http://10.110.149.140:30012/auth/ucif/oauth/codeLogin
Content-Type: application/json

{
  "code": "AUTH_CODE_HERE",
  "redirectUri": "http://localhost:8080/ditp/#/callback",
  "grantType": "bsp"
}
```

**注意**：该请求不需要携带Authorization header（isToken: false）

## 📝 与原有实现的对比

### 原实现（Token 流程）

```javascript
// 原 redirectToLogin
const authUrl = `${LOGIN_URL}/auth/oauth2/authorize?response_type=token&client_id=icd&redirect_uri=${redirectUrl}`

// 直接返回 token
http://localhost:8080/ditp/#token=ACCESS_TOKEN
```

**问题**：
- Token 直接暴露在 URL 中（安全性较低）
- 不符合 OAuth2 最佳实践

### 新实现（授权码流程）

```javascript
// 新 redirectToLogin
const authUrl = `${OAUTH2_SERVER}${OAUTH2_BASE_API}${OAUTH2_SERVER_CODE_GENERATE}?${OAUTH2_TYPE}&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUrl)}`

// 返回授权码
http://localhost:8080/ditp/#/callback?code=AUTHORIZATION_CODE

// 服务端交换 token
oauth2LoginWithCode(code) → 返回 token
```

**优势**：
- ✅ 更安全（token 不暴露在 URL 中）
- ✅ 符合 OAuth2 授权码标准流程
- ✅ 支持刷新 token（如果后端实现）
- ✅ 更好的错误处理

## 🧪 测试步骤

### 1. 启动开发服务器
```bash
npm run dev
```

### 2. 清除本地存储
```javascript
// 在浏览器控制台执行
localStorage.clear()
```

### 3. 访问需要认证的页面
```
http://localhost:8080/ditp/#/home
```

### 4. 验证重定向
应该自动重定向到：
```
http://10.110.149.140:30012/auth/oauth2/authorize?response_type=code&client_id=YY&redirect_uri=http://localhost:8080/ditp/#/callback
```

### 5. 登录后验证回调
登录成功后应该：
- 重定向到 `http://localhost:8080/ditp/#/callback?code=xxx`
- 显示"正在处理登录..."页面
- 自动跳转到首页
- token 存储在 localStorage 中

### 6. 检查开发者工具

**Network 标签**：
- 查看 `/ucif/oauth/codeLogin` POST请求
- 查看 `/oauth2/getCurrentUserInfo` 请求

**Console 标签**：
- 确认没有错误信息
- 可以看到登录成功提示

**Application → Local Storage**：
```
token: "your_access_token"
userInfo: "{...}"
```

## ⚠️ 注意事项

### 1. 后端接口要求

后端必须实现以下接口：

**授权码验证接口**：
```
POST /ucif/oauth/codeLogin

Response:
{
  "code": 200,
  "msg": "success",
  "data": {
    "token": "ACCESS_TOKEN_HERE",
    // 或
    "access_token": "ACCESS_TOKEN_HERE"
  }
}
```

### 2. CORS 配置

后端需要允许前端域名的跨域请求：
```
Access-Control-Allow-Origin: http://localhost:8080
Access-Control-Allow-Credentials: true
Access-Control-Allow-Headers: Authorization, Content-Type
```

### 3. Redirect URI 配置

后端 OAuth2 服务器必须配置允许的回调地址：
- 开发环境：`http://localhost:8080/ditp/#/callback`
- 生产环境：`https://your-domain.com/ditp/#/callback`

### 4. Client ID 配置

确保使用正确的 client_id：
- 当前配置：`YY`
- 必须与后端 OAuth2 服务器注册的 client_id 一致

## 🐛 故障排查

### 问题1：重定向后没有 code 参数

**可能原因**：
- 后端未正确配置 redirect_uri
- Client ID 不匹配
- 用户取消授权

**解决方案**：
1. 检查后端 OAuth2 服务器配置
2. 确认 client_id 正确
3. 查看后端日志

### 问题2：code 换取 token 失败

**可能原因**：
- code 已过期（通常 5-10 分钟有效期）
- code 已被使用（一次性）
- 后端接口路径错误

**解决方案**：
1. 检查网络请求，确认接口路径为 `/ucif/oauth/codeLogin`
2. 查看后端返回的错误信息
3. 尝试重新登录获取新的 code

### 问题3：登录成功但跳转失败

**可能原因**：
- 路由配置错误
- 用户信息获取失败

**解决方案**：
1. 检查浏览器控制台错误
2. 确认 `/oauth2/getCurrentUserInfo` 接口正常
3. 检查路由守卫逻辑

### 问题4：回调页面一直显示加载中

**可能原因**：
- 网络请求失败
- 后端响应格式不正确

**解决方案**：
1. 打开开发者工具查看 Network 标签
2. 检查 `/ucif/oauth/codeLogin` 请求状态
3. 确认响应格式符合要求

## 📞 技术支持

如有问题，请：
1. 检查浏览器控制台错误信息
2. 查看 Network 标签中的请求详情
3. 确认后端服务正常运行
4. 联系后端团队确认 OAuth2 配置

---

**实现日期：** 2024-11-24
**版本：** v2.0.0
**OAuth2 流程：** Authorization Code Flow
**状态：** ✅ 已完成并待测试
