export const posts = [
  {
    id: 1,
    title: '对齐、简洁、反馈、设计 — mattypocock/skills 工程哲学深度解析',
    date: '2026-07-19',
    category: 'AI',
    tags: ['AI', '工程哲学', 'agent-skills', '研发管理'],
    readTime: 12,
    excerpt: 'Matt Pocock 的 Skills 仓库不是一个工具集，而是一套面向 AI 时代的工程方法论。它直面 AI 编程的四个致命断裂——对齐断裂、概念混乱、反馈缺失、架构熵增——并用精心设计的技能指令逐个击破。',
    content: ``
  },
  {
    id: 2,
    title: 'Apple iPad Pro 产品展示页面 — 当 Apple 设计哲学遇上 Vue 3',
    date: '2026-07-19',
    category: '前端',
    tags: ['Vue 3', '纯CSS', 'Apple设计', '产品展示', 'sanidhyy/apple-clone'],
    readTime: 8,
    excerpt: '参考 sanidhyy/apple-clone 的 iPhone 15 克隆项目，用 Vue 3 和纯 CSS 为 iPad Pro 打造了一个 Apple 风格的产品展示页面——深色主题、渐变背景、动态计数器、颜色切换选择器，所有视觉效果零依赖。',
    content: `
      <style>
        .blog-img { margin: 20px 0; border-radius: 12px; overflow: hidden; }
        .blog-img img { width: 100%; display: block; }
        .code-block { background: #1e1e2e; color: #cdd6f4; padding: 16px; border-radius: 10px; font-family: 'Cascadia Code', 'Fira Code', monospace; font-size: 0.85rem; overflow-x: auto; line-height: 1.6; margin: 16px 0; }
        .code-block .comment { color: #6c7086; }
        .code-block .keyword { color: #cba6f7; }
        .code-block .string { color: #a6e3a1; }
        .code-block .func { color: #89b4fa; }
        .blog-highlight { background: var(--accent-light); border-radius: 8px; padding: 14px; border-left: 3px solid var(--accent); margin: 16px 0; }
        .blog-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 10px; padding: 16px; margin: 12px 0; }
        .component-tree { display: flex; flex-direction: column; gap: 4px; font-family: monospace; font-size: 0.85rem; padding: 12px; background: var(--bg-secondary); border-radius: 8px; }
        .component-tree .dir { color: var(--accent); }
        .component-tree .file { color: var(--text-secondary); padding-left: 20px; }
        .component-tree .indent-2 { padding-left: 40px; }
        .component-tree .indent-3 { padding-left: 60px; }
      </style>

      <h2>📱 从灵感出发</h2>
      <p>GitHub 上有一个杰出的项目叫 <strong><a href="https://github.com/sanidhyy/apple-clone" target="_blank" rel="noopener">sanidhyy/apple-clone</a></strong>，它用 React + Three.js + GSAP 打造了一个 iPhone 15 产品演示页面——3D 模型旋转、视频轮播、流畅的滚动动画，视觉效果直逼苹果官网。</p>
      <p>但我用的是 <strong>Vue 3 + Vite</strong>，而且项目的技术原则是 <strong>KISS（保持简单）</strong>——优先原生特性，不引入不必要的依赖。所以我决定：<strong>在 Vue 生态中实现 Apple 审美，但要全部用纯 CSS 完成</strong>。</p>

      <div class="blog-card">
        <strong>⚖️ 技术权衡</strong>
        <p style="margin-top: 8px;">sanidhyy 的原版依赖：React 19 + Three.js + GSAP + React Three Fiber + 8 个 ESLint 插件 + Tailwind CSS<br>
        <strong>我的版本：Vue 3（只有 Composition API）+ 纯 CSS（零依赖）</strong></p>
      </div>

      <h2>🏗️ 页面架构设计</h2>
      <p>参考苹果官网 iPad Pro 页面，我按 6 个区块组织内容：</p>
      <div class="component-tree">
        <span class="dir">📁 IPadProPage.vue</span>
        <span class="file indent-2">├── 🚀 Hero 区（全屏首屏 + 设备渲染 + 颜色预览）</span>
        <span class="file indent-2">├── 🎨 颜色选择器（深空黑/银色/深空灰切换）</span>
        <span class="file indent-2">├── 📐 设计区（薄出想象力 + 5.1mm 概念）</span>
        <span class="file indent-2">├── 🔋 M4 芯片（规格参数 + 动态计数器动画）</span>
        <span class="file indent-2">├── 🖥️ 显示屏（Liquid Retina XDR + 功能特性网格）</span>
        <span class="file indent-2">├── 📋 技术规格（8 个规格卡片网格）</span>
        <span class="file indent-2">└── 🦶 Footer（选购/服务/关于三栏）</span>
      </div>

      <h2>🛠️ 关键技术实现</h2>

      <h3>1️⃣ 浮动导航栏</h3>
      <p>苹果官网的标志性元素——固定顶部导航栏，带毛玻璃效果：</p>
      <div class="code-block">
        <span class="comment">/* 固定 + 毛玻璃 + 80% 透明度黑色 */</span>
        .ipad-nav {<br>
        &nbsp;&nbsp;position: fixed; top: 0; left: 0; right: 0; z-index: 100;<br>
        &nbsp;&nbsp;background: rgba(0,0,0,0.8);<br>
        &nbsp;&nbsp;backdrop-filter: blur(20px);<br>
        &nbsp;&nbsp;<span class="comment">/* -webkit- 前缀保证 Safari 兼容 */</span><br>
        &nbsp;&nbsp;-webkit-backdrop-filter: blur(20px);<br>
        &nbsp;&nbsp;border-bottom: 1px solid var(--ipad-border);<br>
        }
      </div>

      <h3>2️⃣ Hero 首屏：径向渐变 + 设备渲染</h3>
      <p>Hero 区是页面的视觉焦点。我用 radial-gradient 模拟了 Apple 常见的顶部聚光效果：</p>
      <div class="code-block">
        .hero-bg {<br>
        &nbsp;&nbsp;background: radial-gradient(ellipse at 50% 0%, #1a1a2e 0%, #000 70%);<br>
        }
      </div>
      <p>中间设备渲染区，用一个 <code>.device-frame</code> 包裹 <code>.device-screen</code>。屏幕内用纯 CSS 画了抽象线条表示 iPad 界面——配合三个颜色主题变量，点击颜色按钮时设备框架渐变背景会平滑过渡：</p>
      <div class="code-block">
        .device-frame { transition: background 0.5s ease; }<br>
        .device-frame.color-black { background: linear-gradient(135deg, #1d1d1f, #2d2d2f); }<br>
        .device-frame.color-silver { background: linear-gradient(135deg, #f5f5f7, #e8e8ed); }<br>
        .device-frame.color-gray { background: linear-gradient(135deg, #424245, #545457); }
      </div>

      <h3>3️⃣ 动态计数器（点击触发）</h3>
      <p>M4 芯片区块有一组规格计数器（38 TOPS、1600nits、10h、20+），用户点击即可触发数字从 0 到目标值的动画：</p>
      <div class="code-block">
        <span class="keyword">const</span> animateCounters = () => {<br>
        &nbsp;&nbsp;counters.value.forEach((c, idx) => {<br>
        &nbsp;&nbsp;&nbsp;&nbsp;<span class="keyword">const</span> el = document.getElementById(<span class="string">\`counter-\${idx}\`</span>)<br>
        &nbsp;&nbsp;&nbsp;&nbsp;<span class="keyword">const</span> step = Math.ceil(c.value / 30)<br>
        &nbsp;&nbsp;&nbsp;&nbsp;<span class="keyword">const</span> timer = setInterval(() => {<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;current += step<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;el.textContent = current.toLocaleString()<br>
        &nbsp;&nbsp;&nbsp;&nbsp;}, 40)<br>
        &nbsp;&nbsp;})<br>
        }
      </div>

      <h3>4️⃣ 显示屏区域：旋转渐变光晕</h3>
      <p>Liquid Retina XDR 屏幕模拟——用 conic-gradient 做渐变背景并持续旋转，配合 15% 透明度，营造"流光溢彩"的视觉效果：</p>
      <div class="code-block">
        .display-grad {<br>
        &nbsp;&nbsp;background: conic-gradient(from 0deg, #0071e3, #5856d6, #ff2d55, #0071e3);<br>
        &nbsp;&nbsp;opacity: 0.15;<br>
        &nbsp;&nbsp;animation: rotateGrad 10s linear infinite;<br>
        }<br>
        @keyframes rotateGrad {<br>
        &nbsp;&nbsp;to { transform: rotate(360deg); }<br>
        }
      </div>

      <h3>5️⃣ 滚动观察 IntersectionObserver</h3>
      <p>页面加载后自动检测当前可见区块——这为将来添加"当前区块高亮导航"预留了基础设施：</p>
      <div class="code-block">
        <span class="keyword">const</span> observer = <span class="keyword">new</span> IntersectionObserver(<br>
        &nbsp;&nbsp;(entries) => {<br>
        &nbsp;&nbsp;&nbsp;&nbsp;entries.forEach(entry => {<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="keyword">if</span> (entry.isIntersecting) {<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;activeSection.value = parseInt(entry.target.dataset.index)<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;})<br>
        &nbsp;&nbsp;}, { threshold: 0.5 }<br>
        )
      </div>

      <h2>🎨 Apple 设计语言复现</h2>
      <p>为了贴近苹果官网视觉感受，我重点复现了以下设计元素：</p>
      <table>
        <tr><th>设计元素</th><th>技术实现</th></tr>
        <tr><td>毛玻璃导航栏</td><td><code>backdrop-filter: blur(20px)</code></td></tr>
        <tr><td>深色渐变背景</td><td><code>radial-gradient</code> + 纯黑色</td></tr>
        <tr><td>极简字体栈</td><td>SF Pro Display / Helvetica Neue 后备</td></tr>
        <tr><td>蓝色 CTA 按钮</td><td>#0071e3 苹果经典蓝</td></tr>
        <tr><td>卡片悬停效果</td><td><code>translateY(-2px)</code> + 边框变蓝</td></tr>
        <tr><td>响应式断点</td><td>768px / 480px 两档适配</td></tr>
        <tr><td>颜色切换过渡</td><td><code>transition: background 0.5s ease</code></td></tr>
      </table>

      <h2>🔄 与简历的联动</h2>
      <p>为了让这个产品展示页不只是"又一个页面"，而是与简历内容形成有机连接——我在 resume.js 的第一个项目 <strong>"首代MatePad Pro Max旗舰平板"</strong> 的链接中增加了：</p>
      <div class="code-block">
        { name: <span class="string">'iPad Pro 展示页'</span>, internal: <span class="keyword">true</span>, page: <span class="string">'ipad-pro'</span> }
      </div>
      <p>这是 <code>ResumePage.vue</code> 新支持的 internal link 机制。链接现在有两种类型：</p>
      <ul>
        <li><code>internal: true</code> → 点击后跳转到本站内部页面（通过 emit navigate 事件）</li>
        <li><code>url</code> → 传统外链，<code>target="_blank"</code> 打开</li>
      </ul>
      <p>内部链接在视觉上用 <strong>accent 色边框 + 半透明背景</strong> 区分于普通外链，鼠标 hover 时填充色块，白色文字凸显。这样用户第一眼就知道"这个链接会带我去一个新的页面"。</p>

      <h2>📊 对比总结</h2>
      <div class="blog-card">
        <p><strong>sanidhyy/apple-clone (React)</strong> → Three.js 3D 模型 + GSAP 动画 + 11 个组件 + Tailwind + 20+ 依赖</p>
        <p style="margin-top: 8px;"><strong>我的 IPadProPage (Vue 3)</strong> → 纯 CSS + 1 个组件 + 0 个新依赖 + 5.1mm 主题贯穿设计</p>
      </div>
      <p>如果你在找工作或建立个人品牌，产品展示页是一个极好的"敲门砖"——它直观体现了你对设计细节的敏感度、对前端技术的理解和将灵感落地的执行力。</p>
      <div class="blog-highlight">
        💡 <strong>访问方式</strong>：回到简历 → 点击"首代MatePad Pro Max旗舰平板"项目下的"iPad Pro 展示页"链接即可跳转。
      </div>
    `
  }
]

export const categoryColors = {
  'AI': '#8b5cf6',
  '前端': '#6c63ff',
  'JavaScript': '#f7df1e',
  'CSS': '#264de4',
  '工具': '#47a248',
}
