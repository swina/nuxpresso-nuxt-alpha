<template>
    <div>
        <!-- mobile (not lg) -->
        <i :class="'lg:hidden absolute top-0 right-0 mr-2 m-2 cursor-pointer material-icons border-transparent hover:border-transparent ' + classeMobile" v-if="menu.mobile" @click="mobile=!mobile">menu</i>
        <transition name="fade">
            <MenuMobile :menu="menu" v-if="mobile" @close="mobile=!mobile"/>
        </transition>

        <!-- lg screen -->
        <div :class="orientation">
            <div :class="menu.css + ' ' + orientation">
                <MenuLink v-for="(item,i) in menu.items" :item="item" :key="'menu_' + i"  :orientation="menu.orientation" :classe="classe" @over="submenu"/>
            </div>
            <transition name="fade">
                <MenuDropDown class="hidden lg:block" v-if="dropdown" :dropdown="dropdown" @leave="dropdown=null"/>
            </transition>
        </div>
        
    </div>
</template>

<script>
import MenuLink from '@/components/widgets/MenuLink'
import MenuDropDown from '@/components/widgets/MenuDropDown'
import MenuMobile from '@/components/widgets/MenuMobile'

import { mapState } from 'vuex'

export default {
    name: 'NuxpMenuResponsive',
    data:()=>({
        mobile: false,
        dropdown: null, 
        dropdownName : '',
        dropdownItems : null,
        coords: [],
        currentIndex: null
    }),
    components : {
        MenuLink, MenuDropDown , MenuMobile
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
                    mobile + ' flex-row justify-around' : mobile + ' flex-col'
                //classe = this.$attrs.orientation === 'vertical' ?
                //    mobile + ' flex-col' : 'flex flex-col lg:flex-row'
            return classe
        },
        menu(){
            return this.menus.filter ( (m,index) => parseInt(m.id) === parseInt(this.$attrs.id) )[0]
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
        /*
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
        */
    }
}
</script>