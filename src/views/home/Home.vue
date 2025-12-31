<template>
  <div class="home-container">
    <div class="content-wrapper">
      <!-- Hero Section -->
      <div class="hero-section">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title">{{ $t('home.heroTitle') }}</h1>
            <p class="hero-subtitle">{{ $t('home.heroSubtitle') }}</p>
            <p class="hero-description">{{ $t('home.heroDescription') }}</p>
          </div>
          <div class="hero-image">
            <i class="ri-plant-fill"></i>
            <i class="ri-seedling-line"></i>
            <i class="ri-leaf-line"></i>
          </div>
        </div>
      </div>

      <!-- Announcements Section -->
      <div class="section announcements-section">
        <div class="section-header">
          <div class="section-title-wrapper">
            <i class="ri-notification-3-line section-icon"></i>
            <h2 class="section-title">{{ $t('home.announcement') }}</h2>
          </div>
          <div class="section-action" @click="handleMoreAnnouncements">
            {{ $t('home.viewAll') }}
            <i class="ri-arrow-right-line"></i>
          </div>
        </div>
        <div class="announcements-list">
          <div
            v-for="(item, index) in announcementList.slice(0,2)"
            :key="index"
            class="announcement-item"
            @click="handleAnnouncementClick(item)"
          >
            <div class="announcement-icon">
              <i class="ri-megaphone-line"></i>
            </div>
            <div class="announcement-content">
              <div class="announcement-title">{{ item.name }}</div>
              <div class="announcement-desc">{{ item.content }}</div>
            </div>
            <div class="announcement-time">{{ item.publicTime }}</div>
          </div>
          <div v-if="!announcementList || announcementList.length === 0" class="empty-state">
            <i class="ri-inbox-line"></i>
            <p>{{ $t('home.noData') }}</p>
          </div>
        </div>
      </div>

      <!-- System Entries Section -->
      <div class="section system-entries-section">
        <div class="section-header">
          <div class="section-title-wrapper">
            <i class="ri-apps-line section-icon"></i>
            <h2 class="section-title">{{ $t('home.systemEntries') }}</h2>
          </div>
        </div>
        <div class="system-grid">
          <div
            v-for="(module, key) in systemModules"
            :key="key"
            class="system-card"
            :class="{ 'disabled': module.disabled }"
            @click="!module.disabled && handleSystemClick(module)"
          >
            <div class="system-icon-wrapper" :style="{ background: module.gradient }">
              <i :class="module.icon"></i>
            </div>
            <div class="system-info">
              <h3 class="system-name">{{ module.name }}</h3>
              <p class="system-desc">{{ module.desc }}</p>
            </div>
            <div class="system-arrow" v-if="!module.disabled">
              <i class="ri-arrow-right-s-line"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Operation Guide Section -->
      <div class="section guide-section">
        <div class="section-header">
          <div class="section-title-wrapper">
            <i class="ri-book-open-line section-icon"></i>
            <h2 class="section-title">{{ $t('home.operationGuide') }}</h2>
          </div>
        </div>
        <div class="guide-grid">
          <div
            v-for="(guide, key) in guideItems"
            :key="key"
            class="guide-card"
            @click="handleGuideClick(guide)"
          >
            <div class="guide-icon" :style="{ color: guide.color }">
              <i :class="guide.icon"></i>
            </div>
            <div class="guide-content">
              <h3 class="guide-title">{{ guide.title }}</h3>
              <p class="guide-desc">{{ guide.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Announcement Detail Dialog -->
    <announcement-detail
      v-model:visible="detailDialogVisible"
      :announcement="currentAnnouncement"
    />
  </div>
</template>

<script setup>
import { reactive, onMounted, toRefs, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { getNoticeList } from '@/api/home'
import AnnouncementDetail from './components/AnnouncementDetail.vue'

const router = useRouter()
const { t } = useI18n()

const detailDialogVisible = ref(false)
const currentAnnouncement = ref({})
const pages = ref({
  pageNum: 1,
  pageSize: 6
})

const state = reactive({
  announcementList: [],
})

const { announcementList } = toRefs(state)

// 系统模块配置
const systemModules = computed(() => ({
  research: {
    name: t('home.modules.research.name'),
    desc: t('home.modules.research.desc'),
    icon: 'ri-flask-line',
    gradient: 'linear-gradient(135deg, #FEDD00 0%, #FFE94D 100%)',
    path: '/research'
  },
  input: {
    name: t('home.modules.input.name'),
    desc: t('home.modules.input.desc'),
    icon: 'ri-database-2-line',
    gradient: 'linear-gradient(135deg, #DA121A 0%, #FF3D47 100%)',
    path: '/input'
  },
  farm: {
    name: t('home.modules.farm.name'),
    desc: t('home.modules.farm.desc'),
    icon: 'ri-landscape-line',
    gradient: 'linear-gradient(135deg, #52C41A 0%, #95DE64 100%)',
    path: 'http://196.189.236.220:31100/',
    external: true
  },
  production: {
    name: t('home.modules.production.name'),
    desc: t('home.modules.production.desc'),
    icon: 'ri-seedling-line',
    gradient: 'linear-gradient(135deg, #52C41A 0%, #73D13D 100%)',
    path: 'http://196.189.236.220:31100/',
    external: true
  },
  procurement: {
    name: t('home.modules.procurement.name'),
    desc: t('home.modules.procurement.desc'),
    icon: 'ri-shopping-cart-line',
    gradient: 'linear-gradient(135deg, #909399 0%, #B0B4B8 100%)', // 置灰
    path: '/procurement',
    disabled: true // 禁用
  },
  traceability: {
    name: t('home.modules.traceability.name'),
    desc: t('home.modules.traceability.desc'),
    icon: 'ri-qr-code-line',
    gradient: 'linear-gradient(135deg, #909399 0%, #B0B4B8 100%)', // 置灰
    path: '/traceability',
    disabled: true // 禁用
  },
  data: {
    name: t('home.modules.data.name'),
    desc: t('home.modules.data.desc'),
    icon: 'ri-bar-chart-box-line',
    gradient: 'linear-gradient(135deg, #909399 0%, #B0B4B8 100%)', // 置灰
    path: '/data',
    disabled: true // 禁用
  },
  farm: {
    name: t('home.modules.farm.name'),
    desc: t('home.modules.farm.desc'),
    icon: 'ri-landscape-line',
    gradient: 'linear-gradient(135deg, #52C41A 0%, #95DE64 100%)',
    path: 'http://196.189.236.220:31100/',
    external: true
  }
}))

// 操作指南配置
const guideItems = computed(() => ({
  userManual: {
    title: t('home.guides.userManual.title'),
    desc: t('home.guides.userManual.desc'),
    icon: 'ri-file-text-line',
    color: '#009A44'
  },
  farmerGuide: {
    title: t('home.guides.farmerGuide.title'),
    desc: t('home.guides.farmerGuide.desc'),
    icon: 'ri-user-line',
    color: '#FEDD00'
  },
  supplierGuide: {
    title: t('home.guides.supplierGuide.title'),
    desc: t('home.guides.supplierGuide.desc'),
    icon: 'ri-building-line',
    color: '#DA121A'
  },
  apiDocs: {
    title: t('home.guides.apiDocs.title'),
    desc: t('home.guides.apiDocs.desc'),
    icon: 'ri-code-box-line',
    color: '#1890FF'
  }
}))

onMounted(() => {
  getNoticeData()
})

// 获取公告数据
const getNoticeData = async () => {
  try {
    const res = await getNoticeList(pages.value)
    if (res.code === 200 && res.data) {
      state.announcementList = res.data?.data || []
    }
  } catch (error) {
    console.log('error', error)
  }
}

const handleAnnouncementClick = (item) => {
  currentAnnouncement.value = { ...item }
  detailDialogVisible.value = true
}

const handleMoreAnnouncements = () => {
  router.push({
    path: '/dataList',
    query: { name: 'systemAnnouncement' }
  })
}

const handleSystemClick = (module) => {
  console.log('点击系统模块:', module)
  if (module.path) {
    if (module.external) {
      window.open(module.path, '_blank')
    } else {
      router.push(module.path)
    }
  }
}

const handleGuideClick = (guide) => {
  console.log('点击操作指南:', guide)
  // TODO: 打开文档
}
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  background: linear-gradient(to bottom, #f8fafb 0%, #ffffff 100%);
  padding: 0;
}

.content-wrapper {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px 32px 40px;
}

/* Hero Section */
.hero-section {
  padding: 60px 0;
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.05) 0%, rgba(254, 221, 0, 0.03) 100%);
  border-radius: 16px;
  margin-bottom: 40px;
  position: relative;
  overflow: hidden;
  padding: 20px;
}

.hero-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 60px;
}

