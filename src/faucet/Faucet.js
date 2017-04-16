import { connect } from 'react-redux'
import React, { Component } from 'react'

import { getAllFaucets } from './Actions';

import Page from '../components/Page';

import CreateFaucetCard from './CreateFaucet/CreateFaucetCard'

class Faucet extends Component {
  constructor(props, { authData }) {
    super(props)
    console.log(this.props, authData);
  }

  loadFaucet = () => {
    console.log('call action ehre..')
    this.props.getAllFaucets();
  }

  render() {
    return (
      <Page>

        <h1>Faucet</h1>
        <strong>Hello {this.props.authData.name}!</strong>
        <br />
        <br />
        <br />
        <button className="" onClick={this.loadFaucet}> Load Faucet</button>
        {JSON.stringify(this.props.faucet)}

        <CreateFaucetCard />
      </Page>
    )
  }
}

const mapStateToProps = state => ({
  faucet: state.faucet
})

export default connect(mapStateToProps, { getAllFaucets })(Faucet);