<template>
    <nuxpresso-moka-template v-if="articles && components" :doc="components.json" :article="articles"/>
</template>

<script>
import categoryQuery from '@/apollo/queries/category/categories-slug'
import componentTemplateQuery from '@/apollo/queries/component/component.loop'
import NuxpressoMokaTemplate from '@/components/mokastudio/moka.preview'    
import { mapState } from 'vuex'

export default {
    name: 'NuxpCategories',
    components: { NuxpressoMokaTemplate },
    computed: {
        ...mapState ( ['settings','theme','categories'] ),
        
    },
    head(){
        if ( this.articles && this.articles.length && this.articles[0].categories[0].SEO ){
            return {
                title: this.articles[0].categories[0].SEO.title || this.settings.site_title,
                meta: [
                    // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                    { hid: 'description', name: 'description', content: this.articles[0].categories[0].SEO.description || this.settings.seo.description || '' }
                ]
            }
        }
    },
     
    apollo: {
        articles : {
            prefetch: true,
            query: categoryQuery,
            variables(){
                return { slug : this.$route.params.slug }
            },
            update: data => data.articles
        },
        components: {
            prefetch: true,
            query: componentTemplateQuery,
            variables(){
                return {
                    loop: 'articles'
                }
            },
            update: data => data.components[0]
        }          
    }
}
</script>