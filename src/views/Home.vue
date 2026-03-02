<template>
  <div class="home">
    <div class="header">
      <h1>Markdown Writer</h1>
      <button class="new-article-btn" @click="createNewArticle">新建文章</button>
    </div>
    <div class="article-list">
      <div v-if="articles.length === 0" class="empty-state">
        <p>暂无文章，点击上方按钮创建新文章</p>
      </div>
      <div v-else class="articles">
        <div 
          v-for="article in articles" 
          :key="article.id" 
          class="article-item"
          @click="editArticle(article.id)"
        >
          <h3>{{ article.title || '无标题' }}</h3>
          <p class="article-meta">
            创建于：{{ formatDate(article.created_at) }}
            <span v-if="article.updated_at !== article.created_at">
              更新于：{{ formatDate(article.updated_at) }}
            </span>
          </p>
          <button class="delete-btn" @click.stop="deleteArticle(article.id)">删除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useArticleStore } from '../stores/article'

const router = useRouter()
const articleStore = useArticleStore()
const articles = ref([])

onMounted(async () => {
  await articleStore.fetchArticles()
  articles.value = articleStore.getArticles
})

const createNewArticle = () => {
  router.push('/edit')
}

const editArticle = (id) => {
  router.push(`/edit/${id}`)
}

const deleteArticle = async (id) => {
  if (confirm('确定要删除这篇文章吗？')) {
    await articleStore.deleteArticle(id)
    articles.value = articleStore.getArticles
  }
}

const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleString()
}
</script>

<style scoped>
.home {
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

.new-article-btn {
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.new-article-btn:hover {
  background-color: #45a049;
}

.article-list {
  margin-top: 20px;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #666;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.articles {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.article-item {
  padding: 16px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  position: relative;
}

.article-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.article-item h3 {
  margin-bottom: 8px;
  color: #333;
}

.article-meta {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}

.delete-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  padding: 4px 8px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.delete-btn:hover {
  background-color: #da190b;
}
</style>