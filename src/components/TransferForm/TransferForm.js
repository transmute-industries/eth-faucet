import React from 'react'
import { PropTypes }  from 'prop-types';
import { connect } from 'react-redux'
import { Field, reduxForm, submit } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'components/TextField'
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';

import { TRANSFER_ETHER_FORM_NAME } from 'constants/formNames';

import classes from './TransferForm.scss'

export const TransferForm = ({ web3, handleSubmit, submitForm, submitting }) => (
  <form onSubmit={handleSubmit} className={classes.container} >
    <Card className={classes.card}>
      <CardHeader
        title="Transfer Ether"
        subtitle={web3.transferInitialValue.fromAddress}
      />
      <Grid fluid>
        <Row>
          <Field
            name='fromAddress'
            component={TextField}
            label='Receiving Address'
          />
        </Row>
        <Row>
          <Field
            name='toAddress'
            component={TextField}
            label='Receiving Address'
          />
        </Row>
        <Row>
          <Field
            name='amountInEther'
            component={TextField}
            label='Amount (Eth)'
          />
        </Row>
      </Grid>
      <CardActions className={classes.actions}>
        <RaisedButton
          style={{ marginRight: 'none' }}
          label='Send'
          primary
          type='submit'
          disabled={submitting}
        />
      </CardActions>
    </Card>
  </form>
)

const form = reduxForm({
  form: TRANSFER_ETHER_FORM_NAME,
  enableReinitialization: true
})(TransferForm)

export default connect(
  ({ web3 }) => ({
    initialValues: web3.transferInitialValue
  }),
)(form)
