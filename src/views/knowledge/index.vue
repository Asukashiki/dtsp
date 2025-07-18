<template>
    <div class="knowledge-container" v-loading="loading" element-loading-text="正在加载知识中心...">
        <iframe
            :src="knowledgeUrl"
            class="knowledge-iframe"
            frameborder="0"
            allowfullscreen
            @load="handleIframeLoaded"
        ></iframe>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useUserStore } from '@/store'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()
const loading = ref(true)

// 从环境变量获取知识中心基础URL
const knowledgeBaseUrl = import.meta.env.VITE_APP_KNOWLEDGE_BASE_URL || 'https://10.110.149.140:31016'

// 计算完整URL，包含token
const knowledgeUrl = computed(() => {
    const token = userStore.token || ''
    return `${knowledgeBaseUrl}/damp-know-web/sso.html?token=${token}`
})

// iframe加载完成后的处理
const handleIframeLoaded = () => {
    loading.value = false
}
</script>

<style scoped>
.knowledge-container {
    width: 100%;
    height: calc(100vh - 230px); /* 减去header高度 */
    overflow: hidden;
    position: relative;
}

.knowledge-iframe {
    width: 100%;
    height: 100%;
    border: none;
}

::v-deep .main-content {
    padding-top: 0 !important;
}
</style>