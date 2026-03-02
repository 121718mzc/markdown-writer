import { defineStore } from 'pinia'
import * as articleApi from '../api/article'

export const useArticleStore = defineStore('article', {
  state: () => ({
    articles: [],
    currentArticle: null,
    isLoading: false,
    error: null
  }),
  getters: {
    getArticles: (state) => state.articles,
    getCurrentArticle: (state) => state.currentArticle,
    isLoading: (state) => state.isLoading,
    error: (state) => state.error
  },
  actions: {
    async fetchArticles() {
      this.isLoading = true
      try {
        this.articles = articleApi.getArticles()
      } catch (error) {
        this.error = error.message
      } finally {
        this.isLoading = false
      }
    },
    async fetchArticle(id) {
      this.isLoading = true
      try {
        this.currentArticle = articleApi.getArticle(id)
      } catch (error) {
        this.error = error.message
      } finally {
        this.isLoading = false
      }
    },
    async createArticle(article) {
      this.isLoading = true
      try {
        await articleApi.createArticle(article)
        await this.fetchArticles()
      } catch (error) {
        this.error = error.message
      } finally {
        this.isLoading = false
      }
    },
    async updateArticle(id, article) {
      this.isLoading = true
      try {
        await articleApi.updateArticle(id, article)
        await this.fetchArticles()
        await this.fetchArticle(id)
      } catch (error) {
        this.error = error.message
      } finally {
        this.isLoading = false
      }
    },
    async deleteArticle(id) {
      this.isLoading = true
      try {
        await articleApi.deleteArticle(id)
        await this.fetchArticles()
      } catch (error) {
        this.error = error.message
      } finally {
        this.isLoading = false
      }
    }
  }
})