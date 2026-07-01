export const resume = {
  basics: {
    name: '你的名字',
    title: '前端开发工程师',
    email: 'your.email@example.com',
    phone: '138-0000-0000',
    location: '中国 · 北京',
    summary: '热爱技术的前端开发者，专注于 Web 前端开发。拥有扎实的 JavaScript 基础，善于钻研新技术并解决实际问题。',
    links: [
      { name: 'GitHub', url: 'https://github.com/yourusername' },
      { name: '博客', url: 'https://foozc.github.io' },
    ]
  },
  work: [
    {
      company: '某科技有限公司',
      position: '前端开发工程师',
      startDate: '2023-07',
      endDate: null,
      details: [
        '负责公司核心产品的前端架构设计和开发工作',
        '使用 Vue 3 + TypeScript 重构了旧版管理系统，提升 40% 开发效率',
        '优化页面性能，首屏加载时间从 3s 降低到 1.2s',
        '参与组件库的建设和维护，封装 20+ 通用组件'
      ],
      techStack: ['Vue 3', 'TypeScript', 'Vite', 'Pinia']
    },
    {
      company: '互联网创业公司',
      position: '初级前端开发工程师',
      startDate: '2021-07',
      endDate: '2023-06',
      details: [
        '参与公司多款 Web 产品的开发和维护',
        '基于 Vue 2 + Element UI 搭建后台管理系统',
        '实现响应式布局，适配移动端和 PC 端'
      ],
      techStack: ['Vue 2', 'JavaScript', 'Element UI', 'SCSS']
    }
  ],
  education: [
    {
      school: '某某大学',
      degree: '本科',
      major: '计算机科学与技术',
      startDate: '2017-09',
      endDate: '2021-06',
      details: ['GPA: 3.6/4.0', '获得校级优秀毕业生称号']
    }
  ],
  skills: [
    {
      name: '前端框架',
      level: '熟练',
      percentage: 90,
      items: ['Vue 3', 'Vue 2', 'React', 'Pinia']
    },
    {
      name: '基础技术',
      level: '精通',
      percentage: 95,
      items: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript']
    },
    {
      name: '构建工具',
      level: '熟练',
      percentage: 85,
      items: ['Vite', 'Webpack', 'Babel', 'ESLint']
    },
    {
      name: '其他技能',
      level: '掌握',
      percentage: 75,
      items: ['Git', 'Docker', 'Linux', 'Node.js']
    }
  ],
  projects: [
    {
      name: '个人博客系统',
      role: '独立开发者',
      date: '2026-07',
      description: '基于 Vue 3 构建的个人博客网站，支持深色模式、标签筛选、文章详情展示等功能，部署在 GitHub Pages。',
      techStack: ['Vue 3', 'CSS3', 'GitHub Pages'],
      links: [
        { name: '在线预览', url: 'https://foozc.github.io' }
      ]
    },
    {
      name: '后台管理系统重构',
      role: '核心开发者',
      date: '2024-03',
      description: '将公司老旧的后台管理系统从 Vue 2 重构为 Vue 3 + TypeScript。',
      techStack: ['Vue 3', 'TypeScript', 'Vite', 'Pinia']
    }
  ]
}