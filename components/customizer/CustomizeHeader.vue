<template>
    <div class="z-10 w-1/4 border-l p-4 h-screen rounded shadow-xl border bg-white left-0 top-0 mt-8 fixed">
        <!--:style="'top:' + $attrs.offset + 'px;left:25%'"-->
                <div :class="'text-xs '">
                    <div v-if="item.content" class="flex flex-row">
                        <div class="w-1/4 p-1">Content</div>
                        <div class="w-3/4 p-1 font-bold"><input type="text" class="w-full text-sm text-black" v-model="item.content"/></div>

                        <!--<div class="w-1/4 p-1 text-right"><i class="material-icons text-sm">edit</i></div>-->
                    </div>
                    <div v-if="item.paragraph" class="flex flex-row border-b">
                        <div class="w-1/4 p-1">Content</div>
                        <div class="w-3/4 p-1 font-bold"><textarea class="w-full h-24 text-xs text-black" v-model="item.paragraph"/></div>
                        <!--<div class="w-1/4 p-1 text-right"><i class="material-icons text-sm">edit</i></div>-->
                    </div>
                    <div v-if="item.widget" class="flex flex-row border-b">
                        <div class="w-1/4 p-1">Widget</div>
                        <div class="w-3/4 p-1 font-bold" @click="widget=itemWidget(item.widget.id)[0]">{{ itemWidget(item.widget.id)[0].name }}</div>
                    </div>
                    <div v-if="item.image" class="flex flex-row border-b">
                        <div class="w-1/4 p-1 ">Image</div>
                        <div class="w-3/4 p-1 font-bold" @click="image=item.image"><img :src="item.image.url" class="w-24 h-auto"/></div>
                    </div>
                    <div v-if="item.menu" class="flex flex-row border-b">
                        <div class="w-1/4 p-1">Menu</div>
                        <div class="w-3/4 p-1 font-bold" @click="menu=itemMenu(item.menu.id)[0]">{{itemMenu(item.menu.id)[0].name}}</div>
                    </div>
                    <div v-if="item.textbox" class="flex flex-row border-b">
                        <div class="w-1/4 p-1">Paragraph</div>
                        <div class="w-3/4 p-1">{{item.textbox}}</div>
                    </div>
                    <div v-if="item.random_image" class="flex flex-row border-b">
                        <div class="w-1/4 p-1">Random IMG</div>
                        <div class="w-3/4 p-1">TRUE</div>
                    </div>
                    <div class="flex flex-row p-1">
                        <div class="w-1/4 p-1">Class</div>
                        <input type="text" class="xs w-3/4" v-model="item.class"/>
                    </div>
                </div>
                <div class="text-center mt-2">
                    <button class="xs m-auto" @click="$emit('close')">OK</button>
                </div>                
                    <div v-if="widget || menu || image" class="w-4/5 m-auto bg-white z-10 fixed overflow-y-auto border-4 p-2 shadow-xl" style="max-height:500px;height:500px;left:50%;top:50%;transform: translate(-50%,-50%)">
                    <i class="material-icons absolute top-0 right-0" @click="widget=null,menu=null,image=null">highlight_off</i>

                    <div><span v-if="widget">Widget: {{ widget.name }}</span><span v-if="menu">Menu: {{ menu.name }}</span></div>
                    <nuxpresso-widget class="mt-2" v-if="widget" :key="'field_' + i" :nuxwidget="widget.id" :id="widget.id"/>
                    <NuxpressoMenu 
                        :class="'nupresso-menu-' + $slugify(menu.name)"
                        :orientation="menu.orientation"
                        v-if="menu"
                        :id="menu.id"/>    
                    <img v-if="image" :src="image.url"/>
                
        </div>
    </div>
</template>

<script>

import NuxpressoWidget from '@/components/widgets/Widget'
import NuxpressoMenu from '@/components/widgets/MenuResponsive'
import { mapState } from 'vuex'
export default {
    name: 'NuxpCustomizeHeader',
    data:()=>({
        widget: null,
        menu: null,
        image: null,
        preview: false
    }),
    components:{
        NuxpressoWidget , NuxpressoMenu
    },
    computed: {
        ...mapState ( ['theme' , 'settings' , 'menus' , 'widgets' ] ),
        item(){
            return this.theme[this.$attrs.target][this.$attrs.element[0]].column[this.$attrs.element[1]]
        }

    },
    methods: {
        itemWidget(id){
            return this.widgets.filter ( w => { return parseInt(w.id) === parseInt(id) })
        },
        itemMenu(id){
            return this.menus.filter ( w => { return parseInt(w.id) === parseInt(id) })
        },

    }
}
</script>