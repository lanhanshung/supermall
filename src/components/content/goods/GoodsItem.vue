<template>
  <div class="goods-item">
    <!-- 监听图片是否加载完成 -->
    <img v-lazy="showImg" alt="" @load="imgLoad()" @click="showDetail"/>
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  created() {
    // console.log(this.goodsItem.show.img);
  },
  methods: {
    imgLoad() {
      // 图片加载完成，向祖宗发送事件
      this.$bus.$emit("imgLoad")
    },
    showDetail(){
      // 进行路由跳转
      this.$router.push('/detail/'+this.goodsItem.iid)
    }
  },
  // 添加计算属性，传过来的数据不同，在这里进行筛选
  computed: {
    showImg() {
      // console.log(this.goodsItem.show.img);
      
      return this.goodsItem.image||this.goodsItem.show.img
      // return this.goodsItem.show.img||this.goodsItem.image
    }
  },
};
</script>

<style scoped>
.goods-item{
  padding-bottom: 40px;
  position: relative;
  width: 40%;
  /* display: flex; */
}
.goods-item img {
  width: 100%;
  /* flex: 1; */
}

.goods-info {
  /* flex: 1; */
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: 0;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>