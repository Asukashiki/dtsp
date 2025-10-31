<template>
  <div class="application-container">
    <div class="application-header">
      <h1>{{ isDetailMode ? '应用详情' : '应用注册' }}</h1>
      <p>{{ isDetailMode ? '查看应用申请详细信息' : '注册您的应用以获取验证，开始使用我们的服务' }}</p>
    </div>
    
    <div class="application-form" v-loading="loading">
      <el-form
        :model="formData"
        label-position="top"
        :rules="rules"
        ref="appForm"
        :disabled="isDetailMode"
      >
        <div class="form-row"> 
          <el-form-item label="应用编码" prop="appCode">
            <el-input v-model="formData.appCode" :placeholder="ph('请输入应用编码')"></el-input>
          </el-form-item>
          <el-form-item label="应用名称" prop="appName">
            <el-input v-model="formData.appName" :placeholder="ph('请输入应用名称')"></el-input>
          </el-form-item>
        </div>
        
        <div class="form-row">
          <el-form-item label="应用类型" prop="appType">
            <el-select v-model="formData.appType" :placeholder="ph('请选择应用类型')" class="full-width">
              <el-option v-for="item in appTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="应用简称" prop="appShortName">
            <el-input v-model="formData.appShortName" :placeholder="ph('请输入应用简称')"></el-input>
          </el-form-item>
        </div>
        
        <div class="form-row">
          <el-form-item label="协议类型" prop="potocal">
            <el-select v-model="formData.potocal" :placeholder="ph('请选择协议类型')" class="full-width">
              <el-option v-for="item in protocolTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="应用分类" prop="appCategory">
            <el-select v-model="formData.appCategory" placeholder="请选择应用分类" class="full-width">
              <el-option v-for="item in appCategoryOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="回调地址" prop="callbackUrl">
            <el-input v-model="formData.callbackUrl" :placeholder="ph('请输入回调地址')"></el-input>
          </el-form-item>
        </div>
        
        <div class="form-row">
          <el-form-item label="客户端编码" prop="clientCode">
            <el-input v-model="formData.clientCode" :placeholder="ph('请输入客户端编码')"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="formData.remark" :placeholder="ph('请输入备注')"></el-input>
          </el-form-item>
        </div>
        
      </el-form>
    </div>
    <!-- 统一操作区：放在表单外，两个模式统一位置显示按钮 -->
    <div class="form-actions">
      <template v-if="!isDetailMode">
        <el-button @click="cancelApplication">清空内容</el-button>
        <el-button type="primary" color="#1C59E2" @click="submitApplication" :loading="loading">提交申请</el-button>
        <el-button @click="goToRecordList">申请记录</el-button>
      </template>
      <template v-else>
        <el-button @click="goBack">返回</el-button>
      </template>
    </div>
    
    <div class="application-guide">
      <div class="guide-header">
        <div class="guide-icon">
          <img src="../../assets/application.svg" alt="应用" class="guide-svg" />
        </div>
        <h3>应用接入说明</h3>
      </div>
      
      <div class="guide-steps">
        <div class="step-item">
          <div class="step-title">1. 应用审核</div>
          <p>提交申请后，我们将在 1-3 个工作日内完成审核，审核结果请留意流程</p>
        </div>
        
        <div class="step-item">
          <div class="step-title">2. 获取凭证</div>
          <p>审核通过后，您可以获取客户端编码和密钥，用于登录数智化转型支撑平台认证中心</p>
        </div>
        
        <div class="step-item">
          <div class="step-title">3. 开发对接</div>
          <p>请参考开发文档进行接口调用，如遇问题可通过向平台管理员寻求技术支持</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { postAppRegister, getAppRecordDetail } from '@/api/application'

const route = useRoute()
const router = useRouter()
const appForm = ref(null)
const loading = ref(false)

// 判断是否为详情模式
const isDetailMode = computed(() => route.query.mode === 'detail' && route.query.id)

// 占位符简化：详情模式返回空字符串，注册模式返回原文案
const ph = (text) => (isDetailMode.value ? '' : text)

const formData = ref({
  appCode: '',
  appName: '',
  appType: '',
  remark: '',
  potocal: '',
  appCategory: '',
  clientCode: '',
  callbackUrl: '',
  appShortName: '',
  auditStatus: '',
  auditOpinion: ''
})

const rules = reactive({
  appCode: [{ required: true, message: '请输入应用编码', trigger: 'blur' }],
  appName: [{ required: true, message: '请输入应用名称', trigger: 'blur' }],
  appType: [{ required: true, message: '请选择应用类型', trigger: 'change' }],
  potocal: [{ required: true, message: '请选择协议类型', trigger: 'change' }],
  clientCode: [{ required: true, message: '请输入客户端编码', trigger: 'blur' }],
  callbackUrl: [{ required: true, message: '请输入回调地址', trigger: 'blur' }]
})

