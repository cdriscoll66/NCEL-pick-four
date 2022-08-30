<script setup>
import YellowStars from '../assets/background-stars.svg'
import GreenStars from '../assets/background-stars--blue.svg'
const props = defineProps(['blue', 'gray'], {
  default: {
    blue: false,
    gray: false,
  },
})
</script>

<template>
  <div
    class="bg-stars__cover"
    :class="{ blue: props.blue, gray: props.gray }"
  >
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

.bg-stars__inner::after:not(.green, .gray) {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  content: '';
  background: linear-gradient(
    180deg,
    rgb(255, 210, 6) -3.61%,
    rgb(201, 165, 5) 32.66%,
    rgb(165, 136, 5) 56.4%
  );
  opacity: 0.6;
  background-blend-mode: color-burn;
}

.blue > .bg-stars__inner::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  content: '';
  background: linear-gradient(180deg, rgba(0, 61, 31, 1) 15%, rgba(0, 61, 31, 0.5) 25%, rgba(0, 61, 31, 0) 35%);
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

.blue .bg-stars__stars {
  background-image: url(../assets/background-stars--blue.svg);
}

.blue.bg-stars__cover {
  background-color: #0093C7;
  background: linear-gradient(180deg, rgba(0, 147, 199, 0.6) 0%, rgba(0, 45, 61, 0.6) 57.87%);
}

.gray .bg-stars__stars {
  background-image: url(../assets/background-stars--gray.svg);
}

.gray.bg-stars__cover {
  background-color: #a7a7a7;
  background: linear-gradient(180deg, #a7a7a7 0%, #c7c7c7 57.87%);
}
</style>
