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
          <div v-for="index in 10" :key="index">
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
          <div v-for="index in 10" :key="index">
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
</style>