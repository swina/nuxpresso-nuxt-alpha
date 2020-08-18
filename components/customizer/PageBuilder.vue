<template>
    <div class="min-h-screen z-10 border-l bg-white fixed top-0 left-0" style="width:75%;margin-left:25%">
        <div class="text-base px-2 w-full bg-gray-200 py-1">Page Builder &raquo; {{ $attrs.template.name }} </div>
        <div v-if="$attrs.template.default" class="absolute top-0 right-0 p-2 bg-black text-white">Default</div>
        <div v-if="$attrs.template.homepage" class="absolute top-0 right-0 p-1 bg-black text-white"><i class="material-icons text-text-sm">home</i></div>
        <div class="flex flex-row p-4">
            <div :class="'border w-1/3'" v-for="c in parseInt($attrs.cols)">


                <div class="bg-gray-300 p-1">Column {{ parseInt(c) }}</div>

                <div class="p-1 border-b">Class: {{$attrs.template['col_' + c + '_class']}}</div>

                <div :key="'item_col_' + c +'_' + n" v-for="(item,n) in $attrs.template[columns[parseInt(c)-1]]">
                    <div v-if="item.name" class="flex flex-row border-b">
                        <div class="w-1/4 p-1 border-r">Article</div>
                        <div class="w-1/2 p-1 font-bold">{{ item.name }}</div>
                        <div class="w-1/4 p-1 text-right"><i class="material-icons text-sm">edit</i></div>
                    </div>
                    <div v-if="item.widget" class="flex flex-row border-b">
                        <div class="w-1/4 p-1 border-r">Widget</div>
                        <div class="w-1/2 p-1 font-bold" @click="widget=itemWidget(item.widget.id)[0]">{{ itemWidget(item.widget.id)[0].name }}</div>
                        <div class="w-1/4 p-1 text-right"><i class="material-icons text-sm">edit</i></div>
                    </div>
                    <div v-if="item.image" class="flex flex-row border-b">
                        <div class="w-1/4 p-1 border-r">Image</div>
                        <div class="w-1/2 p-1 font-bold" @click="image=item.image"><img :src="item.image.url" class="w-12 h-auto"/></div>
                        <div class="w-1/4 p-1 text-right"><i class="material-icons text-sm">edit</i></div>
                    </div>
                    <div v-if="item.menu" class="flex flex-row border-b">
                        <div class="w-1/4 p-1 border-r">Menu</div>
                        <div class="w-1/2 p-1 font-bold" @click="menu=itemMenu(item.menu.id)[0]">{{itemMenu(item.menu.id)[0].name}}</div>
                        <div class="w-1/4 p-1 text-right"><i class="material-icons text-sm">edit</i></div>
                    </div>
                    <div v-if="item.textbox" class="flex flex-row border-b">
                        <div class="w-1/4 p-1 border-r">Paragraph</div>
                        <div class="w-1/2 p-1 font-bold">{{item.textbox}}</div>
                        <div class="w-1/4 p-1 text-right"><i class="material-icons text-sm">edit</i></div>
                    </div>
                    <div v-if="item.random_image" class="flex flex-row border-b">
                        <div class="w-1/4 p-1 border-r">Random IMG</div>
                        <div class="w-1/2 p-1 font-bold">TRUE</div>
                        <div class="w-1/4 p-1 text-right"><i class="material-icons text-sm">edit</i></div>
                    </div>
                </div>
                
            </div>
        </div>
        <div class="p-4">Class <input type="text" class="xs" v-model="$attrs.template.class"/></div>
        <div v-if="widget || menu || image" class="w-4/5 m-auto bg-white z-10 fixed overflow-y-auto border-4 p-2 shadow-xl" style="max-height:500px;height:500px;left:50%;top:50%;transform: translate(-50%,-50%)">
            <i class="material-icons absolute top-0 right-0" @click="widget=null,menu=null,image=null">highlight_off</i>

            <div><span v-if="widget">Widget: {{ widget.name }}</span><span v-if="menu">Menu: {{ menu.name }}</span></div>
            <nuxpresso-widget class="mt-2" v-if="widget" :key="'field_' + i" :nuxwidget="widget.id" :id="widget.id"/>
            <NuxpressoMenu 
                :class="'nupresso-menu-' + $slugify(menu.name)"
                :orientation="orientation"
                v-if="menu"
                :id="menu.id"/>    
            <img v-if="image" :src="image.url"/>
        </div>
    </div>
</template>

<script>
import ArticleByTemplate from '@/apollo/queries/article/article-template'
import NuxpressoWidget from '@/components/widgets/Widget'
import NuxpressoMenu from '@/components/widgets/MenuResponsive'
import { mapState } from 'vuex'
export default {
    name: 'NuxpPageBuilder',
    components:{
        NuxpressoWidget , NuxpressoMenu
    },
    data:()=>({
        columns: [ 'fields' , 'fields_col_2' , 'fields_col_3'],
        widget: null,
        menu: null,
        image: null,
        preview: false
    }),
    computed: {
        ...mapState ( ['templates' , 'widgets' , 'menus' ] )
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