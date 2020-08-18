<template>
    <!--<Single :article="articles" v-if="articles"/>-->
    <!--<div>{{articles}}</div>-->
    <nuxpresso-template :article="articles"/>
</template>

<script>
import articleQuery from '@/apollo/queries/article/articles-slug'
import Single from '@/components/widgets/Single'
import NuxpressoTemplate from '@/components/parts/Template'
import { mapState }  from 'vuex'
export default {
    name: 'NuxpArticleSlug',
    components: {
        Single,NuxpressoTemplate
    },
    computed:{
        ...mapState ( ['settings'] )
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