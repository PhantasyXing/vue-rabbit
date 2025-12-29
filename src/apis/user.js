// 封装所有和用户相关的接口函数
import request from '@/utils/http'

export function getLoginAPI({ account, password }) {
  return request({
    url: '/login',
    method: 'post',
    data: {
      account,
      password
    }
  })
}