.hero-text {
  flex: 1;
  max-width: 700px;
}

.hero-title {
  font-size: 42px;
  font-weight: 800;
  color: #009A44;
  margin: 0 0 20px 0;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 24px;
  font-weight: 600;
  color: #FEDD00;
  margin: 0 0 16px 0;
  line-height: 1.4;
}

.hero-description {
  font-size: 16px;
  color: #606266;
  line-height: 1.8;
  margin: 0;
}

.hero-image {
  flex-shrink: 0;
  display: flex;
  gap: 20px;
}

.hero-image i {
  font-size: 120px;
  opacity: 0.15;
}

.hero-image i:nth-child(1) { color: #009A44; }
.hero-image i:nth-child(2) { color: #FEDD00; }
.hero-image i:nth-child(3) { color: #DA121A; }

/* Section Styles */
.section {
  background: white;
  border-radius: 12px;
  padding: 32px;
  margin-bottom: 32px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
}

.section-title-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}

.section-icon {
  font-size: 28px;
  color: #009A44;
}

.section-title {
  font-size: 24px;
  font-weight: 700;
  color: #303133;
  margin: 0;
}

.section-action {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #009A44;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  padding: 8px 16px;
  border-radius: 8px;
}

.section-action:hover {
  background: rgba(0, 154, 68, 0.08);
  transform: translateX(4px);
}

.section-action i {
  transition: transform 0.3s ease;
}

.section-action:hover i {
  transform: translateX(4px);
}

/* Announcements */
.announcements-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.announcement-item {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  border-radius: 10px;
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.02) 0%, rgba(254, 221, 0, 0.01) 100%);
  border: 1px solid rgba(0, 0, 0, 0.06);
  cursor: pointer;
  transition: all 0.3s ease;
}

