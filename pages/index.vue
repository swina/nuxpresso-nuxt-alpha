<template>
  <div>
    <client-only>
      <nuxpresso-moka-template v-if="homepage" :doc="homepage.component.json" :article="homepage"/>
    </client-only>
  </div>
</template>

<script>
import NuxpressoMokaTemplate from '@/components/mokastudio/moka.preview'
import { mapState } from 'vuex'
export default {
  name: 'NuxpMain',
  components: {
    NuxpressoMokaTemplate
  },
  head(){
    //SEO
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
