import React from 'react'
import {Card, CardTitle, CardText} from 'material-ui/Card'
import Page from 'layouts/Page'
import CreateFaucetContainer from 'containers/CreateFaucetContainer'

export default class CreateFaucetPage extends React.Component {
  render () {
    return (
      <Page renderParticles={false}>
        <Card>
          <CardTitle
            title='Create Faucet'
            subtitle='One per account address.'
            />
          <CardText>
            <CreateFaucetContainer />
          </CardText>
        </Card>
      </Page>
    )
  }
}
