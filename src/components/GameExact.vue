<script setup>
import { reactive } from 'vue'
import { gamesStore } from '@/store/GamesStore'
import PlayResults from '../components/PlayResults.vue'
import GameBoard from '../components/GameBoard.vue'
import Fireball from '../assets/fireball.png'

const emit = defineEmits(['music', 'musicplaypause', 'protip'])

const store = gamesStore()

const state = reactive({
  presentRules: null,
  gameRules: [
    {
      id: 0,
      gamerulesdupes: false,
      instructions1: 'Select Your Numbers,',
      instructions2: 'one per row.',
      gamenote:
        'Explainer text about not being able to select the same number more than once...',
    },
    {
      id: 1,
      gamerulesdupes: true,
      instructions1: 'Select Your Numbers,',
      instructions2: 'All three numbers should be the same.',
      gamenote:
        'Explainer text about having to select the exact same number across the board...',
    },
  ],
  showResults: false,
  showFireball: false,
  picks: [null, null, null],
  fireball: null,
  selectNum: (num, slot) => {
    state.picks[slot] = num
  },
})

const numberSelection = (num, slot) => {
  if (state.presentRules == 1) {
    state.picks = [num, num, num]
  } else {
    state.selectNum(num, slot)
  }
}

const quickPick = () => {
  // generate an array of 3 integers between 0 and 9 but they must be unique.
  if (state.presentRules == 0) {
    const random = () => {
      return Math.floor(Math.random() * 10)
    }
    const randomArray = () => {
      const arr = []
      for (let i = 0; i < 3; i++) {
        let num = random()
        while (arr.includes(num)) {
          num = random()
        }
        arr.push(num)
      }
      return arr
    }
    const arr = randomArray()
    state.picks = arr
  } else if (state.presentRules == 1) {
    let num = Math.floor(Math.random() * 10)
    state.picks = [num, num, num]
  }
}

const playNumbers = () => {
  state.showFireball = true
  // genFireball()
  // state.showResults = true
}

const playFireball = () => {
  state.showFireball = false
  genFireball()
  state.showResults = true
}

const optOut = () => {
  state.showFireball = false
  state.fireball = 99
  state.showResults = true
}


const nextGame = () => {
  state.showResults = false
  state.picks = [null, null, null]
  state.presentRules = null
}

const chooseRules = (num) => {
  state.presentRules = num
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
  <div class="btn-row">
    <a class="small-btn" href @click.prevent="emit('protip')">Pro Tip</a>
    <a class="small-btn" href="https://www.yahoo.com" target="_blank">
      Prizes & Odds
    </a>
  </div>
  <div v-if="state.presentRules === null" class="rules-select__container">
    <div class="rules-select__list">
      <a href @click.prevent="chooseRules(0)">Pick Different Numbers</a>
      <a href @click.prevent="chooseRules(1)">Pick all the Same number</a>
    </div>
  </div>
  <div v-else-if="state.showFireball" class="fireball-pick">
    <div class="fireball-pick__container">
      <div class="fireball__select">
        <a href @click.prevent="playFireball()">
          <img width="183" height="21" alt="Fireball" :src="Fireball" />
        </a>
      </div>
      <div class="play-note info-point">
      <p>With the Fireball, you can replace any number drawn by the lottery. This gives you more combinations and more chances to win!</p>
    </div>
    <h2>Add<span> Fireball?</span></h2>
    <div class="fireball-pick__optout">
      <a class="accent-button btn-gray" href @click.prevent="optOut">Not this time</a>
    </div>
    </div>
  </div>
  <div v-else>
    <GameBoard
      :dupes="state.gameRules[state.presentRules].gamerulesdupes"
      :picks="state.picks"
      @select-num="numberSelection"
    ></GameBoard>

    <div class="quick-pick">
      <a href @click.prevent="quickPick">Quick Pick</a>
    </div>

    <div class="play-note info-point">
      <p>{{ state.gameRules[state.presentRules].gamenote }}</p>
    </div>

    <div v-show="!state.picks.includes(null)" class="bottom play">
      <button @click.prevent="playNumbers()">Play!</button>
    </div>

    <h2>
      {{ state.gameRules[state.presentRules].instructions1 }}
      <span>{{ state.gameRules[state.presentRules].instructions2 }}</span>
    </h2>

    <PlayResults
      v-if="(state.showResults)"
      :picks="state.picks"
      :fireball="state.fireball"
      @next-game="nextGame"
    ></PlayResults>
  </div>
</template>

<style scoped>
.quick-pick {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 30px 8px 0;
}

.quick-pick a, .fireball__select a {
  margin-right: 24px;
  font-weight: bold;
  font-size: 20px;
  text-shadow: -1px 1px 4px rgba(0, 61, 31, 0.75);
  color: var(--vt-c-white);
  display: flex;
  align-items: center;
}

.quick-pick a::before, .fireball__select a::before {
  content: '';
  display: block;
  width: 26px;
  height: 36px;
  background-color: var(--vt-c-white);
  border-radius: 3.94px;
  border: 1px solid var(--color-fireball-red);
  margin-right: 12px;
}

h2 {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--vt-c-white);
  text-align: center;
  margin-top: 40px;
}

.bottom {
  display: flex;
  justify-content: center;
  align-items: center;
}

.play {
  margin-top: -52px;
}

.fireball-pick {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.fireball-pick__container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  color: var(--vt-c-white);
  position: absolute;
}
</style>
