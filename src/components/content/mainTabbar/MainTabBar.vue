<template>
  <!-- 下面是大写的TabBar，在这里可以用tab-bar代替 -->
  <tab-bar>
    <tab-bar-item path="/home" activeColor="blue">
      <img src="~assets/img/tabbar/home.svg" slot="item-icon" alt />
      <img src="~assets/img/tabbar/home_active.svg" slot="item-icon-active" alt />
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category">
      <img src="~assets/img/tabbar/category.svg" slot="item-icon" alt />
      <img src="~assets/img/tabbar/category_active.svg" slot="item-icon-active" alt />
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/shopCar">
      <img src="~assets/img/tabbar/cart.svg" slot="item-icon" alt />
      <img src="~assets/img/tabbar/cart_active.svg" slot="item-icon-active" alt />
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <img src="~assets/img/tabbar/profile.svg" slot="item-icon" alt />
      <img src="~assets/img/tabbar/profile_active.svg" slot="item-icon-active" alt />
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from "components/comment/tabbar/TabBar";
import TabBarItem from "components/comment/tabbar/TabBarItem";
export default {
    components:{
        TabBar,
        TabBarItem
    }
  
};
</script>

<style  scoped>
</style>