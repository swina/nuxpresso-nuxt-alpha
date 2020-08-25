<template>
    <div v-if="$attrs.video" :class="$attrs.classe + ' nuxpresso-16-9'">
        <iframe v-if="youtube" :class="'nuxpresso-video ' + $attrs.classe" :src="'https://www.youtube.com/embed/' + embed + '?rel=0'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <iframe v-if="vimeo" :src="'https://player.vimeo.com/video/' + embed" :class="'nuxpresso-video w-full h-full ' + $attrs.classe" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
        <!--
        <div v-if="!youtube && !vimeo" :class="'p-video-player nuxpresso-video ' + $attrs.classe">
            <video class="p-video-player__media w-full h-full">
                <source :src="$attrs.video" />
            </video>
            <div class="p-video-player__seekbar-wrap" id="video-player-media" @mousedown="grabSeekbar" @touchstart="grabSeekbar" @touchmove="moveSeekbar" @touchend="releaseSeekbar">
              <div class="p-video-player__seekbar-current" :style="{ transform: &quot;scaleX(&quot; + getProgressRate + &quot;)&quot; }"></div>
              <div class="p-video-player__seekbar-back"></div>
            </div>
        </div>
        <div v-if="!youtube && !vimeo" class="p-video-player__control-panel">
            <button class="p-video-player__btn" @click="playOrPause">{{ isPlaying ? 'pause' : 'play' }}</button>
            <button class="p-video-player__btn" @click="stop">stop</button>
            <div class="p-video-player__time-wrap">
                <span class="p-video-player__time-current">
                {{ getCurrentTime }}
                </span>/
                <span class="p-video-player__time-all">{{ getDuration }}</span>
            </div>
        </div>
        -->
    </div>
</template>

<script>
var video_id
export default {
    name: 'NuxpVideo',
    data:()=>( {
      videoID: null,
      youtube: false,
      vimeo: false,
      media: null,
      seekbar: null,
      seekbarWidth: 0,
      seekbarOffsetX: 0,
      time: 0,
      //height:'min-height:20rem;',
      duration: 0,
      isPlaying: false,
      isGrabbingSeekbar: false,
      element: null
    }),
    beforeMount(){
      this.$attrs.video.indexOf('youtube') > -1 ? this.youtube = true : this.custom = true
      this.$attrs.video.indexOf('vimeo') > -1 ? this.vimeo = true : this.custom = true
    },
    mounted: function() {
      if ( this.$attrs.video ){
        
        if ( !this.youtube && !this.vimeo ){
          this.media = this.$el.querySelector('.p-video-player__media');
          this.seekbar = this.$el.querySelector('.p-video-player__seekbar-wrap');
          this.reLayoutSeekbar();

          // addEventListener
          window.addEventListener('resize', this.$debounce(() => {
            let w = document.getElementById(this.videoID)
            this.height = w ? ((w.clientWidth)*9/16) + 'min-height:px;' : 'min-height:35rem;'
            this.reLayoutSeekbar();
          }), 100);

          document.addEventListener('mousemove', (event) => {
            this.moveSeekbar(event);
          });
          document.addEventListener('mouseup', (event) => {
            this.releaseSeekbar(event);
          });
          this.media.addEventListener('loadedmetadata', () => {
            this.duration = this.media.duration;
          });
          this.media.addEventListener('ended', () => {
            this.media.currentTime = 0;
            this.isPlaying = false;
          });
        }
      }
    },
    computed: {
      size(){
        return this.$attrs.size && this.$attrs.size.split('x') ? 'width:' + this.$attrs.size.split('x')[0] + 'px;height:' + this.$attrs.size.split('x')[1] + 'px; ' : ''
      },
      embed(){
          if ( this.$attrs.video.indexOf('youtube') > -1 ){
            return this.$attrs.video.split('=')[1] 
          } 
          if ( this.$attrs.video.indexOf('vimeo') ) {
            return this.$attrs.video.split('/')[this.$attrs.video.split('/').length-1]
          }
          return this.$attrs.video
      },
      
      getProgressRate: function() {
        return this.time / this.duration;
      },
      getCurrentTime: function() {
        return this.convertSecondsToTime(this.time);
      },
      getDuration: function() {
        return this.convertSecondsToTime(this.duration);
      },
    },
    methods: {
     
      play: function() {
        this.media.play();
        this.isPlaying = true;
        this.loop();
      },
      pause: function() {
        this.media.pause();
        this.isPlaying = false;
      },
      playOrPause: function() {
        if (this.isPlaying) {
          this.pause();
        } else {
          this.play();
        }
      },
      stop: function() {
        this.media.currentTime = 0;
        this.pause();
      },
      loop: function() {
        this.time = this.media.currentTime;
        if (!this.isPlaying) return;
        requestAnimationFrame(() => {
          this.loop();
        });
      },
      grabSeekbar: function(event) {
        event.preventDefault();
        this.isGrabbingSeekbar = true;
        this.time = this.media.currentTime = event.layerX / this.seekbarWidth * this.duration;
        this.media.pause();
      },
      moveSeekbar: function(event) {
        event.preventDefault();
        if (!this.isGrabbingSeekbar) return;
        this.time = this.media.currentTime =
          (event.clientX - this.seekbarOffsetX - window.pageXOffset)
          / this.seekbarWidth * this.duration;
      },
      releaseSeekbar: function(event) {
        event.preventDefault();
        this.isGrabbingSeekbar = false;
        if (this.isPlaying) {
          this.media.play();
        }
      },
      reLayoutSeekbar: function() {
        this.seekbarWidth = this.seekbar.clientWidth;
        this.seekbarOffsetX = this.seekbar.getBoundingClientRect().left;
      },
      convertSecondsToTime: function(time) {
        let seconds = Math.floor(time % 60);
        if (seconds < 10) seconds = '0' + seconds;
        let minutes = Math.floor(time / 60 % 60);
        return `${minutes}:${seconds}`
      },
    }
}
</script>

<style scoped>

.p-video-player__media {
  width: 100%;
  display: block;
}
.p-video-player__seekbar-wrap {
  cursor: pointer;
  position: relative;
  margin-bottom: 10px;
  padding: 10px 0;
}
.p-video-player__seekbar-current, .p-video-player__seekbar-back {
  height: 3px;
  position: absolute;
  top: 10px;
  right: 0;
  left: 0;
}
.p-video-player__seekbar-current {
  z-index: 2;
  background-color: #111;
  transform: scaleX(0);
  transform-origin: left;
}
.p-video-player__seekbar-back {
  background-color: #ddd;
}
.p-video-player__control-panel {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.p-video-player__btn {
  width: 5em;
  margin-right: 2px;
  padding: 0.5em 0;
}
.p-video-player__time-wrap {
  margin-left: 1em;
}
.p-video-player__time-current {
  margin-right: 0.25em;
}
.p-video-player__time-all {
  margin-left: 0.25em;
}
</style>