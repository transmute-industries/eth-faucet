import React, { Component } from 'react'
import { Row, Col } from 'react-grid-system';

import PageContainer from '../containers/PageContainer';

import FaucetTableContainer from '../containers/FaucetTableContainer';

class AdminPage extends Component {
    render() {
        return (
            <PageContainer>
                <Row>
                    <Col xs={12}>
                        <FaucetTableContainer />
                    </Col>
                </Row>
            </PageContainer>
        )
    }
}

export default AdminPage
