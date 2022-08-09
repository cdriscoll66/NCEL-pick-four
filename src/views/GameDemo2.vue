<script setup>
import { reactive } from 'vue'
import BgStars from '../components/BgStars.vue';
import PlayResults from '../components/PlayResults.vue';

const emit = defineEmits(['music']);

const state = reactive({
  showEighteenModal: true,
  showResults: false,
  instructions: 'pick four numbers!',
  gamesplayed: 0,
  picks: [null, null, null, null],
  fireball: null,
  selectNum: (num, slot) => {
    state.picks[slot] = num
  },
  closeModal: () => {
    state.showEighteenModal = false
        emit('music', 'audio/FunkyInFunky.mp3');

  }
})



const playNumbers = () => {
  genFireball()
  state.gamesplayed++

  state.showResults = true;
}

const genFireball = () => {
  let num = Math.floor(Math.random() * 10) + 1
  if (state.picks.includes(num)) {
    genFireball()
  } else {
    state.fireball = num;
  }
}


</script>

<template>
  <main>
  <div v-show="(state.showEighteenModal)" class="eighteen">
    <h2>Are you over 18?</h2>
    <div class="eighteen-buttons">
      <a href @click.prevent="state.closeModal">Yes</a>
      <a href="https://www.yahoo.com" target="_blank">No</a>
    </div>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>

  </div>
  <h2>{{state.instructions}}</h2>
    <div class="picks">
      <div class="pick" v-for="(pick, i) in state.picks">
        <div class="select-num">
          <div v-for="index in 10" :key="index">
            <button
              v-if="state.picks[i] == index"
              class="active"
              @click.prevent="state.selectNum(index, i)"
            >
              {{ index }}
            </button>
            <button
              v-else-if="state.picks.includes(index)"
              disabled
              class="disabled"
              @click.prevent="state.selectNum(index, i)"
            >
              {{ index }}
            </button>
            <button v-else @click.prevent="state.selectNum(index, i)">
              {{ index }}
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div v-show="!state.picks.includes(null)" class="bottom">
        <button @click.prevent="playNumbers()">Play!</button>
    </div>

    <PlayResults v-show="(state.showResults)" :picks="state.picks" :fireball="state.fireball"></PlayResults>
    <BgStars green="true"/>
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
.picks {
  margin-top: 30px;
}

.select-num {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin-bottom: 30px;
}

.picks button {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid #000;
  background-color: #fff;
  color: #000;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}
button.active {
  background-color: var(--color-gold);
  color: var(--vt-c-black);
}

button.disabled {
  opacity: 0.3;
}

.bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 10px;
}

.eighteen {
  position: absolute;
  top: 0; 
  left: 0; 
  right: 0; 
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: var(--color-green-darkest);
  z-index: 1;
  padding: 50px 30px 0 30px;
}

.eighteen-buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  margin: 30px 0;
}

.eighteen-buttons a {
  color: var(--vt-c-white);
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid var(--vt-c-white);
}

.eighteen p {
  color: var(--vt-c-white);
  font-size: .85rem;
  text-align: center;
}
</style>
