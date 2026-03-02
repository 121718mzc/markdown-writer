<template>
  <div class="edit">
    <h1>编辑文章</h1>
    <input v-model="articleTitle" placeholder="输入标题" />
    <textarea v-model="articleContent" placeholder="开始编写Markdown..." @input="handleInput"></textarea>
    <div v-html="previewContent"></div>
    <button @click="saveArticle">保存</button>
    <button @click="exportMarkdown">导出Markdown</button>
    <button @click="exportHtml">导出HTML</button>
    <button @click="router.push('/')">返回</button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useArticleStore } from '../stores/article'
import { marked } from 'marked'

const route = useRoute()
const router = useRouter()
const articleStore = useArticleStore()

const articleId = route.params.id
const articleTitle = ref('')
const articleContent = ref('')
let isSaving = false

// 配置marked
marked.setOptions({
  breaks: true,
  gfm: true
})

const previewContent = computed(() => {
  return marked(articleContent.value)
})

const handleInput = () => {
  // 自动保存 - 只在已有文章ID时自动保存，避免新文章重复创建
  if (articleId) {
    saveArticle()
  }
}

const saveArticle = async () => {
  // 添加锁机制，防止重复调用
  if (isSaving) return
  isSaving = true
  
  try {
    if (articleId) {
      await articleStore.updateArticle(articleId, {
        title: articleTitle.value,
        content: articleContent.value
      })
    } else {
      // 调用createArticle后，重新获取文章列表，找到最新创建的文章
      await articleStore.createArticle({
        title: articleTitle.value,
        content: articleContent.value
      })
      // 重新获取文章列表
      await articleStore.fetchArticles()
      // 获取最新创建的文章ID
      const articles = articleStore.getArticles
      if (articles.length > 0) {
        // 按创建时间排序，找到最新的文章
        const latestArticle = articles.sort((a, b) => b.created_at - a.created_at)[0]
        // 跳转到编辑页面，使用新的文章ID
        router.push(`/edit/${latestArticle.id}`)
      }
    }
  } finally {
    isSaving = false
  }
}

const exportMarkdown = () => {
  const blob = new Blob([articleContent.value], { type: 'text/markdown' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = (articleTitle.value || 'untitled') + '.md'
  a.click()
  URL.revokeObjectURL(url)
}

const exportHtml = () => {
  // 极简HTML导出
  const html = '<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><title>' + (articleTitle.value || 'Untitled') + '</title></head><body><h1>' + (articleTitle.value || 'Untitled') + '</h1>' + previewContent.value + '</body></html>'
  const blob = new Blob([html], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = (articleTitle.value || 'untitled') + '.html'
  a.click()
  URL.revokeObjectURL(url)
}

onMounted(async () => {
  if (articleId) {
    await articleStore.fetchArticle(articleId)
    const article = articleStore.getCurrentArticle
    if (article) {
      articleTitle.value = article.title
      articleContent.value = article.content
    }
  }
})
</script>

<style scoped>
.edit {
  padding: 20px;
}

textarea {
  width: 100%;
  height: 300px;
  margin: 10px 0;
}

button {
  margin: 5px;
  padding: 10px;
}
</style>