<template>
    <div class="tabControl">
        <div class="tabControl-item" v-for="(item,index) in tabs" :key="index" 
        :class="{active:index===curIndex}"
        @click="tabItemClick(index)">
            <span>{{item}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name:'TabControl',
        props: {
            tabs: {
                type: Array,
                default(){
                    return []
                }
            },
        },
        data() {
            return {
                curIndex: 0,
            }
        },
        methods: {
            tabItemClick(index) {
                this.curIndex=index;
                // 发出事件将数据传到父组件
                this.$emit("itemClick",this.curIndex)
            }
        },
    }
</script>

<style scoped>
.tabControl{
    display: flex;
    text-align: center;
    background-color: #fff;
    font-size: 15px;
    line-height: 40px;
    height: 40px;
}
.tabControl-item{
    flex:1;
    
    
}
.tabControl-item>span{
    
    padding: 5px;
}
.active span{
    color: var(--color-high-text);
    border-bottom: 3px solid var(--color-tint);
    
}
</style>