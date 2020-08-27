<template>
    <span :class="$attrs.orientation==='vertical' ? $attrs.classe: ''">
        <nuxt-link 
            v-if="!$attrs.item.link_url"
            :id="'link_' + $attrs.item.name"
            :to="toLink($attrs.item)"
            :class="itemClass + ' mx-2'">
            <span @mouseover="over($event,$attrs.item)">{{ $attrs.item.name  }}</span>
        </nuxt-link>
        <a v-if="$attrs.item.link_url" :href="$attrs.item.link_url" :class="itemClass" target="_blank">
            <span @mouseover="over($event,$attrs.item)" :class="$attrs.item.css" v-html="$attrs.item.name"></span>
        </a>
    </span>
</template>

<script>
export default {
    name: 'NuxpMenuLink',
    computed:{
        itemClass(){
            return this.$attrs.orientation === 'horizontal' ? this.$attrs.classe : this.$attrs.classe
        }
    },
    methods: {
        toLink ( item ){
            return item.article ?
                        '/articles/' + item.article.slug :
                            item.category ? '/categories/' + item.category.slug : 
                                item.link_url ? item.link_url : '#'
        },
        over(e,item){
            this.$emit ( 'over' , e , item )
        }
    }
}
</script>