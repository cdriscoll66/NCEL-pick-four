<script setup>
  import { reactive, ref, onMounted, computed } from 'vue'
  import { gamesStore } from '@/store/GamesStore'
  
  import PlayBtn from '../assets/play.svg'
  import PauseBtn from '../assets/pause.svg'
  import FwdBtn from '../assets/arrow-square-right.svg'
  import BackBtn from '../assets/arrow-square-left.svg'
  import VideoPlayer from '../components/VideoPlayer.vue'
  import ProgressBar from '../components/ProgressBar.vue'
  import { ClickSound } from '../composables/sfx'
  import BgStars from '../components/BgStars.vue'
  
  const emit = defineEmits(['music', 'musicplaypause'])
  
  const store = gamesStore()
  
  onMounted(() => {
    emit('music', '/audio/3FunkShortVersion.mp3')  
  });
  
  
  
  
  const state = reactive({
    subject: 0,
    video: 0,
    playing: true,
    showEnding: false,
    tuts: [
      {
        subject: 'Ways to Win',
        videos: [
          {
            id: 1,
            title: 'Prizes',
            video: '/video/01-01.mp4',
            length: 15.04,
            marker: 0,
          },
          {
            id: 2,
            title: 'Exact',
            video: '/video/01-02.mp4',
            length: 10.026667,
            marker: 0,
          },
          {
            id: 3,
            title: 'Any Order',
            video: '/video/01-03.mp4',
            length: 10.538667,
            marker: 0,
          },
          {
            id: 4,
            title: 'Fireball',
            video: '/video/01-04.mp4',
            length: 14.037,
            marker: 0,
          },
        ],
      },
      {
        subject: 'How to Play',
        videos: [
          {
            id: 5,
            title: 'Playslip',
            video: '/video/02-01.mp4',
            length: 9.49,
            marker: 0,
          },
          {
            id: 6,
            title: 'Play Type',
            video: '/video/02-02.mp4',
            length: 7.1467,
            marker: 0,
          },
          {
            id: 7,
            title: 'Selecting Numbers',
            video: '/video/02-03.mp4',
            length: 6.12,
            marker: 0,
          },
          {
            id: 8,
            title: 'Quick Pick',
            video: '/video/02-04.mp4',
            length: 10.03,
            marker: 0,
          },
          {
            id: 9,
            title: 'Selecting Drawings',
            video: '/video/02-05.mp4',
            length: 7.14667,
            marker: 0,
          },
          {
            id: 10,
            title: 'Wager',
            video: '/video/02-06.mp4',
            length: 12.032,
            marker: 0,
          },        
          {
            id: 11,
            title: 'Fireball',
            video: '/video/02-07.mp4',
            length: 15.04,
            marker: 0,
          },
        ],
      },
      {
        subject: 'Ticket Details',
        videos: [
          {
            id: 12,
            title: 'Ticket Front',
            video: '/video/03-01.mp4',
            length: 16.02,
            marker: 0,
          },
          {
            id: 13,
            title: 'Ticket Back',
            video: '/video/03-02.mp4',
            length: 8.02,
            marker: 0,
          },
        ],
      },
      {
        subject: 'Check Results',
        videos: [
        {
            id: 14,
            title: 'Find Results',
            video: '/video/04-01.mp4',
            length: 21.0347,
            marker: 0,
          }
        ],
      },
    ],
  })
  
  const plvid = ref(null);
  let preloadVid = computed(() => {
    if (    
      state.video + 1 >= state.tuts[state.subject].videos.length &&
      state.subject + 1 == state.tuts.length
    ) {
      return
    } else if (state.video + 1 >= state.tuts[state.subject].videos.length) {
      return state.tuts[state.subject + 1].videos[0].video
    } else {
      return state.tuts[state.subject].videos[state.video + 1].video
    }
  })
  
  const nextVideo = () => {
    plvid.value.load();
    if (    
      state.video + 1 >= state.tuts[state.subject].videos.length &&
      state.subject + 1 == state.tuts.length
    ) {
      state.showEnding = true
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
      console.log('beginning of tutorial')
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
    if (!store.ismuted) {ClickSound()}
    state.playing = !state.playing
    emit('musicplaypause', state.playing)
  }
  
  const handleToc = (i) => {
    if (!store.ismuted) {ClickSound()}
    state.subject = i
    state.video = 0
    state.playing = true
    store.showtoc = false
    state.showEnding = false
    emit('music', '/audio/3FunkShortVersion.mp3')
  }
  
  const handleRestart = () => {
    if (!store.ismuted) {ClickSound()}
    state.subject = 0
    state.video = 0
    state.playing = true
    store.showtoc = false
    state.showEnding = false
    emit('music', '/audio/3FunkShortVersion.mp3')
  }
  </script>
  
  <template>
    <div class="ending__container" v-if="state.showEnding">
        <div class="ending__content">
          <div class="btns">
      <a href @click.prevent="handleRestart" class="accent-button one-line">
        <div>
          <span class="button__title">Watch Again</span>
        </div>
      </a>
                  <RouterLink to="/game"  class="accent-button one-line">
        <div>
          <span class="button__title">Play the Demo</span>
        </div>
                  </RouterLink>
          <a href="https://nclottery.com/wheretoplay" target="_blank" class="accent-button one-line">
        <div>
          <span class="button__title">Locate a Retailer</span>
        </div>
      </a>
      </div>
        </div>
    <BgStars />
    </div>
    <main v-else>
      <BgStars gray="true"/>
      <div v-show="(store.showtoc)" class="table-of-contents">
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
        v-show="!store.showtoc"
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
      <video :id="state.tuts[state.subject].videos[state.video].id" width=0 height=0 ref="plvid" muted preload>
        <source :src='preloadVid' type="video/mp4">
      </video>
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
  .video-controls a span{
    font-family: 'Avenir Next', sans-serif;
    font-weight: 300;
    font-size: 11px;
    letter-spacing: -.2px;
  }
  
  .progress-bar {
    background-color: var(--color-blue-dark);
    min-height: 54px;
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
    background-color: var(--color-blue-dark);
    padding: 10px;
    z-index: 2;
  }
  .table-of-contents ul {
    list-style: none;
    padding: 0;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: flex-start;
    margin: 0 20%;
  }
  
  .table-of-contents li {
    margin-bottom: 44px;
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
  
  .ending__container {
    height: 100%; 
  }
  
  .ending__content {
    height: 100%;
    padding-top: 60px;
    display: flex; 
    flex-flow: column nowrap;
    justify-content: center;
  }
  </style>
  