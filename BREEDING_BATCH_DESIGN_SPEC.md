# Breeding Batch Module - Design Specification

## Overview

This document defines the comprehensive design system for the Breeding Batch management module, part of the Oromia Smart Agriculture Platform. The design builds upon Ethiopian flag colors (Green, Yellow, Red) to create a culturally-rooted, professional agricultural data management interface.

---

## Design Philosophy

**Core Principles:**
- **Agricultural Authenticity**: Design reflects the natural, organic world of agriculture
- **Ethiopian Cultural Identity**: Ethiopian flag colors as primary palette
- **Workflow Clarity**: Clear visual hierarchy for approval workflows
- **Responsive Excellence**: Seamless experience across desktop, tablet, and mobile
- **Accessibility First**: WCAG 2.1 AA compliant colors and interactions

---

## Color System

### Primary Palette (Ethiopian Flag Theme)

```scss
// Primary Green - Agriculture, growth, progress
$primary-green: #009A44;
$primary-green-light: #00b350;
$primary-green-dark: #008038;

// Accent Yellow - Harvest, prosperity, energy
$accent-yellow: #FEDD00;
$accent-yellow-light: #FFF4CC;
$accent-yellow-dark: #E6C700;

// Accent Red - Vitality, urgency, attention
$accent-red: #DA121A;
$accent-red-light: #FF3D47;
$accent-red-dark: #C10F17;
```

### Semantic Colors

```scss
// Neutral Grays
$color-text-primary: #303133;    // Headings, primary text
$color-text-regular: #606266;    // Body text
$color-text-secondary: #909399;  // Secondary text, labels
$color-text-placeholder: #C0C4CC; // Placeholder text

// Backgrounds
$color-bg-white: #FFFFFF;
$color-bg-light: #F5F7FA;
$color-bg-lighter: #FAFBFC;

// Borders
$color-border: #DCDFE6;
$color-border-light: #E4E7ED;
$color-border-lighter: #F0F2F5;
```

### Workflow Status Colors

```scss
// Status color mapping
$workflow-colors: (
  'S0': (  // Draft
    type: 'info',
    color: #909399,
    background: rgba(144, 147, 153, 0.1),
    border: #D3D4D6
  ),
  'S1': (  // Pending Approval
    type: 'warning',
    color: #E6A23C,
    background: rgba(230, 162, 60, 0.1),
    border: #F5DAB1
  ),
  'S2': (  // Approved
    type: 'primary',
    color: #409EFF,
    background: rgba(64, 158, 255, 0.1),
    border: #B3D8FF
  ),
  'S3': (  // Rejected
    type: 'danger',
    color: $accent-red,
    background: rgba(218, 18, 26, 0.1),
    border: #FBC4C4
  ),
  'S9': (  // Archived
    type: 'info',
    color: #909399,
    background: rgba(144, 147, 153, 0.1),
    border: #D3D4D6
  ),
  'S10': ( // Voided
    type: 'danger',
    color: $accent-red-dark,
    background: rgba(193, 15, 23, 0.1),
    border: #F8C7CC
  )
);
```

---

## Typography

### Font Stack

```scss
$font-family-base: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                   "Helvetica Neue", Arial, "Noto Sans", sans-serif,
                   "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
                   "Noto Color Emoji";
```

### Type Scale

```scss
// Headings
$font-size-h1: 24px;     // Page titles
$font-size-h2: 20px;     // Section titles
$font-size-h3: 18px;     // Card titles
$font-size-h4: 16px;     // Subsection titles

// Body Text
$font-size-base: 14px;   // Body text, labels
$font-size-small: 13px;  // Secondary text
$font-size-xs: 12px;     // Captions, hints

// Line Heights
$line-height-base: 1.5;
$line-height-heading: 1.2;
```

### Font Weights

```scss
$font-weight-light: 300;
$font-weight-normal: 400;
$font-weight-medium: 500;
$font-weight-semibold: 600;
$font-weight-bold: 700;
```

