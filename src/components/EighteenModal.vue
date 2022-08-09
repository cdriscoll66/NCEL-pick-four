<script setup>

const emit = defineEmits(['confirm-yes']);



</script>

<template>
  <div class="eighteen">
    <h2>Are you over 18?</h2>
    <div class="eighteen-buttons">
      <a href @click.prevent="emit('confirm-yes')">Yes</a>
      <a href="https://www.yahoo.com" target="_blank">No</a>
    </div>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
  </div>
</template>

<style scoped>

h2 {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--vt-c-white);
  text-align: center;
  margin-top: 40px;
}

.eighteen {
  position: absolute;
  top: 0; 
  left: 0; 
  right: 0; 
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: var(--color-green-darkest);
  z-index: 1;
  padding: 50px 30px 0 30px;
}

.eighteen-buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  margin: 30px 0;
}

.eighteen-buttons a {
  color: var(--vt-c-white);
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid var(--vt-c-white);
}

.eighteen p {
  color: var(--vt-c-white);
  font-size: .85rem;
  text-align: center;
}

</style>