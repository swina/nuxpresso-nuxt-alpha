<template>
    <div v-if="$attrs.items && $attrs.items.length && $route.path != '/'" class="text-xs my-2">
        {{ $attrs.title }}:
        <span :class="'nuxpresso-tag nuxpresso-tag-' + $attrs.title.toLowerCase()" v-for="(item,t) in $attrs.items" :key="$attrs.title + '_' + t"> 
            <nuxt-link
                v-if="item"
                :to="$attrs.path + taxonomy(item)"
                :title="display(item)">
                {{ display(item) }}
            </nuxt-link>
        </span>
    </div>
</template>

<script>
export default {
    name: 'NuxpTags',
    methods:{
        taxonomy(item){
            return this.$attrs.taxonomy ? item[this.$attrs.taxonomy] : item 
        },
        display(item){
            return this.$attrs.display ? item[this.$attrs.display] : item
        }
    }
}
</script>