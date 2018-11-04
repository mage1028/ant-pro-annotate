import { addMission,submitMission,addMissionRandom,fetchMission } from '@/services/api';

export default {
  namespace: 'mission',

  state: {
    status: false,
    data: {
      reason:null,
      content:null,
      annoCount:null,
      dangerAvg:null,
      aimAvg:null,
      ConfirmAvg:null,
      rely:null,
      trustAvg:null,
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
      userAnnotating:[],
      userAnnotated:[],

    },
  },

  effects: {
    * addMission({ payload }, { call, put }) {
      const response = yield call(addMission, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    * addMissionRandom({ payload }, { call, put }) {
      const response = yield call(addMissionRandom, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    * submitMission({ payload }, { call, put }) {

      console.log('post',payload)
      const response = yield call(submitMission, payload);
    },

    * fetchOne({ payload }, { call, put }) {
      const response = yield call(fetchMission, payload);
      yield put({
        type:'saveMission',
        payload:response,
      })
    },

  },


  reducers: {
    save(state, action) {
      return {
        ...state,
        status: action.payload,
      };
    },
    saveMission(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
}
