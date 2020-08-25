<template>
    <footer :class="classe + ' nuxpresso-footer'" :style="background">

        <div v-if="theme.footer" :class="'flex flex-col md:flex-row justify-around ' + row.css" v-for="(row,r) in theme.footer" :key="'footer_row_' + r">
            
            <template v-for="(col,i) in theme.footer[r].column">
        
                <div :key="'col_' + i" :class="col.class + ' flex-shrink mb-2 md:mb-0'">

                    <img 
                        v-if="col.image"  
                        :src="col.image.url" 
                        :title="col.image.caption" 
                        :alt="col.image.alternativeText" 
                        class="w-full"/>

                    <Widget 
                        v-if="col.widget" 
                        :id="col.widget.id"/>

                    <NuxpressoMenu 
                        v-if="col.menu"
                        :id="col.menu.id"/>

                    <nuxt-link 
                        :class="$colorize(theme,'footer_fg')"
                        v-if="col.link_url && col.link_url.indexOf('http') < 0"
                        :to="col.link_url">
                        {{ col.name }}
                    </nuxt-link>
                    <a v-if="col.link_url && col.link_url.indexOf('http') > -1" :href="col.link_url" target="_blank">{{col.content}}</a>

                    <div v-if="col.content && !col.link_url">{{col.content}}</div>
                    
                    <div v-if="col.paragraph" v-html="col.paragraph.split('\n').join('<br/>')"></div>
                
                </div>
            
            </template>
        </div>
        <i data-feather="github"></i>
        <div class="nuxpresso-credits flex flex-col justify-center text-xs items-center w-full text-center mt-4">
            <div>{{year}} <span v-if="settings.show_title">{{ settings.site_name}} {{ settings.site_title }}</span> {{settings.footer}} - Version {{version}}</div>
            <nuxpresso-dark-mode v-if="settings.darkmode"/>
        </div>

    </footer>
</template>

<script>
import Widget from '@/components/widgets/Widget'
import NuxpressoComponent from '@/components/ComponentWrapper'
import NuxpressoMenu from '@/components/widgets/MenuResponsive'
import NuxpressoDarkMode from '@/components/ui/DarkMode'
import { mapState } from 'vuex'

export default {
    name: 'NuxpFooter',
    components: {
        Widget , NuxpressoComponent, NuxpressoMenu ,NuxpressoDarkMode
    },
    computed: {
        ...mapState ( [ 'theme' , 'settings', 'menus'] ),
        classe(){
            return this.$twColor ( this.theme.footer_bg ) + ' ' + this.$twColor ( this.theme.footer_fg ) 
            /*
            let classe = this.theme.footer_bg ?
                this.theme.footer_bg.tw_color : ''
            classe += ' ' + this.theme.footer_fg ? ' ' + this.theme.footer_fg.tw_color : ''
            classe += this.theme.footer_bg.css ? ' ' + this.theme.footer_bg.css : ''
            classe += this.theme.footer_fg.css ? ' ' + this.theme.footer_fg.css : ''
            */
            //let classe = this.theme.footer_bg ? this.$colorClass( 'bg' , this.theme.footer_bg.color , this.theme.footer_bg.density ) + ' ' + this.theme.footer_bg.css + ' ' : ' '
            //classe += ' ' + this.theme.footer_fg ? this.$colorClass ( 'text' , this.theme.footer_fg.color , this.theme.footer_fg.density ) : ' '
            //return classe
        },
        background(){
            if ( ! this.theme.footer_bg.image ) return ''//this.$store.state.header_offset ? 'margin-top:-' + this.$store.state.header_offset.split(':')[1] : ''
            //let style =
            //    this.$store.state.header_offset ? 'margin-top:-' + this.$store.state.header_offset.split(':')[1] : '' 
            //style += 
            return 'background-image:url(' + this.theme.footer_bg.image.url + ');background-position:center center;background-size:cover;background-repeat:no-repeat'
            //return style
        },
        year(){
            return new Date().getFullYear()
        },
        version(){
            return process.env.VERSION
        }
    },
    methods: {
        menu(id){
            return this.menus.filter ( menu => { return menu.id == id})
        }
    }
}
</script>