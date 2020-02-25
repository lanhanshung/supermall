<template>
    <div>
        <nav-bar>
            <div slot="left" class="back" @click="back()"><img src="~assets/img/common/back.svg" alt=""></div>
            <div slot="center" class="titleBox">
                <div class="title" v-for="(item,index) in titles" :key="index">
                    <div :class="{active:curIndex===index}" @click="changeTitle(index)">{{item}}</div>
                </div>
            </div>
        </nav-bar>
    </div>
</template>

<script>
    import NavBar from 'components/comment/navbar/NavBar'
    export default {
        name:'DetailNavBar',
        components:{
            NavBar,
        },
        data() {
            return {
                titles: ['商品','参数','评论','推荐'],
                curIndex:0,
            }
        },
        
        methods: {
            changeTitle(index) {
                this.curIndex=index
                // 将index发送到父组件中
                this.$emit("titleClick",index)
            },
            back(){
                this.$router.back()
            }
        },
    }
</script>

<style scoped>
.titleBox{
    display: flex;
    font-size: 13px;
}
.active{
    color: var(--color-high-text);
}
.title{
    flex: 1;
}
.back{
    position: relative;
    top: 6px;
    left: 3px;
}
</style>