<template>
  <div class="application-container">
    <div class="application-header">
      <h1>应用注册</h1>
      <p>注册您的应用以获取验证，开始使用我们的服务</p>
    </div>
    
    <div class="application-form">
      <el-form
        :model="formData"
        label-position="top"
        :rules="rules"
        ref="appForm"
      >
        <div class="form-row">
          <el-form-item label="应用编码" prop="appCode">
            <el-input v-model="formData.appCode" placeholder="请输入应用编码"></el-input>
          </el-form-item>
          <el-form-item label="应用名称" prop="appName">
            <el-input v-model="formData.appName" placeholder="请输入应用名称"></el-input>
          </el-form-item>
        </div>
        
        <div class="form-row">
          <el-form-item label="应用类型" prop="appType">
            <el-select v-model="formData.appType" placeholder="请输入应用编码" class="full-width">
              <el-option v-for="item in appTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="应用简称" prop="appShortName">
            <el-input v-model="formData.appShortName" placeholder="请输入应用简称"></el-input>
          </el-form-item>
        </div>
        
        <div class="form-row">
          <el-form-item label="协议类型" prop="protocolType">
            <el-select v-model="formData.protocolType" placeholder="请选择协议类型" class="full-width">
              <el-option v-for="item in protocolTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="应用分类" prop="appCategory">
            <el-select v-model="formData.appCategory" placeholder="请选择应用分类" class="full-width">
              <el-option v-for="item in appCategoryOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </div>
        
        <div class="form-row">
          <el-form-item label="客户端编码" prop="clientCode">
            <el-input v-model="formData.clientCode" placeholder="请输入客户端编码"></el-input>
          </el-form-item>
          <el-form-item label="回调地址" prop="callbackUrl">
            <el-input v-model="formData.callbackUrl" placeholder="请输入回调地址"></el-input>
          </el-form-item>
        </div>
        
        <div class="form-actions">
          <el-button @click="cancelApplication">取消</el-button>
          <el-button type="primary" color="#1C59E2" @click="submitApplication">提交申请</el-button>
        </div>
      </el-form>
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
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'

const appForm = ref(null)

const formData = reactive({
  appCode: '',
  appName: '',
  appType: '',
  appShortName: '',
  protocolType: '',
  appCategory: '',
  clientCode: '',
  callbackUrl: ''
})

const rules = reactive({
  appCode: [{ required: true, message: '请输入应用编码', trigger: 'blur' }],
  appName: [{ required: true, message: '请输入应用名称', trigger: 'blur' }],
  appType: [{ required: true, message: '请选择应用类型', trigger: 'change' }],
  protocolType: [{ required: true, message: '请选择协议类型', trigger: 'change' }],
  appCategory: [{ required: true, message: '请选择应用分类', trigger: 'change' }],
  clientCode: [{ required: true, message: '请输入客户端编码', trigger: 'blur' }],
  callbackUrl: [{ required: true, message: '请输入回调地址', trigger: 'blur' }]
})

const appTypeOptions = [
  { value: 'web', label: 'Web应用' },
  { value: 'mobile', label: '移动应用' },
  { value: 'server', label: '服务器应用' }
]

const protocolTypeOptions = [
  { value: 'oauth2', label: 'OAuth 2.0' },
  { value: 'oidc', label: 'OpenID Connect' },
  { value: 'saml', label: 'SAML 2.0' }
]

const appCategoryOptions = [
  { value: 'business', label: '业务系统' },
  { value: 'management', label: '管理系统' },
  { value: 'service', label: '服务系统' },
  { value: 'other', label: '其他' }
]

const submitApplication = () => {
  appForm.value.validate((valid) => {
    if (valid) {
      // 提交申请逻辑
      console.log('提交申请', formData)
      ElMessage.success('申请已提交，请等待审核')
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
</script>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow-x: hidden;
}

.application-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 30px;
  background-color: #fff;
  box-sizing: border-box;
  height: calc(100vh - 63px - 194px);
  overflow-x: hidden;
}

.application-header {
  text-align: center;
  margin-bottom: 30px;
}

.application-header h1 {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #333;
}

.application-header p {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.application-form {
  /* background-color: #fff; */
  padding: 30px;
  border-radius: 4px;
  /* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05); */
  margin-bottom: 30px;
}

.form-row {
  display: flex;
  margin-bottom: 0;
  gap: 20px;
}

.el-form-item {
  flex: 1;
  margin-bottom: 20px;
}

.full-width {
  width: 100%;
}

.form-actions {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 20px;
}

.application-guide {
  background-color: #f0f7ff;
  padding: 20px 30px;
  border-radius: 4px;
  margin-bottom: 30px;
}

.guide-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.guide-icon {
  width: 24px;
  height: 24px;
  /* background-color: #3B82F6; */
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
  margin-bottom: 10px;
  color: #1C59E2;
  margin-top: 0;
}

.step-item p {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  margin: 0;
}

/* 响应式适配 */
@media screen and (max-width: 1440px) {
  .application-container {
    max-width: 1000px;
  }
}

@media screen and (max-width: 768px) {
  .form-row {
    flex-direction: column;
    gap: 0;
  }
  
  .guide-steps {
    flex-direction: column;
    gap: 20px;
  }
  
  .step-item:not(:last-child)::after {
    display: none;
  }
  
  .step-item {
    padding: 0;
    margin-bottom: 15px;
  }
}
</style>
