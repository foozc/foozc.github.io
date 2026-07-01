export const architectureData = {
  overview: {
    title: '博客架构全景',
    description: '本博客是一个纯前端单页应用（SPA），采用 Vue 3 + Vite 构建，托管于 GitHub Pages。追求代码可维护性、开发效率和跨设备用户体验的最佳平衡。',
  },

  techStack: [
    { name: 'Vue 3', version: '^3.4.0', role: '前端框架', icon: '💚', desc: 'Composition API + script setup，响应式数据驱动视图更新' },
    { name: 'Vite', version: '^5.4.0', role: '构建工具', icon: '⚡', desc: 'ESBuild 预构建，极速 HMR，开发体验流畅' },
    { name: 'GitHub Pages', version: '免费托管', role: '静态托管', icon: '📦', desc: '零成本部署，全球 CDN 加速' },
    { name: 'GitHub Actions', version: 'CI/CD', role: '自动部署', icon: '🔁', desc: 'push 自动构建并部署到 gh-pages 分支' },
  ],

  // 架构分层
  layers: [
    {
      name: '展示层 (UI)',
      color: '#6c63ff',
      items: [
        'App.vue — 根组件，页面路由控制',
        'SideBar.vue — 左侧导航栏（响应式）',
        '各页面组件：ResumePage / HomePage / PostDetail / AlgorithmPage / AlgorithmDetail / GamesPage / ArchitecturePage / AdminPage',
      ],
    },
    {
      name: '数据层 (Data)',
      color: '#ec4899',
      items: [
        'data/blog.js — 博客文章数据',
        'data/resume.js — 简历数据',
        'data/algorithm.js — 算法文章数据',
        'data/architecture.js — 架构配置数据',
      ],
    },
    {
      name: '构建层 (Build)',
      color: '#f59e0b',
      items: [
        'Vite 开发服务器 — HMR 热更新',
        'Vite 构建 — Tree-shaking / 代码分割',
        '静态资源优化 — CSS 压缩 / JS 压缩',
      ],
    },
    {
      name: '部署层 (Deploy)',
      color: '#10b981',
      items: [
        'GitHub 仓库 — 源代码管理',
        'GitHub Actions — 自动化 CI/CD',
        'GitHub Pages — 静态资源托管',
        '自定义域名 (可选)',
      ],
    },
  ],

  // 组件树
  componentTree: {
    root: 'App.vue',
    children: [
      { name: 'SideBar.vue', desc: '导航 + 主题切换 + 响应式汉堡菜单' },
      {
        name: '页面容器 (条件渲染)',
        children: [
          { name: 'ResumePage.vue', desc: '个人简历展示' },
          { name: 'HomePage.vue', desc: '博客文章列表' },
          { name: 'PostDetail.vue', desc: '文章详情' },
          { name: 'AlgorithmPage.vue', desc: '算法文章列表', children: [
            { name: 'AlgorithmDetail.vue', desc: '算法详情' },
          ]},
          { name: 'GamesPage.vue', desc: '游戏列表', children: [
            { name: 'HuarongDao.vue', desc: '华容道' },
            { name: 'Sudoku.vue', desc: '数独' },
          ]},
          { name: 'ArchitecturePage.vue', desc: '架构展示' },
          { name: 'AdminPage.vue', desc: '后台管理' },
        ],
      },
    ],
  },

  // 数据流
  dataFlow: [
    { step: 1, action: '用户访问', desc: '浏览器请求 GitHub Pages 静态资源', icon: '🌐' },
    { step: 2, action: '加载 SPA', desc: 'Vite 构建的 JS/CSS 文件被加载，Vue 应用初始化', icon: '📥' },
    { step: 3, action: '路由决定视图', desc: 'currentPage 状态决定渲染哪个页面组件', icon: '🧭' },
    { step: 4, action: '组件加载数据', desc: '从 data/ 目录导入静态 JS 数据文件', icon: '📂' },
    { step: 5, action: '响应式渲染', desc: 'Vue 响应式系统驱动 DOM 更新，显示内容', icon: '🖥️' },
    { step: 6, action: '用户交互', desc: '点击导航、筛选文章、切换深色模式等', icon: '👆' },
    { step: 7, action: '代码更新', desc: 'git push → GitHub Actions → 自动构建部署', icon: '🔄' },
  ],

  // 响应式断点策略
  responsiveStrategy: [
    { breakpoint: '≥ 1024px', device: '桌面 / iPad 横屏', layout: '固定左侧导航栏 + 右侧内容区', sidebar: '始终可见' },
    { breakpoint: '768px ~ 1023px', device: 'iPad 竖屏 / 小平板', layout: '全屏内容 + 汉堡菜单', sidebar: '点击汉堡按钮滑出' },
    { breakpoint: '< 768px', device: 'iPhone 横屏 / 大屏手机', layout: '全屏内容 + 窄汉堡菜单', sidebar: '滑出式，宽度 280px' },
    { breakpoint: '< 480px', device: 'iPhone 竖屏', layout: '紧凑内容 + 精简汉堡菜单', sidebar: '滑出式，隐藏导航描述文字' },
  ],

  // 设计模式
  designPatterns: [
    { name: '组件化开发', icon: '🧩', desc: '每个页面拆分为独立 Vue 组件，职责单一、可复用' },
    { name: '数据与视图分离', icon: '📊', desc: '数据集中在 data/ 目录，组件只负责渲染，易于维护' },
    { name: 'Scoped CSS', icon: '🎨', desc: '组件样式隔离，避免全局污染，命名冲突零风险' },
    { name: 'CSS 变量主题', icon: '🌓', desc: '通过 CSS 变量实现深色/亮色模式一键切换' },
    { name: '条件渲染路由', icon: '🚦', desc: '使用 v-if 条件渲染替代 Vue Router，轻量无依赖' },
    { name: '响应式设计', icon: '📱', desc: '移动优先，四档断点适配各种屏幕尺寸' },
  ],

  // 性能优化
  performance: [
    { metric: '加载速度', detail: '静态资源托管于 GitHub Pages CDN，全球加速', icon: '🚀' },
    { metric: '构建体积', detail: 'Vite Tree-shaking 去除无用代码，压缩输出', icon: '📦' },
    { metric: '热更新', detail: 'Vite HMR 毫秒级响应，开发效率倍增', icon: '⚡' },
    { metric: '缓存策略', detail: '浏览器缓存静态资源，减少重复加载', icon: '💾' },
    { metric: 'SEO 基础', detail: '语义化 HTML 标签 + meta 信息，利于搜索引擎', icon: '🔍' },
  ],

  // 项目文件树
  structure: [
    {
      name: '📁 src/',
      desc: '源代码根目录',
      children: [
        { name: 'App.vue', desc: '根组件，状态管理与页面路由' },
        { name: 'main.js', desc: '应用入口，创建 Vue 实例' },
        { name: '📁 components/', desc: '页面业务组件（10个）' },
        { name: '📁 games/', desc: '游戏组件（华容道、数独）' },
        { name: '📁 data/', desc: '静态数据文件（4个）' },
      ],
    },
    {
      name: '📄 index.html',
      desc: 'HTML 入口文件',
    },
    {
      name: '📄 vite.config.js',
      desc: 'Vite 构建配置',
    },
    {
      name: '📁 .github/workflows/',
      desc: 'GitHub Actions CI/CD 配置',
    },
  ],
}