<script setup>
import { computed, onMounted, reactive } from 'vue'
import { gamesStore } from '@/store/GamesStore'
import gsap from 'gsap'
import Fireball from '../assets/fireball.png'
import BetterLuck from './BetterLuck.vue'
import FinalScreen from './FinalScreen.vue'

const store = gamesStore()

const state = reactive({
    finalScreens: 0,
    winners: [],
    fireball: null
})

const failsound = new Audio('../audio/sprite/gamefail.mp3');

onMounted(() => {
    calcWinners()

    let tl = gsap.timeline({
        repeat: 0,
    });

    // fade in system
    tl.to('#picks', {duration: .01, y: 50});
    tl.to('#fireball__row', {duration: .01, y: 50});
    tl.to('#winning', {duration: .01, y: 50});
    tl.to ('#picks', {duration: .5, opacity: 1, y: 0, ease: 'power1.inOut'});
    tl.to ('#fireball__row', {duration: .5, opacity: 1, y: 0, delay: 1, ease: 'power1.inOut'});
    tl.to ('#winning', {duration: .5, opacity: 1, y: 0, delay: 1, ease: 'power1.inOut'});

    // circle numbers animation    
    tl.call(circleAnimation);

    // shoulda screen
    tl.to ('#fireball', {duration: 6, onComplete: () => {state.finalScreens = 1} });

    // final Screen
    tl.to ('#fireball', {duration: 5, onComplete: () => {state.finalScreens = 2} });

})

const circleAnimation = () => {
     let tl1 = gsap.timeline({
        repeat: 0,
    });
  
if ((store.presentgame === 'any' ) && store.presentrules === 2) {
    tl1.to('#number-0', {duration: 1.2, borderColor: 'gold', ease: 'power1.inOut'});
    tl1.to('#pick-0 div', {duration: 1.2, backgroundColor: 'gold', color: 'black', delay: -1.2, ease: 'power1.inOut', onStart: () => {bubble()}});  
    tl1.to('#number-1', {duration: 1.2, borderColor: 'gold', ease: 'power1.inOut'});
    tl1.to('#pick-1 div', {duration: 1.2, backgroundColor: 'gold', color: 'black', delay: -1.2, ease: 'power1.inOut', onStart: () => {bubble()}});
    tl1.to('#number-2', {duration: 1, borderColor: 'gold', ease: 'power1.inOut'});
    tl1.to('#pick-3 div', {duration: 1, backgroundColor: 'gold', color: 'black', delay: -1, ease: 'power1.inOut', onStart: () => {bubble()}});
       // fireball fail
    tl1.to('#number-2', {duration: 1, onComplete: () => {failsound.play()}});

    }  else if (store.presentgame === 'exact')  {
    tl1.to('#number-0', {duration: 1.2, borderColor: 'gold', ease: 'power1.inOut'});
    tl1.to('#pick-0 div', {duration: 1.2, backgroundColor: 'gold', color: 'black', delay: -1.2, ease: 'power1.inOut', onStart: () => {bubble()}});  
    tl1.to('#number-1', {duration: 1.2, borderColor: 'gold', ease: 'power1.inOut'});
    tl1.to('#pick-1 div', {duration: 1.2, backgroundColor: 'gold', color: 'black', delay: -1.2, ease: 'power1.inOut', onStart: () => {bubble()}});
    tl1.to('#number-2', {duration: 1, borderColor: 'gold', ease: 'power1.inOut'});
    tl1.to('#pick-2 div', {duration: 1, backgroundColor: 'gold', color: 'black', delay: -1, ease: 'power1.inOut', onStart: () => {bubble()}});
           // fireball fail
    tl1.to('#number-2', {duration: 1, onComplete: () => {failsound.play()}});

    } else {
    tl1.to('#number-0', {duration: 1.2, borderColor: 'gold', ease: 'power1.inOut'});
    tl1.to('#pick-2 div', {duration: 1.2, backgroundColor: 'gold', color: 'black', delay: -1.2, ease: 'power1.inOut', onStart: () => {bubble()}});  
    tl1.to('#number-1', {duration: 1.2, borderColor: 'gold', ease: 'power1.inOut'});
    tl1.to('#pick-3 div', {duration: 1.2, backgroundColor: 'gold', color: 'black', delay: -1.2, ease: 'power1.inOut', onStart: () => {bubble()}});
    tl1.to('#number-2', {duration: 1, borderColor: 'gold', ease: 'power1.inOut'});
    tl1.to('#pick-1 div', {duration: 1, backgroundColor: 'gold', color: 'black', delay: -1, ease: 'power1.inOut', onStart: () => {bubble()}});
          // fireball fail
    tl1.to('#number-2', {duration: 1, onComplete: () => {failsound.play()}});

    }

}




const bubble = () => {
  let bubble = new Audio('../audio/sprite/bubble-pop.mp3');
  bubble.play();
}

const calcWinners = () => {
  if ((store.presentgame === 'any') && store.presentrules === 2) {
    state.winners = [store.picks[0], store.picks[2], store.picks[3], store.fireball]
    state.fireball = store.picks[1]
  }
  else if (store.presentgame == 'exact') {
    state.winners = [store.picks[0], store.picks[1], store.picks[2], store.fireball]
    state.fireball = store.picks[3]
  }
  else {
    state.winners = [store.picks[2], store.picks[3], store.picks[1], store.fireball]
    state.fireball = store.picks[0]
  }
}


</script>

<template>
  <div class="wrapper">

    <div id="picks" class="picks__row">
      <div class="title">
        <h3><span>Your Numbers</span></h3>
      </div>
      <div class="picks">
        <div v-for="(num, i) in store.picks" v-bind:id="'pick-' + i" class="number yours">
          <div>{{ num }}</div>
        </div>
      </div>
    </div>
    
    <div id="fireball__row" class="fireball__row">
      <div class="title">
        <img width="183" height="21" alt="Fireball" :src="Fireball" />
      </div>
      <div id="fireball" class="number fireball">
        <h3>You did not select <br /> to add Fireball</h3>
      </div>
    </div>

    <div id="winning" class="winning-numbers__row">
      <div class="title">
        <h3>
          Pick 4:
          <span>Winning Numbers</span>
        </h3>
      </div>
      <div class="winning-numbers">
        <div v-for="(num, i) in state.winners" v-bind:id="'number-' + i" class="number">
        <div>
          {{ num }}
          </div>
        </div>
      </div>
    </div>



  </div>
    <BetterLuck v-if="state.finalScreens === 1" />
    <FinalScreen v-else-if="state.finalScreens === 2" />

</template>

<style scoped>

#winning, #fireball__row, #picks {
  opacity: 0;
}
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
  gap: 15px;
  align-items: center;
  margin-top: 20px;
}

.fireball__row {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  margin-top: 20px;
}

.fireball__row .title {
  margin-bottom: 20px;
}
.number {
  border-radius: 50%;
  border: 5px solid transparent;
}

.number div { 
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
  font-size: 34px;
  font-weight: 700;
}


.yours div {
  background: none;
  border: 2px solid #ffd206;
  filter: drop-shadow(0px 0px 9px #cbac20);
  color: var(--vt-c-white);
}
</style>
