<template>
  <div class="shop-bottom">
    <div class="check-all">
      <check-button class="check-button" :check="isCheckAll" @click.native="selectAll"></check-button>
      <span>全选</span>
    </div>

    <div class="price-all">
      <span>合计{{getGoodsPrice}}</span>
    </div>

    <div class="settlement-box">
      <div class="settlement" @click="goPay">去结算({{getCheckCount}})</div>
    </div>
    
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import CheckButton from "components/content/checkButton/CheckButton";
export default {
  name: "ShopBottom",
  data() {
    return {
        
    };
  },
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(["getGoodsList"]),
    getCheckGood() {
      return this.getGoodsList.filter(item => {
        return item.check;
      });
    },
    getCheckCount() {
      return this.getCheckGood.length;
    },
    getGoodsPrice() {
      if (this.getCheckCount === 0) {
        return "￥"+0+"元";
      } else {
        return "￥"+this.getCheckGood
          .reduce((prev, now) => {
            return now.nowPrice * now.count + prev;
          }, 0)
          .toFixed(2)+"元";
      }
    },
    isCheckAll(){
        // 得到全选的状态，true为全选中，false为非全选中
        //判断购物车是否为空
        if(this.getGoodsList.length===0) return false
        // 查找列表中是否有未选中的，有返回false，没找到返回underfind取反是true
        return !this.getGoodsList.find(item=>!item.check)
    }
  },
  methods: {
      selectAll() {
          if(this.isCheckAll){
            //   this.getGoodsList.forEach(item => {
            //       this.$store.dispatch("updateGood",item)
            //     //   item.check=false
            //   });
            
            
            this.$store.dispatch("toSelectNo")
          }
          else{
            //   this.getGoodsList.forEach(item => {
            //       this.$store.dispatch("updateGood",item)
            //   });
            this.$store.dispatch("toSelectAll")
          }
      },
      goPay(){
          
          if(this.getCheckGood.length===0){
              this.$toast.show("没有选中一件商品")
          }
      }
  },
};
</script>

<style scoped>
.shop-bottom {
  width: 100%;
  position: relative;
  height: 49px;
  /* line-height: 49px; */
  display: flex;
  align-items: center;
  text-align: center;
  background-color: #eee;
}
.check-all{
    width: 60px;
    display: flex;
    margin-left: 15px;
}
/* .check-button{
    width: 20px;
    height: 20px;
    background-color: #ccc;
    border-radius: 50%;
    margin-right: 5px;
} */
.price-all{
    flex: 1;
    
}
.settlement-box{
    width: 100px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
    background-color: #f00;
    color: #ffffff;
}
</style>