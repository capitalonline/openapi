import store from '../store'
import { get_user_info } from '../https/public'

export async function getUserInfo() {
  let index = window.location.href.indexOf('token=');
  console.log('sp-index',index,window.location.href);
  let token = '';
  if (index >= 0) {
    console.log('sp-111');
    token = window.location.href.substr(index + 6).split('&')[0];
  }
  if(!token){
    console.log('sp-222');
    token = sessionStorage.getItem('Access-Token')
  }
  console.log('sp-token',token);
  if (token) {
    store.commit('SET_TOKEN', token)
  }
  const resData = await get_user_info({'token': store.state.token});
  if (resData.code == 'Success') {
    console.log('sp-resData',resData)
    store.commit('SET_LOGIN_NAME', resData.data.login_name);
    store.commit('SET_AUTH_INFO', {...resData.data.permission_dict,overview:[]});
  }
}
