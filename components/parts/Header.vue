<template>
    <header :class="classe + ' nuxpresso-header  bg-center bg-cover bg-no-repeat'" :style="background + ';background-position:center center;background-size:cover;background-repeat:no-repeat;'">
        
        <div :class="'flex flex-col items-center justify-around w-full ' + flexMe + ' ' + row.css" v-for="(row,r) in theme.header" :key="'header_row_' + r">
 
            <template v-for="(col,i) in theme.header[r].column">
                <div :key="'col_' + i" :class="col.class + ' md:flex-shrink md:w-auto'">
                    <img v-if="col.image && !row.column[i].link_url"  
                        :src="col.image.url" 
                        :title="col.image.caption" 
                        :alt="col.image.alternativeText" 
                        class="w-full object-fit"/>
                    <nuxt-link :to="row.column[i].link_url" 
                        :class="col.class"
                        v-if="row.column[i].link_url && col.image && row.column[i].link_url.indexOf('http') < 0">
                        <img v-if="col.image"  
                            :src="col.image.url" 
                            :title="col.image.caption" 
                            :alt="col.image.alternativeText" 
                            class="w-full"/>
                    </nuxt-link>
                    
                    <nuxpresso-widget 
                        v-if="col.widget" 
                        :widget="$widget(widgets,col.widget.id)" 
                        :timer="$hasTimer($widget(widgets,col.widget.id).class)"
                        :class="col.class" 
                        :nuxwidget="col.widget.id" 
                        :id="col.widget.id"/>


                    <NuxpressoMenu 
                        :class="'nupresso-menu-' + $slugify(col.menu.name)"
                        :orientation="orientation"
                        v-if="col.menu"
                        :id="col.menu.id"/>    

                    <nuxt-link 
                        :class="col.class"
                        v-if="col.link_url && col.link_url.indexOf('http') < 0"
                        :to="col.link_url">
                        <span :class="elClass(col.content_element)" v-html="col.content"></span>
                    </nuxt-link>

                    <a :class="col.class" v-if="col.link_url && col.link_url.indexOf('http') > -1" :href="col.link_url" target="_blank">
                        <span :class="elClass(col.content_element)" v-html="col.content"></span>
                    </a>
                    <!--
                    -->
                    <div v-if="col.content && !col.link_url" :class="elClass(col.content_element) + ' ' + col.class"  v-html="col.content"></div>
                    <div v-if="col.paragraph" v-html="col.paragraph.split('\n').join('<br/>')"></div>
                    
                </div>
               
            </template>
        
        </div>
    
    </header>
</template>

<script>
import Widget from '@/components/widgets/Widget'
import NuxpressoComponent from '@/components/ComponentWrapper'
import NuxpressoMenu from '@/components/widgets/MenuResponsive'
import { mapState } from 'vuex'

export default {
    name: 'NuxpHeader',
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
        NuxpressoComponent , NuxpressoMenu , Widget
    },
    computed: {
        ...mapState ( [ 'theme' , 'layout' , 'menus' , 'widgets' ] ),
        classe(){
            return this.$twColor ( this.theme.header_bg )
        },
        background(){
            if ( ! this.theme.header_bg.image ) return ''
            return 'background-image:url(' + this.theme.header_bg.image.url + ')'
        },
        flexMe(){
            return this.$attrs.flex ? 'lg:' + this.$attrs.flex : 'lg:flex-row'
        },
        orientation(){
            return this.$attrs.flex ? 
                this.$attrs.flex === 'flex-col' ? 'vertical' : 'horizontal'
                    : 'horizontal'
        },
        
    },
    methods: {
        menu(id){
            return this.menus.filter ( menu => { return menu.id === id})
        },
        elClass(el){
            return el ? this.elements[el] : ''
        }
    }
}
</script>