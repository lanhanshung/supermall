<template>
    <div>
        <swiper class="swiperBox">
            <swiper-item v-for="(item, index) in banners" :key="index">
                <img :src="item" alt="">
            </swiper-item>
        </swiper>
    </div>
</template>

<script>
    import {Swiper,SwiperItem} from 'components/comment/swiper/index'
    export default {
        name:'DetailSwiper',
        components:{
            Swiper,
            SwiperItem
        },
        props: {
            banners: {
                type: Array,
                default: []
            },
        },
    }
</script>

<style scoped>
.swiperBox{
    position: relative;
    height: 300px;
}
</style>