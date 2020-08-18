<template>
    <div class="w-full absolute top-0 left-0 px-24 z-20">
    
        <div :class="classe + ' p-0 flex flex-col absolute shadow-lg w-full md:w-1/4'" v-if="show" @click="show=!show,$emit('leave')" :style="position()" @mouseleave="$emit('leave')">
            
            <div class="text-xl border-b mb-2" v-if="!$attrs.dropdown.coords">{{$attrs.dropdown.name}}</div>

            <nuxt-link 
                :key="'menu_' + i"
                v-if="toLink(item)"
                v-for="(item,i) in $attrs.dropdown.items"
                :to="toLink(item)"
                :class="linkClasse">
                <span v-html="item.name.replace('\n','<br/>')"></span>
            </nuxt-link>
            
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
            //return ''
            let classe = this.$attrs.dropdown.menu.background ?
                this.$attrs.dropdown.menu.background.tw_color + ' ' + this.$attrs.dropdown.menu.background.css : ''

            //let classe = this.$attrs.dropdown.menu.background_color ? 
            //    this.$colorClass ( 'bg' , this.$attrs.dropdown.menu.background_color.color , this.$attrs.dropdown.menu.background_color.density ) + ' ' + this.$attrs.dropdown.menu.background_color.css : ''
            if ( classe ){
                return classe
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