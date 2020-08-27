<template>
    <div v-if="$attrs.portfolio" :class="'flex flex-row w-full flex-wrap flex-grow nuxpresso-portfolio nuxpresso-portfolio-' + $attrs.portfolio.id">
        <div :key="'item_' + i" v-for="(item,i) in $attrs.portfolio.item" :class="'w-full md:w-1/' + $attrs.portfolio.max_columns + ' ' + $attrs.portfolio.css">
            <div :class="'nuxpresso-' + factor + ' bg-no-repeat bg-cover bg-center'" :style="background(item)">
                <!--<img v-if="item.image" :src="item.image.url" class="nuxpresso-responsive-child object-cover"/>-->   
                <div :class="'nuxpresso-responsive-child'">
                    <div :class="item.css + ' h-full'">
                        <a v-if="item.link_url" :href="item.link_url" :class="item.css">
                            <div v-html="title(item)" v-if="item.title"></div>
                            <div v-html="subtitle(item)" v-if="item.subtitle"></div>
                            <div v-html="description(item)" v-if="item.description"></div>
                            <button class="mt-2" v-if="item.button">{{ item.button }}</button>
                        </a>
                        <div v-else :class="item.css">
                            <div v-html="title(item)" v-if="item.title"></div>
                            <div v-html="subtitle(item)" v-if="item.subtitle"></div>
                            <div v-html="description(item)" v-if="item.description"></div>
                            <button class="mt-2" v-if="item.button">{{ item.button }}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NuxpPortfolio',
    data:()=>({
        heading : {
            'H1' : 'text-xl md:text-2xl lg:text-4xl lg:pb-2',
            'H2' : 'text-lg md:text-2xl lg:text-3xl lg:pb-2',
            'H3' : 'text-base leading-6 lg:text-2xl lg:pb-1',
            'H4' : 'text-base leading-5 lg:text-xl lg:pb-1',
            'H5' : 'text-sm leading-4 md:text-base lg:text-lg lg:pb-1'
        },
        paragraph : {
            'xs' : 'text-xs',
            'sm' : 'text-xs lg:text-sm',
            'base' : 'text-sm lg:text-base',
            'lg' : 'text-base lg:text-lg',
            'xl' : 'text-lg lg:text-xls'
        }
    }),
    computed:{
        factor(){
            return this.$attrs.portfolio.factor ?
                    this.$attrs.portfolio.factor === 'square' ? '4-4' :
                        this.$attrs.portfolio.factor === 'wide' ? '4-3' :
                            this.$attrs.portfolio.factor === 'extrawide' ? '16-9' : '' : ''
        },

    },
    methods:{
        background(item){
            return item.image ? 'background-image:url(' + item.image.url + ');' : ''
        },
        title(item){
            return '<div class="' + this.heading[item.title_type] + ' font-bold">' + item.title + '</div>'
        },
        subtitle(item){
            return '<div class="' + this.heading[item.subtitle_type] + '">' + item.subtitle + '</div>'
        },
        description(item){
            return '<div class="leading-5 text-' + this.paragraph[item.description_size] + '">' + item.description.split('\n').join('<br/>') + '</div>' 
        }

    }
}
</script>