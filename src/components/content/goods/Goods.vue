<template>
    <div class="goods" >
        <GoodsItem v-for="(item,index) in goods" :key="index" :goodsItem='item'></GoodsItem>
    </div>
</template>

<script>
import GoodsItem from './GoodsItem'
    export default {
        name:'Goods',
        components: {
            GoodsItem,
        },
        props: {
            goods: {
                type: Array,
                default(){
                    return []
                }
            },
        },
        
    }
</script>

<style scoped>
.goods{
    display: flex;
    flex-flow: wrap;
    justify-content: space-evenly;
}
</style>