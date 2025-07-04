<template>
  <div class="section-container">
    <div class="section-header">
      <div class="section-title">
        <img src="../assets/Title.svg" alt="Title" class="title-icon">
        <span>{{ title }}</span>
      </div>
      <div class="more-link" @click="$emit('more-click')">查看更多 ></div>
    </div>
    <el-table
      :data="data"
      stripe
      style="width: 100%"
      :header-cell-style="{ background: '#f5f7fa', color: '#606266' }"
      :row-style="{ cursor: 'pointer' }"
      @row-click="handleRowClick"
      empty-text="暂无数据"
    >
      <el-table-column
        v-for="(column, index) in columns"
        :key="index"
        :prop="column.prop"
        :label="column.label"
        :width="column.width"
      />
    </el-table>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  data: {
    type: Array,
    required: true
  },
  columns: {
    type: Array,
    required: true
  }
})

const emit = defineEmits()

const handleRowClick = (row) => {
  emit('row-click', row)
}
</script>

<style scoped>
.section-container {
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  /* margin-bottom: 16px; */
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  height: 52px;
  box-sizing: border-box;
  border-bottom: 1px solid #f0f0f0;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  display: flex;
  align-items: center;
}

.title-icon {
  width: 11px;
  height: 12px;
  margin-right: 8px;
}

.more-link {
  font-size: 14px;
  color: #909399;
  cursor: pointer;
}

.more-link:hover {
  color: #1c59e2;
}

.section-container {
  height: 100%;
}
</style> 