<template>
  <div class="settings">
    <div class="header">
      <h1>设置</h1>
      <button class="back-btn" @click="router.push('/')">返回</button>
    </div>
    <div class="settings-content">
      <div class="setting-section">
        <h2>主题设置</h2>
        <div class="theme-options">
          <label>
            <input type="radio" v-model="theme" value="light" />
            浅色主题
          </label>
          <label>
            <input type="radio" v-model="theme" value="dark" />
            深色主题
          </label>
        </div>
      </div>
      <div class="setting-section">
        <h2>编辑器设置</h2>
        <div class="setting-item">
          <label>字体大小：</label>
          <input type="range" v-model="fontSize" min="12" max="20" />
          <span>{{ fontSize }}px</span>
        </div>
        <div class="setting-item">
          <label>
            <input type="checkbox" v-model="autoSave" />
            自动保存
          </label>
        </div>
      </div>
      <div class="setting-section">
        <h2>关于</h2>
        <p>Markdown Writer v1.0.0</p>
        <p>一款专业的Markdown写作工具</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const theme = ref('light')
const fontSize = ref(14)
const autoSave = ref(true)

onMounted(() => {
  // 从localStorage加载设置
  const savedTheme = localStorage.getItem('theme')
  const savedFontSize = localStorage.getItem('fontSize')
  const savedAutoSave = localStorage.getItem('autoSave')
  
  if (savedTheme) {
    theme.value = savedTheme
  }
  if (savedFontSize) {
    fontSize.value = parseInt(savedFontSize)
  }
  if (savedAutoSave !== null) {
    autoSave.value = savedAutoSave === 'true'
  }
  
  // 应用主题
  applyTheme()
})

watch(theme, (newTheme) => {
  localStorage.setItem('theme', newTheme)
  applyTheme()
})

watch(fontSize, (newFontSize) => {
  localStorage.setItem('fontSize', newFontSize)
  document.documentElement.style.fontSize = `${newFontSize}px`
})

watch(autoSave, (newAutoSave) => {
  localStorage.setItem('autoSave', newAutoSave)
})

const applyTheme = () => {
  if (theme.value === 'dark') {
    document.documentElement.classList.add('dark-theme')
  } else {
    document.documentElement.classList.remove('dark-theme')
  }
}
</script>

<style scoped>
.settings {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.header h1 {
  font-size: 24px;
  color: #333;
}

.back-btn {
  padding: 8px 16px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.back-btn:hover {
  background-color: #5a6268;
}

.settings-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.setting-section {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.setting-section h2 {
  margin-bottom: 16px;
  font-size: 18px;
  color: #333;
  border-bottom: 1px solid #e9ecef;
  padding-bottom: 8px;
}

.theme-options {
  display: flex;
  gap: 20px;
}

.theme-options label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.setting-item {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.setting-item label {
  flex: 1;
  cursor: pointer;
}

.setting-item input[type="range"] {
  flex: 2;
}

.setting-item span {
  min-width: 40px;
}

/* 深色主题 */
:root.dark-theme {
  --bg-color: #1a1a1a;
  --text-color: #e0e0e0;
  --card-bg: #2d2d2d;
  --border-color: #404040;
}

:root.dark-theme body {
  background-color: var(--bg-color);
  color: var(--text-color);
}

:root.dark-theme .setting-section {
  background-color: var(--card-bg);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

:root.dark-theme .setting-section h2 {
  color: var(--text-color);
  border-bottom-color: var(--border-color);
}

:root.dark-theme .header h1 {
  color: var(--text-color);
}
</style>