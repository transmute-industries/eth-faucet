import React, { Component } from 'react'

import { Row, Col } from 'react-grid-system';

import {Card, CardTitle, CardText} from 'material-ui/Card';

import Page from '../components/Page';
import CreateFaucetFormContainer from '../containers/CreateFaucetFormContainer';

class CreateFaucet extends Component {
  render() {
    return(
      <Page>
        <Row>
          <Col xs={12}>
            <Card>
              <CardTitle title="Create Faucet" subtitle="Enter your info below." />
              <CardText>
                <CreateFaucetFormContainer />
              </CardText>
            </Card>
          </Col>
        </Row>
      </Page>
    )
  }
}

export default CreateFaucet
