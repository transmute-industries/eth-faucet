import React, { Component } from 'react'
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux'
import { map } from 'lodash'
import Theme from 'theme'
import {
  firebaseConnect,
  isLoaded,
  pathToJS,
  dataToJS,
  // orderedToJS,
  // populatedDataToJS
} from 'react-redux-firebase'

import classes from './HomeContainer.scss'

import Page from 'layouts/Page'

import CreateFaucetContainer from 'containers/Faucet/CreateFaucet/CreateFaucetContainer'
import FaucetContainer from 'containers/Faucet/FaucetContainer/FaucetContainer'

import { browserHistory } from 'react-router'

@connect(
  ({ faucet }) => ({
    faucet: faucet
  })
)
export default class Home extends Component {

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps)
    let { faucet } = nextProps;
    if (faucet.isOwner) {
      browserHistory.push("/faucets/" + faucet.selected.name)
    }
  }
  render() {
    let { faucet } = this.props;


    return (
      <Page style={{ color: Theme.palette.primary2Color }} renderParticles={true}>

        {
          faucet.isOwner ?
            <FaucetContainer />
            :
            <CreateFaucetContainer />
        }
      </Page>
    )
  }
}
