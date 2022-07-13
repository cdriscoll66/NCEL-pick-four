<script>
import { reactive } from "vue";

const picks = reactive([null, null, null, null]);

</script>

<template>
  <main>

    <div class="picks">
        {{ picks }}
      <div class="pick" v-for="(pick, index) in picks">
        <div class="pick-number">
          <span>{{ index + 1 }}</span>
        </div>
        <div class="pick-balls">
          <div class="pick-ball" v-for="ball in pick" :key="ball">
            <span>{{ ball }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="picks-control">
      <button @click="pickBall">Pick Ball</button>
    </div>
    
  </main>
</template>
