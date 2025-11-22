<template>
  <div class="identity-container">
    <!-- Page Header -->
    <div class="identity-header">
      <div class="header-icon">
        <i class="ri-shield-user-line"></i>
      </div>
      <h1 class="header-title">{{ $t('identity.title') }}</h1>
      <p class="header-subtitle">{{ $t('identity.subtitle') }}</p>
      <p class="header-description">{{ $t('identity.description') }}</p>
    </div>

    <!-- Identity Cards -->
    <div class="cards-wrapper">
      <div class="cards-row">
        <!-- Farmer Verification -->
        <div class="identity-card farmer-card" @click="goApply('farmer')">
          <div class="card-header">
            <div class="status-badge" :class="getStatusClass('farmer')">
              <i :class="getStatusIcon('farmer')"></i>
              {{ getStatusLabel('farmer') }}
            </div>
          </div>

          <div class="card-visual">
            <div class="icon-wrapper farmer-icon">
              <i class="ri-plant-line"></i>
            </div>
            <div class="visual-bg"></div>
          </div>

          <div class="card-content">
            <h3 class="card-title">{{ $t('identity.farmerTitle') }}</h3>
            <p class="card-desc">{{ $t('identity.farmerDesc') }}</p>
          </div>

          <div class="card-action">
            <span>{{ $t('identity.goApply') }}</span>
            <i class="ri-arrow-right-line"></i>
          </div>
        </div>

        <!-- Supplier Verification -->
        <div class="identity-card supplier-card" @click="goApply('supplier')">
          <div class="card-header">
            <div class="status-badge" :class="getStatusClass('supplier')">
              <i :class="getStatusIcon('supplier')"></i>
              {{ getStatusLabel('supplier') }}
            </div>
          </div>

          <div class="card-visual">
            <div class="icon-wrapper supplier-icon">
              <i class="ri-store-2-line"></i>
            </div>
            <div class="visual-bg"></div>
          </div>

          <div class="card-content">
            <h3 class="card-title">{{ $t('identity.supplierTitle') }}</h3>
            <p class="card-desc">{{ $t('identity.supplierDesc') }}</p>
          </div>

          <div class="card-action">
            <span>{{ $t('identity.goApply') }}</span>
            <i class="ri-arrow-right-line"></i>
          </div>
        </div>

        <!-- Buyer Verification -->
        <div class="identity-card buyer-card" @click="goApply('buyer')">
          <div class="card-header">
            <div class="status-badge" :class="getStatusClass('buyer')">
              <i :class="getStatusIcon('buyer')"></i>
              {{ getStatusLabel('buyer') }}
            </div>
          </div>

          <div class="card-visual">
            <div class="icon-wrapper buyer-icon">
              <i class="ri-shopping-basket-2-line"></i>
            </div>
            <div class="visual-bg"></div>
          </div>

          <div class="card-content">
            <h3 class="card-title">{{ $t('identity.buyerTitle') }}</h3>
            <p class="card-desc">{{ $t('identity.buyerDesc') }}</p>
          </div>

          <div class="card-action">
            <span>{{ $t('identity.goApply') }}</span>
            <i class="ri-arrow-right-line"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Decorative Elements -->
    <div class="decorative-elements">
      <i class="ri-leaf-line deco-1"></i>
      <i class="ri-seedling-line deco-2"></i>
      <i class="ri-plant-fill deco-3"></i>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/store'

const router = useRouter()
const { t } = useI18n()
const userStore = useUserStore()

// Get certification status from backend or user info
// Available statuses: notCertified, underReview, certified, rejected
const identityStatus = computed(() => ({
  farmer: 'notCertified',
  supplier: 'underReview',
  buyer: 'rejected'
}))

const getStatusLabel = (type) => {
  const status = identityStatus.value[type] || 'notCertified'
  return t(`identity.status.${status}`)
}

const getStatusClass = (type) => {
  const status = identityStatus.value[type] || 'notCertified'
  const classMap = {
    notCertified: 'status-default',
    underReview: 'status-warning',
    certified: 'status-success',
    rejected: 'status-danger'
  }
  return classMap[status] || 'status-default'
}

const getStatusIcon = (type) => {
  const status = identityStatus.value[type] || 'notCertified'
  const iconMap = {
    notCertified: 'ri-question-line',
    underReview: 'ri-time-line',
    certified: 'ri-checkbox-circle-line',
    rejected: 'ri-close-circle-line'
  }
  return iconMap[status] || 'ri-question-line'
}

const goApply = (type) => {
  const pathMap = {
    farmer: '/identity/farmer',
    supplier: '/identity/supplier',
    buyer: '/identity/buyer'
  }
  router.push(pathMap[type] || '/identity')
}
</script>

<style scoped>
.identity-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 24px 80px;
  position: relative;
  min-height: calc(100vh - 200px);
}

/* Header Styles */
.identity-header {
  text-align: center;
  margin-bottom: 48px;
}

.header-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.1) 0%, rgba(254, 221, 0, 0.1) 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(0, 154, 68, 0.2);
}

