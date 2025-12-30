import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useUserStore } from './userStore'
import { insertCartAPI, findNewCartListAPI, delCartListAPI } from '@/apis/cart'

export const useCartStore = defineStore('cart', () => {
  const userStore = useUserStore()
  const isLogin = computed(() => userStore.userInfo.token)
  // state ——cartList
  const cartList = ref([])

  // 封装获取最新购物车列表并更新
  const updateNewList = async () => {
    const res = await findNewCartListAPI()
    cartList.value = res.result
  }

  // action ——addCart
  const addCart = async (goods) => {
    const { skuId, count } = goods
    if (isLogin.value) {
      // 登录之后的购车逻辑
      await insertCartAPI({ skuId, count })
      updateNewList()
    } else {
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
  }

  // 删除商品
  const delCart = async (skuId) => {
    if (isLogin.value) {
      await delCartListAPI([skuId])
      updateNewList()
    } else {
      // splice
      // filter
      /* const index = cartList.value.findIndex((item) => skuId === item.skuId)
      cartList.value.splice(index, 1) */
      cartList.value = cartList.value.filter((item) => item.skuId !== skuId)
    }

  }

  // 退出登录清除购物车
  const clearCart = () => {
    cartList.value = []
  }

  // 单选功能
  const changeCheck = (skuId, selected) => {
    // 通过skuId找到要修改那一项，然后把它的selected修改
    const item = cartList.value.find((item) => item.skuId === skuId)
    item.selected = selected
  }

  // 全选框
  const checkAll = (selected) => cartList.value.forEach(item => item.selected = selected)

  // 计算属性
  // count总数量
  const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
  // price总价
  const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))

  // 选择总数
  const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))
  // 选择总价
  const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0))

  // 是否全选
  const isAll = computed(() => cartList.value.every((item) => item.selected))


  return {
    cartList,
    allCount,
    allPrice,
    isAll,
    selectedCount,
    selectedPrice,
    addCart,
    delCart,
    changeCheck,
    checkAll,
    clearCart,
    updateNewList
  }
},
  {
    persist: true,
  },
)