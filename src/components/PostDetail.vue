<script setup>
defineProps(['post'])
const emit = defineEmits(['back'])
</script>

<template>
  <div class="container">
    <article class="post-detail">
      <button class="back-btn" @click="emit('back')">← 返回博客列表</button>
      <header class="post-detail-header">
        <h1 class="post-detail-title">{{ post.title }}</h1>
        <div class="post-detail-meta">
          <span>{{ post.date }}</span>
          <span>{{ post.category }}</span>
          <span>{{ post.readTime }} 分钟阅读</span>
        </div>
        <div class="post-tags">
          <span v-for="tag in post.tags" :key="tag" class="post-tag">{{ tag }}</span>
        </div>
      </header>
      <div class="post-content" v-html="post.content"></div>
    </article>
  </div>
</template>

<style scoped>
.post-detail {
  padding: 0 0 40px;
}

.back-btn {
  background: none;
  border: 1px solid var(--border);
  padding: 8px 16px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 32px;
  transition: var(--transition);
  background: var(--bg-card);
}

.back-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.post-detail-header {
  margin-bottom: 32px;
}

.post-detail-title {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 16px;
  line-height: 1.3;
}

.post-detail-meta {
  display: flex;
  gap: 16px;
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-bottom: 12px;
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

.post-content {
  font-size: 1.05rem;
  line-height: 1.8;
  color: var(--text-primary);
}

.post-content h2 {
  font-size: 1.5rem;
  margin: 32px 0 16px;
}

.post-content h3 {
  font-size: 1.2rem;
  margin: 24px 0 12px;
}

.post-content p {
  margin-bottom: 16px;
}

.post-content ul,
.post-content ol {
  margin: 12px 0 16px 24px;
}

.post-content li {
  margin-bottom: 8px;
}

.post-content code {
  background: var(--accent-light);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.9em;
  color: var(--accent);
}

.post-content pre {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 16px;
  overflow-x: auto;
  margin: 16px 0;
}

.post-content pre code {
  background: none;
  padding: 0;
  color: var(--text-primary);
}

.post-content blockquote {
  border-left: 4px solid var(--accent);
  padding: 12px 20px;
  margin: 16px 0;
  background: var(--accent-light);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .post-detail-title { font-size: 1.5rem; }
  .post-detail-meta { flex-wrap: wrap; }
}
</style>