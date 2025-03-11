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
  delete_ecs: {auth: ['running', 'shutdown', 'error'], msg: '已选实例状态需为已关机或运行中或错误！', label: '逻辑删除'},
  recover_ecs: {auth: ['deleted'], msg: '已选实例状态需为已删除！', label: '恢 复'},
  destroy_ecs: {auth: ['deleted', 'failed'], msg: '已选实例状态需为已删除或创建失败！', label: '销 毁'},
  open_bill: {auth: ['running', 'shutdown'], msg: '已选实例状态需为运行中或已关机！', label: '开启计费'}
}
const host_status={//error为新增状态，异常
  start_up_host:{power:['shutdown'],host:['offline','online','exception'],msg:'已选主机需为在线或离线或异常状态',label:'开机'},
  shutdown_host:{power:['running'],host:['offline','online'],vm:1,msg:'已选主机需为在线或离线状态',msg2:'操作关机前，请确保物理机上无云主机运行' ,label:'关机'},
  restart_host:{power:['running'],host:['offline','online'],vm:1,msg:'已选主机需为在线或离线状态',msg2:'操作重启前，请确保物理机上无云主机运行' ,label:'重启'},
  online_maintenance:{power:[],host:['online','exception'],msg:'已选主机需为在线状态',label:'在线维护'},
  offline_maintenance:{power:[],host:['offline','online','exception'],vm:1,msg:'已选主机需为在线或离线状态且已选主机上不能有虚拟机运行',label:'离线维护'},
  finish:{power:[],host:['maintenance','online_maintenance','offline_maintenance'],msg:'已选主机需为维护中状态',label:'完成维护'},
  shelves:{power:[],host:['maintenance'],vm:1,msg:'已选主机需为维护状态且已选主机上不能有虚拟机运行',label:'下架'},
  disperse:{power:['running'],host:['online'],msg:'已选主机需为在线状态',label:'驱散'},
  out_of_band:{power:[],host:['offline','online'],msg:'已选主机需为在线或离线状态',label:'进入带外管理'},
  migrate:{power:['running'],host:['online'],msg:'已选主机需为在线状态',label:'迁移'},
  kvm_to_eci:{power:[],host:['maintenance'],msg:'已选主机需为维护中状态且业务类型为KVM',label:'KVM切换ECI'},
  eci_to_kvm:{power:[],host:['maintenance'],msg:'已选主机需为维护中状态且业务类型为ECI',label:'ECI切换KVM'},
}
export default {
  getInsOperateAuth(type) {
    return auth[type]
  }
}
export const getEcsStatus=(type)=>{
  return status[type]
}
export const getHostStatus=(type)=>{
  return host_status[type]
}

