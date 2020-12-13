<template>
    <nuxpresso-moka-template v-if="articles && components" :doc="component.json" :article="articles"/>
    <!--
    <section>
        {{components}}
        <nuxpresso-loop v-if="articles" :articles="articles"/>
        <div class="m-auto w-full text-center">
            <i @click="prev" v-if="start > 0" class="material-icons mr-2 text-3xl cursor-pointer">chevron_left</i>
            <i @click="next" v-if="articles && articles.length >= settings.articles_limit" class="material-icons text-3xl cursor-pointer">chevron_right</i>
        </div>
    </section>
    </transition>
    -->
</template>

<script>
import articlesPaginationQueries from '@/apollo/queries/article/articles-pagination'
import componentTemplateQuery from '@/apollo/queries/component/component.loop'
import NuxpressoLoop from '@/components/widgets/Loop'
import NuxpressoMokaTemplate from '@/components/mokastudio/moka.preview'
import { mapState } from 'vuex'
export default {
    name: 'NuxpArticles',
    components: { NuxpressoLoop , NuxpressoMokaTemplate },
    data:()=>({
        start: 0,
        limit: 10,
        component:null
    }),
    computed:{
        ...mapState ( ['settings'] ),
    },
    mounted(){
        this.limit = this.settings.articles_limit
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
        articles: {
            prefetch: true,
            query: articlesPaginationQueries,
            variables(){
                return {
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
    },
    methods:{
        next(){
            this.start = this.start + this.settings.articles_limit
        },
        prev(){
            this.start = this.start - this.settings.articles_limit
        }
    }
}
</script>