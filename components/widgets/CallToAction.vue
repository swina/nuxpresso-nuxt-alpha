<template>
    <div :class="'nuxpresso-call-to-action bg-cover bg-no-repeat bg-center w-' + cta.width + ' ' + colorize + height + ' ' + cta.css || '' " :style="background">
        <div :class="'m-auto w-' + cta.content.box_width" v-if="cta">
                <div :class="'w-full flex flex-col-reverse md:flex-row flex-shrink ' + hasImage + justify ">
                    <div :class="'w-full ' + cta.content.box_css + ' ' + ctaStyle">
                        <div :class="classeOverlay('title') + ' ' +  ctaClass('title')" v-html="cta.content.title"></div>
                        <div :class="classeOverlay('subtitle') + ' ' + ctaClass('subtitle')" v-html="cta.content.subtitle"></div>
                        <div v-if="cta.content.description" :class="classeOverlay('description') + ' ' + ctaClass('description')" v-html="cta.content.description"></div>
                        <div  v-if="cta.content.button">
                            <nuxt-link
                                :to="cta.content.button_link">
                                <button :class="ctaClass('button') + btn_classe">{{cta.content.button}}</button>
                            </nuxt-link>
                        </div>
                    </div>
                    <!--
                    <div v-if="cta.content.image_for_description" :class="'flex w-full md:w-1/3 items-center justify-center ' + ctaClass('image-wrapper')">
                        <img :src="cta.content.image_for_description.url" :class="ctaClass('image')"/>
                    </div>
                    -->
                </div>
            </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'NuxpCallToAction',
    computed: {
        ...mapState ( ['theme'] ),
        cta(){
            return this.$attrs.cta
        },
        background(){
            return this.cta.content.image ? 'background-image:url(' + this.cta.content.image.url + ');' : ''
        },
        height(){
            return this.cta.fullheight ? ' h-screen ' : ''
        },
        colorize(){
            let classe = 'bg-'
            classe += 
                this.cta.content.background_color ? this.cta.content.background_color : 'transparent'
            classe +=
                this.cta.content.background_tone ? '-' + this.cta.content.background_tone : '-normal'

            classe += ' ' + this.$attrs.cta.content.css || ''
            return classe
        },
        justify(){
            return this.cta.content.image_for_description ? ' justify-around ' : ' '
        },
        hasImage(){
            return this.cta.content.image_for_description ? '' : 'flex-wrap '
        },
        ctaStyle(){
            return this.cta.style === 'horizontal' ? ' flex flex-col md:flex-row md:justify-between md:flex-shrink items-center ' : ' flex flex-col'
        },
        btn_classe(){
            let classe = this.theme.buttons_fg ? ' ' + this.theme.buttons_fg.tw_color : ' '
            classe += this.theme.buttons_bg ? ' ' + this.theme.buttons_bg.tw_color : ' '
            classe += ' ' + this.theme.buttons_bg.css +  ' ' + this.theme.buttons_fg.css
            return classe
        },
    },
    methods:{
        ctaClass(what){
            return 'nuxpresso-call-to-action-' + what + ' nuxpresso-widget-' + this.$slugify(this.$attrs.cta.name) + '-' + what
        },
        classeOverlay(element){
            let margin = this.cta.style ? this.cta.style === 'vertical' ? ' my-4 ' : '' : ''
            let base = element === 'title' ? 'text-3xl md:text-5xl font-bold ' + margin : element === 'subtitle' ? ' text-xl md:text-3xl ' + margin : ' '
            base += element === 'title' || element === 'subtitle' ?
                        this.cta.content.text_color ? ' text-' + this.cta.content.text_color + '-' + this.cta.content.text_tone : this.theme.heading_fg.tw_color :
                        this.cta.content.text_color ? ' text-' + this.cta.content.text_color + '-' + this.cta.content.text_tone : this.theme.primary_fg.tw_color

            return base
        },
    }
}
</script>