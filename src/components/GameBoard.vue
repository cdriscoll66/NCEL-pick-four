<script setup>

const props = defineProps(['picks', 'dupes']);
const emit = defineEmits(['select-num']);

const selectNum = (num, slot) => {
    emit('select-num', num, slot);
};

</script>

<template>
<div class="picks">
      <div class="pick" v-for="(pick, i) in props.picks">

      <!-- if Duplicates are allowed - This will be the game board -->
        <div v-if="props.dupes" class="select-num">
          <div v-for="(n, index) in 10" :key="index">
            <button
              v-if="props.picks[i] == index"
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

      <!-- No Duplicate Numbers allow -->
        <div v-else class="select-num">
          <div v-for="(n, index) in 10" :key="index">
            <button
              v-if="props.picks[i] == index"
              class="active"
              @click.prevent="selectNum(index, i)"
            >
              {{ index }}
            </button>
            <button
              v-else-if="props.picks.includes(index)"
              disabled
              class="disabled"
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
</template>

<style scoped>
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
  width: 26px;
  height: 36px;
  border-radius: 3.94px;
  border: 1px solid #CF271C;
  background: linear-gradient(#C7D5CE, #ffffff);
  color: #CF271C;
  font-size: 20px;
  line-height: 1.2;
  font-weight: 700;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  padding: unset;
}
button.active {
  background-color: var(--color-gold);
  color: var(--vt-c-black);
}

button.disabled {
  opacity: 0.3;
}
</style>