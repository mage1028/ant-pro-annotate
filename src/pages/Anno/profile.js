import React, { Component } from 'react';

import {
  Row,
  Col,
  Card,

} from 'antd';
import GridContent from '../../components/PageHeaderWrapper/GridContent';

class App extends Component {
  state = {};

  render() {
    return (
      <GridContent>


        <Row>
          <Col>
            <Card title="标注文本">
              个人
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}


export default App;


