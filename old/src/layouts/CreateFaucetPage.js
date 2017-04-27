import React, { Component } from 'react'

import { Row, Col } from 'react-grid-system';

import {Card, CardTitle, CardText} from 'material-ui/Card';

import PageContainer from '../containers/PageContainer';
import CreateFaucetContainer from '../containers/CreateFaucetContainer';

class CreateFaucetPage extends Component {
  render() {
    return(
      <PageContainer>
        <Row>
          <Col xs={12}>
            <Card>
              <CardTitle title="Create Faucet" subtitle="Enter your info below." />
              <CardText>
                <CreateFaucetContainer />
              </CardText>
            </Card>
          </Col>
        </Row>
      </PageContainer>
    )
  }
}

export default CreateFaucetPage
