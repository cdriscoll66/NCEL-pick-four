<script setup>
import { computed } from '@vue/reactivity';


const props = defineProps(['tuts']);




</script>

<template>

<div class="progress-bars">

    <div v-for="(bars, index) in props.tuts.videos" :key="index" class="progress-bar">
    <div class="progress-bar-inner" :style="{ width: bars.marker + '%' }"></div>
    </div>
</div>
</template>

<style scoped>

.progress-bars {
    display: flex;
    flex-flow: row nowrap;
    gap: 15px;
    width: 100%;
    justify-content: space-around;
    margin-bottom: 50px;
}

.progress-bar {
    width: 100%;
    height: 15px;
    background-color: var(--color-green);
    /* margin: 10px; */
}

.progress-bar-inner {
    height: 100%;
    background-color: var(--color-green-dark);
    width: 0;
    transition: width 0.5s;
}

</style>