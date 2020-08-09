<template>
  <div>
      <nuxpresso-template :article="homepage" v-if="homepage"/>
      <div v-else class="h-screen flex flex-col items-center m-auto">
        <img src="@/assets/logo.png"/>
        <h1 class="text-center">Welcome to nuxpresso!</h1>
        <i>You have successfully installed nuxpresso.</i>
        <br/><br/>
        <p>This page will disappear after you create your homepage.</p>

        Don't forget to read the documentation to learn how nuxpresso works.
      </div>
  </div>
</template>

<script>
import NuxpressoTemplate from '@/components/parts/Template'
import { mapState } from 'vuex'

export default {
  name: 'NuxpressoMain',
  components: {
    NuxpressoTemplate
  },
  head(){
        if ( this.homepage && this.homepage.SEO ){
            return {
                title: this.homepage.SEO.title || this.homepage.title,
                meta: [
                    // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                    { hid: 'description', name: 'description', content: this.homepage.SEO.description || this.settings.seo.description || '' }
                ]
            }
        }
  },
  computed: {
    ...mapState( ['homepage'] ),
  },

}
</script>
