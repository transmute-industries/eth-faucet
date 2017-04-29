import React from 'react'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import Page from 'layouts/Page'
import FaucetTableContainer from 'containers/FaucetTableContainer'

export default class AdminPage extends React.Component {
  render() {
    return (
      <Page renderParticles={true}>
        <FaucetTableContainer />
      </Page>
    )
  }
}
