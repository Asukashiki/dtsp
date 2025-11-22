<template>
  <div class="identity-container">
    <div class="identity-header">
      <div class="title-row">
        <span class="line"></span>
        <h2>用户身份认证</h2>
        <span class="line"></span>
      </div>
      <p>请选择认证类型</p>
    </div>

    <div class="cards-wrapper">
      <div class="cards-row">
        <!-- 农民认证 -->
        <div class="identity-card" @click="goApply('farmer')">
          <el-tag class="status-badge" :type="statusMap('farmer').tagType" effect="plain">
            {{ statusMap('farmer').label }}
          </el-tag>

          <div class="card-visual">
            <div class="beams"></div>
            <div class="hexagon">
              <i class="ri-shield-check-line"></i>
            </div>
            <div class="platform"></div>
          </div>

          <div class="card-text">
            <div class="card-title">农民认证申请</div>
            <div class="card-desc">面向个人农户的身份认证，便于接入相关服务</div>
          </div>

          <div class="card-action">去填写 ></div>
        </div>

        <!-- 供应商认证 -->
        <div class="identity-card" @click="goApply('supplier')">
          <el-tag class="status-badge" :type="statusMap('supplier').tagType" effect="plain">
            {{ statusMap('supplier').label }}
          </el-tag>

          <div class="card-visual">
            <div class="beams"></div>
            <div class="hexagon">
              <i class="ri-archive-stack-line"></i>
            </div>
            <div class="platform"></div>
          </div>

          <div class="card-text">
            <div class="card-title">供应商认证申请</div>
            <div class="card-desc">面向供应商主体的身份认证，支持供给侧业务接入</div>
          </div>

          <div class="card-action">去填写 ></div>
        </div>

        <!-- 收购商认证 -->
        <div class="identity-card" @click="goApply('buyer')">
          <el-tag class="status-badge" :type="statusMap('buyer').tagType" effect="plain">
            {{ statusMap('buyer').label }}
          </el-tag>

          <div class="card-visual">
            <div class="beams"></div>
            <div class="hexagon">
              <i class="ri-user-3-line"></i>
            </div>
            <div class="platform"></div>
          </div>

          <div class="card-text">
            <div class="card-title">收购商认证申请</div>
            <div class="card-desc">面向收购主体的身份认证，便于开展交易与协作</div>
          </div>

          <div class="card-action">去填写 ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { useUserStore } from '@/store'

const router = useRouter()
const userStore = useUserStore()

// 模拟从后端或用户信息中获取当前三类认证状态
// 可选状态：未认证、审核中、已认证、已驳回
// 实际接入时从接口获取并替换该计算逻辑
const identityStatus = computed(() => ({
  farmer: '未认证',
  supplier: '审核中',
  buyer: '已驳回'
}))

const statusMap = (type) => {
  const label = identityStatus.value[type] || '未认证'
  const tagTypeMap = {
    '未认证': 'info',
    '审核中': 'warning',
    '已认证': 'success',
    '已驳回': 'danger'
  }
  return { label, tagType: tagTypeMap[label] || 'info' }
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
  padding: 36px 16px;
}

.identity-header { text-align: center; }
.title-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}
.title-row .line {
  display: inline-block;
  width: 120px;
  height: 2px;
  background: linear-gradient(90deg, rgba(28,89,226,0) 0%, #1c59e2 50%, rgba(28,89,226,0) 100%);
}
.identity-header h2 {
  margin: 0;
  font-size: 28px;
  font-weight: 600;
  letter-spacing: 2px;
  color: #2c3e50;
}
.identity-header p {
  margin: 12px 0 0;
  color: #7f8c8d;
}

.cards-wrapper { display: flex; justify-content: center; }
.cards-row {
  margin-top: 28px; /* 中上位置 */
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  width: 100%;
}

.identity-card {
  position: relative;
  background: #ffffff;
  border-radius: 10px;
  padding: 16px 16px 18px;
  cursor: pointer;
  transition: all .25s ease;
  border: 1px solid #e6ebf2;
  overflow: hidden;
}
.identity-card:hover { box-shadow: 0 20px 48px rgba(28,89,226,.18); transform: translateY(-6px); border-color: #d7e3ff; }

.status-badge { position: absolute; top: 10px; right: 10px; z-index: 2; }

.card-visual { position: relative; height: 150px; display:flex; align-items:center; justify-content:center; }
.beams {
  position: absolute; bottom: 44px; width: 180px; height: 90px;
  background: radial-gradient(ellipse at center, rgba(28,89,226,0.22), rgba(28,89,226,0) 70%);
  filter: blur(1px);
}
.hexagon {
  position: relative; width: 84px; height: 72px;
  background: rgba(28,89,226,0.10);
  clip-path: polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0% 50%);
  border: 2px solid rgba(28,89,226,0.5);
  box-shadow: 0 0 0 4px rgba(28,89,226,0.06) inset;
}
.hexagon::after {
  content: ""; position: absolute; inset: -8px; clip-path: inherit; border: 6px solid rgba(28,89,226,0.08);
  filter: blur(6px);
}
.hexagon i { position:absolute; left:50%; top:50%; transform: translate(-50%, -50%); font-size: 28px; color: #1c59e2; }
.identity-card:hover .hexagon { border-color: #1c59e2; box-shadow: 0 0 0 6px rgba(28,89,226,0.08) inset, 0 0 18px rgba(28,89,226,0.25); }

.platform {
  position: absolute; bottom: 0; width: 180px; height: 18px; border-radius: 9px; background: #eef3fe; box-shadow: inset 0 -2px 0 #c8d5e2;
}

.card-text { text-align: center; margin-top: 6px; }
.card-title { font-size: 16px; font-weight: 600; color: #303133; }
.card-desc { margin-top: 4px; color: #606266; font-size: 13px; }
.card-action { margin-top: 10px; color: #1c59e2; font-size: 14px; text-align:center; }

@media screen and (max-width: 1200px) {
  .cards-row { grid-template-columns: repeat(3, 1fr); gap: 16px; }
}
@media screen and (max-width: 992px) {
  .cards-row { grid-template-columns: 1fr; }
}
</style>
