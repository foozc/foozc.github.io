<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// ─── 滚动动画 ───
const activeSection = ref(0)
const observer = ref(null)
const sections = ref([])

const observeSections = () => {
  observer.value = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = parseInt(entry.target.dataset.index)
          if (!isNaN(idx)) activeSection.value = idx
        }
      })
    },
    { threshold: 0.5 }
  )
  sections.value = document.querySelectorAll('[data-section]')
  sections.value.forEach((el) => observer.value?.observe(el))
}

onMounted(() => {
  setTimeout(observeSections, 100)
})

onUnmounted(() => {
  observer.value?.disconnect()
})

// ─── 颜色切换 ───
const colors = [
  { name: '深空黑', hex: '#1d1d1f', class: 'color-black' },
  { name: '银色', hex: '#f5f5f7', class: 'color-silver' },
  { name: '深空灰', hex: '#424245', class: 'color-gray' },
]
const activeColor = ref(0)
const selectColor = (i) => { activeColor.value = i }

// ─── 动画计数器 ───
const counters = ref([
  { label: 'M4 芯片', value: 38, suffix: 'TOPS', desc: '神经网络引擎性能' },
  { label: 'XDR 显示屏', value: 1600, suffix: 'nits', desc: '峰值亮度 · HDR' },
  { label: '电池续航', value: 10, suffix: 'h', desc: '全天候使用' },
  { label: '5G 频段', value: 20, suffix: '+', desc: '全球漫游支持' },
])
const counterAnimated = ref(false)

const animateCounters = () => {
  if (counterAnimated.value) return
  counterAnimated.value = true
  counters.value.forEach((c, idx) => {
    const el = document.getElementById(`counter-${idx}`)
    if (!el) return
    let current = 0
    const step = Math.ceil(c.value / 30)
    const timer = setInterval(() => {
      current += step
      if (current >= c.value) {
        current = c.value
        clearInterval(timer)
      }
      el.textContent = current.toLocaleString()
    }, 40)
  })
}

// ─── 规格数据 ───
const specs = [
  { label: '芯片', value: 'Apple M4 芯片', detail: '10核CPU · 10核GPU · 16核神经网络引擎' },
  { label: '显示屏', value: '13 英寸 Ultra Retina XDR', detail: '2732×2048 分辨率 · 264 ppi · 1600nits 峰值亮度' },
  { label: '存储', value: '256GB / 512GB / 1TB / 2TB', detail: 'NVMe 固态硬盘' },
  { label: '内存', value: '16GB / 24GB / 32GB', detail: '统一内存架构 · 120GB/s 带宽' },
  { label: '摄像头', value: '1200W 广角 + 1200W 超广角', detail: 'LiDAR 激光雷达扫描仪' },
  { label: '连接', value: 'Wi‑Fi 6E · 蓝牙 5.3', detail: '5G (Sub‑6GHz + mmWave) · eSIM' },
  { label: '接口', value: 'USB‑C (Thunderbolt 4)', detail: '支持 6K 外接显示器 · 40Gb/s' },
  { label: '尺寸', value: '281.6 × 215.5 × 5.1mm', detail: '重量：579g (Wi‑Fi) / 582g (蜂窝)' },
]
</script>

