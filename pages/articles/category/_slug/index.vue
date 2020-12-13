<template>
    <div>
        <nuxpresso-moka-template v-if="articles && components" :doc="component.json" :article="articles"/>
    </div>
</template>

<script>
import categoryQuery from '@/apollo/queries/category/categories-slug'
import componentTemplateQuery from '@/apollo/queries/component/component.loop'
import NuxpressoMokaTemplate from '@/components/mokastudio/moka.preview'    
import { mapState } from 'vuex'

export default {
    name: 'NuxpCategories',
    data:()=>({
        component: null,
        start: 0,
        limit: 10
    }),
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
    watch:{
        components(comp){
            this.component = comp.filter ( c => c.loop_type === this.$route.params.slug )[0]
            if ( !this.component ){
                this.component = comp[0]
            }
            if ( this.component.hasOwnProperty('loop_limit') && parseInt(this.component.loop_limit) ){
                this.limit = parseInt(this.component.loop_limit)
            }
        }
    }, 
    apollo: {
        articles : {
            prefetch: true,
            query: categoryQuery,
            variables(){
                return { 
                    slug : this.$route.params.slug ,
                    limit: parseInt(this.limit),
                    start: parseInt(this.start)
                }
            },
            update: data => data.articles
        },
        components: {
            prefetch: true,
            query: componentTemplateQuery,
            update: data => data.components
        }          
    }
}
</script>