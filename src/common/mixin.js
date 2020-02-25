// 混入
import { debounce } from "common/utils";
export const itemImgListenMixin={
    data() {
        return {
            itemImgListen:null,
            refresh:null
        }
    },
    mounted () {
        this.refresh=debounce(this.$refs.scroll.scrollRefresh,50)
        // 在这里的refresh不会被清理，形成了一个私有域
        this.itemImgListen=()=>{
            this.refresh()
        };
        //  监听全局事件imgLoad
        this.$bus.$on("imgLoad",this.itemImgListen)
    },
}


import BackTop from "components/comment/backTop/BackTop";
export const backTopMixin={
    data() {
        return {
            isShowBackTop: false,
        }
    },
    components: {
        BackTop,
    },
}