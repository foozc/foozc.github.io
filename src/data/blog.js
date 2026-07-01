export const posts = [
  {
    id: 1,
    title: '从零开始搭建个人博客 - Vue 3 + GitHub Pages',
    date: '2026-07-01',
    category: '前端',
    tags: ['Vue', 'GitHub Pages', '博客'],
    readTime: 5,
    excerpt: '记录如何从零开始使用 Vue 3 搭建个人博客，并部署到 GitHub Pages，实现技术积累与展示。',
    content: `
      <h2>为什么选择 Vue 3 + GitHub Pages？</h2>
      <p>作为一个前端开发者，搭建个人博客不仅是记录技术成长的过程，也是展示自己能力的好机会。我选择 Vue 3 作为前端框架，GitHub Pages 作为部署平台，原因如下：</p>
      <ul>
        <li><strong>零成本部署</strong> - GitHub Pages 完全免费，且支持自定义域名</li>
        <li><strong>纯前端方案</strong> - 无需后端服务器，维护简单</li>
        <li><strong>Vue 3 的 Composition API</strong> - 更灵活的代码组织方式</li>
        <li><strong>版本控制</strong> - 所有文章和数据都在 Git 中管理</li>
      </ul>
      <blockquote>这是一个不断迭代的过程，每次更新都是一次技术实践。</blockquote>
    `
  },
  {
    id: 2,
    title: 'JavaScript 异步编程进阶：Promise、Async/Await 与事件循环',
    date: '2026-06-25',
    category: 'JavaScript',
    tags: ['JavaScript', '异步', 'Promise'],
    readTime: 8,
    excerpt: '深入理解 JavaScript 的异步编程模型，从回调函数到 Promise，再到 async/await 的演进过程。',
    content: `
      <h2>异步编程的演进</h2>
      <p>JavaScript 的异步编程经历了从回调函数到 Promise，再到 async/await 的演进过程。</p>
      <pre><code>const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve('完成'), 1000);
  });
};

fetchData().then(data => console.log(data));</code></pre>
      <blockquote>理解异步编程是掌握 JavaScript 的关键一步。</blockquote>
    `
  },
  {
    id: 3,
    title: 'CSS 变量与深色模式：现代网站的主题切换方案',
    date: '2026-06-18',
    category: 'CSS',
    tags: ['CSS', '深色模式', '前端'],
    readTime: 6,
    excerpt: '使用 CSS 自定义变量实现网站的深色模式切换，优雅地管理主题样式。',
    content: `
      <h2>CSS 自定义变量</h2>
      <p>CSS 自定义变量（Custom Properties）是现代 CSS 最强大的特性之一。</p>
      <pre><code>:root { --bg-primary: #ffffff; }
[data-theme="dark"] { --bg-primary: #0f0f23; }</code></pre>
      <blockquote>一个好的主题切换方案不仅提升用户体验，也体现了对细节的关注。</blockquote>
    `
  },
  {
    id: 4,
    title: 'Git 工作流与团队协作最佳实践',
    date: '2026-06-10',
    category: '工具',
    tags: ['Git', '团队协作', '版本控制'],
    readTime: 7,
    excerpt: '总结在日常开发中积累的 Git 使用经验和团队协作工作流，提升开发效率。',
    content: `
      <h2>为什么需要良好的 Git 工作流？</h2>
      <p>在团队开发中，一个良好的 Git 工作流可以避免代码冲突、提高协作效率。</p>
      <pre><code>git checkout -b feature/new-feature
git add .
git commit -m "feat: 添加新功能"
git checkout main
git merge feature/new-feature</code></pre>
      <blockquote>好的工具配合好的习惯，才能发挥最大的效能。</blockquote>
    `
  },
  {
    id: 5,
    title: 'Vue 3 Composition API 实战指南',
    date: '2026-06-05',
    category: '前端',
    tags: ['Vue', 'Composition API', '前端'],
    readTime: 10,
    excerpt: '深入探索 Vue 3 的 Composition API，从基础到进阶，用实际案例展示如何在项目中应用。',
    content: `
      <h2>Composition API 概述</h2>
      <p>Composition API 是 Vue 3 引入的一种新的代码组织方式。</p>
      <pre><code>import { ref, computed } from 'vue'
const count = ref(0)
const double = computed(() => count.value * 2)</code></pre>
      <blockquote>Composition API 让 Vue 应用的逻辑组织更加优雅和可维护。</blockquote>
    `
  }
]

export const categoryColors = {
  '前端': '#6c63ff',
  'JavaScript': '#f7df1e',
  'CSS': '#264de4',
  '工具': '#47a248',
}