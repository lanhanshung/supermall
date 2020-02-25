<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  data() {
    return {
      bScroll: null
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 指定滚动到那个位置
    scrollTo(x, y, time = 3000) {
      this.bScroll && this.bScroll.scrollTo(x, y, time);
    },
    // 完成下拉
    finishPullUp() {
      this.bScroll.finishPullUp();
    },
    // 异步请求过来的数据，在better-scroll中开始计算的高度，
    // 没有将新的图片高度计算进去，所以要进行刷新
    scrollRefresh() {
      // console.log(11,this.bScroll);

      this.bScroll && this.bScroll.refresh();
    },
    getScrollY() {  
      return this.bScroll.y ? this.bScroll.y : 0;
    }
  },
  components: {
    BScroll
  },
  mounted() {
    this.bScroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    });
    this.bScroll.on("scroll", position => {
      // 发送事件到父组件
      this.$emit("scroll", position);
    });
    this.bScroll.on("pullingUp", () => {
      // console.log(111);
      // 发送事件
      this.$emit("pullUpLoad");
    });
  }
};
</script>

<style scoped>
</style>