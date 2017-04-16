import React, { Component } from 'react'

import { Row, Col } from 'react-grid-system';

import {Card, CardTitle, CardText} from 'material-ui/Card';

import Page from '../components/Page';
import SignUpForm from '../components/SignUpForm';

class SignUp extends Component {
  render() {
    return(
      <Page>
        <Row>
          <Col xs={12}>
            <Card>
              <CardTitle title="Signup" subtitle="Enter your info below." />
              <CardText>
                <SignUpForm />
              </CardText>
            </Card>
          </Col>
        </Row>
      </Page>
    )
  }
}

export default SignUp
