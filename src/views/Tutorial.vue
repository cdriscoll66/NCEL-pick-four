<script setup>
import { reactive, onBeforeMount } from 'vue'

import PlayBtn from '../assets/play.svg'
import PauseBtn from '../assets/pause.svg'
import FwdBtn from '../assets/arrow-square-right.svg'
import BackBtn from '../assets/arrow-square-left.svg'
import VideoPlayer from '../components/VideoPlayer.vue'
import ProgressBar from '../components/ProgressBar.vue'
import { ClickSound } from '../composables/sfx'

const emit = defineEmits(['music', 'musicplaypause'])

onBeforeMount(() => {
  // state.showToc = true
  // state.playing = false
})

const state = reactive({
  showToc: false,
  subject: 0,
  video: 0,
  playing: true,
  tuts: [
    {
      subject: 'Subject One',
      videos: [
        {
          id: 1,
          title: 'Video One',
          video: '/video/01.mp4',
          length: 13,
          marker: 0,
        },
        {
          id: 2,
          title: 'Video two',
          video: '/video/02.mp4',
          length: 9,
          marker: 0,
        },
        {
          id: 3,
          title: 'Video three',
          video: '/video/03.mp4',
          length: 9,
          marker: 0,
        },
        {
          id: 4,
          title: 'Video four',
          video: '/video/04.mp4',
          length: 11,
          marker: 0,
        },
        {
          id: 5,
          title: 'Video five',
          video: '/video/05.mp4',
          length: 12,
          marker: 0,
        },
        {
          id: 6,
          title: 'Video six',
          video: '/video/06.mp4',
          length: 9,
          marker: 0,
        },
      ],
    },
    {
      subject: 'Subject two',
      videos: [
        {
          id: 4,
          title: 'Video four',
          video: '/video/04.mp4',
          length: 11,
          marker: 0,
        },
        {
          id: 5,
          title: 'Video five',
          video: '/video/05.mp4',
          length: 12,
          marker: 0,
        },
        {
          id: 6,
          title: 'Video six',
          video: '/video/06.mp4',
          length: 9,
          marker: 0,
        },
      ],
    },
    {
      subject: 'Subject tres',
      videos: [
        {
          id: 7,
          title: 'Video seven',
          video: '/video/07.mp4',
          length: 12.959,
          marker: 0,
        },
        {
          id: 8,
          title: 'Video ocho',
          video: '/video/08.mp4',
          length: 212.56,
          marker: 0,
        },
      ],
    },
  ],
})

const nextVideo = () => {
  if (
    state.video + 1 >= state.tuts[state.subject].videos.length &&
    state.subject + 1 == state.tuts.length
  ) {
    console.log('nothin2.')
    return
  } else if (state.video + 1 >= state.tuts[state.subject].videos.length) {
    state.video = 0
    state.subject++
    state.playing = true
  } else {
    state.video++
    state.playing = true
  }
  emit('musicplaypause', state.playing)
}

const handleEnd = () => {
  nextVideo()
}

const UpdateTime = (timer) => {
  let timerPercent =
    (timer / state.tuts[state.subject].videos[state.video].length) * 100
  state.tuts[state.subject].videos[state.video].marker = timerPercent
}

const prevVideo = () => {
  if (state.video == 0 && state.subject == 0) {
    console.log('nothin.')
    return
  } else if (state.video - 1 < 0) {
    state.subject--
    state.video = state.tuts[state.subject].videos.length - 1
    state.playing = true
  } else {
    state.video--
    state.playing = true
  }
  emit('musicplaypause', state.playing)
}

const Playpause = () => {
  ClickSound()
  state.playing = !state.playing
  emit('musicplaypause', state.playing)
}

const handleToc = (i) => {
  ClickSound();
  state.subject = i
  state.video = 0
  state.playing = true
  state.showToc = false
  emit('music', '/audio/3FunkShortVersion.mp3')
}
</script>

<template>
  <main>
    <div v-show="(state.showToc)" class="table-of-contents">
      <ul>
        <li v-for="(tut, index) in state.tuts">
          <a href="#" @click.prevent="handleToc(index)">
            {{ tut.subject }}
          </a>
        </li>
      </ul>
    </div>
    <div class="progress-bar">
      <h1>{{ state.tuts[state.subject].subject }}</h1>
      <ProgressBar
        :tuts="state.tuts[state.subject]"
        :key="state.subject"
      ></ProgressBar>
    </div>
    <VideoPlayer
      v-show="!state.showToc"
      :onscreen="state.tuts[state.subject].videos[state.video].video"
      :playing="state.playing"
      :key="state.tuts[state.subject].videos[state.video].id"
      @ended="handleEnd()"
      @update-time="UpdateTime"
    />
    <div class="video-controls">
      <a href @click.prevent="prevVideo">
        <img width="22" height="22" alt="Back Icon" :src="BackBtn" />
        <span>Previous</span>
      </a>
      <a href v-if="state.playing" @click.prevent="Playpause">
        <img width="22" height="22" alt="Pause Icon" :src="PauseBtn" />
        <span>Pause</span>
      </a>
      <a href v-else @click.prevent="Playpause">
        <img width="22" height="22" alt="Play Icon" :src="PlayBtn" />
        <span>Play</span>
      </a>
      <a href @click.prevent="nextVideo">
        <img width="22" height="22" alt="Foward Icon" :src="FwdBtn" />
        <span>Next</span>
      </a>
    </div>
  </main>
</template>

<style scoped>
.video-controls {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.video-controls a {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column nowrap;
  transition: background-color 0.2s ease-in-out;
  color: var(--vt-c-white);
}
.progress-bar {
  background-color: var(--color-blue-shade);
}

h1 {
  font-size: 1rem;
  color: var(--vt-c-white);
  font-weight: bold;
  margin-bottom: 0;
  padding: 0.5rem;
}

.table-of-contents {
  position: relative;
  height: 100%;
  background-color: var(--color-blue-shade);
  padding: 25px 10px 100px;
  z-index: 2;
}
.table-of-contents ul {
  list-style: none;
  padding: 0;
  margin: 0;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-evenly;
  align-items: center;
  margin: 0 20%;
}
.table-of-contents ul li a {
  font-weight: bold;
  color: var(--vt-c-white);
  font-size: 22px;
  line-height: 1.2;
  letter-spacing: -.31px;
  text-shadow: -1px 1px 8px rgba(0, 31, 61, 0.75);
}

.table-of-contents ul li a:before {
  content: '';
  display: inline-block;
  height: 22px;
  width: 22px;
  margin-right: 10px;
  vertical-align: middle;
  background-image: url(../assets/play-circle.svg);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.video-controls a span{
  font-family: 'Avenir Next', sans-serif;
  font-weight: 300;
  font-size: 11px;
  letter-spacing: -.2px;
}

</style>
