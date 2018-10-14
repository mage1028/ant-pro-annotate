import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { AnnoAccountLogin, getFakeCaptcha } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'login',

  state: {
    status: undefined,
    id: undefined,

  },

  effects: {
    * login({ payload }, { call, put }) {
      const response = yield call(AnnoAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });

      // Login successfully
      if (response.status === 'ok') {
        reloadAuthorized(); // 更新权限
        window.localStorage.setItem('user_id', response.id);
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.startsWith('/#')) {
              redirect = redirect.substr(2);
            }
          } else {
            window.location.href = redirect;
            // return;
          }
        }

        yield put(routerRedux.replace(redirect || '/annotate/index'));

      }
    },

    // 是否登陆

    * islogin(_, { put }) {
      const id = localStorage.getItem('user_id');
      if (id){
        yield 1
      }
      else
        {yield put(routerRedux.push('/user/login'));}
    },

    * getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    * logout(_, { put }) {
      console.log('开始退出')
      window.localStorage.removeItem('user_id');

      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });

      reloadAuthorized();
      yield put(
        routerRedux.push({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        }),
      );
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        id: payload.id,
        type: payload.type,
      };
    },
  },
};
