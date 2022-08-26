<script setup>
import gsap from 'gsap';
import { onMounted } from 'vue';
onMounted(() => {
//   gsap.to('.fireball', {
//     duration: 1,
//     scale: 1.5,
//     repeat: -1,
//     yoyo: true,
//   });
});
</script>

<template>
<div class="wrapper">
<h1>Winner</h1>
<h1>Winner</h1>
<h1>Winner</h1>
<h1>Winner</h1>
<h1>Winner</h1>


</div>
</template>

<style scoped>
.wrapper {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    background-color: var(--color-green-darkest);
    color: var(--vt-c-white);
    align-items: center;
    z-index: 100;
}
h1 {
    font-weight: bold;
}
</style>