.header-icon i {
  font-size: 40px;
  color: #009A44;
}

.header-title {
  font-size: 36px;
  font-weight: 800;
  color: #009A44;
  margin: 0 0 12px 0;
  letter-spacing: 1px;
}

.header-subtitle {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
  margin: 0 0 8px 0;
}

.header-description {
  font-size: 15px;
  color: #909399;
  margin: 0;
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Cards Wrapper */
.cards-wrapper {
  display: flex;
  justify-content: center;
}

.cards-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  width: 100%;
}

/* Identity Card */
.identity-card {
  position: relative;
  background: white;
  border-radius: 16px;
  padding: 28px 24px;
  cursor: pointer;
  transition: all 0.4s ease;
  border: 2px solid rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

.identity-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  border-radius: 16px 16px 0 0;
  transition: all 0.3s ease;
}

.farmer-card::before {
  background: linear-gradient(90deg, #009A44 0%, #00b350 100%);
}

.supplier-card::before {
  background: linear-gradient(90deg, #FEDD00 0%, #FFE94D 100%);
}

.buyer-card::before {
  background: linear-gradient(90deg, #DA121A 0%, #FF3D47 100%);
}

.identity-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 154, 68, 0.15);
  border-color: rgba(0, 154, 68, 0.3);
}

.identity-card:hover::before {
  height: 6px;
}

/* Card Header */
.card-header {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 2;
}

.status-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.status-badge i {
  font-size: 14px;
}

.status-default {
  background: rgba(144, 147, 153, 0.1);
  color: #909399;
  border: 1px solid rgba(144, 147, 153, 0.2);
}

.status-warning {
  background: rgba(254, 221, 0, 0.15);
  color: #B8860B;
  border: 1px solid rgba(254, 221, 0, 0.3);
}

.status-success {
  background: rgba(0, 154, 68, 0.1);
  color: #009A44;
  border: 1px solid rgba(0, 154, 68, 0.2);
}

.status-danger {
  background: rgba(218, 18, 26, 0.1);
  color: #DA121A;
  border: 1px solid rgba(218, 18, 26, 0.2);
}

/* Card Visual */
.card-visual {
  position: relative;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.icon-wrapper {
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  transition: all 0.4s ease;
}

.icon-wrapper i {
  font-size: 48px;
  color: white;
}

.farmer-icon {
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  box-shadow: 0 12px 24px rgba(0, 154, 68, 0.3);
}

.supplier-icon {
  background: linear-gradient(135deg, #FEDD00 0%, #FFE94D 100%);
  box-shadow: 0 12px 24px rgba(254, 221, 0, 0.4);
}

.supplier-icon i {
  color: #333;
}

.buyer-icon {
  background: linear-gradient(135deg, #DA121A 0%, #FF3D47 100%);
  box-shadow: 0 12px 24px rgba(218, 18, 26, 0.3);
}

.identity-card:hover .icon-wrapper {
  transform: scale(1.08);
}

.visual-bg {
  position: absolute;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 154, 68, 0.06) 0%, transparent 70%);
}

/* Card Content */
.card-content {
  text-align: center;
  margin-bottom: 20px;
}

.card-title {
  font-size: 20px;
  font-weight: 700;
  color: #303133;
  margin: 0 0 10px 0;
}

.card-desc {
  font-size: 14px;
  color: #909399;
  margin: 0;
  line-height: 1.6;
}

/* Card Action */
.card-action {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  color: #009A44;
  font-size: 15px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.card-action i {
  transition: transform 0.3s ease;
}

.identity-card:hover .card-action {
  color: #007a36;
}

.identity-card:hover .card-action i {
  transform: translateX(4px);
}

/* Decorative Elements */
.decorative-elements {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
}

.decorative-elements i {
  position: absolute;
  opacity: 0.05;
}

.deco-1 {
  font-size: 200px;
  color: #009A44;
  top: 10%;
  left: -5%;
  transform: rotate(-15deg);
}

.deco-2 {
  font-size: 150px;
  color: #FEDD00;
  top: 60%;
  right: -3%;
  transform: rotate(20deg);
}

.deco-3 {
  font-size: 120px;
  color: #DA121A;
  bottom: 5%;
  left: 10%;
  transform: rotate(-10deg);
}

/* Responsive */
@media screen and (max-width: 1024px) {
  .cards-row {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
}

@media screen and (max-width: 768px) {
  .identity-container {
    padding: 32px 16px 60px;
  }

  .header-icon {
    width: 64px;
    height: 64px;
    margin-bottom: 16px;
  }

  .header-icon i {
    font-size: 32px;
  }

  .header-title {
    font-size: 28px;
  }

  .header-subtitle {
    font-size: 16px;
  }

  .cards-row {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .identity-card {
    padding: 24px 20px;
  }

  .card-visual {
    height: 120px;
  }

  .icon-wrapper {
    width: 80px;
    height: 80px;
  }

  .icon-wrapper i {
    font-size: 40px;
  }

  .card-title {
    font-size: 18px;
  }

  .decorative-elements {
    display: none;
  }
}
</style>
