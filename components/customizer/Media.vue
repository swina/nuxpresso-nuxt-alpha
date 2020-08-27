<template>
    <div class="w-3/4 z-50 fixed bg-white p-4 overflow-y-auto cursor-pointer rounded border-2 border-black shadow" style="top:50%;left:50%;transform:translate(-50%,-50%);">
        <i class="material-icons absolute top-0 right-0" @click="$emit('close')">highlight_off</i>
        <div class="flex flex-wrap">
            <template v-for="(media,n) in files">
                <div class="w-1/4 px-2 text-xs mb-2" @click="setImage(media),selected=media">
                    <div :class="'w-100 mb-1 overflow-hidden border-4 border-transparent ' + active(media.id)">
                        <div class="relative w-100 pt-32 bg-black ">
                            <div class="flex items-center text-center h-full justify-center w-100 h-100 absolute top-0 left-0">
                                <img class="max-w-100 max-h-100 w-auto h-auto block m-auto" :src="media.url"/>
                            </div>
                        </div>
                    </div>
                    {{media.name.split('.')[0]}}
                    <br/>
                    {{media.width}}x{{media.height}} - {{media.size}}KB <span class="px-1 bg-gray-300 text-black rounded uppercase">{{media.ext.replace('.','')}}</span>
                </div>
            </template>
        </div>
        <div class="m-auto w-full text-center">
            <i @click="prev" v-if="start > 0" class="material-icons mr-2 text-3xl cursor-pointer">chevron_left</i>
            <i v-if="start < 1" class="material-icons mr-2 text-3xl text-gray-300">chevron_left</i>
            <i @click="next" v-if="files && files.length >= limit" class="material-icons text-3xl cursor-pointer">chevron_right</i>
            <i v-if="files && files.length < limit" class="material-icons text-3xl  text-gray-300">chevron_right</i>
        </div>
    </div>
</template>

<script>
import UploadQuery from '@/apollo/queries/upload/upload.gql'
export default {
    name: 'NuxpMedia',
    data:()=>({
        selected:null,
        start: 0,
        limit: 8
    }),
    apollo: {
        files : {
            prefetch: true,
            query: UploadQuery,
            variables(){
                return { limit : parseInt(this.limit) , start: parseInt(this.start) }
            }
        }
    },
    methods:{
        active(id){
            if ( this.selected )
                return this.selected.id === id ? 'border-blue-500' : ''
            return ''
        },
        setImage(image){
            this.$emit ('newimage', image )
        },
        next(){
            this.start = this.start + this.limit
        },
        prev(){
            this.start = this.start - this.limit
        }
    },
    mounted(){
        if ( window.localStorage.getItem('nuxpresso-jwt') ){
            this.$axios.defaults.headers.common = {
                    'Authorization': window.localStorage.getItem('nuxpresso-jwt')
            }   
        }
    }
}
</script>