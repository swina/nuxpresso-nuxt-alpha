<template>
    <span v-if="image">
        <img v-if="image" class="m-auto" :src="image" :alt="alt" :title="alt"/>
        <span v-else>Loading ...</span>
    </span>
</template>

<script>
export default {
    name: 'NuxpImage',
    data:()=>({
        alt: ''
    }),
    computed:{
        image(){
            if ( this.$attrs.options ){
                return this.$attrs.options.url
            } else {
                return this.$attrs.article.image ? this.$attrs.article.image.url :
                this.$attrs.article.random_image && this.$store.state.settings.autoimage ? 
                    'https://source.unsplash.com/random/800x400?'+ this.$attrs.article.title : false
            }
        },
    },
    mounted(){
        
        if ( this.$attrs.article ){
            this.alt = this.$attrs.article.title 
            this.$attrs.article.image_title ?  
                    this.alt = this.$attrs.article.image_title :  
                        this.alt = this.$attrs.article.title 
        }
    }
}
</script>