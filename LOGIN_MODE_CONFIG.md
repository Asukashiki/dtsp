# Login Mode Configuration Guide

## Overview

The application supports two login modes that can be configured via environment variables:

1. **SSO Mode** (`sso`): OAuth2 Single Sign-On integration
2. **System Mode** (`system`): Built-in login page with username/password

## Configuration

### Environment Variables

Configure the login mode in your environment files:

**Development** (`.env.development`):
```bash
# Login mode: 'sso' or 'system'
VITE_APP_LOGIN_MODE='sso'

# OAuth2 Configuration (used when LOGIN_MODE='sso')
VITE_APP_OAUTH2_SERVER='http://10.110.149.140:30012'
VITE_APP_OAUTH2_BASE_API='/auth'
VITE_APP_OAUTH2_SERVER_CODE_GENERATE='/oauth2/authorize'
VITE_APP_OAUTH2_TYPE='response_type=code'
VITE_APP_OAUTH2_CALLBACK='/callback'
VITE_APP_OAUTH2_CLIENT_ID='YY'
```

**Production** (`.env.production`):
```bash
# Login mode: 'sso' or 'system'
VITE_APP_LOGIN_MODE='sso'

# OAuth2 Configuration (used when LOGIN_MODE='sso')
VITE_APP_OAUTH2_SERVER='http://10.110.149.140:30012'
VITE_APP_OAUTH2_BASE_API='/auth'
VITE_APP_OAUTH2_SERVER_CODE_GENERATE='/oauth2/authorize'
VITE_APP_OAUTH2_TYPE='response_type=code'
VITE_APP_OAUTH2_CALLBACK='/callback'
VITE_APP_OAUTH2_CLIENT_ID='YY'
```

## Login Modes

### SSO Mode

**When to use**: Integration with external OAuth2 authentication server (e.g., enterprise SSO, unified authentication platform)

**How it works**:
1. User accesses the application without a token
2. Application redirects to OAuth2 authorization server
3. User authenticates on the OAuth2 server
4. OAuth2 server redirects back with authorization code
5. Application exchanges code for access token
6. User is logged in and can access protected routes

**Configuration**:
```bash
VITE_APP_LOGIN_MODE='sso'
```

**Required OAuth2 settings**:
- `VITE_APP_OAUTH2_SERVER`: OAuth2 server base URL
- `VITE_APP_OAUTH2_BASE_API`: API base path (e.g., `/auth`)
- `VITE_APP_OAUTH2_SERVER_CODE_GENERATE`: Authorization endpoint (e.g., `/oauth2/authorize`)
- `VITE_APP_OAUTH2_TYPE`: Response type (e.g., `response_type=code`)
- `VITE_APP_OAUTH2_CALLBACK`: Callback route (e.g., `/callback`)
- `VITE_APP_OAUTH2_CLIENT_ID`: OAuth2 client ID

**Routes**:
- `/callback`: OAuth2 callback handler (processes authorization code)

### System Mode

**When to use**: Standalone deployment without external SSO, testing, or development

**How it works**:
1. User accesses the application without a token
2. Application redirects to `/login` route
3. User enters username and password on login page
4. Application calls backend login API
5. Backend returns access token
6. User is logged in and can access protected routes

**Configuration**:
```bash
VITE_APP_LOGIN_MODE='system'
```

**Routes**:
- `/login`: Built-in login page

## Switching Between Modes

### Step 1: Update Environment Variable

Edit the appropriate `.env` file:

```bash
# For SSO mode
VITE_APP_LOGIN_MODE='sso'

# OR for System mode
VITE_APP_LOGIN_MODE='system'
```

### Step 2: Restart Development Server

If running in development mode:
```bash
npm run dev
```

### Step 3: Rebuild for Production

If deploying to production:
```bash
npm run build
```

### Step 4: Clear Browser Cache

After switching modes, users should:
1. Clear browser localStorage: `localStorage.clear()`
2. Refresh the page

## Implementation Details

### API Response Format

The OAuth2 code exchange API (`/ucif/oauth/codeLogin`) returns the following format:

