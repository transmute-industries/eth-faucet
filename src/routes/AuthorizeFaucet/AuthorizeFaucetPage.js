import React from 'react'
import Page from 'layouts/Page'
import FaucetAuthorizeTableContainer from 'containers/FaucetAuthorizeTableContainer'

export default class AuthorizeFaucetPage extends React.Component {

  render () {
    return (
      <Page renderParticles={true}>
        <FaucetAuthorizeTableContainer/>
      </Page>
    )
  }
}
