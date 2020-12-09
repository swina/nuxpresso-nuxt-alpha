<template>
    <!--<Single :article="articles" v-if="articles"/>-->
    <!--<div>{{articles}}</div>-->
    <!--<nuxpresso-template :article="articles"/>-->
    <nuxpresso-moka-template v-if="articles" :doc="template" :article="articles"/>
</template>

<script>
import articleQuery from '@/apollo/queries/article/articles-slug'
import Single from '@/components/widgets/Single'
import NuxpressoTemplate from '@/components/parts/Template'
import NuxpressoMokaTemplate from '@/components/mokastudio/moka.preview'
import { mapState }  from 'vuex'
export default {
    name: 'NuxpArticleSlug',
    components: {
        Single,NuxpressoTemplate,NuxpressoMokaTemplate
    },
    data:()=>({
        //template: null
    }),
    computed:{
        ...mapState ( ['settings','default_component'] ),
        
        template(){
            return this.articles.component ? 
                this.articles.component.json : this.default_component.json
        },   
          
    },
    head(){
        if ( this.articles ){
            return {
                title: this.articles.SEO.title ? this.articles.SEO.title : this.articles.title,
                meta: [
                    // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                    { hid: 'description', name: 'description', content: this.articles.SEO.description ? this.articles.SEO.description : this.settings.seo.description || '' }
                ]
            }
            
        }
        
        
    },
    apollo: {
        articles: {
            prefetch: true,
            query: articleQuery,
            variables(){
                return { slug : this.$route.params.slug }
            },
            update: data => data.articles[0]
        }
    }
}
</script>