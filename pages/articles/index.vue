<template>
    <transition name="fade">
    <section>
        <nuxpresso-loop v-if="articles" :articles="articles"/>
        <div class="m-auto w-full text-center">
            <i @click="prev" v-if="start > 0" class="material-icons mr-2 text-3xl cursor-pointer">chevron_left</i>
            <i @click="next" v-if="articles && articles.length >= settings.articles_limit" class="material-icons text-3xl cursor-pointer">chevron_right</i>
        </div>
    </section>
    </transition>
</template>

<script>
import articlesPaginationQueries from '@/apollo/queries/article/articles-pagination'
import NuxpressoLoop from '@/components/widgets/Loop'
import { mapState } from 'vuex'
export default {
    name: 'NuxpArticles',
    components: { NuxpressoLoop },
    data:()=>({
        start: 0
    }),
    computed:{
        ...mapState ( ['settings'] )
    },
    apollo: {
        articles: {
            prefetch: true,
            query: articlesPaginationQueries,
            variables(){
                return {
                    limit: parseInt(this.settings.articles_limit),
                    start: parseInt(this.start)
                }
            },
            update: data => data.articles 
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