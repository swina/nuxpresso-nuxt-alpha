<template>
    <div class="overflow-y-auto overflow-x-hidden h-full">
        
        <div v-for="(field,f) in Object.keys(fields)" class="flex flex-row mb-2 w-full text-left" :key="'field_' + f">
            <div class="w-full" v-if="fields[field].type==='checkbox'">
                <input class="xs" v-if="fieldType(fields[field].type)" :type="fieldType(fields[field].type)" v-model="settings[field]">
                <label v-if="fields[field].type!='submit'" class="text-xs">{{ fields[field].label }} <span v-if="fields[field].required">*</span></label>
            </div>
            <div class="w-1/3" v-if="fields[field].type!='checkbox'">
                <label v-if="fields[field].type!='submit'" class="text-xs">{{ fields[field].label }} <span v-if="fields[field].required">*</span></label>
            </div>
            <div class="w-2/3" v-if="fields[field].type!='checkbox'">
                <input class="xs" v-if="fieldType(fields[field].type)" :type="fieldType(fields[field].type)" v-model="settings[field]">
                <textarea class="text-xs" v-if="fields[field].type === 'textarea'" v-model="settings[field]"></textarea>
            </div>
            <div  v-if="fields[field].type==='submit'">
                <button class="xs" type="submit">{{ fields[field].label }}</button>
            </div>
        </div>

    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'NuxpSettings',
    data:()=>({
        fields: {
            site_name : {
                label: 'Name',
                type: 'text',
                required: true
            },
            site_title : {
                label: 'Headline',
                type: 'text',
                required: true
            },
            
            show_title : {
                label: 'Show title',
                type: 'checkbox',
                required: false
            },
            breadcrumb :{
                label: 'Breadcrumb',
                type: 'checkbox',
                required: false
            },
            scrolltop :{
                label: 'Scroll to top icon',
                type: 'checkbox',
                required: false
            },
            darkmode :{
                label: 'Dark mode',
                type: 'checkbox',
                required: false
            },
            autoimage :{
                label: 'Random images',
                type: 'checkbox',
                required: false
            },
            authentication :{
                label: 'Enable login',
                type: 'checkbox',
                required: false
            },
            read_more :{
                label: 'Read more text',
                type: 'text',
                required: false
            },
            articles_limit :{
                label: 'Articles per page',
                type: 'number',
                required: false
            },
            footer: {
                label: 'Credits',
                type: 'textarea',
                required: false
            },
            

        }
    }),
    computed: {
        ...mapState ( ['settings','themes'] ),
        mysettings(){
            return Object.keys(this.settings)
        }
    },
    watch:{
        settings(v){
            console.log ( v )
        }
    },
    methods: {
         fieldType ( type ){
            return type === 'text' 
                    || type === 'email'
                        || type === 'password' 
                            || type === 'checkbox' 
                                || type === 'number' ? type : false
                
        },
        fieldModel ( field ){
            if ( this.fields[field].key ){
                return this.settings[field][this.fields[field].key]
            } else {
                return this.settings[field]
            }
        }
    }
}
</script>