// 文章相关API

const STORAGE_KEY = 'markdown-writer'

// 获取所有文章
export function getArticles() {
  const data = localStorage.getItem(STORAGE_KEY)
  if (data) {
    return JSON.parse(data).articles || []
  }
  return []
}

// 获取单篇文章
export function getArticle(id) {
  const articles = getArticles()
  return articles.find(article => article.id === id)
}

// 创建文章
export function createArticle(article) {
  const articles = getArticles()
  const newArticle = {
    id: Date.now().toString(),
    title: article.title || '无标题',
    content: article.content || '',
    created_at: Date.now(),
    updated_at: Date.now()
  }
  articles.push(newArticle)
  saveArticles(articles)
  return newArticle
}

// 更新文章
export function updateArticle(id, article) {
  const articles = getArticles()
  const index = articles.findIndex(a => a.id === id)
  if (index !== -1) {
    articles[index] = {
      ...articles[index],
      ...article,
      updated_at: Date.now()
    }
    saveArticles(articles)
    return articles[index]
  }
  return null
}

// 删除文章
export function deleteArticle(id) {
  const articles = getArticles()
  const newArticles = articles.filter(article => article.id !== id)
  saveArticles(newArticles)
  return newArticles
}

// 保存文章列表
function saveArticles(articles) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ articles }))
}