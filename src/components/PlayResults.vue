<script setup>
import { computed, onMounted, reactive } from 'vue';
import gsap from 'gsap';
import BgStars from './BgStars.vue';
import Winner from './Winner.vue';

const props = defineProps(['picks', 'fireball']);
const emit = defineEmits(['next-game']);

const state = reactive({
  showWinner: false,
});

onMounted (() => {
  let fbtimeline = gsap.timeline({
    delay: 2,
    repeat: 0,
  });
    fbtimeline.to('#fireball', {duration: 1, scale: .85, x: -55, y:-83, ease: 'power1.inOut',});
    fbtimeline.to('#fireball', {duration: .1, scale: 1, yoyo: true, repeat: 2, ease: 'power1.inOut',});
    fbtimeline.to('#fireball', {duration: 1, scale: .85, x: -20, y:-83, ease: 'power1.inOut',});
    fbtimeline.to('#fireball', {duration: .1, scale: 1, yoyo: true, repeat: 2, ease: 'power1.inOut',});
    fbtimeline.to('#fireball', {duration: 1, scale: .85, x: 20, y:-83, ease: 'power1.inOut',});
    fbtimeline.to('#fireball', {duration: .1, scale: 1, yoyo: true, repeat: 2, ease: 'power1.inOut',});
    fbtimeline.to('#fireball', {duration: 1, scale: .85, x: 60, y:-83, ease: 'power1.inOut',});
    fbtimeline.to('#fireball', {duration: .03, scale: 1.2, yoyo: true, repeat: 20, ease: 'power1.inOut'});
    fbtimeline.call(flashWinner);
    fbtimeline.to('#fireball', {duration: .5, scale: 1.1, yoyo: true, repeat: -1, ease: 'power1.inOut'});
})

const flashWinner = () => {
  state.showWinner = true;
  setTimeout(() => {
state.showWinner = false;
  }, 2000);
}


const winners = computed(() => {
  let nums = [props.picks[0], props.picks[1], props.fireball]
  return nums;
});

const resultFireball = computed(() => {
  return props.picks[2];
});
</script>

<template>
  <div class="results-modal">
    <h3>Your Numbers:</h3>
    <div class="picks">
      <div v-for="(num, i) in props.picks" :key="(i)">
        {{ num }}
      </div>
    </div>

    <h3>Winner Numbers:</h3>
    <div class="winners">
      <div v-for="(num, i) in winners" :key="(i)">
        {{ num }}
      </div>
    </div>

    <div class="fireball">
        Fireball:
        <span id="fireball">{{ resultFireball }}</span>
        <span>{{ resultFireball }}</span>

    </div>
    <Winner v-if="state.showWinner"></Winner>
    <div class="bottom">

    <button @click.prevent="emit('next-game')">Next Game</button>
    </div>
    <BgStars />
  </div>
</template>

<style scoped>
.results-modal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 1;

  z-index: 1;
  padding: 90px 10px 10px;
}

h3,
.picks {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-green-darkest);
  text-align: center;
}
.picks,
.winners {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 30px;
  margin-bottom: 30px;
  font-style: italic;
}

.bottom {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
}


.fireball {
  text-align: center;
}

.fireball span {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-fireball-red);
  background-color: var(--vt-c-white);
  border: 3px solid var(--color-fireball-red);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 800;
  position: absolute;
  z-index: 3;
  left: calc(50% - 20px);

}
</style>