.announcement-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 154, 68, 0.1);
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.05) 0%, rgba(254, 221, 0, 0.03) 100%);
}

.announcement-icon {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.announcement-icon i {
  font-size: 24px;
  color: white;
}

.announcement-content {
  flex: 1;
  min-width: 0;
}

.announcement-title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.announcement-desc {
  font-size: 14px;
  color: #909399;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.announcement-time {
  flex-shrink: 0;
  font-size: 13px;
  color: #C0C4CC;
  font-weight: 500;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #C0C4CC;
}

.empty-state i {
  font-size: 64px;
  margin-bottom: 16px;
}

.empty-state p {
  font-size: 16px;
  margin: 0;
}

/* System Grid */
.system-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
}

.system-card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 24px;
  border-radius: 12px;
  background: white;
  border: 2px solid rgba(0, 0, 0, 0.06);
  cursor: pointer;
  transition: all 0.3s ease;
}

.system-card.disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
  border-color: rgba(0, 0, 0, 0.06) !important;
}

.system-card.disabled:hover {
  transform: none !important;
  box-shadow: none !important;
  border-color: rgba(0, 0, 0, 0.06) !important;
}

.system-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  border-color: rgba(0, 154, 68, 0.3);
}

.system-icon-wrapper {
  flex-shrink: 0;
  width: 64px;
  height: 64px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.system-icon-wrapper i {
  font-size: 32px;
  color: white;
}

.system-info {
  flex: 1;
  min-width: 0;
}

.system-name {
  font-size: 18px;
  font-weight: 700;
  color: #303133;
  margin: 0 0 8px 0;
}

.system-desc {
  font-size: 14px;
  color: #909399;
  margin: 0;
  line-height: 1.5;
}

.system-arrow {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  background: rgba(0, 154, 68, 0.08);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.system-card:hover .system-arrow {
  background: rgba(0, 154, 68, 0.15);
  transform: translateX(4px);
}

.system-arrow i {
  font-size: 20px;
  color: #009A44;
}

/* Guide Grid */
.guide-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

.guide-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 32px 24px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.02) 0%, rgba(255, 255, 255, 1) 100%);
  border: 2px solid rgba(0, 0, 0, 0.06);
  cursor: pointer;
  transition: all 0.3s ease;
}

.guide-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.12);
  background: white;
}

.guide-icon {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: rgba(0, 154, 68, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  transition: all 0.3s ease;
}

.guide-card:hover .guide-icon {
  transform: scale(1.1);
}

.guide-icon i {
  font-size: 36px;
}

.guide-content {
  flex: 1;
}

.guide-title {
  font-size: 18px;
  font-weight: 700;
  color: #303133;
  margin: 0 0 12px 0;
}

.guide-desc {
  font-size: 14px;
  color: #909399;
  margin: 0;
  line-height: 1.6;
}

/* Responsive */
@media screen and (max-width: 1200px) {
  .content-wrapper {
    padding: 0 24px 32px;
  }

  .hero-title {
    font-size: 36px;
  }

  .hero-subtitle {
    font-size: 20px;
  }

  .system-grid,
  .guide-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}

@media screen and (max-width: 768px) {
  .content-wrapper {
    padding: 0 16px 24px;
  }

  .hero-section {
    padding: 40px 20px;
  }

  .hero-content {
    flex-direction: column;
    gap: 32px;
  }

  .hero-title {
    font-size: 28px;
  }

  .hero-subtitle {
    font-size: 18px;
  }

  .hero-image {
    display: none;
  }

  .section {
    padding: 24px 16px;
  }

  .section-title {
    font-size: 20px;
  }

  .system-grid,
  .guide-grid {
    grid-template-columns: 1fr;
  }

  .announcement-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .announcement-time {
    align-self: flex-end;
  }
}
</style>