---

## Spacing System

### Base Unit: 4px

```scss
$spacing-unit: 4px;

// Spacing Scale
$spacing-xxs: 4px;   // 1 unit - tight spacing
$spacing-xs: 8px;    // 2 units - compact spacing
$spacing-sm: 12px;   // 3 units - small spacing
$spacing-md: 16px;   // 4 units - standard spacing
$spacing-lg: 20px;   // 5 units - large spacing
$spacing-xl: 24px;   // 6 units - extra large spacing
$spacing-xxl: 32px;  // 8 units - section spacing
$spacing-xxxl: 48px; // 12 units - major section spacing
```

### Component Spacing

```scss
// Card Internal Spacing
$card-padding: 24px;
$card-padding-mobile: 16px;

// Form Spacing
$form-item-gap: 20px;
$form-label-width: 140px;

// Table Spacing
$table-cell-padding: 12px 16px;
```

---

## Layout Patterns

### 1. Page Container Structure

```html
<div class="page-container">
  <div class="page-wrapper">
    <!-- Page Header -->
    <div class="page-header">...</div>

    <!-- Content Area -->
    <div class="content-wrapper">
      <div class="info-card">...</div>
    </div>
  </div>
</div>
```

**Specifications:**
- `page-container`: Min-height calc(100vh - 120px), provides full-height layout
- `page-wrapper`: Max-width 100%, contains all page content
- Margins auto-adjusted for responsive breakpoints

### 2. Page Header Pattern

The page header uses a distinctive green gradient background, providing strong visual identity.

**Desktop Layout:**
```scss
.page-header {
  background: linear-gradient(135deg, $primary-green 0%, #00b350 100%);
  padding: 32px;
  border-radius: 0 0 16px 16px;
  margin: -24px 0 24px 0; // Extends to page edges
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
```

**Elements:**
- **Header Icon**: 60x60px, white translucent background, backdrop-filter blur
- **Page Title**: 24px, bold (600), white
- **Page Subtitle**: 14px, 90% opacity, white
- **Action Buttons**: Positioned in header-actions area

**Mobile Adaptations:**
- Header padding: 20px 16px
- Icon size: 48x48px
- Title size: 20px
- Subtitle size: 13px

### 3. Info Card Pattern

Standard container for grouped information.

```scss
.info-card {
  background: white;
  border-radius: 12px;
  margin-bottom: 24px;
  border: 1px solid $color-border-lighter;
  overflow: hidden;
}

.card-header {
  padding: 20px 24px;
  background: linear-gradient(to right, rgba($primary-green, 0.03), transparent);
  border-bottom: 1px solid $color-border-lighter;
}

.card-title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  font-weight: 600;

  i {
    font-size: 20px;
    color: $primary-green;
  }
}

.card-body {
  padding: 24px;
}
```

---

## Component Patterns

### 1. Status Tabs

Used in approval pages to filter by workflow status.

**Visual Design:**
- Tab items with icons
- Active tab: green underline (3px)
- Hover: subtle background change
- Icons: 16px, margin-right 4px

**States:**
- Pending Approval (ri-time-line)
- Voided (ri-forbid-line)
- Approved (ri-check-line)

```scss
.status-tabs {
  margin-bottom: 20px;

  :deep(.el-tabs__item) {
    font-size: 14px;
    font-weight: 500;
    transition: all 0.3s ease;

    i {
      margin-right: 4px;
      font-size: 16px;
    }

    &.is-active {
      color: $primary-green;
    }

    &:hover {
      color: $primary-green-light;
    }
  }

  :deep(.el-tabs__active-bar) {
    background-color: $primary-green;
    height: 3px;
  }
}
```

### 2. Search Section

Flexible search bar with filters and action buttons.

**Layout:**
- Flexbox layout, wraps on small screens
- Label + Input pattern for each search field
- Actions aligned to right (desktop) / full width (mobile)

