<script setup>
import { gamesStore } from '@/store/GamesStore'
import PlayResults from '../components/PlayResults.vue'
import GameBoard from '../components/GameBoard.vue'
import Fireball from '../assets/fireball.png'

const emit = defineEmits(['music', 'musicplaypause', 'protip'])

const store = gamesStore()

let click = new Audio('../audio/sprite/button_click.mp3');

 

const numberSelection = (num, slot) => {
  if (store.presentrules == 1) {
    store.setSame(num)
  } else if (store.presentrules == 2) {
    if (slot == 0 || slot == 1) {
      store.selectNum(num, 0)
      store.selectNum(num, 1)
    } else {
      store.selectNum(num, 2);
    }
  }
    else {
    store.selectNum(num, slot)
  }
}

const quickPick = () => {
  // generate an array of 3 integers between 0 and 9 but they must be unique.
  click.currentTime = 0;
  click.play();
  if (store.presentrules == 0) {
    store.randomNums();
  } else if (store.presentrules == 1) {
    let num = Math.floor(Math.random() * 10)
    store.setSame(num)
  } else if (store.presentrules == 2) {
    store.randomTwoNums();
  }
}

const queryFireball = () => {
  store.showFireball()
}

const playFireball = () => {
  store.hideFireball()
  store.useFireball()
  store.genFireball()
  store.showResults()
}

const optOut = () => {
  store.hideFireball()
  store.noFireball()
  store.genFireball()
  store.showResults()
}


const nextGame = () => {
  store.hideResults()
  store.resetPicksandFireball()
  store.setPresentRules(null)
}

const chooseRules = (num) => {
  click.currentTime = 0;
  click.play();
  store.setPresentRules(num)
}


</script>

<template>
  <div class="btn-row">
    <a class="small-btn" href @click.prevent="emit('protip')">Pro Tip</a>
    <a class="small-btn" href="https://www.yahoo.com" target="_blank">
      Prizes & Odds
    </a>
  </div>
  <div v-if="(store.presentrules === null)" class="rules-select__container">
    <div class="rules-select__list">
      <a href @click.prevent="chooseRules(0)">Pick Different Numbers</a>
      <a v-if="(store.presentgame == 'exact')" href @click.prevent="chooseRules(1)">Pick all the Same number</a>
      <a v-else href @click.prevent="chooseRules(2)">Pick 2 the same and one different</a>
    </div>
  </div>
  <div v-else-if="(store.showfireball)" class="fireball-pick">
  {{ store.showfireball}}
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
  <div class="game" v-else>
    <GameBoard
      @select-num="numberSelection"
    ></GameBoard>

    <div class="quick-pick">
      <a href @click.prevent="quickPick">Quick Pick</a>
    </div>

  

    <div  class="bottom play">
      <div class="play-note info-point">
      <p>{{ store.gamerules[store.presentrules].gamenote }}</p>
    </div>
      <a v-show="!store.picks.includes(null)" href class="accent-button" @click.prevent="queryFireball()">Play!</a>
    </div>

    <h2>
      {{ store.gamerules[store.presentrules].instructions1 }}
      <span>{{ store.gamerules[store.presentrules].instructions2 }}</span>
    </h2>

    <PlayResults
      v-if="(store.showresults)"
      @next-game="nextGame"
    ></PlayResults>
  </div>
</template>

<style scoped>

.game {
  height: calc(100% - 90px);
  display: flex;
  flex-flow: column nowrap;
  margin: 40px 10px;
}


.quick-pick {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 10px 8px 0;
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
  width: 30px;
  height: 40px;
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
  margin-top: 10px;
}

.bottom {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  flex-grow: 1;
}

.play-note, .play-note p {
  margin-bottom: 0;
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
