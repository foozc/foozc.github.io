<script setup>
import { resume } from '../data/resume.js'

const emit = defineEmits(['navigate'])

const handleLinkClick = (link) => {
  if (link.internal && link.page) {
    emit('navigate', link.page)
  }
}

// 优势关键词提取（用于科技标签云）
const highlightKeywords = ['项目管理', '全生命周期', '敏捷思维', 'PMP', '跨界沟通', '软硬协同', '需求交付', '质量管控', 'AI编程', '全链路']
</script>

<template>
  <div class="container">
    <div class="resume">
      <!-- ═══ 个人简介卡 ═══ -->
      <header class="resume-hero">
        <div class="hero-inner">
          <div class="hero-avatar">
            <div class="avatar-ring">
              <div class="avatar-placeholder">{{ resume.basics.name.charAt(0) }}</div>
            </div>
          </div>
          <div class="hero-info">
            <h1 class="hero-name">{{ resume.basics.name }}</h1>
            <p class="hero-title">{{ resume.basics.title }}</p>
            <div class="hero-contact">
              <span v-if="resume.basics.email">📧 {{ resume.basics.email }}</span>
              <span v-if="resume.basics.phone">📞 {{ resume.basics.phone }}</span>
              <span v-if="resume.basics.location">📍 {{ resume.basics.location }}</span>
            </div>
            <div class="hero-links">
              <a v-for="link in resume.basics.links" :key="link.name"
                 :href="link.url" target="_blank" class="hero-link">{{ link.name }}</a>
            </div>
          </div>
        </div>
      </header>

      <!-- ═══ 个人优势 ── 科技风卡片 ═══ -->
      <section class="advantage-section">
        <div class="section-badge">
          <span class="badge-dot"></span>
          <span>个人优势</span>
        </div>
        <h2 class="section-title">核心能力</h2>
        <div class="advantage-grid">
          <div v-for="(bullet, idx) in resume.basics.summaryBullets" :key="idx" class="advantage-card" :style="{ '--card-delay': idx * 0.1 + 's' }">
            <div class="advantage-num">
              <span class="num-inner">{{ String(idx + 1).padStart(2, '0') }}</span>
            </div>
            <div class="advantage-content">
              <p>{{ bullet }}</p>
            </div>
            <div class="advantage-glow"></div>
          </div>
        </div>
        <!-- 关键词云 -->
        <div class="keyword-cloud">
          <span v-for="kw in highlightKeywords" :key="kw" class="keyword-tag">{{ kw }}</span>
        </div>
      </section>

      <!-- ═══ 工作经历 ═══ -->
      <section class="resume-section">
        <div class="section-badge">
          <span class="badge-dot"></span>
          <span>经历</span>
        </div>
        <h2 class="section-title">工作经历</h2>
        <div v-for="exp in resume.work" :key="exp.company" class="resume-item">
          <div class="item-header">
            <div>
              <h3>{{ exp.company }}</h3>
              <p class="item-subtitle">{{ exp.position }}</p>
            </div>
            <span class="item-date">{{ exp.startDate }} - {{ exp.endDate || '至今' }}</span>
          </div>
          <ul class="item-details">
            <li v-for="detail in exp.details" :key="detail">{{ detail }}</li>
          </ul>
          <div v-if="exp.achievements" class="item-achievements">
            <p class="achievements-title">📊 业绩：</p>
            <ul class="item-details">
              <li v-for="achieve in exp.achievements" :key="achieve">{{ achieve }}</li>
            </ul>
          </div>
          <div v-if="exp.techStack" class="item-tech">
            <span v-for="tech in exp.techStack" :key="tech" class="tech-tag">{{ tech }}</span>
          </div>
        </div>
      </section>

      <!-- ═══ 教育背景 ═══ -->
      <section class="resume-section">
        <div class="section-badge">
          <span class="badge-dot"></span>
          <span>学历</span>
        </div>
        <h2 class="section-title">教育背景</h2>
        <div v-for="edu in resume.education" :key="edu.school" class="resume-item">
          <div class="item-header">
            <div>
              <h3>{{ edu.school }}</h3>
              <p class="item-subtitle">{{ edu.degree }} · {{ edu.major }}</p>
            </div>
            <span class="item-date">{{ edu.startDate }} - {{ edu.endDate || '至今' }}</span>
          </div>
          <ul v-if="edu.details" class="item-details">
            <li v-for="detail in edu.details" :key="detail">{{ detail }}</li>
          </ul>
        </div>
      </section>

      <!-- ═══ 专业技能 ═══ -->
      <section class="resume-section">
        <div class="section-badge">
          <span class="badge-dot"></span>
          <span>能力</span>
        </div>
        <h2 class="section-title">专业技能</h2>
        <div class="skills-grid">
          <div v-for="skill in resume.skills" :key="skill.name" class="skill-card">
            <div class="skill-header">
              <span class="skill-name">{{ skill.name }}</span>
              <span class="skill-level">{{ skill.level }}</span>
            </div>
            <div class="skill-bar">
              <div class="skill-progress" :style="{ width: skill.percentage + '%' }"></div>
            </div>
            <div class="skill-tags">
              <span v-for="item in skill.items" :key="item" class="tech-tag">{{ item }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══ 项目经历 ═══ -->
      <section class="resume-section">
        <div class="section-badge">
          <span class="badge-dot"></span>
          <span>案例</span>
        </div>
        <h2 class="section-title">项目经历</h2>
        <div v-for="project in resume.projects" :key="project.name" class="resume-item">
          <div class="item-header">
            <div>
              <h3>{{ project.name }}</h3>
              <p class="item-subtitle">{{ project.role }}</p>
            </div>
            <span class="item-date">{{ project.date }}</span>
          </div>
          <p class="project-desc">{{ project.description }}</p>
          <div v-if="project.challenge" class="item-challenge">
            <p class="challenge-title">💡 核心挑战</p>
            <p class="challenge-text">{{ project.challenge }}</p>
          </div>
          <div class="item-tech">
            <span v-for="tech in project.techStack" :key="tech" class="tech-tag">{{ tech }}</span>
          </div>
          <div v-if="project.links" class="project-links">
            <a v-for="link in project.links" :key="link.name"
               :href="link.internal ? 'javascript:void(0)' : link.url"
               :target="link.internal ? '_self' : '_blank'"
               class="resume-link"
               :class="{ 'resume-link-internal': link.internal }"
               @click.prevent="handleLinkClick(link)">
              🔗 {{ link.name }}
            </a>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
/* ═══ 容器居中 ═══ */
.resume {
  max-width: 860px;
  margin: 0 auto;
  padding: 0 0 48px;
}

/* ═══ Section 徽标 ═══ */
.section-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}
.badge-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--accent);
  animation: pulse-dot 2s ease-in-out infinite;
}
@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.8); }
}
.section-badge span {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--text-muted);
  letter-spacing: 2px;
  text-transform: uppercase;
}

