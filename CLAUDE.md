# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Oromia Smart Agriculture Value Chain Big Data Platform** (奥罗米亚智能农业价值链大数据平台)

A modern agricultural data management platform for Oromia State, Ethiopia, featuring:
- Full bilingual support (Chinese/English)
- Agricultural-themed design based on Ethiopian flag colors
- User identity authentication system (farmer, supplier, buyer)
- SSO integration with OAuth2
- Data visualization and announcement system

**Tech Stack**:
- **Frontend**: Vue 3 (Composition API with `<script setup>`)
- **Build Tool**: Vite 6
- **UI Framework**: Element Plus
- **State Management**: Pinia
- **Routing**: Vue Router (hash mode)
- **Internationalization**: Vue i18n
- **Styling**: Tailwind CSS 4
- **Icons**: Remix Icon + Element Plus Icons
- **Charts**: ECharts
- **HTTP Client**: Axios

## Development Commands

### Essential Commands
```bash
# Install dependencies
npm install

# Start development server (http://localhost:8080)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development in WSL Environment
This project is developed in WSL. If you encounter file locking issues:
```bash
# Option 1: Run in Windows PowerShell (recommended)
cd D:\docs\a-work\inspur\code\2025\dtsp
Remove-Item -Recurse -Force node_modules, package-lock.json -ErrorAction SilentlyContinue
npm install
npm run dev

# Option 2: Use pnpm in WSL
npm install -g pnpm
pnpm install
pnpm dev
```

## Architecture

### Directory Structure
```
src/
├── api/              # API layer - all HTTP requests
│   ├── user.js       # User-related APIs (getCurrentUserInfo, postUserUpdate, etc.)
│   ├── home.js       # Home page APIs
│   └── application.js
├── assets/           # Static assets
├── components/       # Shared components
│   └── userDetails.vue
├── i18n/             # i18n configuration
│   └── index.js
├── layout/           # Layout components
│   └── Layout.vue
├── locales/          # Translation files
│   ├── zh-CN.js      # Chinese translations
│   └── en-US.js      # English translations
├── router/           # Vue Router configuration
│   └── index.js
├── store/            # Pinia stores
│   ├── index.js      # Store exports
│   ├── user.js       # User state management
│   └── locale.js     # Locale/language state
├── utils/            # Utility functions
│   ├── auth.js       # Authentication utilities
│   ├── request.js    # Axios instance with interceptors
│   └── system-data-config.js
├── views/            # Page components
│   ├── home/         # Home page
│   ├── identity/     # Identity verification (farmer, supplier, buyer)
│   ├── knowledge/    # Knowledge center (currently disabled)
│   └── application/  # Application registration (currently disabled)
├── App.vue
├── main.js
└── style.css
```

### Authentication Flow (OAuth2 SSO)

1. **Token Extraction**: Router checks URL for token parameter (hash or query string)
2. **Token Storage**: Token stored in localStorage
3. **Request Interceptor**: Adds `Authorization: ${token}` header to all API requests
4. **Response Interceptor**: Handles 401/500 errors by redirecting to login
5. **User Info**: Fetched via `/auth/oauth2/getCurrentUserInfo` after successful auth

**Key Files**:
- [src/utils/auth.js](src/utils/auth.js) - Token management, URL parsing, redirect to login
- [src/utils/request.js](src/utils/request.js) - Axios instance with auth interceptors
- [src/router/index.js](src/router/index.js) - Route guards for authentication
- [src/store/user.js](src/store/user.js) - User state and auth actions

**Important Notes**:
- Base URL: `/ditp/` (configured in vite.config.js and router)
- OAuth2 endpoint: `/auth/oauth2/authorize?response_type=token&client_id=icd&redirect_uri=${redirectUrl}`
- API proxy in dev: `/auth` → `VITE_APP_API_URL` from .env.development
- Token passed as `Authorization` header (not `Bearer ${token}`)

### Internationalization (i18n)

**Pattern**: All user-facing text MUST be internationalized

**In Templates**:
```vue
<template>
  <h1>{{ $t('section.title') }}</h1>
  <p>{{ $t('section.subtitle') }}</p>
</template>
```

**In Script Setup**:
```vue
<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// Use in reactive contexts
const errorMessage = computed(() => t('error.message'))

// Use in functions
const handleError = () => {
  ElMessage.error(t('error.failed'))
}
```

**Adding New Translations**:
1. Add keys to [src/locales/zh-CN.js](src/locales/zh-CN.js)
2. Add corresponding keys to [src/locales/en-US.js](src/locales/en-US.js)
3. Use `$t('key')` in templates or `t('key')` in scripts

**Language Switching**:
- Language stored in Pinia store: `useLocaleStore()`
- Persisted to localStorage
- Element Plus locale synced with app locale

### State Management (Pinia)

**User Store** ([src/store/user.js](src/store/user.js)):
```javascript
import { useUserStore } from '@/store'

const userStore = useUserStore()

// Getters
userStore.token          // Current token
userStore.userInfo       // User info object
userStore.isLogin        // Boolean: is logged in
userStore.hasUserInfo    // Boolean: has user info

// Actions
userStore.setToken(token)           // Set token
userStore.setUserInfo(info)         // Set user info
userStore.fetchUserInfo()           // Fetch from API
userStore.logout()                  // Clear local storage
userStore.logoutAndRedirect(delay)  // Logout + redirect to SSO
```

**Locale Store** ([src/store/locale.js](src/store/locale.js)):
```javascript
import { useLocaleStore } from '@/store'

