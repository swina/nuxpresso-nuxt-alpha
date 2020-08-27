<template>
<div class="relative h-64 md:h-screen overflow-none" :style="'min-height:' + height + 'height:' + height" id="nxslider">
    <transition-group name="slide"
      mode="out-in"
      enter-class="slide-in"
      leave-class="slide-out"
      enter-active-class="animated slide-in-active"
      leave-active-class="animated slide-out-active">
        <div :key="'slide_' + i" v-for="(slide,i) in $attrs.slides" :class="'relative w-full flex items-center bg-center bg-no-repeat bg-cover nuxpresso-slider h-full ' + currentBackground" :style="'min-height:' + height + ' ' + bgSlide(slide)" v-if="currentIndex === i">
            <div :class="'centered absolute w-' + slide.box_width + ' ' + boxCss(slide)">
                <div :class="'w-full flex flex-col-reverse md:flex-row flex-shrink flex-wrap ' + justify(slide)">
                    <div>
                        <h2 :class="classeOverlay(slide,'title') + ' ' +  sliderClass('title',i)" v-html="slide.title"></h2>
                        <h3 :class="classeOverlay(slide,'subtitle') + ' ' + sliderClass('subtitle',i)">{{slide.subtitle}}</h3>
                        <p v-if="slide.description" :class="classeOverlay(slide,'description') + ' ' + sliderClass('description',i)">{{slide.description}}</p>
                        <div class="mt-4" v-if="slide.button">
                            <nuxt-link
                                :to="slide.button_link">
                            <button :class="sliderClass('button',i) + btn_classe + ' '">{{slide.button}}</button>
                            </nuxt-link>
                        </div>
                    </div>
                    
                    <div v-if="slide.image_for_description" :class="'flex items-center justify-center ' + sliderClass('image-wrapper',i)">
                        <img :src="slide.image_for_description.url" :class="sliderClass('image',i)"/>
                    </div>
                    
                </div>
            </div>
            
        </div>
    </transition-group>
    <div class="mb-8 absolute left-0 bottom-0 w-full m-auto flex flex-row justify-center">
        <div v-for="i in $attrs.slides.length" :class="'nuxpresso-slider-dots ' + dotBG(i-1)" @click="goto(i-1)" :title="$attrs.slides[i-1].title"></div>
    </div>
    <div style="top:50%;transform:translateY(-50%)" class="z-50 cursor-pointer p-0 md:p-2 absolute md:opacity-0 hover:opacity-100">
        <i class="material-icons text-3xl md:text-5xl text-white cursor-pointer bg-gray-400 rounded-full hover:bg-black hover:text-white" @click="prev">
            <span  v-if="$attrs.slider.navigator_icon">{{$attrs.slider.navigator_icon.split(',')[0]}}</span>
            <span v-else>chevron_left</span>
        </i>
    </div>
    <div style="top:50%;right:0;transform:translateY(-50%)" class="p-0 md:p-2 absolute md:opacity-0 hover:opacity-100">
        <i class="material-icons text-3xl md:text-5xl text-white cursor-pointer bg-gray-400 rounded-full hover:bg-black hover:text-white" @click="next">
            <span v-if="$attrs.slider.navigator_icon">{{$attrs.slider.navigator_icon.split(',')[1]}}</span>
            <span v-else>chevron_right</span>
        </i>
    </div>
    <!--
    <div v-if="$attrs.slides && slide && height" id="nxslider" :class="'h-screen relative md:h-auto w-full flex items-center bg-center bg-no-repeat bg-cover slide-in nuxpresso-slider ani ' + currentBackground" :style="'min-height:' + height +  currentImg">
        <transition name="slideright">
        <div :class="'ani-slide w-4/5 md:m-0 md:w-3/4 lg:w-4/5 absolute p-2 md:p-10 ' + boxCss">
            <div :class="'w-full flex flex-col-reverse md:flex-row flex-shrink flex-wrap ' + justify">
                <div>
                    <h2 :class="classe('text','heading_fg') + ' ' + sliderClass('title')">{{slide.title}}</h2>
                    <h3 :class="classe('text','heading_fg') + ' ' + sliderClass('subtitle')">{{slide.subtitle}}</h3>
                    <p v-if="slide.description" :class="classe('text','primary_fg') + ' ' + sliderClass('description')">{{slide.description}}</p>
                    <div class="mt-4" v-if="slide.button">
                        <nuxt-link
                            :to="slide.button_link">
                        <button :class="sliderClass('button')">{{slide.button}}</button>
                        </nuxt-link>
                    </div>
                </div>
                
                <div v-if="slide.image_for_description" :class="'flex items-center justify-center ' + sliderClass('image-wrapper')">
                    <img :src="slide.image_for_description.url" :class="sliderClass('image')"/>
                </div>
            </div>
        </div>
        </transition>
        <div style="top:50%;transform:translateY(-50%)" class="p-2 absolute">
            <i class="material-icons text-5xl text-white cursor-pointer" @click="prev">
                <span  v-if="$attrs.slider.navigator_icon">{{$attrs.slider.navigator_icon.split(',')[0]}}</span>
                <span v-else>chevron_left</span>
                </i>
        </div>
        <div style="top:50%;right:0;transform:translateY(-50%)" class="p-2 absolute">
            <i class="material-icons text-5xl text-white cursor-pointer" @click="next">
                <span v-if="$attrs.slider.navigator_icon">{{$attrs.slider.navigator_icon.split(',')[1]}}</span>
                <span v-else>chevron_right</span>
            </i>
        </div>
        <div v-if="$attrs.slider.miniature" class="hidden md:flex flex-row absolute m-auto text-center items-center justify-center w-full bottom-0">
            <div v-for="(img ,n) in $attrs.slides">
                <div :key="'miniature_' + n" v-if="!img.image" class="h-12 w-16 bg-black text-xs"  @click="goto(n)">SLIDE {{n}}</div> 
                <img :key="'miniature_' + n" v-if="img.image" :src="img.image.url" class="h-12 w-16"  @click="goto(n)"/>
            </div>
        </div>
    </div>
    -->
