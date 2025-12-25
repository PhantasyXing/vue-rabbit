//引入初始化样式文件
import '@/styles/common.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useIntersectionObserver } from '@vueuse/core'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')


// 定义全局指令

app.directive('img-lazy', {
  mounted(el, binding) {
    // el：指定绑定的元素
    // binding：binding.value 指令等于号，后面绑定的表达式的值
    // console.log(el, binding.value);

    useIntersectionObserver(
      el,
      ([{ isIntersecting }]) => {
        console.log(isIntersecting)
        if (isIntersecting) {
          // 进入视口区域
          el.src = binding.value
        }
      },
    )

  }
})