const appTypeOptions = [
  { value: '0', label: '内部' },
  { value: '1', label: '外部' },
]

const protocolTypeOptions = [
  { value: 'http', label: 'http' },
  { value: 'https', label: 'https' }
]

const appCategoryOptions = [
  { value: 'business', label: '业务系统' },
  { value: 'management', label: '管理系统' },
  { value: 'service', label: '服务系统' },
  { value: 'other', label: '其他' }
]

const submitApplication = async () => {
  appForm.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        await postAppRegister({
          code: formData.value.appCode,
          potocal: formData.value.potocal,
          name: formData.value.appName,
          type: formData.value.appType,
          url: formData.value.callbackUrl,
          remark: formData.value.remark,
          clientId: formData.value.clientCode,
          shortName: formData.value.appShortName
        })
        ElMessage.success('申请已提交')
      } catch (error) {
        console.log('error', error)
        // ElMessage.error('提交失败，请稍后重试')
      } finally {
        loading.value = false
      }
    } else {
      ElMessage.error('请完善表单信息')
      return false
    }
  })
}

const cancelApplication = () => {
  // 取消申请，重置表单
  appForm.value.resetFields()
}

// 跳转到申请记录页面
const goToRecordList = () => {
  router.push('/application/record')
}

// 返回申请记录页面
const goBack = () => {
  router.push('/application/record')
}

// 获取详情数据
const fetchDetailData = async (appId) => {
  loading.value = true
  try {
    const res = await getAppRecordDetail(appId)

    if(res.code === 200 && res.data) {
       formData.value = {
        appCode: res.data.code || '',
        appName: res.data.name || '',
        appType: res.data.type || '',
        appShortName: res.data.shortName || '',
        potocal: res.data.potocal || '',
        callbackUrl: res.data.url || '',
        remark: res.data.remark || '',
        clientCode: res.data.clientId || ''
       
       }
    }
  } catch (error) {
    console.error('获取详情失败:', error)
  } finally {
    loading.value = false
  }
}

// 组件挂载时，如果是详情模式则获取详情数据
onMounted(() => {
  if (isDetailMode.value) {
    fetchDetailData(route.query.id)
  }
})
</script>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}

.application-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 30px;
  background-color: #fff;
  box-sizing: border-box;
  height: calc(100vh - 64px - 161px);
  overflow-x: hidden;
}

.application-header {
  text-align: center;
  margin-bottom: 20px;
}

.application-header h1 {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
}

.application-header p {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.application-form {
  border-radius: 4px;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
}

.form-row {
  display: flex;
  margin-bottom: 0;
  gap: 20px;
}

.el-form-item {
  flex: 1;
  margin-bottom: 15px;
}

.full-width {
  width: 100%;
}

.form-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.application-guide {
  background-color: #f0f7ff;
  padding: 15px 30px;
  border-radius: 4px;
  margin-top: 15px;
}

.guide-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.guide-icon {
  width: 24px;
  height: 24px;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  margin-right: 10px;
}

.guide-svg {
  width: 20px;
  height: 20px;
}

.guide-header h3 {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.guide-steps {
  display: flex;
  justify-content: space-between;
}

.step-item {
  flex: 1;
  padding: 0 15px;
  position: relative;
}

.step-item:not(:last-child)::after {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 1px;
  background-color: #e0e0e0;
}

.step-item div {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #1C59E2;
  margin-top: 0;
}

.step-item p {
  font-size: 14px;
  color: #666;
  line-height: 1.4;
  margin: 0;
}

/* 响应式适配 */
@media screen and (max-width: 1440px) {
  .application-container {
    max-width: 1000px;
  }
  
  .application-header h1 {
    font-size: 22px;
  }
  
  .application-header p {
    font-size: 13px;
  }
  
  .step-item div {
    font-size: 15px;
  }
  
  .step-item p {
    font-size: 13px;
  }
}

@media screen and (max-width: 1024px) {
  .application-form {
    padding: 15px 20px;
  }
  
  .application-guide {
    padding: 12px 20px;
  }
}

@media screen and (max-width: 768px) {
  .form-row {
    flex-direction: column;
    gap: 0;
  }
  
  .guide-steps {
    flex-direction: column;
    gap: 15px;
  }
  
  .step-item:not(:last-child)::after {
    display: none;
  }
  
  .step-item {
    padding: 0;
    margin-bottom: 12px;
  }
}
</style>
