<script setup>
import gsap from 'gsap';

import { onMounted } from 'vue';

const triumph = new Audio('../audio/sprite/triumph.mp3');


onMounted(() => {
    let tl = gsap.timeline({ repeat: 0 });
      tl.to('#win1', { delay: 0, duration: 0, opacity: 0, y: 120 });
      tl.to('#win5', { delay: 0, duration: 0, opacity: 0, y: -120 });
      tl.to('#win2', { delay: 0, duration: 0, opacity: 0, y: 60 });
      tl.to('#win4', { delay: 0, duration: 0, opacity: 0, y: -60 });
      tl.to('#win3', { delay: 0, duration: 0, opacity: 0 });

      tl.to('#win3', { delay: 0, duration: 0.6, opacity: 1, scale: 1.1, ease: 'elastic', onComplete: () => {
        triumph.play();
      } });
      tl.to('#win3', { delay: -0.2, duration: 0.2, scale: 1, ease: 'expo.out' });
      tl.to('#win1', { delay: -0.2, duration: 0.2, opacity: 1, y: 0, ease: 'expo.out' });
      tl.to('#win5', { delay: -0.2, duration: 0.2, opacity: 1, y: 0, ease: 'expo.out' });
      tl.to('#win2', { delay: -0.2, duration: 0.2, opacity: 1, y: 0, ease: 'expo.out' });
      tl.to('#win4', { delay: -0.2, duration: 0.2, opacity: 1, y: 0, ease: 'expo.out', });
});


</script>

<template>
<div class="winner__wrapper">
            
<h1 id="win1">Winner</h1>
<h1 id="win2">Winner</h1>
<h1 id="win3">Winner</h1>
<h1 id="win4">Winner</h1>
<h1 id="win5">Winner</h1> 

</div>
</template>

<style scoped>
.winner__wrapper {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    background-color: rgba(0, 61, 31, .9);
    color: var(--vt-c-white);
    align-items: center;
    z-index: 100;
}
h1 {
    font-weight: bold;
    font-size: 56px;
    text-transform: uppercase
}

h1:nth-child(odd) {
    color: var(--color-gold);
}
</style>