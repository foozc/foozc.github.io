<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps(['currentPage'])
const emit = defineEmits(['navigate'])

const codeIcon = '</>'
const isDark = ref(false)
const isOpen = ref(false)

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

const closeMenu = () => { isOpen.value = false }

const navItems = [
  { page: 'resume', icon: '👤', label: '我的简历', desc: 'Personal Resume' },
  { page: 'home', icon: '📝', label: '博客', desc: 'Blog Posts' },
  { page: 'algorithm', icon: '🧮', label: '算法', desc: 'Algorithms' },
  { page: 'ipad-pro', icon: '📱', label: 'iPad Pro', desc: 'Product Showcase' },
  { page: 'games', icon: '🎮', label: '游戏', desc: 'Mini Games' },
  { page: 'architecture', icon: '🏗️', label: '架构', desc: 'Architecture' },
]
</script>

<template>
  <!-- 汉堡按钮 -->
  <button class="hamburger" @click="isOpen = !isOpen" :class="{ active: isOpen }" aria-label="菜单">
    <span></span><span></span><span></span>
  </button>

  <!-- 遮罩层 -->
  <div v-if="isOpen" class="overlay" @click="closeMenu"></div>

  <!-- 侧边栏 -->
  <aside class="sidebar" :class="{ open: isOpen }">
    <div class="sidebar-inner">
      <!-- Logo -->
      <div class="sidebar-logo" @click="emit('navigate', 'resume'); closeMenu()">
        <div class="logo-icon">{{ codeIcon }}</div>
        <div class="logo-text">
          <span class="logo-title">fuzhichao</span>
          <span class="logo-subtitle">软件经理</span>
        </div>
      </div>

      <!-- 导航菜单 -->
      <nav class="sidebar-nav">
        <div
          v-for="item in navItems"
          :key="item.page"
          :class="['nav-item', { active: currentPage === item.page }]"
          @click="emit('navigate', item.page); closeMenu()"
        >
          <span class="nav-icon">{{ item.icon }}</span>
          <div class="nav-text">
            <span class="nav-label">{{ item.label }}</span>
            <span class="nav-desc">{{ item.desc }}</span>
          </div>
        </div>
      </nav>

      <!-- 底部工具 -->
      <div class="sidebar-footer">
        <div class="sidebar-tools">
          <button class="tool-btn admin-btn" @click="emit('navigate', 'admin'); closeMenu()" title="后台管理">
            ⚙️ <span>管理</span>
          </button>
          <button class="tool-btn theme-btn" @click="toggleTheme" :title="isDark ? '切换亮色' : '切换暗色'">
            {{ isDark ? '☀️' : '🌙' }}
          </button>
        </div>
        <div class="sidebar-meta">
          <span>v1.0</span>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
/* ── 汉堡按钮 ── */
.hamburger {
  display: none;
  position: fixed;
  top: 12px;
  left: 12px;
  z-index: 1110;
  width: 40px;
  height: 40px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 10px;
  cursor: pointer;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  box-shadow: var(--shadow);
  transition: var(--transition);
}
.hamburger:hover { border-color: var(--accent); }
.hamburger span {
  display: block;
  width: 20px;
  height: 2.5px;
  background: var(--text-primary);
  border-radius: 2px;
  transition: var(--transition);
}
.hamburger.active span:nth-child(1) { transform: translateY(7.5px) rotate(45deg); }
.hamburger.active span:nth-child(2) { opacity: 0; }
.hamburger.active span:nth-child(3) { transform: translateY(-7.5px) rotate(-45deg); }

/* ── 遮罩 ── */
.overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.35);
  z-index: 1100;
  backdrop-filter: blur(2px);
  -webkit-tap-highlight-color: transparent;
}

/* ── 侧边栏 ── */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 260px;
  background: var(--bg-card);
  border-right: 1px solid var(--border);
  z-index: 1101;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  -webkit-overflow-scrolling: touch;
}

.sidebar-inner {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 24px 16px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

/* ── Logo ── */
.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  margin-bottom: 28px;
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: var(--transition);
  -webkit-tap-highlight-color: transparent;
}
.sidebar-logo:hover { background: var(--accent-light); }

.logo-icon {
  width: 44px; height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--accent), #f472b6);
  color: white;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: bold;
  font-family: monospace;
  flex-shrink: 0;
}
.logo-text { display: flex; flex-direction: column; }
.logo-title { font-size: 1.1rem; font-weight: 800; color: var(--text-primary); }
.logo-subtitle { font-size: 0.7rem; color: var(--text-muted); }

/* ── 导航 ── */
.sidebar-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.25s ease;
  color: var(--text-secondary);
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}
.nav-item:hover {
  background: var(--accent-light);
  color: var(--text-primary);
}
.nav-item.active {
  background: var(--accent);
  color: white !important;
  box-shadow: 0 4px 12px rgba(108, 99, 255, 0.3);
}
.nav-item.active .nav-desc { color: rgba(255,255,255,0.7); }

.nav-icon {
  font-size: 1.4rem;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.nav-text { display: flex; flex-direction: column; min-width: 0; }
.nav-label { font-size: 0.95rem; font-weight: 600; }
.nav-desc { font-size: 0.7rem; color: var(--text-muted); margin-top: 1px; }

/* ── 底部 ── */
.sidebar-footer {
  padding-top: 16px;
  border-top: 1px solid var(--border);
  margin-top: auto;
}

.sidebar-tools {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}
.tool-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--bg-secondary);
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 0.85rem;
  transition: var(--transition);
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}
.tool-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
  background: var(--accent-light);
}
.theme-btn { font-size: 1.1rem; padding: 8px 12px; }

.sidebar-meta {
  font-size: 0.7rem;
  color: var(--text-muted);
  padding: 0 4px;
  text-align: center;
}

/* ── 响应式 ── */
@media (min-width: 1024px) {
  .sidebar { transform: translateX(0) !important; }
}

@media (max-width: 1023px) {
  .hamburger { display: flex; }
  .overlay { display: block; }
  .sidebar {
    transform: translateX(-100%);
    width: 260px;
    box-shadow: 4px 0 20px rgba(0,0,0,0.15);
  }
  .sidebar.open { transform: translateX(0); }
}

/* iPhone 竖屏 */
@media (max-width: 480px) {
  .sidebar { width: 100%; max-width: 280px; }
  .sidebar-inner { padding: 20px 14px; }
  .nav-item { padding: 10px 12px; }
  .nav-icon { font-size: 1.2rem; width: 32px; height: 32px; }
  .nav-label { font-size: 0.9rem; }
  .nav-desc { display: none; }
  .sidebar-logo { margin-bottom: 20px; }
  .logo-icon { width: 38px; height: 38px; font-size: 0.8rem; }
  .logo-title { font-size: 1rem; }
  .admin-btn span { display: none; }
  .hamburger { top: 8px; left: 8px; width: 36px; height: 36px; }
}
</style>
