export const posts = [
  {
    id: 1,
    title: '对齐、简洁、反馈、设计 — mattypocock/skills 工程哲学深度解析',
    date: '2026-07-19',
    category: 'AI',
    tags: ['AI', '工程哲学', 'agent-skills', '研发管理'],
    readTime: 12,
    excerpt: 'Matt Pocock 的 Skills 仓库不是一个工具集，而是一套面向 AI 时代的工程方法论。它直面 AI 编程的四个致命断裂——对齐断裂、概念混乱、反馈缺失、架构熵增——并用精心设计的技能指令逐个击破。',
    content: `
      <style>
        .skill-banner {
          background: linear-gradient(135deg, #8b5cf6, #ec4899);
          color: white; padding: 24px; border-radius: 14px; margin-bottom: 24px;
          text-align: center;
        }
        .skill-banner h2 { color: white; font-size: 1.3rem; margin-bottom: 8px; }
        .skill-banner p { opacity: 0.9; font-size: 0.9rem; }
        .skill-card {
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: var(--radius); padding: 20px; margin: 16px 0;
          border-left: 4px solid #8b5cf6;
        }
        .skill-card h3 { color: var(--accent); margin-bottom: 8px; display: flex; align-items: center; gap: 8px; }
        .skill-card h3 code { font-size: 0.85rem; background: var(--accent-light); padding: 2px 8px; border-radius: 4px; }
        .principle-box {
          background: var(--bg-secondary); border-radius: var(--radius-sm); padding: 16px; margin: 12px 0;
          border: 1px solid var(--border);
        }
        .principle-box .p-title { font-weight: 700; color: var(--accent); margin-bottom: 6px; }
        .principle-box .p-quote { font-style: italic; color: var(--text-muted); margin: 6px 0; padding-left: 12px; border-left: 3px solid var(--border); }
        table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 0.85rem; }
        th, td { border: 1px solid var(--border); padding: 10px 12px; text-align: left; }
        th { background: var(--accent-light); color: var(--accent); font-weight: 600; }
        tr:hover { background: var(--bg-secondary); }
        .callout {
          background: var(--accent-light); border-radius: var(--radius-sm); padding: 14px 16px; margin: 16px 0;
          border-left: 4px solid var(--accent); font-size: 0.9rem;
        }
      </style>

      <div class="skill-banner">
        <h2>⚡ Skills For Real Engineers — Not Vibe Coding</h2>
        <p>Matt Pocock · 60,000+ 开发者订阅 · 开源 GitHub 仓库</p>
      </div>

      <h2>一、为什么需要这个方法论？</h2>
      <p>2025-2026 年，AI 编程代理（Claude Code、Codex、Cursor 等）以前所未有的速度渗透进开发者的日常工作。但 Matt Pocock 看到了四个被大多数人忽略的致命断裂：</p>

      <div class="principle-box">
        <div class="p-title">🔴 断裂 #1：代理没理解你的需求</div>
        <div class="p-quote">"No-one knows exactly what they want" — <em>The Pragmatic Programmer</em></div>
        <p>你跟代理说"加个搜索"，你以为它明白"搜索"是什么——但它是全文搜索还是数据库搜索？搜索范围是标题还是正文？搜索结果的排序规则是什么？没有对齐，直接写代码等于盲人摸象。</p>
      </div>

      <div class="principle-box">
        <div class="p-title">🟠 断裂 #2：代理太啰嗦</div>
        <div class="p-quote">"With a ubiquitous language, conversations among developers and expressions of the code are all derived from the same domain model." — Eric Evans, <em>DDD</em></div>
        <p>代理被丢进项目后要花大量 token 猜测术语含义。结果是它用 20 个词讲一个概念，而你本来只需要 1 个词。这不仅浪费 token，更严重的是——代码里的命名也会跟着混乱。</p>
      </div>

      <div class="principle-box">
        <div class="p-title">🔴 断裂 #3：代码质量没反馈</div>
        <div class="p-quote">"Always take small, deliberate steps. The rate of feedback is your speed limit." — <em>The Pragmatic Programmer</em></div>
        <p>代理写代码时没有浏览器可以打开、没有测试可以跑、没有类型系统可以检查。它在真空中盲飞——你以为它写对了，实际上它只是在凭概率生成看起来对的文本。</p>
      </div>

      <div class="principle-box">
        <div class="p-title">🟠 断裂 #4：架构崩坏加速</div>
        <div class="p-quote">"Invest in the design of the system every day." — Kent Beck, <em>Extreme Programming Explained</em></div>
        <p>AI 加速了编码速度，也加速了软件熵增。一个决定写得不好，代理会在接下来的 10 次对话中顺着那个错误越走越远。三天下来，你的代码库就变成了"泥球"（Ball of Mud）。</p>
      </div>

      <p>Matt Pocock 的答案是：<strong>不是给代理更多 API，而是给它更好的流程</strong>。他设计了一套 <strong>Skills（技能指令）</strong>，每个技能解决一个特定的工程断裂。</p>

      <h2>二、核心技能全景</h2>
      <p>这些技能按两个维度分类：谁可以调用（用户触发 / 模型自动触发）和用途（工程 / 生产力）。以下是全部技能一览：</p>

      <h3>🔧 工程技能（用户触发）</h3>
      <div class="skill-card">
        <h3>🌀 <code>/ask-matt</code> — 技能路由器</h3>
        <p>不知道用什么技能？先问 <code>/ask-matt</code>。它是一个"路由器"，根据你的问题推荐合适的技能。输入"我想重构这个模块的结构"，它会指向 <code>/improve-codebase-architecture</code>。</p>
      </div>

      <div class="skill-card">
        <h3>🔦 <code>/grill-with-docs</code> — 盘问 + 落地文档（王牌技能）</h3>
        <p>这是 Matt 最引以为傲的技能，也是整个仓库的镇店之宝。它做两件事：</p>
        <ol style="padding-left: 20px; margin: 8px 0;">
          <li><strong>盘问</strong>：像最好的技术主管一样，对你的需求提出刁钻问题，直到所有歧义消除</li>
          <li><strong>建文档</strong>：在盘问过程中，同步构建 <code>CONTEXT.md</code>（共享语言词典）和 ADR（架构决策记录）</li>
        </ol>
        <p>效果是什么？你本来跟代理说"This is a problem when a lesson inside a section of a course is made real by being given a spot in the filesystem"，盘问之后，你和代理达成共识叫 <strong>"materialization cascade"</strong>。四个字说清楚了二十个字的事。</p>
        <div class="callout">💡 <strong>Tip</strong>：共享语言的好处远不止减少啰嗦——变量、函数、文件名都会使用它保持一致，代理也不再需要反复猜测术语含义。</div>
      </div>

      <div class="skill-card">
        <h3>📋 <code>/triage</code> — 问题分类机</h3>
        <p>把 issue 通过状态机流转：未处理 → 待确认 → 已确认 → 规划中 → 已排期。确保每个 issue 都有明确的状态和负责人。</p>
      </div>

      <div class="skill-card">
        <h3>🏗️ <code>/improve-codebase-architecture</code> — 架构救援队</h3>
        <p>扫描整个代码库，生成一个可视化的 HTML 架构报告，然后针对最深的问题跟你深入讨论。Matt 建议每几天跑一次，对抗 AI 加速的架构熵增。</p>
      </div>

      <div class="skill-card">
        <h3>📝 <code>/to-spec</code> — 对话转规格书</h3>
        <p>不需要盘问，直接把你和代理已经讨论好的内容转成一份正式的 spec，发布到 issue tracker。适合你已经想清楚但需要正式记录的场合。</p>
      </div>

      <div class="skill-card">
        <h3>🎯 <code>/to-tickets</code> — 规格书拆工单</h3>
        <p>把 plan、spec 或对话拆成一组 tracer-bullet（追踪子弹）工单。每个工单明确声明它被哪些工单阻塞（blocking edges），并且直接写到 issue tracker 里形成原生依赖链。</p>
      </div>

      <div class="skill-card">
        <h3>🛠️ <code>/implement</code> — 按工单实现</h3>
        <p>按 spec 或工单集来构建代码。在预先协商好的 seam（接缝）处调用 <code>/tdd</code>，完成后自动调 <code>/code-review</code> 做代码审查，再提交。</p>
      </div>

      <div class="skill-card">
        <h3>🧭 <code>/wayfinder</code> — 超大任务导航器</h3>
        <p>当任务大到一个 agent session 装不下时，把它拆成一张"调查工单"地图，分布在 issue tracker 上。每次解决一个工单，直到通往目标的路清晰可见。</p>
      </div>

      <h3>⚙️ 工程技能（模型自动触发）</h3>
      <div class="skill-card">
        <h3>🧪 <code>/prototype</code> — 可抛弃原型</h3>
        <p>快速构建一个可运行的原型来回答设计问题。如果是状态/逻辑问题，做一个终端可运行程序；如果是 UI 问题，做一个页面包含几种差异化的设计变体，从同一条路由切换查看。</p>
      </div>

      <div class="skill-card">
        <h3>🐛 <code>/diagnosing-bugs</code> — 诊断循环</h3>
        <p>严格的 bug 诊断流程：复现 → 最小化 → 假设 → 插桩 → 修复 → 回归测试。用于棘手的 bug 或性能回归。</p>
      </div>

      <div class="skill-card">
        <h3>📚 <code>/research</code> — 研究模式</h3>
        <p>针对高可信度的一手资料（文档、论文、官方 spec）进行调查，将发现写成一个带引用的 Markdown 文件存入仓库。以后台 agent 方式运行。</p>
      </div>

      <div class="skill-card">
        <h3>🔄 <code>/tdd</code> — 测试驱动开发</h3>
        <p>红-绿-重构循环。一次一个垂直切片构建功能或修复 bug。包含大量对"什么是好测试/坏测试"的指导。</p>
      </div>

      <div class="skill-card">
        <h3>🧩 <code>/domain-modeling</code> — 领域建模</h3>
        <p>主动构建和打磨项目的领域模型——对照术语表挑战每个术语的准确性，用边界场景做压力测试，更新 <code>CONTEXT.md</code> 和 ADR。</p>
      </div>

      <div class="skill-card">
        <h3>🏛️ <code>/codebase-design</code> — 代码库设计</h3>
        <p>"Deep Module"设计——把大量行为隐藏在小接口之后。一个 deep module 的特征是：接口简洁、放在干净的 seam 上、通过接口可测试。</p>
      </div>

      <div class="skill-card">
        <h3>👁️ <code>/code-review</code> — 双轴代码审查</h3>
        <p>两个并行的 sub-agent 从不同角度看改动：<strong>标准轴</strong>（是否符合编码标准和 Fowler 代码坏味道基线？）和 <strong>规范轴</strong>（是否忠实实现了 source issue/PRD？）。两个 agent 并行运行，互不干扰。</p>
      </div>

      <div class="skill-card">
        <h3>🔀 <code>/resolving-merge-conflicts</code> — 合并冲突解决</h3>
        <p>逐块解决正在进行的 git merge 或 rebase 冲突。每块都追溯双方的一手来源做意图分析，然后完成操作——永不执行 <code>--abort</code>。</p>
      </div>

      <h3>📈 生产力技能（用户触发）</h3>
      <div class="skill-card">
        <h3>🔥 <code>/grill-me</code> — 盘问（无文档版）</h3>
        <p>同 <code>/grill-with-docs</code> 但不写文档。适用于非代码场景——比如确定会议议程、做团队决策、策划活动流程。</p>
      </div>

      <div class="skill-card">
        <h3>🔄 <code>/handoff</code> — 交接文档</h3>
        <p>把当前对话压缩成一份交接文档，让另一个 agent 可以无缝继续。</p>
      </div>

      <div class="skill-card">
        <h3>📖 <code>/teach</code> — 教学模式</h3>
        <p>跨多个 session 教用户一个新技能或新概念，用当前目录作为有状态的教学工作空间。</p>
      </div>

      <div class="skill-card">
        <h3>✍️ <code>/writing-great-skills</code> — 写技能的最佳实践</h3>
        <p>一篇元指南：好的 skill 该用什么词汇、什么结构、什么设计原则。</p>
      </div>

      <h2>三、核心理念拆解</h2>

      <h3>3.1 Grilling（盘问）—— 对齐是首要生产力</h3>
      <p>Matt 说 <code>/grill-me</code> 是他最受欢迎的技能。为什么？因为在软件开发的四种失败模式中，"没对齐"的破坏力最大。</p>
      <p>盘问式需求澄清不是简单的问问题——它像一位顶级技术主管跟你一起推演：</p>
      <ul style="padding-left: 20px; margin: 8px 0;">
        <li>"你说的'用户'是指登录用户还是匿名访客？"</li>
        <li>"搜索的边界是全局搜索还是当前页面内搜索？"</li>
        <li>"这个功能的验收标准是什么？列出可以写进测试的具体行为。"</li>
      </ul>
      <p>每解决一个歧义，就减少一分"改完再重写"的概率。</p>

      <h3>3.2 Shared Language（共享语言）—— 简洁的力量</h3>
      <p>这是贯穿整个技能体系的最底层理念。共享语言的载体是 <code>CONTEXT.md</code> 文档，里面记录了项目的：</p>
      <ul style="padding-left: 20px; margin: 8px 0;">
        <li><strong>术语表</strong>：每个专有名词的精确含义</li>
        <li><strong>架构原则</strong>：SOLID、DRY、KISS 等按优先级排列</li>
        <li><strong>文件结构地图</strong>：每个目录和关键文件的职责</li>
        <li><strong>ADR</strong>：重要的架构决策记录</li>
      </ul>
      <p>共享语言的威力：变量、函数、文件命名一致 → 代理导航代码更快 → 代理思考更省 token → 代码更加清晰。</p>

      <h3>3.3 Feedback Loops（反馈循环）—— 速度的极限是反馈速度</h3>
      <p>没有反馈的编码就是瞎写。Matt 的三个反馈环：</p>
      <table>
        <tr><th>反馈层级</th><th>工具</th><th>作用</th></tr>
        <tr><td>静态类型</td><td>TypeScript</td><td>编译时捕获类型错误</td></tr>
        <tr><td>自动化测试</td><td><code>/tdd</code> 红-绿-重构</td><td>运行时验证行为正确性</td></tr>
        <tr><td>浏览器预览</td><td>手动 / 自动</td><td>视觉和交互验证</td></tr>
      </table>
      <p>Matt 特别强调 <strong>tdd</strong>：先写一个失败测试，再写代码让测试通过。这样代理不再是"猜"答案，而是有一个明确的成功标准。</p>

      <h3>3.4 Deep Modules（深模块）—— 抵御架构熵增的武器</h3>
      <div class="callout">
        <strong>Deep Module 定义</strong>：大量行为隐藏在简洁接口之后。比如 <code>fs.readFileSync('/path')</code>——接口只有一个函数调用，背后却隐藏了文件打开、权限检查、缓冲读取、编码转换、异常处理等大量逻辑。
      </div>
      <p>Matt 把 John Ousterhout《A Philosophy of Software Design》的"Deep Module"理念植入了 <code>/codebase-design</code> 技能。代理在设计模块时会被引导去思考：</p>
      <ul style="padding-left: 20px; margin: 8px 0;">
        <li>这个模块的接口够小吗？使用者需要知道多少内部细节？</li>
        <li>这个模块放在哪个 seam（接缝）上？是不是自然的职责边界？</li>
        <li>能否只通过接口来测试这个模块的所有行为？</li>
      </ul>

      <h2>四、实际价值总结</h2>
      <table>
        <tr><th>问题</th><th>解决方案</th><th>关键技能</th></tr>
        <tr><td>代理不理解需求</td><td>盘问式澄清 + 验收标准</td><td><code>/grill-with-docs</code></td></tr>
        <tr><td>代理太啰嗦、代码命名混乱</td><td>共享语言：CONTEXT.md + 术语表</td><td><code>/domain-modeling</code></td></tr>
        <tr><td>代码质量不可控</td><td>TDD 红-绿-重构循环</td><td><code>/tdd</code></td></tr>
        <tr><td>架构快速腐化</td><td>Deep Module 设计 + 定期架构扫描</td><td><code>/codebase-design</code> + <code>/improve-codebase-architecture</code></td></tr>
        <tr><td>需求变更脱离追踪</td><td>Spec → Tickets → Implement → Review 完整流水线</td><td><code>/to-spec</code> → <code>/to-tickets</code> → <code>/implement</code> → <code>/code-review</code></td></tr>
      </table>

      <h2>五、我的感悟</h2>
      <p>读完 Matt Pocock 的 Skills 仓库，我最大的感受是：<strong>AI 时代不是降低了工程标准，而是提高了对工程基础的要求</strong>。</p>
      <p>因为代理写代码的速度太快了——做错决定的速度也更快了。在这种情况下，单测、代码审查、架构评审、术语统一这些传统工程实践不但没有过时，反而变得前所未有地重要。</p>
      <p>这就是我从今天开始将以下原则纳入自己工作流的原因：</p>
      <ol style="padding-left: 20px; margin: 8px 0;">
        <li><strong>每次接手新任务，先把目标盘问清楚</strong>——你不可能让 AI 做出你不知道怎么定义的东西</li>
        <li><strong>维护共享语言</strong>——项目术语表、CONTEXT.md、ADR 不是可有可无的文档，它们是与 AI 高效协作的基础设施</li>
        <li><strong>小步反馈、每次构建</strong>——每改一点就跑一遍验证，让反馈指引方向</li>
        <li><strong>关心设计</strong>——Deep Module 的哲学不仅适用于代码，也适用于项目管理：复杂行为隐藏在简单接口之后</li>
      </ol>
      <p>这条路径上还有很多可以探索的。如果你想了解更多，可以访问 <a href="https://github.com/mattpocock/skills" target="_blank" rel="noopener">github.com/mattpocock/skills</a> 或订阅他的 <a href="https://www.aihero.dev/s/skills-newsletter" target="_blank" rel="noopener">Newsletter</a>。</p>
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
