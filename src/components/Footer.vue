<template>
  <div class="footer">
    <div class="footer-content">
      <!-- Footer Top Section -->
      <div class="footer-top">
        <div class="footer-left">
          <div class="footer-logo">
            <div class="logo-icon-wrapper">
              <i class="ri-plant-line"></i>
            </div>
            <div class="logo-text">
              <span class="footer-title">{{ $t('footer.platformNameShort') }}</span>
              <span class="footer-subtitle">{{ $t('footer.platformName') }}</span>
            </div>
          </div>
          <p class="footer-description">
            {{ $t('home.heroDescription') }}
          </p>
        </div>

        <div class="footer-right">
          <div class="footer-section">
            <h4 class="section-title">{{ $t('footer.contact') }}</h4>
            <div class="contact-list">
              <div class="contact-item">
                <i class="ri-map-pin-line"></i>
                <span>{{ $t('footer.address') }}</span>
              </div>
              <div class="contact-item">
                <i class="ri-phone-line"></i>
                <span>{{ $t('footer.phone') }}</span>
              </div>
              <div class="contact-item">
                <i class="ri-mail-line"></i>
                <span>{{ $t('footer.email') }}</span>
              </div>
            </div>
          </div>

          <div class="footer-section">
            <h4 class="section-title">{{ $t('footer.serviceTime') }}</h4>
            <div class="service-info">
              <i class="ri-time-line"></i>
              <span>08:30 - 17:30</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Bottom Section -->
      <div class="footer-bottom">
        <div class="copyright">
          {{ $t('footer.copyright') }}
        </div>
        <div class="footer-tags">
          <span class="tag">
            <i class="ri-seedling-line"></i>
            Smart Agriculture
          </span>
          <span class="tag">
            <i class="ri-global-line"></i>
            Ethiopia
          </span>
          <span class="tag">
            <i class="ri-database-2-line"></i>
            Big Data Platform
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped>
.footer {
  background: linear-gradient(135deg, #006b31 0%, #009A44 100%);
  color: #fff;
  padding: 48px 0 24px;
  margin-top: 60px;
  width: 100%;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
}

.footer-content {
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 0 32px;
  box-sizing: border-box;
}

.footer-top {
  display: flex;
  justify-content: space-between;
  gap: 60px;
  padding-bottom: 40px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
}

.footer-left {
  flex: 1;
  max-width: 500px;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.logo-icon-wrapper {
  width: 48px;
  height: 48px;
  background: rgba(254, 221, 0, 0.15);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(254, 221, 0, 0.3);
}

.logo-icon-wrapper i {
  font-size: 28px;
  color: #FEDD00;
}

.logo-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.footer-title {
  font-size: 20px;
  font-weight: 700;
  color: white;
  letter-spacing: 0.5px;
}

.footer-subtitle {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.75);
  font-weight: 500;
}

.footer-description {
  font-size: 14px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.85);
  margin: 0;
}

.footer-right {
  display: flex;
  gap: 60px;
}

.footer-section {
  min-width: 200px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #FEDD00;
  margin: 0 0 20px 0;
  letter-spacing: 0.5px;
}

.contact-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.6;
}

.contact-item i {
  font-size: 18px;
  color: #FEDD00;
  flex-shrink: 0;
}

.service-info {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.85);
  background: rgba(255, 255, 255, 0.1);
  padding: 12px 16px;
  border-radius: 8px;
  border-left: 3px solid #FEDD00;
}

.service-info i {
  font-size: 20px;
  color: #FEDD00;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 24px;
  flex-wrap: wrap;
  gap: 16px;
}

.copyright {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
}

.footer-tags {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.tag {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: rgba(254, 221, 0, 0.12);
  border: 1px solid rgba(254, 221, 0, 0.25);
  border-radius: 20px;
  font-size: 12px;
  color: #FEDD00;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.tag i {
  font-size: 14px;
}

/* 响应式调整 */
@media screen and (max-width: 1440px) {
  .footer-content {
    max-width: 1200px;
  }

  .footer-top {
    gap: 40px;
  }

  .footer-right {
    gap: 40px;
  }
}

@media screen and (max-width: 1024px) {
  .footer-top {
    flex-direction: column;
    gap: 40px;
  }

  .footer-left {
    max-width: 100%;
  }

  .footer-right {
    flex-wrap: wrap;
  }
}

@media screen and (max-width: 768px) {
  .footer {
    padding: 32px 0 20px;
    margin-top: 40px;
  }

  .footer-content {
    padding: 0 20px;
  }

  .footer-top {
    padding-bottom: 28px;
  }

  .footer-logo {
    margin-bottom: 16px;
  }

  .footer-title {
    font-size: 18px;
  }

  .footer-description {
    font-size: 13px;
  }

  .footer-right {
    gap: 30px;
    flex-direction: column;
  }

  .footer-section {
    min-width: auto;
  }

  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
    padding-top: 20px;
  }

  .copyright {
    font-size: 12px;
  }

  .footer-tags {
    width: 100%;
  }

  .tag {
    font-size: 11px;
    padding: 5px 10px;
  }
}
</style>
