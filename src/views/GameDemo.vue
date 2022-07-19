<script setup>
import { reactive, onMounted } from 'vue'

const picks = reactive([null, null, null, null])
const winners = reactive([]);
const selectNum = (num, slot) => {
  picks[slot] = num
}


const playNumbers = () => {
  console.log('play the game already');
  genWinners();
  
  checkAnyNumbers();
}

const genWinners = () => {
  for (let i = 0; i < 4; i++) {
    // pick a random number between 1 and 10
    const num = Math.floor(Math.random() * 10) + 1
    winners.push(num)
  }
}

const checkAnyNumbers = () => {
 picks.map((num) => {
   if (winners.includes(num)) {
    alert(`${winners} <br />you win`);
   }
   })
 };


</script>

<template>
  <main>
    <div class="picks">
      <div class="pick" v-for="(pick, i) in picks">
        <h3 class="number">{{ i }}</h3>
        <div class="select-num">
          <div v-for="index in 10" :key="index">
            <button
              v-if="picks[i] == index"
              class="active"
              @click.prevent="selectNum(index, i)"
            >
              {{ index }}
            </button>
            <button v-else @click.prevent="selectNum(index, i)">
              {{ index }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
    <div class="selection">
      {{ picks.join(', ') }}
    </div>

    <div class="winners">
      <button @click.prevent="playNumbers()">Play!</button>
      <div class="winner" v-for="(winner, i) in winners">
        <h3 class="number">{{ winner }}</h3>
      </div>
    </div>
    </div>
  </main>
</template>

<style scoped>
h3.number {
  text-align: center;
}

.select-num {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
}

button.active {
  background-color: var(--color-green-dark);
  color: var(--color-text);
}

.bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
}
</style>
