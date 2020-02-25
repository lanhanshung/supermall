<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav-bar" ref="nav" @titleClick="titleClick"></detail-nav-bar>
    
    <Scroll class="content" ref="scroll" :probeType="3" @scroll="scroll">
      <detail-swiper :banners="banners"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shops="shops"></detail-shop-info>
      <detail-goods-info :goodsDetail="goodsDetail" @imgLoad="imgLoad"></detail-goods-info>
      <detail-param-info ref="param" :goodsParamInfo="goodsParamInfo"></detail-param-info>
      <detail-commend-info ref="commend" :detailCommendInfo="detailCommendInfo"></detail-commend-info>
      <detail-recommend-info ref="recommend" :recommendList="recommendList" ></detail-recommend-info>
    </Scroll>
    <detail-bottom-bar @addToCar="addToCar"></detail-bottom-bar>
    <back-top @click.native="backTopClick" v-show="isShowBackTop"></back-top>
    <!-- <toast ref="toast" :message="message" :isShow="isShow"></toast> -->
  </div>
</template>

<script>
import DetailNavBar from "./detailChildren/DetailNavBar";
import DetailSwiper from "./detailChildren/DetailSwiper";
import DetailBaseInfo from "./detailChildren/DetailBaseInfo";
import DetailShopInfo from "./detailChildren/DetailShopInfo";
import DetailGoodsInfo from "./detailChildren/DetailGoodsInfo";
import DetailParamInfo from "./detailChildren/DetailParamInfo";
import DetailCommendInfo from "./detailChildren/DetailCommendInfo";
import DetailRecommendInfo from "./detailChildren/DetailRecommendInfo";
import DetailBottomBar from "./detailChildren/DetailBottomBar";

import Scroll from "components/comment/scroll/Scroll";
// import Toast from "components/comment/toast/Toast";

import { debounce } from "common/utils";
import { itemImgListenMixin, backTopMixin } from "common/mixin";

import { mapActions } from "vuex";

import {
  getDetail,
  getDetailRecommend,
  Goods,
  Shop,
  GoodsParam
} from "network/detail";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      banners: [],
      goods: {},
      shops: {},
      goodsDetail: {},
      goodsParamInfo: {},
      detailCommendInfo: {},
      recommendList: [],
      titleScrollTopYs: [],
      getTitleScrollTopY: null,
      curOptionY: 0, //当前滚动的y值
      curIndex: 0 ,//保存当前需要传入到导航里面的索引
      message:'',
      isShow:false
    };
  },
  mixins: [itemImgListenMixin,backTopMixin],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommendInfo,
    DetailRecommendInfo,
    DetailBottomBar,
    // Toast
  },
  // 组件创建完成时获取iid
  created() {
    this.iid = this.$route.params.iid;

    // 请求数据
    getDetail(this.iid).then(res => {
      //   console.log(res);
      // 获取轮播图
      this.banners = res.data.result.itemInfo.topImages;

      // 2.3.获取商品信息
      this.goods = new Goods(
        res.data.result.itemInfo,
        res.data.result.columns,
        res.data.result.shopInfo.services
      );

      // 获取商店信息
      this.shops = new Shop(res.data.result.shopInfo);

      //  获取商品的详细信息
      this.goodsDetail = res.data.result.detailInfo;

      //  获取商品尺寸的信息
      this.goodsParamInfo = new GoodsParam(
        res.data.result.itemParams.info,
        res.data.result.itemParams.rule
      );

      // 2.7.保存评论信息
      if (res.data.result.rate.list) {
        this.detailCommendInfo = res.data.result.rate.list[0];
      }
    });

    // 请求推荐的信息
    getDetailRecommend().then(
      res => {
        this.recommendList = res.data.data.list;
      },
      err => {
        console.log(err);
      }
    );

    // 数据获取完成后，获取每个标题的offsetTop，
    // 在这里要进行一个延时的操作，因为，实在create中，dom节点和图片资源还未加载成功
    this.getTitleScrollTopY = debounce(() => {
      // 因为获取的offsetTop值是在不断更新的，所以在这里要进行一个初始化
      this.titleScrollTopYs = [];
      this.titleScrollTopYs.push(0); //商品
      this.titleScrollTopYs.push(this.$refs.param.$el.offsetTop); //参数
      this.titleScrollTopYs.push(this.$refs.commend.$el.offsetTop); //评论
      this.titleScrollTopYs.push(this.$refs.recommend.$el.offsetTop); //推荐
      // 将js中最大的数保存在数组中
      this.titleScrollTopYs.push(Number.MAX_VALUE);

      // console.log(this.titleScrollTopYs);
    }, 50);
  },
  mounted() {
    //   const refresh=debounce(this.$refs.scroll.scrollRefresh,50)
    //   this.itemImgListen=()=>{
    //       refresh()
    //   };
    //   //  监听全局事件imgLoad
    //   this.$bus.$on("imgLoad",this.itemImgListen)
  },
  destroyed() {
    //   取消对全局事件imgLoad的监听
    this.$bus.$off("imgLoad", this.itemImgListen);
  },
  methods: {
    ...mapActions(["addGoods"]),
    imgLoad() {
      //  图片加载完成，刷新scrool,调用混入，使刷新只执行一次
      // this.$refs.scroll.scrollRefresh();
      this.refresh();
      // 计算title的offsetTop，并对其重新赋值
      this.getTitleScrollTopY();
    },
    titleClick(index) {
      // console.log(index);
      // 点击某个标题时，设置对应的scrollTop
      this.$refs.scroll.scrollTo(0, -this.titleScrollTopYs[index], 100);
    },
    scroll(position) {
      this.curOptionY = -position.y;

      // 监听滚动，确定回顶按钮的显示与隐藏
      this.isShowBackTop = this.curOptionY > 1000;

      // console.log(this.curOptionY);
      // 循环遍历titleScrollTopYs获取数组中的某一个值
      for (let i = 0; i < this.titleScrollTopYs.length - 1; i++) {
        if (
          this.curIndex !== i &&
          (this.curOptionY >= this.titleScrollTopYs[i] &&
            this.curOptionY <= this.titleScrollTopYs[i + 1])
        ) {
          this.curIndex = i;

          this.$refs.nav.curIndex = this.curIndex;
          // console.log(this.$refs.nav.curIndex);
        }
      }
    },
    backTopClick() {
      // 返回顶部
      this.$refs.scroll.scrollTo(0, 0);
      this.isShowBackTop = true;
    },
    addToCar(){
      
        const product={}
        product.iid=this.iid
        product.desc=this.goodsDetail.desc
        product.image=this.goodsDetail.detailImage[0].list[0]
        product.nowPrice=this.goods.nowPrice
        product.title=this.goods.title
        // this.$store.dispatch("addGoods",product).then(res=>{
        //   console.log(res);
          
        // })
        
        
        // 上面已经将vuex中的actions中的addGoods映射到组件中，可直接使用
        this.addGoods(product).then(res=>{
          this.$toast.show(res,2000)
          // console.log(this.$toast);
          
        //   this.message=res
        //   this.isShow=true
        //   setTimeout(() => {
        //     this.message=""
        //     this.isShow=false
        //   }, 2000);
          
        })
      
    }
  }
};
</script>

<style scoped>
.detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.content {
  height: calc(100% - 44px - 49px);
  overflow: hidden;
}
.detail-nav-bar {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>