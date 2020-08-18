<template>
    <div>
        <span class="lg:hidden absolute top-0 right-0 mr-2 m-2 cursor-pointer" v-if="menu.mobile" @click="mobile=!mobile">
            <nuxpresso-icon :class="'border-transparent hover:border-transparent ' + classeMobile " icon="menu"/>
            <!--<i :class="'material-icons ' + classe + ' border-0'">menu</i>-->
        </span>

        <div :class="orientation">
            <MenuLink v-for="(item,i) in menu.items" :item="item" :key="'menu_' + i" :classe="classe" @over="submenu"/>
        </div>
        
        <transition name="slidedown" v-if="mobile">
            <div class="flex flex-col mt-4 text-center cursor-pointer w-screen">
                <template v-for="(item,n) in menu.items">
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
                    <div v-if="dropdown && item.submenu && item.submenu.id === dropdown.id" :class="'w-full flex flex-col ' + dropdown.css + ' ' + dropdown.menu.background.tw_color + ' ' + dropdown.menu.foreground.tw_color">
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
                    <!--<div v-if="item.submenu && item.submenu.items" v-for="(sitem,i) in item.submenu.items">
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
                            :to="linkTo(item)"
                            :class="classe">
                        {{ sitem.name }}
                        </nuxt-link>
                    </div>-->
                </template>
                <!--
                <a  
                    v-if="item.link_url" 
                    v-for="(item,n) in menu.items" 
                    :key="'mmenulink_' + n" 
                    :href="item.link_url" 
                    :class="classe">
                {{ item.name }}
                </a>
                <nuxt-link
                    v-if="item.article || item.category"
                    v-for="(item,i) in menu.items"
                    :key="'mmenu_' + i"
                    :to="linkTo(item)"
                    :class="classe">
                {{ item.name }}
                </nuxt-link>
                -->
            </div>
        </transition>
        <transition name="fade">
            <MenuDropDown v-if="dropdown && !mobile" :dropdown="dropdown" @leave="dropdown=null"/>
        </transition>
    </div>
</template>

<script>
import MenuLink from '@/components/widgets/MenuLink'
import MenuDropDown from '@/components/widgets/MenuDropDown'
import { mapState } from 'vuex'

export default {
    name: 'NuxpMenuResponsive',
    data:()=>({
        mobile: false,
        dropdown: null, 
        dropdownName : '',
        dropdownItems : null,
        coords: []
    }),
    components : {
        MenuLink, MenuDropDown
    },
    computed:{
        ...mapState ( ['menus','theme'] ),
        classe(){
            let hasClass = this.menu.foreground ? 
                this.menu.foreground.tw_color + ' ' + this.menu.foreground.css : ''
            hasClass += this.menu.background ?
                ' ' + this.menu.background.tw_color + ' ' + this.menu.background.css : ''
            hasClass += this.menu.css ? ' ' + this.menu.css : ' '
            return hasClass ? 
                hasClass :
                    this.theme.menu_fg ? this.theme.tw_color : 'text-blue-500'
            //this.$colorClass('text' , this.theme.menu_fg.color , this.theme.menu_fg.density)
        },
        classeMobile(){
            let hasClass = this.menu.foreground ? 
                this.menu.foreground.tw_color + ' border-0 hover:border-0': ''
            hasClass += this.menu.background ?
                ' ' + this.menu.background.tw_color + ' ' + this.menu.background.css : ''
            hasClass += this.menu.css ? this.menu.css + ' border-0 hover:border-0 ': ' '
            return hasClass ? 
                hasClass :
                    this.theme.menu_fg ? this.theme.tw_color : 'text-blue-500'
        },
        orientation(){
            let classe 
                let mobile = this.menu.mobile ? 'hidden lg:flex' : 'flex' 
                classe = this.menu.orientation === 'horizontal' ? 
                    mobile + ' flex-row justify-around' : 'flex flex-col'
                //classe = this.$attrs.orientation === 'vertical' ?
                //    mobile + ' flex-col' : 'flex flex-col lg:flex-row'
            return classe
        },
        menu(){
            return this.menus.filter ( m => parseInt(m.id) === parseInt(this.$attrs.id) )[0]
        }
    },
    methods:{
        linkTo ( item ){
            return item.article ?
                        '/articles/' + item.article.slug :
                            item.category ? '/categories/' + item.category.slug :
                                item.link_url ? item.link_url : '#'
        },
        submenu ( event , item ) {
            this.dropdown = null
                    if ( item.submenu && !this.dropdown ){
                        let smenu =  this.menus.filter ( m => { return m.id === item.submenu.id })
                        this.dropdown = {
                            css: smenu[0].css,
                            menu: smenu[0],
                            active: true,
                            name: item.name,
                            items: item.submenu.items,
                            coords: [ document.getElementById ( 'link_' + item.name ).offsetLeft  , event.clientY]
                        }
                    }
        },
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
        mobile_submenu(item){
             this.dropdown = null
                    if ( item.submenu && !this.dropdown ){
                        let smenu =  this.menus.filter ( m => { return m.id === item.submenu.id })
                        this.dropdown = {
                            
                            css: smenu[0].css,
                            menu: smenu[0],
                            active: true,
                            name: item.name,
                            items: item.submenu.items,
                            coords: [0,0]
                        }
                    }
        }
    }
}
</script>