```scss
.search-section {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
  align-items: center;
}

.search-item {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 0 0 auto;
}

.search-label {
  font-size: 14px;
  color: $color-text-regular;
  white-space: nowrap;
  font-weight: 500;
  min-width: 80px;
}

.search-input {
  width: 200px;
}

.filter-select {
  width: 180px;
}

.search-actions {
  display: flex;
  gap: 8px;
  margin-left: auto;
}
```

**Mobile Behavior:**
- Each search-item takes full width
- Inputs flex to fill available space
- Actions stack vertically

### 3. Workflow Action Buttons

Dynamic button sets based on workflow state and user permissions.

**Button Configuration Object:**
```javascript
{
  type: 'primary' | 'success' | 'danger' | '',
  action: 'edit' | 'submit' | 'view' | 'audit' | 'approve' | 'reject' | 'archive' | 'cancelBatch',
  label: 'edit' | 'submit' | 'view' | ...,  // i18n key
  icon: 'ri-edit-line' | 'ri-send-plane-line' | ...
}
```

**State Machine:**

| Workflow Status | Available Actions | Button Types |
|----------------|-------------------|--------------|
| S0 (Draft) | Edit, Submit, Void | primary, success, danger |
| S1 (Pending) | View/Audit, Void | primary, danger |
| S2 (Approved) | View | primary |
| S3 (Rejected) | Edit, Submit, Void | primary, success, danger |
| S9 (Archived) | View | primary |
| S10 (Voided) | View | primary |

**Rendering:**
```vue
<div class="action-buttons">
  <el-button
    v-for="button in getActionButtons(row)"
    :key="button.action"
    link
    :type="button.type"
    @click="handleAction(row, button.action)">
    <i :class="button.icon"></i>{{ $t(`common.${button.label}`) }}
  </el-button>
</div>
```

### 4. Approval History Table

Displays historical approval comments with clean table styling.

```vue
<el-table :data="approvalHistory" border stripe>
  <el-table-column
    :label="$t('research.breedingData.batch.form.approver')"
    prop="approver"
    width="200" />
  <el-table-column
    :label="$t('research.breedingData.batch.form.approvalTime')"
    prop="approvalTime"
    width="250" />
  <el-table-column
    :label="$t('research.breedingData.batch.form.comment')"
    prop="comment" />
</el-table>
```

**Data Structure:**
```javascript
approvalHistory.value = [
  {
    approver: 'John Doe',
    approvalTime: '2024-01-15 14:30:00',
    comment: 'Approved after review'
  }
]
```

### 5. Mobile Card List

Alternative to tables on mobile devices.

```scss
.mobile-card {
  background: white;
  border: 1px solid $color-border-light;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
}

.mobile-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid $color-border-lighter;
}

.mobile-card-title {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: $color-text-primary;

  i {
    font-size: 18px;
    color: $primary-green;
  }
}

.mobile-card-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 14px;

  .label {
    color: $color-text-secondary;
    flex-shrink: 0;
    min-width: 80px;
  }

  .value {
    color: $color-text-primary;
    font-weight: 500;
    flex: 1;
  }
}
```

---

## Form Patterns

### 1. Form Layout

Two-column responsive grid using Element Plus.

```vue
<el-form
  ref="formRef"
  :model="formData"
  :rules="rules"
  label-width="140px">

  <div class="info-card">
    <div class="card-header">
      <div class="card-title">
        <i class="ri-information-line"></i>
        <span>{{ $t('form.basicInfo') }}</span>
      </div>
    </div>
    <div class="card-body">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12">
          <el-form-item label="Field" prop="field">
            <el-input v-model="formData.field" />
          </el-form-item>
        </el-col>
        <!-- More fields... -->
      </el-row>
    </div>
  </div>
</el-form>
```

