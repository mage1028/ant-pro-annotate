import { connect } from 'dva';
import React, { Component, Fragment } from 'react';
import { getAuthority } from '@/utils/authority';

import {
  Row,
  Col,
  Card,
  InputNumber,
  Slider,
  Layout,
  Select,
  Button,
  Table,

} from 'antd';
import { routerRedux } from 'dva/router';


export default @connect(({ user }) => ({
  user,

}))

class Mission extends Component {



  columns = [
    {
      title: 'id',
      dataIndex: 'userId',
    },
    {
      title: '用户名',
      dataIndex: 'userName',
    },
    {
      title: '账户',
      dataIndex: 'userAccount',
    },
    {
      title: '账户类型',
      dataIndex: 'userType',
    },

    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.userDetail(record)}>查看详情</a>

        </Fragment>
      ),
    },
  ];

  constructor(props) {
    super(props)
    const { dispatch } = this.props;

    dispatch({
      type: 'user/fetchUser',
    });

  }

  componentDidMount() {

  }

  userDetail= e =>{
    const { dispatch } = this.props;
    dispatch({
      type:'user/begin',
      payload:e.id,
    })


  }

  render(){
    const {
      user:{user}
    }= this.props;
    console.log(user);
    const{list}=user
    return(
      <Table dataSource={list} columns={this.columns}/>

    )
  }

}



