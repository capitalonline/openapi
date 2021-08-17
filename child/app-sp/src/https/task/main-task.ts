import service from "../http"

export default {
  // 获取主任务配置列表
  get_maintask_list(reqData: any) {
    return service({
      method: "GET",
      url: "/api/v1/maintask/configuration",
      params: reqData
    })
  },
  // 添加主任务配置
  add_maintask(reqData: any) {
    return service({
      method: "POST",
      url: "/api/v1/maintask/configuration",
      data: reqData
    })
  },
  // 更新主任务配置
  update_maitask(reqData: any) {
    return service({
      method: "PUT",
      url: "/api/v1/maintask/configuration",
      data: reqData
    })
  },
  // 删除主任务配置
  delete_maintask(reqData: any) {
    return service({
      method: "DELETE",
      url: "/api/v1/maintask/configuration",
      params: reqData
    })
  },
  // 获取主任务详情
  get_maintask_detail(reqData: any) {
    return service({
      method: "GET",
      url: "/api/v1/maintask/configuration/detail",
      params: reqData
    })
  }
}