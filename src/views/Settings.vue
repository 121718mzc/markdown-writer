<template>
  <div class="settings">
    <h1>设置</h1>
    <div class="setting-item">
      <label>主题</label>
      <select v-model="theme">
        <option value="light">浅色</option>
        <option value="dark">深色</option>
      </select>
    </div>
    <div class="setting-item">
      <label>字体大小</label>
      <input type="range" v-model="fontSize" min="12" max="20" />
      <span>{{ fontSize }}px</span>
    </div>
    <button @click="saveSettings">保存设置</button>
    <button @click="router.push('/')">返回</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const theme = ref('light')
const fontSize = ref(16)

onMounted(() => {
  // 从localStorage加载设置
  const savedTheme = localStorage.getItem('theme')
  const savedFontSize = localStorage.getItem('fontSize')
  if (savedTheme) {
    theme.value = savedTheme
  }
  if (savedFontSize) {
    fontSize.value = parseInt(savedFontSize)
  }
})

const saveSettings = () => {
  // 保存设置到localStorage
  localStorage.setItem('theme', theme.value)
  localStorage.setItem('fontSize', fontSize.value.toString())
  alert('设置已保存')
}
</script>

<style scoped>
.settings {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.setting-item {
  margin: 20px 0;
  display: flex;
  align-items: center;
}

.setting-item label {
  width: 100px;
  font-weight: bold;
}

.setting-item input[type="range"] {
  flex: 1;
  margin: 0 10px;
}

button {
  margin: 5px;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

button:hover {
  opacity: 0.8;
}
</style>