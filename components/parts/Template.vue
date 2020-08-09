<template>
    <article v-if="article && article.template">
        
        <div :class="article.template.class + ' flex flex-col md:flex-row pb-16 nuxpresso-template-' + $slugify(article.template.name)">
            <div :key="'template_col_' + i" v-for="(col,i) in columns" v-if="article.template[col] && article.template[col].length" :class="'w-full'">
                <template v-for="(field,i) in article.template[col]">
                    

                    <nuxpresso-image :key="'field_' + i" v-if="field.name==='image'" :class="field.class + ' nuxpresso-article-image'" :article="$attrs.article"/>


                    <h1 :key="'field_' + i" v-if="field.name==='title'" :class="classe('text','heading_fg') + ' ' + field.class + ' nuxpresso-article-title'">
                        {{$attrs.article.title}}
                    </h1>

                    <nuxpresso-article :key="'field_' + i" v-if="field.name==='content'"  :content="$attrs.article.content" :class="classe('text','primary_fg') + ' ' + field.class + ' nuxpresso-article-content'"/>
                    
                    <div :key="'field_' + i" v-if="field.name==='date'" :class="classe('text','primary_fg') + ' ' + field.class">Date: {{ $moment($attrs.article.updated_at,'M dd Y')}}</div>

                    <div :key="'field_' + i" v-if="field.textbox" :class="field.class" v-html="field.textbox"></div>

                    <div :key="'field_' + i" v-if="field.name==='author' && $attrs.article.user" :class="field.class">
                        {{ $attrs.article.user.firstname }} {{ $attrs.article.user.lastname }}
                    </div>

                    <nuxpresso-widget v-if="field.widget" :key="'field_' + i" :nuxwidget="field.widget.id" :id="field.widget.id"/>

                </template>
            </div>
        </div>
        
    </article>
</template>

<script>
import NuxpressoWidget from '@/components/widgets/Widget'
import NuxpressoImage from '@/components/widgets/Image'
import NuxpressoArticle from '@/components/widgets/Article'
import { mapState } from 'vuex'
export default {
    name: 'NuxpressoPageTemplate',
    components: {
        NuxpressoWidget , NuxpressoImage, NuxpressoArticle
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
                    console.log ( template )
                    article.template = template[0]
                    return article
                }
                return article                
            }
        },
        columns(){
            return [ 'fields' , 'fields_col_2' , 'fields_col_3' ] 
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