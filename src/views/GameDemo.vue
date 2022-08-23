<script setup>
import { onMounted, reactive } from 'vue'
import { gamesStore } from '@/store/GamesStore'
import BgStars from '../components/BgStars.vue'
import EighteenModal from '../components/EighteenModal.vue'
import GameExact from '../components/GameExact.vue'
import ProTip from '../components/ProTipModal.vue'

const emit = defineEmits(['music', 'musicplaypause'])

const store = gamesStore()

const state = reactive({
  showProTip: false,
})


const closeModal = () => {
  store.confirmEighteen()
}

const closeProTip = () => {
  state.showProTip = false
}

const chooseGame = (game) => {
  store.setPresentGame(game)
}

onMounted(() => {
  emit('music', 'audio/FunkyInFunky.mp3')
});
</script>

<template>
  <main>
    <EighteenModal
      v-if="(!store.iseighteen)"
      @confirm-yes="closeModal"
    ></EighteenModal>
      <div v-if="(store.presentGame === 'exact')" class="game-exact">
      <GameExact></GameExact>
      </div>
    <div v-else-if="(store.presentGame === 'fifty')" class="game-fifty">
      <h2>50/50</h2>
    </div> 

      <div v-else-if="(store.presentGame === 'any')" class="game-any">
      <h2>Any</h2>
      </div>
      <div v-else class="game-select">

        <div class="btn-row">
          <a class="small-btn" href @click.prevent="state.showProTip = true">Pro Tip</a>
          <a class="small-btn" href="https://www.yahoo.com" target="_blank">Prizes & Odds</a>
          
        </div>
              <div class="game-select__container">
      <div class="game-select__list">
        <a href @click.prevent="chooseGame('exact')">Exact</a>
        <a href @click.prevent="chooseGame('any')">Any</a>
        <a href @click.prevent="chooseGame('fifty')">50/50</a>
      </div>
      <div class="info-point">
        <p>
          There are LOTS of way to play Pick 3. Try a popular option above, then
          explore the rest at NCLottery.com.
        </p>
      </div>
      <h2>
        Select
        <span>Play Type:</span>
      </h2>
      </div>
    </div>
    <ProTip v-show="(state.showProTip)"  @close="closeProTip"/>
    <BgStars green="true" />
  </main>
</template>

<style>

.game-select {
  height: 100%;
}

.game-select .btn-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 8px 0;
}

.game-select__container {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.game-select__list {
  display: flex;
  flex-flow: column nowrap;
}

.game-select__list a {
  display: flex;
  flex-flow: row nowrap;
  font-size: 24px;
  font-weight: bold;
  line-height: 1.2;
  color: var(--vt-c-white);
  margin-bottom: 30px;
}

.game-select__list a::before {
  content: '';
  display: block;
  width: 39px;
  height: 39px;
  background-color: var(--vt-c-white);
  border-radius: 3.94px;
  border: 1px solid var(--color-fireball-red);
  margin-right: 12px;
}

h2 {
  text-shadow: -1px 1px 4px rgba(0, 61, 31, 0.75);
  color: var(--vt-c-white);
  font-size: 32px;
  line-height: 1.2;
  font-weight: 700;
}

h2 span {
  text-shadow: -1px 1px 4px rgba(0, 61, 31, 0.75);
  color: var(--color-gold);
  font-weight: 700;
}

.info-point {
  display: flex;
  margin-top: 30px;
  width: 240px;
}

.info-point p {
  font-family: 'Avenir Next', sans-serif;
  font-size: 12px;
  line-height: 1.5;
  color: var(--vt-c-white);
  margin-bottom: 30px;
}

.info-point::before {
  content: '';
  display: block;
  width: 30px;
  margin-right: 10px;
  background-image: url(../assets/infoicon.svg);
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
