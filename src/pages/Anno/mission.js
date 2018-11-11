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
      dataIndex: 'id',
    },
    {
      title: '文本内容',
      dataIndex: 'content',
      width: '60%',
    },
    {
      title: '标记次数',
      dataIndex: 'annoCount',
      sorter: true,
      align: 'right',
      render: val => `${val} `,
      needTotal: true,
    },
    {
      title: '标注',
      dataIndex: 'isAnno',
      filters: [
        {
          text: '已标注',
          value: '已标注',
        },
        {
          text: '未标注',
          value: '未标注',
        },

      ],

    },

    {
      title: '操作',
      render: (text, record) => (
        <Fragment>

          <a onClick={() => this.annotate(record)}>开始标注</a>

        </Fragment>
      ),
    },
  ];

  constructor(props) {
    super(props)
    const { dispatch } = this.props;

    dispatch({
      type: 'user/fetchCurrentAll',
    });

  }

  componentDidMount() {

  }

  annotate= e =>{
    const { dispatch } = this.props;
    dispatch({
      type:'user/begin',
      payload:e.id,
    })


  }

  render(){
    console.log(this.props)

    const {
      user
      }= this.props

    const {currentAccount}=user


    const {datas}=currentAccount


    return(
     <Table dataSource={datas} columns={this.columns}/>

    )
  }

}



