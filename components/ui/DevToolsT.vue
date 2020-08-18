<template>
    <div>
        <div class="hidden lg:block absolute top-0 left-0 p-1 text-white cursor-pointer" v-if="!show" @click="show=!show,activate(true)"><i class="material-icons rounded-full text-white bg-black">build</i></div>
       
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'NuxpDevTools',
    data:()=>({
        show: false,
        detail: false,
        setup: false,
        infoDetail: null,
        colorize: false,
        selectTheme: null ,
        title: '',
        nuxpressoClasses: null,
        nuxpressoClassList: ''
    }),
    computed: {
        ...mapState ( ['settings','current_template','widgets','menus','theme','themes','layout'] ),
        selectedTheme(){
            return {
                id: this.settings.current_theme.theme.id
            }
        },
       
    },
    methods:{
        activate(v){
            this.$emit('active',v)
        },
        getInfo(what){
            this.infoDetail = ''
            this.title = what
            
            if ( what === 'template' )
                this.infoDetail = this.current_template

            if ( what === 'settings' && this.settings )
                this.infoDetail = this.settings

            if ( what === 'widgets' )
                this.infoDetail = this.widgets

            if ( what === 'menus' )
                this.infoDetail = this.menus

        },
        isCurrentTheme(id){
            return this.settings.layout.id === id ? 'selected' : ''
        },
        getMeta() {
            this.title = 'SEO'
            let title = [...document.getElementsByTagName('title')][0].outerHTML
            let metas = [...document.getElementsByTagName('meta')]
            let arr = metas.map ( meta => {
                return meta.outerHTML
            })
            let heading = [...document.getElementsByTagName('h1')]
            let links = [...document.getElementsByTagName('link')]
            this.infoDetail = 'Title: \n' + title + '\n\nMeta:\n' + arr.join('\n') + '\n\nH1\n' + heading.map ( h => { return h.outerHTML } ).join('\n') + '\n\nLinks:\n' + links.map ( h => { if ( h.rel != 'preload' ){ return h.outerHTML } } ).join('\n') 
        },
         getNuxpressoCSS(){
            this.title = 'Nuxpresso Classes'
            this.infoDetail = ''
            let els = document.querySelectorAll('div[class*="nuxpresso-"]')
            let classes = [ ...els ].map ( el => {
                return [ ...el.classList ].filter ( cl => {
                    return cl.indexOf('nuxpresso') > -1 
                })

            })

            let uniq = [ new Set( classes.join(',').split(',') )]
            this.nuxpressoClasses = [...uniq[0]]  
        },
        mark(classe){
            this.nuxpressoClassList = ''
            let selected = [ ...document.querySelectorAll('.npx-current') ]
            if ( selected ){
                selected.forEach ( el => {
                    el.classList = [ ...el.classList].join(' ').replace('npx-current border-2 border-red-500','')
                })
            }
            let els = [ ...document.querySelectorAll('.' + classe ) ]
            els.forEach ( el => {
                this.nuxpressoClassList += [ ...el.classList].join('<br/>')
                el.classList = el.classList + ' npx-current border-2 border-red-500'
            })
        },
        spread(arr){
            let sp =  arr.map ( a => { 
                let o = { ...a }
                let obj = Object.keys(o).map ( key => { 
                    return key + ':<strong>' + o[key] + '</strong>'
                })
                //console.log ( obj.join('<br/>') )
                return obj.join('<br/>')
            } )
        },
        restoreTheme(){
            this.$store.dispatch ( 'reloadTheme' , this.settings.theme  )
        },
        loadTheme(){
            let settings = this.settings
            settings.current_theme.theme.id = this.selectedTheme.id
            //settings.layout.id = this.selectedTheme
            this.$store.dispatch ( 'changeTheme' , this.selectedTheme.id )
            this.$store.dispatch ( 'changeSettings' , settings )
            this.show = false
        }
    }
}
</script>

<style scoped>
    .nxp-info {
        margin: 0 .4rem 0 .4rem;
    }
    .nxp-info > span {
        font-weight: 700; 
        color: #46cccc;
    }
    .npx-selected {
        border:2px solid red;
    }
</style>