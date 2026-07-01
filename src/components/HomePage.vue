<script setup>
import { ref, computed } from 'vue'
import { posts, categoryColors } from '../data/blog.js'

const emit = defineEmits(['viewPost'])

const selectedTag = ref(null)

const tags = computed(() => {
  const set = new Set()
  posts.forEach(p => p.tags.forEach(t => set.add(t)))
  return Array.from(set).sort()
})

const filteredPosts = computed(() => {
  if (!selectedTag.value) return posts
  return posts.filter(p => p.tags.includes(selectedTag.value))
})

const getCategoryColor = (cat) => categoryColors[cat] || '#6c757d'
</script>

<template>
  <div class="container">
    <section class="hero">
      <h1 class="hero-title">技术博客</h1>
      <p class="hero-subtitle">记录技术成长之路，分享知识与思考</p>
      <div class="hero-stats">
        <span class="stat-item">📚 {{ posts.length }} 篇文章</span>
        <span class="stat-item">🏷️ {{ tags.length }} 个标签</span>
      </div>
    </section>

    <div class="tags-filter">
      <button @click="selectedTag = null" :class="['tag-btn', { active: !selectedTag }]">全部</button>
      <button v-for="tag in tags" :key="tag" @click="selectedTag = tag"
              :class="['tag-btn', { active: selectedTag === tag }]">{{ tag }}</button>
    </div>

    <div class="posts-grid">
      <article v-for="post in filteredPosts" :key="post.id" class="post-card" @click="emit('viewPost', post)">
        <div class="post-card-header">
          <span class="post-date">{{ post.date }}</span>
          <div class="post-tags">
            <span v-for="tag in post.tags" :key="tag" class="post-tag">{{ tag }}</span>
          </div>
        </div>
        <h2 class="post-title">{{ post.title }}</h2>
        <p class="post-excerpt">{{ post.excerpt }}</p>
        <div class="post-card-footer">
          <span class="read-more">阅读更多 →</span>
          <span class="post-category" :style="{ backgroundColor: getCategoryColor(post.category) }">
            {{ post.category }}
          </span>
        </div>
      </article>
    </div>

    <div v-if="filteredPosts.length === 0" class="empty-state">
      <p>暂无相关文章</p>
    </div>
  </div>
</template>

<style scoped>
.hero {
  text-align: center;
  padding: 20px 0 48px;
}

.hero-title {
  font-size: 2.2rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--accent), #f472b6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 12px;
}

.hero-subtitle {
  color: var(--text-secondary);
  font-size: 1.1rem;
  margin-bottom: 24px;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 24px;
}

.stat-item {
  color: var(--text-muted);
  font-size: 0.9rem;
}

.tags-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 32px;
  justify-content: center;
}

.tag-btn {
  padding: 6px 16px;
  border: 1px solid var(--border);
  border-radius: 20px;
  background: var(--bg-card);
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 0.85rem;
  transition: var(--transition);
}

.tag-btn:hover,
.tag-btn.active {
  background: var(--accent);
  color: white;
  border-color: var(--accent);
}

.posts-grid {
  display: grid;
  gap: 24px;
  margin-bottom: 60px;
}

.post-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 24px;
  cursor: pointer;
  transition: var(--transition);
  box-shadow: var(--shadow);
}

.post-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
  border-color: var(--accent);
}

.post-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.post-date {
  color: var(--text-muted);
  font-size: 0.85rem;
}

.post-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.post-tag {
  padding: 2px 10px;
  background: var(--accent-light);
  color: var(--accent);
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.post-title {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 8px;
  line-height: 1.4;
}

.post-excerpt {
  color: var(--text-secondary);
  font-size: 0.95rem;
  margin-bottom: 16px;
  line-height: 1.6;
}

.post-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.read-more {
  color: var(--accent);
  font-weight: 500;
  font-size: 0.9rem;
}

.post-category {
  padding: 4px 12px;
  border-radius: 12px;
  color: white;
  font-size: 0.75rem;
  font-weight: 500;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-muted);
}

@media (max-width: 768px) {
  .hero-title { font-size: 1.8rem; }
}
</style>