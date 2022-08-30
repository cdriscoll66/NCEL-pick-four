<script setup>
import BgStars from '../components/BgStars.vue'
import { gamesStore } from '@/store/GamesStore'
import Fireball from '../assets/fireball.png'
import X from '../assets/x-protip.svg'


const store = gamesStore()

const emit = defineEmits(['close']);


</script>

<template>
  <div class="modal">
    <div class="modal__content">
      <div class="close">
        <a href class="small-btn" @click.prevent="emit('close')">
          <img :src="X" alt="close" />Close Pro Tip
        </a>
      </div>
      <div v-if="(store.showfireball)" class="modal__text">
          <img width="183" height="21" alt="Fireball" :src="Fireball" />
          <h2 class="highlighted">Use <span>“Quick Pick”</span> to have your numbers randomly selected.
</h2>
      </div>


      <div v-else-if="(store.presentgame === null)" class="modal__text">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum
        </p>
        <h2>Combo</h2>
        <p>
          Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
        </p>
        <h2>Front Pair</h2>
        <p>
          Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
        </p>
        <h2>Back Pair</h2>
        <p>
          Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
        </p>
        <h2>Front Pair</h2>
        <p>
          Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
        </p>
        <h2>Back Pair</h2>
        <p>
          Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
        </p>
      </div>


      <div v-else class="modal__text">
      <div class="quick-pick">
      <span>Quick Pick</span>
        </div>
      <h2 class="highlighted">Use <span>“Quick Pick”</span> to have your numbers randomly selected.
</h2>      </div>

      
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow-y: scroll;
  background-color: var(--color-green-darkest)
}

.modal__content {
  padding-top: 80px;
  min-height: 100%;
}
.modal__text {
  margin: 32px 40px;
}

.close {
    margin-left: 8px;
}

p {
  font-family: 'Avenir Next', sans-serif;
  color: var(--vt-c-white);
  font-size: 12px;
  line-height: 1.5;
}

h2 {
  color: var(--color-gold);
  margin: 24px 0 8px;
}

h2.highlighted {
  color: var(--vt-c-white);
}

h2.highlighted span {
  color: var(--color-gold);
}

.quick-pick {
  display: flex;
}

.quick-pick span {
  margin-right: 24px;
  font-weight: bold;
  font-size: 20px;
  text-shadow: -1px 1px 4px rgba(0, 61, 31, 0.75);
  color: var(--vt-c-white);
  display: flex;
  align-items: center;
}

.quick-pick span::before {
  content: '';
  display: block;
  width: 30px;
  height: 40px;
  background-color: var(--vt-c-white);
  border-radius: 3.94px;
  border: 1px solid var(--color-fireball-red);
  margin-right: 12px;
}
</style>
