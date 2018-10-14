import request from '@/utils/request';
import { stringify } from 'qs';


export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}

export async function AnnoAccountLogin(params) {
  return request('http://192.168.100.205:5000/currentUser', {
    method: 'POST',
    body: params,

  });
}

export async function findUsers() {

  return request('http://192.168.100.205:5000/api/user');
}

export async function findCurrent() {
  const user = localStorage.getItem('user_id');
  return request(`http://192.168.100.205:5000/api/currentuser/${(user)}`);

}

export async function findCurrentMission() {
  const user = localStorage.getItem('user_id');
  return request(`http://192.168.100.205:5000/api/currentmission/${(user)}`);

}

export async function next() {
  const user = localStorage.getItem('user_id');
  return request(`http://192.168.100.205:5000/api/next/${(user)}`);

}

export async function beginAnno(missionID) {
  const user = localStorage.getItem('user_id');
  const params = {
    userID: user,
    mission: missionID,
  };
  console.log(params)
  return request(`http://192.168.100.205:5000/api/beginAnno`,
    {
      method: 'POST',
      body: params,
    });

}