.section-title {
  font-size: 1.6rem;
  font-weight: 800;
  margin-bottom: 24px;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, var(--accent), #f472b6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ═══ Hero ═══ */
.resume-hero {
  text-align: center;
  margin-bottom: 64px;
  padding: 56px 0 44px;
  position: relative;
}
.resume-hero::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 10%;
  right: 10%;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
  opacity: 0.3;
}

.hero-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
}

.hero-avatar {
  flex-shrink: 0;
}

.avatar-ring {
  width: 108px; height: 108px;
  border-radius: 50%;
  padding: 5px;
  background: linear-gradient(135deg, var(--accent), #f472b6);
  display: flex;
  align-items: center;
  justify-content: center;
}
.avatar-placeholder {
  width: 100%; height: 100%;
  border-radius: 50%;
  background: var(--bg-card);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.6rem;
  font-weight: 700;
  color: var(--accent);
}

.hero-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.hero-name {
  font-size: 2.8rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.2;
}

.hero-title {
  color: var(--accent);
  font-size: 1.15rem;
  font-weight: 600;
}

.hero-contact {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  color: var(--text-secondary);
  font-size: 0.92rem;
}

.hero-contact span {
  padding: 6px 18px;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 20px;
  transition: var(--transition);
}

.hero-contact span:hover {
  border-color: var(--accent);
  background: var(--accent-light);
}

.hero-links {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 4px;
}

.hero-link {
  padding: 7px 20px;
  border: 1px solid var(--border);
  border-radius: 20px;
  font-size: 0.85rem;
  color: var(--text-secondary) !important;
  text-decoration: none;
  transition: var(--transition);
}
.hero-link:hover {
  border-color: var(--accent);
  color: var(--accent) !important;
  background: var(--accent-light);
}

/* ═══ 个人优势 — 科技风卡片 ═══ */
.advantage-section {
  margin-bottom: 56px;
}

.advantage-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.advantage-card {
  position: relative;
  display: flex;
  gap: 20px;
  align-items: flex-start;
  padding: 20px 24px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 14px;
  overflow: hidden;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  animation: card-in 0.6s ease both;
  animation-delay: var(--card-delay, 0s);
}
@keyframes card-in {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

.advantage-card:hover {
  border-color: var(--accent);
  box-shadow: 0 4px 24px rgba(108, 99, 255, 0.12);
  transform: translateY(-2px);
}

.advantage-num {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--accent-light);
  border-radius: 10px;
  margin-top: 2px;
}
.num-inner {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--accent);
  font-family: 'SF Mono', 'Cascadia Code', 'Fira Code', monospace;
}

