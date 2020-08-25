<template>
    <div>
            <div v-for="(item,i) in $attrs.timeline.time_event" class="flex flex-row">
                <div class="p-2 w-1/5 text-right flex flex-row items-center justify-end border-r-2 relative">
                    <div class="pr-6">{{ item.time }}</div>
                    <div class="absolute block h-4 w-4 bg-red-500 right-0 -mr-2"></div>
                </div>
                <div class="p-2 pl-6 w-4/5">{{ item.event }}</div>
            </div>
        
    </div>
</template>