import { query as queryUsers, queryCurrent ,findUsers,findCurrent,findCurrentMission,next,beginAnno} from '@/services/user';
import { routerRedux } from 'dva/router';


export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
    user: [],
    currentAccount: {},
    currentMission:{
      typeAvg:{
        "政治": 0,
        "经济": 0,
        "社会": 0,
        "教育": 0,
        "科技": 0,
        "娱乐": 0,
        "军事": 0,
        "健康": 0
      },
      timelinessAvg:{
        "存在时效性": 0,
        "过时": 0,
        "与时间无关": 0
      },
    },
    Mission:0,
  },

  effects: {
    * fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    * fetchUser(_, { call, put }) {
      const response = yield call(findUsers);
      yield put({
        type: 'saveUser',
        payload: response,
      });
    },
    * fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },

    * fetchCurrentUser(_, { call, put }) {
      const response = yield call(findCurrent);
      yield put({
        type: 'saveCurrentAccount',
        payload: response,
      });
    },
    * fetchCurrentMission(_, { call, put }) {
      const response = yield call(findCurrentMission);
      yield put({
        type: 'saveCurrentMission',
        payload: response,
      });
    },
    * next(_, { call, put }) {
      // 感觉性能不是很好
      yield call(next)
      const response = yield call(findCurrentMission);
      const response2 = yield call(findCurrent);
      yield put({
        type: 'saveCurrentAccount',
        payload: response2,
      });

      yield put({
        type: 'saveCurrentMission',
        payload: response,
      });

    },
    * begin({payload}, { call, put }) {


      const response=yield call(beginAnno,payload);
      yield put(routerRedux.push('/annotate/index'))


    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    nextMission(state, action) {
      return {
        ...state,
        Mission: action.payload,
      };
    },
    saveUser(state, action) {
      return {
        ...state,
        user: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    saveCurrentAccount(state, action) {
      return {
        ...state,
        currentAccount: action.payload || {},
      };
    },
    saveCurrentMission(state, action) {
      return {
        ...state,
        currentMission: action.payload || {},
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
  },
};
