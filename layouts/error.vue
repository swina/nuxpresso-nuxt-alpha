<template>
    <div class="mt-10 p-2 md:p-32 flex flex-col bg-cover bg-no-repeat bg-center" :style="backgroundNotFound">
        <div class="font-bold outline" style="min-height:8rem;font-size:12rem;">404</div>
        <div class="text-3xl mb-8">{{ this.$store.state.theme.page_not_found ? this.$store.state.theme.page_not_found : 'Page not found!'}}</div>
        <nuxt-link to="/"><button>Home</button></nuxt-link>
    </div>
</template>

<script>
export default {
    name: 'Nuxp404',
    computed:{
        backgroundNotFound(){
            return this.$store.state.theme.page_not_found_background ? 'background-image:url(' + this.$store.state.theme.page_not_found_background.url + ')' : ''
        }
    }
}
</script>