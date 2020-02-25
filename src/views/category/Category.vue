<template>
  <div class="categoory">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    
      <scroll class="content" ref="scrollAside">
        <aside>
          <ul>
            <li v-for="(item, index) in catData" :key="index">
              <a
                href="javascript:void(0);"
                :class="{ active: index === curIndex }"
                @click="liClick(index)"
                >{{ item }}</a
              >
            </li>
          </ul>
        </aside>
      </scroll>
      <right-goods :goodsData="goods" class="goods"></right-goods>
    
  </div>
</template>

<script>
import NavBar from 'components/comment/navbar/NavBar'
import Scroll from 'components/comment/scroll/Scroll'
import Goods from 'components/content/goods/Goods'
import RightGoods from './cateChildren/RightGoods'

import { getHomeData } from 'network/home'



export default {
  name: 'Category',
  data () {
    return {
      bScroll: null,
      catData: [
        '热门推荐',
        '男装',
        '女装',
        '男鞋',
        '女鞋',
        '内衣配饰',
        '衣服',
        '裤子',
        '鞋子',
        '袜子',
        '男鞋',
        '女鞋',
        '外套',
        '西装',
        '裙子'
      ],
      //  当前的a的索引
      curIndex: 0,
      goods: {
        pop: { page: 1, list: [] },
        new: { page: 1, list: [] },
        sell: { page: 1, list: [] }
      }
    }
  },
  
  computed: {
    showGoods () {
      return this.goods.pop.list
    }
  },
  created () {
    this.getHomeData('pop')
    this.getHomeData('new')
    this.getHomeData('sell')
  },
  mounted () {},
  components: {
    NavBar,
    Scroll,
    Goods,
    RightGoods
  },
 
  methods: {
    liClick (index) {
      this.curIndex = index
    },
    // 请求数据
    getHomeData (type) {
      getHomeData(type, this.goods[type].page).then(res => {
        this.goods[type].list.push(...res.data.data.list)
        this.goods[type].page += 1
      })
    }
  }
}
</script>

<style scoped>
.categoory {
  height: 100vh;
}
.main{
  display: flex;
}
.content {
  height: calc(100% - 44px - 49px);
  overflow: hidden;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #ffffff;
}
aside {
  width: 85px;
  background-color: #fff;
  /* display: flex; */
}

li {
  list-style: none;
  margin: 15px auto;
  height: 46px;
  line-height: 46px;
  text-align: center;
  padding: 5px;
}
.active {
  color: #e93b3d;
}
.goods{
  position: absolute;
  left: 85px;
  top:  59px;
  bottom: 49px;
  right: 0px;
}
</style>
