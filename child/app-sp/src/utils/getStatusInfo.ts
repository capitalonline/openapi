// 主机状态关系从后台获取，此处只做记录
const status = {
  building: '创建中',
  running: '运行中',
  restarting: '重启中',
  shutting_down: '关机中',
  shutdown: '已关机',
  starting_up: '开机中',
  deleting: '删除中',
  deleted: '已删除',
  destroying: '销毁中',
  destroy: '已销毁',
  updating: '更新中',
  error: '错误',
  recovering: '恢复中',
  failed: '创建失败'
}

// {操作：[主机状态]}
const auth = {
  start_up_ecs: {auth: ['shutdown'], msg: '已选实例状态需为已关机！', label: '开 机' },
  shutdown_ecs: {auth: ['running'], msg: '已选实例需为运行中！', label: '关 机'},
  restart_ecs: {auth: ['running'], msg: '已选实例状态需为运行中！', label: '重 启'},
  delete_ecs: {auth: ['running', 'shutdown', 'error'], msg: '已选实例状态需为已关机或运行中或错误！', label: '逻辑删除'},
  recover_ecs: {auth: ['deleted'], msg: '已选实例状态需为已删除！', label: '恢 复'},
  destroy_ecs: {auth: ['deleted'], msg: '已选实例状态需为已删除！', label: '销 毁'},
  update_spec: {auth: ['shutdown'], msg: '已选实例状态需为已关机！', label: '更换实例规格'},
  update_system: {auth: ['shutdown'], msg: '已选实例状态需为已关机！', label: '更换系统盘'},
  reset_pwd: {auth: ['running'], msg: '已选实例状态需为运行中！', label: '更换密码'}
}

export default {
  getInsOperateAuth(type) {
    return auth[type]
  }
}
export const getEcsStatus=(type)=>{
  return status[type]
}

