import axios from "axios";
import store from "../store";

export async function getUserInfo() {
  let index = window.location.href.indexOf('token=');
  let token = '';
  if (index >= 0) {
    token = window.location.href.substr(index + 6).split('&')[0];
  }
  if (token) {
    store.commit('SET_TOKEN', token)
  }
  const resData = await axios.get(`/ecs_business/v1/account/get_user/?token=${ store.state.token}`)
  if (resData.data.code == 'Success') {
    store.commit('SET_LOGIN_NAME', resData.data.data.login_name);
    store.commit('SET_AUTH_INFO', {...resData.data.data.permission_dict});
  } else if (resData.data.code === 'Unauthorized') {
    window.location.href = resData.data.data.sso + '?referer=' + window.location.href.split('?')[0];
  }
}
