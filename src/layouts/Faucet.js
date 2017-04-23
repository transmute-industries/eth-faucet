import React, { Component } from 'react'
import { Row, Col } from 'react-grid-system';

import PageContainer from '../containers/PageContainer';
import FaucetContainer from '../containers/FaucetContainer';

class Faucet extends Component {
    render() {
        return (
            <PageContainer>
                <Row>
                    <Col xs={12}>
                      <FaucetContainer/>
                    </Col>
                </Row>
            </PageContainer>
        )
    }
}

export default Faucet
