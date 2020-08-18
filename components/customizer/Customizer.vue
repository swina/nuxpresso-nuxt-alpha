<template>
    <div class="relative min-h-screen">
        <div class="flex flex-col items-center border-b flex py-2 px-4 cursor-pointer text-left">
            <div class="flex flex-row w-full items-center" @click="customize.settings=!customize.settings,resetCollapse('settings')">
                <div class="w-3/4 text-left">Settings</div>
                <div class="w-1/4 text-right">
                    <i class="material-icons" v-if="!customize.settings">expand_more</i>
                    <i class="material-icons" v-if="customize.settings">expand_less</i>
                </div>
            </div>
            <transition name="slidedown">
                <div class="flex flex-col z-50 fixed top-0 left-0 h-screen mt-8 bg-white w-1/4"  v-if="customize.settings">
                    <div class="flex flex-row items-center p-2 w-full text-left bg-gray-400" @click="customize.settings=false" >
                        <div class="w-3/4 text-left">Settings</div>
                        <div class="w-1/4 text-right">
                            <i class="material-icons">expand_less</i>
                        </div>
                    </div>
                    <div class="p-2 pb-12">
                        <nuxpresso-settings/>
                        <button class="mr-2 xs" @click="saveSettings">Save</button>
                    </div>
                </div>
            </transition>

        </div>
        
        <div class="flex flex-col py-2 border-b flex px-4 cursor-pointer text-left">
            <div class="flex flex-row w-full" @click="customize.theme=!customize.theme,resetCollapse('theme')">
                <div class="w-3/4 text-left">Theme</div>
                <div class="w-1/4 text-right">
                    <i class="material-icons" v-if="!customize.theme">expand_more</i>
                    <i class="material-icons" v-if="customize.theme">expand_less</i>
                </div>
            </div>
            <transition name="slidedown">
                <div class="flex flex-col fixed top-0 left-0 h-screen mt-8 bg-white w-1/4" v-if="customize.theme">
                    <div class="flex flex-row items-center p-2 w-full text-left bg-gray-400" @click="customize.theme=false" >
                        <div class="w-3/4 text-left">Theme</div>
                        <div class="w-1/4 text-right">
                            <i class="material-icons" v-if="customize.theme">expand_less</i>
                        </div>
                    </div>
                    <div class="p-2 text-xs">    
                        <!--<div v-if="themes">
                            <select v-model="currentTheme" class="w-full p-1 text-xs mb-1">
                                <option v-for="(tema,t) in themes" :value="tema.id">{{tema.name}}</option>
                            </select>
                        </div>
                        -->
                        Name: <input class="xs" v-model="theme.name"/>
                        <div class="text-xs border-b-2 p-1 mt-2">Colors</div>
                        <div class="w-full flex flex-col">
                            <div v-for="(field,n) in themeKeys" class="flex flex-row p-1" @click="currentThemeField=field,currentCSS=theme[field].css,colors=true">
                                <div class="w-2/3 text-xs">{{ themeFieldLabels[field] }}</div>
                                <div :key="field" :class="boxColor(field) +' text-center border-2 h-6 w-6 p-1 rounded mr-2 text-xs ' + selectedField(field)">
                                </div>
                            </div>
                            <div>
                                <button class="xs" @click="saveTheme">Save</button><button class="xs ml-2" @click="duplicateTheme">Create new</button>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>

        <div class="flex flex-col py-2 border-b flex px-4 cursor-pointer text-left">
            <div class="flex flex-row w-full" @click="customize.header=!customize.header,resetCollapse('header')">
                <div class="w-3/4 text-left">Header</div>
                <div class="w-1/4 text-right">
                    <i class="material-icons" v-if="!customize.darkmode">expand_more</i>
                    <i class="material-icons" v-if="customize.darkmode">expand_less</i>
                </div>
            </div>
            <div class="z-20 w-full flex flex-col text-sm" v-if="customize.header">
                <div v-for="(row,r) in theme.header" :key="'row_' + r" @mouseover="elementPos" >
                    <div v-for="(col,c) in row.column" :key="'col_' + c" class="flex flex-row border mb-1 p-1 items-center header-element" @click="currentHeader=[r,c]">
                        <i class="material-icons text-base">category</i>
                        {{col.name}}
                    </div>
                </div>
                <transition name="slidedown">
                    <div>
                        <nuxpresso-header :class="theme.header_bg.tw_color + ' ' + theme.header_fg.tw_color" v-if="currentHeader" target="header" :element="currentHeader" :offset="yPos" @mouseout="currentHeader=null" @close="currentHeader=null"/>
                        <div>
                            <button class="xs" @click="saveTheme">Save</button>
                        </div>
                    </div>
                </transition>

            </div>
            
        </div>

        <div class="flex flex-col py-2 border-b flex px-4 cursor-pointer text-left">
            <div class="flex flex-row w-full" @click="customize.footer=!customize.footer,resetCollapse('footer')">
                <div class="w-3/4 text-left">Footer</div>
                <div class="w-1/4 text-right">
                    <i class="material-icons" v-if="!customize.darkmode">expand_more</i>
                    <i class="material-icons" v-if="customize.darkmode">expand_less</i>
                </div>
            </div>
            <div class="z-20 w-full flex flex-col text-sm" v-if="customize.footer">
                <div v-for="(row,r) in theme.footer" :key="'row_' + r" @mouseover="elementPos" >
                    <div v-for="(col,c) in row.column" :key="'col_' + c" class="flex flex-row border mb-1 p-1 items-center header-element" @click="currentHeader=[r,c]">
                        <i class="material-icons text-base">category</i>
                        {{col.name}}
                    </div>
                </div>
                <transition name="slidedown">
                    <div>
                        <nuxpresso-header :class="theme.footer_bg.tw_color + ' ' + theme.footer_fg.tw_color" v-if="currentHeader" target="footer" :element="currentHeader" :offset="yPos" @mouseout="currentHeader=null" @close="currentHeader=null"/>
                        <div>
                            <button class="xs" @click="saveTheme">Save</button>
                        </div>
                    </div>
                </transition>
            </div>
            
        </div>
        <!-- MENUS -->
        <div class="flex flex-col py-2 border-b flex px-4 cursor-pointer text-left">
            <div class="flex flex-row w-full" @click="customize.menus=!customize.menus,resetCollapse('menus')">
                <div class="w-3/4 text-left">Menus</div>
                <div class="w-1/4 text-right">
                    <i class="material-icons" v-if="!customize.menus">expand_more</i>
                    <i class="material-icons" v-if="customize.menus">expand_less</i>
                </div>
            </div>
            <transition name="slidedown">
                <div class="flex flex-col fixed top-0 left-0 h-screen mt-8 bg-white w-1/4" v-if="customize.menus">
                    <div class="flex flex-row items-center p-2 w-full text-left bg-gray-400" @click="customize.menus=false" >
                        <div class="w-3/4 text-left">Menus</div>
                        <div class="w-1/4 text-right">
                            <i class="material-icons">expand_less</i>
                        </div>
                    </div>
                    <div class="p-2 text-xs">
                        Select <select v-model="customizeMenu">
                            <option v-for="(menu,n) in menus" :value="menu">{{ menu.name }}</option>
                        </select>
                        <div v-if="currentMenu" class="mt-2">
                            <!--
                            <div class="flex flex-col" v-for="(item,n) in currentMenu.items">
                                {{ item.name }} {{item.css}}
                            </div>
                            -->
                            <div class="flex flex-row">
                                <div class="w-2/3 text-xs">
                                    Menu color
                                </div>
                                <div :class="boxColor('foreground') + ' text-center border-2 border-black h-6 w-6 p-1 rounded mr-2 mb-1 text-xs '+ selectedField('foreground')" @click="currentMenuField='foreground',colors=!colors,menuClass('foreground')"></div>

                            </div>
                            <div class="flex flex-row">
                                <div class="w-2/3 text-xs">
                                    Menu background
                                </div>
                                <div :class="boxColor('background') +' text-center border-2 border-black h-6 w-6 p-1 rounded mr-2 mb-1 text-xs ' + selectedField('background')" @click="currentMenuField='background',colors=!colors,menuClass('background')"></div>
                                
                            </div>
                            Class
                            <textarea class="w-full" v-model="currentMenu.css"></textarea>
                            
                        </div>
                        <div>
                            <button class="mt-2 mr-2 xs" @click="saveMenus">Save</button>
                        </div>
                    </div>
                </div>
            </transition>

        </div>

        <!-- WIDGETS -->
        <div class="flex flex-col py-2 border-b flex px-4 cursor-pointer text-left">
            <div class="flex flex-row w-full" @click="customize.widgets=!customize.widgets,resetCollapse('widgets')">
                <div class="w-3/4 text-left">Widgets</div>
                <div class="w-1/4 text-right">
                    <i class="material-icons" v-if="!customize.menus">expand_more</i>
                    <i class="material-icons" v-if="customize.menus">expand_less</i>
                </div>
            </div>
            <transition name="slidedown">
                <div class="flex flex-col fixed top-0 left-0 h-screen mt-8 bg-white w-1/4" v-if="customize.widgets">
                    <div class="flex flex-row items-center p-2 w-full text-left bg-gray-400" @click="customize.widgets=false" >
                        <div class="w-3/4 text-left">Widgets</div>
                        <div class="w-1/4 text-right">
                            <i class="material-icons">expand_less</i>
                        </div>
                    </div>
                    <div class="p-2 text-xs">
                        Select <select v-model="currentWidget">
                            <option v-for="(widget,n) in widgets" :value="widget">{{ widget.name }}</option>
                        </select>
                        <div v-if="currentWidget" class="w-3/4 m-auto bg-white z-10 fixed h-screen overflow-y-auto border-4 p-2 shadow-xl" style="right:0%;top:50%;transform: translateY(-50%)">
                            <i class="material-icons absolute top-0 right-0" @click="currentWidget=null">highlight_off</i>
                            <div>
                                <span v-if="currentWidget">Widget: {{ currentWidget.name }}</span>
                                <nuxpresso-widget class="mt-2" v-if="currentWidget" :nuxwidget="currentWidget.id" :id="currentWidget.id"/>
                            </div>
                        </div>
                        <div v-if="currentWidget" class="mt-4">
                            <div class="flex flex-col" v-for="(comp,c) in currentWidget.component">
                                <div>
                                    Widget title:<input type="text" clas="xs" v-model="currentWidget.title"/>
                                </div>
                                <div> 
                                    Class : <br/>
                                    <textarea class="xs w-full" v-model="currentWidget.class"></textarea>
                                </div>
                                <div>
                                    Component: <span class="font-bold">{{comp.__component.split('.')[0]}} &raquo; {{comp.__component.split('.')[1]}}</span>
                                </div>
                                
                                <div> 
                                    Class : <br/>
                                    <textarea class="xs w-full" v-model="comp.class"></textarea>
                                </div>
                            </div>
                            <div>
                                <button class="xs" @click="saveWidget">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>

        </div>


        <div class="flex flex-col py-2 border-b flex px-4 cursor-pointer text-left">
            <div class="flex flex-row w-full" @click="customize.media=!customize.media,resetCollapse('media'),media=true">
                <div class="w-3/4 text-left">Media</div>
                <div class="w-1/4 text-right">
                    <i class="material-icons" v-if="!customize.darkmode">expand_more</i>
                    <i class="material-icons" v-if="customize.darkmode">expand_less</i>
                </div>
            </div>
        </div>
        
        <div class="flex flex-col py-2 border-b flex px-4 cursor-pointer text-left">
            <div class="flex flex-row w-full" @click="customize.darkmode=!customize.darkmode,resetCollapse('darkmode')">
                <div class="w-3/4 text-left">Dark mode</div>
                <div class="w-1/4 text-right">
                    <i class="material-icons" v-if="!customize.darkmode">expand_more</i>
                    <i class="material-icons" v-if="customize.darkmode">expand_less</i>
                </div>
            </div>
            <transition name="slidedown">
                <div class="flex flex-col fixed top-0 left-0 h-screen mt-8 bg-white w-1/4" v-if="customize.darkmode">
                    <div class="flex flex-row items-center p-2 w-full text-left bg-gray-400" @click="customize.darkmode=false" >
                            <div class="w-3/4 text-left">Darkmode</div>
                            <div class="w-1/4 text-right">
                                <i class="material-icons">expand_less</i>
                            </div>
                        </div>
                    <nuxpresso-darkmode/>
                    <div v-for="(field,n) in themeKeys" class="flex flex-row p-1" @click="currentThemeField=field,currentCSS=theme[field].css,colors=true">
                        <div class="w-2/3 text-xs">{{ themeFieldLabels[field] }}</div>
                        <div :key="field"  :class="boxColor(field) +' text-center border-2 h-6 w-6 p-1 rounded mr-2 text-xs ' + selectedField(field)">
                        </div>
                    </div>
                </div>
            </transition>
        </div>
        
        <div class="flex flex-col py-2 border-b flex px-4 cursor-pointer text-left">
           <div class="flex flex-row w-full" @click="customize.templates=!customize.templates,resetCollapse('templates')">
                <div class="w-3/4 text-left">Page Builder</div>
                <div class="w-1/4 text-right">
                    <i class="material-icons" v-if="!customize.templates">expand_more</i>
                    <i class="material-icons" v-if="customize.templates">expand_less</i>
                </div>
            </div>
            
            <div class="w-full flex flex-col text-xs relative" v-if="customize.templates">
                <select v-model="currentTemplate">
                    <option v-for="(template,n) in templates" :value="template">{{ template.name }}</option>
                </select>
                <div v-if="currentTemplate" class="mt-2">
                    <div class="flex flex-row border border-black w-24 m-auto mb-2">
                        <div :key="'col_' + n" v-for="n in parseInt(cols)" :class="'flex items-center h-16 w-'  + (24/cols) + ' border '">
                        <div class="m-auto">{{n}}</div>
                        </div>
                    </div>
                    Columns <input type="range" min="1" max="3" v-if="currentTemplate" v-model="cols"/> {{ cols }}
                    <transition name="slideleft">
                        <nuxpresso-pagebuilder v-if="currentTemplate && customize.templates" :template="currentTemplate" :cols="cols"/>
                    </transition>
                </div>
            </div>
        </div>

        <transition name="slidedown" v-if="colors">
            <nuxpresso-palette @media="media=true" @color="setColor" :css="currentCSS" :customize="customize" :field="theme[currentThemeField]" @classe="setCSS" @close="colors=!colors" @removeimage="noImage"/>
        </transition>

        <div class="fixed bottom-0 left-0 w-1/4 border-t bg-white text-center p-1">
            <img src="@/assets/new-logo.png" width="50%" class="m-auto"/>
        </div>

        <transition name="fade">
            <nuxpresso-media v-if="media" @close="media=!media" @newimage="setImage"/>
        </transition>

        <transition name="fade">
            <div style="transform: translateX(-75%);left:75%;" class="border-l-4 border-blue-500 fixed bottom-0 m-auto shadow-xl mb-2 bg-white text-left p-4 w-1/2" v-if="message">
            {{ message }}
            </div>
        </transition>
    </div>
