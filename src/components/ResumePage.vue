<script setup>
import { resume } from '../data/resume.js'
</script>

<template>
  <div class="container">
    <div class="resume">
      <header class="resume-header">
        <div class="resume-avatar">
          <div class="avatar-placeholder">{{ resume.basics.name.charAt(0) }}</div>
        </div>
        <div class="resume-basics">
          <h1 class="resume-name">{{ resume.basics.name }}</h1>
          <p class="resume-title">{{ resume.basics.title }}</p>
          <div class="resume-contact">
            <span v-if="resume.basics.email">📧 {{ resume.basics.email }}</span>
            <span v-if="resume.basics.phone">📞 {{ resume.basics.phone }}</span>
            <span v-if="resume.basics.location">📍 {{ resume.basics.location }}</span>
          </div>
          <div class="resume-links">
            <a v-for="link in resume.basics.links" :key="link.name"
               :href="link.url" target="_blank" class="resume-link">{{ link.name }}</a>
          </div>
          <p class="resume-summary">{{ resume.basics.summary }}</p>
        </div>
      </header>

      <!-- 工作经历 -->
      <section class="resume-section">
        <h2 class="section-title">💼 工作经历</h2>
        <div v-for="exp in resume.work" :key="exp.company" class="resume-item">
          <div class="item-header">
            <h3>{{ exp.company }}</h3>
            <span class="item-date">{{ exp.startDate }} - {{ exp.endDate || '至今' }}</span>
          </div>
          <p class="item-subtitle">{{ exp.position }}</p>
          <ul class="item-details">
            <li v-for="detail in exp.details" :key="detail">{{ detail }}</li>
          </ul>
          <div v-if="exp.techStack" class="item-tech">
            <span v-for="tech in exp.techStack" :key="tech" class="tech-tag">{{ tech }}</span>
          </div>
        </div>
      </section>

      <!-- 教育背景 -->
      <section class="resume-section">
        <h2 class="section-title">🎓 教育背景</h2>
        <div v-for="edu in resume.education" :key="edu.school" class="resume-item">
          <div class="item-header">
            <h3>{{ edu.school }}</h3>
            <span class="item-date">{{ edu.startDate }} - {{ edu.endDate || '至今' }}</span>
          </div>
          <p class="item-subtitle">{{ edu.degree }} · {{ edu.major }}</p>
          <ul v-if="edu.details" class="item-details">
            <li v-for="detail in edu.details" :key="detail">{{ detail }}</li>
          </ul>
        </div>
      </section>

      <!-- 专业技能 -->
      <section class="resume-section">
        <h2 class="section-title">🛠️ 专业技能</h2>
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

      <!-- 项目经历 -->
      <section class="resume-section">
        <h2 class="section-title">🏆 项目经历</h2>
        <div v-for="project in resume.projects" :key="project.name" class="resume-item">
          <div class="item-header">
            <h3>{{ project.name }}</h3>
            <span class="item-date">{{ project.date }}</span>
          </div>
          <p class="item-subtitle">{{ project.role }}</p>
          <p>{{ project.description }}</p>
          <div class="item-tech">
            <span v-for="tech in project.techStack" :key="tech" class="tech-tag">{{ tech }}</span>
          </div>
          <div v-if="project.links" class="project-links">
            <a v-for="link in project.links" :key="link.name" :href="link.url" target="_blank" class="resume-link">
              🔗 {{ link.name }}
            </a>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.resume {
  padding: 100px 0 60px;
}

.resume-header {
  display: flex;
  gap: 32px;
  align-items: flex-start;
  margin-bottom: 48px;
  padding-bottom: 32px;
  border-bottom: 2px solid var(--border);
}

.resume-avatar { flex-shrink: 0; }

.avatar-placeholder {
  width: 100px; height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent), #f472b6);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
}

.resume-basics { flex: 1; }

.resume-name {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 4px;
}

.resume-title {
  color: var(--accent);
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 12px;
}

.resume-contact {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 12px;
}

.resume-links {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}

.resume-link {
  padding: 4px 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  font-size: 0.85rem;
  color: var(--text-secondary) !important;
  text-decoration: none;
  transition: var(--transition);
}

.resume-link:hover {
  border-color: var(--accent);
  color: var(--accent) !important;
}

.resume-summary {
  color: var(--text-secondary);
  line-height: 1.7;
}

.resume-section {
  margin-bottom: 40px;
}

.section-title {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 20px;
  padding-bottom: 8px;
  border-bottom: 2px solid var(--accent);
  display: inline-block;
}

.resume-item {
  margin-bottom: 24px;
  padding: 20px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  transition: var(--transition);
}

.resume-item:hover { box-shadow: var(--shadow); }

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}

.item-header h3 { font-size: 1.1rem; font-weight: 700; }

.item-date {
  color: var(--text-muted);
  font-size: 0.85rem;
  white-space: nowrap;
}

.item-subtitle {
  color: var(--accent);
  font-weight: 500;
  font-size: 0.95rem;
  margin-bottom: 8px;
}

.item-details {
  margin: 8px 0 0 20px;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.item-details li { margin-bottom: 4px; }

.item-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 12px;
}

.tech-tag {
  padding: 2px 10px;
  background: var(--accent-light);
  color: var(--accent);
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.project-links {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.skill-card {
  padding: 20px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  transition: var(--transition);
}

.skill-card:hover { box-shadow: var(--shadow); }

.skill-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.skill-name { font-weight: 600; font-size: 0.95rem; }

.skill-level { color: var(--text-muted); font-size: 0.8rem; }

.skill-bar {
  height: 6px;
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

@media (max-width: 768px) {
  .resume-header { flex-direction: column; align-items: center; text-align: center; }
  .resume-contact { justify-content: center; }
  .resume-links { justify-content: center; }
  .item-header { flex-direction: column; gap: 4px; }
  .skills-grid { grid-template-columns: 1fr; }
}
</style>