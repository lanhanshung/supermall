<template>
  <div class="shop-car">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{getGoodsListLength}})</div>
    </nav-bar>
    <Scroll class="content" ref="scroll">
      <div v-if="Object.keys(getGoodsList).length!==0">
        <shop-list-item v-for="(item,index) in getGoodsList" :key="index" :item="item">
        </shop-list-item>
      </div>
    </Scroll>
    <shop-bottom></shop-bottom>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import NavBar from "components/comment/navbar/NavBar";
import Scroll from "components/comment/scroll/Scroll";

import ShopListItem from "./shopCarChildren/ShopListItem";
import ShopBottom from "./shopCarChildren/ShopBottom";

export default {
  name: "ShopCar",
  components: {
    NavBar,
    Scroll,
    ShopListItem,
    ShopBottom
  },
  computed: {
    // 新语法
    ...mapGetters(["getGoodsListLength", "getGoodsList"])
  },
  activated(){
    // 进入购物车页面时
    this.$refs.scroll.scrollRefresh()
  }
};
</script>

<style  scoped>
.shop-car {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #ffffff;
}
.content {
  height: calc(100% - 44px - 49px - 49px);
  overflow: hidden;
}
</style>