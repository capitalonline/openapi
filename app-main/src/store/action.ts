// 此action文件为定义微应用之间全局状态
// 引入qiankun的应用间通信方法initGlobalState
import { initGlobalState,MicroAppStateActions  } from 'qiankun'
import cookie from '@/store/cookie'
import store from '@/store'

const initialState = {
        // "router_name": localStorage.getItem("router_name"),
        // "cds_token": getQueryObject().token || Cookies.get('cds_token') || '',
        // "theme": Cookies.get('theme') || 'light',
        // "lang":Cookies.get('lang') || 'CN',
        // "project_id":sessionStorage.getItem('project_id') ? sessionStorage.getItem('project_id') : "0-0",
        // "project_status":"-1", //2  正常下拉  -1 隐藏 默认     项目状态
        // "project_status_disabled":false, //false 正常  true 置灰
        // "project_list_reload":"0", //  项目列表是否刷新  0 不刷新 1 刷新
        // "subMenuList":[]
        'token':store.state.token || cookie.get('cds-op-token'),
        'permission_dict':{}
    }
const actions:MicroAppStateActions  = initGlobalState(initialState) //初始化state

// 监听actions全局公共状态数据的变化
actions.onGlobalStateChange((state, prevState) => {
    console.log('main-onGlobalStateChange',state)
    // console.log("主应用变更前：", prevState);
    // console.log("主应用变更后：", state);
    // store.commit("SET_SUB_PARAMS", state) //将获取的最新的公共状态保存到vuex中
    // store.commit("SET_TOKEN", state)
})

export default actions