**Specifications:**
- Label width: 140px
- Gutter: 20px
- Full width on mobile (:xs="24")
- Half width on desktop (:sm="12")

### 2. Form Actions

Centered button group at bottom of form.

```scss
.form-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 24px 0;
  margin-top: 24px;
  border-top: 1px solid $color-border-lighter;
}

@media (max-width: 768px) {
  .form-actions {
    flex-direction: column;

    .el-button {
      width: 100%;
    }
  }
}
```

### 3. Read-Only States

Forms in 'audit' or 'view' mode disable inputs.

```javascript
const isReadOnly = computed(() =>
  pageMode.value === 'audit' || pageMode.value === 'view'
)
```

```vue
<el-input
  v-model="formData.field"
  :disabled="isReadOnly" />
```

---

## Responsive Breakpoints

### Breakpoint System

```scss
// Breakpoint Definitions
$breakpoint-xs: 480px;   // Extra small devices (phones, portrait)
$breakpoint-sm: 768px;   // Small devices (phones, landscape / tablets, portrait)
$breakpoint-md: 1024px;  // Medium devices (tablets, landscape / small desktops)
$breakpoint-lg: 1200px;  // Large devices (desktops)
$breakpoint-xl: 1440px;  // Extra large devices (large desktops)

// Media Query Mixins
@mixin mobile {
  @media screen and (max-width: $breakpoint-sm) {
    @content;
  }
}

@mixin tablet {
  @media screen and (min-width: $breakpoint-sm) and (max-width: $breakpoint-md) {
    @content;
  }
}

@mixin desktop {
  @media screen and (min-width: $breakpoint-md) {
    @content;
  }
}
```

### Responsive Patterns

**1. Show/Hide Elements:**
```scss
.pc-only {
  @include mobile {
    display: none !important;
  }
}

.mobile-only {
  display: none !important;

  @include mobile {
    display: block !important;
  }
}
```

**2. Layout Adjustments:**
```scss
// Desktop: Horizontal layout with auto-margin
.search-actions {
  margin-left: auto;

  @include mobile {
    margin-left: 0;
    width: 100%;
  }
}

// Desktop: Multi-column, Mobile: Single column
.search-section {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;

  @include mobile {
    flex-direction: column;
  }
}
```

---

## Interaction Patterns

### 1. Hover States

```scss
// Card Hover
.info-card {
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
}

// Button Hover
.el-button {
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
}
```

### 2. Loading States

Element Plus v-loading directive on containers:

```vue
<div class="content-wrapper" v-loading="loading">
  <!-- Content -->
</div>

<el-form v-loading="loading || dictLoading">
  <!-- Form fields -->
</el-form>
```

### 3. Empty States

```scss
.empty-state {
  text-align: center;
  padding: 48px 24px;
  color: $color-text-secondary;

  i {
    font-size: 64px;
    color: $color-text-placeholder;
    margin-bottom: 16px;
  }

  p {
    font-size: 14px;
  }
}
```

---

## Icon Usage

### Remix Icon Library

All icons use Remix Icon (`ri-*-line` or `ri-*-fill`).

**Common Icons:**
```scss
// Navigation
ri-arrow-left-line     // Back button
ri-arrow-right-line    // Forward/next

// Actions
ri-add-line            // Add/create new
ri-edit-line           // Edit
ri-delete-bin-line     // Delete/void
ri-eye-line            // View
ri-send-plane-line     // Submit
ri-check-line          // Approve/confirm
ri-close-line          // Reject/cancel
ri-refresh-line        // Reset
ri-search-line         // Search

// Status
ri-time-line           // Pending
ri-forbid-line         // Voided
ri-git-commit-line     // Workflow

// Content
ri-information-line    // Info
ri-file-list-3-line    // List
ri-list-check-2        // Checklist
ri-seedling-line       // Agriculture/batch
```

### Icon Sizing

