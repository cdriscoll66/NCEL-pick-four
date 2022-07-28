<script setup>
import { ref, onUpdated } from 'vue';


const props = defineProps(['onscreen', 'playing']);

const vid = ref(null);

onUpdated(() => {
    if (props.playing) {
        vid.value.play();
    }
    else {
        vid.value.pause();
    }  
});



const spitOut = () => {
console.log(vid._value.currentTime);
// emit the current time to update the parent component (Tutorial)

}

</script>

<template>
    <video id="vid" ref="vid" width="640" height="480" autoplay muted @timeupdate='spitOut'>
      <source :src='props.onscreen' type="video/mp4">
    Your browser does not support the video tag.
    </video>
</template>