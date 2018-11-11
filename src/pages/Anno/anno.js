import React, { Component } from 'react';
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
  message,
  Progress,
  Divider,
  Tag,

} from 'antd';
import FooterToolbar from '@/components/FooterToolbar';
import { connect } from 'dva';

export default @connect(({ user }) => ({
  user,

}))

class App extends Component {

  constructor(props) {
    super(props);
    const {dispatch}=this.props
    dispatch({
      type: 'login/islogin',
    });

    console.log(this.props);
    this.state = {
      inputValue_danger: 0,
      inputValue_aim: 0,
      inputValue_rely: 0,
      inputValue_confirm: 0,
      inputValue_trust: 0,
      type: null,
      time: null,
      id: 0,
      content: <div>
        <h5>弱危害（0-0.3）</h5>
        <p>无经济财产人身损失，社会负面很小，波及范围很小，不涉及政治敏感话题</p>
        <h5>一般危害（0.3-0.6）</h5>
        <p>造成经济、财产损失不大，社会负面影响力不大，波及范围小</p>
        <h5>强危害（0.6-0.8）</h5>
        <p>造成经济、财产、人身安全损失很大，社会负面影响力很大，波及范围很大</p>
        <h5>极强危害（0.8-1.0）</h5>
        <p>造成经济、财产、人身安全损失极大，社会负面影响力极大，波及范围极大，涉及政治敏感话题</p></div>,

      isAnno:null,
    };


  }


  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'user/fetchCurrentUser',
    });
    dispatch({
      type: 'user/fetchCurrentMission',
    });


  }


  next = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/next',

    });

  };

  last = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/last',

    });

  };

  submit = () => {
    const { dispatch } = this.props;
    const { user } = this.props;
    const { currentMission } = user;

    const data = this.state;
    data.id = currentMission.id;
    data.userID = localStorage.getItem('user_id');
    if(data.type!=null&&data.time!=null){
    dispatch({
      type: 'mission/submitMission',
      payload: data,
    });
    message.success('提交成功');
    this.next();}
    else{
      message.error('请选择类型')
    }
  };

  onChange_danger = (value) => {
    this.setState({
      inputValue_danger: value,
    });
  };

  onChange_aim = (value) => {
    this.setState({
      inputValue_aim: value,
    });
  };

  onChange_conf = (value) => {
    this.setState({
      inputValue_confirm: value,
    });
  };

  onChange_rely = (value) => {
    this.setState({
      inputValue_rely: value,
    });
  };

  onChange_trust = (value) => {
    this.setState({
      inputValue_trust: value,
    });
  };

  handleChange_type = (value) => {
    this.setState({
      type: value,
    });
  };

  handleChange_time = (value) => {
    this.setState({
      time: value,
    });
  };

  showDanger = () => {
    this.setState(
      {
        content: <div>
          <h5>弱危害（0-0.3）</h5>
          <p>无经济财产人身损失，社会负面很小，波及范围很小，不涉及政治敏感话题</p>
          <h5>一般危害（0.3-0.6）</h5>
          <p>造成经济、财产损失不大，社会负面影响力不大，波及范围小</p>
          <h5>强危害（0.6-0.8）</h5>
          <p>造成经济、财产、人身安全损失很大，社会负面影响力很大，波及范围很大</p>
          <h5>极强危害（0.8-1.0）</h5>
          <p>造成经济、财产、人身安全损失极大，社会负面影响力极大，波及范围极大，涉及政治敏感话题</p></div>,
      },
    );
  };

  showAim = () => {
    this.setState(
      {
        content: <div><h5>善意目的（0-0.2）</h5><p>中立、正面、积极的信息</p>
          <h5>营销炒作、吸引流量（0.2-0.5）</h5><p>博得眼球、标题党</p>
          <h5>恶意目的（0.5-0.8）</h5><p>已知信息为假，带有煽动、阴暗、消极的信息</p>
          <h5>制造动乱（0.8-1.0）</h5><p>引起或欲引起动乱</p></div>,}
    );
  };

  showConfirm = () => {
    this.setState(
      {
        content: <div><h5>容易证实(0-0.4)</h5><p>自身借助工具（搜索引擎）容易证实</p>
          <h5>难以证实(0.4-0.7)</h5><p>自身无法证实，需要人为权威机构证实</p>
          <h5>无法证实(0.7-1)</h5><p>自身、人为都无法证实</p></div>
      },
    );
  };
  showTrust = () => {
    this.setState(
      {
        content:  <div>
          <h5>完全不可信（0）</h5><p>反常识、证实为假</p>
          <h5>假大于真（0-0.3）</h5><p>带有营销性质等明显目的性、让人怀疑的消息</p>
          <h5>半真半假（0.3-0.7）</h5><p>判断不出真假、无明显目的，也不是权威媒体大V发的</p>
          <h5>真大于假（0.7-1）</h5><p>看上去无营销目的、权威媒体大V。</p>
          <h5>完全可信（1）</h5><p>证实为真、无目的、无危害、可靠信息。</p>
        </div>
      },
    );
  };
  showRely = () => {
    this.setState(
      {
        content:<div><h5>可靠（0-0.3）</h5><p>信息完整、逻辑性强，大V发布，无目的，中立态度，用户感官看上去可靠</p>
          <h5>不确定（0.3-0.7）</h5><p>信息不够完整、逻辑性不强，用户感官不确定可靠性</p>
          <h5>不可靠（0.7-1.0）</h5><p>信息不完整、逻辑性不清晰，反常识，非大V，营销，带有目的，用户感官看上去不可靠</p>
        </div>
      },
    );
  };


  marks_danger = {
    0: '弱危害',
    0.3: '一般危害',
    0.6: '强危害',
    0.8: '极大危害',
  };

  marks_aim = {
    0: '善意',
    0.2: '炒作',
    0.5: '恶意',
    0.8: '制造动乱',
  };

  marks_conf = {
    0: '容易证实',
    0.4: '难以证实',
    0.7: '无法证实',
  };

  marks_rely = {
    0: '可靠',
    0.3: '不确定',
    0.7: '不可靠',
  };

  marks_trust = {

    0.01: '假大于真',
    0.3: '半真半假',
    0.7: '真大于假',
    1: '完全可信',
  };


  render() {
    const {
      user,
    } = this.props;

    const { currentAccount } = user;

    const { currentMission } = user;
    const percent = ((currentAccount.missionComplete * 100 / currentAccount.missionCount).toFixed(2)).toString();

    const color={
      '已标注':'green',
      '未标注':'red'
    }
    const gridStyle = {
      width: '33.3%',
      textAlign: 'center',
    };

    const gridStyleLg = {
      width: '100%',

    };
    const test=<Tag>adsds</Tag>
    try{
    return (
      <Layout>


        <Row>
          <Col>
            <Card title="标注文本" extra={<Tag color={color[currentMission.isAnno]}>{currentMission.isAnno}</Tag>}>
              {currentMission.content}
            </Card>
          </Col>
        </Row>


        <Row>
          <Col md={10}>
            <Card title='标注'>
              <Row>
                <Col span={19} onMouseEnter={this.showDanger}>
                  <Slider
                    min={0}
                    max={1}
                    onChange={this.onChange_danger}
                    value={this.state.inputValue_danger}
                    step={0.01}
                    marks={this.marks_danger}
                  />
                </Col>
                <Col span={4}>
                  <InputNumber

                    min={0}
                    max={1}
                    step={0.01}
                    value={this.state.inputValue_danger}
                    onChange={this.onChange_danger}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={19} onMouseEnter={this.showAim}>
                  <Slider
                    min={0}
                    max={1}
                    onChange={this.onChange_aim}
                    value={this.state.inputValue_aim}
                    step={0.01}
                    marks={this.marks_aim}
                  />
                </Col>
                <Col span={4}>
                  <InputNumber

                    min={0}
                    max={1}
                    step={0.01}
                    value={this.state.inputValue_aim}
                    onChange={this.onChange_aim}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={19} onMouseEnter={this.showConfirm}>
                  <Slider
                    min={0}
                    max={1}
                    onChange={this.onChange_conf}
                    value={this.state.inputValue_confirm}
                    step={0.01}
                    marks={this.marks_conf}
                  />
                </Col>
                <Col span={4}>
                  <InputNumber

                    min={0}
                    max={1}
                    step={0.01}
                    value={this.state.inputValue_confirm}
                    onChange={this.onChange_conf}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={19} onMouseEnter={this.showRely}>
                  <Slider
                    min={0}
                    max={1}
                    onChange={this.onChange_rely}
                    value={this.state.inputValue_rely}
                    step={0.01}
                    marks={this.marks_rely}
                  />
                </Col>
                <Col span={4}>
                  <InputNumber

                    min={0}
                    max={1}
                    step={0.01}
                    value={this.state.inputValue_rely}
                    onChange={this.onChange_rely}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={19} onMouseEnter={this.showTrust}>
                  <Slider
                    min={0}
                    max={1}
                    onChange={this.onChange_trust}
                    value={this.state.inputValue_trust}
                    step={0.01}
                    marks={this.marks_trust}
                  />
                </Col>
                <Col span={4}>
                  <InputNumber

                    min={0}
                    max={1}
                    step={0.01}
                    value={this.state.inputValue_trust}
                    onChange={this.onChange_trust}
                  />
                </Col>
              </Row>
              <br/>
              <Row>
                <Col span={12}>
                  <Select defaultValue="选择文章类型" onChange={this.handleChange_type}>
                    <Select.Option value="政治">政治</Select.Option>
                    <Select.Option value="经济">经济</Select.Option>
                    <Select.Option value="社会">社会</Select.Option>
                    <Select.Option value="教育">教育</Select.Option>
                    <Select.Option value="科技">科技</Select.Option>
                    <Select.Option value="娱乐">娱乐</Select.Option>
                    <Select.Option value="军事">军事</Select.Option>
                    <Select.Option value="健康">健康</Select.Option>
                  </Select>
                </Col>
                <Col span={12}>
                  <Select defaultValue="选择时效性" onChange={this.handleChange_time}>
                    <Select.Option value="存在时效性">存在时效性</Select.Option>
                    <Select.Option value="过时">过时</Select.Option>
                    <Select.Option value="与时间无关">与时间无关</Select.Option>
                  </Select>
                </Col>

              </Row>
            </Card>

          </Col>
          <Col span={8}>
            <Card title='如何标注'>
              <Card.Meta title='官方判定' description={currentMission.reason}/>
              <Divider/>

              {this.state.content}

            </Card>
          </Col>
          <Col span={6}>
            <Card title='标注记录'>

              <Progress percent={percent} status="active"/>
              <Divider/>

              <Row>
                <Col span={8}>
                  <Card.Meta
                    title="总任务"
                    description={currentAccount.missionCount}
                  />

                </Col>
                <Col span={8}>
                  <Card.Meta
                    title="已完成"
                    description={currentAccount.missionComplete}
                  />

                </Col>
                <Col span={8}>
                  <Card.Meta
                    title="标注人数"
                    description={currentMission.annoCount}
                  />

                </Col>
              </Row>
              <Divider/>
              <Row>
                <h5>平均标注记录</h5>

                <Card.Grid style={gridStyle}>危害度：{currentMission.dangerAvg}</Card.Grid>
                <Card.Grid style={gridStyle}>目的性：{currentMission.aimAvg}</Card.Grid>
                <Card.Grid style={gridStyle}>证实性：{currentMission.ConfirmAvg}</Card.Grid>
                <Card.Grid style={gridStyle}>可靠性：{currentMission.rely}</Card.Grid>
                <Card.Grid style={gridStyle}>可信度：{currentMission.trustAvg}</Card.Grid>
                <Card.Grid style={gridStyleLg}>
                  <Tag> 政治：{currentMission.typeAvg.政治}</Tag>
                  <Tag> 经济：{currentMission.typeAvg.经济}</Tag>
                  <Tag> 社会：{currentMission.typeAvg.社会}</Tag>
                  <Tag> 教育：{currentMission.typeAvg.教育}</Tag>
                  <Tag> 科技：{currentMission.typeAvg.科技}</Tag>
                  <Tag> 娱乐：{currentMission.typeAvg.娱乐}</Tag>
                  <Tag> 军事：{currentMission.typeAvg.军事}</Tag>
                  <Tag> 健康：{currentMission.typeAvg.健康}</Tag>
                </Card.Grid>
                <Card.Grid style={gridStyleLg}>
                  <Tag> 存在时效性：{currentMission.timelinessAvg.存在时效性}</Tag>
                  <Tag> 过时:{currentMission.timelinessAvg.过时}</Tag>
                  <Tag> 与时间无关：{currentMission.timelinessAvg.与时间无关}</Tag>


                </Card.Grid>
              </Row>
            </Card>
          </Col>
        </Row>
        <FooterToolbar>
          <Button type="primary" onClick={this.last}>
            上一个
          </Button>
          <Button type="primary" onClick={this.next}>
            下一个
          </Button>
          <Button type="primary" onClick={this.submit}>
            提交
          </Button>
        </FooterToolbar>

      </Layout>
    )
  }
  catch(e){
    return(<h3>无任务，请等待分配</h3>)

}}
}
