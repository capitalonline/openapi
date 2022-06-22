// 获取用户信息 √
// 登出

import service from "./http"

export function get_user_info(reqData) {
  return service({
    method: 'GET',
    url: '/ecs_business/v1/account/get_user/',
    params: reqData
  })
}

export function logout() {
  return service({
    method: 'GET',
    url: '/ecs_business/v1/account/logout/',
  })
}