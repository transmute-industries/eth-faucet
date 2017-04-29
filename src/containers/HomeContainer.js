import React, { Component } from 'react'
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux'

import HeroRow from 'components/HeroRow'

import CreateFaucetContainer from 'containers/Faucet/CreateFaucet/CreateFaucetContainer'
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
      <div style={{paddingBottom: '20px'}}>
        <HeroRow renderParticles={true}>
          <h1 style={{ textAlign: 'center' }}>
            {
              faucet.isOwner ?
                'Use or Join a Faucet.'
                :
                'Create or Join a Faucet.'
            }
          </h1>
        </HeroRow>
        {
          faucet.isOwner ?
            <FaucetTableContainer />
            :
            <CreateFaucetContainer />
        }
      </div>
    )
  }
}
