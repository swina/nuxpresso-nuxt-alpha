<template>
    <div class="w-screen p-4" v-if="$attrs.menu" @click="!dropdown ? $emit('close') : null">
        <div class="flex flex-col cursor-pointer">
            <template v-for="(item,n) in $attrs.menu.items">
                <div :key="'menulink_' + n" v-if="!item.article && !item.category && !item.link_url" :class="classe" @click="smenu(item)">
                    {{ item.name }}
                </div>
                <a  
                    v-if="item.link_url" 
                    :key="'menulink_' + n" 
                    :href="item.link_url" 
                    :class="classe">
                    {{ item.name }}
                </a>
                <nuxt-link
                    v-if="item.article || item.category"
                    :key="'menulink_' + n"
                    :to="linkTo(item)"
                    :class="classe">
                {{ item.name }}
                </nuxt-link>
                <transition name="fade">
                    <div v-if="dropdown && item.submenu && item.submenu.id === dropdown.id" :class="'w-full p-2 flex flex-col ' + dropdown.css + ' ' + dropdown.menu.background.tw_color + ' ' + dropdown.menu.foreground.tw_color" @click="$emit('close')">
                        <template v-for="(sitem,n) in dropdown.items">
                            <div :key="'smenulink_' + n" v-if="!sitem.article && !sitem.category && !sitem.link_url" :class="classe">
                                {{ sitem.name }}
                            </div>
                            <a  
                                v-if="sitem.link_url" 
                                :key="'smenulink_' + n" 
                                :href="sitem.link_url" 
                                :class="classe">
                                {{ sitem.name }}
                            </a>
                            <nuxt-link
                                v-if="sitem.article || item.category"
                                :key="'smenulink_' + n"
                                :to="linkTo(sitem)"
                                :class="classe">
                            {{ sitem.name }}
                            </nuxt-link>
                        </template>
                    </div>
                </transition>
            </template>
        </div>
    </div>
    
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'NuxpMenuMobile',
    data:()=>({
        dropdown: null,
    }),
    computed: {
        ...mapState ( [ 'theme' , 'menus' ]),
        classe(){
            if ( this.$attrs.menu ){
                let hasClass = this.$attrs.menu.foreground ? 
                    this.$attrs.menu.foreground.tw_color + ' border-0 hover:border-0 py-2 ': ''
                hasClass += this.$attrs.menu.background ?
                    ' ' + this.$attrs.menu.background.tw_color + ' ' + this.$attrs.menu.background.css : ''
                hasClass += this.$attrs.menu.css ? this.$attrs.menu.css + ' border-0 hover:border-0 ': ' '
                return hasClass ? 
                    hasClass :
                        this.theme.menu_fg ? this.theme.tw_color : 'text-blue-500 py-2 ' 
            }
        }
    },
    methods: {
        smenu ( item ){
            if ( item.submenu && !this.dropdown ){
                let smenu =  this.menus.filter ( m => { return m.id === item.submenu.id })
                this.dropdown = {
                    id: smenu[0].id,
                    css: smenu[0].css,
                    menu: smenu[0],
                    active: true,
                    name: item.name,
                    items: item.submenu.items,
                    coords: [0,0]
                }
            } else {
                this.dropdown = null
            }
        },
        linkTo ( item ){
            return item.article ?
                '/articles/' + item.article.slug :
                    item.category ? '/categories/' + item.category.slug :
                        item.link_url ? item.link_url : '#'
        }
    }
}
</script>