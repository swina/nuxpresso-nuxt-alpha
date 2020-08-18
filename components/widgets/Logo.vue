<template>
    <div class="text-cennter">
        <nuxt-link :to="$attrs.options.url">
            <img v-if="$attrs.options.url" :src="$attrs.options.image.url" :alt="$attrs.options.image.alternativeText" :title="$attrs.options.image.caption" :class="'m-auto ' + $attrs.classe"/>
        </nuxt-link>
        <img v-if="!$attrs.options.url" :src="$attrs.options.image.url" :alt="$attrs.options.image.alternativeText" :title="$attrs.options.image.caption" :class="'m-auto ' + $attrs.classe"/>
        <!--<div class="nuxpresso-logo" v-html="$attrs.options"></div>-->
        
        <div v-if="settings.show_title" :class="'nuxpresso-logo-heading ' + theme.heading_fg.tw_color">
            {{settings.site_name}} {{settings.site_title}}
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'NuxpLogo',
    computed: {
        ...mapState ( ['settings','theme'] )
    }
}
</script>