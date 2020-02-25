<template>
    <div class="recommend">
        <div class="recommend-item" v-for="(item,index) in recommends" :key="index">
            <a :href="item.link">
                <img :src="item.image" alt=""/>
                <span>{{item.title}}</span>
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        name:'RecommentView',
        props: {
            recommends: {
                type: Array,
                default(){
                    return []
                }
            },
            feature:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        components: {
            
        },
    }
</script>

<style scoped>
.recommend{
    width: 100%;
    display: flex;
    font-size: 12px;
    text-align: center;
    padding: 15px 0;
    border-bottom: 10px solid #ccc;
}
.recommend-item{
    flex: 1;
    /* justify-content: center; */
}
.recommend-item>a>img{
    display: block;
    margin:0 auto;
    width: 70px;
    height: 70px;
    margin-bottom: 15px
}
/* .recommend-item>a>{
    width: 20%;
    
} */
</style>