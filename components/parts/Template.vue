<template>
    <div :style="offset">
        <article v-if="article && article.template">
            <Breadcrumb class="text-xs p-2 relative" v-if="settings.breadcrumb && article.template.breadcrumb"/>
            <div  :class="article.template.class + ' flex flex-col md:flex-row pb-16 nuxpresso-template-' + $slugify(article.template.name)">
                <div :key="'template_col_' + i" v-for="(col,i) in columns" v-if="article.template[col] && article.template[col].length" :class="'w-full ' + article.template['col_' + (i+1) + '_class']">
                    <template v-for="(field,i) in article.template[col]">

                        <nuxpresso-image :key="'field_image_' + i" v-if="field.name==='image' || field.random_image" :class="field.class + ' nuxpresso-article-image'" :article="$attrs.article"/>

                        <img :key="'field_comp_image_' + i" v-if="field.image" :src="field.image.url" :class="field.class"/>

                        <h1 :key="'field_title_' + i" v-if="field.name==='title'" :class="$twColor(theme.heading_fg) + ' ' + field.class + ' nuxpresso-article-title'">
                            {{$attrs.article.title}}
                        </h1>


                        <nuxpresso-article :key="'field_content_' + i" v-if="field.name==='content'"  :content="$attrs.article.content" :class="$twColor(theme.primary_fg) + ' ' + field.class + ' nuxpresso-article-content'"/>
                        
                        <div :key="'field_date_' + i" v-if="field.name==='date'" :class="$twColor(theme.primary_fg) + ' ' + field.class">Date: {{ $moment($attrs.article.updated_at,'M dd Y')}}</div>

                        <div :key="'field_textbox_' + i" v-if="field.textbox" :class="field.class" v-html="field.textbox"></div>

                        <div :key="'field_author_' + i" v-if="field.name==='author' && $attrs.article.user" :class="field.class">
                            {{ $attrs.article.user.firstname }} {{ $attrs.article.user.lastname }}
                        </div>
                        <!--<div :key="'field_widget_' + i" v-if="field.widget" :class="field.class">-->
                            <nuxpresso-widget v-if="field.widget" :class="field.class" :nuxwidget="field.widget.id" :id="field.widget.id"/>
                        <!--</div>-->

                        <NuxpressoMenu 
                            :key="'field_menu_' + i"
                            :class="'nupresso-menu-' + $slugify(field.menu.name)"
                            v-if="field.menu"
                            :id="field.menu.id"/>     

                        <nuxpresso-tags
                            :key="'field_menu_' + i"
                            v-if="field.name === 'categories'" 
                            :items="$attrs.article.categories" 
                            title="Categories" 
                            path="/categories/" 
                            taxonomy="slug" 
                            display="name"/>

                        <nuxpresso-tags 
                            :key="'field_menu_' + i"
                            v-if="$attrs.article.tags && field.name === 'tags'" 
                            :items="$attrs.article.tags.split('\n')" 
                            title="Tags" 
                            path="tag/" 
                            taxonomy="" 
                            display=""/>

                        <nuxpresso-tags 
                            :key="'field_menu_' + i"
                            v-if="$attrs.related && $attrs.related.length && field.name === 'related'" 
                            :items="$attrs.related" 
                            title="Related" 
                            path="/articles/" 
                            taxonomy="slug" 
                            display="title"/>
                            </template>
                </div>
            </div>
        </article>
    </div>
</template>

<script>
import Breadcrumb from '@/components/widgets/Breadcrumb'
import NuxpressoWidget from '@/components/widgets/Widget'
import NuxpressoImage from '@/components/widgets/Image'
import NuxpressoArticle from '@/components/widgets/Article'
import NuxpressoMenu from '@/components/widgets/MenuResponsive'
import NuxpressoTags from '@/components/widgets/Tags'

import { mapState } from 'vuex'
export default {
    name: 'NuxpPageTemplate',
    components: {
        Breadcrumb , NuxpressoWidget , NuxpressoImage, NuxpressoArticle , NuxpressoMenu , NuxpressoTags
    },
    data:()=>({
        content: null,
        contentWidgets: false
    }),
    computed:{
        ...mapState ( ['theme','templates','settings']),
        article(){
            if ( this.$attrs.article ){
                let article = this.$attrs.article
                if ( !article.template ){
                    
                    let template = this.templates.filter ( template => { 
                        return template.default
                    })
                    article.template = template[0]
                    this.$store.dispatch ( 'set_current_article' , article )
                    return article
                }
                this.$store.dispatch ( 'set_current_article' , article )
                return article                
            }
        },
        columns(){
            return [ 'fields' , 'fields_col_2' , 'fields_col_3' ] 
        },
        orientation(){
            return this.$attrs.flex ? 
                this.$attrs.flex === 'flex-col' ? 'vertical' : 'horizontal'
                    : 'horizontal'
        },
        offset(){
            this.pageNotFound = false
            if ( process.client ){
                if ( this.$attrs.article ){
                    return this.article.homepage ? this.$store.state.header_offset :
                            !this.settings.breadcrumb || !this.article.template.breadcrumb ?
                                this.$store.state.header_offset :
                                    'margin-top:0px;' 
                } else {
                    return this.$store.state.header_offset
                }
                return ''
            }
            return ''
        },
        
    },
    methods:{
        
        classe(type,element){
            let cl = this.theme[element] ? this.$colorClass(type,this.theme[element].color , this.theme[element].density ) : ''
            return cl
        }
    }
    
}
</script>