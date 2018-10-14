import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
const { Description } = DescriptionList;


import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
  Steps,
  Radio,
  Table, Tag,
} from 'antd';


/* eslint react/no-multi-comp:0 */

export default
@connect(({ mission }) => ({

  mission,
}))

class TableList extends PureComponent {

    componentWillMount(){
      const {dispatch}=this.props;
      const {match}=this.props;
      const{params}=match;

      dispatch(  {
        type:'mission/fetchOne',
        payload:params.page
      })

    }

  columnsAnnotating = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: '账户',
      dataIndex: 'account',

    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '类型',
      dataIndex: 'userType',
    },
  ]
  columnsAnnotated= [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: '账户',
      dataIndex: 'account',

    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '账户类型',
      dataIndex: 'userType',
    },
    {
      title: '危害度',
      dataIndex: 'dangerValue',
    },
    {
      title: '目的性',
      dataIndex: 'aim',
    },  {
      title: '证实性',
      dataIndex: 'confirm',
    },  {
      title: '可靠度',
      dataIndex: 'rely',
    },  {
      title: '可信度',
      dataIndex: 'trust',
    },
    {
      title: '类型',
      dataIndex: 'type',
    },  {
      title: '时效性',
      dataIndex: 'timeliness',
    },








  ]

  render() {

    console.log(this.props)
    const {mission}=this.props
    const {data}=mission
    console.log(data)


    return (
      <PageHeaderWrapper>
        <Card title='基本信息'>
          <DescriptionList size="large" title="文本内容" style={{ marginBottom: 32 }}>
            <h5>{data.content}</h5>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="官方判定" style={{ marginBottom: 32 }}>
            <h5>{data.reason}</h5>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />

          <DescriptionList size="large" title="标注统计" style={{ marginBottom: 32 }}>
            <Description term="危害度">{data.dangerAvg}</Description>
            <Description term="目的性">{data.aimAvg}</Description>
            <Description term="证实性">{data.ConfirmAvg}</Description>
            <Description term="可靠度">{data.rely}</Description>
            <Description term="可信度">{data.trustAvg}</Description>
            <Description term="标记人数">{data.annoCount}</Description>
          </DescriptionList>
          <Card>
            <Tag> 政治：{data.typeAvg.政治}</Tag>
            <Tag> 经济：{data.typeAvg.经济}</Tag>
            <Tag> 社会：{data.typeAvg.社会}</Tag>
            <Tag> 教育：{data.typeAvg.教育}</Tag>
            <Tag> 科技：{data.typeAvg.科技}</Tag>
            <Tag> 娱乐：{data.typeAvg.娱乐}</Tag>
            <Tag> 军事：{data.typeAvg.军事}</Tag>
            <Tag> 健康：{data.typeAvg.健康}</Tag>
          </Card>
          <Card>
            <Tag> 存在时效性：{data.timelinessAvg.存在时效性}</Tag>
            <Tag> 过时:{data.timelinessAvg.过时}</Tag>
            <Tag> 与时间无关：{data.timelinessAvg.与时间无关}</Tag>
          </Card>

        </Card>
        <Card title='标记人员'>
          <DescriptionList size="large" title="正在标记" style={{ marginBottom: 32 }}>


          <Table columns={this.columnsAnnotating} dataSource={data.userAnnotating}/>
          </DescriptionList>

          <DescriptionList size="large" title="已标记" style={{ marginBottom: 32 }}>

          <Table columns={this.columnsAnnotated} dataSource={data.userAnnotated}/>
          </DescriptionList>

        </Card>


      </PageHeaderWrapper>

    );
  }
}
