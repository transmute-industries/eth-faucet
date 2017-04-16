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
    this.props.getAllFaucets('0x781218e2b16e53b0f198e545c75d90fcb6ea6c53');
  }

  handleCreateFaucet = () => {
    this.props.createFaucet('0x781218e2b16e53b0f198e545c75d90fcb6ea6c53');
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
  faucet: state.faucet
})

export default connect(mapStateToProps, { getAllFaucets, createFaucet })(Faucet);