const localeStore = useLocaleStore()
localeStore.setLocale('en-US')  // Switch language
```

### API Layer

All API calls go through [src/utils/request.js](src/utils/request.js) which:
- Adds base URL: `${API_BASE_URL}/auth`
- Adds Authorization header automatically
- Handles 401/500 errors with automatic logout
- Shows error messages via Element Plus

**Example API Definition** ([src/api/user.js](src/api/user.js)):
```javascript
import request from '../utils/request'

export const getCurrentUserInfo = () => {
  return request({
    url: '/oauth2/getCurrentUserInfo',
    method: 'get',
    params: { appId: 'INSPUR-ICD' }
  })
}
```

## Design System

**Reference**: See [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) for complete design specifications

### Color Palette (Ethiopian Flag Theme)
```css
/* Primary Green - Agriculture, growth, hope */
--primary-green: #009A44;
--primary-green-light: #00b350;
--primary-green-dark: #008038;

/* Accent Yellow - Harvest, sunshine, prosperity */
--accent-yellow: #FEDD00;

/* Accent Red - Vitality, innovation */
--accent-red: #DA121A;
--accent-red-light: #FF3D47;
--accent-red-dark: #C10F17;
```

### Common Patterns

**Page Header**:
- Large icon (80x80px) with green gradient background
- Title and subtitle
- Background with subtle green-yellow gradient
- See template in DESIGN_SYSTEM.md

**Info Cards**:
- White background with border
- Gradient header (green to yellow, subtle)
- Hover effect: lift up with shadow
- Rounded corners (16px)

**Buttons**:
- Primary: Green gradient (`linear-gradient(135deg, #009A44 0%, #00b350 100%)`)
- Danger: Red gradient (for logout, delete actions)
- Outline: Green border on hover

**Icons**: Use Remix Icon (`ri-*-line` classes) for consistency

### Responsive Breakpoints
```css
/* Mobile */
@media screen and (max-width: 768px) { }

/* Tablet */
@media screen and (max-width: 1024px) { }
```

## Common Development Tasks

### Creating a New Page

1. **Add translations** to both locale files ([src/locales/zh-CN.js](src/locales/zh-CN.js), [src/locales/en-US.js](src/locales/en-US.js))
2. **Create view** in `src/views/[module]/` using the page template from DESIGN_SYSTEM.md
3. **Add route** to [src/router/index.js](src/router/index.js):
   ```javascript
   {
     path: 'my-page',
     name: 'MyPage',
     component: () => import('../views/my-page/index.vue'),
     meta: { title: '我的页面', requiresAuth: true }
   }
   ```
4. **Apply design system** styles and patterns
5. **Test internationalization** by switching languages
6. **Test responsive design** on different screen sizes

### Adding an API Endpoint

1. **Define function** in appropriate file under [src/api/](src/api/):
   ```javascript
   export const myApiCall = (params) => {
     return request({
       url: '/my-endpoint',
       method: 'post',
       data: params
     })
   }
   ```
2. **Import and use** in component:
   ```javascript
   import { myApiCall } from '@/api/my-module'

   const handleSubmit = async () => {
     try {
       const res = await myApiCall(formData)
       if (res.code === 200) {
         ElMessage.success(t('common.success'))
       }
     } catch (error) {
       console.error(error)
     }
   }
   ```

### Form Validation with i18n

```javascript
const rules = computed(() => ({
  field: [
    { required: true, message: t('form.fieldRequired'), trigger: 'blur' },
    { validator: customValidator, trigger: 'blur' }
  ]
}))

const customValidator = (rule, value, callback) => {
  if (!value) {
    callback(new Error(t('form.fieldRequired')))
  } else if (!pattern.test(value)) {
    callback(new Error(t('form.fieldInvalid')))
  } else {
    callback()
  }
}
```

## Environment Configuration

**Development** ([.env.development](.env.development)):
- `VITE_APP_API_URL`: Backend API URL (e.g., `http://10.110.149.140:30012`)
- Vite proxy forwards `/auth` to this URL

**Production** ([.env.production](.env.production)):
- `VITE_APP_API_URL`: Empty string (same origin)
- Knowledge base URL configured separately

## Deployment Notes

- **Base Path**: `/ditp/` (configured in vite.config.js and router)
- **Build Output**: `dist/` directory
- **Router Mode**: Hash history (`createWebHashHistory('/ditp/')`)
- **OAuth2 Redirect**: Ensure `redirect_uri` matches deployed URL + `/ditp/`

## Key Conventions

1. **Always use i18n**: Never hardcode user-facing text
2. **Follow design system**: Use defined colors, gradients, spacing, and component patterns
3. **Composition API**: Use `<script setup>` for all new components
4. **Error handling**: Let request interceptor handle auth errors; handle business logic errors locally
5. **Icons**: Prefer Remix Icon (`ri-*`) for consistency with design system
6. **Responsive**: Test all new pages on mobile, tablet, and desktop
7. **Route meta**: Set `requiresAuth: true` for protected routes, `hideInMenu: true` for detail pages

## Troubleshooting

**Rollup errors during build**:
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

**i18n not working**:
- Verify keys exist in both [src/locales/zh-CN.js](src/locales/zh-CN.js) and [src/locales/en-US.js](src/locales/en-US.js)
- Check [src/i18n/index.js](src/i18n/index.js) configuration
- Ensure `useI18n()` is called in setup

**Auth issues**:
- Check token in localStorage: `localStorage.getItem('token')`
- Verify API proxy in [vite.config.js](vite.config.js)
- Check network tab for 401 responses
- Verify OAuth2 redirect_uri matches current origin + `/ditp/`
