<script setup>
import { architectureData } from '../data/architecture.js'

const renderChildren = (children) => {
  if (!children) return ''
  return children.map(c => `<li>${c.name} - ${c.desc}${c.children ? '<ul>' + renderChildren(c.children) + '</ul>' : ''}</li>`).join('')
}
</script>

<template>
  <div class="container">
    <section class="hero">
      <h1 class="hero-title">🏗️ 博客架构</h1>
      <p class="hero-subtitle">{{ architectureData.overview.description }}</p>
    </section>

    <!-- 技术栈 -->
    <section class="arch-section">
      <h2 class="section-title">技术栈</h2>
      <div class="tech-grid">
        <div v-for="tech in architectureData.overview.techStack" :key="tech.name" class="tech-card">
          <h3>{{ tech.name }}</h3>
          <span class="tech-version">{{ tech.version }}</span>
          <p class="tech-role">{{ tech.role }}</p>
          <p class="tech-desc">{{ tech.desc }}</p>
        </div>
      </div>
    </section>

    <!-- 数据流 -->
    <section class="arch-section">
      <h2 class="section-title">数据流</h2>
      <div class="flow">
        <div v-for="item in architectureData.dataFlow" :key="item.step" class="flow-item">
          <div class="flow-step">{{ item.step }}</div>
          <div class="flow-content">
            <strong>{{ item.action }}</strong>
            <p v-if="item.via">{{ item.via }}</p>
            <p v-if="item.desc">{{ item.desc }}</p>
          </div>
          <div v-if="item.step < architectureData.dataFlow.length" class="flow-arrow">↓</div>
        </div>
      </div>
    </section>

    <!-- 项目结构 -->
    <section class="arch-section">
      <h2 class="section-title">项目结构</h2>
      <div class="file-tree">
        <div v-for="item in architectureData.structure" :key="item.name" class="tree-item">
          <span :class="['tree-icon', item.type === '目录' ? 'folder' : 'file']">
            {{ item.type === '目录' ? '📁' : '📄' }}
          </span>
          <span class="tree-name">{{ item.name }}</span>
          <span class="tree-desc">- {{ item.desc }}</span>
        </div>
      </div>
    </section>

    <!-- 设计模式 -->
    <section class="arch-section">
      <h2 class="section-title">设计模式</h2>
      <div class="patterns-grid">
        <div v-for="p in architectureData.designPatterns" :key="p.name" class="pattern-card">
          <h3>{{ p.name }}</h3>
          <p>{{ p.desc }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero { text-align: center; padding: 20px 0 48px; }
.hero-title { font-size: 2.5rem; font-weight: 800; background: linear-gradient(135deg, #8b5cf6, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 12px; }
.hero-subtitle { color: var(--text-secondary); font-size: 1.05rem; line-height: 1.6; }
.arch-section { margin-bottom: 48px; }
.section-title { font-size: 1.3rem; font-weight: 700; margin-bottom: 20px; padding-bottom: 8px; border-bottom: 2px solid var(--accent); display: inline-block; }
.tech-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; }
.tech-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius); padding: 20px; transition: var(--transition); }
.tech-card:hover { box-shadow: var(--shadow); }
.tech-card h3 { font-size: 1.05rem; margin-bottom: 4px; }
.tech-version { color: var(--text-muted); font-size: 0.8rem; }
.tech-role { color: var(--accent); font-weight: 500; font-size: 0.9rem; margin: 8px 0; }
.tech-desc { color: var(--text-secondary); font-size: 0.85rem; }
.flow { max-width: 600px; }
.flow-item { display: flex; align-items: flex-start; gap: 16px; margin-bottom: 8px; }
.flow-step { width: 32px; height: 32px; border-radius: 50%; background: var(--accent); color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.85rem; flex-shrink: 0; }
.flow-content { flex: 1; }
.flow-content strong { display: block; margin-bottom: 2px; }
.flow-content p { color: var(--text-secondary); font-size: 0.9rem; }
.flow-arrow { text-align: center; color: var(--accent); font-size: 1.2rem; margin-left: 8px; }
.file-tree { background: var(--bg-secondary); border: 1px solid var(--border); border-radius: var(--radius); padding: 16px; }
.tree-item { padding: 6px 0; display: flex; align-items: center; gap: 8px; }
.tree-icon { font-size: 1rem; }
.tree-name { font-weight: 600; font-family: monospace; font-size: 0.9rem; }
.tree-desc { color: var(--text-secondary); font-size: 0.85rem; }
.patterns-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 16px; }
.pattern-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius); padding: 20px; transition: var(--transition); }
.pattern-card:hover { box-shadow: var(--shadow); }
.pattern-card h3 { color: var(--accent); margin-bottom: 8px; }
.pattern-card p { color: var(--text-secondary); font-size: 0.9rem; }
</style>