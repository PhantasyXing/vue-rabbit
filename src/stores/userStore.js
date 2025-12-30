import { defineStore } from "pinia";
import { getLoginAPI } from '@/apis/user'
import { ref } from "vue";
import { useCartStore } from "./cartStore";

export const useUserStore = defineStore('user', () => {
  // 1、定义管理用户数据的state
  const userInfo = ref({})
  const cartStore = useCartStore()
  // 2、定义获取接口数据的action函数
  const getUserInfo = async ({ account, password }) => {
    const res = await getLoginAPI({ account, password })
    userInfo.value = res.result
  }

  // 退出登录并清除用户数据的函数
  const clearUserInfo = () => {
    userInfo.value = {}
    // 清除购物车内容
    cartStore.clearCart()
  }

  // 3、以对象的格式把state和action return出去
  return {
    userInfo,
    getUserInfo,
    clearUserInfo
  }
},
  {
    persist: true,
  },
)