</template>

<script>
import NuxpressoSettings from '@/components/customizer/Settings'
import NuxpressoPalette from '@/components/customizer/Palette'
import NuxpressoPagebuilder from '@/components/customizer/PageBuilder'
import NuxpressoDarkmode from '@/components/ui/DarkMode'
import NuxpressoHeader from '@/components/customizer/CustomizeHeader'
import NuxpressoMedia from '@/components/customizer/Media'
import NuxpressoWidget from '@/components/widgets/Widget'

import { mapState } from 'vuex'
export default {
    name: 'NuxpCustomizer',
    data:()=>({
        colors: false,
        media: false,
        changeImage: null,
        message: '',
        customize : {
            settings: false,
            theme: false,
            darkmode: false,
            templates: false,
            menus: false,
            header: false,
            footer: false,
            media: false,
            widgets: false
        },
        themeSettings: false,
        themeColors: false,
        currentTheme: null,
        currentThemeField: null,
        currentCSS : '',
        currentTemplate: null,
        template: null,
        currentMenu: null,
        customizeMenu: null,
        currentMenuField: null,
        currentHeader: null,
        currentWidget: null,
        yPos: 0,
        cols: 1,
        density: {
            "100" : "extralight",
            "200" : "verylight" ,
            "300" : "mediumlight",
            "400" : "light",
            "500" : "normal",
            "600" : "mediumdark",
            "700" : "dark",
            "800" : "verydark",
            "900" : "extradark" 
        },
        themeFieldLabels :{
            header_bg : 'Header background',
            header_fg : 'Header foreground',
            footer_bg : 'Footer background',
            footer_fg : 'Footer foreground',
            primary_fg : 'Primary foreground',
            main_bg : 'Page background',
            menu_fg : 'Menu foreground',
            link_fg : 'Link foreground',
            heading_fg : 'Heading (H1..) foreground'
        }
    }),
    components: { NuxpressoSettings , NuxpressoPalette , NuxpressoDarkmode , NuxpressoPagebuilder , NuxpressoHeader , NuxpressoMedia , NuxpressoWidget },
    watch:{
        currentTemplate(v){
            let c =  0
            this.currentTemplate.fields.length ?  c++ : c+=0
            this.currentTemplate.fields_col_2.length ? c++ : c+=0
            this.currentTemplate.fields_col_3.length ? c++ : c+=0
            this.cols = c
        },
        customizeMenu(v){
            console.log ( v )
            let vm = this
            this.$axios.$get('menus/' +  v.id ).then ( response=>{
                vm.currentMenu = response
                //console.log ( response)
            })
        },
        message(v){
            if ( v ){
                window.setTimeout(()=>{ this.message = '' }, 4000)
            }
        }
    },
    computed:{
        ...mapState ( ['theme' , 'themes' , 'templates' , 'menus' ,'widgets'] ),
        settingsKeys(){
            return Object.keys(this.settings)
        },
        themeKeys(){
            return Object.keys(this.theme).filter ( key => {
                return key.indexOf('_bg') > -1 || key.indexOf('_fg') > -1
             })
        },
        columns(){
            if ( this.currentTemplate ){
                //let template = this.templates.filter ( template => { return template.id === this.currentTemplate  })
                //this.template = template[0]
                let c =  0
                this.currentTemplate.fields.length ?  c++ : c+=0
                this.currentTemplate.fields_col_2.length ? c++ : c+=0
                this.currentTemplate.fields_col_3.length ? c++ : c+=0
                this.cols = c
                
                //template[0].fields.length ?  c++ : c+=0
                //template[0].fields_col_2.length ? c++ : c+=0
                //template[0].fields_col_3.length ? c++ : c+=0
                //this.cols = c
                return c
            } 
            return 1
        },

    },
    methods: {
        saveSettings(){
            let vm = this 

            this.$axios.$put ( 'settings' , this.settings ).then ( response => {
                vm.$store.dispatch ( 'updateSettings' , this.settings )
                vm.message = 'Settings updated successfully'
            }).catch ( error => {
                vm.message = 'An error occured. Check the console'
                console.log ( error )
            })
        },
        saveTheme(){
            let vm = this
            this.$axios.$put ( 'themes/' + vm.theme.id , vm.theme ).then( response => {
                vm.$store.dispatch ( 'loadTheme' , vm.theme )
                vm.message = 'Theme updated successfully'
            }).catch ( error => {
                vm.message = 'An error occured. Check the console'
                console.log ( error )
            })
        },
        saveMenus(){
            let vm = this 
            this.$axios.$put ( 'menus/' + vm.currentMenu.id , vm.currentMenu ).then ( response => {
                vm.$store.dispatch ( 'updateMenus' , this.menus )
                vm.message = 'Menus updated successfully'
            }).catch ( error => {
                vm.message = 'An error occured. Check the console'
                console.log ( error )
            })
        },
        saveWidget(){
            let vm = this
            this.$axios.$put ( 'widgets/' + vm.currentWidget.id , vm.currentWidget ).then ( response => {
                vm.$store.dispatch ( 'loadWidgets' )
                vm.message = 'Widget updated successfully'
            }).catch ( error => {
                vm.message = 'An error occured. Check the console'
                console.log ( error )
            })
        },
        duplicateTheme (){
            let vm = this
            let source = {}
            let newTheme = Object.assign ( this.theme , source)
            this.$axios.$post ( 'themes' ,  newTheme 
            ).then ( response => {
                vm.$store.dispatch ( 'loadTheme' , newTheme )
                vm.message = 'Successfully created ' + newTheme.name + ' theme.'
            }).catch ( error => {
                vm.message = 'An error occured. Check the console'
                console.log ( error )
            })
        },
        resetCollapse(what){
            Object.keys(this.customize).map( custom => {
                if ( custom != what ){
                    this.customize[custom] = false
                }
            })
        },
        boxColor ( field ){
            if ( this.customize.theme )
                if ( this.theme[field] ){
                    return this.theme[field].tw_color.replace('text','bg')
                } else {
                    return 'bg-transparent'
                }
                //console.log ( this.theme[field] )
                //return this.theme[field] ? this.$colorClass('bg' , this.theme[field].color , this.theme[field].density ) : ''
            if ( this.customize.menus ){
                return this.currentMenu[field] ? this.currentMenu[field].tw_color.replace('text','bg') : 'bg-transparent'
            }
                //return this.currentMenu[field] ? this.$colorClass('bg' , this.currentMenu[field].color , this.currentMenu[field].density ) : ''
            if ( this.customize.darkmode )
                return this.settings.darkmode_settings[field] ?
                    this.settings.darkmode_settings[field].tw_color.replace('text','bg') : 'bg-transparent'
                //return this.settings.darkmode_settings[field] ? this.$colorClass('bg' , this.settings.darkmode_settings[field].color , this.settings.darkmode_settings[field].density ) : ''
        },
        menuClass ( what ){
            if ( this.currentMenu[what] ){
                this.currentCSS = this.currentMenu[what].css
            } else { 
                this.currentCSS = ''
            }
        },
        setColor ( color , tone ){
            if ( color  ){
                let t = tone ? '-' + tone : ''
                if ( this.customize.theme ){
                    console.log ( this.currentThemeField.indexOf('bg') )
                    if ( this.currentThemeField.indexOf ( 'bg') > -1 ) {
                        this.theme[this.currentThemeField] = {
                            color: color,
                            density: tone ? this.density[tone] : '' ,
                            css : this.currentCSS,
                            tw_color: 'bg-' + color + t,
                            image: this.theme[this.currentThemeField].image
                        }
                    } else {
                        this.theme[this.currentThemeField] = {
                            color: color,
                            density: tone ? this.density[tone] : '' ,
                            css : this.currentCSS,
                            tw_color: 'text-' + color + t
                        }
                    }
                }
                if ( this.customize.menus ){
                    this.currentMenu[this.currentMenuField] = {
                                color: color,
                                density: tone ? this.density[tone] : '',
                                css: this.currentCSS,
                                tw_color : this.currentMenuField === 'background' ? 'bg-' + color + t : 'text-' + color + t
                            }
                    this.menus.map ( m => { 
                        if ( parseInt(m.id) === parseInt(this.currentMenu.id) ){
                            m[this.currentMenuField] = {
                                color: color,
                                density: tone ? this.density[tone] : '',
                                css: this.currentCSS,
                                tw_color : this.currentMenuField === 'background' ? 'bg-' + color + t : 'text-' + color + t
                            }
                            

                        }
                    })
                }
                if ( this.customize.darkmode && this.settings.darkmode_settings ){
                    this.settings.darkmode_settings[this.currentThemeField] = {
                        color: color,
                        density: tone ? this.density[tone] : '' ,
                        css : this.currentCSS,
                        tw_color : this.currentThemeField.indexOf('bg') > -1 ? 'bg-' + color + t : 'text-' + color + t
                    }
                }
                this.colors = false
            }
        },
        setCSS(v){
            this.currentCSS = v
            if ( this.customize.theme )
                this.theme[this.currentThemeField].css = v
            if ( this.customize.menus ){
                this.currentMenu[this.currentMenuField].css =this.currentCSS
                this.menus.map ( m => { 
                    if ( parseInt(m.id) === parseInt(this.currentMenu.id) ){
                        if ( m[this.currentMenuField] ){
                            m[this.currentMenuField].css = this.currentCSS
                        }
                    }
                })
                this.$store.dispatch ( 'updateMenus' , this.menus )
            }
            if ( this.customize.darkmode )
                this.settings.darkmode_settings[this.currentThemeField].css = v
        },
        selectedField ( field ){
            if ( this.customize.theme )
                return field === this.currentThemeField ? 'border-red-500' : 'border-gray-200'
            if ( this.customize.menus )
                return field === this.currentMenuField ? 'border-red-500' : 'border-gray-200'
        },
        elementPos ( event ){
            this.yPos = event.clientY - 20
        },
        setImage ( img ){
            console.log ( 'image changed=>',img )
            if ( this.currentThemeField ){
                this.theme[this.currentThemeField].image = img
            }
            this.changeImage = img
        },
        noImage(e){
            console.log ( 'remove image' , e)
            if ( this.currentThemeField ){
                this.theme[this.currentThemeField].image = null
            }
            this.changeImage = null
        }
        
    },
    mounted(){
        if ( window.localStorage.getItem ( 'nuxpresso-jwt') ){
            this.$axios.defaults.headers.common = {
                'Authorization': window.localStorage.getItem('nuxpresso-jwt')
            }   
            let vm = this
            this.$axios.$get('settings').then ( response => {
                vm.settings = response
                vm.$store.dispatch ( 'updateSettings' , response )
            })
        } else {
            this.$emit('login')
        }
    }
}
</script>

<style scoped>
.customizer-font {
    font-family: sans-serif;
    font-size:1rem;
}
</style>