```json
{
  "code": 200,
  "msg": "操作成功",
  "access_token": "27aec327-b507-415b-9496-a109a64de9bb",
  "token": "27aec327-b507-415b-9496-a109a64de9bb",
  "refresh_token": "...",
  "expires_in": 7199,
  "refresh_expires_time": null
}
```

**Note**: The token is returned directly in the root object (`res.access_token` or `res.token`), not nested in a `data` object. The implementation handles both formats for compatibility.

### Grant Type Configuration

The `grantType` parameter in OAuth2 login can be configured based on your backend requirements:
- `'authorization_code'`: Standard OAuth2 authorization code grant
- `'bsp'`: Custom grant type (if your backend uses this)

Update in `src/views/callback/index.vue`:
```javascript
const loginData = {
  code: code,
  redirectUri: window.location.origin + window.location.pathname + '#/callback',
  grantType: 'bsp' // or 'authorization_code'
}
```

### Files Modified

1. **Environment Configuration**:
   - `.env.development`
   - `.env.production`

2. **Authentication Utilities** (`src/utils/auth.js`):
   - `getLoginMode()`: Returns current login mode
   - `getTokenFromUrl()`: Extracts OAuth2 token from URL
   - `getCodeFromUrl()`: Extracts OAuth2 authorization code
   - `redirectToLogin()`: Redirects to appropriate login endpoint based on mode

3. **Router Configuration** (`src/router/index.js`):
   - Restored `/callback` route for SSO mode
   - Updated `router.beforeEach()` guard to handle SSO token extraction
   - Supports both SSO and system login flows

4. **User Store** (`src/store/user.js`):
   - `Oauth2LoginWithCode()`: Exchanges authorization code for token (SSO mode)
   - Integrated with existing `fetchUserInfo()`, `getPermissions()`, and `getMenus()`

5. **OAuth2 Callback View** (`src/views/callback/index.vue`):
   - Processes OAuth2 authorization code
   - Exchanges code for access token
   - Fetches user info and redirects to home page

6. **Login API** (`src/api/user.js`):
   - `oauth2LoginWithCode()`: Backend API call for OAuth2 code exchange

## Testing

### Test SSO Mode

1. Set `VITE_APP_LOGIN_MODE='sso'`
2. Restart dev server
3. Clear browser cache and localStorage
4. Navigate to application
5. Should redirect to OAuth2 server
6. After authentication, should redirect back to `/callback`
7. Should then redirect to `/home` with user info loaded

### Test System Mode

1. Set `VITE_APP_LOGIN_MODE='system'`
2. Restart dev server
3. Clear browser cache and localStorage
4. Navigate to application
5. Should redirect to `/login`
6. Enter credentials on login page
7. After authentication, should redirect to `/home` with user info loaded

## Troubleshooting

### SSO Mode Issues

**Problem**: Infinite redirect loop
- **Cause**: OAuth2 callback not processing correctly
- **Solution**: Check OAuth2 configuration, verify callback URL matches redirect_uri

**Problem**: Token not extracted from URL
- **Cause**: URL format doesn't match expected pattern
- **Solution**: Check browser console for token extraction logs, verify OAuth2 server response format

**Problem**: 401 errors after SSO login
- **Cause**: Token not being sent in API requests
- **Solution**: Verify token is stored in localStorage, check request interceptor

### System Mode Issues

**Problem**: Login page not showing
- **Cause**: `/login` route not defined
- **Solution**: Ensure `/login` route exists and login component is implemented

**Problem**: Cannot login with credentials
- **Cause**: Backend login API not working
- **Solution**: Check network tab for API errors, verify backend is running

## Security Considerations

1. **Token Storage**: Tokens are stored in localStorage for persistence across sessions
2. **OAuth2 Client Secret**: Should be managed on backend, not exposed in frontend
3. **HTTPS**: Always use HTTPS in production for OAuth2 flows
4. **CORS**: Ensure OAuth2 server allows your application's origin
5. **Token Expiration**: Backend should validate token expiration and return 401 when expired

## Commit Information

**Branch**: `feature/sso-config`
**Base Branch**: `new-2.0.0-ljj`
**Reference Commit**: `7ffbb65eda41666cf053970006cb97e5f1959b78` (commit that removed SSO)

This implementation restores the original OAuth2 SSO functionality while adding the ability to configure login mode via environment variables.
