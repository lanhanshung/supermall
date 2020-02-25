<template>
    <div class="tab-bar-item" @click="itemClick()">
        <!-- 选中的时候显示第二个插槽，否则显示第一个 -->
        <div v-if="!isactive"><slot name="item-icon"></slot></div>
        <div v-else><slot name="item-icon-active"></slot></div>
        <div :style="{color:activeStyle}"><slot name="item-text"></slot></div>
        
    </div>
</template>

<script>
    export default {
        name:'tab-bar-item',
        // 接受父组件（app.vue)传过来的path
        props: {
            path: {
                type: String,
                default: "/home"
            },
            activeColor:{
                type:String,
                default:'red'
            }
        },
        data() {
            return {
                
            }
        },
        computed:{
            isactive(){
                // this.$route.path会得到所有的item个相同path，this.path会传过来所有的path
                // console.log(this.$route,this.path);
                //this.$route.path中的path是$route中的,this.path是上面定义的属性
                return this.$route.path.indexOf(this.path)!==-1 //找到是返回0
            },
            activeStyle(){
                // console.log(this.activeColor);
                // 判断是否选中，选中就给他颜色，否则就不给颜色
                return this.isactive?this.activeColor:""
            }
        },
        methods: {
            itemClick() {
                // 通过父组件（vue.js)中传递的path参数决定跳转的view
                // 当在某个路由时，再次点击该路由会报错，加一个判断即可，this.$route表示当前活跃的路由
                if(this.$route.path!=this.path){
                    this.$router.replace(this.path)
                    // console.log(this.isactive);
                    
                }
                
            }
        },
    }
</script>

<style>
.tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
}
.tab-bar-item img{
    display: block;
    width: 24px;
    height: 24px;
    margin: 0 auto;
}

</style>