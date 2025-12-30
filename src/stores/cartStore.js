import { defineStore } from "pinia";
import { ref } from "vue";

export const useCartStore = defineStore('cart', () => {
  // state ——cartList
  const cartList = ref([])
  // action ——addCart
  const addCart = (goods) => {
    // 添加逻辑
    // 判断是否添加过
    const item = cartList.value.find((item) => goods.skuId === item.skuId)
    if (item) {
      // 添加过 count++
      item.count++
    } else {
      // 没添加过 push
      cartList.value.push(goods)
    }
  }

  // 删除商品
  const delCart = (skuId) => {
    // splice
    // filter
    /* const index = cartList.value.findIndex((item) => skuId === item.skuId)
    cartList.value.splice(index, 1) */

    cartList.value = cartList.value.filter((item) => item.skuId !== skuId)

  }


  return {
    cartList,
    addCart,
    delCart
  }
},
  {
    persist: true,
  },
)