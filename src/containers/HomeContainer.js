import React, { Component } from 'react'
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux'

import HeroRow from 'components/HeroRow'

import CircularProgress from 'material-ui/CircularProgress'

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

    const isLoaded = () => {
      return faucet.objects !== null;
    }

    const HeroContent = () => {
      if (isLoaded()) {
        return (
          <h1 style={{ textAlign: 'center' }} >
            Ethereum TestNet Faucets
          </h1>
        )
      } else {
        return (
          <CircularProgress mode='indeterminate' size={80} />
        )
      }
    }

    const DefaultView = () => {

      if (isLoaded()) {
        if (faucet.defaultFaucet !== undefined) {
          return (
            <FaucetTableContainer />
          )
        } else {
          return (
            <div>
              <CreateFaucetContainer />
              <FaucetTableContainer />
            </div>
          )
        }
      } else {
        return (<div />)
      }
    }
    return (
      <div style={{ paddingBottom: '20px' }}>
        <HeroRow renderParticles={true}>
          <HeroContent />
        </HeroRow>
        <DefaultView />
      </div>
    )
  }
}
