<template>
    <div class="flex flex-col md:flex-row justify-around flex-wrap">

        <div v-if="$attrs.component.vertical && isModal" :key="'multibox_' + i" :class="$attrs.widget.class + ' nuxpresso-multi-box-wrapper ' + classe" v-for="(feature,i) in items">
            <transition name="fade">
            <div class="nuxpresso-multi-box flex-1">
                <i v-if="$attrs.component.class.indexOf('nuxpresso-modal') > -1" class="z-50 material-icons cursor-pointer absolute top-0 right-0" @click="isModal=!isModal">highlight_off</i>
                <div :class="'flex flex-col w-full h-full nuxpresso-multi-box-content ' + $attrs.component.class">
                    <img v-if="feature.image" :src="feature.image.url" class="nuxpresso-box-image"/>
                    <i slot="line_1" v-if="feature.material_icon" style="font-size:3rem;" class="nuxpresso-box-icon material-icons">{{feature.material_icon}}</i>
                    <h3 :class="theme.heading_fg.tw_color + ' font-black nuxpresso-box-title'" slot="line_2">{{feature.title}}</h3>

                    <h3 class="nuxpresso-box-price" slot="line_3" v-if="feature.price">
                        <span v-if="feature.sale" class="line-through text-xs">{{feature.price}}</span>
                        <span v-else>{{feature.price}}</span>
                        <span v-if="feature.sale" class="nuxpresso-box-sale">{{features.sale}}</span>
                    </h3>
                    
                    <p v-if="feature.subtitle"  class="nuxpresso-box-subtitle" slot="line_3">{{feature.subtitle}}</p>
                    
                    <p :key="'line_' + l" class="nuxpresso-box-multiline" slot="line_4" v-for="(line,l) in multiline(feature.description)">{{line}}</p>

                    <div v-if="feature.button"  class="nuxpresso-box-button" slot="line_5">
                        <nuxt-link 
                            v-if="feature.link"
                            :to="feature.link">
                            <button :class="btn_classe">{{ feature.button }}</button>
                        </nuxt-link>
                        <button :class="btn_classe" v-else>{{ feature.button }}</button>
                    </div>
                </div>
            </div>
            </transition>
        </div>

        <div v-if="!$attrs.component.vertical && isModal" :key="'multibox_' + i" :class="$attrs.widget.class + ' nuxpresso-multi-box-wrapper ' + classe" v-for="(feature,i) in items">
            <transition name="fade">
            <div :class="'flex-1 flex flex-col md:flex-row  ' + $attrs.component.class + reverse + ' nuxpresso-multi-box '">
                <i v-if="$attrs.component.class.indexOf('nuxpresso-modal') > -1" class="z-50 material-icons cursor-pointer absolute top-0 right-0" @click="isModal=!isModal">highlight_off</i>
                <div class="w-auto max-w-1/2 p-2  nuxpresso-multi-box-image">
                    <img v-if="feature.image" :src="feature.image.url" class="nuxpresso-box-image"/>
                    <i slot="line_1" v-if="feature.material_icon" style="font-size:3rem;" class="nuxpresso-box-icon material-icons">{{feature.material_icon}}</i>
                </div>
                <div class="w-auto p-2 nuxpresso-multi-box-text relative">
                    <h3 :class="theme.heading_fg.tw_color + ' nuxpresso-box-title'" slot="line_2">{{feature.title}}</h3>

                    <h3 class="nuxpresso-box-price" slot="line_3" v-if="feature.price">
                        <span v-if="feature.sale" class="line-through text-xs">{{feature.price}}</span>
                        <span v-else>{{feature.price}}</span>
                        <span v-if="feature.sale" class="nuxpresso-box-sale">{{features.sale}}</span>
                    </h3>
                     
                    <p v-if="feature.subtitle" class="nuxpresso-box-subtitle" slot="line_3">{{feature.subtitle}}</p>
                    
                    <p :key="'line_' + l" class="mb-2 nuxpresso-box-multiline" slot="line_4" v-for="(line,l) in multiline(feature.description)">{{line}}</p>

                    <div v-if="feature.button"  class="nuxpresso-box-button " slot="line_5">
                        <nuxt-link 
                            v-if="feature.link"
                            :to="feature.link">
                            <button :class="btn_classe">{{ feature.button }}</button>
                        </nuxt-link>
                        <button :class="btn_classe" v-else>{{ feature.button }}</button>
                    </div>
                </div>
            </div>    
            </transition>
        </div>
    </div>
</template>

<script>
import Box from '@/components/ui/InfoBox'
import { mapState } from 'vuex'
export default {
    name: 'NuxpMultiBoxWidget',
    components: { Box },
    data:()=>({
        isModal: true
    }),
    computed:{
        ...mapState ( ['theme'] ),
        items(){
            return this.$attrs.component.items
        },
        classe(){
            let columns = this.$attrs.component.max_columns ?  'md:w-1/' + this.$attrs.component.max_columns : 'md:w-1/2'
            let cl = 'w-full ' + columns 
            cl += this.$attrs.component.vertical ? ' flex flex-col ' : ' flex flex-row'
            
            return cl
        },
        btn_classe(){
            let classe = this.theme.buttons_fg ? ' ' + this.theme.buttons_fg.tw_color : ' '
            classe += this.theme.buttons_bg ? ' ' + this.theme.buttons_bg.tw_color : ' '
            classe += ' ' + this.theme.buttons_bg.css +  ' ' + this.theme.buttons_fg.css
            return classe
        },
        reverse(){
            return this.$attrs.component.text_position ? 
                this.$attrs.component.text_position === 'right' ? '' : ' flex-row-reverse'
                    : ''
        }
    },
    methods:{
        multiline(text){
            if ( text){
                return text.split('\n')
            }
            return ''
        }
    }
}
</script>