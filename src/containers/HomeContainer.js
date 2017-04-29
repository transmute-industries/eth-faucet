import React, { Component } from 'react'
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux'

import HeroRow from 'components/HeroRow'

import CreateFaucetContainer from 'containers/CreateFaucetContainer'
import FaucetTableContainer from 'containers/FaucetTableContainer'

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

    // if (faucet.isOwner) {
    //   browserHistory.push("/faucets/" + faucet.selected.name)
    // }
  }
  render() {
    let { faucet } = this.props;
    return (
      <div style={{ paddingBottom: '20px' }}>
        <HeroRow renderParticles={true}>
          <h1 style={{ textAlign: 'center' }}>
            {
              faucet.isOwner ?
                'Welcome back!'
                :
                'Create or request access to Ethereum TestNet Faucets'
            }
          </h1>
        </HeroRow>

        {
          !faucet.isOwner &&
          <CreateFaucetContainer />
        }

        <FaucetTableContainer />
      </div>
    )
  }
}
