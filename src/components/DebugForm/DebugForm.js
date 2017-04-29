import React from 'react'
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux'
import { Field, reduxForm, submit } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'

import { Grid, Row, Col } from 'react-flexbox-grid';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';

import { DEBUG_FORM_NAME } from 'constants/formNames';
import classes from './DebugForm.scss'
import MenuItem from 'material-ui/MenuItem'

import {
  SelectField
} from 'redux-form-material-ui'

export const DebugForm = ({ handleSubmit, submitForm, submitting }) => (
  <form onSubmit={handleSubmit} className={classes.container} >
    <Card className={classes.card}>
      <CardHeader
        title="Debug Settings"
      />
      <Grid fluid>
        <Row>
          <Field style={{ width: '100%' }} name="web3Provider" component={SelectField} hintText="Select a provider">
            <MenuItem value="testrpc" primaryText="Test RPC" />
            <MenuItem value="infura" primaryText="Infura" />
            <MenuItem value="parity" primaryText="Parity" />
          </Field>
        </Row>
      </Grid>
      <CardActions className={classes.actions}>
        <RaisedButton
          style={{ marginRight: 'none' }}
          label='Save Changes'
          primary
          type='submit'
          disabled={submitting}
        />
      </CardActions>
    </Card>
  </form>
)

const form = reduxForm({
  form: DEBUG_FORM_NAME,
  enableReinitialization: true
})(DebugForm)

export default connect(
  ({ debug }) => ({
    initialValues: debug
  }),
)(form)