.advantage-content {
  flex: 1;
  font-size: 0.92rem;
  line-height: 1.75;
  color: var(--text-secondary);
}

.advantage-card:hover .advantage-content {
  color: var(--text-primary);
}

/* 发光渐变 */
.advantage-glow {
  position: absolute;
  top: 0; right: 0;
  width: 160px;
  height: 100%;
  background: linear-gradient(90deg, transparent, var(--accent-light));
  opacity: 0;
  transition: opacity 0.4s;
  pointer-events: none;
}
.advantage-card:hover .advantage-glow {
  opacity: 1;
}

/* 关键词云 */
.keyword-cloud {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid var(--border);
}
.keyword-tag {
  padding: 4px 14px;
  background: var(--accent-light);
  color: var(--accent);
  border-radius: 14px;
  font-size: 0.78rem;
  font-weight: 500;
  border: 1px solid transparent;
  transition: all 0.25s;
}
.keyword-tag:hover {
  border-color: var(--accent);
  transform: translateY(-1px);
}

/* ═══ Resume Section ═══ */
.resume-section {
  margin-bottom: 48px;
}

.resume-item {
  margin-bottom: 20px;
  padding: 24px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 14px;
  transition: var(--transition);
}
.resume-item:hover {
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
  border-color: var(--accent);
}

[data-theme="dark"] .resume-item:hover {
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
  gap: 12px;
}

.item-header h3 {
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: 2px;
}

.item-subtitle {
  color: var(--accent);
  font-weight: 500;
  font-size: 0.9rem;
}

.item-date {
  color: var(--text-muted);
  font-size: 0.8rem;
  white-space: nowrap;
  flex-shrink: 0;
}

.item-details {
  margin: 8px 0 0 18px;
  color: var(--text-secondary);
  font-size: 0.88rem;
  line-height: 1.65;
}

.item-details li {
  margin-bottom: 5px;
}

.project-desc {
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-top: 8px;
}

.item-achievements {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px dashed var(--border);
}

.achievements-title {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.item-challenge {
  margin-top: 12px;
  padding: 14px 16px;
  background: var(--accent-light);
  border-radius: 10px;
  border-left: 3px solid var(--accent);
}

.challenge-title {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--accent);
  margin-bottom: 4px;
}

.challenge-text {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.65;
}

.item-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 12px;
}

.tech-tag {
  padding: 3px 10px;
  background: var(--accent-light);
  color: var(--accent);
  border-radius: 10px;
  font-size: 0.78rem;
  font-weight: 500;
}

/* ═══ 链接 ═══ */
.resume-link {
  padding: 4px 12px;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 0.82rem;
  color: var(--text-secondary) !important;
  text-decoration: none;
  transition: var(--transition);
}
.resume-link:hover {
  border-color: var(--accent);
  color: var(--accent) !important;
}

.resume-link-internal {
  border-color: var(--accent);
  background: var(--accent-light);
  color: var(--accent) !important;
  font-weight: 500;
}
.resume-link-internal:hover {
  background: var(--accent);
  color: white !important;
}

.project-links {
  display: flex;
  gap: 8px;
  margin-top: 14px;
}

/* ═══ 技能网格 ═══ */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
}

.skill-card {
  padding: 20px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 14px;
  transition: var(--transition);
}
.skill-card:hover {
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
  border-color: var(--accent);
}

.skill-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.skill-name {
  font-weight: 600;
  font-size: 0.9rem;
}

.skill-level {
  color: var(--text-muted);
  font-size: 0.78rem;
}

.skill-bar {
  height: 5px;
  background: var(--bg-secondary);
  border-radius: 3px;
  margin-bottom: 12px;
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  background: linear-gradient(90deg, var(--accent), #f472b6);
  border-radius: 3px;
  transition: width 1s ease;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

/* ═══ 响应式 ═══ */
@media (max-width: 768px) {
  .hero-name { font-size: 1.8rem; }
  .hero-contact { gap: 10px; font-size: 0.82rem; }
  .item-header { flex-direction: column; gap: 4px; }
  .skills-grid { grid-template-columns: 1fr; }
  .advantage-card { padding: 16px 18px; gap: 14px; }
  .advantage-num { width: 30px; height: 30px; }
  .num-inner { font-size: 0.7rem; }
  .section-title { font-size: 1.3rem; }
}

@media (max-width: 480px) {
  .resume { padding: 0 0 32px; }
  .resume-hero { padding: 32px 0 24px; }
  .avatar-ring { width: 76px; height: 76px; }
  .hero-name { font-size: 1.5rem; }
  .hero-title { font-size: 0.9rem; }
  .advantage-content { font-size: 0.85rem; }
  .keyword-tag { font-size: 0.72rem; padding: 3px 10px; }
  .resume-item { padding: 16px; }
  .skill-card { padding: 16px; }
}
</style>
