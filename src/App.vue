<script setup>
import { ref } from 'vue'
import NavBar from './components/NavBar.vue'
import HomePage from './components/HomePage.vue'
import PostDetail from './components/PostDetail.vue'
import AlgorithmPage from './components/AlgorithmPage.vue'
import AlgorithmDetail from './components/AlgorithmDetail.vue'
import GamesPage from './components/GamesPage.vue'
import ArchitecturePage from './components/ArchitecturePage.vue'
import ResumePage from './components/ResumePage.vue'
import AdminPage from './components/AdminPage.vue'

const currentPage = ref('home')
const currentPost = ref(null)
const currentAlgoPost = ref(null)

const viewPost = (post) => {
  currentPost.value = post
  currentPage.value = 'post'
}

const viewAlgoPost = (post) => {
  currentAlgoPost.value = post
  currentPage.value = 'algo-detail'
}

const navigateTo = (page) => {
  currentPage.value = page
  currentPost.value = null
  currentAlgoPost.value = null
}
</script>

<template>
  <div id="app-root">
    <NavBar @navigate="navigateTo" :currentPage="currentPage" />

    <main>
      <HomePage v-if="currentPage === 'home'" @view-post="viewPost" />
      <PostDetail v-if="currentPage === 'post'" :post="currentPost" @back="navigateTo('home')" />
      <AlgorithmPage v-if="currentPage === 'algorithm'" @view-post="viewAlgoPost" />
      <AlgorithmDetail v-if="currentPage === 'algo-detail'" :post="currentAlgoPost" @back="navigateTo('algorithm')" />
      <GamesPage v-if="currentPage === 'games'" />
      <ArchitecturePage v-if="currentPage === 'architecture'" />
      <ResumePage v-if="currentPage === 'resume'" />
      <AdminPage v-if="currentPage === 'admin'" @navigate="navigateTo" />
    </main>

    <footer class="footer">
      <div class="container">
        <p>&copy; {{ new Date().getFullYear() }} My Blog. 用 ❤️ 和 Vue 3 + Vite 构建</p>
        <p class="footer-tagline">不断学习，持续进步</p>
      </div>
    </footer>
  </div>
</template>

<style>
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --bg-card: #ffffff;
  --text-primary: #1a1a2e;
  --text-secondary: #6c757d;
  --text-muted: #adb5bd;
  --accent: #6c63ff;
  --accent-hover: #5a52d5;
  --accent-light: rgba(108, 99, 255, 0.1);
  --border: #e9ecef;
  --shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  --shadow-hover: 0 8px 30px rgba(0, 0, 0, 0.12);
  --radius: 12px;
  --radius-sm: 8px;
  --transition: all 0.3s ease;
  --max-width: 900px;
  --header-height: 64px;
}

[data-theme="dark"] {
  --bg-primary: #0f0f23;
  --bg-secondary: #1a1a2e;
  --bg-card: #16213e;
  --text-primary: #e4e4e7;
  --text-secondary: #a1a1aa;
  --text-muted: #71717a;
  --accent: #818cf8;
  --accent-hover: #6366f1;
  --accent-light: rgba(129, 140, 248, 0.15);
  --border: #2d2d4a;
  --shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
  --shadow-hover: 0 8px 30px rgba(0, 0, 0, 0.4);
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.6;
  transition: var(--transition);
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 20px;
}

.footer {
  text-align: center;
  padding: 32px 0;
  border-top: 1px solid var(--border);
  color: var(--text-muted);
  font-size: 0.85rem;
}

.footer-tagline {
  margin-top: 4px;
  font-size: 0.8rem;
}
</style>