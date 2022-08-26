<script setup>
import { computed, onMounted, reactive } from 'vue'
import { gamesStore } from '@/store/GamesStore'
import gsap from 'gsap'
import Fireball from '../assets/fireball.png'
import WinnerFlourish from './WinnerFlourish.vue'
import RewardScreen from './RewardScreen.vue'
import FinalScreen from './FinalScreen.vue'

const store = gamesStore()

const state = reactive({
    showWinner: false,
    showReward: false,
    showFinal: false,
    winners: [],
})

onMounted(() => {
    calcWinners()

    let tl = gsap.timeline({
        delay: 2,
        repeat: 0,
    });
    tl.to('#fireball', {duration: .5, scale: 1.1, yoyo: true, repeat: -1, ease: 'power1.inOut'});
    tl.call(flashWinner);
    tl.to('#fireball', { delay: 2.5});
    tl.call(flashReward);
    tl.to('#fireball', { delay: 2.5});
    tl.call(showFinal);
})

const flashWinner = () => {
        state.showWinner = true;
    setTimeout(() => {
        state.showWinner = false;
    }, 2000);
}

const flashReward = () => {
        state.showReward = true;
    setTimeout(() => {
        state.showReward = false;
    }, 2000);
}

const showFinal = () => {
    state.showFinal = true;
}


const calcWinners = () => {
  if (store.presentgame == 'exact') {
    state.winners = [store.picks[0], store.picks[1], store.fireball]
  }
  else {
    state.winners = [store.picks[1], store.picks[0], store.fireball]
  }
}

const resultFireball = computed(() => {
  return store.picks[2]
})
</script>

<template>
  <div class="wrapper">
    <div class="winning-numbers__row">
      <div class="title">
        <h3>
          Pick 3:
          <span>Winning Numbers</span>
        </h3>
      </div>
      <div class="winning-numbers">
        <div v-for="num in state.winners" class="number">
          {{ num }}
        </div>
      </div>
    </div>
    <div class="fireball__row">
      <div class="title">
        <img width="183" height="21" alt="Fireball" :src="Fireball" />
      </div>
      <div id="fireball" class="number fireball">
        {{ resultFireball }}
      </div>
    </div>
    <div class="picks__row">
      <div class="title">
        <h3><span>Your Numbers</span></h3>
      </div>
      <div class="picks">
        <div v-for="num in store.picks" class="number yours">
          {{ num }}
        </div>
      </div>
    </div>
  </div>
    <WinnerFlourish v-if="state.showWinner" />
    <RewardScreen v-if="state.showReward" />
    <FinalScreen v-if="state.showFinal" />

</template>

<style scoped>
.wrapper {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
}

h3 span {
  color: var(--color-gold);
}

.winning-numbers,
.picks {
  display: flex;
  justify-content: center;
  gap: 40px;
  align-items: center;
  margin-top: 20px;
}

.fireball__row {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  margin-top: 20px;
}
.number {
  background: radial-gradient(
    56% 56% at 53.18% 22.76%,
    #ffffff 0%,
    #ececec 59%,
    #d9d9d9 72%,
    #bebebe 87%,
    #cdcdcd 100%
  );
  color: var(--vt-c-black);
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 34px;
  font-weight: 700;
}

.fireball {
  background: radial-gradient(
    56% 56% at 53.18% 22.76%,
    #cd2b2b 0%,
    #d25a5a 59%,
    #b73535 72%,
    #cd2b2b 87%,
    #bf2626 100%
  );
  color: var(--vt-c-white);
  margin-top: 20px;
}

.yours {
  background: none;
  border: 2px solid #ffd206;
  filter: drop-shadow(0px 0px 9px #cbac20);
  color: var(--vt-c-white);
}
</style>
