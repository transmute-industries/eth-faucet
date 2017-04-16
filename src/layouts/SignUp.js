import React, { Component } from 'react'

import { Row, Col } from 'react-grid-system';

import {Card, CardTitle, CardText} from 'material-ui/Card';

import PageContainer from '../containers/PageContainer';
import SignUpFormContainer from '../containers/SignUpFormContainer';

class SignUp extends Component {
  render() {
    return(
      <PageContainer>
        <Row>
          <Col xs={12}>
            <Card>
              <CardTitle title="Signup" subtitle="Enter your info below." />
              <CardText>
                <SignUpFormContainer />
              </CardText>
            </Card>
          </Col>
        </Row>
      </PageContainer>
    )
  }
}

export default SignUp
