<template>
  <div class="recommend-info">
    <div class="info-header">热门推荐</div>
    <Goods :goods="recommendList">
      <goods-list-item v-for="(item, index) in recommendList" :key="index" :goods="item"></goods-list-item>
    </Goods>
  </div>
</template>

<script>
import Goods from "components/content/goods/Goods";
export default {
  name: "DetailRecommendInfo",
  props: {
    recommendList: {
      type: Array,
      default: []
    }
  },
  components: {
    Goods
  },
  
};
</script>

<style scoped>
.recommend-info {
  padding: 5px;
}

.info-header {
  line-height: 40px;
  padding-left: 8px;
  font-size: 15px;
  color: #333;
}
</style>