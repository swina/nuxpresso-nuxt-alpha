<template>
    <article v-if="article && article.template">
        
        <div :class="article.template.class + ' flex flex-col md:flex-row pb-16 nuxpresso-template-' + $slugify(article.template.name)">
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

                    <nuxpresso-widget v-if="field.widget" :class="field.class" :key="'field_widget_' + i" :nuxwidget="field.widget.id" :id="field.widget.id"/>
                    
                    <NuxpressoMenu 
                        :key="'field_menu_' + i"
                        :class="'nupresso-menu-' + $slugify(field.menu.name)"
                        :orientation="orientation"
                        v-if="field.menu"
                        :id="field.menu.id"/>     

                </template>
            </div>
        </div>
        
    </article>
</template>

<script>
import NuxpressoWidget from '@/components/widgets/Widget'
import NuxpressoImage from '@/components/widgets/Image'
import NuxpressoArticle from '@/components/widgets/Article'
import NuxpressoMenu from '@/components/widgets/MenuResponsive'
import { mapState } from 'vuex'
export default {
    name: 'NuxpPageTemplate',
    components: {
        NuxpressoWidget , NuxpressoImage, NuxpressoArticle , NuxpressoMenu
    },
    data:()=>({
        content: null,
        contentWidgets: false
    }),
    computed:{
        ...mapState ( ['theme','templates']),
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
        }
    },
    methods:{
        classe(type,element){
            let cl = this.theme[element] ? this.$colorClass(type,this.theme[element].color , this.theme[element].density ) : ''
            return cl
        }
    }
    
}
</script>