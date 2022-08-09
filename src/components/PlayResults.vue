<script setup>
import { computed } from '@vue/reactivity';
import BgStars from './BGstars.vue';

const props = defineProps(['picks', 'fireball']);

const emit = defineEmits(['next-game']);

const winners = computed(() => {
  let nums = [props.picks[0], props.picks[1], props.picks[2], props.fireball]
  return nums;
});

const resultFireball = computed(() => {
  return props.picks[3];
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
      <div>
        Fireball:
        <span>{{ resultFireball }}</span>
      </div>
    </div>
    <button @click.prevent="emit('next-game')">Next Game</button>
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
</style>
