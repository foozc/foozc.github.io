<script setup>
import { ref, onMounted } from 'vue'
import { posts as defaultPosts } from '../data/blog.js'
import { resume as defaultResume } from '../data/resume.js'

const emit = defineEmits(['navigate'])
const activeTab = ref('blog')
const isLoggedIn = ref(false)
const password = ref('')
const passwordError = ref(false)

// 可编辑的数据
const blogPosts = ref([])
const resumeData = ref(null)
const editingPost = ref(null)
const editForm = ref({ title: '', content: '', tags: '', category: '', date: '' })

const login = () => {
  if (password.value === 'fzc') {
    isLoggedIn.value = true
    passwordError.value = false
    loadData()
  } else {
    passwordError.value = true
  }
}

const loadData = () => {
  const saved = localStorage.getItem('blog-admin-data')
  if (saved) {
    const data = JSON.parse(saved)
    blogPosts.value = data.posts || defaultPosts
    resumeData.value = data.resume || defaultResume
  } else {
    blogPosts.value = JSON.parse(JSON.stringify(defaultPosts))
    resumeData.value = JSON.parse(JSON.stringify(defaultResume))
    saveData()
  }
}

const saveData = () => {
  localStorage.setItem('blog-admin-data', JSON.stringify({
    posts: blogPosts.value,
    resume: resumeData.value
  }))
}

// 博客编辑
const startEditPost = (post) => {
  editingPost.value = post.id
  editForm.value = {
    title: post.title,
    content: post.content,
    tags: post.tags.join(', '),
    category: post.category,
    date: post.date
  }
}

const savePost = () => {
  const post = blogPosts.value.find(p => p.id === editingPost.value)
  if (post) {
    post.title = editForm.value.title
    post.content = editForm.value.content
    post.tags = editForm.value.tags.split(',').map(t => t.trim()).filter(Boolean)
    post.category = editForm.value.category
    post.date = editForm.value.date
    saveData()
  }
  editingPost.value = null
}

const cancelEdit = () => {
  editingPost.value = null
}

const addPost = () => {
  const newId = Math.max(...blogPosts.value.map(p => p.id), 0) + 1
  blogPosts.value.push({
    id: newId,
    title: '新文章',
    date: new Date().toISOString().split('T')[0],
    category: '其他',
    tags: [],
    readTime: 5,
    excerpt: '文章摘要...',
    content: '<p>文章内容...</p>'
  })
  saveData()
  startEditPost(blogPosts.value[blogPosts.value.length - 1])
}

const deletePost = (id) => {
  if (confirm('确定删除这篇文章吗？')) {
    blogPosts.value = blogPosts.value.filter(p => p.id !== id)
    saveData()
  }
}

// 简历编辑
const resumeFields = ref({
  name: '',
  title: '',
  email: '',
  summary: ''
})

const editResumeField = (field) => {
  resumeFields.value[field] = resumeData.value.basics[field]
}

const saveResumeField = (field) => {
  resumeData.value.basics[field] = resumeFields.value[field]
  saveData()
}

const addWorkExp = () => {
  resumeData.value.work.push({
    company: '新公司',
    position: '职位',
    startDate: '2026-01',
    endDate: null,
    details: ['工作内容...'],
    techStack: ['技术栈']
  })
  saveData()
}

const deleteWorkExp = (index) => {
  if (confirm('确定删除这条工作经历吗？')) {
    resumeData.value.work.splice(index, 1)
    saveData()
  }
}

const addSkill = () => {
  resumeData.value.skills.push({
    name: '新技能',
    level: '掌握',
    percentage: 70,
    items: ['标签1', '标签2']
  })
  saveData()
}

const addProject = () => {
  resumeData.value.projects.push({
    name: '新项目',
    role: '角色',
    date: '2026-01',
    description: '项目描述...',
    techStack: ['技术栈']
  })
  saveData()
}
</script>

