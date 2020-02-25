<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :tabs="tabs" class="tabControlCopy" @itemClick="itemClick" 
    ref="tabControlCopy" v-show="isTabFix"></tab-control>
    <Scroll class="content" ref="scroll" 
        @scroll="scrollPosition" 
        :probeType="3" 
        :pullUpLoad="true"
        @pullUpLoad="loadMore">
      <home-swiper :banners="banners" @imgLoad="imgLoadFinish"></home-swiper>

      <recomment-view :recommends="recommends"></recomment-view>
      <feature-view></feature-view>
      <tab-control :tabs="tabs" @itemClick="itemClick" ref="tabControl" v-show="!isTabFix"></tab-control>
      <Goods :goods="showGoods"></Goods>
    </Scroll>
    <!-- 组件的事件添加 native -->
    <back-top @click.native="backTopClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "components/comment/navbar/NavBar";
import Scroll from "components/comment/scroll/Scroll";
// import BackTop from "components/comment/backTop/BackTop";

import TabControl from "components/content/tabControl/TabControl";
import Goods from "components/content/goods/Goods";

import HomeSwiper from "./childComps/HomeSwiper";
import RecommentView from "./childComps/RecommentView";
import FeatureView from "./childComps/FeatureView";

import { getHomeMultidata, getHomeData } from "network/home";
import { debounce } from "common/utils";
import { itemImgListenMixin ,backTopMixin} from "common/mixin";

export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      tabs: ["流行", "新款", "精选"],
      goods: {
        pop: { page: 1, list: [] },
        new: { page: 1, list: [] },
        sell: { page: 1, list: [] }
      },
      goodsType: ["pop", "new", "sell"],
      goodType: "pop",
      // isShowBackTop: false,
      tabOffsetTop:0,
      isTabFix:false,
      saveY:0,
      // itemImgListen:null
    };
  },
  mixins:[itemImgListenMixin,backTopMixin],
  computed: {
    showGoods() {
      // 注意：此处不能写成 this.goods.this.goodType.list,因为会先计算this.goods.this，导致报错
      return this.goods[this.goodType].list;
    }
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommentView,
    FeatureView,
    TabControl,
    Goods,
    Scroll,
    // BackTop
  },
  created() {
    this.getHomeMultidata();
    this.getHomeData("pop");
    this.getHomeData("new");
    this.getHomeData("sell");
  },
  mounted() {
    // const refresh=debounce(this.$refs.scroll.scrollRefresh,50)
    // this.itemImgListen=() => {
    //   // console.log(this.$refs.scroll.scrollRefresh);
    //   refresh()
      
    // }
    // // 监听图片加载完成的事件
    // this.$bus.$on("imgLoad", this.itemImgListen);
  },
  destroyed () {
    // console.log(111);
    
  },
  activated(){
    // 进入该页面时
    console.log(this.$refs.scroll);
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.scrollRefresh()
  },
  deactivated(){
    // 离开该页面时
    // console.log("deactivated");
    // console.log(this.$refs.scroll.bScroll.y);
    // 保存y值
    this.saveY=this.$refs.scroll.getScrollY()

    // 离开时取消全局事件的监听
    this.$bus.$off("imgLoad",this.itemImgListen)
  },
  methods: {
    

    // 事件监听的方法
    itemClick(curIndex) {
      this.goodType = this.goodsType[curIndex];
      // 将组件的curIndex修改为当前curIndex，同步两个tabControl
      this.$refs.tabControlCopy.curIndex=curIndex
      this.$refs.tabControl.curIndex=curIndex
      
    },
    // 返回顶部事件
    backTopClick() {
      // 调用scroll组件的scrollTo方法
      this.$refs.scroll.scrollTo(0, 0, 3000);
    },
    scrollPosition(position) {
      // console.log(position);
      // 监听滚动 判断是否滑到指定位置，决定回顶按钮显示隐藏
      this.isShowBackTop = (-position.y) > 1000 
      // console.log((-position.y));
      
      // 监听是否滚动到tabOffsetTop位置，是则将其效果设置为吸顶
       this.isTabFix=(-position.y) >= (this.tabOffsetTop)
       
        // console.log(1);
    },
    loadMore(){
      // 再次请求数据进行加载
      this.getHomeData(this.goodType)
      // console.log(this);
      this.$refs.scroll.finishPullUp()
    },
    // 轮播图加载完成时才开始计算选项卡的offsetTop
    imgLoadFinish(){
      // 获取offsetTop,通过$refs.tabControl获取的是组件对象，添加$el获取的是原生对象
      this.tabOffsetTop=this.$refs.tabControl.$el.offsetTop;
      
    },
    /**
     * 网络请求相关方法
     */

    getHomeMultidata() {
      getHomeMultidata().then(
        res => {
          // console.log(res.data.data.banner.list[0].link);
          //   console.log(res.data.data.banner.list);

          this.banners = res.data.data.banner.list;
          this.recommends = res.data.data.recommend.list;
        },
        err => {
          console.log(err.message);
        }
      );
    },
    getHomeData(type) {
      getHomeData(type, this.goods[type].page).then(res => {
        // console.log(res.data.data.list);
        this.goods[type].list.push(...res.data.data.list);
        this.goods[type].page += 1;

        // this.$refs.scroll.finishPullUp();
      });
    }
  }
};
</script>

<style  scoped>
#home {
  /* margin-top: 44px; */
  /* position: relative; */
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: #ffffff;
  /* 在使用浏览器原生滚动时，为了让导航在顶部显示 */
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9; */
  /* margin-bottom: 44px; */
}
/* .tabControlCopy{ */
 
  /* top: 44px;
  left: 0;
  right: 0; */

/* } */
/* .tabControl {
  position: sticky;
  top: 44px;
  z-index: 9;
} */
/* .content{
  
  position: absolute;
  height: 300px; 
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  
  border-bottom: 3px solid red;
  
} */
.content {
  height: calc(100% - 91px);
  /* height: 475px; */
  overflow: hidden;
}
</style>