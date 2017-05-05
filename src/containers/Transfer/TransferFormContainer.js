import React, { Component } from 'react'
import { connect } from 'react-redux'
import { submit } from 'redux-form'
import { firebaseConnect, pathToJS } from 'react-redux-firebase'
import { UserIsAuthenticated } from 'utils/router'
import TransferForm from 'components/TransferForm'

import { TRANSFER_ETHER_FORM_NAME } from 'constants/formNames'

import { sendEther } from 'store/ethereum/web3'

@UserIsAuthenticated // redirect to /login if user is not authenticated
@firebaseConnect() // add this.props.firebase
@connect(
  // Map redux state to props
  ({ firebase, web3 }) => ({
    auth: pathToJS(firebase, 'auth'),
    account: pathToJS(firebase, 'profile'),
    web3: web3
  }),
  {
    // action for submitting redux-form
    submitForm: () => (dispatch) => dispatch(submit(TRANSFER_ETHER_FORM_NAME)),
    onSubmit: (formModel) => (dispatch) => dispatch(sendEther(formModel))
  }
)
export default class TransferFormContainer extends Component {
  render () {
    const { web3, submitForm, onSubmit } = this.props
    return (
      <TransferForm
        web3={web3}
        submitForm={submitForm}
        onSubmit={onSubmit}
      />
    )
  }
}
