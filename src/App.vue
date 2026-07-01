<script setup>
import { ref, computed } from 'vue'
import SideBar from './components/SideBar.vue'
import HomePage from './components/HomePage.vue'
import PostDetail from './components/PostDetail.vue'
import AlgorithmPage from './components/AlgorithmPage.vue'
import AlgorithmDetail from './components/AlgorithmDetail.vue'
import GamesPage from './components/GamesPage.vue'
import ArchitecturePage from './components/ArchitecturePage.vue'
import ResumePage from './components/ResumePage.vue'
import AdminPage from './components/AdminPage.vue'

const currentPage = ref('resume')
const currentPost = ref(null)
const currentAlgoPost = ref(null)

const pageTitle = computed(() => {
  const map = {
    resume: '我的简历',
    home: '技术博客',
    post: '文章详情',
    algorithm: '算法学习',
    'algo-detail': '算法详情',
    games: '小游戏',
    architecture: '博客架构',
    admin: '后台管理',
  }
  return map[currentPage.value] || '个人博客'
})

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
    <SideBar @navigate="navigateTo" :currentPage="currentPage" />

    <div class="main-wrapper">
      <main class="main-content">
        <!-- 页面标题 -->
        <div class="page-indicator">
          <span class="page-dot"></span>
          <span class="page-name">{{ pageTitle }}</span>
        </div>

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
          <p>&copy; {{ new Date().getFullYear() }} fuzhichao · 用 ❤️ 和 Vue 3 + Vite 构建</p>
          <p class="footer-tagline">不断学习，持续进步</p>
        </div>
      </footer>
    </div>
  </div>
</template>

<style>
:root {
  --bg-primary: #f5f5f9;
  --bg-secondary: #eef0f5;
  --bg-card: #ffffff;
  --text-primary: #1e1e2e;
  --text-secondary: #585b70;
  --text-muted: #9399b2;
  --accent: #6c63ff;
  --accent-hover: #5a52d5;
  --accent-light: rgba(108, 99, 255, 0.12);
  --border: #e2e4ea;
  --shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-hover: 0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04);
  --shadow-card: 0 1px 3px rgba(0, 0, 0, 0.04);
  --radius: 14px;
  --radius-sm: 8px;
  --radius-xs: 6px;
  --transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  --max-width: 860px;
  --sidebar-width: 260px;
}

[data-theme="dark"] {
  --bg-primary: #0e0e1a;
  --bg-secondary: #15152a;
  --bg-card: #1a1a35;
  --text-primary: #e2e2f0;
  --text-secondary: #a8a8c8;
  --text-muted: #7878a0;
  --accent: #818cf8;
  --accent-hover: #6366f1;
  --accent-light: rgba(129, 140, 248, 0.15);
  --border: #28284a;
  --shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  --shadow-hover: 0 4px 16px rgba(0, 0, 0, 0.3);
  --shadow-card: 0 1px 3px rgba(0, 0, 0, 0.15);
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Roboto, sans-serif;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 24px;
}

/* ── 侧边栏 + 主内容布局 ── */
.main-wrapper {
  margin-left: var(--sidebar-width);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  transition: margin-left 0.3s ease;
}

.main-content {
  flex: 1;
  padding: 32px 0;
}

/* 页面顶部指示器 */
.page-indicator {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 24px;
  margin-bottom: 24px;
  max-width: var(--max-width);
  margin-left: auto;
  margin-right: auto;
}
.page-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--accent);
  animation: pulse-dot 2s ease-in-out infinite;
}
@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.8); }
}
.page-name {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-muted);
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

/* ── 页脚 ── */
.footer {
  text-align: center;
  padding: 28px 24px;
  border-top: 1px solid var(--border);
  color: var(--text-muted);
  font-size: 0.8rem;
}
.footer-tagline {
  margin-top: 4px;
  font-size: 0.75rem;
  opacity: 0.8;
}

/* ── 通用卡片样式 ── */
.card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow-card);
  transition: var(--transition);
}
.card:hover {
  box-shadow: var(--shadow-hover);
  border-color: var(--accent);
}

/* ── 滚动条 ── */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: var(--text-muted); }

/* ── 响应式 ── */
/* iPad 横屏 (1024px+)：固定侧边栏 */
@media (min-width: 1024px) {
  .main-wrapper { margin-left: var(--sidebar-width); }
}

/* iPad 竖屏 & 平板 (< 1024px)：全屏模式 */
@media (max-width: 1023px) {
  .main-wrapper { margin-left: 0; padding-top: 0; }
  .main-content { padding: 20px 0; }
  .container { padding: 0 16px; }
}
</style>
