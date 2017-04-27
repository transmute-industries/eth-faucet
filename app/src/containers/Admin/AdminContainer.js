import React, { Component } from 'react'

import { connect } from 'react-redux'
import { reduxForm, submit } from 'redux-form'
import FaucetTableContainer from 'containers/Faucet/FaucetTableContainer'

export default class AdminContainer extends Component {
    render() {
        return (
            <FaucetTableContainer />
        )
    }
}