<template>
  <div class="container">
    <!-- 登录页 -->
    <div v-if="!isLoggedIn" class="login-container">
      <div class="login-card">
        <h1>🔐 后台管理</h1>
        <p class="login-desc">请输入管理员密码</p>
        <input v-model="password" type="password" class="login-input"
               placeholder="输入密码" @keyup.enter="login" />
        <p v-if="passwordError" class="error-msg">密码错误，请重试</p>
        <button class="login-btn" @click="login">登录</button>
        <p class="login-hint">默认密码：fzc</p>
      </div>
    </div>

    <!-- 管理面板 -->
    <div v-else class="admin-panel">
      <div class="admin-header">
        <h1>📋 后台管理</h1>
        <div class="admin-actions">
          <button class="nav-btn" @click="emit('navigate', 'home')">返回前台</button>
        </div>
      </div>

      <div class="admin-tabs">
        <button :class="['tab-btn', { active: activeTab === 'blog' }]" @click="activeTab = 'blog'">📝 博客管理</button>
        <button :class="['tab-btn', { active: activeTab === 'resume' }]" @click="activeTab = 'resume'">📄 简历管理</button>
      </div>

      <!-- 博客列表管理 -->
      <div v-if="activeTab === 'blog'" class="admin-section">
        <div class="section-header">
          <h2>博客文章 ({{ blogPosts.length }})</h2>
          <button class="add-btn" @click="addPost">+ 新增文章</button>
        </div>

        <div v-for="post in blogPosts" :key="post.id" class="admin-item">
          <div v-if="editingPost === post.id" class="edit-form">
            <div class="form-group">
              <label>标题</label>
              <input v-model="editForm.title" class="form-input" />
            </div>
            <div class="form-group">
              <label>日期</label>
              <input v-model="editForm.date" class="form-input" />
            </div>
            <div class="form-group">
              <label>分类</label>
              <input v-model="editForm.category" class="form-input" />
            </div>
            <div class="form-group">
              <label>标签（逗号分隔）</label>
              <input v-model="editForm.tags" class="form-input" />
            </div>
            <div class="form-group">
              <label>内容（HTML）</label>
              <textarea v-model="editForm.content" class="form-textarea" rows="8"></textarea>
            </div>
            <div class="form-actions">
              <button class="save-btn" @click="savePost">💾 保存</button>
              <button class="cancel-btn" @click="cancelEdit">取消</button>
            </div>
          </div>
          <div v-else class="item-display">
            <div class="item-info">
              <strong>{{ post.title }}</strong>
              <span class="item-date">{{ post.date }}</span>
              <span class="item-category">{{ post.category }}</span>
            </div>
            <div class="item-actions">
              <button class="edit-btn" @click="startEditPost(post)">✏️ 编辑</button>
              <button class="del-btn" @click="deletePost(post.id)">🗑️ 删除</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 简历管理 -->
      <div v-if="activeTab === 'resume'" class="admin-section">
        <h2>个人信息</h2>
        <div class="resume-edit">
          <div class="form-group">
            <label>姓名</label>
            <input v-model="resumeData.basics.name" class="form-input" @change="saveData" />
          </div>
          <div class="form-group">
            <label>职位</label>
            <input v-model="resumeData.basics.title" class="form-input" @change="saveData" />
          </div>
          <div class="form-group">
            <label>邮箱</label>
            <input v-model="resumeData.basics.email" class="form-input" @change="saveData" />
          </div>
          <div class="form-group">
            <label>个人简介</label>
            <textarea v-model="resumeData.basics.summary" class="form-textarea" rows="3" @change="saveData"></textarea>
          </div>
        </div>

        <div class="section-header" style="margin-top: 24px">
          <h2>工作经历</h2>
          <button class="add-btn" @click="addWorkExp">+ 新增</button>
        </div>
        <div v-for="(exp, i) in resumeData.work" :key="i" class="admin-item">
          <div class="item-display">
            <div class="item-info">
              <strong>{{ exp.company }}</strong> - {{ exp.position }}
            </div>
            <div class="item-actions">
              <button class="del-btn" @click="deleteWorkExp(i)">🗑️ 删除</button>
            </div>
          </div>
        </div>

        <div class="section-header" style="margin-top: 24px">
          <h2>技能</h2>
          <button class="add-btn" @click="addSkill">+ 新增</button>
        </div>
        <div v-for="(skill, i) in resumeData.skills" :key="i" class="admin-item">
          <div class="item-display">
            <div class="item-info">
              <strong>{{ skill.name }}</strong> - {{ skill.level }}
            </div>
          </div>
        </div>

        <div class="section-header" style="margin-top: 24px">
          <h2>项目</h2>
          <button class="add-btn" @click="addProject">+ 新增</button>
        </div>
        <div v-for="(project, i) in resumeData.projects" :key="i" class="admin-item">
          <div class="item-display">
            <div class="item-info">
              <strong>{{ project.name }}</strong> - {{ project.role }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container { min-height: 60vh; display: flex; align-items: center; justify-content: center; padding-top: 0; }
.login-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius); padding: 40px; text-align: center; box-shadow: var(--shadow); max-width: 400px; width: 100%; }
.login-card h1 { margin-bottom: 8px; }
.login-desc { color: var(--text-muted); margin-bottom: 20px; }
.login-input { width: 100%; padding: 12px; border: 1px solid var(--border); border-radius: var(--radius-sm); font-size: 1rem; background: var(--bg-primary); color: var(--text-primary); margin-bottom: 12px; }
.login-btn { width: 100%; padding: 12px; background: var(--accent); color: white; border: none; border-radius: var(--radius-sm); font-size: 1rem; cursor: pointer; transition: var(--transition); }
.login-btn:hover { background: var(--accent-hover); }
.error-msg { color: #e74c3c; font-size: 0.85rem; margin-bottom: 8px; }
.login-hint { color: var(--text-muted); font-size: 0.8rem; margin-top: 12px; }
.admin-panel { padding: 0 0 40px; }
.admin-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.admin-header h1 { font-size: 1.5rem; }
.nav-btn { padding: 8px 16px; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--bg-card); color: var(--text-primary); cursor: pointer; transition: var(--transition); }
.nav-btn:hover { border-color: var(--accent); color: var(--accent); }
.admin-tabs { display: flex; gap: 8px; margin-bottom: 24px; }
.tab-btn { padding: 10px 20px; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--bg-card); color: var(--text-secondary); cursor: pointer; font-size: 0.95rem; transition: var(--transition); }
.tab-btn.active, .tab-btn:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-light); }
.admin-section { margin-bottom: 40px; }
.section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.section-header h2 { font-size: 1.1rem; }
.add-btn { padding: 8px 16px; background: var(--accent); color: white; border: none; border-radius: var(--radius-sm); cursor: pointer; font-size: 0.9rem; transition: var(--transition); }
.add-btn:hover { background: var(--accent-hover); }
.admin-item { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 16px; margin-bottom: 12px; transition: var(--transition); }
.admin-item:hover { box-shadow: var(--shadow); }
.item-display { display: flex; justify-content: space-between; align-items: center; }
.item-info { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.item-date { color: var(--text-muted); font-size: 0.85rem; }
.item-category { padding: 2px 8px; background: var(--accent-light); color: var(--accent); border-radius: 8px; font-size: 0.8rem; }
.item-actions { display: flex; gap: 8px; }
.edit-btn, .del-btn { padding: 4px 12px; border: 1px solid var(--border); border-radius: 6px; cursor: pointer; font-size: 0.85rem; transition: var(--transition); background: var(--bg-card); }
.edit-btn:hover { border-color: var(--accent); color: var(--accent); }
.del-btn:hover { border-color: #e74c3c; color: #e74c3c; }
.edit-form { display: flex; flex-direction: column; gap: 12px; }
.form-group { display: flex; flex-direction: column; gap: 4px; }
.form-group label { font-size: 0.85rem; color: var(--text-secondary); font-weight: 500; }
.form-input { padding: 8px 12px; border: 1px solid var(--border); border-radius: 6px; font-size: 0.9rem; background: var(--bg-primary); color: var(--text-primary); }
.form-textarea { padding: 8px 12px; border: 1px solid var(--border); border-radius: 6px; font-size: 0.9rem; background: var(--bg-primary); color: var(--text-primary); font-family: monospace; resize: vertical; }
.form-actions { display: flex; gap: 8px; }
.save-btn { padding: 8px 16px; background: var(--accent); color: white; border: none; border-radius: 6px; cursor: pointer; transition: var(--transition); }
.save-btn:hover { background: var(--accent-hover); }
.cancel-btn { padding: 8px 16px; border: 1px solid var(--border); border-radius: 6px; background: var(--bg-card); color: var(--text-secondary); cursor: pointer; transition: var(--transition); }
.cancel-btn:hover { border-color: var(--accent); }
.resume-edit { display: flex; flex-direction: column; gap: 12px; }
</style>