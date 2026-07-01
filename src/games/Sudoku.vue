<script setup>
import { ref, reactive } from 'vue'

const board = ref([])
const initial = ref([])
const selected = reactive({ r: -1, c: -1 })
const won = ref(false)

const createSudoku = () => {
  const puzzle = [
    [5,3,0,0,7,0,0,0,0],
    [6,0,0,1,9,5,0,0,0],
    [0,9,8,0,0,0,0,6,0],
    [8,0,0,0,6,0,0,0,3],
    [4,0,0,8,0,3,0,0,1],
    [7,0,0,0,2,0,0,0,6],
    [0,6,0,0,0,0,2,8,0],
    [0,0,0,4,1,9,0,0,5],
    [0,0,0,0,8,0,0,7,9]
  ]
  board.value = puzzle.map(r => [...r])
  initial.value = puzzle.map(r => r.map(c => c !== 0))
}

const isSameRow = (r) => r === selected.r
const isSameCol = (c) => c === selected.c
const isSameBox = (r, c) => {
  const br = Math.floor(r / 3), bc = Math.floor(c / 3)
  const sr = Math.floor(selected.r / 3), sc = Math.floor(selected.c / 3)
  return br === sr && bc === sc
}

const setNumber = (n) => {
  if (selected.r < 0 || selected.c < 0) return
  if (initial.value[selected.r][selected.c]) return
  board.value[selected.r][selected.c] = n
  checkWin()
}

const checkWin = () => {
  for (let r = 0; r < 9; r++)
    for (let c = 0; c < 9; c++)
      if (board.value[r][c] === 0) return
  won.value = true
}

createSudoku()
</script>

<template>
  <div class="game-container">
    <h3 class="game-title">🔢 数独</h3>
    <p class="game-desc">点击空格选择，然后点击下方数字填入</p>
    <div class="board-wrapper">
      <div class="sudoku-board">
        <div v-for="(row, r) in board" :key="r" class="sudoku-row">
          <button v-for="(cell, c) in row" :key="c"
                  :class="['sudoku-cell', {
                    fixed: initial[r][c],
                    selected: selected.r === r && selected.c === c,
                    highlight: selected.r >= 0 && (isSameRow(r) || isSameCol(c) || isSameBox(r, c)),
                    same: selected.r >= 0 && board[selected.r]?.[selected.c] && board[selected.r][selected.c] === cell && cell !== 0,
                    borderRight: c === 2 || c === 5,
                    borderBottom: r === 2 || r === 5,
                  }]"
                  @click="selected.r = r; selected.c = c">
            {{ cell !== 0 ? cell : '' }}
          </button>
        </div>
      </div>
    </div>
    <div class="numpad">
      <button v-for="n in 9" :key="n" class="num-btn" @click="setNumber(n)">{{ n }}</button>
      <button class="num-btn erase" @click="setNumber(0)">✕</button>
    </div>
    <button class="reset-btn" @click="createSudoku(); won.value = false">新游戏</button>
    <div v-if="won" class="win-message">🎉 恭喜完成数独！</div>
  </div>
</template>

<style scoped>
.game-container { max-width: 420px; margin: 0 auto; text-align: center; padding: 20px; background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius); }
.game-title { font-size: 1.3rem; margin-bottom: 8px; }
.game-desc { color: var(--text-muted); font-size: 0.85rem; margin-bottom: 16px; }
.board-wrapper { display: flex; justify-content: center; }
.sudoku-board { display: inline-block; border: 2px solid var(--text-primary); }
.sudoku-row { display: flex; }
.sudoku-cell { width: 40px; height: 40px; border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: 1.1rem; cursor: pointer; background: var(--bg-card); color: var(--text-primary); transition: background 0.1s; }
.sudoku-cell.fixed { font-weight: 700; color: var(--text-primary); }
.sudoku-cell.selected { background: var(--accent) !important; color: white; }
.sudoku-cell.highlight { background: var(--accent-light); }
.sudoku-cell.same { background: rgba(108, 99, 255, 0.25); }
.sudoku-cell.borderRight { border-right: 2px solid var(--text-primary); }
.sudoku-cell.borderBottom { border-bottom: 2px solid var(--text-primary); }
.numpad { display: flex; justify-content: center; gap: 6px; flex-wrap: wrap; margin: 16px 0; }
.num-btn { width: 38px; height: 38px; border: 1px solid var(--border); border-radius: 6px; background: var(--bg-card); color: var(--text-primary); font-size: 1rem; cursor: pointer; transition: var(--transition); }
.num-btn:hover { border-color: var(--accent); color: var(--accent); }
.num-btn.erase { color: #e74c3c; }
.reset-btn { padding: 8px 20px; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--bg-card); color: var(--text-primary); cursor: pointer; transition: var(--transition); }
.reset-btn:hover { border-color: var(--accent); color: var(--accent); }
.win-message { margin-top: 12px; font-size: 1.3rem; font-weight: 700; color: #e74c3c; }
</style>