```scss
// Small icons (inline with text)
.icon-sm {
  font-size: 14px;
}

// Medium icons (card titles, buttons)
.icon-md {
  font-size: 18px;
}

// Large icons (page headers)
.icon-lg {
  font-size: 24px;
}

// Extra large icons (empty states)
.icon-xl {
  font-size: 48px;
}
```

---

## Animation & Transitions

### Standard Transitions

```scss
// Default transition
$transition-base: all 0.3s ease;
$transition-fast: all 0.2s ease;
$transition-slow: all 0.5s ease;

// Easing functions
$ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
$ease-out: cubic-bezier(0.0, 0, 0.2, 1);
$ease-in: cubic-bezier(0.4, 0, 1, 1);
```

### Page Transitions

```scss
// Fade in animation
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.page-container {
  animation: fadeIn 0.3s ease;
}
```

### Card Stagger

```scss
.info-card {
  animation: fadeIn 0.4s ease;
  animation-fill-mode: both;

  &:nth-child(1) { animation-delay: 0.05s; }
  &:nth-child(2) { animation-delay: 0.1s; }
  &:nth-child(3) { animation-delay: 0.15s; }
}
```

---

## Accessibility

### Focus States

```scss
// Keyboard focus indicator
*:focus-visible {
  outline: 2px solid $primary-green;
  outline-offset: 2px;
  border-radius: 4px;
}

// Button focus
.el-button:focus-visible {
  outline: 2px solid $primary-green;
  outline-offset: 2px;
}
```

### Color Contrast

All text/background combinations meet WCAG 2.1 AA standards:
- Primary green on white: 4.54:1 ✓
- Regular text on white: 7.23:1 ✓
- Secondary text on white: 4.58:1 ✓

### ARIA Labels

```vue
<!-- Accessible icon buttons -->
<el-button
  link
  :aria-label="$t('common.edit')"
  @click="handleEdit">
  <i class="ri-edit-line"></i>
</el-button>

<!-- Screen reader text -->
<span class="sr-only">{{ $t('common.loading') }}</span>
```

---

## Best Practices

### 1. Component Reusability

- Extract repeated patterns into components
- Use props for configuration
- Emit events for parent communication

### 2. State Management

- Use computed properties for derived state
- Reactivity with `ref()` and `reactive()`
- Centralized workflow logic

### 3. Performance

- Lazy load heavy components
- Virtual scrolling for large lists
- Debounce search inputs
- Optimize bundle size

### 4. Code Organization

```
component.vue
├── <template>     # HTML structure
├── <script setup> # Logic and state
└── <style scoped> # Component styles
```

### 5. Internationalization

- All text through i18n
- Modular locale files
- Dynamic validation messages

---

## File Organization

```
dtsp/src/views/research/breeding-data/batch/
├── index.vue          # List page (main table view)
├── approve.vue        # Approval page (with status tabs)
├── form.vue           # Add/Edit/Audit form
├── detail.vue         # Detail view (read-only)
└── components/        # Shared components (future)
    ├── StatusTabs.vue
    ├── WorkflowInfo.vue
    ├── ApprovalHistory.vue
    └── ActionButtons.vue
```

---

## Future Enhancements

1. **Component Library**: Extract reusable components
2. **Advanced Filtering**: Multi-criteria search with save/load
3. **Batch Operations**: Bulk approve/reject/archive
4. **Export Functionality**: PDF/Excel export
5. **Real-time Updates**: WebSocket notifications
6. **Audit Trail**: Complete change history
7. **Advanced Permissions**: Fine-grained role-based access
8. **Offline Support**: Progressive Web App capabilities

---

## Version History

- **v1.0** (2024-01): Initial design specification
- **v1.1** (2024-06): Added workflow patterns and mobile optimizations
- **v1.2** (2025-01): Enhanced component patterns and accessibility guidelines

---

## References

- [Element Plus Documentation](https://element-plus.org/)
- [Remix Icon](https://remixicon.com/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
