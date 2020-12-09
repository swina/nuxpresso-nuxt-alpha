<template> 
<div v-if="doc" :class="doc.css + ' w-screen'" :style="stile(doc) + ' ' + background(doc)" id="content">
    <div v-for="(block) in doc.blocks" :class="responsive(block.css.css) + ' ' + block.css.container" :style="stile(block) + background(block)" :id="block.anchor" :key="block.id" :ref="block.id">
        
        <div container v-if="!block.hasOwnProperty('slider')" v-for="(row) in block.blocks" :class="'flex flex-col relative ' + responsive(row.css)" :style="stile(row) + background(row)" :id="row.anchor" :key="row.id" :ref="row.id">
    

            <div v-if="row.image && row.image.ext==='.mp4'">
                 <video :poster="row.image.previewUrl" :class="'absolute top-0 left-0 z-1 object-cover ' + row.css"  autoplay loop>
                    <source :src="row.image.url">
                </video>
            </div>

            <div elements v-for="(element) in row.blocks" v-if="!row.hasOwnProperty('slider')" :key="element.id" :ref="element.id" :class="$layer(element)" class="z-2">
                
                <moka-element
                    :article="$attrs.article"
                    :element="element"
                    v-if="element.type!='grid' && element.type != 'flex' && !row.hasOwnProperty('slider')" 
                    :coords="[]"
                    :loop="$attrs.loop"
                    :develop="false"/>
                <div flex v-else :class="responsive(element.css.css) + ' text-base ' + element.css.container" :style="stile(element) + ' ' + background(element)">
                    
                    <moka-element
                        :article="$attrs.article"
                        :sub="true"
                        :key="el.id"
                        :element="el"
                        v-if="!el.hasOwnProperty('blocks')"
                        v-for="el in element.blocks"
                        :coords="[]"
                        :loop="$attrs.loop"
                        :develop="false"/>

                    <div v-for="(subrow) in element.blocks" :class="responsive(subrow.css)" :style="stile(subrow) + background(subrow)" :key="subrow.id" v-if="!element.loop && element.type!='flex'" :ref="subrow.id">
                        
                        <div v-for="(subelement) in subrow.blocks" :key="subelement.id">
                            <moka-element 
                                :article="$attrs.article"
                                :sub="true"
                                :element="subelement" 
                                v-if="subelement.type!='grid'" 
                                :coords="[]"
                                :develop="false"/>
                        </div>
                    </div>
                </div>
                    
                <div v-if="element.loop">
                    <moka-articles-loop :blocks="element"/>
                </div>
            </div>
    
        </div>
        
        <moka-slider v-if="block.hasOwnProperty('slider')" :embeded="true" :doc="block"/>     
    </div>
</div>
</template>

<script>
import MokaElement from '@/components/moka/moka.element'
import MokaSlider from '@/components/moka/moka.preview.slider'
import MokaArticlesLoop from '@/components/moka/moka.preview.articles.loop'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin ( ScrollTrigger )
const plugins = [ScrollTrigger];
import gsapEffects from '@/plugins/animations'

export default {
    name: 'MokaPreview',
    data:()=>({
        printScreen: null
    }),
    components: { 
        MokaSlider ,
        MokaElement,
        MokaArticlesLoop
    },
    computed:{
        animations(){
            return gsapEffects
        }
    },
    props: [ 'doc' ],
    methods: {
        responsive(css){
            return this.$clean ( this.$cssResponsive ( css ) )
        },
        stile(block){
            let stl = ''
            if ( block.hasOwnProperty('fontFamily') ){
                stl += 'font-family:"' + block.fontFamily + '"'
            }
            stl += block.hasOwnProperty('style') ? block.style : ''
            return stl
        },
        background(block){
            return block.hasOwnProperty('image') ?
                block.image ? 
                    ' background-image:url(' + block.image.url + ');' : '' : ''
        },
        
       
        animate(element,id   ){
                let vm = this
                !element.hasOwnProperty ( 'gsap' ) ?
                    element.gsap  = {
                        animation: '',
                        duration: .7,
                        delay:0,
                        ease:'none'
                    } : null         
                let ani = gsap.effects[element.gsap.animation]( this.$refs[id] ,{
                    trigger: this.$refs[id],
                    duration: parseFloat(element.gsap.duration),
                    delay: parseFloat(element.gsap.delay),
                    ease: element.gsap.ease
                })

                //let ani = gsap.effects[element.animation]( this.$refs[id] ) 
                
                ScrollTrigger.create({
                    id: id,
                    start: "top 99%",
                    trigger: this.$refs[id],
                    toggleActions: "play pause restart none",
                    animation:ani,
                    onEnter: ()=>{ 
                        if ( element.gsap.delay ){
                            ani.play()
                        } else {
                            ani.play(0)
                        }
                    }
                    
                });
                
        },
        start(){
            console.log ( 'started' , new Date() )
        },
        animateSub(doc){
            doc.blocks.forEach ( block => {
                if ( block.hasOwnProperty('gsap') && block.gsap.animation  ){
                    this.animate(block, block.id)
                }
                if ( block.hasOwnProperty('blocks') ){

                    block.blocks.forEach ( el => {
                        if ( el.hasOwnProperty('gsap') && el.gsap.animation ){
                            console.log ( el.id , 'subelement')
                            this.animate ( el , el.id   )
                        }
                    })
                }
            })
        }
    },
    mounted(){
        if ( process.client ){
        window.scrollTo(0,0)

        this.doc.blocks.forEach ( block => {
            if ( block.hasOwnProperty('gsap') && block.gsap.animation  ){
                this.animate(block, block.id)
            }
            block.blocks.forEach ( container => {
                if ( container.hasOwnProperty('gsap') && container.gsap.animation ){
                    this.animate ( container , container.id )
                }
                container.blocks.forEach ( el => {
                    if ( el.hasOwnProperty('gsap') && el.gsap.animation ){
                        this.animate ( el , el.id   )
                    }
                    
                    
                })
            })
        })
        }
    }

}
</script>
