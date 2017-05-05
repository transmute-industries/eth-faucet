import React from 'react'
import Page from 'layouts/Page'
import FaucetTableContainer from 'containers/FaucetTableContainer'

export default class AdminPage extends React.Component {
  render () {
    return (
      <Page renderParticles>
        <FaucetTableContainer />
      </Page>
    )
  }
}
