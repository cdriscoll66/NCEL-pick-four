<script setup>
import { onBeforeMount, reactive } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import HomeIcon from './assets/home.png'
import LearnIcon from './assets/menu.png'
import PlayIcon from './assets/play.png'
import MuteIcon from './assets/sound.png'
import CloseIcon from './assets/close.png'

// this resizes the screen to whatever screen it's on.
onBeforeMount(() => {
  /** https://dev.to/maciejtrzcinski/100vh-problem-with-ios-safari-3ge9 */
  const viewportDimensions = () => {
    const doc = document.documentElement
    // doc.style.setProperty('--viewport-width', window.innerWidth);
    doc.style.setProperty('--viewport-height', window.innerHeight)
    doc.style.setProperty(
      '--viewport-scale',
      Math.min(
        window.innerWidth / 375, // [320, 375] // see App.vue #Cash5App width
        window.innerHeight / 635, // [559, 635] // see App.vue #Cash5App height
      ),
    )
  }
  window.addEventListener('resize', viewportDimensions)
  viewportDimensions()

  // preloadImages();
})

 const preloadImages = () => {
   const pics = state.preloadImages;
      pics.forEach(pic => {
        const img = new Image();
        img.src = pic;
      })
    }

const state = reactive({
  music: '',
  preloadImages: [
    '/assets/bg-stars.svg',
    '/assets/bg-stars--green.svg',
    '/assets/home.png',
    '/assets/menu.png',
    '/assets/play.png',
    '/assets/sound.png',
    '/assets/close.png'
  ]
})

const muteToggle = () => {
  bgMusic.muted = !bgMusic.muted;
}

const playToggle = (status) => {
  return status ? bgMusic.play() : bgMusic.pause()
}

let bgMusic = new Audio()
bgMusic.src = state.music
bgMusic.loop = true

const exit = () => {
  console.log('exit')
}

const Music = (song) => {
  state.music = song
  bgMusic.src = state.music
  bgMusic.play()
}
</script>

<template>
  <header>
    <div class="nav-wrapper">
      <nav>
        <RouterLink to="/">
          <span class="nav-icon">
            <img width="26" height="24.95" alt="Home Icon" :src="HomeIcon" />
          </span>
          <span>Home</span>
        </RouterLink>
        <RouterLink to="/tutorial">
          <span class="nav-icon">
            <img width="26" height="24.95" alt="Learn Icon" :src="LearnIcon" />
          </span>
          <span>Learn</span>
        </RouterLink>
        <RouterLink class="play-icon" to="/game2">
          <span class="nav-icon">
            <img width="26" height="24.95" alt="Play Icon" :src="PlayIcon" />
            <span class="top-left"></span>
            <span class="top-right"></span>
          </span>
          <span>Play</span>
        </RouterLink>
        <a href @click.prevent="muteToggle()">
          <span class="nav-icon">
            <img width="26" height="24.95" alt="Mute Icon" :src="MuteIcon" />
          </span>
          <span>Mute</span>
        </a>
        <a href @click.prevent="exit()">
          <span class="nav-icon">
            <img width="26" height="24.95" alt="Exit Icon" :src="CloseIcon" />
          </span>
          <span>Exit</span>
        </a>
      </nav>
    </div>
  </header>

  <RouterView @music="Music" @musicplaypause="playToggle" />
</template>

<style scoped>
header {
  position: absolute;
  z-index: 10000000;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  line-height: 1.5;
  max-height: 100vh;
  background-color: #00893a;
  padding: 0;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  width: 100%;
  font-size: 12px;
  text-align: center;
}

nav a {
  color: var(--vt-c-white);
  margin-top: 5px;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: flex;
  flex-flow: column nowrap;
  padding: 0 1rem;
}

nav .nav-icon:after {
  content: '';
  display: block;
  width: 70%;
  height: 3px;
  margin: 0 auto;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.16);
  box-shadow: 0 0 3px rgb(0 0 0 / 16%);
  transition: transform 0.4s;
}

nav a:first-of-type {
  border: 0;
}

a.play-icon {
  width: 92px;
  height: 70px !important;
  margin: 0 6px -10px;
  padding: 6px 10px 8px !important;
  border-radius: 0 0 20px 20px;
  background-color: var(--color-green-light);
}

.top-right,
.top-left {
  position: absolute;
  top: 0;
  width: 10px;
  height: 10px;
  background-color: var(--color-green-light);
}

.top-left::before,
.top-right::before {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  background-color: var(--color-green-light);
}

.top-right {
  left: 100%;
}
.top-right::before {
  border-radius: 10px 0 0 0;
}

.top-left {
  right: 100%;
}
.top-left::before {
  border-radius: 0 10px 0 0;
}
</style>
