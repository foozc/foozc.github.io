<script setup>
import { ref } from 'vue'
import { architectureData } from '../data/architecture.js'

const activeTab = ref('overview')

const renderTree = (node, depth = 0) => {
  const padding = depth * 20
  if (node.children) {
    return `
      <div class="tree-node" style="padding-left: ${padding}px">
        <div class="tree-node-label">
          <span class="tree-folder">📂</span>
          <span class="tree-node-name">${node.name}</span>
          ${node.desc ? `<span class="tree-node-desc">${node.desc}</span>` : ''}
        </div>
        ${node.children.map(c => renderTree(c, depth + 1)).join('')}
      </div>
    `
  }
  return `
    <div class="tree-node" style="padding-left: ${padding}px">
      <div class="tree-node-label">
        <span class="tree-file">📄</span>
        <span class="tree-node-name">${node.name}</span>
        ${node.desc ? `<span class="tree-node-desc">${node.desc}</span>` : ''}
      </div>
    </div>
  `
}
</script>

<template>
  <div class="container arch-page">
    <!-- 顶部 Hero -->
    <section class="hero">
      <div class="hero-badge">🏗️ 架构全景</div>
      <h1 class="hero-title">博客架构设计</h1>
      <p class="hero-desc">{{ architectureData.overview.description }}</p>
    </section>

    <!-- 选项卡导航 -->
    <div class="tab-nav">
      <button v-for="tab in [
        { key: 'overview', label: '概览', icon: '👁️' },
        { key: 'layers', label: '分层架构', icon: '🧱' },
        { key: 'components', label: '组件树', icon: '🌳' },
        { key: 'flow', label: '数据流', icon: '🌊' },
        { key: 'responsive', label: '响应式', icon: '📱' },
        { key: 'patterns', label: '设计模式', icon: '🧩' },
        { key: 'perf', label: '性能', icon: '⚡' },
      ]" :key="tab.key"
        :class="['tab-btn', { active: activeTab === tab.key }]"
        @click="activeTab = tab.key"
      >
        <span class="tab-icon">{{ tab.icon }}</span>
        <span class="tab-label">{{ tab.label }}</span>
      </button>
    </div>

    <!-- ====== 概览 ====== -->
    <section v-if="activeTab === 'overview'" class="section fade-in">
      <!-- 技术栈 -->
      <h2 class="section-title"><span class="title-icon">💻</span> 技术栈</h2>
      <div class="tech-grid">
        <div v-for="tech in architectureData.techStack" :key="tech.name" class="tech-card">
          <div class="tech-icon">{{ tech.icon }}</div>
          <div class="tech-info">
            <h3>{{ tech.name }}</h3>
            <span class="tech-role">{{ tech.role }}</span>
            <span class="tech-version">{{ tech.version }}</span>
            <p class="tech-desc">{{ tech.desc }}</p>
          </div>
        </div>
      </div>

      <!-- 架构图（纯CSS线框图） -->
      <h2 class="section-title" style="margin-top: 48px"><span class="title-icon">🏗️</span> 架构线框图</h2>
      <div class="arch-diagram">
        <!-- 用户 -->
        <div class="diag-layer user-layer">
          <div class="diag-node user-node">👤 用户</div>
          <div class="diag-arrow">↓ HTTPS</div>
        </div>

        <!-- CDN -->
        <div class="diag-layer cdn-layer">
          <div class="diag-node cdn-node">📦 GitHub Pages CDN</div>
          <div class="diag-arrow">↓ 静态资源</div>
        </div>

        <!-- 应用层 -->
        <div class="diag-layer app-layer">
          <div class="diag-node app-node">💚 Vue 3 SPA</div>
        </div>

        <!-- 组件层 -->
        <div class="diag-layer comp-layer">
          <div class="diag-row">
            <div class="diag-node comp-node">SideBar</div>
            <div class="diag-node comp-node active-node">页面组件</div>
            <div class="diag-node comp-node">游戏组件</div>
          </div>
          <div class="diag-arrow">↓ 导入</div>
        </div>

        <!-- 数据层 -->
        <div class="diag-layer data-layer">
          <div class="diag-row">
            <div class="diag-node data-node">blog.js</div>
            <div class="diag-node data-node">resume.js</div>
            <div class="diag-node data-node">algorithm.js</div>
            <div class="diag-node data-node">architecture.js</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ====== 分层架构 ====== -->
    <section v-if="activeTab === 'layers'" class="section fade-in">
      <h2 class="section-title"><span class="title-icon">🧱</span> 四层架构</h2>
      <div class="layers-stack">
        <div v-for="(layer, i) in architectureData.layers" :key="layer.name"
          class="layer-card"
          :style="{ borderLeftColor: layer.color }"
        >
          <div class="layer-header">
            <span class="layer-badge" :style="{ background: layer.color }">L{{ i + 1 }}</span>
            <h3>{{ layer.name }}</h3>
          </div>
          <ul class="layer-items">
            <li v-for="item in layer.items" :key="item">{{ item }}</li>
          </ul>
          <div v-if="i < architectureData.layers.length - 1" class="layer-arrow">
            <span class="arrow-line"></span>
            <span class="arrow-head">▼</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ====== 组件树 ====== -->
    <section v-if="activeTab === 'components'" class="section fade-in">
      <h2 class="section-title"><span class="title-icon">🌳</span> 组件树</h2>
      <p class="section-subtitle">Vue 组件层级关系，同级组件通过条件渲染切换</p>
      <div class="tree-card" v-html="renderTree(architectureData.componentTree)"></div>
    </section>

    <!-- ====== 数据流 ====== -->
    <section v-if="activeTab === 'flow'" class="section fade-in">
      <h2 class="section-title"><span class="title-icon">🌊</span> 数据流</h2>
      <p class="section-subtitle">从用户访问到页面渲染的完整链路</p>
      <div class="flow-timeline">
        <div v-for="item in architectureData.dataFlow" :key="item.step" class="flow-card">
          <div class="flow-step-badge">{{ item.step }}</div>
          <div class="flow-body">
            <div class="flow-icon">{{ item.icon }}</div>
            <div class="flow-content">
              <strong>{{ item.action }}</strong>
              <p>{{ item.desc }}</p>
            </div>
          </div>
          <div v-if="item.step < architectureData.dataFlow.length" class="flow-connector">
            <span class="connector-line"></span>
            <span class="connector-arrow">▼</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ====== 响应式 ====== -->
    <section v-if="activeTab === 'responsive'" class="section fade-in">
      <h2 class="section-title"><span class="title-icon">📱</span> 响应式策略</h2>
      <p class="section-subtitle">四档断点适配桌面、iPad、iPhone 横/竖屏</p>
      <div class="responsive-grid">
        <div v-for="r in architectureData.responsiveStrategy" :key="r.breakpoint" class="resp-card">
          <div class="resp-device">
            <span class="device-icon">{{ r.device.includes('iPhone') ? '📱' : r.device.includes('iPad') ? '📟' : '💻' }}</span>
          </div>
          <div class="resp-info">
            <div class="resp-breakpoint">{{ r.breakpoint }}</div>
            <div class="resp-device-name">{{ r.device }}</div>
            <div class="resp-layout">{{ r.layout }}</div>
            <div class="resp-sidebar">{{ r.sidebar }}</div>
          </div>
        </div>
      </div>

      <!-- 布局示意 -->
      <h3 class="subsection-title">布局切换示意</h3>
      <div class="layout-demo">
        <div class="demo-card desktop-demo">
          <div class="demo-sidebar">侧边栏</div>
          <div class="demo-content">主内容区</div>
          <div class="demo-label">≥ 1024px 桌面</div>
        </div>
        <div class="demo-arrow">→</div>
        <div class="demo-card tablet-demo">
          <div class="demo-hamburger">☰</div>
          <div class="demo-content">主内容区（全屏）</div>
          <div class="demo-label">768~1023px iPad</div>
        </div>
        <div class="demo-arrow">→</div>
        <div class="demo-card phone-demo">
          <div class="demo-hamburger">☰</div>
          <div class="demo-content">紧凑内容</div>
          <div class="demo-label">< 480px iPhone</div>
        </div>
      </div>
    </section>

    <!-- ====== 设计模式 ====== -->
    <section v-if="activeTab === 'patterns'" class="section fade-in">
      <h2 class="section-title"><span class="title-icon">🧩</span> 设计模式</h2>
      <p class="section-subtitle">项目采用的前端最佳实践</p>
      <div class="patterns-grid">
        <div v-for="p in architectureData.designPatterns" :key="p.name" class="pattern-card">
          <div class="pattern-icon">{{ p.icon }}</div>
          <h3>{{ p.name }}</h3>
          <p>{{ p.desc }}</p>
        </div>
      </div>
    </section>

    <!-- ====== 性能 ====== -->
    <section v-if="activeTab === 'perf'" class="section fade-in">
      <h2 class="section-title"><span class="title-icon">⚡</span> 性能优化</h2>
      <div class="perf-grid">
        <div v-for="p in architectureData.performance" :key="p.metric" class="perf-card">
          <div class="perf-icon">{{ p.icon }}</div>
          <div class="perf-body">
            <h3>{{ p.metric }}</h3>
            <p>{{ p.detail }}</p>
          </div>
        </div>
      </div>

      <!-- 文件结构 -->
      <h2 class="section-title" style="margin-top: 48px"><span class="title-icon">📁</span> 项目文件结构</h2>
      <div class="file-tree-card">
        <div v-for="item in architectureData.structure" :key="item.name" class="file-item">
          <div class="file-item-header">
            <span class="file-icon">{{ item.name.startsWith('📁') ? '📁' : '📄' }}</span>
            <span class="file-name">{{ item.name.replace(/^[^\s]+\s/, '') }}</span>
            <span class="file-desc">{{ item.desc }}</span>
          </div>
          <div v-if="item.children" class="file-children">
            <div v-for="child in item.children" :key="child.name" class="file-child">
              <span class="file-icon small">{{ child.name.startsWith('📁') ? '📁' : '📄' }}</span>
              <span class="file-name">{{ child.name.replace(/^[^\s]+\s/, '') }}</span>
              <span class="file-desc">{{ child.desc }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.arch-page {
  padding-bottom: 80px;
}

/* ── Hero ── */
.hero {
  text-align: center;
  padding: 32px 0 28px;
}
.hero-badge {
  display: inline-block;
  padding: 4px 16px;
  border-radius: 20px;
  background: var(--accent-light);
  color: var(--accent);
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 12px;
}
.hero-title {
  font-size: 2.2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 12px;
}
.hero-desc {
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
}

/* ── 选项卡 ── */
.tab-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 32px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border);
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
.tab-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--bg-card);
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 0.85rem;
  white-space: nowrap;
  transition: var(--transition);
}
.tab-btn:hover { border-color: var(--accent); color: var(--accent); }
.tab-btn.active {
  background: var(--accent);
  color: white;
  border-color: var(--accent);
  box-shadow: 0 4px 12px rgba(108, 99, 255, 0.3);
}
.tab-icon { font-size: 1rem; }
.tab-label { font-weight: 500; }

