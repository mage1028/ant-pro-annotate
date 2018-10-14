import { stringify } from 'qs';
import request from '@/utils/request';


export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  console.log(params);
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'update',
    },
  });
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}


// Myapi
export async function AnnoAccountLogin(params) {
  console.log(params);
  return request('http://localhost:5000/api/login/account', {
    method: 'POST',
    body: params,

  });
}

export async function queryMission(params) {

  return request('http://localhost:5000/api/mission', {
    method: 'POST',
    body: params,

  });
}
export async function addMission(params) {
  return request('http://localhost:5000/api/addMission', {
    method: 'POST',
    body: params,

  });
}

export async function submitMission(params) {
  return request('http://localhost:5000/api/submit',{
    method:'POST',
    body:params,
  })

}

export async function addMissionRandom(params) {
  return request('http://localhost:5000/api/addMissionRandom',{
    method:'POST',
    body:params,
  })

}
export async function fetchMission(params) {

  return request(`http://localhost:5000/api/fetchMission/${(params)}`)

}
export async function Register(params) {
    console.log(params)
  return request(`http://localhost:5000/api/register`,
    { method:'POST',
      body:params,}
    )

}
