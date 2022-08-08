<script setup>
import YellowStars from '../assets/background-stars.svg';
import GreenStars from '../assets/background-stars--green.svg';
const props = defineProps(['green']);

</script>

<template>
    <div class="bg-stars__cover" :class="{green: props.green}">
        <div class="bg-stars__inner">
            <div class="bg-stars__stars"></div>
        </div>
    </div>
</template>

<style scoped>

@keyframes slide-down-stars {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(161.67px);
  }
}
    .bg-stars__cover {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #ffd206;
        background: linear-gradient(180deg, #ffcc02 0%, #ffd206 36.27%, #ffBA02 60.01%);
        /* background: linear-gradient(180deg, rgba(0, 122, 61) 0%, rgba(0, 61, 31) 57.87%); */
        z-index: -1;
    }
    .bg-stars__inner {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .bg-stars__stars {
  position: absolute;
  top: -160.67px;
  width: 100%;
  height: calc(100% + 161.67px);
  background: repeat 50% 0;
  opacity: 0.35;
  mix-blend-mode: soft-light;
  animation: slide-down-stars 7s linear infinite;
  background-image: url(../assets/background-stars.svg);
    }

    .green .bg-stars__stars {
        background-image: url(../assets/background-stars--green.svg);
    }

    .green.bg-stars__cover {
        background-color: rgba(0, 122, 61);
        background: linear-gradient(180deg, rgba(0, 122, 61) 0%, rgba(0, 61, 31) 57.87%);
    }
</style>