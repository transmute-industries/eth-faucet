import React from 'react';
import { connect } from 'react-redux'
import FaucetTable from '../components/FaucetTable'

const mapStateToProps = (state, ownProps) => {
  return {
    faucet: state.faucet
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const FaucetTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FaucetTable)

export default FaucetTableContainer
