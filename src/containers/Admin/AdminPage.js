import React from 'react'
import {Card, CardTitle, CardText} from 'material-ui/Card'
import Page from 'layouts/Page'
import AdminContainer from 'containers/Admin/AdminContainer'

export default class AdminPage extends React.Component {
  render () {
    return (
      <Page renderParticles={false}>
        <Card>
          <CardTitle
            title='All Faucets'
            />
          <CardText>
            <AdminContainer />
          </CardText>
        </Card>
      </Page>
    )
  }
}
