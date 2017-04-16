import React, { Component } from 'react'
import { Row, Col } from 'react-grid-system';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import PageContainer from '../containers/PageContainer';
import ProfileFormContainer from '../containers/ProfileFormContainer';

class Profile extends Component {
    render() {
        return (
            <PageContainer>
                <Row>
                    <Col xs={12}>
                        <Card>
                            <CardTitle title="Profile" subtitle="Your faucet profile" />
                            <CardText>
                                <ProfileFormContainer />
                            </CardText>
                        </Card>
                    </Col>
                </Row>
            </PageContainer>
        )
    }
}

export default Profile
