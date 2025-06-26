<template>
  <div class="footer">
    <div class="footer-content">
      <div class="footer-logo">
        <i class="ri-database-2-line"></i>
        <span>数智化转型支撑平台</span>
      </div>
      <div class="footer-info">
        <div class="contact-row">
          <div class="info-item">联系方式：010-68558570</div>
          <div class="info-divider">|</div>
          <div class="info-item">服务时间：工作日 09:00-17:00</div>
        </div>
        <div class="company-info">浪潮软件科技有限公司版权所有</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.footer {
  background-color: #2c3e50;
  color: #fff;
  padding: 20px 0;
  margin-top: 20px;
  width: 100%;
}

.footer-content {
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.footer-logo {
  display: flex;
  align-items: center;
  font-size: 18px;
  margin-bottom: 15px;
}

.footer-logo i {
  margin-right: 10px;
  font-size: 24px;
}

.footer-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.contact-row {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.info-item {
  font-size: 14px;
}

.info-divider {
  margin: 0 15px;
}

.company-info {
  font-size: 14px;
}

/* 响应式调整 */
@media screen and (max-width: 1440px) {
  .footer-content {
    max-width: 1200px;
  }
}

@media screen and (max-width: 768px) {
  .footer-info {
    flex-direction: column;
  }
  
  .info-divider {
    display: none;
  }
  
  .info-item {
    margin: 5px 0;
  }
}
</style> 