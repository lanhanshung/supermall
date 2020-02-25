<template>
  <div v-if="Object.keys(goodsDetail).length!==0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{goodsDetail.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{goodsDetail.detailImage[0].key}}</div>
    <div class="info-list">
      <img
        v-for="(item, index) in goodsDetail.detailImage[0].list"
        @load="loadImg"
        :src="item"
        alt
        :key="index"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    goodsDetail: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      imgLength: 0,
      count: 0
    };
  },
  methods: {
    loadImg() {
      //   图片加载完成
      this.count++;
      if (this.count >= this.imgLength) {
        // console.log(1);
        this.$emit("imgLoad");
      }
    }
  },
  watch: {
    goodsDetail() {
      //   获取详细列表的图片长度并保存起来
      this.imgLength = this.goodsDetail.detailImage[0].list.length;
    }
  }
};
</script>

<style scoped>
.goods-info {
  padding: 20px 0;
  border-bottom: 5px solid #f2f5f8;
}

.info-desc {
  padding: 0 15px;
}

.info-desc .start,
.info-desc .end {
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
  position: relative;
}

.info-desc .start {
  float: left;
}

.info-desc .end {
  float: right;
}

.info-desc .start::before,
.info-desc .end::after {
  content: "";
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: #333;
  bottom: 0;
}

.info-desc .end::after {
  right: 0;
}

.info-desc .desc {
  padding: 15px 0;
  font-size: 14px;
}

.info-key {
  margin: 10px 0 10px 15px;
  color: #333;
  font-size: 15px;
}

.info-list img {
  width: 100%;
}
</style>