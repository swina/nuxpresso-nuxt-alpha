<template>
  <div id="nuxpresso-page">
    <div id="nuxpresso-layout" v-if="theme && !devToolsOpen" :class="theme.main_bg ? $colorize(theme,'main_bg') : ''">
      
      <Header :class="isHeaderFixed"/>
      
      <Section id="section"/>
      
      <Footer/>
      
      <ScrollTop v-if="settings.scrolltop"/>
      
      
    </div>
    <div class="hidden md:block fixed top-0 left-0 p-1 text-white cursor-pointer z-50" 
      v-if="devtools && !devToolsOpen" @click="isLogged">
      <i class="material-icons bg-gray-700 text-white " title="Customizer">select_all</i>
      
    </div>
    <div v-if="devToolsOpen" class="flex flex-row w-full relative">
      
      <div class="w-1/4"></div>
      <div id="nuxpresso-layout" :class="mainClass + ' w-3/4'">
      
        <Header :class="isHeaderFixed"/>
        
        <Section id="section"/>
        
        <Footer/>
        <ScrollTop v-if="settings.scrolltop"/>
        
        
        
      </div>
    </div>
    <transition name="fade" v-if="devToolsOpen">
        <div class="fixed z-50 top-0 left-0 w-1/4 shadow-xl">
          <div class="w-ful flex flex-row items-center cursor-pointer bg-gray-700 border-b-2 border-blue-300 text-white">
            <i class="material-icons text-white cursor-pointer m-1" @click="devToolsOpen=!devToolsOpen">chevron_left</i><span class="text-sx ml-4 uppercase ">c u s t o m i z e r</span>
          </div>
          <nuxpresso-customizer @login="login=true"/>
          
        </div>
      </transition>
      <nuxpresso-login v-if="login" @close="login=false"/>
    <Startup v-if="startup"/>
    
    <nuxpresso-privacy v-if="theme.GPDR"/>
    
  </div>
</template>

<script>
import Header from '@/components/parts/Header'
import Section from '@/components/parts/Section'
import Footer from '@/components/parts/Footer'
import ScrollTop from '@/components/ui/ScrollTop'
import NuxpressoCustomizer from '@/components/customizer/Customizer'
import NuxpressoLogin from '@/components/widgets/Login'
import NuxpressoPrivacy from '@/components/widgets/GPDR'

import { mapState } from 'vuex'
export default {
  middleware: 'load-initial-data',
  name: 'NuxpLayout',
  data:()=>({
    customizer: null,
    devtools: null,
    devToolsOpen: false,
    startup: null,
    login:false,
    checkIsLogged: false,
    hasGPDR: true
  }),
  computed:{
    ...mapState ( [ 'settings','menus','widgets','categories','theme' , 'current_article']),
    mainClass(){
      return this.theme.main_bg ? this.$colorize(this.theme,'main_bg') : ''
    },
    isHeaderFixed(){
      let devClass = this.devToolsOpen ? 'w-3/4' : 'w-full'
      return this.theme.header_fixed ? 'fixed top-0 z-20 ' + devClass : ''
    },
    

  },
  components: {
      Header, Section , Footer , ScrollTop , NuxpressoCustomizer , NuxpressoLogin , NuxpressoPrivacy
  },
  methods: {

    isLogged(){
      if ( window.localStorage.getItem('nuxpresso-jwt') ){
        this.devToolsOpen = true 
        this.checkIsLogged = true
      } else {
        this.devToolsOpen=false
        this.login = true
        this.checkIsLogged = false
      }
    }
  },
  mounted(){
    const isDev = process.env.NODE_ENV !== 'production'
    if ( isDev ){
      this.devtools = true 
    }
    if ( typeof this.theme === 'undefined'  || !this.settings  ){
      if ( isDev ){
        this.startup = true
      }
    }
    if ( process.client ){
        if ( this.theme.header_fixed ){
            let offset = document.querySelector('header').clientHeight
            this.$store.dispatch ( 'header_offset' , 'margin-top:' + parseInt(offset) + 'px;' )
        }
    }
  }
 
}

</script>
