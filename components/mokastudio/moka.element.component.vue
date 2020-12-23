<template>
    <component :ref="el.id" :is="component" :style="el.style" :class="$cssResponsive(el.css)" :el="el"/> 
</template>

<script>
import MokaText from '@/components/mokastudio/elements/moka.text'
import MokaVideo from '@/components/mokastudio/elements/moka.video'
import MokaSvg from '@/components/mokastudio/elements/moka.svg'
import MokaImg from '@/components/mokastudio/elements/moka.img'
import MokaIcon from '@/components/mokastudio/elements/moka.icon'
import MokaMenu from '@/components/mokastudio/elements/moka.menu'
import MokaInput from '@/components/mokastudio/elements/moka.input'
import MokaTextarea from '@/components/mokastudio/elements/moka.textarea'
import MokaSimpleSvg from '@/components/mokastudio/elements/moka.simple.svg'
import MokaArticle from '@/components/mokastudio/elements/moka.article'
export default {
    name: 'MokaRenderElement',
    components: {
        MokaText,
        MokaVideo,
        MokaSvg,
        MokaImg,
        MokaInput,
        MokaTextarea,
        MokaSimpleSvg,
        MokaArticle
    },
    props: [ 'el' ],
    computed:{
        component(){
            let el = this.$attrs.element
            if ( ( el.tag === 'element' || el.type === 'button' ) && el.element != 'img' && el.type != 'video' && el.type != 'audio' ) {
                return MokaText
            }
            if ( el.tag === 'article' && el.type === 'element' ){
                this.$attrs.element.content = this.$attrs.article[el.label]
                return MokaText
            }
            if ( el.tag === 'article' && el.element === 'img' ){
                this.$attrs.element.image = this.$attrs.article[el.label]
                return MokaImg
            }
            if ( el.type === 'video' ) {
                return MokaVideo
            }
            if ( el.type === 'svg' ){
                return MokaSvg
            }
            if ( el.element === 'img' && el.image && el.image.url && el.image.ext != '.svg' && el.image.ext != '.mp4' ) {
                return MokaImg
            }
            if ( el.tag === 'icon' ){
                return MokaIcon
            }
            if ( el.element === 'menu' ){
                return MokaMenu
            }
            if ( el.tag === 'input' && el.type!='button' ){
                return MokaInput
            } 
            if ( el.element === 'textarea' ){
                return MokaTextarea
            }
            if ( (el.element === 'img')  && el.image && el.image.ext === '.svg' ) {
                return MokaSimpleSvg
            }
        }
    },
    
}
</script>