</div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: "NuxpSliderPro",
    data:()=>({
        images: [],
        timer: null,
        delay: 4000,
        index:0,
        currentIndex: 0,
        height: '35rem',
        slide: null,
    }),

    mounted() {
        this.slide = this.$attrs.slides[0]
        //this.images = this.$attrs.slides.map( slide => { return slide.image.url } )
        if ( this.$attrs.slider.autoplay )
            this.startSlide()
        //this.reSize()
        let offset = document.querySelector('header').clientHeight
        this.height = window.innerHeight - parseInt(offset) + 'px;'
        let vm = this
        window.addEventListener('resize', function() {
            vm.reSize()
        })
    },



    methods: {
        reSize(){
            let offset = document.querySelector('header').clientHeight
            this.height = window.innerHeight - parseInt(offset) + 'px;'
        },
        startSlide: function() {
            this.timer = setInterval(this.next, this.$attrs.slider.delay ? parseInt(this.$attrs.slider.delay)*1000 : this.delay);
        },
        bgSlide(slide){
            return  slide.image ? ' background-image:url(' + slide.image.url + ') ;' : ''
        },
        boxCss(slide){
            let classe = slide.box_background ? this.$colorClass('bg',slide.box_background ,slide.box_background_tone) + ' ' : ''
            classe += slide.box_opacity ? 'bg-opacity-' + slide.box_opacity + ' ' : ''
            classe += slide.box_css ? slide.box_css : '' 
            if ( classe ) return classe
            return 'bg-black bg-opacity-75 rounded-lg shadow'
        },
        justify(slide){
            return slide.image_for_description ? 'justify-around' : ''
        },
        classe(type,element){
            let cl = this.theme[element] ? this.$colorClass(type,this.theme[element].color , this.theme[element].density ) : ''
            return cl
            
        },
        classeOverlay(slide,element){
            let base = element === 'title' ? 'text-3xl md:text-5xl font-bold ' : element === 'subtitle' ? ' text-xl md:text-3xl ' : ''
            base += slide.text_color ?
                this.$colorClass('text',slide.text_color,slide.text_tone) :
                    classe('text','heading_fg')
            return base
        },
        sliderClass(what,index){
            return 'nuxpresso-slider-pro-' + what + ' nuxpresso-widget-' + this.$slugify(this.$attrs.name) + '-' + what + ' nuxpresso-slider-pro-' + what + '-slide-' + index
        },
        next: function() { 
            this.currentIndex < (this.$attrs.slides.length-1) ?
                this.currentIndex += 1 :
                    this.currentIndex = 0
            
        },
        prev: function() {
            this.currentIndex -= 1;
            if ( this.currentIndex < 0 )
                this.currentIndex = this.$attrs.slides.length-1
            //this.currentIndex -= 1;
            //this.index = Math.abs(this.currentIndex) % this.$attrs.slides.length
            //this.slide = this.$attrs.slides[this.index]
        },
        goto(n){
            this.currentIndex = n
            this.index = n
            this.slide = this.$attrs.slides[n]
        },
        dotBG(i){
            return i === this.currentIndex ? 'nuxpresso-slider-dot-active animate-ping' : ''
        }
    },
    destroyed(){
        clearInterval(this.timer)
    },
    computed: {
         ...mapState ( ['theme'] ),
        
        currentImg: function() {
            return  this.slide.image ? 'opacity:0;background-image:url(' + this.slide.image.url + ') ;opacity:1;' : ''
        },
        currentBackground(){
            if ( this.slide )
            return this.slide.background_color ? this.$colorClass ( 'bg' , this.slide.background_color , this.slide.background_tone ) : 'bg-black'
        },
        btn_classe(){
            let classe = this.theme.buttons_fg ? ' ' + this.theme.buttons_fg.tw_color : ' '
            classe += this.theme.buttons_bg ? ' ' + this.theme.buttons_bg.tw_color : ' '
            classe += ' ' + this.theme.buttons_bg.css +  ' ' + this.theme.buttons_fg.css
            return classe
        },
        
        
    }
};
</script>

<style scoped>
.animated {
    transition: all .8s;
    position: absolute;
    transform: translateX(0);
  }
  
  .slide-in {
    opacity: 0;
    transform: translateX(50%);
  }
  
  .slide-in-active {
    transition-delay: 150ms;
  }
  
  .slide-out {
    opacity: 1;
  }
  
  .slide-out-active {
    opacity: 0;
    transform: translateX(0);
  }
.centered {
    top:50%;
     left:50%;
    transform: translate(-50%,-50%)
}
.ani {
    cursor:pointer;
    transition: all 1s ease-in;
}
.ani-slide {
     top:50%;
     left:50%;
     transform: translate(-50%,-50%);
}
@keyframes slideRight {
    0% {
        transform: translate(0,-50%);
    }
    100% {
        transform: translate(-50%,-50%);
    }
}

.animate-ping {
    animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
}
@keyframes ping {
  0% {
    transform: scale(1);
    background:rgb(0, 0, 0);
    opacity: 1;
  }
  75%, 100% {
    transform: scale(1.5);
    background:rgb(0, 0, 0);
    opacity: 0;
  }
}

.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

    @keyframes pulse {
        0%, 100% {
            opacity: 1;
            background:rgb(7, 7, 7);
        }
        50% {
            opacity: .5;
            background:rgb(255, 255, 255);
        }
    }
</style>