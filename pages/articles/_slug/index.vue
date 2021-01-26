<template>
    <nuxpresso-moka-template v-if="articles" :doc="template" :article="articles"/>
    <!--<div>{{articles}}</div>-->
</template>

<script>
import articleQuery from '@/apollo/queries/article/articles-slug'
import NuxpressoMokaTemplate from '@/components/mokastudio/moka.preview'
import { mapState }  from 'vuex'
export default {
    name: 'NuxpArticleSlug',
    components: {
        NuxpressoMokaTemplate
    },
    data:()=>({
        articles: [],
    }),
    computed:{
        ...mapState ( ['settings','default_component'] ),
        
        template(){
            return this.articles.blocks.json
            //return this.articles.component ? 
                //this.articles.component.json : this.default_component.json
        },
          
    },
    head(){
        if ( this.articles ){
            return {
                title: this.articles.seo_title ? this.articles.seo_title : this.articles.title,
                meta: [
                    // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                    { hid: 'description', name: 'description', content: this.articles.seo_description ? this.articles.seo_description : this.settings.seo_description || '' }
                ]
            }
            
        }
        
        
    },
    async asyncData({app,route}){
        const data  = await app.apolloProvider.defaultClient.query({
            query : articleQuery,
            variables: {
                slug : route.params.slug 
            }
        })
        return {
            articles : data.data.articles[0]
        }
    }
}
</script>