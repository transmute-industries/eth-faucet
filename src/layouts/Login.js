import React, { Component } from 'react'

import { Row, Col } from 'react-grid-system';

import {Card, CardTitle, CardText} from 'material-ui/Card';

import PageContainer from '../containers/PageContainer';
import LoginFormContainer from '../containers/LoginFormContainer';

class Login extends Component {
  render() {
    return(
      <PageContainer>
        <Row>
          <Col xs={12}>
            <Card>
              <CardTitle title="Login" subtitle="Enter your info below." />
              <CardText>
                <LoginFormContainer />
              </CardText>
            </Card>
          </Col>
        </Row>
      </PageContainer>
    )
  }
}

export default Login
