<template>
    <section>
        <Loop v-if="articles" :articles="articles"/>
    </section>
</template>

<script>
import articlesTagQuery from '@/apollo/queries/article/articles-tag'
import Loop from '@/components/widgets/Loop'
import { mapState } from 'vuex'
export default {
    name: 'NuxpArticlesTags',
    components: { Loop },
    computed:{
        ...mapState ( ['settings'] )
    },
    head(){
        if ( this.articles ){
            return {
                title: this.articles.SEO.title || this.article.title,
                meta: [
                    // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                    { hid: 'description', name: 'description', content: this.articles.SEO.description || this.settings.seo.description || '' }
                ]
            }
            
        }
    },
    apollo: {
        articles : {
            prefetch: true,
            query: articlesTagQuery,
            variables(){
                return { tag : this.$route.params.tag }
            }
        }
    }
}
</script>