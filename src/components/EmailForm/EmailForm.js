import React from 'react'
import { PropTypes } from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'components/TextField'
import { RECOVER_EMAIL_FORM_NAME } from 'constants/formNames'
import classes from './EmailForm.scss'

const required = value => value ? undefined : 'Required'
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined

export const EmailForm = ({ account, handleSubmit, submitting, pristine, valid }) => (
  <form className={classes.container} onSubmit={handleSubmit}>
    <h4>Send Recovery Code To Email</h4>
    <Field
      name='email'
      component={TextField}
      label='Email'
      validate={[required, email]}
    />
    <div className={classes.submit}>
      <RaisedButton
        label='Send'
        primary
        type='submit'
        disabled={submitting}
      />
    </div>
  </form>
)

EmailForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool
}

export default reduxForm({
  form: RECOVER_EMAIL_FORM_NAME
})(EmailForm)
