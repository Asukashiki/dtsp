---
trigger: always_on
---

# Frontend Development Context for AI

**Project:** Oromia Smart Agriculture Value Chain Big Data Platform
**Tech Stack:** Vue 3 (Composition API, Script Setup), TypeScript, Vite
**UI Framework:** Naive UI + Tailwind CSS
**State Management:** Pinia
**Network:** Axios
**Backend Architecture:** RuoYi-Vue (Java Spring Boot standard response structure)

## 1\. Technology Standards

### 1.1 Core Framework

  * **Vue 3**: Use `<script setup lang="ts">`. Avoid Options API.
  * **TypeScript**: Strict typing is required. Define `interface` for all API Request/Response bodies in `src/api/types`.
  * **Tailwind CSS**: Use utility classes for layout (`flex`, `grid`), spacing (`p-4`, `m-2`), and colors. Avoid writing custom `<style scoped>` unless for complex animations or overriding Naive UI specific variables.

### 1.2 UI Library (Naive UI)

  * **Components**: Use `NButton`, `NCard`, `NDataTable`, `NForm`, `NInput`, etc.
  * **Feedback**: Use `useMessage`, `useNotification`, `useDialog` from Naive UI for user interaction.
  * **Theme**: Wrap the app in `NConfigProvider`.

### 1.3 Backend Integration (RuoYi Standard)

  * **Response Wrapper**: The backend returns:
    ```typescript
    interface ApiResponse<T> {
      code: number; // 200 = success, 401 = unauthorized, 500 = error
      msg: string;
      data: T;
      rows?: T[]; // For pagination lists
      total?: number; // For pagination
    }
    ```
  * **Request Wrapper**: Use `src/utils/request.ts`. It handles the `Authorization: Bearer {token}` header automatically.

## 2\. Directory Structure

  * `src/api/`: API definitions separated by module (e.g., `auth.ts`, `land.ts`, `stock.ts`).
  * `src/views/`: Page components. Match the backend's dynamic router path (e.g., `views/agriculture/land/index.vue`).
  * `src/components/`: Global shared components (`DictSelect`, `UploadFile`).
  * `src/store/`: Pinia stores (`user`, `permission`, `dict`).
  * `src/locales/`: i18n JSON files (`en.ts`, `zh.ts`).

## 3\. Key Development Rules

### 3.1 Permission & Roles

  * **Directives**:
      * Use `v-hasPermi="['module:action']"` to remove elements if the user lacks permission.
      * **Do not** use `v-if` for permissions; use the directive.
  * **Role-Based UI**:
      * **Farmer View**: Mobile-first, Card layout, large buttons. Use Tailwind Grid: `grid-cols-1 md:grid-cols-2`.
      * **Admin View**: Table layout (`NDataTable`), dense information.

### 3.2 Dictionaries (Data Translation)

  * The backend uses a dictionary system (`sys_dict_data`).
  * **Pattern**:
    1.  Fetch dicts using hook: `const { sys_user_sex } = useDict('sys_user_sex')`.
    2.  Use `<DictSelect>` component (custom wrapper around `NSelect`) to render options.
    3.  Use `<DictTag>` to render badges in tables (e.g., Status 0=Blue, 1=Green).

### 3.3 Forms & Validation

  * Use `NForm` and `NFormItem` with `rule` objects.
  * Validation rules must match backend database constraints (e.g., Phone number regex, Max length).

## 4\. Business Module Specifics

### 4.1 Identity Authentication (`views/auth/`)

  * **State Machine UI**:
      * If `status === null`: Show "Apply Now" form.
      * If `status === '0'` (Pending): Show `NSteps` or Read-only form with "Under Review" alert.
      * If `status === '2'` (Rejected): Show Error Alert with `reject_reason` and "Edit & Resubmit" button.

### 4.2 Land Management (`views/land/`)

  * **Map Integration**: When adding land (`lat`, `lng`), assume we need a coordinate picker (placeholder for now).
  * **Role Logic**: If user is **Farmer**, `farmer_id` is hidden/fixed to current user. If **Admin**, show a Farmer Selector.

### 4.3 R\&D / Data Collection (`views/research/`)

  * **Dynamic Form**: The "Data Collection" page must switch form fields based on `DataType` selection:
      * `AGRONOMIC`: Show inputs for `PlantHeight`, `Yield`.
      * `SOIL`: Show inputs for `PH`, `Moisture`.
      * Use `<component :is="CurrentFormComp" />` pattern.

### 4.4 Supply Chain / Stock (`views/inputs/`)

  * **Scanner Logic**: In `Inbound` or `Outbound` pages, listen to `window.keydown` for USB Gun Scanner input (usually ends with `Enter`), or provide a specific "Focus to Scan" input box.
  * **FIFO Logic**: In Outbound form, allow leaving `BatchNo` empty (Auto-FIFO), or selecting a specific batch.

## 5\. Instruction for AI Code Generation

1.  **Types First**: When creating a new feature, start by defining the TypeScript Interfaces (DTO/VO) in `src/api/types`.
2.  **Tailwind Styling**: Always prefer Tailwind classes over `n-xxx` style props. Example: `<n-card class="mt-4 shadow-sm">` instead of using style tags.
3.  **Mocking**: If the backend API isn't ready, assume the structure defined in `src/api/types` and mock the response using `Promise.resolve()`.
4.  **I18n**: Wrap all static text in `$t('key')`. Example: `$t('common.submit')` instead of "Submit".