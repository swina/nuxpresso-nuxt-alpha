<template>
    <div v-if="show && hasCookie && theme.GPDR && theme.GPDR.active" :class="gpdr_class" :style="style">
          <div :class="classe + theme.GPDR.css">
            <h5 v-if="theme.GPDR.title">{{ theme.GPDR.title}}</h5> 
            <p class="text-sm">{{ theme.GPDR.description }}</p>
            <div>
              <nuxt-link 
                v-for="(btn,b) in theme.GPDR.button"
                :key="'btn_privacy_' + b"
                :to="btn.link_url">
                <button :class="'sm mx-2 ' + $btnClass(theme)" @click="setCookie(btn.link_url)">
                  {{ btn.text }}
                </button>
              </nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'NuxpGPDR',
    data:()=>({
        show: false
    }),
    computed: { 
        ...mapState ( ['theme'] ),
        classe(){
            let classe = this.theme.GPDR.mode ?
                    this.theme.GPDR.mode === 'modal' ? 'flex flex-col border ' : 'flex flex-row w-full justify-between items-center ' : 'flex flex-row w-full justify-between items-center '
            
            return classe
        },
        gpdr_class(){
            let classe = this.theme.GPDR.mode ?
                            this.theme.GPDR.position ? 
                                this.theme.GPDR.position === 'top' ? 'fixed w-full top-0 ' : 'fixed w-full bottom-0 ' : 'fixed w-full bottom-0 ' : 'fixed w-full bottom-0 '
            classe += this.theme.GPDR.background ? 
                        ' ' + this.theme.GPDR.background.tw_color : ' ' + this.theme.main_bg.tw_color
            classe += this.theme.GPDR.foreground ? 
                        ' ' + this.theme.GPDR.foreground.tw_color : ' ' + this.theme.primary_fg.tw_color
            return classe

        },
        style(){
            if ( this.theme.GPDR.mode ){
                if ( this.theme.GPDR.mode === 'modal' ){
                    return 'width:auto;transform:translate(-50%,-50%);top:50%;left:50%'
                }
            }
            return ''
        },
        hasCookie(){
            if ( process.client ){
                console.log ( !this.$cookie ( this.theme.GPDR.cookie_name ) )
                if ( !this.$cookie ( this.theme.GPDR.cookie_name ) ){
                    this.show = true
                    return false
                }
                this.show = false
                return true
            }
        }
    },
    methods:{
        setCookie( action ){
            console.log ( action )
            if ( action === '#' || !action ){
                this.$setCookie ( this.theme.GPDR.cookie_name , this.theme.GPDR.cookie_expiration)
                this.hasCookie = true
            }
        }
    }
}
</script>