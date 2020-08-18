<template>
    <div class="testimonials">
        <div class="scroller">
            <div class="item">
                Item 1
            </div>
            <div class="item">
                Item 2
            </div>
            <div class="item">
                Item 3
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NuxpCarousel'
}
</script>

<style scoped>
.testimonials {
   max-width: 800px;
   margin: auto;
}
.scroller  {
   overflow-x: scroll;
   display: flex;
   scroll-snap-type: x mandatory;
}
.item {
   min-width: 100%;
   min-height: 200px; /* To start with */
   background-color: #EDF2F7; /* For demo */
   scroll-snap-align: center;

}
</style>