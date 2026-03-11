import { defineStore } from 'pinia'
import { getArticles, getArticle, createArticle, updateArticle, deleteArticle } from '../api/article'

export const useArticleStore = defineStore('article', {
  state: () => ({
    articles: [],
    currentArticle: null
  }),
  getters: {
    getArticles: (state) => state.articles,
    getCurrentArticle: (state) => state.currentArticle
  },
  actions: {
    async fetchArticles() {
      this.articles = await getArticles()
    },
    async fetchArticle(id) {
      this.currentArticle = await getArticle(id)
    },
    async createArticle(article) {
      return await createArticle(article)
    },
    async updateArticle(id, article) {
      return await updateArticle(id, article)
    },
    async deleteArticle(id) {
      return await deleteArticle(id)
    }
  }
})