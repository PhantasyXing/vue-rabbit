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

  return {
    cartList,
    addCart
  }
},
  {
    persist: true,
  },
)