<template>
    <form @submit.prevent="onSubmit" v-if="form">
        <div v-for="(field,f) in $attrs.widget.field" class="flex flex-col mb-2 w-full text-left" :key="'field_' + f">
            <label v-if="field.type!='submit'" class="text-xs">{{ field.label }} <span v-if="field.required">*</span></label>
            <input class="" v-if="fieldType(field.type)" :type="fieldType(field.type)" :name="field.name" :id="field.name" v-model="form[field.name]">
            <textarea v-if="field.type === 'textarea'" v-model="form[field.name]"></textarea>
            <div  v-if="field.type==='submit'">
                <button :class="btn_classe" type="submit">{{ field.label }}</button>
            </div>
        </div>
        <div :class="'nuxpresso-form-response ' + responseClass">{{response}}</div>
        <SpinIcon v-if="!enabled"/>
    </form>
</template>

<script>
import SpinIcon from '@/components/ui/SpinIcon'

import { mapState } from 'vuex'
export default {
    name: 'NuxpForm',
    data:()=>( {
        form: null,
        viewForm: true,
        enabled: true,
        response: '',
        responseClass: 'text-green-400'
    }),
    components: { SpinIcon },
    async mounted() {
        await this.$recaptcha.init()
        let obj = {}
        this.$attrs.widget.field.forEach ( field => {
            if ( field.type != 'submit' )
                obj[field.name] = field.default
        })
        this.form = obj
    },
    computed:{
      ...mapState ( ['theme'] ),
      btn_classe(){
            let classe = this.theme.buttons_fg ? ' ' + this.theme.buttons_fg.tw_color : ' '
            classe += this.theme.buttons_bg ? ' ' + this.theme.buttons_bg.tw_color : ' '
            classe += ' ' + this.theme.buttons_bg.css +  ' ' + this.theme.buttons_fg.css
            return classe
        }, 
    },
    methods:{
        clearForm(){
            let obj = {}
            this.$attrs.widget.field.forEach ( field => {
                if ( field.type != 'submit' )
                    obj[field.name] = field.default
            })
            this.form = obj
        },
        fieldType ( type ){
            return type === 'text' 
                    || type === 'email'
                        || type === 'password' 
                            || type === 'checkbox' 
                                || type === 'number' ? type : false
                
        },
        async onSubmit() {
            try {
                const token = await this.$recaptcha.execute('login')
                await this.submitForm()
            } catch (error) {
                console.log('Login error:', error)
            }
        },
        submitForm(){
            let vm = this
            vm.enabled = false
            this.$axios.$post ( 
                vm.$attrs.widget.action , vm.form ).then ( resp => {
                vm.responseClass = 'text-green-400'
                vm.response = 'Your form was successfully submitted'
                vm.clearForm()
                vm.enabled = true
            }).catch ( error => {
                vm.response = 'An error occured. Please retry later.'
                vm.responseClass = 'text-red-500'
                vm.enabled = true
            })
        }
    },

}
</script>