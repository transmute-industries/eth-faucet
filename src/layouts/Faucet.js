import React, { Component } from 'react'
import { Row, Col } from 'react-grid-system';
import {Card, CardTitle, CardText} from 'material-ui/Card';

import PageContainer from '../containers/PageContainer';
import FaucetContainer from '../containers/FaucetContainer';

class Faucet extends Component {
    render() {
        return (
            <PageContainer>
                <Row>
                    <Col xs={12}>
                      <Card>
                        <CardTitle title={this.props.params.faucetName + " Faucet"} />
                        <CardText>
                          <FaucetContainer faucetName={this.props.params.faucetName}/>
                        </CardText>
                      </Card>
                    </Col>
                </Row>
            </PageContainer>
        )
    }
}

export default Faucet
