<script setup>
import { ref, computed } from 'vue'
import { architectureData } from '../data/architecture.js'

const activeTab = ref('principles')

// ─── 可折叠组件树 ───
const expandedNodes = ref(new Set())

const toggleNode = (key) => {
  const s = new Set(expandedNodes.value)
  if (s.has(key)) s.delete(key); else s.add(key)
  expandedNodes.value = s
}

let nodeKey = 0
const nextKey = () => `node-${++nodeKey}`

// ─── 交互式数据流 ───
const activeFlowStep = ref(0)
const nextFlowStep = () => {
  if (activeFlowStep.value < architectureData.dataFlow.length - 1)
    activeFlowStep.value++
}
const prevFlowStep = () => {
  if (activeFlowStep.value > 0) activeFlowStep.value--
}
</script>

<template>
  <div class="container arch-page">
    <!-- 顶部 Hero -->
    <section class="hero">
      <div class="hero-badge">🏗️ 架构全景</div>
      <h1 class="hero-title">{{ architectureData.overview.title }}</h1>
      <p class="hero-desc">{{ architectureData.overview.description }}</p>
    </section>

    <!-- 选项卡导航 -->
    <div class="tab-nav" role="tablist">
      <button
        v-for="tab in [
          { key: 'principles', label: '设计原则', icon: '🎯' },
          { key: 'layers', label: '分层架构', icon: '🧱' },
          { key: 'components', label: '组件树', icon: '🌳' },
          { key: 'flow', label: '数据流', icon: '🌊' },
          { key: 'adr', label: '决策记录', icon: '📋' },
          { key: 'responsive', label: '响应式', icon: '📱' },
          { key: 'patterns', label: '设计模式', icon: '🧩' },
          { key: 'perf', label: '性能', icon: '⚡' },
        ]" :key="tab.key"
        :class="['tab-btn', { active: activeTab === tab.key }]"
        @click="activeTab = tab.key"
        role="tab"
        :aria-selected="activeTab === tab.key"
      >
        <span class="tab-icon">{{ tab.icon }}</span>
        <span class="tab-label">{{ tab.label }}</span>
      </button>
    </div>

    <!-- ====== 🎯 核心设计原则（新） ====== -->
    <section v-if="activeTab === 'principles'" class="section fade-in">
      <div class="principles-header">
        <h2 class="section-title">{{ architectureData.corePrinciples.title }}</h2>
        <p class="section-subtitle">{{ architectureData.corePrinciples.description }}</p>
      </div>

      <div class="principles-board">
        <!-- 优先级图例 -->
        <div class="principles-legend">
          <div class="legend-item">
            <span class="legend-dot dot-red"></span>
            <span>最高优先级 — 必须严格遵守</span>
          </div>
          <div class="legend-item">
            <span class="legend-dot dot-orange"></span>
            <span>高优先级 — 优先遵循</span>
          </div>
          <div class="legend-item">
            <span class="legend-dot dot-green"></span>
            <span>持续践行 — 日常开发中养成习惯</span>
          </div>
        </div>

        <div class="principles-grid">
          <div
            v-for="p in architectureData.corePrinciples.items"
            :key="p.name"
            class="principle-card"
            :class="{
              'priority-highest': p.badge === '🔴',
              'priority-high': p.badge === '🟠',
              'priority-normal': p.badge === '🟢',
            }"
          >
            <div class="principle-badge">{{ p.badge }}</div>
            <div class="principle-icon">{{ p.icon }}</div>
            <h3 class="principle-name">{{ p.name }}</h3>
            <div class="principle-level" v-text="p.level"></div>
            <p class="principle-desc">{{ p.desc }}</p>
            <div class="principle-example">
              <span class="example-label">示例：</span>
              {{ p.example }}
            </div>
          </div>
        </div>
      </div>

      <!-- 技术栈 -->
      <h2 class="section-title" style="margin-top: 48px"><span class="title-icon">💻</span> 技术栈</h2>
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

      <!-- 架构线框图 -->
      <h2 class="section-title" style="margin-top: 48px"><span class="title-icon">🏗️</span> 架构线框图</h2>
      <div class="arch-diagram">
        <div class="diag-layer user-layer">
          <div class="diag-node user-node">👤 用户</div>
          <div class="diag-arrow">↓ HTTPS</div>
        </div>
        <div class="diag-layer cdn-layer">
          <div class="diag-node cdn-node">📦 GitHub Pages CDN</div>
          <div class="diag-arrow">↓ 静态资源</div>
        </div>
        <div class="diag-layer app-layer">
          <div class="diag-node app-node">💚 Vue 3 SPA</div>
        </div>
        <div class="diag-layer comp-layer">
          <div class="diag-row">
            <div class="diag-node comp-node">SideBar</div>
            <div class="diag-node comp-node active-node">页面组件</div>
            <div class="diag-node comp-node">游戏组件</div>
          </div>
          <div class="diag-arrow">↓ 导入</div>
        </div>
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

    <!-- ====== 🧱 分层架构 ====== -->
    <section v-if="activeTab === 'layers'" class="section fade-in">
      <h2 class="section-title"><span class="title-icon">🧱</span> 四层架构</h2>
      <div class="layers-stack">
        <div v-for="(layer, i) in architectureData.layers" :key="layer.name"
          class="layer-card"
          :style="{ borderLeftColor: layer.color }"
        >
          <div class="layer-header">
            <span class="layer-badge" :style="{ background: layer.color }">{{ layer.icon }}</span>
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

    <!-- ====== 🌳 交互式组件树（升级） ====== -->
    <section v-if="activeTab === 'components'" class="section fade-in">
      <h2 class="section-title"><span class="title-icon">🌳</span> 组件树</h2>
      <p class="section-subtitle">点击节点展开/折叠 · 展示 Vue 组件层级关系</p>

      <div class="tree-card">
        <!-- 根节点 -->
        <div class="tree-node is-root is-expanded">
          <div class="tree-node-label" @click="toggleNode('root')">
            <span class="tree-toggle">─</span>
            <span class="tree-icon">📁</span>
            <span class="tree-node-name">{{ architectureData.componentTree.root }}</span>
            <span class="tree-node-desc">{{ architectureData.componentTree.desc }}</span>
          </div>

          <!-- SideBar -->
          <div class="tree-node-children">
            <div class="tree-node">
              <div class="tree-node-label">
                <span class="tree-toggle-placeholder"></span>
                <span class="tree-icon">📄</span>
                <span class="tree-node-name">SideBar.vue</span>
                <span class="tree-node-desc">导航 + 主题切换 + 响应式汉堡菜单</span>
              </div>
            </div>

            <!-- 页面容器（可折叠） -->
            <div class="tree-node" :class="{ 'is-expanded': expandedNodes.has('pages') }">
              <div class="tree-node-label" @click="toggleNode('pages')">
                <span class="tree-toggle">{{ expandedNodes.has('pages') ? '−' : '+' }}</span>
                <span class="tree-icon">📁</span>
                <span class="tree-node-name">页面容器</span>
                <span class="tree-node-desc">{{ architectureData.componentTree.children[1].desc }}</span>
              </div>

              <div v-if="expandedNodes.has('pages')" class="tree-node-children">
                <div v-for="child in architectureData.componentTree.children[1].children" :key="child.name"
                  class="tree-node"
                  :class="{ 'is-expanded': expandedNodes.has(child.name) && child.children }"
                >
                  <div class="tree-node-label" @click="child.children ? toggleNode(child.name) : null">
                    <span class="tree-toggle">
                      {{ child.children ? (expandedNodes.has(child.name) ? '−' : '+') : '' }}
                    </span>
                    <span class="tree-icon">{{ child.children ? '📁' : '📄' }}</span>
                    <span class="tree-node-name">{{ child.name }}</span>
                    <span class="tree-node-desc">{{ child.desc }}</span>
                  </div>

                  <!-- 子节点（三级） -->
                  <div v-if="child.children && expandedNodes.has(child.name)" class="tree-node-children">
                    <div v-for="gc in child.children" :key="gc.name" class="tree-node">
                      <div class="tree-node-label">
                        <span class="tree-toggle-placeholder"></span>
                        <span class="tree-icon">📄</span>
                        <span class="tree-node-name">{{ gc.name }}</span>
                        <span class="tree-node-desc" v-if="gc.desc">{{ gc.desc }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ====== 🌊 交互式数据流（升级） ====== -->
    <section v-if="activeTab === 'flow'" class="section fade-in">
      <h2 class="section-title"><span class="title-icon">🌊</span> 数据流</h2>
      <p class="section-subtitle">从用户访问到页面渲染的完整链路 · 点击导航按钮逐步查看</p>

      <div class="flow-timeline">
        <div class="flow-progress">
          <div
            v-for="(item, i) in architectureData.dataFlow"
            :key="item.step"
            class="flow-progress-step"
            :class="{ active: i <= activeFlowStep, current: i === activeFlowStep }"
            @click="activeFlowStep = i"
          >
            <div class="flow-progress-dot">{{ i + 1 }}</div>
            <div class="flow-progress-line" v-if="i < architectureData.dataFlow.length - 1"></div>
          </div>
        </div>

        <div class="flow-step-detail">
          <div class="flow-card active">
            <div class="flow-icon-large">{{ architectureData.dataFlow[activeFlowStep].icon }}</div>
            <h3 class="flow-step-title">{{ architectureData.dataFlow[activeFlowStep].action }}</h3>
            <p class="flow-step-desc">{{ architectureData.dataFlow[activeFlowStep].desc }}</p>
            <div class="flow-step-detail-text">
              <span class="detail-label">技术细节：</span>
              {{ architectureData.dataFlow[activeFlowStep].detail }}
            </div>
            <div class="flow-step-nav">
              <button class="flow-nav-btn" @click="prevFlowStep" :disabled="activeFlowStep === 0">
                ← 上一步
              </button>
              <span class="flow-step-counter">{{ activeFlowStep + 1 }} / {{ architectureData.dataFlow.length }}</span>
              <button class="flow-nav-btn" @click="nextFlowStep" :disabled="activeFlowStep === architectureData.dataFlow.length - 1">
                下一步 →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ====== 📋 架构决策记录 ADR（新） ====== -->
    <section v-if="activeTab === 'adr'" class="section fade-in">
      <h2 class="section-title"><span class="title-icon">📋</span> 架构决策记录 (ADR)</h2>
      <p class="section-subtitle">重要的架构决策及其上下文、方案和后果</p>

      <div class="adr-timeline">
        <div v-for="adr in architectureData.adrs" :key="adr.id" class="adr-card">
          <div class="adr-header">
            <span class="adr-id">{{ adr.id }}</span>
            <span class="adr-status">{{ adr.status }}</span>
            <span class="adr-date">{{ adr.date }}</span>
          </div>
          <h3 class="adr-title">{{ adr.title }}</h3>
          <div class="adr-section">
            <span class="adr-section-label">📌 背景</span>
            <p>{{ adr.context }}</p>
          </div>
          <div class="adr-section">
            <span class="adr-section-label">✅ 决策</span>
            <p>{{ adr.decision }}</p>
          </div>
          <div class="adr-section">
            <span class="adr-section-label">📊 影响</span>
            <p>{{ adr.consequence }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ====== 📱 响应式（保持） ====== -->
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

    <!-- ====== 🧩 设计模式（保持） ====== -->
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

    <!-- ====== ⚡ 性能 + 文件结构（保持） ====== -->
    <section v-if="activeTab === 'perf'" class="section fade-in">
      <h2 class="section-title"><span class="title-icon">⚡</span> 性能优化</h2>
      <div class="perf-grid">
        <div v-for="p in architectureData.performance" :key="p.metric" class="perf-card">
          <div class="perf-icon">{{ p.icon }}</div>
          <div class="perf-body">
            <h3>{{ p.metric }} <span class="perf-value">{{ p.value }}</span></h3>
            <p>{{ p.detail }}</p>
          </div>
        </div>
      </div>

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
.arch-page { padding-bottom: 80px; }

/* ── Hero ── */
.hero { text-align: center; padding: 32px 0 28px; }
.hero-badge {
  display: inline-block; padding: 4px 16px; border-radius: 20px;
  background: var(--accent-light); color: var(--accent);
  font-size: 0.8rem; font-weight: 600; margin-bottom: 12px;
}
.hero-title {
  font-size: 2rem; font-weight: 800;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text; margin-bottom: 12px;
}
.hero-desc { color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6; max-width: 680px; margin: 0 auto; }

/* ── 选项卡 ── */
.tab-nav {
  display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 32px;
  padding-bottom: 12px; border-bottom: 1px solid var(--border);
  overflow-x: auto; -webkit-overflow-scrolling: touch;
}
.tab-btn {
  display: flex; align-items: center; gap: 6px;
  padding: 8px 16px; border: 1px solid var(--border);
  border-radius: 10px; background: var(--bg-card);
  color: var(--text-secondary); cursor: pointer;
  font-size: 0.85rem; white-space: nowrap; transition: var(--transition);
}
.tab-btn:hover { border-color: var(--accent); color: var(--accent); }
.tab-btn.active {
  background: var(--accent); color: white; border-color: var(--accent);
  box-shadow: 0 4px 12px rgba(108, 99, 255, 0.3);
}
.tab-icon { font-size: 1rem; }
.tab-label { font-weight: 500; }

/* ── 动画 ── */
.fade-in { animation: fadeUp 0.4s ease; }
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ── 通用 ── */
.section-title {
  font-size: 1.3rem; font-weight: 700; margin-bottom: 20px;
  display: flex; align-items: center; gap: 8px;
}
.title-icon { font-size: 1.3rem; }
.section-subtitle { color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 20px; margin-top: -12px; }
.subsection-title { font-size: 1.1rem; font-weight: 600; margin: 32px 0 16px; color: var(--text-primary); }

/* ======== 🎯 核心设计原则 ======== */
.principles-header { margin-bottom: 24px; }
.principles-legend {
  display: flex; flex-wrap: wrap; gap: 16px;
  padding: 12px 16px; background: var(--bg-secondary);
  border-radius: var(--radius-sm); margin-bottom: 24px;
  font-size: 0.85rem; color: var(--text-secondary);
}
.legend-item { display: flex; align-items: center; gap: 8px; }
.legend-dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }
.dot-red { background: #ef4444; }
.dot-orange { background: #f59e0b; }
.dot-green { background: #22c55e; }

.principles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}
.principle-card {
  background: var(--bg-card); border: 1px solid var(--border);
  border-radius: var(--radius); padding: 20px;
  transition: var(--transition); position: relative; overflow: hidden;
}
.principle-card:hover { box-shadow: var(--shadow-hover); }
.principle-card.priority-highest { border-left: 4px solid #ef4444; }
.principle-card.priority-high { border-left: 4px solid #f59e0b; }
.principle-card.priority-normal { border-left: 4px solid #22c55e; }
.principle-badge {
  position: absolute; top: 12px; right: 12px; font-size: 1.5rem;
  opacity: 0.3; user-select: none;
}
.principle-icon { font-size: 2rem; margin-bottom: 8px; }
.principle-name { font-size: 1.1rem; font-weight: 700; margin-bottom: 4px; }
.principle-level {
  display: inline-block; font-size: 0.75rem; padding: 2px 8px;
  border-radius: 4px; font-weight: 600; margin-bottom: 10px;
}
.priority-highest .principle-level { background: #fef2f2; color: #dc2626; }
.priority-high .principle-level { background: #fffbeb; color: #d97706; }
.priority-normal .principle-level { background: #f0fdf4; color: #16a34a; }
[data-theme="dark"] .priority-highest .principle-level { background: #450a0a; color: #fca5a5; }
[data-theme="dark"] .priority-high .principle-level { background: #451a03; color: #fcd34d; }
[data-theme="dark"] .priority-normal .principle-level { background: #052e16; color: #86efac; }
.principle-desc { color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 12px; line-height: 1.5; }
.principle-example {
  background: var(--bg-secondary); border-radius: 6px;
  padding: 10px 12px; font-size: 0.8rem; color: var(--text-muted);
  line-height: 1.5;
}
.example-label { font-weight: 600; color: var(--text-primary); }

/* ── 技术栈 ── */
.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}
.tech-card {
  display: flex; gap: 14px; background: var(--bg-card);
  border: 1px solid var(--border); border-radius: var(--radius);
  padding: 20px; transition: var(--transition);
}
.tech-card:hover { box-shadow: var(--shadow-hover); border-color: var(--accent); }
.tech-icon { font-size: 2rem; line-height: 1; }
.tech-info { flex: 1; }
.tech-info h3 { font-size: 1rem; margin-bottom: 4px; }
.tech-role {
  display: inline-block; font-size: 0.75rem; color: var(--accent);
  font-weight: 600; background: var(--accent-light);
  padding: 2px 8px; border-radius: 4px; margin-right: 6px;
}
.tech-version { font-size: 0.75rem; color: var(--text-muted); font-family: monospace; }
.tech-desc { color: var(--text-secondary); font-size: 0.85rem; margin-top: 6px; }

/* ── 架构线框图 ── */
.arch-diagram {
  background: var(--bg-secondary); border: 1px solid var(--border);
  border-radius: var(--radius); padding: 24px;
  display: flex; flex-direction: column; align-items: center; gap: 0;
}
.diag-layer { display: flex; flex-direction: column; align-items: center; width: 100%; }
.diag-arrow { color: var(--text-muted); font-size: 0.8rem; padding: 6px 0; font-family: monospace; }
.diag-row { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
.diag-node {
  padding: 10px 20px; border-radius: 10px; font-size: 0.85rem;
  font-weight: 600; text-align: center; border: 2px solid transparent;
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
.layers-stack { display: flex; flex-direction: column; gap: 0; }
.layer-card {
  background: var(--bg-card); border: 1px solid var(--border);
  border-left: 4px solid; border-radius: var(--radius-sm);
  padding: 20px; transition: var(--transition);
}
.layer-card:hover { box-shadow: var(--shadow-hover); }
.layer-header { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
.layer-badge {
  width: 36px; height: 36px; border-radius: 50%; color: white;
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 1.1rem; flex-shrink: 0;
}
.layer-header h3 { font-size: 1.1rem; }
.layer-items { list-style: none; padding: 0; }
.layer-items li { padding: 4px 0; font-size: 0.85rem; color: var(--text-secondary); }
.layer-items li::before { content: '•'; color: var(--accent); margin-right: 8px; }
.layer-arrow { display: flex; flex-direction: column; align-items: center; padding: 6px 0; }
.arrow-line { width: 2px; height: 16px; background: var(--border); }
.arrow-head { color: var(--text-muted); font-size: 0.7rem; }

/* ── 交互式组件树 ── */
.tree-card {
  background: var(--bg-secondary); border: 1px solid var(--border);
  border-radius: var(--radius); padding: 20px;
  font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
  font-size: 0.85rem; line-height: 1.8;
  user-select: none;
}
.tree-node { position: relative; }
.tree-node-label {
  display: flex; align-items: center; gap: 6px; padding: 4px 8px;
  border-radius: 6px; cursor: pointer; transition: background 0.15s;
}
.tree-node-label:hover { background: var(--accent-light); }
.tree-toggle {
  width: 16px; text-align: center; font-size: 0.8rem;
  color: var(--text-muted); flex-shrink: 0;
}
.tree-toggle-placeholder { width: 16px; flex-shrink: 0; }
.tree-icon { font-size: 0.9rem; flex-shrink: 0; }
.tree-node-name { font-weight: 600; color: var(--text-primary); }
.tree-node-desc {
  color: var(--text-muted); font-size: 0.8rem;
  font-family: sans-serif; margin-left: 6px;
}
.tree-node-children { margin-left: 22px; border-left: 1px dashed var(--border); padding-left: 6px; }
.is-root > .tree-node-label { font-size: 1rem; }
.is-root > .tree-node-label .tree-node-name { color: var(--accent); }

/* ── 交互式数据流 ── */
.flow-timeline { max-width: 600px; }
.flow-progress {
  display: flex; align-items: center; margin-bottom: 24px;
  overflow-x: auto; padding: 8px 0;
}
.flow-progress-step {
  display: flex; align-items: center; cursor: pointer;
  transition: transform 0.15s;
}
.flow-progress-step:hover { transform: scale(1.1); }
.flow-progress-dot {
  width: 32px; height: 32px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.8rem; font-weight: 700;
  background: var(--bg-card); color: var(--text-muted);
  border: 2px solid var(--border); transition: var(--transition);
  flex-shrink: 0;
}
.flow-progress-step.active .flow-progress-dot {
  background: var(--accent); color: white; border-color: var(--accent);
}
.flow-progress-step.current .flow-progress-dot {
  box-shadow: 0 0 0 4px var(--accent-light);
}
.flow-progress-line {
  width: 24px; height: 2px; background: var(--border);
  transition: background 0.3s;
}
.flow-progress-step.active ~ .flow-progress-step .flow-progress-line { background: var(--border); }

.flow-step-detail { min-height: 200px; }
.flow-card {
  background: var(--bg-card); border: 1px solid var(--border);
  border-radius: var(--radius); padding: 24px;
  transition: var(--transition);
}
.flow-card:hover { box-shadow: var(--shadow-hover); }
.flow-icon-large { font-size: 3rem; text-align: center; margin-bottom: 16px; }
.flow-step-title {
  font-size: 1.2rem; font-weight: 700; text-align: center; margin-bottom: 8px;
}
.flow-step-desc { color: var(--text-secondary); font-size: 0.9rem; text-align: center; margin-bottom: 16px; }
.flow-step-detail-text {
  background: var(--bg-secondary); border-radius: 8px;
  padding: 12px 16px; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 16px;
}
.detail-label { font-weight: 600; color: var(--text-primary); }
.flow-step-nav {
  display: flex; align-items: center; justify-content: space-between;
  padding-top: 16px; border-top: 1px solid var(--border);
}
.flow-nav-btn {
  padding: 6px 16px; border-radius: 8px; border: 1px solid var(--border);
  background: var(--bg-card); color: var(--text-primary);
  cursor: pointer; font-size: 0.85rem; transition: var(--transition);
}
.flow-nav-btn:hover:not(:disabled) { border-color: var(--accent); color: var(--accent); }
.flow-nav-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.flow-step-counter { font-size: 0.8rem; color: var(--text-muted); font-variant-numeric: tabular-nums; }

/* ── ADR ── */
.adr-timeline { display: flex; flex-direction: column; gap: 16px; }
.adr-card {
  background: var(--bg-card); border: 1px solid var(--border);
  border-left: 4px solid var(--accent); border-radius: var(--radius-sm);
  padding: 20px; transition: var(--transition);
}
.adr-card:hover { box-shadow: var(--shadow-hover); }
.adr-header { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
.adr-id {
  font-family: monospace; font-weight: 700; font-size: 0.8rem;
  color: var(--accent); background: var(--accent-light);
  padding: 2px 8px; border-radius: 4px;
}
.adr-status {
  font-size: 0.75rem; color: #16a34a; font-weight: 600;
  background: #f0fdf4; padding: 2px 8px; border-radius: 4px;
}
[data-theme="dark"] .adr-status { background: #052e16; color: #86efac; }
.adr-date { margin-left: auto; font-size: 0.8rem; color: var(--text-muted); }
.adr-title { font-size: 1.05rem; font-weight: 700; margin-bottom: 12px; }
.adr-section { margin-bottom: 10px; }
.adr-section:last-child { margin-bottom: 0; }
.adr-section-label { font-weight: 600; font-size: 0.85rem; color: var(--accent); display: block; margin-bottom: 4px; }
.adr-section p { color: var(--text-secondary); font-size: 0.85rem; line-height: 1.5; }

/* ── 响应式 ── */
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}
.resp-card {
  display: flex; gap: 14px; background: var(--bg-card);
  border: 1px solid var(--border); border-radius: var(--radius-sm);
  padding: 16px; transition: var(--transition);
}
.resp-card:hover { box-shadow: var(--shadow-hover); }
.device-icon { font-size: 1.6rem; }
.resp-breakpoint { font-weight: 700; font-size: 0.9rem; color: var(--accent); font-family: monospace; }
.resp-device-name { font-size: 0.85rem; font-weight: 600; margin: 4px 0; }
.resp-layout, .resp-sidebar { font-size: 0.8rem; color: var(--text-secondary); }

.layout-demo {
  display: flex; align-items: center; gap: 12px; flex-wrap: wrap; justify-content: center;
}
.demo-card {
  background: var(--bg-card); border: 1px solid var(--border);
  border-radius: var(--radius-sm); overflow: hidden; width: 180px;
}
.demo-sidebar {
  background: var(--accent); color: white; padding: 12px 8px;
  font-size: 0.75rem; text-align: center;
}
.demo-hamburger {
  background: var(--bg-secondary); padding: 8px; text-align: center;
  font-size: 1rem; border-bottom: 1px solid var(--border);
}
.demo-content { padding: 24px 12px; text-align: center; font-size: 0.75rem; color: var(--text-secondary); }
.demo-label {
  padding: 6px; text-align: center; font-size: 0.7rem;
  color: var(--text-muted); background: var(--bg-secondary);
  border-top: 1px solid var(--border);
}
.desktop-demo { width: 200px; }
.tablet-demo { width: 160px; }
.phone-demo { width: 120px; }
.demo-arrow { color: var(--text-muted); font-size: 1.2rem; }

/* ── 设计模式 ── */
.patterns-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}
.pattern-card {
  background: var(--bg-card); border: 1px solid var(--border);
  border-radius: var(--radius-sm); padding: 20px;
  transition: var(--transition); text-align: center;
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
  display: flex; gap: 14px; background: var(--bg-card);
  border: 1px solid var(--border); border-radius: var(--radius-sm);
  padding: 16px; transition: var(--transition);
}
.perf-card:hover { box-shadow: var(--shadow-hover); }
.perf-icon { font-size: 1.5rem; }
.perf-body h3 { font-size: 0.95rem; margin-bottom: 4px; display: flex; align-items: center; gap: 8px; }
.perf-value {
  font-family: monospace; font-size: 0.85rem; color: var(--accent);
  font-weight: 700; background: var(--accent-light);
  padding: 1px 8px; border-radius: 4px;
}
.perf-body p { color: var(--text-secondary); font-size: 0.85rem; }

/* ── 文件结构 ── */
.file-tree-card {
  background: var(--bg-secondary); border: 1px solid var(--border);
  border-radius: var(--radius-sm); padding: 16px;
}
.file-item { margin-bottom: 8px; }
.file-item:last-child { margin-bottom: 0; }
.file-item-header {
  display: flex; align-items: center; gap: 8px;
  padding: 6px 8px; border-radius: 6px;
  background: var(--bg-card); border: 1px solid var(--border);
}
.file-icon { font-size: 0.9rem; }
.file-icon.small { font-size: 0.8rem; }
.file-name { font-weight: 600; font-family: monospace; font-size: 0.85rem; }
.file-desc { color: var(--text-secondary); font-size: 0.8rem; margin-left: auto; }
.file-children { margin-left: 24px; margin-top: 4px; display: flex; flex-direction: column; gap: 2px; }
.file-child {
  display: flex; align-items: center; gap: 8px;
  padding: 5px 8px; border-radius: 4px;
}
.file-child:hover { background: var(--accent-light); }

/* ── 响应式 ── */
@media (max-width: 768px) {
  .hero-title { font-size: 1.6rem; }
  .tab-nav { gap: 6px; }
  .tab-btn { padding: 6px 12px; font-size: 0.8rem; }
  .tab-label { display: none; }
  .tab-btn.active .tab-label { display: inline; }
  .tech-grid { grid-template-columns: 1fr; }
  .principles-grid { grid-template-columns: 1fr; }
  .layout-demo { flex-direction: column; }
  .demo-arrow { transform: rotate(90deg); }
  .diag-row { flex-direction: column; align-items: center; }
  .arch-diagram { padding: 16px 12px; }
  .flow-progress { padding: 4px 0; }
  .flow-progress-line { width: 16px; }
  .adr-id { font-size: 0.75rem; }
}

@media (max-width: 480px) {
  .hero { padding: 20px 0; }
  .hero-title { font-size: 1.4rem; }
  .section-title { font-size: 1.1rem; }
  .patterns-grid { grid-template-columns: 1fr; }
  .perf-grid { grid-template-columns: 1fr; }
  .responsive-grid { grid-template-columns: 1fr; }
  .file-desc { display: none; }
  .principle-card { padding: 16px; }
  .principle-example { font-size: 0.75rem; }
}
</style>
