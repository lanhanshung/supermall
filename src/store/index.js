import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    goodsList: []
  },
  mutations: {
    // addGoods(state, payload) {
    // 在做添加的时候需要判断之前是否有该商品，有则count+=1,否则添加到goodsList中，并设置count为1
    // 1：
    // let oldProduct=null
    // for (let item of state.goodsList) {
    //   console.log(1)
    //   if (item.iid===payload.iid) {
    //     oldProduct=item 
    //   } 
    // }
    // if(oldProduct){
    //   oldProduct.count++
    // }else{
    //   payload.count=1
    //   state.goodsList.push(payload)
    // }
    // 2：
    // if (state.goodsList!= false) {
    //   for (let item of state.goodsList) {
    //     if (item.iid === payload.iid) { 
    //       item.count++
    //     } else {
    //       payload.count=1
    //       state.goodsList.push(payload)
    //     }
    //   }
    // } else {
    //   payload.count=1
    //   state.goodsList.push(payload)
    // }

    // 3；

    // console.log(state.goodsList);

    // },
    addCounter(state, payload) {

      payload.count++



    },
    addToCart(state, payload) {

      state.goodsList.push(payload)

    },
    updateCheck(state, payload) {
      payload.check = !payload.check
    },
    selectAll(state, payload) {
      state.goodsList.forEach(item => {
        // console.log(item);

        item.check = true
      })
    },
    canelSelectAll(state, payload) {
      state.goodsList.forEach(item => {
        item.check = false
      })
    }
  },
  actions: {
    addGoods(context, payload) {
      // 返回一个promise对象
      return new Promise((resolve, reject) => {
        let oldProduct = context.state.goodsList.find(item => item.iid === payload.iid)
        if (oldProduct) {
          // oldProduct.count++
          context.commit("addCounter", oldProduct)
          resolve("商品数量+1")
        } else {
          payload.count = 1
          payload.check = true
          context.commit("addToCart", payload)
          resolve("成功添加商品")
          // context.state.goodsList.push(payload)
        }
      })
    },
    updateGood(context, payload) {
      let newProduct = context.state.goodsList.find(item => item.iid === payload.iid)
      context.commit("updateCheck", newProduct)
    },
    toSelectAll(context, payload) {
      context.commit("selectAll")
    },
    toSelectNo(context, payload) {
      context.commit("canelSelectAll")
    }
  },
  modules: {},
  getters: {
    getGoodsListLength(state) {
      return state.goodsList.length
    },
    getGoodsList(state) {
      return state.goodsList
    }
  }
})
