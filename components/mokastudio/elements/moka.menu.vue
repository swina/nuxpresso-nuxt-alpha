<template>
<div>
    <nav v-if="el.element === 'menu'" :class="menu_responsive(el) + ' z-top ' + el.css.align"> 
        <div v-for="(item,i) in el.items" :class="el.css.css + ' cursor-pointer relative pr-4'" :key="el.id + '_' + i"> 
            
            <nuxt-link :class="el.css.css" v-if="!item.submenu && item.link && !item.link.includes('http')" :to="item.link">{{ item.label }} <i v-if="item.submenu" class="material-icons moka-icons">arrow_drop_down</i></nuxt-link>
            
            
            <div v-if="item.submenu" @mouseover="menuover=i" :class="el.css.css" @click="menuover=i">{{item.label}} <i v-if="item.submenu && item.submenu.length" :class="el.css.css + ' material-icons moka-icons text-sm'">arrow_drop_down</i></div>

            <a :class="el.css.css" target="_blank" :href="item.link" v-if="item.link.includes('http')">{{ item.label }}</a>
            
            <div v-if="item.submenu && item.submenu.length" :class="isOver(i) + ' ' + el.css.submenu + ' absolute flex flex-col z-2xtop'" @mouseleave="menuover=-1"> 
                <div v-for="sub in item.submenu">
                    <nuxt-link :class="el.css.css" :to="sub.link">{{sub.label}}</nuxt-link>
                </div>
            </div>
        </div>
    </nav>
    
    <!-- responsive -->
    <i :class="'material-icons moka-icons z-max fixed md:hidden top-0 left-0 m-1 ' + el.css.css" v-if="el.element === 'menu' && el.responsive" @click="showmenu" style="font-size:2rem;">menu</i>
    <transition name="fade">
        <nav v-if="menu_show" :class="el.css.responsive"> 
            <i :class="'material-icons moka-icons z-max md:hidden top-0 left-0 m-1 ' + el.css.css" style="font-size:2rem;" v-if="el.element === 'menu' && el.responsive" @click="showmenu">menu</i>
            <div v-for="(item,i) in el.items" :class="el.css.css + ' cursor-pointer relative p-1'"> 
                
                <nuxt-link :class="el.css.css" style="font-size:1.5rem;" :to="item.link">{{ item.label }}</nuxt-link>
                
                
                <div v-if="item.submenu && item.submenu.length" :class="el.css.css + ' ml-2 flex flex-col'"> 
                    <div v-for="sub in item.submenu">
                        <nuxt-link :class="el.css.css" style="font-size:1.5rem;" :to="sub.link">{{ sub.label }}</nuxt-link>
                    </div>
                </div>
            </div>
        </nav>
    </transition>

</div>
</template>

<script>
var gsap
export default {
    name: 'MokaMenuElement',
    props: ['el'],
    data:()=>({
        opacity: 'opacity-0',
        menuover: -1,
        menu_show: false
    }),
    methods:{
        showmenu(){
            this.menu_show =! this.menu_show
        },
        isOver(i){
            return i < 0 ? 'opacity-0' : this.menuover === i ? 'opacity-100' : 'opacity-0'
        },
        menu_responsive(menu){
            if ( menu.type === 'horizontal' && menu.responsive ) return 'hidden flex flex-col md:flex md:flex-row' 
            if ( menu.type === 'horizontal' && !menu.responsive ) return menu.css.container
            if ( menu.type === 'vertical' ) return 'flex flex-col'
        }
    },
    mounted(){
        gsap = this.$animation(this.el,this.el.id,this.$refs)
    },
    beforeDestroy(){
        if ( gsap ) gsap.timeline().kill()
    }
}
</script>