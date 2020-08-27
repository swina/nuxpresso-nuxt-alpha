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

                    <nuxpresso-widget 
                        v-if="col.widget" 
                        :widget="$widget(widgets,col.widget.id)" 
                        :timer="$hasTimer($widget(widgets,col.widget.id).class)"
                        :class="col.class" 
                        :nuxwidget="col.widget.id" 
                        :id="col.widget.id"/> 
                        
                    <div v-if="col.content && !col.link_url" :class="elClass(col.content_element) + ' ' + col.class" v-html="col.content"></div>
                    
                    <div v-if="col.paragraph" v-html="col.paragraph.split('\n').join('<br/>')"></div>

                       
                        
                    <NuxpressoMenu 
                        :class="'nupresso-menu-' + $slugify(col.menu.name)"
                        :orientation="orientation"
                        v-if="col.menu"
                        :id="col.menu.id"/>   

                    <nuxt-link 
                        :class="$colorize(theme,'footer_fg')"
                        v-if="col.link_url && col.link_url.indexOf('http') < 0"
                        :to="col.link_url">
                        <span :class="elClass(col.content_element)" v-html="col.content"></span>
                    </nuxt-link>

                    <a v-if="col.link_url && col.link_url.indexOf('http') > -1" :href="col.link_url" target="_blank">
                        <span :class="elClass(col.content_element)" v-html="col.content"></span>
                    </a>

                    
                
                </div>
            
            </template>
        </div>
        <div class="nuxpresso-credits flex flex-col justify-center text-xs items-center w-full text-center mt-4">
            <div>{{year}} <span v-if="settings.show_title">{{ settings.site_name}} {{ settings.site_title }}</span> {{settings.footer}} - Version {{version}}</div>
            <nuxpresso-dark-mode v-if="settings.darkmode"/>
        </div>

    </footer>
</template>

<script>
import NuxpressoWidget from '@/components/widgets/Widget'
import NuxpressoComponent from '@/components/ComponentWrapper'
import NuxpressoMenu from '@/components/widgets/MenuResponsive'
import NuxpressoDarkMode from '@/components/ui/DarkMode'
import { mapState } from 'vuex'

export default {
    name: 'NuxpFooter',
    data:()=>({
        elements : {
            'h1' : 'text-xl md:text-2xl lg:text-4xl lg:pb-2',
            'h2' : 'text-lg md:text-2xl lg:text-3xl lg:pb-2',
            'h3' : 'text-base leading-6 lg:text-2xl lg:pb-1',
            'h4' : 'text-base leading-5 lg:text-xl lg:pb-1',
            'h5' : 'text-sm leading-4 md:text-base lg:text-lg lg:pb-1',
            'xs' : 'text-xs',
            'sm' : 'text-xs lg:text-sm',
            'base' : 'text-sm lg:text-base',
            'lg' : 'text-base lg:text-lg',
            'xl' : 'text-lg lg:text-xls'
        }
    }),
    components: {
        NuxpressoWidget , NuxpressoComponent, NuxpressoMenu ,NuxpressoDarkMode
    },
    computed: {
        ...mapState ( [ 'theme' , 'settings', 'menus' , 'widgets' ] ),
        classe(){
            return this.$twColor ( this.theme.footer_bg ) + ' ' + this.$twColor ( this.theme.footer_fg ) 
        },
        background(){
            if ( ! this.theme.footer_bg.image ) return ''
            return 'background-image:url(' + this.theme.footer_bg.image.url + ');background-position:center center;background-size:cover;background-repeat:no-repeat'
        },
        year(){
            return new Date().getFullYear()
        },
        version(){
            return process.env.VERSION
        },
        orientation(){
            return this.$attrs.flex ? 
                this.$attrs.flex === 'flex-col' ? 'vertical' : 'horizontal'
                    : 'horizontal'
        },
    },
    methods: {
        menu(id){
            return this.menus.filter ( menu => { return menu.id == id})
        },
        elClass(el){
            return el ? this.elements[el] : ''
        }
    }
}
</script>