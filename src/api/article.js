const ARTICLES_KEY = 'markdown_articles'

export const getArticles = () => {
  const articles = localStorage.getItem(ARTICLES_KEY)
  return articles ? JSON.parse(articles) : []
}

export const getArticle = (id) => {
  const articles = getArticles()
  return articles.find(article => article.id === id)
}

export const createArticle = (article) => {
  const articles = getArticles()
  const newArticle = {
    id: Date.now().toString(),
    title: article.title || '无标题',
    content: article.content || '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
  articles.push(newArticle)
  localStorage.setItem(ARTICLES_KEY, JSON.stringify(articles))
  return newArticle
}

export const updateArticle = (id, article) => {
  const articles = getArticles()
  const index = articles.findIndex(a => a.id === id)
  if (index !== -1) {
    articles[index] = {
      ...articles[index],
      title: article.title,
      content: article.content,
      updated_at: new Date().toISOString()
    }
    localStorage.setItem(ARTICLES_KEY, JSON.stringify(articles))
    return articles[index]
  }
  return null
}

export const deleteArticle = (id) => {
  const articles = getArticles()
  const filteredArticles = articles.filter(article => article.id !== id)
  localStorage.setItem(ARTICLES_KEY, JSON.stringify(filteredArticles))
  return true
}