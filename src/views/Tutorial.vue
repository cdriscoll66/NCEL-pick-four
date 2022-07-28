<script setup>
import { reactive } from 'vue'

import VideoPlayer from '../components/VideoPlayer.vue'
import ProgressBar from '../components/ProgressBar.vue'

const state = reactive({
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
          length: 26.639,
          marker: 0,
        },
        {
          id: 2,
          title: 'Video two',
          video: '/video/02.mp4',
          length: 11.8,
          marker: 0,
        },
        {
          id: 3,
          title: 'Video three',
          video: '/video/03.mp4',
          length: 15.431,
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
          length: 10.487,
          marker: 0,
        },
        {
          id: 5,
          title: 'Video five',
          video: '/video/05.mp4',
          length: 10.367,
          marker: 0,
        },
        {
          id: 6,
          title: 'Video six',
          video: '/video/06.mp4',
          length: 7.034,
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
        }
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
}

const handleEnd = () => {
  nextVideo()
}

const UpdateTime = (timer) => {
  let timerPercent = (timer / state.tuts[state.subject].videos[state.video].length) * 100;
   state.tuts[state.subject].videos[state.video].marker = timerPercent
}

const prevVideo = () => {
  if (state.video == 0 && state.subject == 0) {
    console.log('nothin.')
    return
  } else if (state.video - 1 < 0) {
    state.video = state.tuts[state.subject].videos.length - 1
    state.subject--
    state.playing = true
  } else {
    state.video--
    state.playing = true
  }
}

const Playpause = () => {
  state.playing = !state.playing
}
</script>

<template>
  <main>
    <div>
      <h1>{{ state.tuts[state.subject].subject }}</h1>
      <h3>{{ state.tuts[state.subject].videos[state.video].title }}</h3>
      <ProgressBar :tuts="state.tuts[state.subject]" :key="state.subject"/>
      <VideoPlayer
        :onscreen="state.tuts[state.subject].videos[state.video].video"
        :playing="state.playing"
        :key="state.video"
        @ended="handleEnd()"
        @update-time="UpdateTime"
      />
    </div>

    <button @click="prevVideo">Previous Video</button>

    <button v-if="state.playing" @click="Playpause">Pause</button>
    <button v-else @click="Playpause">Play</button>

    <button @click="nextVideo">Next Video</button>
  </main>
</template>
