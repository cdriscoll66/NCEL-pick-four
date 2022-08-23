<script setup>

import { reactive } from 'vue'
import { gamesStore } from '@/store/GamesStore'
import PlayResults from '../components/PlayResults.vue'
import GameBoard from '../components/GameBoard.vue'

const emit = defineEmits(['music', 'musicplaypause'])


const store = gamesStore()

const state = reactive({
  showResults: false,
  instructions: 'pick four numbers!',
  gamerulesdupes: false,
  picks: [null, null, null, null],
  fireball: null,
  selectNum: (num, slot) => {
    state.picks[slot] = num
  }
})

const numberSelection = (num, slot) => {
  if (store.count == 1) {
    state.picks = [num, num, num, num]
  } else {
    state.selectNum(num, slot)
  }
}

const playNumbers = () => {
  genFireball()
  store.increment()
  state.showResults = true
}

const nextGame = () => {
  state.showResults = false
  state.picks = [null, null, null, null]
  if (store.count == 1) {
    setupGameTwo()
  }
}

const setupGameTwo = () => {
  state.instructions = 'This Time: Pick the SAME number'
  state.gamerulesdupes = true
}

const genFireball = () => {
  let num = Math.floor(Math.random() * 10) + 1
  if (state.picks.includes(num)) {
    genFireball()
  } else {
    state.fireball = num
  }
}
</script>

<template>
  <h2>{{ state.instructions }}</h2>

  <GameBoard
    :dupes="state.gamerulesdupes"
    :picks="state.picks"
    @select-num="numberSelection"
  ></GameBoard>

  <div v-show="!state.picks.includes(null)" class="bottom">
    <button @click.prevent="playNumbers()">Play!</button>
  </div>

  <PlayResults
    v-if="(state.showResults)"
    :picks="state.picks"
    :fireball="state.fireball"
    @next-game="nextGame"
  ></PlayResults>
</template>

<style scoped>
h2 {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--vt-c-white);
  text-align: center;
  margin-top: 40px;
}

.bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 10px;
}
</style>
