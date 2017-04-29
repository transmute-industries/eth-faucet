import React, { Component } from 'react'

import { connect } from 'react-redux'
import { reduxForm, submit } from 'redux-form'
import DebugForm from 'components/DebugForm'
import { DEBUG_FORM_NAME } from 'constants/formNames'

import { updateDebugSettings } from 'store/debug'

@connect(
    // Map redux state to props
    ({ debug }) => ({
        debug: debug
    }),
    {
        // action for submitting redux-form
        submitForm: () => (dispatch) => dispatch(submit(DEBUG_FORM_NAME)),
        onSubmit: (formModel) => (dispatch) => {
            dispatch(updateDebugSettings(formModel))
        }
    }
)
export default class DebugFormContainer extends Component {

    render() {
        const { debug, submitForm, onSubmit } = this.props
        return (
            <DebugForm
                debug={debug}
                submitForm={submitForm}
                onSubmit={onSubmit}
            />
        )
    }
}

