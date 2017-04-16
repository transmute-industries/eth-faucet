import React, { Component } from 'react'
import { Row, Col } from 'react-grid-system';

import PageContainer from '../containers/PageContainer';


class Faucet extends Component {
    render() {
        return (
            <PageContainer>
                <Row>
                    <Col xs={12}>
                        fancy faucet from url here...
                    </Col>
                </Row>
            </PageContainer>
        )
    }
}

export default Faucet
