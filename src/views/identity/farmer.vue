<template>
  <div class="page-container">
    <el-card class="panel" shadow="never">
      <template #header>
        <div class="panel-header">
          <div class="panel-title">农民认证申请</div>
          <div class="panel-sub">请填写以下信息以完成农民身份认证</div>
        </div>
      </template>

      <el-form ref="formRef" :model="form" :rules="rules" label-width="120px" class="form-body" status-icon>
        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item label="真实姓名" prop="name">
              <el-input v-model.trim="form.name" placeholder="请输入真实姓名" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证号" prop="idNo">
              <el-input v-model.trim="form.idNo" placeholder="请输入身份证号" clearable />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="手机号码" prop="mobile">
              <el-input v-model.trim="form.mobile" placeholder="请输入手机号码" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="行政区划" prop="region">
              <el-cascader v-model="form.region" :options="regionOptions" placeholder="请选择行政区划" filterable clearable />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="种植类型" prop="cropTypes">
              <el-select v-model="form.cropTypes" placeholder="请选择种植类型" multiple clearable collapse-tags collapse-tags-tooltip>
                <el-option v-for="o in cropTypeOptions" :key="o.value" :label="o.label" :value="o.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="证明文件" prop="attachments">
              <el-upload
                class="upload-block"
                action="#"  
                :auto-upload="false"
                :on-change="handleFileChange"
                :limit="5"
                :file-list="form.attachments"
                accept=".jpg,.jpeg,.png,.pdf"
              >
                <el-button type="primary" plain>选择文件</el-button>
                <template #tip>
                  <div class="el-upload__tip">支持 jpg/png/pdf，不超过5个文件</div>
                </template>
              </el-upload>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="详细住址" prop="address">
              <el-input v-model.trim="form.address" placeholder="请输入详细住址" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-input type="textarea" v-model.trim="form.remark" placeholder="备注信息（选填）" :rows="3" />
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
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'

const route = useRoute()
const isReview = computed(() => route.query.mode === 'review')

const formRef = ref()
const submitting = ref(false)

const form = reactive({
  name: '',
  idNo: '',
  mobile: '',
  region: [],
  cropTypes: [],
  attachments: [],
  address: '',
  remark: '',
  // 审核字段
  auditOpinion: '',
  auditResult: '' // pass | reject
})

// 区划与种植类型示例数据（后续可替换为接口）
const regionOptions = ref([
  { value: 'ethiopia', label: '埃塞俄比亚', children: [
    { value: 'oromia', label: '奥罗米亚' },
    { value: 'amhara', label: '阿姆哈拉' }
  ]}
])
const cropTypeOptions = ref([
  { value: 'coffee', label: '咖啡' },
  { value: 'teff', label: '铁芙' },
  { value: 'maize', label: '玉米' },
  { value: 'wheat', label: '小麦' }
])

// 基础校验
const isIdCard = (val) => /^[0-9A-Za-z]{6,20}$/.test(val) // 针对国际场景放宽校验
const isPhone = (val) => /^[0-9\-+()\s]{7,18}$/.test(val)

const rules = reactive({
  name: [{ required: true, message: '请输入真实姓名', trigger: 'blur' }],
  idNo: [
    { required: true, message: '请输入身份证号', trigger: 'blur' },
    { validator: (_r, v, cb) => isIdCard(v) ? cb() : cb(new Error('身份证号格式不正确')), trigger: ['blur', 'change'] }
  ],
  mobile: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    { validator: (_r, v, cb) => isPhone(v) ? cb() : cb(new Error('手机号码格式不正确')), trigger: ['blur', 'change'] }
  ],
  region: [{ required: true, message: '请选择行政区划', trigger: 'change' }],
  cropTypes: [{ required: true, message: '请选择种植类型', trigger: 'change' }],
  attachments: [{ required: false }],
  address: [{ required: true, message: '请输入详细住址', trigger: 'blur' }],
  remark: [{ required: false }],
  auditOpinion: [
    { required: computed(() => isReview.value).value, message: '请输入审核意见', trigger: 'blur' }
  ],
  auditResult: [
    { required: computed(() => isReview.value).value, message: '请选择审核结果', trigger: 'change' }
  ]
})

const handleFileChange = (file, fileList) => {
  form.attachments = fileList
}

const handleSubmit = () => {
  formRef.value.validate(async (valid) => {
    if (!valid) return
    try {
      submitting.value = true
      // TODO: 接入提交接口（根据 isReview 区分：提交申请 or 审核结果）
      // await api.submitFarmer(form)
      ElMessage.success(isReview.value ? '审核结果已提交' : '提交成功')
    } catch (e) {
      ElMessage.error('提交失败，请稍后重试')
    } finally {
      submitting.value = false
    }
  })
}

onMounted(() => {
  // TODO: 若为详情/审核模式，可按 route.query.id 拉取详情数据并回填
})
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
