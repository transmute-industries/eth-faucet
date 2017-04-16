import React, { Component } from 'react'
import { Row, Col } from 'react-grid-system';

import PageContainer from '../containers/PageContainer';
import ProfileFormContainer from '../containers/ProfileFormContainer';

class Profile extends Component {
    render() {
        return (
            <PageContainer>
                <Row>
                    <Col xs={12}>

                     <ProfileFormContainer />

                        
                    </Col>
                </Row>
            </PageContainer>
        )
    }
}

export default Profile
