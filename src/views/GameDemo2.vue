<script setup>
import { reactive } from 'vue'
import { gamesStore } from '@/store/GamesStore'
import BgStars from '../components/BgStars.vue'
import PlayResults from '../components/PlayResults.vue'
import GameBoard from '../components/GameBoard.vue'
import EighteenModal from '../components/EighteenModal.vue'

const emit = defineEmits(['music'])

const store = gamesStore()

const state = reactive({
  showResults: false,
  instructions: 'pick four numbers!',
  picks: [null, null, null, null],
  fireball: null,
  selectNum: (num, slot) => {
    state.picks[slot] = num
  },
  closeModal: () => {
    store.confirmEighteen()
    emit('music', 'audio/FunkyInFunky.mp3')
  },
})

const playNumbers = () => {
  genFireball()
  store.increment()
  state.showResults = true
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
  <main>
    <EighteenModal
      v-show="(!store.iseighteen)"
      @confirm-yes="state.closeModal"
    ></EighteenModal>

    <h2>{{ state.instructions }}</h2>

    <GameBoard :picks="state.picks" @select-num="state.selectNum"></GameBoard>

    <div v-show="!state.picks.includes(null)" class="bottom">
      <button @click.prevent="playNumbers()">Play!</button>
    </div>

    <PlayResults
      v-show="(state.showResults)"
      :picks="state.picks"
      :fireball="state.fireball"
    ></PlayResults>
    <BgStars green="true" />
  </main>
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
