<script setup>
import { ref } from 'vue'
import HuarongDao from '../games/HuarongDao.vue'
import Sudoku from '../games/Sudoku.vue'

const currentGame = ref(null)

const games = [
  { id: 'huarongdao', name: '🧩 数字华容道', desc: '经典的滑块拼图游戏，按顺序排列数字 1-15', component: 'HuarongDao' },
  { id: 'sudoku', name: '🔢 数独', desc: '经典数独游戏，锻炼逻辑思维', component: 'Sudoku' },
]
</script>

<template>
  <div class="container">
    <section class="hero">
      <h1 class="hero-title">🎮 小游戏</h1>
      <p class="hero-subtitle">用 HTML + JavaScript 实现的小游戏，休闲娱乐之余学习编程逻辑</p>
    </section>

    <div v-if="!currentGame" class="games-grid">
      <div v-for="game in games" :key="game.id" class="game-card" @click="currentGame = game.id">
        <h2 class="game-card-title">{{ game.name }}</h2>
        <p class="game-card-desc">{{ game.desc }}</p>
        <span class="play-btn">开始游戏 →</span>
      </div>
    </div>

    <div v-else class="game-wrapper">
      <button class="back-btn" @click="currentGame = null">← 返回游戏列表</button>
      <HuarongDao v-if="currentGame === 'huarongdao'" />
      <Sudoku v-if="currentGame === 'sudoku'" />
    </div>
  </div>
</template>

<style scoped>
.hero { text-align: center; padding: 20px 0 48px; }
.hero-title { font-size: 2.5rem; font-weight: 800; background: linear-gradient(135deg, #10b981, #3b82f6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 12px; }
.hero-subtitle { color: var(--text-secondary); font-size: 1.1rem; }
.games-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px; margin-bottom: 60px; }
.game-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius); padding: 32px; cursor: pointer; transition: var(--transition); box-shadow: var(--shadow); text-align: center; }
.game-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-hover); border-color: #10b981; }
.game-card-title { font-size: 1.5rem; margin-bottom: 12px; }
.game-card-desc { color: var(--text-secondary); margin-bottom: 20px; }
.play-btn { color: var(--accent); font-weight: 500; }
.game-wrapper { margin-bottom: 60px; }
.back-btn { background: none; border: 1px solid var(--border); padding: 8px 16px; border-radius: var(--radius-sm); cursor: pointer; color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 24px; transition: var(--transition); background: var(--bg-card); }
.back-btn:hover { border-color: var(--accent); color: var(--accent); }
</style>