import { defineStore } from "pinia";
import { computed, ref } from "vue";

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

  // 单选功能
  const changeCheck = (skuId, selected) => {
    // 通过skuId找到要修改那一项，然后把它的selected修改
    const item = cartList.value.find((item) => item.skuId === skuId)
    item.selected = selected
  }

  // 全选框
  const checkAll = (selected) => {
    cartList.value.forEach(item => item.selected = selected)
  }

  // 计算属性
  // count总数量
  const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
  // price总价
  const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))

  // 是否全选
  const isAll = computed(() => cartList.value.every((item) => item.selected))


  return {
    cartList,
    addCart,
    delCart,
    allCount,
    allPrice,
    changeCheck,
    isAll,
    checkAll
  }
},
  {
    persist: true,
  },
)