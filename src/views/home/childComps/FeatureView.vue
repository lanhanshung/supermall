<template>
    <div class="feature">
        <div class="feature-item">
            <a href="http://act.mogujie.com/zzlx67">
                <img src="~assets/img/home/recommend_bg.jpg"/>
               
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        name:'FeatureView',
        props: {
            comments: {
                type: Array,
                default(){
                    return []
                }
            },
        },
    }
</script>

<style scoped>
.feature{
    margin-top: 15px;
}
.feature-item>a>img{
    width: 100%;
}
</style>