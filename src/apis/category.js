import request from '@/utils/http'

export function getTopCategoryAPI(id) {
  return request({
    url: '/category',
    params: {
      id
    }
  })
}