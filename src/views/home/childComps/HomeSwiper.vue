<template>
    <div>
        <Swiper>
            <swiper-item v-for="(item,index) in banners" :key="index">
                <a :href="item.link">
                    <img :src="item.image" alt="" @load="imgLoad">
                </a>
            </swiper-item>
        </Swiper>
    </div>
</template>

<script>
import { Swiper,SwiperItem } from "components/comment/swiper/index";
    export default {
        name:'HomeSwiper',
        props: {
            banners: {
                type: Array,
                default(){
                    return []
                }
            },
        },
        components:{
            Swiper,
            SwiperItem
        },
        data() {
            return {
                isEmit: false
            }
        },
        methods: {
            imgLoad() {
                if(!this.isEmit){
                    // 将事件发送到父元素
                    this.$emit("imgLoad")
                    this.isEmit=true
                }
                
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>