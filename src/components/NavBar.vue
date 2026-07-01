<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps(['currentPage'])
const emit = defineEmits(['navigate'])

const codeIcon = '</>'
const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  const theme = isDark.value ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('theme', theme)
}

onMounted(() => {
  const saved = localStorage.getItem('theme')
  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDark.value = true
    document.documentElement.setAttribute('data-theme', 'dark')
  }
})
</script>

<template>
  <header class="header">
    <div class="container">
      <nav class="nav">
        <a class="logo" href="#" @click.prevent="emit('navigate', 'home')">
          <span class="logo-icon">{{ codeIcon }}</span>
          <span>大象</span>
        </a>
        <div class="nav-links">
          <a href="#" @click.prevent="emit('navigate', 'home')"
             :class="['nav-link', { active: currentPage === 'home' }]">📝 博客</a>
          <a href="#" @click.prevent="emit('navigate', 'algorithm')"
             :class="['nav-link', { active: currentPage === 'algorithm' }]">🧮 算法</a>
          <a href="#" @click.prevent="emit('navigate', 'games')"
             :class="['nav-link', { active: currentPage === 'games' }]">🎮 游戏</a>
          <a href="#" @click.prevent="emit('navigate', 'architecture')"
             :class="['nav-link', { active: currentPage === 'architecture' }]">🏗️ 架构</a>
          <a href="#" @click.prevent="emit('navigate', 'resume')"
             :class="['nav-link', { active: currentPage === 'resume' }]">📄 简历</a>
        </div>
        <div class="nav-right">
          <a href="#" @click.prevent="emit('navigate', 'admin')" class="admin-entry" title="后台管理">⚙️</a>
          <button class="theme-toggle" @click="toggleTheme" :title="isDark ? '切换亮色模式' : '切换暗色模式'">
            {{ isDark ? '☀️' : '🌙' }}
          </button>
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: var(--header-height);
  border-bottom: 1px solid var(--border);
  z-index: 1000;
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.9);
  transition: var(--transition);
}

[data-theme="dark"] .header {
  background-color: rgba(15, 15, 35, 0.9);
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header-height);
  gap: 8px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary) !important;
  text-decoration: none;
  flex-shrink: 0;
}

.logo-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px; height: 36px;
  background: var(--accent);
  color: white;
  border-radius: var(--radius-sm);
  font-size: 0.9rem;
  font-weight: bold;
}

.nav-links {
  display: flex;
  gap: 4px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.nav-link {
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  color: var(--text-secondary) !important;
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;
  font-size: 0.9rem;
  transition: var(--transition);
}

.nav-link:hover,
.nav-link.active {
  color: var(--accent) !important;
  background-color: var(--accent-light);
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.admin-entry {
  font-size: 1.1rem;
  text-decoration: none;
  padding: 6px 8px;
  border-radius: var(--radius-sm);
  transition: var(--transition);
}

.admin-entry:hover {
  background-color: var(--accent-light);
}

.theme-toggle {
  background: none;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 6px 10px;
  cursor: pointer;
  font-size: 1rem;
  transition: var(--transition);
  background-color: var(--bg-secondary);
}

.theme-toggle:hover {
  border-color: var(--accent);
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .nav-links { gap: 2px; }
  .nav-link { padding: 6px 8px; font-size: 0.8rem; }
}
</style>