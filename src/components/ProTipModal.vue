<script setup>
import BgStars from '../components/BgStars.vue'

const emit = defineEmits(['close']);


</script>

<template>
  <div class="modal">
    <div class="modal__content">
      <div class="close">
        <a href class="small-btn" @click.prevent="emit('close')">
          Close Pro Tip
        </a>
      </div>

      <div class="modal__text">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum
        </p>
        <h2>Combo</h2>
        <p>
          Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
        </p>
        <h2>Front Pair</h2>
        <p>
          Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
        </p>
        <h2>Back Pair</h2>
        <p>
          Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
        </p>
        <h2>Front Pair</h2>
        <p>
          Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
        </p>
        <h2>Back Pair</h2>
        <p>
          Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
        </p>
      </div>
      <BgStars green="true"></BgStars>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow-y: scroll;
}

.modal__content {
  padding-top: 90px;
}
.modal__text {
  margin: 32px 40px;
}

.close {
    margin-left: 8px;
}

p {
  font-family: 'Avenir Next', sans-serif;
  color: var(--vt-c-white);
  font-size: 12px;
  line-height: 1.5;
}

h2 {
  color: var(--color-gold);
  margin: 24px 0 8px;
}
</style>
