<template>
    <div class="w-full absolute top-0 left-0 px-24 z-50">
    
        <div :class="classe + ' p-0 flex flex-col absolute  w-full md:w-1/4'" v-if="show" @click="show=!show,$emit('leave')" :style="position()" @mouseleave="$emit('leave')">
            
            <div class="text-xl border-b mb-2" v-if="!$attrs.dropdown.coords">{{$attrs.dropdown.name}}</div>

            <nuxt-link 
                :key="'menu_' + i"
                v-if="toLink(item) && !item.link_url"
                v-for="(item,i) in $attrs.dropdown.items"
                :to="toLink(item)"
                :class="linkClasse">
                <span v-html="item.name.replace('\n','<br/>')"></span>
            </nuxt-link>
            <a 
                :key="'menu_' + i"
                v-for="(item,i) in $attrs.dropdown.items"
                v-if="item.link_url" 
                :href="item.link_url" 
                :class="linkClasse">
                <span v-html="item.name.replace('\n','<br/>')"></span>
            </a>
        </div>

    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'NuxpDropdownMenu',
    data:()=>({
        show: true
    }),
    computed: {
        ...mapState ( ['theme'] ),
        classe(){
            //let classe
            //if ( this.$attrs.dropdown.menu ){
            //    console.log ( this.$attrs.dropdown.menu.menu_background )
            //    classe = this.$attrs.dropdown.menu.menu_background ?
            //        'bg-' + this.$attrs.dropdown.menu.menu_background.color + '-' + this.$attrs.dropdownn.menu.menu_background.density + ' ' : ''
            //    classe += this.$attrs.dropdown.menu.css || ''
            //}
            let _classe = this.$attrs.dropdown.menu.menu_background ?
                this.$attrs.dropdown.menu.menu_background.tw_color + ' ' + this.$attrs.dropdown.menu.menu_background.css + ' ' + this.$attrs.dropdown.menu.css : ''

            let classe = this.$attrs.dropdown.menu.background ?
                this.$attrs.dropdown.menu.background.tw_color + ' ' + this.$attrs.dropdown.menu.background.css + ' ' + this.$attrs.dropdown.menu.css : ''

            //let classe = this.$attrs.dropdown.menu.background_color ? 
            //    this.$colorClass ( 'bg' , this.$attrs.dropdown.menu.background_color.color , this.$attrs.dropdown.menu.background_color.density ) + ' ' + this.$attrs.dropdown.menu.background_color.css : ''
            if ( _classe ){
                return _classe
            } else {        
                return 'bg-white text-black p-1'
            }
        },
        linkClasse(){
            return this.$attrs.dropdown.menu.foreground ? 
                this.$attrs.dropdown.menu.foreground.tw_color + ' ' + this.$attrs.dropdown.menu.foreground.css : ' hover:bg-gray-300 p-2'
            //return this.$attrs.dropdown.menu.text_color ?
            //    this.$colorClass ( 'text' , this.$attrs.dropdown.menu.text_color.color , this.$attrs.dropdown.menu.text_color.density ) + ' ' + this.$attrs.dropdown.menu.text_color.css
            //    : 'hover:bg-gray-300 p-2'

        }
    },
    methods:{
        position(){
            if ( this.$attrs.dropdown.coords ){
                let x = (parseInt(this.$attrs.dropdown.coords[0])) 
                let y = (parseInt(this.$attrs.dropdown.coords[1]) + 15)

                return 'left:' + x + 'px;top:' + y + 'px;'
            }
            let el = [ ...document.getElementsByTagName('section') ]
            return 'top:' + ( el[0].offsetTop - 20 )+ 'px;'
        },
        toLink ( item ){
            return item.article ? '/articles/' + item.article.slug 
                : item.category ? '/categories/' + item.category.slug 
                    : '#'
        }
    }
}
</script>