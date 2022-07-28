<script setup>
import { reactive, ref } from 'vue'

const state = reactive({
  gamesplayed: 0,
  picks: [null, null, null, null],
  winners: [],
  selectNum: (num, slot) => {
    state.picks[slot] = num
  },
})

const playAgain = () => {
  state.picks = [null, null, null, null];
  state.winners = [];
}

const playNumbers = () => {
  genWinners()
  checkFirstNumbers()
  state.gamesplayed++
}

const genWinners = () => {
  state.winners = []
  state.winners.push(state.picks[0], state.picks[1], state.picks[2])
  let num = Math.floor(Math.random() * 10) + 1
  if (state.winners.includes(num)) {
    genWinners()
  } else {
    state.winners.push(num)
  }
}

const checkFirstNumbers = () => {
  alert(
    'The fire-ball was ' +
      state.winners[3] +
      '! So congrats to you! You won $100! \n Your Numbers: ' +
      state.picks.join(', ') +
      ' \n Winners with fireball: ' +
      state.winners.join(', '),
  )
}
</script>

<template>
  <main>
    <div class="picks">
      <div class="pick" v-for="(pick, i) in state.picks">
        <h3 class="number">{{ i }}</h3>
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
    <div class="bottom">
      <div class="selection">
        {{ state.picks.join(', ') }}
      </div>

      <div class="winners">
        <button @click.prevent="playNumbers()">Play!</button>
        <div v-show="state.gamesplayed">
          <p>{{ state.picks.join(', ') }}</p>
          <button @click.prevent="playAgain()">Play Again</button>
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

button.disabled {
  opacity: 0.5;
}

.bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
}
</style>