<template>
  <div class="ipad-pro">
    <!-- ═══ Nav ═══ -->
    <nav class="ipad-nav">
      <div class="nav-inner">
        <a href="#" class="nav-logo">🍎</a>
        <div class="nav-links">
          <a href="#overview">概览</a>
          <a href="#design">设计</a>
          <a href="#chip">芯片</a>
          <a href="#display">显示屏</a>
          <a href="#specs">技术规格</a>
        </div>
        <a href="#" class="nav-buy">购买</a>
      </div>
    </nav>

    <!-- ═══ Hero ═══ -->
    <section id="overview" class="hero-section" data-section data-index="0">
      <div class="hero-bg"></div>
      <div class="hero-content">
        <p class="hero-eyebrow">全新</p>
        <h1 class="hero-title">iPad Pro</h1>
        <p class="hero-subtitle">你的下一台电脑，可以不是电脑。</p>
        <p class="hero-tagline">M4 芯片 · Ultra Retina XDR · 薄至 5.1mm</p>
        <div class="hero-cta">
          <a href="#" class="cta-primary">进一步了解</a>
          <a href="#" class="cta-secondary">前往官网 ›</a>
        </div>
      </div>
      <div class="hero-device">
        <div class="device-frame" :class="colors[activeColor].class">
          <div class="device-screen">
            <div class="screen-content">
              <div class="screen-lines">
                <span></span><span></span><span></span><span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="scroll-hint">
        <span class="scroll-text">向下滚动探索</span>
        <span class="scroll-arrow">↓</span>
      </div>
    </section>

    <!-- ═══ 颜色选择器 ═══ -->
    <section class="color-section" data-section data-index="1">
      <h2 class="section-title">三种精美外观</h2>
      <div class="color-showcase">
        <div class="color-device" :class="colors[activeColor].class">
          <div class="color-screen">
            <div class="color-ui">
              <div class="color-status-bar"></div>
              <div class="color-icon-grid">
                <span></span><span></span><span></span><span></span>
                <span></span><span></span><span></span><span></span>
              </div>
            </div>
          </div>
        </div>
        <div class="color-picker">
          <button
            v-for="(c, i) in colors"
            :key="c.name"
            class="color-btn"
            :class="{ active: activeColor === i }"
            @click="selectColor(i)"
          >
            <span class="color-dot" :style="{ background: c.hex }"></span>
            <span class="color-name">{{ c.name }}</span>
          </button>
        </div>
      </div>
    </section>

    <!-- ═══ 设计 Design ═══ -->
    <section id="design" class="design-section" data-section data-index="2">
      <div class="design-grid">
        <div class="design-text">
          <p class="section-eyebrow">设计</p>
          <h2 class="section-title">薄出想象力</h2>
          <p class="design-desc">
            iPad Pro 是 Apple 有史以来最薄、最轻的专业级产品之一。
            全新 M4 芯片以令人惊叹的能效，将强大性能融入仅 5.1mm 的纤薄机身中。
            一体式铝金属机身搭配全新浮动键盘，让创作和工作都游刃有余。
          </p>
          <div class="design-stats">
            <div class="stat">
              <span class="stat-value">5.1mm</span>
              <span class="stat-label">极致纤薄</span>
            </div>
            <div class="stat">
              <span class="stat-value">579g</span>
              <span class="stat-label">超轻重量</span>
            </div>
            <div class="stat">
              <span class="stat-value">100%</span>
              <span class="stat-label">再生铝金属</span>
            </div>
          </div>
        </div>
        <div class="design-visual">
          <div class="design-device-thin"></div>
        </div>
      </div>
    </section>

    <!-- ═══ M4 芯片 ═══ -->
    <section id="chip" class="chip-section" data-section data-index="3">
      <div class="chip-bg"></div>
      <div class="chip-content">
        <p class="section-eyebrow">芯片</p>
        <h2 class="section-title">M4 — 性能怪兽</h2>
        <p class="chip-desc">
          第二代 3nm 制程 · 10 核 CPU 比 M2 快 50% · 10 核 GPU 支持硬件加速光线追踪
        </p>
        <div class="chip-counters" @click="animateCounters">
          <div v-for="(c, idx) in counters" :key="c.label" class="counter-item">
            <div class="counter-value">
              <span :id="`counter-${idx}`">0</span>
              <span class="counter-suffix">{{ c.suffix }}</span>
            </div>
            <div class="counter-label">{{ c.label }}</div>
            <div class="counter-desc">{{ c.desc }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ 显示屏 Display ═══ -->
    <section id="display" class="display-section" data-section data-index="4">
      <h2 class="section-title">Liquid Retina XDR</h2>
      <p class="display-subtitle">所见，即真实。</p>
      <div class="display-showcase">
        <div class="display-device">
          <div class="display-frame">
            <div class="display-image">
              <div class="display-grad"></div>
            </div>
          </div>
        </div>
        <div class="display-features">
          <div class="df-item">
            <span class="df-icon">🌈</span>
            <div>
              <strong>P3 广色域</strong>
              <p>10 亿色彩，精准呈现每一个像素</p>
            </div>
          </div>
          <div class="df-item">
            <span class="df-icon">⚡</span>
            <div>
              <strong>ProMotion 120Hz</strong>
              <p>自适应刷新率，流畅如丝</p>
            </div>
          </div>
          <div class="df-item">
            <span class="df-icon">☀️</span>
            <div>
              <strong>1600nits 峰值亮度</strong>
              <p>HDR 内容光彩夺目</p>
            </div>
          </div>
          <div class="df-item">
            <span class="df-icon">🔬</span>
            <div>
              <strong>纳米纹理玻璃</strong>
              <p>1TB/2TB 机型可选，低反射更清晰</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ 技术规格 ═══ -->
    <section id="specs" class="specs-section" data-section data-index="5">
      <h2 class="section-title">技术规格</h2>
      <div class="specs-grid">
        <div v-for="s in specs" :key="s.label" class="spec-card">
          <div class="spec-label">{{ s.label }}</div>
          <div class="spec-value">{{ s.value }}</div>
          <div class="spec-detail">{{ s.detail }}</div>
        </div>
      </div>
    </section>

    <!-- ═══ Footer ═══ -->
    <footer class="ipad-footer">
      <div class="footer-inner">
        <div class="footer-top">
          <div class="footer-links">
            <div class="footer-col">
              <h4>选购</h4>
              <a href="#">iPad Pro</a>
              <a href="#">iPad Air</a>
              <a href="#">iPad mini</a>
              <a href="#">配件</a>
            </div>
            <div class="footer-col">
              <h4>服务</h4>
              <a href="#">AppleCare+</a>
              <a href="#">以旧换新</a>
              <a href="#">分期付款</a>
            </div>
            <div class="footer-col">
              <h4>关于</h4>
              <a href="#">新闻</a>
              <a href="#">环境责任</a>
              <a href="#">供应商责任</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>Copyright © {{ new Date().getFullYear() }} Apple Inc. 保留所有权利。</p>
          <p class="footer-note">本页面为个人技术展示项目，非官方 Apple 网站。</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* ═══ 基础重置 ═══ */
.ipad-pro {
  --ipad-bg: #000;
  --ipad-text: #f5f5f7;
  --ipad-text-secondary: #86868b;
  --ipad-accent: #0071e3;
  --ipad-border: #2a2a2a;
  --ipad-card-bg: #1d1d1f;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', sans-serif;
  background: var(--ipad-bg);
  color: var(--ipad-text);
  overflow-x: hidden;
}

/* ═══ Nav ═══ */
.ipad-nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  background: rgba(0,0,0,0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--ipad-border);
}
.nav-inner {
  max-width: 980px; margin: 0 auto;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 22px; height: 44px;
}
.nav-logo { font-size: 1.2rem; text-decoration: none; color: var(--ipad-text); }
.nav-links { display: flex; gap: 28px; }
.nav-links a {
  font-size: 0.75rem; font-weight: 400; color: var(--ipad-text-secondary);
  text-decoration: none; letter-spacing: 0.01em; transition: color 0.2s;
}
.nav-links a:hover { color: var(--ipad-text); }
.nav-buy {
  font-size: 0.75rem; color: var(--ipad-accent); text-decoration: none;
  font-weight: 500;
}

