export const architectureData = {
  overview: {
    title: '博客架构全景',
    description: '本博客采用现代化的前端技术栈构建，追求代码可维护性、开发效率和用户体验的最佳平衡。',
    techStack: [
      { name: 'Vue 3', version: '^3.4.0', role: '前端框架', desc: '使用 Composition API + script setup 构建组件' },
      { name: 'Vite', version: '^5.4.0', role: '构建工具', desc: '极速热更新，秒级构建' },
      { name: 'GitHub Pages', version: '-', role: '托管平台', desc: '免费静态网站托管，支持 CI/CD' },
      { name: 'GitHub Actions', version: '-', role: 'CI/CD', desc: '自动构建部署工作流' },
    ]
  },
  structure: [
    {
      name: 'src/',
      type: '目录',
      desc: '源代码根目录',
      children: [
        { name: 'App.vue', type: '文件', desc: '根组件，管理页面路由和布局' },
        { name: 'main.js', type: '文件', desc: '应用入口，挂载 Vue 实例' },
        { name: 'components/', type: '目录', desc: '业务组件目录', children: [
          { name: 'NavBar.vue', desc: '导航栏（支持深色模式）' },
          { name: 'HomePage.vue', desc: '博客列表页（标签筛选）' },
          { name: 'PostDetail.vue', desc: '博客文章详情页' },
          { name: 'AlgorithmPage.vue', desc: '算法科普列表页' },
          { name: 'AlgorithmDetail.vue', desc: '算法文章详情页' },
          { name: 'GamesPage.vue', desc: '小游戏聚合页' },
          { name: 'ArchitecturePage.vue', desc: '博客架构展示页' },
          { name: 'ResumePage.vue', desc: '个人简历页' },
          { name: 'AdminPage.vue', desc: '后台管理面板' },
        ]},
        { name: 'games/', type: '目录', desc: '游戏组件目录', children: [
          { name: 'HuarongDao.vue', desc: '华容道滑块游戏' },
          { name: 'Sudoku.vue', desc: '数独游戏' },
        ]},
        { name: 'data/', type: '目录', desc: '数据文件目录', children: [
          { name: 'blog.js', desc: '博客文章数据' },
          { name: 'algorithm.js', desc: '算法文章数据' },
          { name: 'resume.js', desc: '简历数据' },
          { name: 'architecture.js', desc: '架构信息数据' },
        ]},
      ]
    },
    {
      name: '.github/workflows/deploy.yml',
      type: '文件',
      desc: 'GitHub Actions 自动部署配置',
    },
    {
      name: 'vite.config.js',
      type: '文件',
      desc: 'Vite 构建配置',
    },
  ],
  dataFlow: [
    { step: 1, action: '用户访问页面', via: '浏览器 / GitHub Pages' },
    { step: 2, action: 'Vue Router / 条件渲染', desc: '根据 currentPage 状态切换组件' },
    { step: 3, action: '组件加载数据', desc: '从 data/ 目录导入静态数据文件' },
    { step: 4, action: '渲染视图', desc: 'Vue 响应式系统驱动 DOM 更新' },
    { step: 5, action: '用户交互', desc: '点击、筛选、深色模式切换等' },
    { step: 6, action: '部署更新', desc: 'git push → GitHub Actions → 自动部署' },
  ],
  designPatterns: [
    { name: '组件化开发', desc: '每个页面和功能拆分为独立组件，职责单一' },
    { name: '数据与视图分离', desc: '数据集中在 data/ 目录，组件只负责渲染' },
    { name: 'Scoped CSS', desc: '组件样式隔离，避免全局污染' },
    { name: 'CSS 变量主题', desc: '通过 CSS 变量实现深色模式切换' },
  ]
}