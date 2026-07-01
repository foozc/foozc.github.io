<script setup>
import { ref, computed } from 'vue'

const WIN_STATE = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 0]
]

const board = ref([])
const moves = ref(0)
const won = ref(false)

const initGame = () => {
  const flat = Array.from({ length: 15 }, (_, i) => i + 1)
  flat.push(0)
  for (let i = flat.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [flat[i], flat[j]] = [flat[j], flat[i]]
  }
  board.value = []
  for (let r = 0; r < 4; r++) {
    board.value.push(flat.slice(r * 4, r * 4 + 4))
  }
  moves.value = 0
  won.value = false
}

const emptyPos = computed(() => {
  for (let r = 0; r < 4; r++)
    for (let c = 0; c < 4; c++)
      if (board.value[r][c] === 0) return { r, c }
  return { r: 3, c: 3 }
})

const canMove = (r, c) => {
  const e = emptyPos.value
  return (Math.abs(r - e.r) + Math.abs(c - e.c)) === 1
}

const move = (r, c) => {
  if (!canMove(r, c) || won.value) return
  const e = emptyPos.value
  board.value[e.r][e.c] = board.value[r][c]
  board.value[r][c] = 0
  moves.value++
  won.value = JSON.stringify(board.value) === JSON.stringify(WIN_STATE)
}

initGame()
</script>

<template>
  <div class="game-container">
    <h3 class="game-title">🧩 数字华容道</h3>
    <p class="game-desc">点击数字方块移动，将数字按 1-15 顺序排列</p>
    <div class="board">
      <div v-for="(row, r) in board" :key="r" class="row">
        <button v-for="(cell, c) in row" :key="c"
                :class="['cell', { empty: cell === 0, movable: canMove(r, c) }]"
                @click="move(r, c)">
          {{ cell !== 0 ? cell : '' }}
        </button>
      </div>
    </div>
    <div class="game-info">
      <span>步数：{{ moves }}</span>
      <button class="reset-btn" @click="initGame">重新开始</button>
    </div>
    <div v-if="won" class="win-message">🎉 恭喜通关！</div>
  </div>
</template>

<style scoped>
.game-container { max-width: 400px; margin: 0 auto; text-align: center; padding: 20px; background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius); }
.game-title { font-size: 1.3rem; margin-bottom: 8px; }
.game-desc { color: var(--text-muted); font-size: 0.85rem; margin-bottom: 16px; }
.board { display: inline-block; background: var(--bg-secondary); padding: 8px; border-radius: var(--radius-sm); }
.row { display: flex; }
.cell { width: 70px; height: 70px; margin: 3px; border: none; border-radius: 8px; font-size: 1.3rem; font-weight: 700; cursor: pointer; background: var(--accent); color: white; transition: var(--transition); }
.cell.empty { background: transparent; cursor: default; }
.cell.movable:hover { background: var(--accent-hover); transform: scale(1.05); }
.game-info { display: flex; justify-content: center; align-items: center; gap: 16px; margin-top: 16px; color: var(--text-secondary); }
.reset-btn { padding: 8px 20px; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--bg-card); color: var(--text-primary); cursor: pointer; transition: var(--transition); }
.reset-btn:hover { border-color: var(--accent); color: var(--accent); }
.win-message { margin-top: 16px; font-size: 1.5rem; font-weight: 700; color: #e74c3c; }
</style>