/* ═══ Hero ═══ */
.hero-section {
  min-height: 100vh; display: flex; flex-direction: column;
  align-items: center; justify-content: center; position: relative;
  padding: 80px 24px 40px; overflow: hidden;
}
.hero-bg {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse at 50% 0%, #1a1a2e 0%, #000 70%);
  pointer-events: none;
}
.hero-content { text-align: center; position: relative; z-index: 1; }
.hero-eyebrow {
  font-size: 0.85rem; font-weight: 600; color: var(--ipad-accent);
  letter-spacing: 3px; text-transform: uppercase; margin-bottom: 12px;
}
.hero-title {
  font-size: clamp(3rem, 8vw, 5.5rem); font-weight: 700;
  letter-spacing: -0.03em; margin-bottom: 8px;
}
.hero-subtitle {
  font-size: clamp(1.2rem, 2.5vw, 1.8rem); font-weight: 600;
  color: var(--ipad-text); margin-bottom: 8px;
}
.hero-tagline {
  font-size: 0.95rem; color: var(--ipad-text-secondary); margin-bottom: 28px;
}
.hero-cta { display: flex; gap: 14px; justify-content: center; }
.cta-primary, .cta-secondary {
  padding: 10px 22px; border-radius: 22px; font-size: 0.9rem;
  text-decoration: none; font-weight: 500;
}
.cta-primary {
  background: var(--ipad-accent); color: white;
  transition: background 0.2s;
}
.cta-primary:hover { background: #147ce5; }
.cta-secondary {
  border: 1px solid var(--ipad-accent); color: var(--ipad-accent);
  transition: background 0.2s;
}
.cta-secondary:hover { background: rgba(0,113,227,0.1); }

/* Hero 设备 */
.hero-device { margin-top: 48px; position: relative; z-index: 1; }
.device-frame {
  width: 320px; height: 440px; border-radius: 32px;
  border: 2px solid var(--ipad-border);
  background: var(--ipad-card-bg);
  display: flex; align-items: center; justify-content: center;
  transition: background 0.5s ease;
  box-shadow: 0 20px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05);
  position: relative;
  overflow: hidden;
}
.device-frame::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
}
.device-frame.color-black { background: linear-gradient(135deg, #1d1d1f, #2d2d2f); }
.device-frame.color-silver { background: linear-gradient(135deg, #f5f5f7, #e8e8ed); }
.device-frame.color-gray { background: linear-gradient(135deg, #424245, #545457); }
.device-screen {
  width: 88%; height: 92%; border-radius: 20px;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%);
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
}
.screen-content { width: 90%; }
.screen-lines { display: flex; flex-direction: column; gap: 8px; }
.screen-lines span {
  height: 4px; border-radius: 2px;
  background: linear-gradient(90deg, var(--ipad-accent), transparent);
  opacity: 0.5;
}
.screen-lines span:nth-child(1) { width: 80%; }
.screen-lines span:nth-child(2) { width: 95%; }
.screen-lines span:nth-child(3) { width: 70%; }
.screen-lines span:nth-child(4) { width: 85%; }

.scroll-hint {
  position: absolute; bottom: 32px; display: flex; flex-direction: column;
  align-items: center; gap: 6px; opacity: 0.6;
}
.scroll-text { font-size: 0.7rem; letter-spacing: 2px; color: var(--ipad-text-secondary); }
.scroll-arrow { font-size: 1.2rem; animation: bounceDown 2s infinite; }
@keyframes bounceDown {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(6px); }
}

/* ═══ 颜色选择器 ═══ */
.color-section {
  padding: 100px 24px; text-align: center;
}
.color-showcase {
  display: flex; flex-direction: column; align-items: center; gap: 40px;
}
.color-device {
  width: 260px; height: 360px; border-radius: 28px;
  border: 2px solid var(--ipad-border);
  display: flex; align-items: center; justify-content: center;
  transition: background 0.5s ease;
  box-shadow: 0 10px 40px rgba(0,0,0,0.5);
}
.color-device.color-black { background: linear-gradient(135deg, #1d1d1f, #2d2d2f); }
.color-device.color-silver { background: linear-gradient(135deg, #f5f5f7, #e8e8ed); }
.color-device.color-gray { background: linear-gradient(135deg, #424245, #545457); }
.color-screen {
  width: 86%; height: 90%; border-radius: 16px;
  background: linear-gradient(135deg, #0a0a0a, #1a1a2e);
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
}
.color-ui { width: 85%; }
.color-status-bar {
  height: 6px; width: 40%; background: rgba(255,255,255,0.15);
  border-radius: 3px; margin-bottom: 16px;
}
.color-icon-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;
}
.color-icon-grid span {
  aspect-ratio: 1; border-radius: 6px;
  background: rgba(255,255,255,0.08);
}
.color-picker { display: flex; gap: 20px; }
.color-btn {
  display: flex; align-items: center; gap: 8px; padding: 8px 16px;
  background: transparent; border: 1px solid var(--ipad-border);
  border-radius: 20px; cursor: pointer; color: var(--ipad-text);
  transition: all 0.25s;
}
.color-btn:hover { border-color: var(--ipad-text-secondary); }
.color-btn.active { border-color: var(--ipad-accent); background: rgba(0,113,227,0.1); }
.color-dot {
  width: 16px; height: 16px; border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.1);
}
.color-name { font-size: 0.85rem; }

/* ═══ 设计 ═══ */
.design-section {
  padding: 100px 24px;
}
.design-grid {
  max-width: 980px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr 1fr; gap: 60px;
  align-items: center;
}
.section-eyebrow {
  font-size: 0.85rem; font-weight: 600; color: var(--ipad-accent);
  letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px;
}
.section-title {
  font-size: clamp(1.8rem, 4vw, 2.8rem); font-weight: 700;
  letter-spacing: -0.02em; margin-bottom: 20px;
}
.design-desc { font-size: 0.95rem; color: var(--ipad-text-secondary); line-height: 1.8; margin-bottom: 32px; }
.design-stats { display: flex; gap: 32px; }
.stat { display: flex; flex-direction: column; }
.stat-value { font-size: 1.6rem; font-weight: 700; color: var(--ipad-text); }
.stat-label { font-size: 0.8rem; color: var(--ipad-text-secondary); }
.design-visual { display: flex; justify-content: center; }
.design-device-thin {
  width: 220px; height: 320px;
  background: linear-gradient(135deg, #2d2d2f, #1d1d1f);
  border-radius: 24px; border: 1px solid var(--ipad-border);
  position: relative; box-shadow: 0 0 60px rgba(0,113,227,0.15);
}
.design-device-thin::after {
  content: '5.1mm'; position: absolute; bottom: -32px; left: 50%;
  transform: translateX(-50%);
  font-size: 0.85rem; color: var(--ipad-text-secondary);
  white-space: nowrap;
}

/* ═══ 芯片 ═══ */
.chip-section {
  padding: 100px 24px; position: relative; text-align: center;
  overflow: hidden;
}
.chip-bg {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse at 50% 50%, rgba(0,113,227,0.08) 0%, transparent 70%);
  pointer-events: none;
}
.chip-content { max-width: 980px; margin: 0 auto; position: relative; z-index: 1; }
.chip-desc { font-size: 0.95rem; color: var(--ipad-text-secondary); margin-bottom: 48px; }
.chip-counters {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;
  cursor: pointer;
}
.counter-item { padding: 24px; background: rgba(255,255,255,0.03); border-radius: 16px; border: 1px solid var(--ipad-border); }
.counter-value { font-size: 2rem; font-weight: 700; margin-bottom: 8px; }
.counter-suffix { font-size: 1rem; color: var(--ipad-accent); }
.counter-label { font-size: 0.9rem; font-weight: 600; margin-bottom: 4px; }
.counter-desc { font-size: 0.8rem; color: var(--ipad-text-secondary); }

/* ═══ 显示屏 ═══ */
.display-section {
  padding: 100px 24px; text-align: center;
}
.display-subtitle { font-size: 1rem; color: var(--ipad-text-secondary); margin-bottom: 48px; margin-top: -12px; }
.display-showcase {
  max-width: 980px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center;
}
.display-device { display: flex; justify-content: center; }
.display-frame {
  width: 280px; height: 380px; border-radius: 28px;
  border: 2px solid var(--ipad-border);
  background: linear-gradient(135deg, #1d1d1f, #2d2d2f);
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
}
.display-image {
  width: 88%; height: 92%; border-radius: 16px;
  background: linear-gradient(135deg, #0a0a1a, #001133, #0a0a1a);
  position: relative; overflow: hidden;
}
.display-grad {
  position: absolute; inset: 0;
  background: conic-gradient(from 0deg, #0071e3, #5856d6, #ff2d55, #0071e3);
  opacity: 0.15; animation: rotateGrad 10s linear infinite;
}
@keyframes rotateGrad {
  to { transform: rotate(360deg); }
}
.display-features { text-align: left; display: flex; flex-direction: column; gap: 20px; }
.df-item {
  display: flex; gap: 12px; align-items: flex-start;
  padding: 12px; border-radius: 12px; background: rgba(255,255,255,0.03);
}
.df-icon { font-size: 1.4rem; flex-shrink: 0; }
.df-item strong { display: block; margin-bottom: 2px; font-size: 0.95rem; }
.df-item p { font-size: 0.85rem; color: var(--ipad-text-secondary); }

/* ═══ 技术规格 ═══ */
.specs-section {
  padding: 100px 24px;
}
.specs-grid {
  max-width: 980px; margin: 0 auto;
  display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}
.spec-card {
  padding: 20px; background: var(--ipad-card-bg);
  border: 1px solid var(--ipad-border); border-radius: 14px;
  transition: all 0.3s;
}
.spec-card:hover { border-color: var(--ipad-accent); transform: translateY(-2px); }
.spec-label { font-size: 0.75rem; color: var(--ipad-accent); font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
.spec-value { font-size: 0.95rem; font-weight: 600; margin-bottom: 6px; }
.spec-detail { font-size: 0.8rem; color: var(--ipad-text-secondary); }

/* ═══ Footer ═══ */
.ipad-footer {
  border-top: 1px solid var(--ipad-border); padding: 40px 24px 20px;
}
.footer-inner { max-width: 980px; margin: 0 auto; }
.footer-links {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px;
  margin-bottom: 32px;
}
.footer-col h4 { font-size: 0.75rem; font-weight: 600; color: var(--ipad-text); margin-bottom: 12px; }
.footer-col a {
  display: block; font-size: 0.75rem; color: var(--ipad-text-secondary);
  text-decoration: none; margin-bottom: 8px;
}
.footer-col a:hover { color: var(--ipad-text); }
.footer-bottom { padding-top: 16px; border-top: 1px solid var(--ipad-border); }
.footer-bottom p { font-size: 0.7rem; color: var(--ipad-text-secondary); }
.footer-note { margin-top: 4px; font-style: italic; }

/* ═══ Section 过渡 ═══ */
[data-section] { transition: opacity 0.6s ease; }

/* ═══ 响应式 ═══ */
@media (max-width: 768px) {
  .nav-links { display: none; }
  .design-grid { grid-template-columns: 1fr; text-align: center; }
  .design-stats { justify-content: center; }
  .chip-counters { grid-template-columns: repeat(2, 1fr); }
  .display-showcase { grid-template-columns: 1fr; }
  .display-features { text-align: center; }
  .df-item { flex-direction: column; align-items: center; text-align: center; }
  .footer-links { grid-template-columns: 1fr; }
  .hero-device { margin-top: 32px; }
  .device-frame { width: 240px; height: 340px; }
}

@media (max-width: 480px) {
  .chip-counters { grid-template-columns: 1fr; }
  .device-frame { width: 200px; height: 280px; border-radius: 24px; }
  .hero-section { min-height: 90vh; }
  .color-device { width: 200px; height: 280px; }
  .specs-grid { grid-template-columns: 1fr; }
}
</style>
