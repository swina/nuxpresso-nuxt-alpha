<template>
  <div>
    <client-only>
      <nuxpresso-moka-template v-if="homepage && components" :doc="components.json" :article="homepage"/>
    </client-only>
  </div>
</template>

<script>
import qryTemplate from '@/apollo/queries/component/component.template'
import NuxpressoMokaTemplate from '@/components/mokastudio/moka.preview'
import { mapState } from 'vuex'
export default {
  name: 'NuxpMain',
  components: {
    NuxpressoMokaTemplate
  },
  data:()=>({
    template:null
  }),
  head(){
    //SEO
        return {
            title: this.homepage.SEO.title || this.homepage.title,
            meta: [
                // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                { hid: this.homepage.SEO.title || this.settings.site_name, 
                name: this.homepage.SEO.title , 
                content: this.homepage.SEO.description || this.settings.site_titòe || '' }
            ]
        }
  },
  computed: {
    ...mapState( ['homepage'] ),
   
  },
  async asyncData({app}){
    const data  = await app.apolloProvider.defaultClient.query({
      query : qryTemplate,
      variables: {
        blocks_id : app.store.state.homepage.template_id 
      }
    })
    return {
      components : data.data.components[0]
    }
  }
}
</script>
