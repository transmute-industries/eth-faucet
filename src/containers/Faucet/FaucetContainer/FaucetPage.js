import React from 'react'
import Page from 'layouts/Page'
import FaucetContainer from 'containers/Faucet/FaucetContainer/FaucetContainer'

export default class FaucetPage extends React.Component {

  render () {
    return (
      <Page renderParticles>
        <FaucetContainer />
      </Page>
    )
  }
}
