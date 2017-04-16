import React, { Component } from 'react'

import { Row, Col } from 'react-grid-system';

import {Card, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import Page from '../components/Page';

class Home extends Component {
  render() {
    return(
      <Page>
        <Row>
          <Col xs={12}>
            <Card>
              <CardTitle title="Faucet stuff" subtitle="Other faucet stuff" />
              <CardText>
                <img src="/faucet.png" alt="logo" style={{
                  display: 'block',
                  width: '200px',
                  margin: 'auto auto 15px auto',
                }}/>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
              </CardText>
            </Card>
          </Col>
        </Row>
      </Page>
    )
  }
}

export default Home
