import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import moment from 'moment';
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
  Table,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './mission.less';

const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const statusMap = ['success', 'processing', 'success', 'error'];
const status = ['完成', '未完成'];


/* eslint react/no-multi-comp:0 */

export default
@connect(({ myrule, loading, user }) => ({
  myrule,
  loading: loading.models.rule,
  user,
}))

@Form.create()
class TableList extends PureComponent {
  state = {
    modalVisible: false,
    ModalVisibleB: false,
    expandForm: false,
    selectedRows: [],
    selectedRowsUser: [],
    formValues: {},
    stepFormValues: {},
    randomCount: 100,
  };

  columnsUser = [
    {
      title: 'id',
      dataIndex: 'userId',
    },
    {
      title: '账户',
      dataIndex: 'userAccount',
    },


    {
      title: '账户',
      dataIndex: 'userName',
    },

  ];

  columns = [
    {
      title: 'id',
      dataIndex: 'name',
    },
    {
      title: '文本内容',
      dataIndex: 'desc',
      width: '60%',
    },
    {
      title: '标记次数',
      dataIndex: 'callNo',
      sorter: true,
      align: 'right',
      render: val => `${val} `,
      // mark to display a total number
      needTotal: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      filters: [
        {
          text: status[0],
          value: 0,
        },
        {
          text: status[1],
          value: 1,
        },

      ],
      render(val) {
        return <Badge status={statusMap[val]} text={status[val]}/>;
      },
    },

    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.detail(record)}>详情</a>

        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'myrule/fetch',
      payload: '',
    });
    dispatch({
      type: 'user/fetchUser',

    });
    console.log(this.props)
  }

  detail=(e)=>{
    console.log(e.name)
    const {dispatch}=this.props

    const router='/admin/mission/'+e.name.toString()

    dispatch(routerRedux.push(router));
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'myrule/fetch',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'myrule/fetch',
      payload: {},
    });
  };


  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;
    switch (e.key) {
      case 'assign':
        // dispatch({
        //   type: 'myrule/remove',
        //   payload: {
        //     key: selectedRows.map(row => row.key),
        //   },
        //   callback: () => {
        //     this.setState({
        //       selectedRows: [],
        //     });
        //   },
        // });


        break;
      default:
        break;
    }

  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSelectRowsUser = rows => {
    this.setState({
      selectedRowsUser: rows,
    });
    console.log(this.state.selectedRowsUser);
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'myrule/fetch',
        payload: values,
      });
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleModalVisibleB = flag => {
    this.setState({
      ModalVisibleB: !!flag,
    });
  };


  handleAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'myrule/add',
      payload: {
        desc: fields.desc,
      },
    });

    message.success('添加成功');
    this.handleModalVisible();
  };

  handleUpdate = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'myrule/update',
      payload: {
        name: fields.name,
        desc: fields.desc,
        key: fields.key,
      },
    });

    message.success('配置成功');
    this.handleUpdateModalVisible();
  };

  okHandleA = () => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;
    const { selectedRowsUser } = this.state;
    dispatch({
      type: 'mission/addMission',
      payload: {
        missionKey: JSON.stringify(selectedRows.map(row => row.key)),
        userKey: JSON.stringify(selectedRowsUser.map(row => row.key)),
      },
    });
    message.success('分配成功');
    this.handleModalVisibleB();

  };

  okHandleB = () => {
    const { dispatch } = this.props;
    const { selectedRowsUser } = this.state;
    const { randomCount } = this.state;
    const params={
      user:JSON.stringify(selectedRowsUser.map(row => row.key)),
      count:randomCount,
    };
    dispatch({
      type:'mission/addMissionRandom',
      payload:params,
    })

    message.success('分配成功');
    this.handleModalVisibleB();

  };

  changeRandom=(val)=>{
    this.setState({
      randomCount:val,
    })
  }

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="规则名称">
              {getFieldDecorator('name')(<Input placeholder="请输入"/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="完成情况">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">完成</Option>
                  <Option value="1">未完成</Option>
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>

              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>

              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down"/>
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderAdvancedForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="规则名称">
              {getFieldDecorator('name')(<Input placeholder="请输入"/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="完成情况">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">完成</Option>
                  <Option value="1">未完成</Option>
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="调用次数">
              {getFieldDecorator('number')(<InputNumber style={{ width: '100%' }}/>)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ float: 'right', marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
              重置
            </Button>
            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              收起 <Icon type="up"/>
            </a>
          </div>
        </div>
      </Form>
    );
  }

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {

    console.log(this.props)
    const {
      myrule: { data },
      user: { user },
      loading,
    } = this.props;
    const { selectedRows, modalVisible, ModalVisibleB, stepFormValues, selectedRowsUser } = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
      </Menu>
    );

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
    };
    return (
      <PageHeaderWrapper title="查询表格">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button type="primary" onClick={() => this.handleModalVisible(true)}>
                快速分配
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Button onClick={() => this.handleModalVisibleB(true)}>批量操作</Button>
                  <Dropdown overlay={menu}>
                    <Button>
                      更多操作 <Icon type="down"/>
                    </Button>
                  </Dropdown>
                </span>
              )}
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <Modal
          destroyOnClose
          title="快速分配"
          visible={modalVisible}
          onCancel={() => this.handleModalVisible()}
          onOk={this.okHandleB}
        >


          <Row>
            随机分配 <InputNumber value={this.state.randomCount} onChange={this.changeRandom}></InputNumber>条任务给下列用户
          </Row>

          <h3>选择用户</h3>
          <StandardTable
            selectedRows={selectedRowsUser}
            loading={loading}
            data={user}
            columns={this.columnsUser}
            onSelectRow={this.handleSelectRowsUser}

          />

        </Modal>

        <Modal
          destroyOnClose
          title="快速分配"
          visible={ModalVisibleB}
          onCancel={() => this.handleModalVisibleB()}
          onOk={this.okHandleA}

        >


          <h3>选择用户</h3>
          <StandardTable
            selectedRows={selectedRowsUser}
            loading={loading}
            data={user}
            columns={this.columnsUser}
            onSelectRow={this.handleSelectRowsUser}
          />


        </Modal>
      </PageHeaderWrapper>
    );
  }
}
