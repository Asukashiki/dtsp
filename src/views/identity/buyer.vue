<template>
  <div class="page-container">
    <el-card class="panel" shadow="never">
      <template #header>
        <div class="panel-header">
          <div class="panel-title">收购商身份认证申请</div>
          <div class="panel-sub">请填写以下信息以完成收购主体认证</div>
        </div>
      </template>

      <el-form ref="formRef" :model="form" :rules="rules" label-width="140px" class="form-body" status-icon>
        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item label="企业名称" prop="name">
              <el-input v-model.trim="form.name" placeholder="请输入企业名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="统一社会信用代码" prop="uscc">
              <el-input v-model.trim="form.uscc" placeholder="请输入统一社会信用代码（18位）" />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="负责人姓名" prop="principalName">
              <el-input v-model.trim="form.principalName" placeholder="请输入负责人姓名" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="负责人身份证号" prop="principalIdNo">
              <el-input v-model.trim="form.principalIdNo" placeholder="请输入负责人身份证号" />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="行政区划" prop="region">
              <el-cascader v-model="form.region" :options="regionOptions" placeholder="请选择行政区划" filterable clearable />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="主要收购产品类型" prop="productTypes">
              <el-select v-model="form.productTypes" placeholder="请选择产品类型" multiple clearable collapse-tags collapse-tags-tooltip>
                <el-option v-for="o in productTypeOptions" :key="o.value" :label="o.label" :value="o.value" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="营业执照" prop="license">
              <el-upload
                class="upload-block"
                action="#"
                :auto-upload="false"
                :on-change="handleFileChange"
                :file-list="form.license"
                :limit="3"
                accept=".jpg,.jpeg,.png,.pdf"
                list-type="text"
              >
                <el-button type="primary" plain>上传营业执照</el-button>
                <template #tip>
                  <div class="el-upload__tip">支持 jpg/png/pdf，最多3个文件</div>
                </template>
              </el-upload>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="联系人姓名" prop="contactName">
              <el-input v-model.trim="form.contactName" placeholder="请输入联系人姓名" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人手机" prop="contactMobile">
              <el-input v-model.trim="form.contactMobile" placeholder="请输入联系人手机" />
            </el-form-item>
          </el-col>
        </el-row>

      <template v-if="isReview">
        <el-divider />
        <el-row :gutter="16">
          <el-col :span="24">
            <el-form-item label="审核意见" prop="auditOpinion">
              <el-input type="textarea" v-model.trim="form.auditOpinion" placeholder="请输入审核意见" :rows="3" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="审核结果" prop="auditResult">
              <el-radio-group v-model="form.auditResult">
                <el-radio-button label="pass">通过</el-radio-button>
                <el-radio-button label="reject">驳回</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </template>

      <div class="actions">
        <el-button @click="$router.back()">返回</el-button>
        <el-button type="primary" :loading="submitting" @click="handleSubmit">{{ isReview ? '提交审核结果' : '提交' }}</el-button>
      </div>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'

const route = useRoute()
const isReview = computed(() => route.query.mode === 'review')

const formRef = ref()
const submitting = ref(false)

const form = reactive({
  name: '',
  uscc: '',
  principalName: '',
  principalIdNo: '',
  region: [],
  productTypes: [],
  license: [],
  contactName: '',
  contactMobile: '',
  // 审核
  auditOpinion: '',
  auditResult: ''
})

const regionOptions = ref([
  { value: 'ethiopia', label: '埃塞俄比亚', children: [
    { value: 'oromia', label: '奥罗米亚' },
    { value: 'amhara', label: '阿姆哈拉' }
  ]}
])

const productTypeOptions = ref([
  { value: 'coffee', label: '咖啡' },
  { value: 'sesame', label: '芝麻' },
  { value: 'maize', label: '玉米' },
  { value: 'wheat', label: '小麦' }
])

// 校验器
const isUSCC = (val) => /^[0-9A-Z]{18}$/i.test(val)
const isIdCard = (val) => /^[0-9A-Za-z]{6,20}$/.test(val)
const isPhone = (val) => /^[0-9\-+()\s]{7,18}$/.test(val)

const rules = reactive({
  name: [{ required: true, message: '请输入企业名称', trigger: 'blur' }],
  uscc: [ { required: true, message: '请输入统一社会信用代码', trigger: 'blur' }, { validator: (_r, v, cb) => isUSCC(v) ? cb() : cb(new Error('统一社会信用代码应为18位字母数字')), trigger: ['blur','change'] } ],
  principalName: [{ required: true, message: '请输入负责人姓名', trigger: 'blur' }],
  principalIdNo: [ { required: true, message: '请输入负责人身份证号', trigger: 'blur' }, { validator: (_r, v, cb) => isIdCard(v) ? cb() : cb(new Error('身份证号格式不正确')), trigger: ['blur','change'] } ],
  region: [{ required: true, message: '请选择行政区划', trigger: 'change' }],
  productTypes: [{ required: true, message: '请选择主要收购产品类型', trigger: 'change' }],
  license: [{ required: true, message: '请上传营业执照', trigger: 'change' }],
  contactName: [{ required: true, message: '请输入联系人姓名', trigger: 'blur' }],
  contactMobile: [ { required: true, message: '请输入联系人手机', trigger: 'blur' }, { validator: (_r, v, cb) => isPhone(v) ? cb() : cb(new Error('手机格式不正确')), trigger: ['blur','change'] } ],
  auditOpinion: [ { required: computed(() => isReview.value).value, message: '请输入审核意见', trigger: 'blur' } ],
  auditResult: [ { required: computed(() => isReview.value).value, message: '请选择审核结果', trigger: 'change' } ]
})

const handleFileChange = (file, fileList) => {
  form.license = fileList
}

const handleSubmit = () => {
  formRef.value.validate(async (valid) => {
    if (!valid) return
    try {
      submitting.value = true
      // TODO: 接入接口：提交收购商认证 / 审核
      // await api.submitBuyer(form)
      ElMessage.success(isReview.value ? '审核结果已提交' : '提交成功')
    } catch (e) {
      ElMessage.error('提交失败，请稍后重试')
    } finally {
      submitting.value = false
    }
  })
}
</script>

<style scoped>
.page-container {
  max-width: 1200px;
  margin: 0 auto;
  height: calc(100vh - 64px - 161px);
  box-sizing: border-box;
}
.panel { height: 100%; }
.panel-header { text-align: center; }
.panel-title { font-size: 20px; font-weight: 600; color: #303133; }
.panel-sub { color: #909399; font-size: 13px; margin-top: 4px; }
.mb16 { margin-bottom: 16px; }
.form-body { padding-top: 8px; }
.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px 24px; }
.col-span-2 { grid-column: span 2; }
.upload-block { width: 100%; }
.actions { display: flex; justify-content: center; gap: 12px; margin-top: 8px; }
@media (max-width: 768px) { .grid-2 { grid-template-columns: 1fr; } .col-span-2 { grid-column: span 1; } }
</style>
