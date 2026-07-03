// ============================================================
// ADR-001: 架构数据与展示分离（Dependency Inversion Principle）
// 数据文件独立维护，组件通过导入数据渲染，不依赖具体实现
// ============================================================

export const architectureData = {
  overview: {
    title: '博客架构画像',
    subtitle: '一次关于 SOLID 原则、响应式架构与 Vue 3 SPA 的实践记录',
    description: '本博客是一个纯前端单页应用（SPA），采用 Vue 3 + Vite 构建，托管于 GitHub Pages。整个项目以 SOLID 原则为最高优先级设计准则，追求代码可维护性、可扩展性与跨设备体验的最佳平衡。',
  },

  // ─── 核心设计原则（SOLID + 补充） ───
  corePrinciples: {
    title: '🎯 核心设计原则',
    description: '以下原则是本项目的最高优先级准则，所有代码变更必须遵循。',
    items: [
      {
        name: '单一职责 (SRP)',
        icon: '🎯',
        desc: '每个模块/组件只负责一个职责。数据文件只管理数据，组件只负责渲染，工具函数只处理特定逻辑。',
        example: 'data/resume.js 只维护简历数据，不涉及 UI 逻辑；ResumePage.vue 只渲染数据，不直接操作数据。',
        level: '最高优先级',
        badge: '🔴',
      },
      {
        name: '开闭原则 (OCP)',
        icon: '🔓',
        desc: '对扩展开放，对修改封闭。新增功能时不需要修改已有代码，通过扩展新模块实现。',
        example: '新增一个页面只需：新建 data/*.js + 新建 components/*.vue + App.vue 添加一行导入，无需改动其他页面。',
        level: '最高优先级',
        badge: '🔴',
      },
      {
        name: '里氏替换 (LSP)',
        icon: '🔁',
        desc: '子类/实现类可以替换父类/接口而不改变程序正确性。组件间保持一致的接口契约。',
        example: '所有页面组件接收相同的 props 接口（如 @view-post、@navigate），可互换而不破坏系统。',
        level: '高优先级',
        badge: '🟠',
      },
      {
        name: '接口隔离 (ISP)',
        icon: '🧩',
        desc: '不强迫依赖不需要的接口。每个组件只暴露必要的 props/events。',
        example: 'SideBar 只暴露 @navigate 和 :currentPage，不暴露内部状态管理细节。',
        level: '高优先级',
        badge: '🟠',
      },
      {
        name: '依赖倒置 (DIP)',
        icon: '🔄',
        desc: '高层模块不依赖低层模块，两者都依赖抽象。数据通过导入/注入方式提供给组件。',
        example: "组件 import { resume } from '../data/resume.js'，不直接硬编码数据。更换数据源只需修改 data 文件。",
        level: '最高优先级',
        badge: '🔴',
      },
      {
        name: 'DRY (不要重复)',
        icon: '📌',
        desc: '每个知识片段在系统中只有单一、明确、权威的表述。避免代码重复。',
        example: 'CSS 变量集中定义在 :root，颜色、间距等全局统一管理。',
        level: '持续践行',
        badge: '🟢',
      },
      {
        name: 'KISS (保持简单)',
        icon: '✨',
        desc: '最简单的方案往往是最好的。优先使用原生 Vue 特性而非引入复杂依赖。',
        example: '使用 v-if 条件渲染替代 Vue Router，零依赖实现页面切换。',
        level: '持续践行',
        badge: '🟢',
      },
    ],
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
      icon: '🖥️',
      items: [
        'App.vue — 根组件，页面路由控制，全局 CSS 变量',
        'SideBar.vue — 左侧导航栏（响应式汉堡菜单）',
        '8 个页面组件：Resume / Home / PostDetail / Algorithm / AlgorithmDetail / Games / Architecture / Admin',
      ],
    },
    {
      name: '数据层 (Data)',
      color: '#ec4899',
      icon: '📂',
      items: [
        'data/resume.js — 简历数据（SRP 原则：只管理简历数据）',
        'data/blog.js — 博客文章数据',
        'data/algorithm.js — 算法文章数据',
        'data/architecture.js — 架构配置数据（含 SOLID 原则定义）',
      ],
    },
    {
      name: '构建层 (Build)',
      color: '#f59e0b',
      icon: '🔧',
      items: [
        'Vite 开发服务器 — HMR 热更新',
        'Vite 构建 — Tree-shaking / 代码分割 / 压缩',
        '静态资源优化 — CSS 压缩 / JS 压缩 / 缓存哈希',
      ],
    },
    {
      name: '部署层 (Deploy)',
      color: '#10b981',
      icon: '🚀',
      items: [
        'GitHub 仓库 — 分布式版本控制',
        'GitHub Actions — 自动化 CI/CD 流水线',
        'GitHub Pages — 静态资源托管 + 全球 CDN',
      ],
    },
  ],

  // 组件树（交互式可折叠）
  componentTree: {
    root: 'App.vue',
    desc: '根组件 · 状态管理 · 条件路由',
    children: [
      { name: 'SideBar.vue', desc: '导航 + 主题切换 + 响应式汉堡菜单' },
      {
        name: '页面容器 (条件渲染)',
        desc: '通过 currentPage v-if 切换',
        children: [
          { name: 'ResumePage.vue', desc: '个人简历展示（含 SOLID 准则数据）' },
          { name: 'HomePage.vue', desc: '博客文章列表 + 筛选' },
          { name: 'PostDetail.vue', desc: '文章详情' },
          {
            name: 'AlgorithmPage.vue', desc: '算法文章列表',
            children: [
              { name: 'AlgorithmDetail.vue', desc: '算法详情 + 代码高亮' },
            ],
          },
          {
            name: 'GamesPage.vue', desc: '小游戏入口',
            children: [
              { name: 'HuarongDao.vue', desc: '华容道' },
              { name: 'Sudoku.vue', desc: '数独' },
            ],
          },
          { name: 'ArchitecturePage.vue', desc: '架构展示 · SOLID 原则 · 交互式图表' },
          { name: 'AdminPage.vue', desc: '后台管理面板' },
        ],
      },
    ],
  },

  // 数据流
  dataFlow: [
    { step: 1, action: '用户访问', desc: '浏览器请求 GitHub Pages 静态资源', icon: '🌐', detail: 'DNS 解析 → CDN 节点 → 返回 index.html' },
    { step: 2, action: '加载 SPA', desc: 'Vite 构建的 JS/CSS 文件被加载，Vue 应用初始化', icon: '📥', detail: 'main.js → createApp → mount(#app)' },
    { step: 3, action: '路由决定视图', desc: 'currentPage 状态决定渲染哪个页面组件', icon: '🧭', detail: '通过 v-if 条件渲染，替代 Vue Router' },
    { step: 4, action: '组件加载数据', desc: '从 data/ 目录导入静态 JS 数据文件', icon: '📂', detail: '各页面组件 import 对应数据模块' },
    { step: 5, action: 'Vue 响应式渲染', desc: 'Vue 响应式系统驱动 DOM 更新', icon: '🖥️', detail: 'ref/reactive → Virtual DOM → 真实 DOM' },
    { step: 6, action: '用户交互', desc: '导航、筛选、深色模式切换等', icon: '👆', detail: '事件触发 → 状态变更 → 视图自动更新' },
    { step: 7, action: 'CI/CD 自动部署', desc: 'git push → GitHub Actions → 自动构建部署', icon: '🔄', detail: 'push → Checkout → npm ci → build → deploy-pages' },
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
    { name: '组件化开发 (SRP)', icon: '🧩', desc: '每个页面拆分为独立 Vue 组件，职责单一，符合单一职责原则' },
    { name: '数据与视图分离 (DIP)', icon: '📊', desc: '数据集中在 data/，组件只渲染，符合依赖倒置原则' },
    { name: 'Scoped CSS (OCP)', icon: '🎨', desc: '组件样式隔离，新增组件不修改旧样式，符合开闭原则' },
    { name: 'CSS 变量主题', icon: '🌓', desc: '通过 CSS 变量实现深色/亮色模式一键切换，零 JS 开销' },
    { name: '条件渲染路由 (KISS)', icon: '🚦', desc: 'v-if 替代 Vue Router，最简方案实现页面切换' },
    { name: '响应式设计', icon: '📱', desc: '移动优先，四档断点适配各种屏幕尺寸' },
  ],

  // ADRs - 架构决策记录
  adrs: [
    {
      id: 'ADR-001',
      title: '数据与视图分离',
      status: '已采纳',
      date: '2024-01',
      context: '需要一种方式管理简历、博客文章等数据，同时保持组件简单可维护',
      decision: '将数据集中到 src/data/ 目录的 JS 文件中，组件通过 import 导入使用',
      consequence: '数据可独立维护，更换数据源只需修改 data 文件，组件无需改动',
    },
    {
      id: 'ADR-002',
      title: '使用 v-if 替代 Vue Router',
      status: '已采纳',
      date: '2024-01',
      context: '页面不多，不需要复杂路由功能，希望保持零依赖',
      decision: '使用 App.vue 中的 currentPage ref + v-if 实现条件渲染',
      consequence: '零外部依赖，但 URL 无法直接定位到具体页面（可接受）',
    },
    {
      id: 'ADR-003',
      title: 'CSS 变量驱动主题系统',
      status: '已采纳',
      date: '2024-01',
      context: '需要支持亮色/深色模式切换，且切换需平滑无闪烁',
      decision: '在 :root 和 [data-theme="dark"] 中定义两套 CSS 变量，通过 JS 切换 data-theme',
      consequence: '主题切换零 JS 计算开销，所有颜色自动适配',
    },
    {
      id: 'ADR-004',
      title: '以 SOLID 为最高设计准则',
      status: '已采纳',
      date: '2026-07',
      context: '项目需持续演化，代码质量和可维护性是首要考量',
      decision: '所有代码变更需以 SOLID 原则为准绳，优先遵循 SRP、OCP、DIP',
      consequence: '代码结构清晰，新功能扩展成本低，但初期设计需更多思考',
    },
  ],

  // 性能指标
  performance: [
    { metric: '首屏加载', detail: '静态资源托管于 GitHub Pages CDN，全球边缘节点加速', icon: '🚀', value: '< 1.5s' },
    { metric: '构建体积', detail: 'Vite Tree-shaking 去除无用代码 + 压缩输出', icon: '📦', value: '~150KB' },
    { metric: '热更新', detail: 'Vite HMR 毫秒级响应，修改代码即时预览', icon: '⚡', value: '< 50ms' },
    { metric: '缓存策略', detail: '浏览器缓存静态资源（强缓存 + 文件名哈希）', icon: '💾', value: '1年' },
    { metric: '可维护性', detail: 'SOLID原则驱动，数据组件分离，变更影响范围最小化', icon: '�️', value: '高' },
  ],

  // 项目文件树
  structure: [
    {
      name: '📁 src/',
      desc: '源代码根目录',
      children: [
        { name: 'App.vue', desc: '根组件 · 状态管理 · 条件路由（SRP）' },
        { name: 'main.js', desc: '应用入口 · 创建 Vue 实例' },
        { name: '📁 components/', desc: '8 个业务页面组件（OCP：新增页面不修改旧组件）' },
        { name: '📁 games/', desc: '2 个游戏组件（华容道 + 数独）' },
        { name: '📁 data/', desc: '4 个数据模块（SRP：每个模块职责单一）' },
      ],
    },
    {
      name: '📄 index.html',
      desc: 'HTML 入口 · 语义化 meta 标签',
    },
    {
      name: '📄 vite.config.js',
      desc: 'Vite 配置 · base 路径 · 插件注册',
    },
    {
      name: '📁 .github/workflows/',
      desc: 'CI/CD 流水线 · deploy.yml',
    },
  ],
}
