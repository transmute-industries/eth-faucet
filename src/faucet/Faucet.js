import { connect } from 'react-redux'
import React, { Component } from 'react'

import { getAllFaucets, createFaucet } from './Actions';

import Page from '../components/Page';

import CreateFaucetCard from './CreateFaucet/CreateFaucetCard'
import RaisedButton from 'material-ui/RaisedButton';

class Faucet extends Component {
  constructor(props, { authData }) {
    super(props)
    // console.log(this.props, authData);
  }

  handleLoadFaucet = () => {
    this.props.getAllFaucets();
  }

  handleCreateFaucet = () => {
    this.props.createFaucet();
  }

  render() {
    return (
      <Page>
        <CreateFaucetCard />
        <br />
        <RaisedButton onClick={this.handleLoadFaucet} label="Load" />
        <br />
        <RaisedButton onClick={this.handleCreateFaucet} label="Create" />
      </Page>
    )
  }
}
const mapStateToProps = state => ({
  faucets: state.faucets
})

export default connect(mapStateToProps, { getAllFaucets, createFaucet })(Faucet);