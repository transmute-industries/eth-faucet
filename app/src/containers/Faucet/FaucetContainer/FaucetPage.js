import React from 'react';

import { Card, CardTitle, CardText } from 'material-ui/Card';

import Page from 'layouts/Page';

import FaucetContainer from 'containers/Faucet/FaucetContainer/FaucetContainer';

export default class FaucetPage extends React.Component {

    constructor(props) {
        super(props);
        console.log("constructor: ", props);

    }

    render() {
        return (
            <Page renderParticles={true}>
                <FaucetContainer />
            </Page>
        );
    }
}
