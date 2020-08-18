<template>
    <header :class="classe + ' nuxpresso-header bg-center bg-cover bg-no-repeat'" :style="background + ';background-position:center center;background-size:cover;background-repeat:no-repeat'">
        
        <div :class="'flex flex-col items-center justify-around w-full ' + flexMe + ' ' + row.css" v-for="(row,r) in theme.header" :key="'header_row_' + r">
 
            <template v-for="(col,i) in theme.header[r].column">
                <div :key="'col_' + i" :class="col.class + ' md:flex-shrink md:w-auto'">
                    <img v-if="col.image && !row.column[i].link_url"  
                        :src="col.image.url" 
                        :title="col.image.caption" 
                        :alt="col.image.alternativeText" 
                        class="w-full"/>
                    <nuxt-link :to="row.column[i].link_url" 
                        v-if="row.column[i].link_url && col.image && row.column[i].link_url.indexOf('http') < 0">
                        <img v-if="col.image"  
                            :src="col.image.url" 
                            :title="col.image.caption" 
                            :alt="col.image.alternativeText" 
                            class="w-full"/>
                    </nuxt-link>

                    <!--<img v-if="col.image"  
                        :src="col.image.url" 
                        :title="col.image.caption" 
                        :alt="col.image.alternativeText" 
                        class="w-full"/>
                    -->
                    <Widget 
                        v-if="col.widget" 
                        :id="col.widget.id"/>
                    
                    <NuxpressoMenu 
                        :class="'nupresso-menu-' + $slugify(col.menu.name)"
                        :orientation="orientation"
                        v-if="col.menu"
                        :id="col.menu.id"/>    

                    <nuxt-link 
                        :class="col.css"
                        v-if="col.link_url && col.link_url.indexOf('http') < 0"
                        :to="col.link_url">
                        {{ col.content }}
                    </nuxt-link>
                    <a :class="col.css" v-if="col.link_url && col.link_url.indexOf('http') > -1" :href="col.link_url" target="_blank">{{col.content}}</a>
                    <!--
                    -->
                    <div v-if="col.content && !col.link_url">
                        {{col.content}}
                    </div>
                    
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
    components: {
        NuxpressoComponent , NuxpressoMenu , Widget
    },
    computed: {
        ...mapState ( [ 'theme' , 'layout' , 'menus' ] ),
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
        }
    },
    methods: {
        menu(id){
            return this.menus.filter ( menu => { return menu.id === id})
        }
    }
}
</script>