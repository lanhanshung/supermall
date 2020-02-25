<template>
  <div>
    <scroll class="content" ref="scroll">
      <goods :goods="showGoods"></goods>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/comment/scroll/Scroll'
import Goods from 'components/content/goods/Goods'

import { debounce } from "common/utils";
import { itemImgListenMixin ,backTopMixin} from "common/mixin";

export default {
  name: 'RightGoods',
  data () {
    return {}
  },

  props: {
    goodsData: {
      type: Object,
      default: {}
    }
  },
  mixins:[itemImgListenMixin,backTopMixin],
  computed: {
    showGoods () {
      return this.goodsData.pop.list
    }
  },
  components: {
    Scroll,
    Goods
  },
  mounted () {
    //   this.$refs.scroll.bScroll.maxScrollY=-1000;
  },
  activated(){
    // 进入该页面时
    // console.log(this.$refs.scroll.bScroll.maxScrollY);
    // this.$refs.scroll.scrollTo(0,this.saveY,0)
    
  },
}
</script>

<style scoped>
div {
  height: 100vh;
}
.content {
  height: calc(100% - 44px - 49px);
  overflow: hidden;
}
.goods {
  width: 277px;
  height: 582px;
}
</style>