/* ── 动画 ── */
.fade-in {
  animation: fadeUp 0.4s ease;
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ── 通用 ── */
.section-title {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.title-icon { font-size: 1.3rem; }
.section-subtitle {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 20px;
  margin-top: -12px;
}
.subsection-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 32px 0 16px;
  color: var(--text-primary);
}

/* ── 技术栈 ── */
.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}
.tech-card {
  display: flex;
  gap: 14px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 20px;
  transition: var(--transition);
}
.tech-card:hover { box-shadow: var(--shadow-hover); border-color: var(--accent); }
.tech-icon { font-size: 2rem; line-height: 1; }
.tech-info { flex: 1; }
.tech-info h3 { font-size: 1rem; margin-bottom: 4px; }
.tech-role {
  display: inline-block;
  font-size: 0.75rem;
  color: var(--accent);
  font-weight: 600;
  background: var(--accent-light);
  padding: 2px 8px;
  border-radius: 4px;
  margin-right: 6px;
}
.tech-version {
  font-size: 0.75rem;
  color: var(--text-muted);
  font-family: monospace;
}
.tech-desc {
  color: var(--text-secondary);
  font-size: 0.85rem;
  margin-top: 6px;
}

/* ── 架构线框图 ── */
.arch-diagram {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
}
.diag-layer {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.diag-arrow {
  color: var(--text-muted);
  font-size: 0.8rem;
  padding: 6px 0;
  font-family: monospace;
}
.diag-row {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}
.diag-node {
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 600;
  text-align: center;
  border: 2px solid transparent;
}
.user-node { background: #e0e7ff; color: #4338ca; border-color: #818cf8; }
.cdn-node { background: #d1fae5; color: #065f46; border-color: #34d399; }
.app-node { background: #dbeafe; color: #1e40af; border-color: #60a5fa; }
.comp-node { background: #fce7f3; color: #9d174d; border-color: #f472b6; }
.active-node { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-light); }
.data-node { background: #fef3c7; color: #92400e; border-color: #fbbf24; }

[data-theme="dark"] .user-node { background: #1e1b4b; color: #a5b4fc; }
[data-theme="dark"] .cdn-node { background: #064e3b; color: #6ee7b7; }
[data-theme="dark"] .app-node { background: #1e3a5f; color: #93c5fd; }
[data-theme="dark"] .comp-node { background: #4a1942; color: #f9a8d4; }
[data-theme="dark"] .data-node { background: #4a3a0a; color: #fcd34d; }

/* ── 分层架构 ── */
.layers-stack {
  display: flex;
  flex-direction: column;
  gap: 0;
}
.layer-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-left: 4px solid;
  border-radius: var(--radius-sm);
  padding: 20px;
  transition: var(--transition);
}
.layer-card:hover { box-shadow: var(--shadow-hover); }
.layer-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}
.layer-badge {
  width: 36px; height: 36px;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
  flex-shrink: 0;
}
.layer-header h3 { font-size: 1.1rem; }
.layer-items {
  list-style: none;
  padding: 0;
}
.layer-items li {
  padding: 4px 0;
  font-size: 0.85rem;
  color: var(--text-secondary);
}
.layer-items li::before {
  content: '•';
  color: var(--accent);
  margin-right: 8px;
}
.layer-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6px 0;
}
.arrow-line {
  width: 2px;
  height: 16px;
  background: var(--border);
}
.arrow-head {
  color: var(--text-muted);
  font-size: 0.7rem;
}

/* ── 组件树 ── */
.tree-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 20px;
  font-family: monospace;
  font-size: 0.85rem;
  line-height: 1.8;
}
.tree-node-label {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 3px 0;
}
.tree-folder, .tree-file { font-size: 0.9rem; }
.tree-node-name { font-weight: 600; color: var(--text-primary); }
.tree-node-desc {
  color: var(--text-muted);
  font-size: 0.8rem;
  font-family: sans-serif;
  margin-left: 6px;
}

/* ── 数据流 ── */
.flow-timeline {
  max-width: 600px;
}
.flow-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 16px;
  margin-bottom: 0;
  transition: var(--transition);
}
.flow-card:hover { box-shadow: var(--shadow-hover); }
.flow-step-badge {
  width: 28px; height: 28px;
  border-radius: 50%;
  background: var(--accent);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.8rem;
  margin-bottom: 8px;
}
.flow-body {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}
.flow-icon { font-size: 1.4rem; }
.flow-content strong { display: block; margin-bottom: 2px; }
.flow-content p { color: var(--text-secondary); font-size: 0.85rem; }
.flow-connector {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4px 0;
  margin-top: 8px;
}
.connector-line { width: 2px; height: 16px; background: var(--accent-light); }
.connector-arrow { color: var(--accent); font-size: 0.6rem; }

/* ── 响应式 ── */
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}
.resp-card {
  display: flex;
  gap: 14px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 16px;
  transition: var(--transition);
}
.resp-card:hover { box-shadow: var(--shadow-hover); }
.device-icon { font-size: 1.6rem; }
.resp-breakpoint {
  font-weight: 700;
  font-size: 0.9rem;
  color: var(--accent);
  font-family: monospace;
}
.resp-device-name {
  font-size: 0.85rem;
  font-weight: 600;
  margin: 4px 0;
}
.resp-layout, .resp-sidebar {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

/* 布局切换示意 */
.layout-demo {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}
.demo-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  overflow: hidden;
  width: 180px;
}
.demo-sidebar {
  background: var(--accent);
  color: white;
  padding: 12px 8px;
  font-size: 0.75rem;
  text-align: center;
}
.demo-hamburger {
  background: var(--bg-secondary);
  padding: 8px;
  text-align: center;
  font-size: 1rem;
  border-bottom: 1px solid var(--border);
}
.demo-content {
  padding: 24px 12px;
  text-align: center;
  font-size: 0.75rem;
  color: var(--text-secondary);
}
.demo-label {
  padding: 6px;
  text-align: center;
  font-size: 0.7rem;
  color: var(--text-muted);
  background: var(--bg-secondary);
  border-top: 1px solid var(--border);
}
.desktop-demo { width: 200px; }
.tablet-demo { width: 160px; }
.phone-demo { width: 120px; }
.demo-arrow {
  color: var(--text-muted);
  font-size: 1.2rem;
}

/* ── 设计模式 ── */
.patterns-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}
.pattern-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 20px;
  transition: var(--transition);
  text-align: center;
}
.pattern-card:hover { box-shadow: var(--shadow-hover); border-color: var(--accent); }
.pattern-icon { font-size: 2rem; margin-bottom: 8px; }
.pattern-card h3 { color: var(--accent); margin-bottom: 8px; font-size: 1rem; }
.pattern-card p { color: var(--text-secondary); font-size: 0.85rem; }

/* ── 性能 ── */
.perf-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}
.perf-card {
  display: flex;
  gap: 14px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 16px;
  transition: var(--transition);
}
.perf-card:hover { box-shadow: var(--shadow-hover); }
.perf-icon { font-size: 1.5rem; }
.perf-body h3 { font-size: 0.95rem; margin-bottom: 4px; }
.perf-body p { color: var(--text-secondary); font-size: 0.85rem; }

/* ── 文件结构 ── */
.file-tree-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 16px;
}
.file-item { margin-bottom: 8px; }
.file-item:last-child { margin-bottom: 0; }
.file-item-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  border-radius: 6px;
  background: var(--bg-card);
  border: 1px solid var(--border);
}
.file-icon { font-size: 0.9rem; }
.file-icon.small { font-size: 0.8rem; }
.file-name { font-weight: 600; font-family: monospace; font-size: 0.85rem; }
.file-desc { color: var(--text-secondary); font-size: 0.8rem; margin-left: auto; }
.file-children {
  margin-left: 24px;
  margin-top: 4px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.file-child {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 8px;
  border-radius: 4px;
}
.file-child:hover { background: var(--accent-light); }

/* ── 响应式 ── */
@media (max-width: 768px) {
  .hero-title { font-size: 1.8rem; }
  .tab-nav { gap: 6px; }
  .tab-btn { padding: 6px 12px; font-size: 0.8rem; }
  .tab-label { display: none; }
  .tab-btn.active .tab-label { display: inline; }
  .tech-grid { grid-template-columns: 1fr; }
  .layout-demo { flex-direction: column; }
  .demo-arrow { transform: rotate(90deg); }
  .diag-row { flex-direction: column; align-items: center; }
  .arch-diagram { padding: 16px 12px; }
}

@media (max-width: 480px) {
  .hero { padding: 20px 0; }
  .hero-title { font-size: 1.5rem; }
  .section-title { font-size: 1.1rem; }
  .patterns-grid { grid-template-columns: 1fr; }
  .perf-grid { grid-template-columns: 1fr; }
  .responsive-grid { grid-template-columns: 1fr; }
  .file-desc { display: none; }
}
</style>